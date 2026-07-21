import Link from "next/link";

// Llamado a la acción sobre fondo durazno muy claro (componente de servidor).
export default function CTASection() {
  return (
    <section className="bg-peach-100">
      <div className="container-page py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
          ¿Tenés una producción en mente?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Contanos qué necesitás y te ayudamos a encontrar el espacio adecuado.
        </p>
        <Link href="/contacto" className="btn-primary mt-8">
          Consultar disponibilidad
        </Link>
      </div>
    </section>
  );
}
