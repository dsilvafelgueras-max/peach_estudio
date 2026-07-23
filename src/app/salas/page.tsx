import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RoomFilters from "@/components/RoomFilters";
import CTASection from "@/components/CTASection";
import { rooms } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Nuestros espacios",
  description:
    "Explorá los espacios de Peach Estudio: puestos beauty para maquillaje y tratamientos, y estudio para fotografía, contenido y masterclass.",
  alternates: { canonical: "/salas" },
};

export default function SalasPage() {
  return (
    <>
      <section className="border-b border-line pt-28 md:pt-36">
        <div className="container-page pb-14">
          <SectionHeading
            as="h1"
            eyebrow="Espacios"
            title="Nuestros espacios"
            description="Puestos beauty para maquillaje y tratamientos, y un estudio para fotografía, contenido y masterclass. Elegí el que mejor se adapte a tu proyecto y envianos tu solicitud."
          />
        </div>
      </section>

      <section>
        <div className="container-page py-14 md:py-16">
          <RoomFilters rooms={rooms} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
