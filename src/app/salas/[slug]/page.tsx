import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { site } from "@/data/site";
import RoomGallery from "@/components/RoomGallery";
import RoomInformation from "@/components/RoomInformation";
import RoomConditions from "@/components/RoomConditions";
import FeaturesGrid from "@/components/FeaturesGrid";
import BookingRequestForm from "@/components/BookingRequestForm";

type Params = { slug: string };

// Genera las rutas estáticas de cada sala en build.
export function generateStaticParams(): Params[] {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};

  return {
    title: room.name,
    description: room.shortDescription,
    alternates: { canonical: `/salas/${room.slug}` },
    openGraph: {
      title: `${room.name} | ${site.name}`,
      description: room.shortDescription,
      images: [room.coverImage],
      url: `${site.url}/salas/${room.slug}`,
    },
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <article className="pt-24 md:pt-28">
      <div className="container-page">
        <Link
          href="/salas"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver a las salas
        </Link>
      </div>

      {/* 8.1 Encabezado */}
      <header className="container-page mt-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
          {room.category}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">{room.name}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          {room.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-lg text-ink">
            <span className="text-ink-muted">Precio: </span>
            {room.priceLabel}
          </p>
          <a href="#solicitar" className="btn-primary text-sm">
            Solicitar reserva
          </a>
        </div>
      </header>

      {/* 8.2 Galería */}
      <div className="container-page mt-10">
        <RoomGallery images={room.gallery} roomName={room.name} />
      </div>

      {/* Cuerpo: descripción + servicios / info lateral */}
      <div className="container-page mt-16 grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2">
          {/* 8.4 Descripción */}
          <section>
            <h2 className="font-serif text-2xl text-ink">Sobre la sala</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink-soft">
              {room.fullDescription}
            </p>
          </section>

          {/* 8.5 Servicios incluidos */}
          {room.includedServices.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl text-ink">Servicios incluidos</h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
                Datos provisorios — pendientes de confirmar.
              </p>
              <div className="mt-6">
                <FeaturesGrid items={room.includedServices} columns={2} />
              </div>
            </section>
          )}

          {/* 8.6 Servicios adicionales */}
          {room.optionalServices && room.optionalServices.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl text-ink">Servicios adicionales</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {room.optionalServices.map((service) => (
                  <li
                    key={service.name}
                    className="flex items-center justify-between gap-4 py-3.5 text-sm"
                  >
                    <span className="text-ink-soft">{service.name}</span>
                    <span className="text-ink-muted">{service.priceLabel}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 8.7 Condiciones */}
          {room.conditions && room.conditions.length > 0 && (
            <section className="mt-12">
              <RoomConditions conditions={room.conditions} />
            </section>
          )}
        </div>

        {/* 8.3 Información principal (lateral) */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl text-ink">Información</h2>
            <div className="mt-6">
              <RoomInformation room={room} />
            </div>
            <a href="#solicitar" className="btn-primary mt-6 w-full">
              Solicitar disponibilidad
            </a>
          </div>
        </aside>
      </div>

      {/* 8.8 Formulario de solicitud */}
      <section id="solicitar" className="mt-20 scroll-mt-24 bg-peach-50">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">
              Solicitar disponibilidad
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              Completá tus datos y contanos qué necesitás. Nos comunicaremos para confirmar
              disponibilidad, condiciones y precio final.
            </p>
            <div className="mt-10">
              <BookingRequestForm roomId={room.id} roomName={room.name} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
