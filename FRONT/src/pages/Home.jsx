import { useProduct } from '../context/ProductContext'

const Home = () => {
    const { products, productsLoading, error } = useProduct()

    console.log(products)
    return <h1>Pagina Home</h1>
}

export default Home
