import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import mail from "../utils/mail.js"
import jwt from 'jsonwebtoken'
import verifyPW from "../utils/verifyPW.js"



export const register = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username,email,password)
    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "Identifiants invalides" })

        if (!verifyPW(password)) {
            return res.status(400).json({ message: 'Le mot de passe doit centenir A a $ 9 ' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const token = v4()
        await User.create({ username, email, password: hashedPassword, token })



        const link = process.env.API_URL + '/api/auth/validate/' + token
        const html = `<p>Bonjour ${username}</p>
                    <p>Cliquer sur le lien pour valider l'inscription <a href="${link}">Cliquez ici</a> </p>`

        mail(email, 'Validation', html)


        res.status(201).json({ message: 'Un utilisateur a été ajouté' })
    } catch (err) {
        console.log(err)
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
        res.status(200).json({ message: 'Compte activé' })
    } catch (err) {
        res.status(500).json({ message: "Internal Server" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        console.log(user, email)
        if (!user) return res.status(400).json({ message: "identifiants invalides" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "identifiants invalides" })

        if (!user.isVerified) return res.status(400).json({ message: "Activez votre compte svp" })

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 3600 * 1000
        })
        res.status(200).json({ message: "Vous êtes authentifé" })
    } catch (err) {
        res.status(500).json({ message: "Internal Server" })
    }
}




