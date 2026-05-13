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
}
