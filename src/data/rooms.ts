// Fuente única de verdad para las salas de Peach Estudio.
// Editar acá para cambiar textos, precios o imágenes; los componentes leen de este archivo.
// Los valores marcados "A confirmar" están pendientes de validación (ver CONTENT_TODO.md).

export type RoomCategory = "makeup" | "photo" | "chroma";

export type Room = {
  id: string;
  slug: string;
  name: string;
  /** Etiqueta de categoría legible que se muestra en la UI. */
  category: string;
  /** Clave de categoría usada por los filtros. */
  categoryKey: RoomCategory;
  shortDescription: string;
  fullDescription: string;
  /** Texto que se muestra como precio (ej. "A confirmar" o "$X por hora"). */
  priceLabel: string;
  pricePerHour?: number;
  currency: "ARS" | "USD";
  minimumHours?: number;
  capacity?: number;
  sizeM2?: number;
  coverImage: string;
  gallery: string[];
  features: string[];
  includedServices: string[];
  optionalServices?: {
    name: string;
    priceLabel: string;
  }[];
  conditions?: string[];
  featured: boolean;
};

// Etiquetas de filtro para la página /salas. La clave "all" agrupa todas.
export const roomFilters: { key: "all" | RoomCategory; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "makeup", label: "Maquillaje" },
  { key: "photo", label: "Fotografía" },
  { key: "chroma", label: "Video y croma" },
];

