import { createContext, useState, useEffect, useContext } from 'react'
import { useUser } from './UserContext'
import {
    addToCartService,
    getCartService,
    updateCartService,
    removeCartService,
    clearCartService,
    getCartTotalService,
} from '../services/cartServices'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [itemsQuantity, setItemsQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState([])
    const { getUserId, isAuthenticated } = useUser()

    //* funcion para cargar el carrito desde el localStorage
    const loadLocalCart = () => {
        try {
            const localCart = localStorage.getItem('cart')
            return localCart ? JSON.parse(localCart) : []
        } catch (error) {
            console.error('Error al cargar el carrito local: ', error)
            return []
        }
    }
    //* funcion para guardar el carrito en el localStorage
    const saveLocalCart = (cartItems) => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        } catch (error) {
            console.error('Error al guardar el carrito local', error)
        }
    }
    //* funcion para cargar el carrito (backend o localstorage)
    const loadCart = async () => {
        if (isAuthenticated()) {
            // * usuario autenticado: cargar desde backend
            try {
                setLoading(true)
                const userId = getUserId()
                const response = await getCartService(userId)

                //* transformar los datos del backend al formato del front
                const cartItems = response.cart?.products?.map(
                    (product) =>
                        ({
                            _id: product.productId._id,
                            _id: product.productId.name,
                            _id: product.productId.price,
                            _id: product.productId.imageUrl,
                            _id: product.productId.description,
                            _id: product.productId.stock,
                            _id: product.productId.quantity,
                        }) || [],
                )
                setCart(cartItems)
            } catch (error) {
            } finally {
                setLoading(true)
            }
        } else {
            //* usuario no autenticado: cargar desde localstorage
            const localCart = loadLocalCart()
            setCart(localCart)
            setLoading(false)
        }
    }
}
