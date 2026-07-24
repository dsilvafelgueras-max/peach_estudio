import { MessageCircle } from "lucide-react";
import { whatsappLink, site } from "@/data/site";

// Botón que abre WhatsApp con un mensaje pre-escrito.
// Si el número del estudio todavía no está cargado (placeholder), muestra un
// aviso en lugar de un link roto.
export default function WhatsAppButton({
  message,
  label = "Reservar por WhatsApp",
  variant = "primary",
  className = "",
}: {
  message: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const link = whatsappLink(message);
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";

  if (!link) {
    // Fallback mientras no esté cargado el número real.
    return (
      <span
        className={`${base} cursor-not-allowed opacity-60 ${className}`}
        title="Número de WhatsApp pendiente de configurar"
      >
        <MessageCircle size={16} aria-hidden="true" />
        WhatsApp (a configurar)
      </span>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
      aria-label={`${label} — ${site.name}`}
    >
      <MessageCircle size={16} aria-hidden="true" />
      {label}
    </a>
  );
}
