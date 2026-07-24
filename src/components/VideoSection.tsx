import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// Sección de video del recorrido por el estudio.
// Para cambiar el video, reemplazá public/videos/recorrido.mp4 (mismo nombre)
// o actualizá videoSrc / poster acá.
export default function VideoSection() {
  const videoSrc = "/videos/recorrido.mp4";
  // Póster vertical para que combine con el formato del video (retrato).
  const poster = "/images/rooms/estudio/estudio-02.jpg";

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

        {/* El video es vertical (formato celular): lo mostramos en retrato,
            centrado y con altura contenida para que no se recorte. */}
        <Reveal className="mx-auto mt-12 flex justify-center">
          <div className="relative aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl bg-ink/5">
            <video
              src={videoSrc}
              poster={poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
