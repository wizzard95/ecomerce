import axios from 'axios'

//* configuracion base de axios
//* http://localhost:3001/api/cart
const API_URL = import.meta.env.VITE_BACKEND_URL + '/cart'

axios.defaults.withCredentials = true

//* servicio para agregar producto al carrito
export const addToCartService = async (userId, productId, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}/add`.{
            userId,
            productId,
            quantity
        })
        return response.data
    } catch (error) {
        throw new Error('Error al agregar producto al carrito')
    }
}
//* 