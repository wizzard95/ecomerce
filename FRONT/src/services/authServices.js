// * CONEXION CON EL BACKEND

import axios from 'axios'

// * Configuracion base de axios para autenticacion
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
//* http://localhost:3001/api/auth/register

// * para incluir la cookie en las peticiones
axios.defaults.withCredentials = true

export const getProfileService = async () => {}

export const loginService = async () => {}

export const registerService = async (
    data,
    reset,
    setRedirect,
    checkSession,
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        console.log('RESPUESTA:', response)
        if (response.status === 201 || response.status === 200) {
            alert('REGISTRO EXITOSO DEL USUARIO')
            reset()
        }
    } catch (error) {
        alert('Error al registrarse', error)
    }
}

export const logoutService = async () => {}
