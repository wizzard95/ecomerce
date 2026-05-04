export const registerUser = async (req, res) => {
    try {
        console.log(req.body)
        // * traer la clave secreta de JWT
        const JWT_SECRET = process.env.JWT_SECRET
        //console.log(JWT_SECRET)
        //res.json({ claveSecreta: JWT_SECRET })
        //* Extraer los datos del usuario
        const { username, email, password } = req.body
        //console.log(username, email, password)
    } catch (error) {
        res.json(error)
    }
}
