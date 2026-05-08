import express from 'express'

const router = express.Router()

// * rutas publicas
router.get('/', (req, res) => {
    res.json({ message: 'OBTENER TODOS LOS PRODUCTOS' })
})

router.get('/:id', () => {})

//* rutas protegidas (solo administradores pueden modificar producto)
router.post('/', () => {}) // crear producto
router.put('/id', () => {}) // actualizar un producto
router.delete('/id', () => {}) // eliminar un producto

export default router
