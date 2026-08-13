# Diseño: Integración convenio SKY

Fecha: 2026-08-13
Estado: aprobado para planificación

## Objetivo

Incorporar el convenio SKY de ASEMUCH Coquimbo en el sitio de forma visible, clara y coherente con la estructura actual, usando la pieza gráfica entregada en `public/images/conveniosky.jpeg`.

## Alcance

El cambio considera dos puntos:

1. Un bloque principal del convenio SKY en la página `/convenios`.
2. Un teaser breve en la portada que derive a `/convenios`.

No se consideran cambios de navegación, nuevas rutas, CMS, ni carga dinámica adicional.

## Decisión de ubicación

La ubicación principal será la página `/convenios`, dentro del bloque local de ASEMUCH Coquimbo y antes del listado de convenios nacionales. Esta decisión reemplaza el bloque temporal actual de Skype, porque:

- Es el lugar más lógico para un beneficio concreto.
- Mantiene separados los convenios locales de los convenios nacionales.
- Permite mostrar la gráfica oficial completa sin sobrecargar la portada.

La portada incluirá solo una pieza resumida tipo teaser, pensada para visibilidad y derivación.

## Diseño funcional

### `/convenios`

El bloque destacado del convenio SKY debe:

- Mantener el rótulo `Convenio ASEMUCH Coquimbo`.
- Usar la imagen `conveniosky.jpeg` como elemento principal del bloque.
- Mostrar una síntesis textual con el beneficio principal.
- Destacar el código promocional `SKYASEMUCH135`.
- Mostrar la vigencia informada en la pieza: `01 de julio al 31 de julio de 2026`.
- Incluir un llamado a la acción claro para revisar el convenio.

El bloque debe sentirse institucional y no como banner invasivo. La composición ideal es una tarjeta destacada con imagen, texto de apoyo y datos rápidos.

### Portada

La portada sumará un teaser breve dentro de la sección de beneficios actual. Ese teaser debe:

- Presentar el convenio SKY como beneficio vigente o destacado.
- Resumir el beneficio en una o dos líneas.
- Incluir enlace visible a `/convenios`.
- Mantener la estética del grid existente, sin introducir una pieza promocional de tamaño dominante.

## Contenido base

Texto sugerido para `/convenios`:

- Título: `Convenio SKY - ASEMUCH Coquimbo`
- Resumen: `Accede a un 10% de descuento en la compra de pasajes SKY usando el código promocional informado para afiliadas y afiliados de ASEMUCH.`
- Código: `SKYASEMUCH135`
- Vigencia: `Válido del 01 de julio al 31 de julio de 2026`

Texto sugerido para teaser en portada:

- Título: `Nuevo convenio SKY`
- Resumen: `10% de descuento en pasajes para afiliadas y afiliados. Revisa el código y la vigencia del beneficio.`

## Comportamiento

- El teaser de portada enlazará a `/convenios`.
- El bloque principal de `/convenios` mostrará la gráfica local sin depender de APIs externas.
- El listado de convenios nacionales seguirá cargándose igual que hoy.
- Si más adelante aparecen más convenios locales, este bloque puede evolucionar a una lista de convenios destacados de Coquimbo, pero en esta iteración se mantiene uno solo.

## Riesgos y criterios

- La vigencia mostrada en la pieza corresponde a julio de 2026, por lo que el sitio mostrará un convenio ya vencido si no se actualiza luego. En esta iteración se respeta exactamente el material entregado por el usuario.
- El teaser no debe competir visualmente con los beneficios institucionales principales.
- No deben introducirse estilos aislados que rompan el lenguaje visual del sitio.

## Verificación esperada

- `/convenios` muestra el nuevo bloque SKY en lugar del convenio Skype.
- La pieza gráfica carga correctamente desde `public/images/conveniosky.jpeg`.
- La home muestra un teaser breve con enlace funcional a `/convenios`.
- El resto de la página de convenios sigue funcionando, incluyendo buscador y listado nacional.
