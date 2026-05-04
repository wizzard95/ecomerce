import { connectDB, disconnectDB } from './config/configdb.js'
import express from 'express'
import dotenv from 'dotenv' // ? SIRVE PARA LEER LAS VARIABLES DE ENTORNO .ENV
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

// * configuracion para que el backend reciba correctamente las peticiones
// * desde el front
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-type',
            'Authorization',
            'Cookie',
            'Set-Cookie',
        ],
        credentials: true, // ? permite que la cookie viaje al backend
    })
)
//* otra configuracion para poder recibir las cookies desde el frontend
app.use(cookieParser())

app.use(express.json())

const PORT = 3001

// * RUTAS API
app.use('/api/auth', authRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    })
    .catch(() => {
        disconnectDB()
    })
