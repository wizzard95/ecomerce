# Consolidados Frontend

Resumen de cambios realizados en el frontend para el flujo JWT y el proxy de desarrollo.

- Proxy de desarrollo en FRONT/vite.config.js para que /api sea dirigido a http://localhost:3001.
- API_URL cambiado a '/api/auth' para usar el proxy.
- loginService y registerService guardan el token en localStorage y configuran el encabezado Authorization para futuras peticiones.
- getProfileService adjunta Authorization si hay token en localStorage.
- Flujo de login/registro actualizado para almacenar token y usarlo en headers.
- Actualizaciones en App.jsx y RegisterForm.jsx para soportar flujo de autenticación con JWT.

Notas de verificación:
- Verificar que /api/auth/profile se llame con Authorization: Bearer <token>.
- Verificar token en localStorage tras login/registro.
- Verificar que las llamadas al backend a través del proxy funcionen sin problemas.
