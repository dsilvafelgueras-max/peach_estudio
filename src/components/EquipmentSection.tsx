import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// Equipamiento disponible en el estudio. Lista editable — confirmar el detalle
// real y las cantidades con Peach Estudio (ver CONTENT_TODO.md).
const equipment = [
  {
    image: "/images/rooms/estudio/fondo-blanco.png",
    title: "3 fondos: blanco, negro y croma",
    text: "El estudio tiene tres fondos a elección. En el detalle del Estudio podés ver los tres.",
  },
  {
    image: "/images/equipamiento/set-monitor.jpg",
    title: "Set y monitoreo",
    text: "Monitor de referencia y espacio versátil para producciones de foto y video.",
  },
  {
    image: "/images/equipamiento/croma-luces.jpg",
    title: "Fondo croma y pantalla grande",
    text: "Fondo croma y TV de gran tamaño para grabaciones, streaming y contenido.",
  },
];

export default function EquipmentSection() {
  return (
    <section className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Equipamiento"
            title="Material listo para producir."
            description="El estudio cuenta con iluminación profesional, fondos (blanco, negro y croma) y una pantalla de gran tamaño. El equipamiento disponible se confirma según el espacio y el proyecto."
          />
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => (
            <Reveal key={item.title}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-peach-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-xs uppercase tracking-wide text-ink-muted">
          Detalle y cantidades de equipamiento a confirmar.
        </p>
      </div>
    </section>
  );
}
