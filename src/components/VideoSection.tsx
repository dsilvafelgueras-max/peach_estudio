import { Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// Sección de video del recorrido por el estudio.
// PREPARADA PARA CARGAR EL VIDEO: cuando Peach Estudio provea el archivo o el
// link (YouTube/Vimeo/MP4), reemplazar el bloque placeholder por el <video> o
// <iframe> correspondiente. Ver CONTENT_TODO.md.
export default function VideoSection() {
  // TODO(Peach Estudio): definir la fuente del video.
  // - MP4 propio:  <video src="/videos/recorrido.mp4" controls poster="..." />
  // - YouTube:     <iframe src="https://www.youtube.com/embed/ID" ... />
  const videoSrc: string | null = null;

  return (
    <section className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Recorrido"
            title="Conocé el estudio en video."
            description="Un recorrido por los puestos beauty, el estudio y los espacios comunes para que veas cómo es todo antes de reservar."
            align="center"
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-ink/5">
            {videoSrc ? (
              // Cuando haya video, reemplazar por el reproductor real.
              <video
                src={videoSrc}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-ink-muted">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/20">
                  <Play size={22} aria-hidden="true" />
                </span>
                <p className="text-sm">Video del recorrido — próximamente</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
