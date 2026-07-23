import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const VALID_STATUSES = ["new", "contacted", "confirmed", "rejected", "cancelled"];

// POST /api/admin/update-status — cambia el estado de una solicitud.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  if (!body.id || !body.status || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ ok: false, error: "Datos inválidos." }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Base de datos no configurada." },
      { status: 500 },
    );
  }

  const { error } = await supabase
    .from("booking_requests")
    .update({ status: body.status })
    .eq("id", body.id);

  if (error) {
    console.error("[admin] Error al actualizar estado:", error.message);
    return NextResponse.json(
      { ok: false, error: "No pudimos actualizar el estado." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
