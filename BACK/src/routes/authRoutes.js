import express from 'express'

const router = express.Router()

router.post('/register', (req, res) => {
    console.log('Hiciste una peticion a POST a /register')
    res.json({ message: 'Hiciste una peticion a POST a /register' })
})

router.post('/login', (req, res) => {
    console.log('Hiciste una peticion a POST a /login')
    res.json({ message: 'Hiciste una peticion a POST a /login' })
})

router.post('/logout', (req, res) => {
    console.log('Hiciste una peticion a POST a /logout')
    res.json({ message: 'Hiciste una peticion a POST a /logout' })
})

router.get('/profile', (req, res) => {
    console.log('Hiciste una peticion a POST a /profile')
    res.json({ message: 'Hiciste una peticion a POST a /profile' })
})
export default router
