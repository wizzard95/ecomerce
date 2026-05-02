import { Link } from 'react-router'

const AuthButtons = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-4 flex-wrap">
            <Link className="btn btn-neutral btn-outline" to={'/register'}>
                Crear Cuenta
            </Link>

            <div className="hidden lg:block">|</div>

            <button className="btn btn-neutral btn-outline">
                Iniciar sesión
            </button>
        </div>
    )
}
export default AuthButtons
