import express from 'express'
import { registerUser } from '../controllers/authControllers.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', (req, res) => {
    console.log('Hiciste una peticion a POST a /login')
    res.json({ message: 'Hiciste una peticion a POST a /login' })
})

router.post('/logout', (req, res) => {
    console.log('Hiciste una peticion a POST a /logout')
    res.json({ message: 'Hiciste una peticion a POST a /logout' })
})

router.get('/profile', (req, res) => {
    console.log('Hiciste una peticion a GET a /profile')
    res.json({ message: 'Hiciste una peticion a GET a /profile' })
})
export default router
