import { productSchema } from '../schemas/productSchema.js'
import ProductModel from '../models/ProductModel.js'

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } =
            productSchema.parse(req.body)

        const product = await ProductModel.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        })

        res.json({
            data: {
                name,
                description,
                price,
                stock,
                imageUrl,
            },
        })
    } catch (error) {
        res.json({ message: 'Error al crear producto' })
    }
}
