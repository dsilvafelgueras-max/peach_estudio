import { Resend } from "resend";
import type { BookingRequestInput } from "@/lib/validation";

// Utilidades de envío de correo con Resend. Todo corre en el servidor.

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Normaliza un teléfono a dígitos para armar un enlace de WhatsApp.
function toWhatsappLink(phone: string): string | null {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 6) return null;
  return `https://wa.me/${digits}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type SendResult = { ok: boolean; error?: string };

// Envía la notificación a la propietaria y la confirmación automática al usuario.
// No lanza excepciones: registra y devuelve un resultado para no romper el flujo del endpoint.
export async function sendBookingEmails(
  data: BookingRequestInput,
  receivedAt: Date,
): Promise<SendResult> {
  const resend = getResend();
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;

  if (!resend || !to || !from) {
    // Sin configuración de correo, la solicitud igual se guardó en Supabase.
    console.warn("[email] Resend no configurado; se omite el envío de correos.");
    return { ok: false, error: "email_not_configured" };
  }

  const receivedLabel = receivedAt.toLocaleString("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const wa = toWhatsappLink(data.phone);
  const schedule =
    data.startTime && data.endTime
      ? `${data.startTime} a ${data.endTime}`
      : data.startTime || "A confirmar";

  const rows: [string, string][] = [
    ["Recibido", receivedLabel],
    ["Nombre", data.fullName],
    ["Email", data.email],
    ["Teléfono", data.phone],
    ["Sala", data.roomName],
    ["Fecha tentativa", data.requestedDate || "A confirmar"],
    ["Horario tentativo", schedule],
    [
      "Cantidad de personas",
      data.estimatedPeople ? String(data.estimatedPeople) : "A confirmar",
    ],
    ["Tipo de producción", data.productionType || "A confirmar"],
    ["Comentario", data.message],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#6B6B6B;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;color:#1A1A1A">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const replyMailto = `mailto:${data.email}?subject=${encodeURIComponent(
    "Tu solicitud en Peach Estudio",
  )}`;

  const ownerHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1A1A1A">Nueva solicitud de Peach Estudio</h2>
      <p style="color:#3A3A3A">Sala: <strong>${escapeHtml(data.roomName)}</strong></p>
      <table style="border-collapse:collapse;width:100%;background:#FFF7F2;border-radius:8px">${rowsHtml}</table>
      <p style="margin-top:20px">
        <a href="${replyMailto}" style="color:#1A1A1A">Responder por email</a>
        ${wa ? ` &nbsp;·&nbsp; <a href="${wa}" style="color:#1A1A1A">Responder por WhatsApp</a>` : ""}
      </p>
    </div>`;

  const userHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1A1A1A">Recibimos tu solicitud</h2>
      <p style="color:#3A3A3A">Hola ${escapeHtml(
        data.fullName.split(" ")[0] || data.fullName,
      )}, recibimos tu consulta por <strong>${escapeHtml(data.roomName)}</strong>.</p>
      <p style="color:#3A3A3A">El envío del formulario no confirma todavía la reserva. Nos comunicaremos con vos para validar disponibilidad, horario y precio.</p>
      <p style="color:#6B6B6B;margin-top:24px">Peach Estudio</p>
    </div>`;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Nueva solicitud de Peach Estudio — ${data.roomName}`,
      html: ownerHtml,
    });

    await resend.emails.send({
      from,
      to: data.email,
      subject: "Recibimos tu solicitud en Peach Estudio",
      html: userHtml,
    });

    return { ok: true };
  } catch (error) {
    console.error("[email] Error al enviar correos:", error);
    return { ok: false, error: "email_send_failed" };
  }
}
