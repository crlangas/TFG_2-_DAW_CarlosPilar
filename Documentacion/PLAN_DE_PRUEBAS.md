# Plan de Pruebas - MrFinance

Este documento describe el plan de pruebas llevado a cabo para verificar el correcto funcionamiento de MrFinance.

## 1. Alcance y Entorno
Las pruebas cubren las tres capas de la aplicación:
- **Frontend (React/Vite):** Formularios de acceso, registro, gestión de movimientos/categorías y vista de gráficas.
- **Backend (Express):** Endpoints de la API, subida de archivos (multer) y generación de códigos 2FA.
- **Base de Datos (MySQL):** Restricciones de permisos y funcionamiento de los triggers.

El entorno de ejecución de las pruebas sera un entorno docker con apache, mysql y node.js.

## 2. Tipos de Pruebas
- **Pruebas de Integración / API:** Peticiones HTTP directas a los endpoints del servidor para validar códigos de respuesta (200, 401, 409, 500, etc.).
- **Pruebas de Base de Datos:** Verificación de la integridad referencial y ejecución automática de triggers en MySQL.
- **Pruebas Funcionales:** Pruebas de caja negra simulando flujos reales en navegador.

## 3. Casos de Prueba
- **CP-01 (Registro):** Crear usuario con contraseña >= 12 caracteres. -> *Resultado Esperado:* Usuario creado y contraseña encriptada con bcrypt.
- **CP-02 (Registro):** Intentar crear usuario con contraseña < 12 caracteres. -> *Resultado Esperado:* Error 401. Mensaje de contraseña corta.
- **CP-03 (Registro):** Intentar registrar un correo que ya existe. -> *Resultado Esperado:* Error 409. Mensaje de conflicto (email duplicado).
- **CP-04 (Login):** Iniciar sesión con datos correctos (2FA inactivo). -> *Resultado Esperado:* Login directo. Acceso al dashboard (HTTP 200).
- **CP-05 (Login):** Iniciar sesión con contraseña incorrecta. -> *Resultado Esperado:* Error 401. Mensaje de credenciales erróneas.
- **CP-06 (Login / 2FA):** Iniciar sesión con cuenta que tiene 2FA activo. -> *Resultado Esperado:* Petición devuelve `requires2fa: true` y envía OTP.
- **CP-07 (Login / 2FA):** Introducir código OTP válido dentro de 10 min. -> *Resultado Esperado:* Acceso concedido al dashboard.
- **CP-08 (Login / 2FA):** Introducir código incorrecto o expirado. -> *Resultado Esperado:* Error 401. Acceso denegado.
- **CP-09 (Categorías):** Añadir una nueva categoría (ej. "Estudios"). -> *Resultado Esperado:* Categoría creada y mostrada en orden alfabético.
- **CP-10 (Categorías):** Intentar crear una categoría vacía o duplicada. -> *Resultado Esperado:* Error (HTTP 400/409). Categoría rechazada.
- **CP-11 (Categorías):** Borrar categoría vinculada a movimientos en la BD. -> *Resultado Esperado:* Bloqueo por trigger `trg_before_delete_categoria`.
- **CP-12 (Movimientos):** Registrar un ingreso (monto > 0) y categoría. -> *Resultado Esperado:* Movimiento creado. Se actualiza el gráfico.
- **CP-13 (Movimientos):** Registrar un gasto (monto > 0) y categoría. -> *Resultado Esperado:* Movimiento creado. Se resta del balance visual.
- **CP-14 (Movimientos):** Registrar movimiento con importe <= 0. -> *Resultado Esperado:* Bloqueo en frontend y backend (HTTP 400).
- **CP-15 (Movimientos):** Editar importe o concepto de un movimiento. -> *Resultado Esperado:* Se actualiza en la lista y en la base de datos.
- **CP-16 (Movimientos):** Eliminar un movimiento de la lista. -> *Resultado Esperado:* Se borra de la BD y desaparece del frontend.
- **CP-17 (Perfil):** Subir una nueva foto de perfil (formato imagen). -> *Resultado Esperado:* Foto guardada. Si había una anterior, se borra.
- **CP-18 (Perfil):** Activar/desactivar 2FA desde la configuración. -> *Resultado Esperado:* Se actualiza el campo `is_2fa` en base de datos.
- **CP-19 (Triggers):** Eliminar un usuario completo en la base de datos. -> *Resultado Esperado:* Trigger `trg_before_delete_usuario` limpia sus datos en cascada.