// TODO(Peach Estudio): confirmar precios, capacidad, superficie, servicios y condiciones.
export const rooms: Room[] = [
  {
    id: "sala-de-maquillaje",
    slug: "sala-de-maquillaje",
    name: "Sala de Maquillaje",
    category: "Maquillaje y preparación",
    categoryKey: "makeup",
    shortDescription:
      "Un espacio cómodo y luminoso preparado para maquillaje, peinado y producción.",
    fullDescription:
      "Una sala pensada para la preparación previa a cualquier producción: maquillaje, peinado y styling. " +
      "Cuenta con estaciones frente a espejos con iluminación pareja, ideal para trabajar en detalle y sin apuro. " +
      "Sirve tanto para make-up artists que atienden clientas como para equipos que necesitan un lugar de preparación " +
      "antes de una sesión de fotos o un rodaje. Un ambiente prolijo, silencioso y con buena luz para que cada look salga como fue pensado.",
    priceLabel: "A confirmar",
    currency: "ARS",
    coverImage: "/images/rooms/makeup/makeup-room-01.jpg",
    gallery: [
      "/images/rooms/makeup/makeup-room-01.jpg",
      "/images/rooms/makeup/makeup-room-02.jpg",
      "/images/rooms/makeup/makeup-room-03.jpg",
      "/images/rooms/makeup/makeup-room-04.jpg",
    ],
    // TODO(Peach Estudio): confirmar características reales de la sala.
    features: [
      "Espejos con iluminación tipo camarín",
      "Buena iluminación",
      "Zona de preparación",
      "Wi-Fi",
      "Fácil acceso",
    ],
    // TODO(Peach Estudio): confirmar servicios incluidos.
    includedServices: [
      "Wi-Fi",
      "Estaciones frente a espejo",
      "Iluminación de preparación",
      "Tomas eléctricas",
      "Baño",
    ],
    optionalServices: [
      { name: "Asistencia de producción", priceLabel: "Consultar" },
      { name: "Horas extra", priceLabel: "Consultar" },
    ],
    // TODO(Peach Estudio): validar condiciones y política de cancelación.
    conditions: [
      "Cantidad mínima de horas: a confirmar.",
      "Política de cancelación: a confirmar.",
      "Horario de ingreso y salida: a confirmar.",
      "Cuidado del espacio y del equipamiento a cargo de quien reserva.",
      "Forma de confirmación / seña: a confirmar.",
    ],
    featured: true,
  },
  {
    id: "estudio-fotografico",
    slug: "estudio-fotografico",
    name: "Estudio Fotográfico",
    category: "Fotografía",
    categoryKey: "photo",
    shortDescription:
      "Un ambiente versátil para sesiones de fotos, retratos, producto y creación de contenido.",
    fullDescription:
      "Un estudio flexible para fotografía de retrato, producto, moda y creación de contenido. " +
      "El espacio permite montar distintos sets según el proyecto y trabajar con iluminación controlada. " +
      "Es ideal para fotógrafos, marcas que producen su propio contenido y creadores que necesitan un ambiente " +
      "neutro y prolijo donde concentrarse en la toma. La disposición se adapta a producciones chicas y medianas.",
    priceLabel: "A confirmar",
    currency: "ARS",
    coverImage: "/images/rooms/photo/photo-studio-01.jpg",
    gallery: [
      "/images/rooms/photo/photo-studio-01.jpg",
      "/images/rooms/photo/photo-studio-02.jpg",
    ],
    // TODO(Peach Estudio): confirmar características reales de la sala.
    features: [
      "Espacio versátil",
      "Iluminación de estudio",
      "Buena iluminación",
      "Wi-Fi",
      "Fácil acceso",
    ],
    // TODO(Peach Estudio): confirmar servicios incluidos.
    includedServices: [
      "Wi-Fi",
      "Iluminación de estudio",
      "Tomas eléctricas",
      "Zona de preparación",
      "Baño",
    ],
    optionalServices: [
      { name: "Equipamiento adicional", priceLabel: "Consultar" },
      { name: "Fondos de colores", priceLabel: "Consultar" },
      { name: "Horas extra", priceLabel: "Consultar" },
    ],
    // TODO(Peach Estudio): validar condiciones y política de cancelación.
    conditions: [
      "Cantidad mínima de horas: a confirmar.",
      "Política de cancelación: a confirmar.",
      "Horario de ingreso y salida: a confirmar.",
      "Cuidado del espacio y del equipamiento a cargo de quien reserva.",
      "Forma de confirmación / seña: a confirmar.",
    ],
    featured: true,
  },
  {
    id: "estudio-con-croma",
    slug: "estudio-con-croma",
    name: "Estudio con Croma",
    category: "Fotografía y video",
    categoryKey: "chroma",
    shortDescription:
      "Espacio preparado para fotografía, video y producciones con pantalla verde.",
    fullDescription:
      "Un set equipado con pantalla verde (croma) para producciones de video y fotografía que requieren fondo removible. " +
      "Pensado para grabaciones de contenido, entrevistas, piezas para redes y proyectos audiovisuales que se editan luego en post. " +
      "El fondo verde permite reemplazar el entorno por cualquier escenario digital. Es una buena opción para creadores, " +
      "productoras chicas y marcas que necesitan grabar con flexibilidad de montaje.",
    priceLabel: "A confirmar",
    currency: "ARS",
    coverImage: "/images/rooms/chroma/chroma-studio-01.jpg",
    gallery: [
      "/images/rooms/chroma/chroma-studio-01.jpg",
      "/images/rooms/chroma/chroma-studio-02.jpg",
    ],
    // TODO(Peach Estudio): confirmar características reales de la sala.
    features: [
      "Pantalla verde / croma",
      "Iluminación de video",
      "Espacio versátil",
      "Wi-Fi",
      "Fácil acceso",
    ],
    // TODO(Peach Estudio): confirmar servicios incluidos.
    includedServices: [
      "Wi-Fi",
      "Pantalla verde",
      "Iluminación de video",
      "Tomas eléctricas",
      "Baño",
    ],
    optionalServices: [
      { name: "Iluminación adicional", priceLabel: "Consultar" },
      { name: "Asistencia de producción", priceLabel: "Consultar" },
      { name: "Horas extra", priceLabel: "Consultar" },
    ],
    // TODO(Peach Estudio): validar condiciones y política de cancelación.
    conditions: [
      "Cantidad mínima de horas: a confirmar.",
      "Política de cancelación: a confirmar.",
      "Horario de ingreso y salida: a confirmar.",
      "Cuidado del espacio y del equipamiento a cargo de quien reserva.",
      "Forma de confirmación / seña: a confirmar.",
    ],
    featured: true,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter((room) => room.featured);
}

// Opciones de "Tipo de producción" para el formulario de solicitud.
export const productionTypes = [
  "Maquillaje",
  "Sesión de fotos",
  "Fotografía de producto",
  "Producción de video",
  "Contenido para redes",
  "Casting o fitting",
  "Otro",
] as const;
