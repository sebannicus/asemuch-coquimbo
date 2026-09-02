# Carga de Imagenes de Noticias

**Objetivo:** Permitir al administrador de ASEMUCH subir desde su computador la imagen destacada de una noticia.

## Alcance

- La carga se habilita solo en noticias.
- El administrador puede subir una imagen desde el computador o, de forma secundaria, usar una URL existente.
- La imagen se muestra en una vista previa antes de guardar la noticia.
- Al reemplazar una imagen cargada, el archivo anterior se elimina de Storage para no acumular archivos sin uso.

## Experiencia del Panel

El formulario de noticia mostrara un bloque "Imagen destacada" con dos opciones: "Subir desde mi computador" como accion principal y "Usar enlace externo" como alternativa. Al seleccionar un archivo valido se mostrara una previsualizacion, su nombre y una accion para quitarlo.

## Reglas de Seguridad

- Solo la cuenta administradora autenticada puede cargar o eliminar archivos.
- Se permiten JPG, PNG y WebP de hasta 5 MB.
- El servidor valida tipo, tamano y sesion; la extension visible nunca se usa como unica validacion.
- Los archivos se almacenan en el bucket publico existente `news-images` con una ruta unica por noticia.
- La URL publica se guarda en `news.featured_image_url` despues de una carga exitosa.

## Flujo Tecnico

1. El navegador adjunta la imagen al envio del formulario de noticia.
2. La Server Action valida la sesion administradora y el archivo.
3. El servidor sube el archivo a Supabase Storage usando la clave de servicio, sin exponerla al navegador.
4. El servidor guarda la URL publica resultante junto a la noticia.
5. Si se reemplaza una imagen cargada anteriormente, el servidor elimina el objeto anterior despues de guardar el nuevo.
6. Las rutas publicas de noticias se revalidan para mostrar el cambio de inmediato.

## Verificacion

- Una imagen JPG, PNG o WebP valida se puede asociar a una noticia.
- Un archivo no permitido o superior a 5 MB se rechaza con un mensaje claro.
- La imagen cargada aparece en la noticia publica.
- Un usuario no autenticado no puede cargar archivos.
