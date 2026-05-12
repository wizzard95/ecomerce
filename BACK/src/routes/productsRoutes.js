import express from 'express'
import {
    createProduct,
    updateProduct,
    getProductById,
} from '../controllers/productsControllers.js'

const router = express.Router()

// * rutas publicas
router.get('/', (req, res) => {
    res.json({ message: 'OBTENER TODOS LOS PRODUCTOS' })
})

router.get('/:id', getProductById) //* Obtener productos por id

//* rutas protegidas (solo administradores pueden modificar producto)
router.post('/', createProduct) // crear producto
router.put('/:id', updateProduct) // actualizar un producto
router.delete('/:id', () => {}) // eliminar un producto

export default router
