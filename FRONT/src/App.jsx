import { Routes, Route } from 'react-router'
import Layout from './layout/Layout'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <h1 className="text-8xl text-orange-500">app</h1>
            </Route>
        </Routes>
    )
}

export default App
