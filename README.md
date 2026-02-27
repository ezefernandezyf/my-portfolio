# My Portfolio

Portfolio personal de Ezequiel Fernández — Front-end Developer.

## Demo

- Demo en: https://ezefernandez.com

## Resumen

Proyecto construido con Vite + React. Incluye páginas principales (Home, About, Projects, Contact, Privacy) y soporte completo de internacionalización (i18n, ES/EN). Tests con Vitest + React Testing Library.

## Tecnologías

- React (TSX)
- Vite
- TypeScript
- Tailwind / CSS
- react-hook-form, Zod
- i18next (localización)
- Vitest + React Testing Library
- Prettier, ESLint
- Deploy: Vercel 

## Estructura relevante

- src/pages — páginas (Home, About, Projects, Contact, Privacy, etc.)
- src/components — componentes reutilizables (Header, Footer, TechCategories, ProjectCard...)
- src/locales — traducciones (es / en)
- src/data — contenidos y referencias (ids / keys)
- src/setupTests.ts — mock de i18n y configuración de tests

## Capturas

### Vista Desktop (Home)
![Home - Hero y preview de proyecto](/public/screenshots/screenshot-home-desktop.png)

### Case study: CineLab
![CineLab case study — detalles del proyecto](/public/screenshots/screenshot-project-cinelab.png)

### Formulario de contacto (Mobile)
![Formulario de contacto — vista móvil](/public/screenshots/screenshot-contact-mobile.png)

### Vista Desktop (Mobile)
![Home - Mobile](/public/screenshots/screenshot-home.png)

## Requisitos locales

- Node.js >= 18 (recomendado)
- npm (o yarn/pnpm)
- Windows: Git Bash (ya usado en desarrollo)

## Variables de entorno

- Crea un `.env` local (NO comitear) basado en `.env.example`.
- Prefijo Vite: todas las variables deben empezar con `VITE_`.

Ejemplo (.env.local):

```
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.example/api/contact
```

## Instalación y desarrollo (Git Bash / terminal)

```bash
# clona el repo
git clone git@github.com:ezefernandezyf/my-portfolio.git
cd my-portfolio

# instala dependencias
npm install

# desarrollo (Vite)
npm run dev
# abrir http://localhost:5173 por defecto
```

## Scripts útiles

- `npm run dev` — arranca Vite en dev
- `npm run build` — build de producción (genera `dist`)
- `npm run preview` — preview del build local (`vite preview`)
- `npm run test` — ejecuta Vitest
- `npm run lint` — ESLint (si está configurado)
- `npm run format` — Prettier (si está configurado)

## Testing

- Tests con Vitest; el setup incluye un mock de `react-i18next` para que los tests sean i18n-agnósticos.

```bash
npm run test
```

## Deploy (Vercel)

Recomendado: conectar el repo desde Vercel (GitHub integration). Configuración mínima:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite (o Static Build)

Opcional: añade `vercel.json` (ya incluido) para forzar comportamiento SPA y rewrite a index.html.

### Variables en Vercel

Configura las mismas variables `VITE_...` en Settings → Environment Variables.

## Consideraciones de seguridad

- No commitear `.env` ni secretos.
- Usa `.env.example` para documentar variables necesarias.
- Revisa que no haya claves reales en locales o commits.

## Contribución / convención

- Branches: `feature/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- Commits: Conventional Commits (feat/fix/chore/docs/test)
- Antes de abrir PR: corre `npm run test`, `npm run lint`, `npm run build`.

## Notas finales

- Este repo está configurado para i18n (ES/EN). Si agregás namespaces, actualizá `src/setupTests.ts` para que los tests funcionen.
- Para preguntas o ayuda con el deploy, avisame y lo hacemos juntos.
