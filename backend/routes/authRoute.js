import express from 'express'
import { login, register, validate } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.get('/validate/:token', validate)
router.post('/login', login)

export default router