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
    email: "peachestudioinfo@gmail.com",
    // Teléfono / WhatsApp del estudio. Para el link de WhatsApp se usan solo
    // los dígitos (con código de país).
    phone: "+54 9 11 3410-3143",
    whatsapp: "5491134103143",
    instagram: "[INSTAGRAM_PEACH_STUDIO]",
    address: "Güemes 4821, Palermo, CABA",
    // Zona general (por si se prefiere no mostrar la altura exacta en algún lugar).
    area: "Palermo, CABA",
    hours: "[HORARIOS_PEACH_STUDIO]",
  },
} as const;

// Arma un link de WhatsApp con un mensaje pre-escrito.
// Si el número todavía es el placeholder, devuelve null (los componentes
// muestran un fallback en ese caso).
export function whatsappLink(message: string): string | null {
  const digits = site.contact.whatsapp.replace(/[^\d]/g, "");
  if (digits.length < 6) return null; // placeholder o número inválido
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

// Enlaces del menú principal.
export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/salas", label: "Espacios" },
  { href: "/#el-estudio", label: "El estudio" },
  { href: "/contacto", label: "Contacto" },
] as const;
