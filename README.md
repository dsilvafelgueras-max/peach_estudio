# Peach Estudio

Sitio web para **Peach Estudio**, un estudio creativo que alquila salas por hora
para maquillaje, fotografía y producción audiovisual. Permite conocer cada sala y
enviar una **solicitud de disponibilidad** (no cobra ni confirma reservas de forma
automática: la propietaria evalúa y se contacta).

Construido con **Next.js (App Router) + TypeScript + Tailwind CSS**, con
**Supabase** para guardar las solicitudes y **Resend** para el envío de correos.

---

## 1. Instalar dependencias

Requiere Node.js 18.18+ (recomendado 20+).

```bash
npm install
```

## 2. Configurar variables de entorno

Copiá el ejemplo y completá los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (sin barra final). En local: `http://localhost:3000`. |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Solo servidor.** Service role key. No exponer ni versionar. |
| `RESEND_API_KEY` | API key de Resend. |
| `BOOKING_NOTIFICATION_EMAIL` | Correo donde la propietaria recibe las solicitudes. |
| `EMAIL_FROM` | Remitente verificado en Resend (ej. `Peach Estudio <hola@tudominio.com>`). |

> El sitio funciona sin Supabase/Resend configurados (los formularios validan y no
> rompen), pero las solicitudes no se guardan ni se envían por correo hasta completar
> estas variables.

Luego:

```bash
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## 3. Crear la tabla en Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pegá y ejecutá el contenido de
   [`supabase/schema.sql`](supabase/schema.sql). Crea la tabla `booking_requests`
   con RLS habilitado.
3. En **Project Settings → API**, copiá:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (mantener en secreto)

Las solicitudes se pueden ver en **Table Editor → booking_requests**. Estados:
`new`, `contacted`, `confirmed`, `rejected`, `cancelled`.

## 4. Configurar Resend

1. Creá una cuenta en [resend.com](https://resend.com) y verificá tu dominio.
2. Generá una API key → `RESEND_API_KEY`.
3. Definí `EMAIL_FROM` con un remitente de tu dominio verificado.
4. Definí `BOOKING_NOTIFICATION_EMAIL` con el correo que debe recibir las solicitudes.

Al enviarse una solicitud se mandan dos correos: la notificación a la propietaria
(con enlaces `mailto:` y de WhatsApp) y una confirmación automática al usuario.

## 5. Modificar las salas

Todo el contenido de las salas está en [`src/data/rooms.ts`](src/data/rooms.ts):
nombre, categoría, descripciones, precio, capacidad, superficie, imágenes,
servicios y condiciones. Es la fuente única: no hay datos duplicados en los
componentes. Para agregar una sala, sumá un objeto al array `rooms` (con un `slug`
único); la página `/salas/[slug]` y el sitemap se generan solos.

## 6. Reemplazar fotografías

Las imágenes viven en [`public/images/`](public/images/):

```
public/images/home/            → hero y secciones del inicio
public/images/rooms/makeup/    → Sala de Maquillaje
public/images/rooms/photo/     → Estudio Fotográfico
public/images/rooms/chroma/    → Estudio con Croma
```

Reemplazá los archivos manteniendo el mismo nombre, o actualizá las rutas
(`coverImage` / `gallery`) en `rooms.ts`. Se recomiendan imágenes horizontales
para portadas; Next.js genera WebP/AVIF automáticamente.

## 7. Cambiar el email receptor

Editá `BOOKING_NOTIFICATION_EMAIL` en tu `.env.local` (y en Vercel, en producción).

## 8. Probar el formulario

1. Con `.env.local` configurado, corré `npm run dev`.
2. Entrá a una sala (`/salas/estudio-fotografico`) o a `/contacto`.
3. Completá y enviá. Debería redirigir a `/solicitud-enviada` (o mostrar el mensaje
   de éxito en contacto), guardar la fila en Supabase y disparar los correos.

El formulario valida en cliente y en servidor (Zod), deshabilita el botón mientras
envía e incluye un honeypot anti-spam.

## 9. Desplegar en Vercel

1. Subí el repositorio a GitHub.
2. En [vercel.com](https://vercel.com), **New Project** → importá el repo.
3. Cargá **todas** las variables de entorno del `.env.example` en
   **Settings → Environment Variables** (con la URL de producción en
   `NEXT_PUBLIC_SITE_URL`).
4. Deploy. Vercel detecta Next.js automáticamente.

Cada push a la rama principal vuelve a desplegar.

---

## Estructura

```
src/
  app/                     Páginas (App Router) y rutas API
    api/booking-request/   POST — solicitud de reserva
    api/contact/           POST — contacto general
    salas/[slug]/          Detalle dinámico de cada sala
  components/              Componentes reutilizables (server y client)
  data/                    rooms.ts (salas) y site.ts (contacto/nav)
  lib/                     validation.ts (Zod), supabase.ts, email.ts
supabase/schema.sql        Esquema de la base
public/images/             Fotografías
CONTENT_TODO.md            Contenido pendiente de completar
```

Ver [`CONTENT_TODO.md`](CONTENT_TODO.md) para la lista de datos que faltan confirmar.
