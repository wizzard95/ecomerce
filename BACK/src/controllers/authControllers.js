import bcrypt from 'bcryptjs'
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
        console.log(newUser)
        res.json({ newUser: newUser })
    } catch (error) {
        res.json(error)
    }
}
