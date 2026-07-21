import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RoomFilters from "@/components/RoomFilters";
import CTASection from "@/components/CTASection";
import { rooms } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Nuestras salas",
  description:
    "Explorá las salas de Peach Estudio: maquillaje, fotografía y producciones con croma. Alquiler por hora.",
  alternates: { canonical: "/salas" },
};

export default function SalasPage() {
  return (
    <>
      <section className="border-b border-line pt-28 md:pt-36">
        <div className="container-page pb-14">
          <SectionHeading
            as="h1"
            eyebrow="Salas"
            title="Nuestras salas"
            description="Espacios independientes para maquillaje, fotografía y producción audiovisual. Elegí el que mejor se adapte a tu proyecto y envianos tu solicitud."
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
