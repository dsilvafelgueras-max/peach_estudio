import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="container-page py-24 text-center">
        <p className="font-serif text-6xl text-peach-300">404</p>
        <h1 className="mt-4 font-serif text-3xl text-ink">Página no encontrada</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
          La página que buscás no existe o fue movida.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary w-full sm:w-auto">
            Ir al inicio
          </Link>
          <Link href="/salas" className="btn-secondary w-full sm:w-auto">
            Ver los espacios
          </Link>
        </div>
      </div>
    </section>
  );
}
