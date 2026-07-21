import { NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/validation";
import { getServerSupabase } from "@/lib/supabase";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/booking-request
// Valida la solicitud, verifica el honeypot, la guarda en Supabase y envía correos.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Los datos enviados no son válidos.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: si el campo trampa vino con contenido, tratamos como spam.
  // Respondemos ok para no darle pistas al bot, pero no guardamos nada.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const receivedAt = new Date();

  // Guardar en Supabase (si está configurado).
  const supabase = getServerSupabase();
  if (supabase) {
    const { error } = await supabase.from("booking_requests").insert({
      room_id: data.roomId,
      room_name: data.roomName,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      requested_date: data.requestedDate || null,
      start_time: data.startTime || null,
      end_time: data.endTime || null,
      estimated_people:
        typeof data.estimatedPeople === "number" ? data.estimatedPeople : null,
      production_type: data.productionType || null,
      message: data.message,
      source: "website",
    });

    if (error) {
      // No exponemos detalles internos al cliente.
      console.error("[booking-request] Error al guardar en Supabase:", error.message);
      return NextResponse.json(
        { ok: false, error: "No pudimos guardar tu solicitud. Probá de nuevo." },
        { status: 500 },
      );
    }
  } else {
    console.warn(
      "[booking-request] Supabase no configurado; la solicitud no se persistió.",
    );
  }

  // Enviar correos (no bloquea el éxito de la solicitud si falla).
  await sendBookingEmails(data, receivedAt);

  return NextResponse.json({ ok: true });
}
