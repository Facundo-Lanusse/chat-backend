## Resumen y objetivo general
El ejercicio consiste en construir un chat sencillo en el que la persona escribe un mensaje en la interfaz
web y recibe una respuesta generada por la API de Gemini. El flujo debe ser el siguiente:

1. La persona escribe un mensaje de texto.
2. El front‑end envía la petición a su propio back‑end (no se permite llamar directamente a Gemini
desde el front) indicando el id de conversación.
3. El back‑end persiste el mensaje de la persona en Postgres, invoca a la API de Gemini y guarda la
respuesta en la misma conversación.
4. El back‑end devuelve la respuesta y el front‑end la muestra.

La aplicación no debe tener registro de usuarios ni login. Solo gestiona conversaciones anónimas.
