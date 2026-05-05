import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
import { registerSchema } from '../schemas/authSchema.js'

export const registerUser = async (req, res) => {
    try {
        // * traer la clave secreta de JWT
        const JWT_SECRET = process.env.JWT_SECRET

        //* Extraer los datos del usuario
        const { username, email, password } = registerSchema.parse(req.body)

        // * Comprobar si existe el usuario
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' })
        }
        // * Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // * Comprobar el usuario admin
        const isFirstUser = (await UserModel.countDocuments()) === 0

        // * crear el usuario y guardar en bd
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: isFirstUser,
        })

        //* Generar un token con JWT(json web token)
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: '1h',
        })
        console.log('TOKEN:', token)
        // * header.payload.signature

        // * Envciar el token como una cookie hacia el navegador
        //* para conectar con el frontend
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000,
        })
            .status(201)
            .json({ message: 'Usuario registrado con exito', token })
    } catch (error) {
        res.json(error)
    }
}

// * Utilidad: obtener datos de usuario desde token
export const getUserFromToken = async (decoded, res) => {
    try {
        const user = await UserModel.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        console.log('USUARIO ENCONTRADO CON EXITO y enciando al front datos del usuario')
        return res.status(200).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener usuario' })
    }
}

// * Profile
export const profile = async (req, res) => {
    // * extraer el token enviado por el cliente (prioridad: Authorization header, fallback a cookies)
    let token = null
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
    } else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken
    }

    console.log('token (header/cookie):', token)
    console.log('Remote address (req.ip):', req.ip)
    console.log('X-Forwarded-For:', req.headers['x-forwarded-for'])
    // Debug: ver detalles de la cabecera y la cookie
    console.log('Authorization header:', req.headers.authorization)
    console.log('req.cookies.accessToken:', req.cookies?.accessToken)

    // * Opcional: verificar token si existe
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Debug: mostrar datos decodificados del usuario
            console.log('datos decodificados del usuario: ', decoded)
            // Lógica: obtener datos del usuario y enviarlos al frontend
            return getUserFromToken(decoded, res)
        } catch (err) {
            // Token inválido
            return res.status(401).json({ message: 'Token inválido' })
        }
    }

    return res.status(401).json({ message: 'No token proporcionado' })
}

// * Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        // Buscar usuario por email
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' })
        }
        // Verificar password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' })
        }
        // Generar token
        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        })

        // Enviar token como cookie (y también en cuerpo para desarrollo)
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000,
        })
            .status(200)
            .json({ message: 'Login exitoso', token })
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' })
    }
}
