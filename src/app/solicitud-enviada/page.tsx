import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Solicitud enviada",
  description: "Recibimos tu solicitud en Peach Estudio.",
  robots: { index: false, follow: false },
};

export default function SolicitudEnviadaPage() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="container-page py-24 text-center">
        <CheckCircle2
          size={48}
          strokeWidth={1.25}
          aria-hidden="true"
          className="mx-auto text-peach-300"
        />
        <h1 className="mt-6 font-serif text-3xl text-ink sm:text-4xl">
          Recibimos tu solicitud
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
          Gracias por contactar a Peach Estudio. Revisaremos la disponibilidad y nos
          comunicaremos con vos.
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-ink-muted">
          La reserva todavía no está confirmada.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/salas" className="btn-primary w-full sm:w-auto">
            Volver a los espacios
          </Link>
          <Link href="/" className="btn-secondary w-full sm:w-auto">
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
