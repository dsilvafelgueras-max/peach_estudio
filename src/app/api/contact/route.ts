import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getServerSupabase } from "@/lib/supabase";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/contact — formulario general de contacto.
// Reutiliza la tabla booking_requests (marcando source "contact") y el envío de correo.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
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

  // Honeypot.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const receivedAt = new Date();
  const roomName = data.roomName || "Consulta general";

  const supabase = getServerSupabase();
  if (supabase) {
    const { error } = await supabase.from("booking_requests").insert({
      room_id: null,
      room_name: roomName,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: "contact",
    });

    if (error) {
      console.error("[contact] Error al guardar en Supabase:", error.message);
      return NextResponse.json(
        { ok: false, error: "No pudimos enviar tu consulta. Probá de nuevo." },
        { status: 500 },
      );
    }
  } else {
    console.warn("[contact] Supabase no configurado; la consulta no se persistió.");
  }

  await sendBookingEmails(
    {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      roomId: "",
      roomName,
      requestedDate: "",
      message: data.message,
      privacyAccepted: true,
    },
    receivedAt,
  );

  return NextResponse.json({ ok: true });
}
