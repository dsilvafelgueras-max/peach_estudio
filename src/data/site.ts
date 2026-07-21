// Datos de contacto e identidad del sitio.
// Los valores entre corchetes son placeholders pendientes de confirmar (ver CONTENT_TODO.md).

export const site = {
  name: "Peach Estudio",
  tagline: "Alquiler de salas creativas",
  description:
    "Espacios de maquillaje, fotografía y producción audiovisual disponibles para alquilar por hora en Peach Estudio.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // TODO(Peach Estudio): reemplazar por datos reales.
  contact: {
    email: "[EMAIL_PEACH_STUDIO]",
    phone: "[TELEFONO_PEACH_STUDIO]",
    instagram: "[INSTAGRAM_PEACH_STUDIO]",
    // No mostrar dirección exacta hasta confirmar: usar zona/barrio general.
    address: "[DIRECCION_PEACH_STUDIO]",
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
