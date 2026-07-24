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

        {/* El video es vertical (formato celular). Usamos object-contain y un
            tamaño acotado (altura máxima) para que no se deforme ni se agrande. */}
        <Reveal className="mx-auto mt-12 flex justify-center">
          <video
            src={videoSrc}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="h-auto max-h-[70vh] w-auto max-w-full rounded-2xl bg-black object-contain"
          >
            Tu navegador no puede reproducir este video.
          </video>
        </Reveal>
      </div>
    </section>
  );
}
