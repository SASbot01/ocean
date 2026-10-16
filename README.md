# Ocean Consulting Group — web

Web estática (HTML + CSS + JS, sin build). Se publica subiendo la carpeta tal cual.

- `index.html` — página principal
- `aviso-legal.html`, `privacidad.html`, `cookies.html` — páginas legales
- `404.html` — página de error (Netlify, Cloudflare Pages y GitHub Pages la usan solas)
- `robots.txt`, `sitemap.xml` — para buscadores
- `fonts/` — tipografías alojadas aquí: la web no hace peticiones a Google ni usa cookies, así que no necesita aviso de cookies

## Antes de publicar

1. Rellenar los datos marcados como `PENDIENTE` en las páginas legales (titular, NIF/CIF, domicilio, correo y, si es una sociedad, datos registrales).
2. Sustituir `__DOMINIO__` por el dominio definitivo (sin `https://`), por ejemplo:

   ```bash
   grep -rl "__DOMINIO__" . | xargs sed -i '' 's/__DOMINIO__/oceanconsulting.es/g'
   ```

3. Comprobar que no queda nada pendiente (no debe imprimir nada):

   ```bash
   grep -rn "PENDIENTE\|__DOMINIO__" --include="*.html" --include="*.txt" --include="*.xml" .
   ```

## Vista previa local

```bash
python3 -m http.server 8742
```
