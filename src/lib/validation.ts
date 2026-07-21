import { z } from "zod";
import { productionTypes } from "@/data/rooms";

// Compara solo la parte de fecha (YYYY-MM-DD) contra el día actual local.
function isDateNotInPast(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return false;
  const selected = new Date(y, m - 1, d);
  return selected.getTime() >= today.getTime();
}

// "HH:MM" -> minutos desde medianoche. Devuelve null si el formato es inválido.
function timeToMinutes(value?: string): number | null {
  if (!value) return null;
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

// Esquema del formulario de solicitud de reserva (por sala).
export const bookingRequestSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Ingresá tu nombre y apellido."),
    email: z
      .string()
      .trim()
      .min(1, "Ingresá tu correo electrónico.")
      .email("Ingresá un correo electrónico válido."),
    phone: z
      .string()
      .trim()
      .min(6, "Ingresá un teléfono válido."),
    roomId: z.string().trim().min(1, "Falta la sala."),
    roomName: z.string().trim().min(1, "Falta la sala."),
    requestedDate: z
      .string()
      .trim()
      .min(1, "Elegí una fecha tentativa.")
      .refine(isDateNotInPast, "La fecha no puede ser anterior a hoy."),
    startTime: z.string().trim().optional().or(z.literal("")),
    endTime: z.string().trim().optional().or(z.literal("")),
    estimatedPeople: z
      .union([z.coerce.number().int().min(1).max(100), z.literal("")])
      .optional(),
    productionType: z.enum(productionTypes).optional(),
    message: z
      .string()
      .trim()
      .min(10, "Contanos un poco más (al menos 10 caracteres)."),
    privacyAccepted: z
      .boolean()
      .refine((v) => v === true, "Debés aceptar la política de privacidad."),
    // Campo honeypot anti-spam: debe quedar vacío.
    company: z.string().max(0).optional(),
  })
  .refine(
    (data) => {
      const start = timeToMinutes(data.startTime || undefined);
      const end = timeToMinutes(data.endTime || undefined);
      if (start === null || end === null) return true;
      return end > start;
    },
    {
      message: "La hora de finalización debe ser posterior a la de inicio.",
      path: ["endTime"],
    },
  );

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

// Esquema del formulario general de contacto (/contacto).
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresá tu nombre y apellido."),
  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu correo electrónico.")
    .email("Ingresá un correo electrónico válido."),
  phone: z.string().trim().min(6, "Ingresá un teléfono válido."),
  roomName: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Escribí tu mensaje (al menos 10 caracteres)."),
  privacyAccepted: z
    .boolean()
    .refine((v) => v === true, "Debés aceptar la política de privacidad."),
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
