const AuthButtons = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-4 flex-wrap">
            <button className="btn btn-neutral btn-outline">
                Crear Cuenta
            </button>

            <div className="hidden lg:block">|</div>

            <button className="btn btn-neutral btn-outline">
                Iniciar sesión
            </button>
        </div>
    )
}
export default AuthButtons
