# Consolidados Backend

Resumen de cambios realizados en el backend para habilitar flujo JWT y perfil de usuario.

- Añadida la función getUserFromToken(decoded, res) para buscar el usuario por decoded.userId y devolver id, email e isAdmin.
- profile valida el token (desde Authorization header o cookies), decodifica y usa getUserFromToken para retornar datos del usuario.
- Implementado loginUser para generar JWT, establecer cookie accessToken y devolver token en la respuesta.
- Ruta /api/auth/login vinculada a loginUser.
- Logs de depuración añadidos: token decodificado, IP remota y header Authorization para diagnóstico.
- Confianza en proxies añadida en server (trust proxy).

Notas de verificación:
- Verificar que /api/auth/profile devuelva datos del usuario cuando se envía un token válido.
- Verificar que token se genera y se envía en cookie y en respuesta.
- Verificar logs para token decodificado y usuario encontrado.
