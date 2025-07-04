import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import mail from "../utils/mail.js"
import jwt from 'jsonwebtoken'
import verifyPW from "../utils/verifyPW.js"



export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Un compte existe déjà avec cet email." })
        }

        // Vérifie la force du mot de passe
        if (!verifyPW(password)) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
            })
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        // Génération du token de validation (1h)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30s' })

        // Création du compte
        await User.create({
            username,
            email,
            password: hashedPassword,
            token,
            isVerified: false
        })

        // Construction du lien de validation
        const link = `${process.env.API_URL}/api/auth/validate/${token}`

        // HTML du mail
        const html = `
            <p>Bonjour ${username},</p>
            <p>Merci de vous être inscrit. Veuillez cliquer sur le lien suivant pour activer votre compte :</p>
            <p><a href="${link}">Activer mon compte</a></p>
            <p>Ce lien est valable pendant 1 heure.</p>
        `

        mail(email, 'Activation de votre compte', html)

        res.status(201).json({ message: "Compte créé. Veuillez vérifier votre boîte mail pour activer votre compte." })

    } catch (err) {
        console.error("Erreur lors de l'inscription :", err)
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." })
    }
}

export const validate = async (req, res) => {
    try {
        const { token } = req.params
        const user = await User.findOne({ token })
        if (!user) return res.status(400).json({ message: "Token manquant" })
        user.isVerified = true
        user.token = ''
        await user.save()
        res.status(200).redirect(`${process.env.CLIENT_URL}/`)
    } catch (err) {
        res.status(500).json({ message: "Internal Server" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Identifiants invalides" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Identifiants invalides" })
        }

        // Si le compte n'est pas vérifié
        if (!user.isVerified) {
            let tokenIsValid = false

            if (user.token) {
                try {
                    const decoded = jwt.verify(user.token, process.env.JWT_SECRET)
                    if (decoded?.email === email) tokenIsValid = true
                } catch (err) {
                    tokenIsValid = false
                }
            }

            // Si le token est encore valide, on attend la validation
            if (tokenIsValid) {
                return res.status(400).json({ message: "Activez votre compte svp. Un mail vous a déjà été envoyé." })
            }

            // Sinon, on génère un nouveau token + envoie un nouveau mail
            const newToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
            user.token = newToken
            await user.save()

            const link = `${process.env.API_URL}/api/auth/validate/${newToken}`
            const html = `
                <p>Bonjour ${user.username || ''},</p>
                <p>Veuillez cliquer sur le lien suivant pour activer votre compte : 
                <a href="${link}">Activer mon compte</a></p>`

            mail(email, 'Activation de compte', html)

            return res.status(403).json({
                message: "Votre compte n'est pas encore activé. Un nouveau mail vient d’être envoyé."
            })
        }

        // Authentification réussie : création du token
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 3600 * 1000
        })

        res.status(200).json({
            message: "Vous êtes authentifié",
            username: user.username,
            role: user.role
        })

    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({ message: "Erreur serveur lors de la connexion" })
    }
}


export const logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: "Vous êtes déconnecté" })
}



export const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        // Toujours répondre par le même message pour éviter de révéler si l'email existe
        if (!user) {
            return res.status(200).json({ message: "Si cet email existe, un lien de réinitialisation a été envoyé." })
        }

        // Générer un token unique avec expiration
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })

        // Enregistrer le token dans la base (pour vérification future)
        user.token = token
        await user.save()

        // Créer le lien de réinitialisation
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`
        const html = `
            <p>Bonjour ${user.username},</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p>Cliquez sur le lien suivant pour continuer :
                <a href="${resetLink}">Réinitialiser le mot de passe</a></p>
            <p>Ce lien est valide pendant 1 heure.</p>
        `

        // Envoyer l'email
        mail(email, 'Réinitialisation du mot de passe', html)

        res.status(200).json({ message: "Si cet email existe, un lien de réinitialisation a été envoyé." })

    } catch (err) {
        console.error("Erreur dans forgotPassword:", err)
        res.status(500).json({ message: "Erreur serveur lors de la demande de réinitialisation." })
    }
}


export const resetPassword = async (req, res) => {
    const { password } = req.body
    const { token } = req.params

    try {
        if (!token) {
            return res.status(400).json({ message: "Lien invalide ou manquant." })
        }

        // Vérifier la validité du token
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(400).json({ message: "Lien expiré ou invalide." })
        }

        const user = await User.findOne({ email: decoded.email, token })
        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable ou lien expiré." })
        }

        // Vérification du mot de passe
        if (!verifyPW(password)) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
            })
        }

        // Hash + maj
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.token = "" // Invalide le token après usage
        await user.save()

        return res.status(200).json({ message: "Mot de passe modifié avec succès." })

    } catch (err) {
        console.error("Erreur resetPassword:", err)
        res.status(500).json({ message: "Erreur serveur lors de la réinitialisation." })
    }
}




