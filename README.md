# Peach Estudio

Sitio web para **Peach Estudio**, un estudio creativo en Palermo (CABA) con puestos
beauty para maquillaje y tratamientos, y un estudio para fotografía, contenido y
masterclass. Las **reservas se coordinan por WhatsApp**: cada botón de reserva abre
un chat con un mensaje ya escrito según el espacio que le interesa a la persona.

Construido con **Next.js (App Router) + TypeScript + Tailwind CSS**. Es un sitio
estático, sin base de datos ni backend: no necesita Supabase, Resend ni claves de API.

---

## 1. Instalar dependencias

Requiere Node.js 18.18+ (recomendado 20+).

```bash
npm install
```

## 2. Configurar el número de WhatsApp

Editá [`src/data/site.ts`](src/data/site.ts) y completá `contact.whatsapp` con el
número del estudio, **solo dígitos y con código de país**
(ej. Argentina: `"5491112345678"`). Mientras siga el placeholder, los botones
muestran "WhatsApp (a configurar)".

También podés completar ahí el teléfono visible, Instagram, email y horarios.

(Opcional) La variable `NEXT_PUBLIC_SITE_URL` en `.env.local` define la URL usada
en el SEO; en Vercel se pone el dominio de producción.

```bash
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## 3. Modificar los espacios

Todo el contenido de los espacios está en [`src/data/rooms.ts`](src/data/rooms.ts):
nombre, categoría, descripciones, precio, capacidad, superficie, imágenes,
servicios y condiciones. Es la fuente única. Para agregar un espacio, sumá un
objeto al array `rooms` (con un `slug` único); la página `/salas/[slug]` y el
sitemap se generan solos.

## 4. Reemplazar fotografías y video

Las imágenes viven en [`public/images/`](public/images/) y el video del recorrido
en `public/videos/recorrido.mp4`. Reemplazá los archivos manteniendo el nombre, o
actualizá las rutas en `rooms.ts` / los componentes. Next.js genera WebP/AVIF
automáticamente para las imágenes.

## 5. Desplegar en Vercel

1. Subí el repositorio a GitHub.
2. En [vercel.com](https://vercel.com), **New Project** → importá el repo.
3. (Opcional) Cargá `NEXT_PUBLIC_SITE_URL` con el dominio de producción.
4. Deploy. Vercel detecta Next.js automáticamente.

Cada push a la rama principal vuelve a desplegar.

---

## Estructura

```
src/
  app/            Páginas (App Router): inicio, /salas, /salas/[slug],
                  /contacto, /privacidad, /terminos, sitemap, robots
  components/     Componentes reutilizables (incluye WhatsAppButton)
  data/           rooms.ts (espacios) y site.ts (contacto, WhatsApp, nav)
public/images/    Fotografías
public/videos/    Video del recorrido
CONTENT_TODO.md   Contenido pendiente de completar
```

Ver [`CONTENT_TODO.md`](CONTENT_TODO.md) para la lista de datos que faltan confirmar
(sobre todo: **el número de WhatsApp**).
