# Ocean Digital Services — web

Web estática (HTML + CSS + JS, sin build), publicada en Vercel desde la rama `main` de este repositorio: cada push se despliega solo.

- `index.html` — página principal
- `aviso-legal.html`, `privacidad.html`, `cookies.html` — páginas legales
- `404.html` — página de error (Vercel la usa sola)
- `robots.txt`, `sitemap.xml` — para buscadores
- `fonts/` — tipografías alojadas aquí: la web no hace peticiones a Google ni usa cookies, así que no necesita aviso de cookies

## Antes de publicar

1. Rellenar los datos marcados como `PENDIENTE` en las páginas legales (titular, NIF/CIF, domicilio, correo y, si es una sociedad, datos registrales).
2. Dominio: **www.oceandigitalservices.com** (ya puesto en canónicas, sitemap y robots). `oceandigitalservices.com` redirige a `www` desde Vercel.

3. Comprobar que no queda nada pendiente (no debe imprimir nada):

   ```bash
   grep -rn "PENDIENTE" --include="*.html" --include="*.txt" --include="*.xml" .
   ```

## Vista previa local

```bash
python3 -m http.server 8742
```
