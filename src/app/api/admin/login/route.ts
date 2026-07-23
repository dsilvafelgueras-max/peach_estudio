import { NextResponse } from "next/server";
import { checkPassword, sessionToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";

// POST /api/admin/login — valida la contraseña y setea la cookie de sesión.
export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "El panel no está configurado (falta ADMIN_PASSWORD)." },
      { status: 500 },
    );
  }

  if (!body.password || !checkPassword(body.password)) {
    return NextResponse.json(
      { ok: false, error: "Contraseña incorrecta." },
      { status: 401 },
    );
  }

  const token = sessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token ?? "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
  return res;
}
