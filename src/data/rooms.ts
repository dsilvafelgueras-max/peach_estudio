// Fuente única de verdad para los espacios de Peach Estudio.
// Editar acá para cambiar textos, precios o imágenes; los componentes leen de este archivo.
// Los valores marcados "A confirmar" están pendientes de validación (ver CONTENT_TODO.md).

export type RoomCategory = "beauty" | "estudio";

export type Room = {
  id: string;
  slug: string;
  name: string;
  /** Etiqueta de categoría legible que se muestra en la UI. */
  category: string;
  /** Clave de categoría usada por los filtros. */
  categoryKey: RoomCategory;
  /** Marca si el puesto es privado (solo el verde). */
  isPrivate?: boolean;
  shortDescription: string;
  fullDescription: string;
  /** Texto que se muestra como precio (ej. "A confirmar" o "$X por hora"). */
  priceLabel: string;
  /** Aclaración breve bajo el precio (ej. condiciones de reserva). */
  priceNote?: string;
  pricePerHour?: number;
  currency: "ARS" | "USD";
  minimumHours?: number;
  capacity?: number;
  /** Texto libre de capacidad cuando no es un número simple (ej. "4 (ampliable a 6)"). */
  capacityLabel?: string;
  sizeM2?: number;
  /** Texto libre de superficie (ej. "3 x 5 m"). */
  sizeLabel?: string;
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

// Etiquetas de filtro para la página /salas. La clave "all" agrupa todos.
export const roomFilters: { key: "all" | RoomCategory; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "beauty", label: "Puestos beauty" },
  { key: "estudio", label: "Estudio" },
];

// Concepto general del sector beauty (compartido en las descripciones).
// Pensado para maquilladores profesionales: dictar clases, atender clientes o hacer pruebas.
const reservaCondiciones = [
  "Reserva mínima: 2 horas.",
  "Para garantizar la disponibilidad de la fecha elegida, se solicita un anticipo del 50% del presupuesto, mediante transferencia bancaria.",
  "El 50% restante se abona el día del alquiler, al inicio de la jornada.",
  "Una vez recibido el anticipo, tu reserva queda confirmada y la fecha queda bloqueada exclusivamente para vos.",
  "Cuidado del espacio y del equipamiento a cargo de quien reserva.",
];

