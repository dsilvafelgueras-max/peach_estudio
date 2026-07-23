# Contenido pendiente — Peach Estudio

Lista de la información que todavía hay que completar. Los valores provisorios
aparecen en el sitio como `A confirmar` o entre corchetes (ej. `[EMAIL_PEACH_STUDIO]`).

## Datos de contacto
Editar en [`src/data/site.ts`](src/data/site.ts):

- [ ] Email de contacto — `[EMAIL_PEACH_STUDIO]`
- [ ] Teléfono — `[TELEFONO_PEACH_STUDIO]`
- [ ] WhatsApp (puede ser el mismo teléfono)
- [ ] Instagram — `[INSTAGRAM_PEACH_STUDIO]`
- [x] Dirección — Güemes 4821, Palermo, CABA ✓
- [ ] Horarios de atención — `[HORARIOS_PEACH_STUDIO]`

## Datos de cada espacio
Editar en [`src/data/rooms.ts`](src/data/rooms.ts) por cada espacio:

- [x] Estructura definida: 3 puestos beauty (para 4 ampliable a 6, individual, privado) + Estudio ✓
- [x] Precio del Estudio: $250.000 por jornada (reserva 50%, no reembolsable) ✓
- [ ] Precio de los puestos beauty (hoy "Consultar")
- [ ] Cantidad mínima de horas (`minimumHours`)
- [ ] Superficie de los puestos beauty (el Estudio ya es 3x5 m ✓)
- [ ] Confirmar servicios incluidos reales por espacio
- [ ] Precio de la camilla Sierra Comfort (opcional, solo en el privado)
- [ ] Foto del conjunto "sala de 4 + la de al lado = 6" (cuando la tengan)

## Video del recorrido
- [ ] Pasar el video (archivo MP4 o link de YouTube/Vimeo) para cargarlo en
      [`src/components/VideoSection.tsx`](src/components/VideoSection.tsx).

## Equipamiento (sección de la home)
Editar en [`src/components/EquipmentSection.tsx`](src/components/EquipmentSection.tsx):

- [ ] Confirmar detalle y cantidades reales (softboxes, luces LED, fondos, TV, croma).
- [ ] Ajustar los textos si hace falta.

## Condiciones (por sala, campo `conditions`)
- [ ] Política de cancelación
- [ ] Horario de ingreso y salida
- [ ] Cuidado del espacio y del equipamiento
- [ ] Uso del equipamiento
- [ ] Seña o forma de confirmación
- [ ] Formas de pago

## Legales
- [ ] Revisar / validar [Política de privacidad](src/app/privacidad/page.tsx)
- [ ] Revisar / validar [Términos y condiciones](src/app/terminos/page.tsx)

## Imágenes
Las fotos actuales están en [`public/images/`](public/images/). Para reemplazarlas,
mantené los mismos nombres de archivo (o actualizá las rutas en `rooms.ts` / `site.ts`).

- [ ] Fotografías finales de la Sala de Maquillaje (`public/images/rooms/makeup/`)
- [ ] Fotografías finales del Estudio Fotográfico (`public/images/rooms/photo/`)
- [ ] Fotografías finales del Estudio con Croma (`public/images/rooms/chroma/`)
- [ ] Foto de portada del hero (`public/images/home/hero-placeholder.jpg`)
- [ ] Imágenes de la sección "El estudio" (`public/images/home/`)

## Identidad
- [ ] Logo definitivo (hoy es un logo tipográfico "Peach Estudio")
- [ ] Favicon definitivo (hoy es un placeholder en `src/app/icon.svg`)
