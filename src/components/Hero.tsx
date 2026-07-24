import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

// Hero principal del inicio: fotografía a gran tamaño con overlay sutil.
export default function Hero() {
  return (
    <section className="relative flex h-[88vh] min-h-[560px] items-center justify-center overflow-hidden">
      <Image
        src="/images/home/hero-placeholder.jpg"
        alt="Peach Estudio — espacio creativo"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay para legibilidad del texto sobre la foto. */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div className="container-page relative z-10 text-center text-white">
        <p className="font-serif text-lg tracking-wide text-white/90">
          Peach Estudio
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">
          Espacios pensados para crear.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Puestos beauty y estudio de fotografía y contenido disponibles para
          alquilar por hora.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/salas" className="btn bg-white text-ink hover:bg-white/90 w-full sm:w-auto">
            Conocer los espacios
          </Link>
          <Link
            href="/contacto"
            className="btn border border-white/60 text-white hover:bg-white/10 w-full sm:w-auto"
          >
            Consultar disponibilidad
          </Link>
        </div>
      </div>

      {/* Scroll indicator sutil. */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70">
        <ChevronDown size={24} aria-hidden="true" className="animate-bounce" />
        <span className="sr-only">Desplazá para ver más</span>
      </div>
    </section>
  );
}
