import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// Sección de video del recorrido por el estudio.
// Para cambiar el video, reemplazá public/videos/recorrido-horizontal.mp4
// (mismo nombre) o actualizá videoSrc / poster acá.
export default function VideoSection() {
  const videoSrc = "/videos/recorrido-horizontal.mp4";
  // Póster horizontal que combina con el formato del video (16:9).
  const poster = "/images/rooms/estudio/fondo-blanco.png";

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

        {/* Video horizontal (16:9). Se muestra en un ancho acotado a su
            resolución nativa para que se vea nítido y no pixelado, centrado y
            sin deformarse. */}
        <Reveal className="mx-auto mt-12 flex justify-center">
          <video
            src={videoSrc}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full max-w-[820px] rounded-2xl bg-black object-contain"
          >
            Tu navegador no puede reproducir este video.
          </video>
        </Reveal>
      </div>
    </section>
  );
}
