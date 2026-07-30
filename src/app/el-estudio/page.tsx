import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import FeaturesGrid from "@/components/FeaturesGrid";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "El estudio",
  description:
    "Conocé Peach Estudio: un departamento transformado en un espacio creativo con puestos beauty, estudio de fotografía, patio y áreas comunes.",
  alternates: { canonical: "/el-estudio" },
};

// Ambientes del lugar (mosaico de fotos). Contenido propio, distinto al inicio.
const ambientes = [
  {
    src: "/images/rooms/beauty4/beauty4-02-unidos.jpg",
    alt: "Puestos beauty de Peach Estudio",
    title: "Sector beauty",
    text: "Tres puestos de trabajo con espejos iluminados tipo camarín, que pueden usarse por separado o combinados.",
  },
  {
    src: "/images/rooms/estudio/fondo-blanco.png",
    alt: "Estudio de fotografía de Peach Estudio",
    title: "Estudio de fotografía",
    text: "Un set de 3 x 5 m con tres fondos (blanco, negro y croma), iluminación y pantalla grande para masterclass.",
  },
  {
    src: "/images/rooms/patio/patio-05-mesa.jpg",
    alt: "Patio de Peach Estudio",
    title: "Patio ambientado",
    text: "Un patio con mural tropical y mesa de madera, ideal para descansar entre tomas o como locación de fotos.",
  },
  {
    src: "/images/home/common-cocina.jpg",
    alt: "Office de Peach Estudio",
    title: "Áreas comunes",
    text: "Un office con mesada para armar un café y tomarse un respiro durante la producción.",
  },
];

// Servicios generales del lugar (editables — ver CONTENT_TODO.md).
const servicios = [
  "Wi-Fi",
  "Buena iluminación",
  "Espacios versátiles",
  "Equipamiento según el espacio",
  "Baño",
  "Zona de preparación",
  "Office / cocina",
  "Fácil acceso",
];

export default function ElEstudioPage() {
  return (
    <>
      {/* Intro editorial */}
      <section className="border-b border-line pt-28 md:pt-36">
        <div className="container-page pb-16">
          <SectionHeading
            as="h1"
            eyebrow="El estudio"
            title="Un departamento convertido en espacio creativo."
            description="Peach Estudio nació de transformar un departamento en un lugar pensado para crear. Combina puestos beauty, un estudio de fotografía y espacios comunes en un mismo lugar, para que cada producción tenga todo lo que necesita sin moverse de acá."
          />
          <Reveal className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Está pensado para maquilladores profesionales, fotógrafos, creadores de
              contenido y marcas: desde dictar una clase o atender clientas, hasta hacer
              una sesión de fotos, grabar contenido o una prueba de novia.
            </p>
            <p>
              Cada ambiente puede reservarse de forma independiente, o tomar el estudio
              completo por jornada. La idea es simple: un espacio prolijo, cálido y
              flexible, listo para que traigas tu proyecto.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ambientes (mosaico) */}
      <section>
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Los ambientes" title="Todo en un mismo lugar." />
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {ambientes.map((a) => (
              <Reveal key={a.title}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-peach-50">
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Franja editorial con frase */}
      <section className="relative">
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <Image
            src="/images/rooms/patio/patio-01.jpg"
            alt="Espacio de Peach Estudio"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="container-page relative flex h-full items-end pb-12 md:items-center md:pb-0">
            <h2 className="max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Un lugar cálido, prolijo y pensado en cada detalle.
            </h2>
          </div>
        </div>
      </section>

      {/* Servicios generales */}
      <section className="border-t border-line">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Servicios"
              title="Lo que vas a encontrar."
              description="Servicios generales del lugar. El equipamiento específico depende de cada espacio y se confirma al coordinar la reserva."
            />
          </Reveal>
          <Reveal className="mt-12">
            <FeaturesGrid items={servicios} columns={4} />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
