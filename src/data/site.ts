// Datos de contacto e identidad del sitio.
// Los valores entre corchetes son placeholders pendientes de confirmar (ver CONTENT_TODO.md).

export const site = {
  name: "Peach Estudio",
  tagline: "Espacios creativos en Palermo",
  description:
    "Puestos beauty para maquillaje y tratamientos, y estudio para fotografía, contenido y masterclass. Peach Estudio, en Palermo, CABA.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // TODO(Peach Estudio): reemplazar por datos reales.
  contact: {
    email: "[EMAIL_PEACH_STUDIO]",
    phone: "[TELEFONO_PEACH_STUDIO]",
    instagram: "[INSTAGRAM_PEACH_STUDIO]",
    address: "Güemes 4821, Palermo, CABA",
    // Zona general (por si se prefiere no mostrar la altura exacta en algún lugar).
    area: "Palermo, CABA",
    hours: "[HORARIOS_PEACH_STUDIO]",
  },
} as const;

// Enlaces del menú principal.
export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/salas", label: "Salas" },
  { href: "/#el-estudio", label: "El estudio" },
  { href: "/contacto", label: "Contacto" },
] as const;
