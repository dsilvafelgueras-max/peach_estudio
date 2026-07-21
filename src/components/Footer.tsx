import Link from "next/link";
import { site } from "@/data/site";
import { rooms } from "@/data/rooms";

// Footer sobre fondo oscuro (componente de servidor).
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/90">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4 md:py-20">
        <div className="md:col-span-1">
          <p className="font-serif text-2xl text-white">Peach Estudio</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Espacios creativos para producciones de fotografía, video, maquillaje y
            contenido. Salas disponibles para alquilar por hora.
          </p>
        </div>

        <nav aria-label="Navegación del sitio">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Navegación
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/" className="link-underline text-white/80 hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/salas" className="link-underline text-white/80 hover:text-white">
                Salas
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="link-underline text-white/80 hover:text-white">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Salas">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Salas
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {rooms.map((room) => (
              <li key={room.slug}>
                <Link
                  href={`/salas/${room.slug}`}
                  className="link-underline text-white/80 hover:text-white"
                >
                  {room.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Contacto
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>{site.contact.email}</li>
            <li>{site.contact.phone}</li>
            <li>{site.contact.instagram}</li>
          </ul>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link
                href="/terminos"
                className="link-underline text-white/60 hover:text-white"
              >
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link
                href="/privacidad"
                className="link-underline text-white/60 hover:text-white"
              >
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/40">
          © {year} Peach Estudio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
