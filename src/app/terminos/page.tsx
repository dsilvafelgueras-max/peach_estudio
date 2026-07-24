import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso de Peach Estudio.",
  alternates: { canonical: "/terminos" },
};

// TODO(Peach Estudio): validar este texto legal con la información definitiva.
export default function TerminosPage() {
  return (
    <section className="pt-28 md:pt-36">
      <div className="container-page max-w-3xl pb-24">
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">
          Términos y condiciones
        </h1>
        <p className="mt-3 text-sm text-ink-muted">Texto provisorio — pendiente de validación.</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="font-serif text-xl text-ink">Solicitudes de reserva</h2>
            <p className="mt-2">
              El envío del formulario constituye una solicitud de disponibilidad y no
              confirma la reserva. Peach Estudio se comunicará para validar disponibilidad,
              horario, condiciones y precio final antes de confirmar.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-ink">Precios y disponibilidad</h2>
            <p className="mt-2">
              Los precios y la disponibilidad de los espacios están sujetos a confirmación y
              pueden variar. La información publicada tiene carácter orientativo hasta su
              validación.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-ink">Uso del espacio</h2>
            <p className="mt-2">
              Quien reserva se compromete a cuidar el espacio y el equipamiento, y a
              respetar los horarios y condiciones acordados. La política de cancelación y
              las formas de confirmación serán informadas al coordinar la reserva.
            </p>
          </div>
          <p className="text-ink-muted">
            Estos términos podrán actualizarse. La versión definitiva será provista por
            Peach Estudio.
          </p>
        </div>
      </div>
    </section>
  );
}
