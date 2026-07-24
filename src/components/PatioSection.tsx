import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// Sección del patio: espacio común que también puede usarse para fotos.
export default function PatioSection() {
  return (
    <section className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Espacios comunes"
              title="Un patio con encanto."
              description="Además de los puestos y el estudio, contamos con un patio ambientado que también puede usarse como locación para fotos y contenido."
            />
          </Reveal>
          <Reveal className="order-1 grid grid-cols-2 gap-3 lg:order-2">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden bg-peach-50">
              <Image
                src="/images/rooms/patio/patio-01.jpg"
                alt="Patio de Peach Estudio"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-peach-50">
              <Image
                src="/images/rooms/patio/patio-03.jpg"
                alt="Mural tropical del patio de Peach Estudio"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-peach-50">
              <Image
                src="/images/rooms/patio/patio-04.jpg"
                alt="Mesa y ambientación del patio de Peach Estudio"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
