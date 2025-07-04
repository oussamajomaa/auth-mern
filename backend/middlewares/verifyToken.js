import jwt from 'jsonwebtoken'
export default function verifyToken (req,res,next) {
    const { token } = req.cookies
    console.log(token)
    if (!token) {
        return res.status(401).json({message:"Token no existe"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch(err) {
        console.error("Erreur de vérification du token:", err.message)
        res.status(403).redirect(`${process.env.CLIENT_URL}/home`)
    }
}