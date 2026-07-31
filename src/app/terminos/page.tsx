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
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="font-serif text-xl text-ink">Reservá tu fecha</h2>
            <p className="mt-2">
              Para garantizar la disponibilidad de la fecha elegida, se solicita un
              anticipo del 50% del presupuesto, mediante transferencia bancaria.
            </p>
            <p className="mt-2">
              El 50% restante se abonará el día del alquiler, al inicio de la jornada.
            </p>
            <p className="mt-2">
              Una vez recibido el anticipo, tu reserva quedará confirmada y la fecha
              quedará bloqueada exclusivamente para vos.
            </p>
            <p className="mt-2">La reserva mínima es de 2 horas.</p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-ink">Solicitudes de reserva</h2>
            <p className="mt-2">
              El envío del formulario constituye una solicitud de disponibilidad y no
              confirma la reserva. Peach Estudio se comunicará para validar disponibilidad,
              horario y condiciones antes de confirmar.
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
