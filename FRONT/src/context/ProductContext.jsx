import {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = import.meta.env.VITE_BACKEND_URL + '/products'

export const ProductContext = createContext({})

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [productsLoading, setproductsLoading] = useState([])
    const [product, setProduct] = useState([])
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    // * funcion para traer todos los productos al front
    const getProducts = useCallback(async () => {
        try {
            const response = await axios.get(API_URL)
            console.log('RESPUESTA: ', response)
            setProducts(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener los productos')
        } finally {
            setproductsLoading(false)
        }
    }, [])

    //* funcion para obtener un producto por id
    const getProductById = useCallback(async (id) => {
        setProductLoading(true)
        setProduct({})
        try {
            const response = await axios.get(`${API_URL}/${id}`)
            setProduct(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener el producto')
        } finally {
            setProductLoading(false)
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const value = {
        products,
        product,
        productsLoading,
        productLoading,
        error,
        getProducts,
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
//* hook personalizado para traer valores (values)
export const useProduct = () => useContext(ProductContext)
