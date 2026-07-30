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
    // Email pendiente: Peach Estudio enviará el correcto. Vacío = no se muestra.
    email: "",
    // Teléfono / WhatsApp del estudio. Para el link de WhatsApp se usan solo
    // los dígitos (con código de país).
    phone: "+54 9 11 3410-3143",
    whatsapp: "5491134103143",
    instagram: "@peach__estudio",
    instagramUrl: "https://instagram.com/peach__estudio",
    // Dirección exacta oculta a pedido: se muestra solo la zona / esquina.
    address: "",
    area: "Palermo — Güemes y Godoy Cruz, CABA",
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
  { href: "/el-estudio", label: "El estudio" },
  { href: "/contacto", label: "Contacto" },
] as const;
