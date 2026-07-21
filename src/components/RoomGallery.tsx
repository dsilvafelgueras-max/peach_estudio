"use client";

import Image from "next/image";
import { useState } from "react";
import { Images } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

// Galería responsive: imagen principal grande + grilla de secundarias.
// Abre un lightbox al tocar cualquier imagen.
export default function RoomGallery({
  images,
  roomName,
}: {
  images: string[];
  roomName: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const [cover, ...rest] = images;
  const secondary = rest.slice(0, 4);

  const open = (i: number) => setLightboxIndex(i);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => open(0)}
          className="group relative aspect-[4/3] w-full overflow-hidden bg-peach-50 md:aspect-auto md:h-full"
          aria-label={`Ver ${roomName}, imagen 1 de ${images.length}`}
        >
          <Image
            src={cover}
            alt={`${roomName} — imagen principal`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
        </button>

        {secondary.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {secondary.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => open(i + 1)}
                className="group relative aspect-[4/3] w-full overflow-hidden bg-peach-50"
                aria-label={`Ver ${roomName}, imagen ${i + 2} de ${images.length}`}
              >
                <Image
                  src={src}
                  alt={`${roomName} — imagen ${i + 2}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Overlay "Ver todas las fotos" en la última miniatura si hay más. */}
                {i === secondary.length - 1 && images.length > secondary.length + 1 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
                    +{images.length - secondary.length - 1} fotos
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => open(0)}
        className="btn-secondary mt-4 text-sm"
      >
        <Images size={16} aria-hidden="true" />
        Ver todas las fotos
      </button>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          alt={roomName}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
