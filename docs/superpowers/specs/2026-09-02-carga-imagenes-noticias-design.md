# Carga de Imagenes de Noticias

**Objetivo:** Permitir al administrador de ASEMUCH subir desde su computador una o varias imagenes para una noticia.

## Alcance

- La carga se habilita solo en noticias.
- El administrador puede subir una o varias imagenes desde el computador o, de forma secundaria, usar una URL existente como portada.
- Cada imagen se muestra en una vista previa antes de guardar la noticia.
- La primera imagen es la portada utilizada en los listados; las restantes forman la galeria de la noticia.
- Al reemplazar o quitar una imagen cargada, el archivo anterior se elimina de Storage para no acumular archivos sin uso.

## Experiencia del Panel

El formulario de noticia mostrara un bloque "Imagenes de la noticia" con "Subir desde mi computador" como accion principal y "Usar enlace externo" como alternativa para la portada. Al seleccionar archivos validos se mostrara una cuadrilla de previsualizaciones con nombre y accion para quitar cada imagen antes de guardar.

## Reglas de Seguridad

- Solo la cuenta administradora autenticada puede cargar o eliminar archivos.
- Se permiten JPG, PNG y WebP de hasta 5 MB por archivo, con un maximo de 10 imagenes por noticia.
- El servidor valida tipo, tamano y sesion; la extension visible nunca se usa como unica validacion.
- Los archivos se almacenan en el bucket publico existente `news-images` con una ruta unica por noticia.
- La URL publica de la primera imagen se guarda en `news.featured_image_url`; las demas se guardan en `news_images` con su orden de presentacion.

## Flujo Tecnico

1. El navegador adjunta hasta 10 imagenes al envio del formulario de noticia.
2. La Server Action valida la sesion administradora y cada archivo.
3. El servidor sube los archivos a Supabase Storage usando la clave de servicio, sin exponerla al navegador.
4. El servidor guarda las URL publicas y su orden en `news_images`; la primera tambien se copia en `news.featured_image_url`.
5. Si se reemplazan o quitan imagenes cargadas anteriormente, el servidor elimina los objetos que dejaron de pertenecer a la noticia despues de guardar los nuevos.
6. Las rutas publicas de noticias se revalidan para mostrar el cambio de inmediato.

## Verificacion

- Una o varias imagenes JPG, PNG o WebP validas se pueden asociar a una noticia.
- Un archivo no permitido o superior a 5 MB se rechaza con un mensaje claro.
- La portada aparece en listados y la galeria completa aparece en la noticia publica.
- Un usuario no autenticado no puede cargar archivos.
