import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import RoomsGrid from "@/components/RoomsGrid";
import FeaturesGrid from "@/components/FeaturesGrid";
import CTASection from "@/components/CTASection";
import EquipmentSection from "@/components/EquipmentSection";
import PatioSection from "@/components/PatioSection";
import VideoSection from "@/components/VideoSection";
import Reveal from "@/components/Reveal";
import { getFeaturedRooms } from "@/data/rooms";

// Atributos generales del espacio (editables — pendientes de confirmar servicios reales).
const generalFeatures = [
  "Wi-Fi",
  "Buena iluminación",
  "Espacios versátiles",
  "Equipamiento según la sala",
  "Baño",
  "Zona de preparación",
  "Fácil acceso",
];

const steps = [
  {
    n: "01",
    title: "Elegí un espacio",
    text: "Explorá los puestos beauty y el estudio, y encontrá el que mejor se adapta a tu producción.",
  },
  {
    n: "02",
    title: "Enviá tu solicitud",
    text: "Completá el formulario con tu fecha, horario y detalles del proyecto.",
  },
  {
    n: "03",
    title: "Coordinamos y confirmamos",
    text: "Nos comunicamos para validar disponibilidad, condiciones y precio final.",
  },
];

export default function HomePage() {
  const featured = getFeaturedRooms();

  return (
    <>
      <Hero />

      {/* 6.2 Presentación del estudio */}
      <section id="el-estudio" className="scroll-mt-24">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="El estudio"
              title="Un espacio creativo, pensado en detalle."
              description="Peach Estudio es un espacio creativo diseñado para producciones de fotografía, video, maquillaje y contenido. Está pensado para maquilladores profesionales que quieran dictar clases, atender a sus clientas o hacer pruebas. Cada ambiente puede reservarse de forma independiente según las necesidades de cada proyecto."
            />
          </Reveal>
          <Reveal className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-peach-50">
              <Image
                src="/images/home/studio-01.jpg"
                alt="Ambiente de Peach Estudio"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-peach-50">
              <Image
                src="/images/home/salon-miel.jpg"
                alt="Sala de maquillaje y preparación de Peach Estudio"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6.3 Salas destacadas */}
      <section className="border-t border-line">
        <div className="container-page py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Espacios" title="Nuestros espacios" />
            <Link href="/salas" className="link-underline text-sm font-medium text-ink">
              Ver todos los espacios
            </Link>
          </Reveal>
          <Reveal className="mt-12">
            <RoomsGrid rooms={featured} />
          </Reveal>
        </div>
      </section>

      {/* 6.4 Cómo funciona */}
      <section className="bg-peach-50">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Cómo funciona" title="Reservar es simple." />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <Reveal key={step.n} className="border-t border-ink/15 pt-5">
                <p className="font-serif text-3xl text-peach-300">{step.n}</p>
                <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-muted">
            El envío del formulario no confirma automáticamente la reserva. Peach Estudio
            se comunicará para validar disponibilidad, horario y precio final.
          </p>
        </div>
      </section>

      {/* 6.5 Características generales */}
      <section className="border-t border-line">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Características"
              title="Todo lo necesario para producir."
              description="Servicios generales del espacio. El equipamiento específico depende de cada sala y se confirma al coordinar la reserva."
            />
          </Reveal>
          <Reveal className="mt-12">
            <FeaturesGrid items={generalFeatures} columns={4} />
          </Reveal>
        </div>
      </section>

      {/* Equipamiento del estudio (luces, fondos, croma, TV) */}
      <EquipmentSection />

      {/* Patio (espacio común, también para fotos) */}
      <PatioSection />

      {/* 6.6 Sección editorial */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image
            src="/images/home/editorial-01.jpg"
            alt="Espacio de Peach Estudio"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="container-page relative flex h-full items-end pb-12 md:items-center md:pb-0">
            <h2 className="max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Un espacio flexible para llevar cada idea a escena.
            </h2>
          </div>
        </div>
      </section>

      {/* Recorrido en video (preparado para cargar) */}
      <VideoSection />

      {/* 6.7 Llamado a la acción */}
      <CTASection />
    </>
  );
}
