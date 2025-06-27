import express from 'express'
import { forgotPassword, login, logout, register, resetPassword, validate } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.get('/validate/:token', validate)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router