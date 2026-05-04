import { connectDB, disconnectDB } from './config/configdb.js'
import express from 'express'
import dotenv from 'dotenv' // ? SIRVE PARA LEER LAS VARIABLES DE ENTORNO .ENV
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

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
