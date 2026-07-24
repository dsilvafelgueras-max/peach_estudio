import type { Metadata } from "next";
import { Phone, Instagram, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Peach Estudio por WhatsApp para consultar disponibilidad de nuestros espacios creativos.",
  alternates: { canonical: "/contacto" },
};

const contactItems = [
  { icon: Phone, label: "Teléfono / WhatsApp", value: site.contact.phone },
  { icon: Instagram, label: "Instagram", value: site.contact.instagram },
  { icon: MapPin, label: "Ubicación", value: site.contact.address },
  { icon: Clock, label: "Horarios", value: site.contact.hours },
];

const waMessage =
  "¡Hola Peach Estudio! Quiero consultar disponibilidad de los espacios. ¿Me pasan info?";

export default function ContactoPage() {
  return (
    <>
      <section className="border-b border-line pt-28 md:pt-36">
        <div className="container-page pb-14">
          <SectionHeading
            as="h1"
            eyebrow="Contacto"
            title="Hablemos de tu proyecto."
            description="Escribinos por WhatsApp y coordinamos disponibilidad, horario y precio. Te respondemos a la brevedad."
          />
          <div className="mt-8">
            <WhatsAppButton message={waMessage} label="Escribir por WhatsApp" />
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 md:py-20">
          <h2 className="font-serif text-2xl text-ink">Datos de contacto</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {contactItems.map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <item.icon
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-ink"
                />
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-muted">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-soft">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
