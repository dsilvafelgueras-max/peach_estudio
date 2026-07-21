import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de Supabase para uso EXCLUSIVO en el servidor.
// Usa la service role key, que nunca debe llegar al navegador.
// Devuelve null si faltan las variables, para poder degradar con elegancia.
export function getServerSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
