import { productSchema } from '../schemas/productSchema.js'
import ProductModel from '../models/ProductModel.js'
import { ZodError } from 'zod'

// crear producto
export const createProduct = async (req, res) => {
    try {
        // * traer los datos del producto
        const { name, description, price, stock, imageUrl } =
            productSchema.parse(req.body)

        //* creamos el producto
        const product = await ProductModel.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        })

        //* devolvemos el producto al frontend
        return res
            .status(201)
            .json({ message: 'Producto creado exitosamente', product })
    } catch (error) {
        if (error instanceof ZodError) {
            return res
                .status(400)
                .json(error.issues.map((issue) => ({ message: issue.message })))
        }

        return res.status(500).json({ message: 'Error al crear el producto' })
    }
}

// actualizar producto
export const updateProduct = async (req, res) => {
    try {
        //* 1.- validar los datos de entrada con zod
        const validateData = productSchema.partial().parse(req.body)

        res.json(validateData)
    } catch (error) {
        res.json({ message: 'Error al actualizar producto' })
    }
}
