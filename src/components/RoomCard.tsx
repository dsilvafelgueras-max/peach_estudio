import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Room } from "@/data/rooms";

// Tarjeta editorial de sala, sin sombras pesadas (componente de servidor).
export default function RoomCard({
  room,
  priority = false,
}: {
  room: Room;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/salas/${room.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-peach-50"
      >
        <Image
          src={room.coverImage}
          alt={`${room.name} — ${room.category}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
        {/* Segunda foto: aparece al pasar el mouse / enfocar la tarjeta. */}
        {room.gallery[1] && (
          <Image
            src={room.gallery[1]}
            alt={`${room.name} — otra vista`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
          />
        )}
        {room.isPrivate && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
            Privado
          </span>
        )}
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
          {room.category}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-ink">
          <Link href={`/salas/${room.slug}`}>{room.name}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {room.shortDescription}
        </p>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-muted">
          <div className="flex gap-1.5">
            <dt>Capacidad:</dt>
            <dd>
              {room.capacityLabel
                ? room.capacityLabel
                : room.capacity
                  ? `${room.capacity} ${room.capacity === 1 ? "persona" : "personas"}`
                  : "A confirmar"}
            </dd>
          </div>
          {room.priceLabel && (
            <div className="flex gap-1.5">
              <dt>Precio:</dt>
              <dd>{room.priceLabel}</dd>
            </div>
          )}
        </dl>

        <Link
          href={`/salas/${room.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          <span className="link-underline">Ver espacio</span>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