// TODO(Peach Estudio): confirmar precios por espacio, superficie y servicios.
export const rooms: Room[] = [
  {
    id: "puesto-para-4",
    slug: "beauty-1",
    name: "Beauty 1",
    category: "Puesto beauty",
    categoryKey: "beauty",
    shortDescription:
      "Barra con espejo iluminado tipo camarín, ideal para trabajar con varias personas a la vez.",
    fullDescription:
      "Un puesto de trabajo amplio, con barra y espejo de iluminación tipo camarín, pensado para maquilladores profesionales: " +
      "desde dictar clases hasta atender clientas o hacer pruebas. Se puede sumar el puesto individual (Beauty 2) de al lado cuando " +
      "necesitás más lugar. Además del espejo, contamos con mesa auxiliar para accesorios y producciones, y distintas mesas para utilizar según lo que necesites.",
    priceLabel: "",
    currency: "ARS",
    capacity: 4,
    capacityLabel: "4 personas (ampliable a 6 sumando Beauty 2)",
    minimumHours: 2,
    coverImage: "/images/rooms/beauty4/beauty4-01.jpg",
    gallery: [
      "/images/rooms/beauty4/beauty4-01.jpg",
      "/images/rooms/beauty4/beauty4-03-6personas.jpg",
      "/images/rooms/beauty4/beauty4-02-unidos.jpg",
    ],
    // TODO(Peach Estudio): confirmar características reales.
    features: [
      "Barra para 4 puestos (ampliable a 6)",
      "Espejo con iluminación tipo camarín",
      "Mesa auxiliar para accesorios",
      "Buena iluminación",
      "Wi-Fi",
    ],
    includedServices: [
      "Wi-Fi",
      "Espejo iluminado",
      "Mesa auxiliar y mesas de trabajo",
      "Tomas eléctricas",
      "Baño",
    ],
    conditions: reservaCondiciones,
    featured: true,
  },
  {
    id: "puesto-individual",
    slug: "beauty-2",
    name: "Beauty 2",
    category: "Puesto beauty",
    categoryKey: "beauty",
    shortDescription:
      "Puesto individual con espejo de 2,20 m de alto, cómodo para maquillaje y peinado de una persona.",
    fullDescription:
      "Un puesto de trabajo individual, con espejo de 2,20 m de alto, ideal para maquilladores profesionales que atienden " +
      "a una clienta con comodidad, hacen pruebas o preparan un look sin apuro. Un ambiente prolijo y con buena luz para " +
      "trabajar en detalle. Se puede combinar con Beauty 1 de al lado cuando necesitás más lugar. " +
      "Contamos también con mesa auxiliar para accesorios y distintas mesas para utilizar.",
    priceLabel: "",
    currency: "ARS",
    capacity: 1,
    minimumHours: 2,
    // Portada: espejo en alto. 2ª (hover): sillón de perfil.
    coverImage: "/images/rooms/beauty-individual/beauty-individual-04.jpg",
    gallery: [
      "/images/rooms/beauty-individual/beauty-individual-04.jpg",
      "/images/rooms/beauty-individual/beauty-individual-01.jpg",
      "/images/rooms/beauty-individual/beauty-individual-02-6personas.jpg",
      "/images/rooms/beauty-individual/beauty-individual-03-unidos.jpg",
    ],
    features: [
      "Puesto individual",
      "Espejo de 2,20 m de alto",
      "Mesa auxiliar para accesorios",
      "Buena iluminación",
      "Wi-Fi",
    ],
    includedServices: [
      "Wi-Fi",
      "Espejo iluminado",
      "Mesa auxiliar y mesas de trabajo",
      "Tomas eléctricas",
      "Baño",
    ],
    conditions: reservaCondiciones,
    featured: true,
  },
  {
    id: "puesto-privado",
    slug: "beauty-3",
    name: "Beauty 3",
    category: "Puesto beauty · privado",
    categoryKey: "beauty",
    isPrivate: true,
    shortDescription:
      "Espacio privado, ideal para prueba de novia. Camilla opcional para tratamientos.",
    fullDescription:
      "El único puesto privado del estudio: un espacio reservado y tranquilo para atención personalizada y servicios que necesitan intimidad. " +
      "Ideal para pruebas de novia. Cuenta con camilla opcional marca Sierra Comfort, exclusiva de este espacio, ideal para tratamientos " +
      "faciales, cejas, masajes y más. Un ambiente prolijo, con mesa auxiliar para accesorios y distintas mesas para utilizar.",
    priceLabel: "",
    currency: "ARS",
    capacity: 2,
    capacityLabel: "2 personas (+ espera para 2 más)",
    minimumHours: 2,
    coverImage: "/images/rooms/beauty-privado/beauty-privado-01.jpg",
    gallery: [
      "/images/rooms/beauty-privado/beauty-privado-01.jpg",
      "/images/rooms/beauty-privado/beauty-privado-02.jpg",
      "/images/rooms/beauty-privado/beauty-privado-03-unidos.jpg",
    ],
    features: [
      "Espacio privado",
      "Capacidad para 2 (+ espera para 2)",
      "Camilla Sierra Comfort (opcional)",
      "Ideal prueba de novia",
      "Mesa auxiliar para accesorios",
      "Wi-Fi",
    ],
    includedServices: [
      "Wi-Fi",
      "Espacio privado",
      "Espejo iluminado",
      "Mesa auxiliar y mesas de trabajo",
      "Tomas eléctricas",
      "Baño",
    ],
    optionalServices: [
      {
        name: "Camilla Sierra Comfort para tratamientos (faciales, cejas, masajes)",
        priceLabel: "Consultar",
      },
    ],
    conditions: reservaCondiciones,
    featured: true,
  },
  {
    id: "estudio",
    slug: "estudio",
    name: "Estudio",
    category: "Fotografía y contenido",
    categoryKey: "estudio",
    shortDescription:
      "Un ambiente versátil para sesiones de fotos, retratos, producto y creación de contenido.",
    fullDescription:
      "Un ambiente versátil para sesiones de fotos, retratos, producto y creación de contenido. " +
      "Espacio de 3 x 5 m, preparado para fotografía, video y producciones, con 3 fondos a elección: blanco, negro y croma. " +
      "Cuenta además con monitor / pantalla grande, ideal para dictar masterclass, cursos y capacitaciones. " +
      "El fondo croma permite reemplazar el entorno en edición, y el espacio se adapta a producciones chicas y medianas.",
    priceLabel: "",
    priceNote:
      "La jornada completa (8 hs) incluye todo el estudio: los 3 puestos beauty + el estudio de fotografía.",
    currency: "ARS",
    sizeLabel: "3 x 5 m",
    // Portada: fondo blanco. Galería: los 3 fondos (blanco, negro, verde) + set.
    coverImage: "/images/rooms/estudio/fondo-blanco.png",
    gallery: [
      "/images/rooms/estudio/fondo-blanco.png",
      "/images/rooms/estudio/fondo-negro.png",
      "/images/rooms/estudio/fondo-verde.jpg",
      "/images/rooms/estudio/masterclass-01.jpg",
      "/images/rooms/estudio/masterclass-02.jpg",
      "/images/rooms/estudio/masterclass-03.jpg",
    ],
    features: [
      "Espacio de 3 x 5 m",
      "3 fondos: blanco, negro y croma",
      "Softboxes e iluminación LED",
      "Monitor / pantalla grande para masterclass",
      "Espacio versátil",
      "Wi-Fi",
    ],
    includedServices: [
      "Wi-Fi",
      "3 fondos (blanco, negro, croma)",
      "Softboxes e iluminación de estudio",
      "Monitor / pantalla grande",
      "Tomas eléctricas",
      "Baño",
    ],
    optionalServices: [
      { name: "Iluminación adicional", priceLabel: "Consultar" },
      { name: "Asistencia de producción", priceLabel: "Consultar" },
      { name: "Horas extra", priceLabel: "Consultar" },
    ],
    conditions: [
      "La jornada completa (8 hs) incluye los 3 puestos beauty + el estudio de fotografía.",
      "Para garantizar la disponibilidad de la fecha elegida, se solicita un anticipo del 50% del presupuesto, mediante transferencia bancaria.",
      "El 50% restante se abona el día del alquiler, al inicio de la jornada.",
      "Una vez recibido el anticipo, tu reserva queda confirmada y la fecha queda bloqueada exclusivamente para vos.",
      "Cuidado del espacio y del equipamiento a cargo de quien reserva.",
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

// Opciones de "¿Qué querés hacer?" para el formulario de reserva.
export const productionTypes = [
  "Maquillaje / beauty",
  "Clase / masterclass de maquillaje",
  "Prueba de novia",
  "Tratamiento facial / cejas / masajes",
  "Sesión de fotos",
  "Fotografía de producto",
  "Producción de video",
  "Contenido para redes",
  "Casting o fitting",
  "Otro",
] as const;
