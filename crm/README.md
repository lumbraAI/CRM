# CRM demo project

Proyecto mínimo con backend Express para autenticación y una vista de login lista para integrar APIs.

Instalación:

```bash
npm install
```

Variables de entorno: copiar `.env.example` a `.env` y ajustar `JWT_SECRET`.

Desarrollo (API Node):

```bash
npm run dev
```

Desarrollo (vistas PHP, servidor rápido):

```bash
# desde la carpeta del proyecto
php -S localhost:8000 -t public
```

Rutas importantes (API):

- `POST /api/auth/register` { email, password, name } — crea usuario (en memoria) y devuelve token
- `POST /api/auth/login` { email, password } — devuelve token JWT
- `GET /api/auth/me` — devuelve datos del usuario (necesita header `Authorization: Bearer <token>`)

Frontend (vistas PHP):

- La vista de login está en `public/index.php` y el CRM protegido en `public/crm.php`.
- El frontend usa `public/js/config.js` para la variable `window.API_BASE`. Edita ese archivo si tu API corre en otro host/puerto.

Notas:

- Este proyecto usa almacenamiento en memoria de usuarios para facilitar la integración inicial; reemplaza con una base de datos y lógica de persistencia cuando integres APIs reales.
- Para integrar APIs externas, añade nuevas rutas bajo `backend/routes/` y controladores en `backend/controllers/`. Implementa clientes o adaptadores en `backend/services/`.
- CORS: si sirves las vistas desde un dominio/puerto distinto al del API, ajusta `window.API_BASE` y asegúrate de habilitar CORS en `backend/server.js` (ya usamos `cors()` allí).

Persistencia local (SQLite):

- He añadido `better-sqlite3` y un inicializador en `backend/db.js`. Al arrancar el servidor se crea `backend/data.sqlite` y la tabla `users` si no existen.
- El controlador de autenticación ya utiliza la tabla `users` en SQLite en lugar del array en memoria.
- Para resetear la base de datos borra `backend/data.sqlite` y reinicia el servidor.

Dónde integrar APIs externas:

- Añade rutas en `backend/routes/` (ej. `integrations.js`) y controladores en `backend/controllers/`.
- Implementa módulos bajo `backend/services/` para encapsular llamadas a proveedores (Facebook, Google, TikTok, etc.).
- Si necesitas webhooks, crea rutas públicas protegidas (verifica firmas) y procesa eventos en un controlador separado.

Seguridad y producción (recomendaciones):

- Reemplaza el almacenamiento en memoria por una DB (Postgres/MySQL/SQLite/Mongo). Guarda hashes de contraseña con `bcryptjs` (ya incluido).
- Mantén `JWT_SECRET` seguro en el entorno y no lo incluyas en el repositorio.
- Usa HTTPS y proxy inverso (Nginx) que sirva PHP y haga proxy a Node si quieres un mismo dominio.

Docker (opción recomendada para desarrollo integrado):

Si quieres levantar la API Node y las vistas PHP juntas detrás de un proxy nginx, hay un `docker-compose.yml` incluido.

```bash
docker-compose up --build
```

- Nginx escuchará en el puerto `80` y enruta `/api` a la API Node y el resto a PHP.
- API expuesta en `http://localhost:3000` (también accesible por nginx en `/api`).
- Las vistas PHP estarán disponibles por nginx en `http://localhost/`.

Nota: el contenedor `api` monta el código en modo desarrollo para aplicar cambios en caliente. `backend/data.sqlite` no se monta por diseño — será creado en el contenedor; si quieres persistencia local puedes montar un volumen apuntando a `backend/data.sqlite`.

Endpoints adicionales y roles:

- `GET /api/health` — healthcheck simple.
- `GET /api/admin/users` — lista usuarios (protegido, requiere token JWT con `role = admin`).
- `POST /api/admin/users/:id/promote` — promociona un usuario a `admin` (solo admin puede ejecutar).

Cómo crear un admin inicial (rápido):

1. Registra un usuario normal usando `POST /api/auth/register`.
2. Haz login para obtener token: `POST /api/auth/login`.
3. Si no hay admin disponible, usa SQLite directamente para actualizar el rol (por ejemplo en local):

```sql
UPDATE users SET role = 'admin' WHERE id = 1;
```

O bien, si ya tienes un admin, usa `POST /api/admin/users/:id/promote` con su token.

Integraciones (qué agregué)

- Tabla `leads` en `backend/db.js` para almacenar leads entrantes y evitar duplicados por `provider+provider_lead_id`.
- `backend/services/leadStore.js` — guarda leads de forma idempotente y actualiza información.
- Stubs en `backend/services/` para `facebookClient.js`, `tiktokClient.js`, `googleClient.js`, `whatsappClient.js`.
- Controladores y rutas en `backend/controllers/integrationsController.js` y `backend/routes/integrations.js` con endpoints:
	- `POST /api/integrations/meta/webhook`
	- `POST /api/integrations/tiktok/webhook`
	- `POST /api/integrations/google/webhook`
	- `POST /api/integrations/whatsapp/webhook`

Cómo probar webhooks localmente

- Usa `ngrok` o similar para exponer tu entorno local y registrar la URL en los paneles de los proveedores.
- Para Meta (Facebook/Instagram/WhatsApp) configura `META_APP_SECRET` en `.env` y asegúrate de que la verificación de firma funcione (el controlador usa `x-hub-signature-256`).

Siguientes pasos recomendados (puedo implementarlos):

1. Mapear campos reales por proveedor (leer ejemplos de payloads y adaptar `parse*` en `backend/services/*Client.js`).
2. Añadir validación y normalización de datos (emails, phones).
3. Añadir endpoints de administración para ver leads y exportarlos.
4. Implementar retries/queue para llamadas externas adicionales (enriquecimiento de leads).

Endpoint para corregir leads manualmente:

- `PUT /api/admin/leads/:id` — admin puede actualizar `name`, `email`, `phone`, `city`, `campaign`. Los campos se re-validan y se actualiza `valid` y `validation_errors`.
- La UI administrativa (`public/admin/leads.php`) permite hacer clic en una fila para corregir (usa prompts simples); al guardar llama al endpoint y recarga la lista.

Implementación adicional hecha en este paso:

- Validación implementada:

	- Validación básica en registro/login (formato de email, longitud mínima de password) en `backend/controllers/authController.js`.
	- Validación y normalización de leads en `backend/utils/validation.js` (`isEmail`, `normalizePhone`, `validateLead`).
	- Los webhooks normalizan `phone` y validan antes de guardar; el resultado de validación se almacena en `leads.valid` y `leads.validation_errors` para control y filtrado en la UI.


Implementación adicional hecha en este paso:

- Auto-creación de admin si defines `INITIAL_ADMIN_EMAIL` y `INITIAL_ADMIN_PASSWORD` en `.env`.
- Endpoint admin para listar leads: `GET /api/admin/leads` (protegido y paginado).
- Página administrativa en PHP: `public/admin/leads.php` que consume la API (requiere token JWT de un admin en `localStorage`).

Ejemplo rápido para crear admin local (en `.env`):

```
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=ChangeMe123!
```

Luego reinicia el servidor Node y el admin inicial se creará automáticamente.

