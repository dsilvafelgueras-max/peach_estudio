import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

// Autenticación simple del panel admin por contraseña (ADMIN_PASSWORD).
// No es un sistema de usuarios: es una única clave para la propietaria.
// La cookie guarda un token firmado (HMAC) derivado de la contraseña, no la
// contraseña en sí, y se valida en cada request del servidor.

const COOKIE_NAME = "peach_admin";

function expectedToken(password: string): string {
  // Firmamos un valor fijo con la contraseña como secreto: si la contraseña
  // cambia, los tokens viejos dejan de ser válidos.
  return createHmac("sha256", password).update("peach-admin-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Verifica la contraseña ingresada contra ADMIN_PASSWORD. */
export function checkPassword(input: string): boolean {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return false;
  return safeEqual(input, pass);
}

/** Token que se guarda en la cookie tras un login correcto. */
export function sessionToken(): string | null {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return null;
  return expectedToken(pass);
}

export const ADMIN_COOKIE = COOKIE_NAME;

/** ¿La request actual tiene una sesión admin válida? (para Server Components / rutas) */
export async function isAuthenticated(): Promise<boolean> {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return false;
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, expectedToken(pass));
}
