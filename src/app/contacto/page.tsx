import type { Metadata } from "next";
import { Mail, Phone, Instagram, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Peach Estudio para consultar disponibilidad de nuestras salas creativas.",
  alternates: { canonical: "/contacto" },
};

const contactItems = [
  { icon: Mail, label: "Email", value: site.contact.email },
  { icon: Phone, label: "Teléfono / WhatsApp", value: site.contact.phone },
  { icon: Instagram, label: "Instagram", value: site.contact.instagram },
  { icon: MapPin, label: "Ubicación", value: site.contact.address },
  { icon: Clock, label: "Horarios", value: site.contact.hours },
];

export default function ContactoPage() {
  return (
    <>
      <section className="border-b border-line pt-28 md:pt-36">
        <div className="container-page pb-14">
          <SectionHeading
            as="h1"
            eyebrow="Contacto"
            title="Hablemos de tu proyecto."
            description="Contanos qué necesitás y te ayudamos a encontrar el espacio adecuado. El envío del formulario no confirma la reserva: nos comunicamos para coordinar."
          />
        </div>
      </section>

      <section>
        <div className="container-page grid gap-14 py-16 md:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-2xl text-ink">Datos de contacto</h2>
            <ul className="mt-8 space-y-6">
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

          <div>
            <h2 className="font-serif text-2xl text-ink">Envianos una consulta</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
