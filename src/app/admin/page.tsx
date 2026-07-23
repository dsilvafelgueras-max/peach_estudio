import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/admin-auth";
import { getServerSupabase } from "@/lib/supabase";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { BookingRow } from "@/components/admin/types";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

// El panel siempre se renderiza en el servidor con datos frescos.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <section className="flex min-h-[70vh] items-center pt-24">
        <div className="container-page max-w-md">
          <AdminLogin />
        </div>
      </section>
    );
  }

  const supabase = getServerSupabase();
  let requests: BookingRow[] = [];
  let dbError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      dbError = true;
      console.error("[admin] Error al leer solicitudes:", error.message);
    } else {
      requests = (data ?? []) as BookingRow[];
    }
  } else {
    dbError = true;
  }

  return (
    <section className="pt-24 md:pt-28">
      <div className="container-page pb-24">
        <AdminDashboard initialRequests={requests} dbError={dbError} />
      </div>
    </section>
  );
}
