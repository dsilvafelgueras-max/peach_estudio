"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MessageCircle, LogOut } from "lucide-react";
import {
  type BookingRow,
  type BookingStatus,
  STATUS_LABELS,
  STATUS_ORDER,
} from "@/components/admin/types";

function waLink(phone: string): string | null {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 6 ? `https://wa.me/${digits}` : null;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

const statusStyles: Record<BookingStatus, string> = {
  new: "bg-peach-200 text-ink",
  contacted: "bg-blue-100 text-blue-900",
  confirmed: "bg-green-100 text-green-900",
  rejected: "bg-red-100 text-red-900",
  cancelled: "bg-neutral-200 text-neutral-700",
};

export default function AdminDashboard({
  initialRequests,
  dbError,
}: {
  initialRequests: BookingRow[];
  dbError: boolean;
}) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? requests : requests.filter((r) => r.status === filter)),
    [filter, requests],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: requests.length };
    for (const s of STATUS_ORDER) c[s] = requests.filter((r) => r.status === s).length;
    return c;
  }, [requests]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r)),
        );
      } else {
        alert(data.error ?? "No se pudo actualizar.");
      }
    } catch {
      alert("Error de conexión.");
    } finally {
      setBusyId(null);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">Solicitudes</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Panel de Peach Estudio — gestión de solicitudes de reserva.
          </p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
        >
          <LogOut size={16} aria-hidden="true" />
          Salir
        </button>
      </div>

      {dbError && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          No pudimos conectar con la base de datos. Verificá que Supabase esté configurado
          (variables de entorno) y que la tabla <code>booking_requests</code> exista.
        </div>
      )}

      {/* Filtros por estado */}
      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", ...STATUS_ORDER] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              filter === key
                ? "border-ink bg-ink text-cream"
                : "border-line text-ink-soft hover:border-ink"
            }`}
          >
            {key === "all" ? "Todas" : STATUS_LABELS[key]} ({counts[key] ?? 0})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-sm text-ink-muted">No hay solicitudes para mostrar.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {filtered.map((r) => {
            const wa = waLink(r.phone);
            const schedule =
              r.start_time && r.end_time
                ? `${r.start_time} a ${r.end_time}`
                : r.start_time || "—";
            return (
              <article
                key={r.id}
                className="rounded-lg border border-line bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-serif text-xl text-ink">{r.full_name}</h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[r.status]}`}
                      >
                        {STATUS_LABELS[r.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      {r.room_name} · {formatDate(r.created_at)}
                      {r.source === "contact" ? " · consulta general" : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${r.email}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-ink hover:border-ink"
                    >
                      <Mail size={15} aria-hidden="true" /> Email
                    </a>
                    {wa && (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-ink hover:border-ink"
                      >
                        <MessageCircle size={15} aria-hidden="true" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <Info label="Email" value={r.email} />
                  <Info label="Teléfono" value={r.phone} />
                  <Info label="Fecha tentativa" value={r.requested_date || "—"} />
                  <Info label="Horario" value={schedule} />
                  <Info
                    label="Personas"
                    value={r.estimated_people ? String(r.estimated_people) : "—"}
                  />
                  <Info label="Tipo" value={r.production_type || "—"} />
                </dl>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-ink-muted">Mensaje</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-ink-soft">
                    {r.message}
                  </p>
                </div>

                {/* Cambiar estado */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                  <span className="text-xs uppercase tracking-wide text-ink-muted">
                    Cambiar estado:
                  </span>
                  {STATUS_ORDER.map((s) => (
                    <button
                      key={s}
                      disabled={busyId === r.id || r.status === s}
                      onClick={() => updateStatus(r.id, s)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-40 ${
                        r.status === s
                          ? "border-ink bg-ink text-cream"
                          : "border-line text-ink-soft hover:border-ink"
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="text-ink-soft">{value}</dd>
    </div>
  );
}
