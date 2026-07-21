import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Peach Estudio.",
  alternates: { canonical: "/privacidad" },
};

// TODO(Peach Estudio): validar este texto legal con la información definitiva.
export default function PrivacidadPage() {
  return (
    <section className="pt-28 md:pt-36">
      <div className="container-page max-w-3xl pb-24">
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">
          Política de privacidad
        </h1>
        <p className="mt-3 text-sm text-ink-muted">Texto provisorio — pendiente de validación.</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            En Peach Estudio tratamos los datos que nos brindás a través de los formularios
            del sitio con el único fin de responder tus consultas y coordinar el eventual
            alquiler de nuestras salas.
          </p>
          <div>
            <h2 className="font-serif text-xl text-ink">Qué datos recopilamos</h2>
            <p className="mt-2">
              Nombre y apellido, correo electrónico, teléfono, y la información que
              incluyas en tu mensaje (fecha tentativa, tipo de producción, comentarios).
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-ink">Para qué los usamos</h2>
            <p className="mt-2">
              Para contactarte, evaluar disponibilidad y gestionar tu solicitud. No
              compartimos tus datos con terceros ajenos a la operación del estudio ni los
              usamos con fines publicitarios sin tu consentimiento.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-ink">Tus derechos</h2>
            <p className="mt-2">
              Podés solicitar el acceso, la rectificación o la eliminación de tus datos
              escribiéndonos a nuestro correo de contacto.
            </p>
          </div>
          <p className="text-ink-muted">
            Esta política podrá actualizarse. La versión definitiva será provista por Peach
            Estudio.
          </p>
        </div>
      </div>
    </section>
  );
}
