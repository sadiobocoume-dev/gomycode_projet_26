# Module 1 — Structure & App Router

## L'idée centrale
L'emplacement d'un fichier = l'URL de la page. Pas de configuration, pas de routeur à installer.

```
src/app/page.tsx          →  /
src/app/about/page.tsx    →  /about
src/app/projects/page.tsx →  /projects
src/app/contact/page.tsx  →  /contact
```

## Les 3 fichiers clés

### `layout.tsx`
Le cadre partagé de toutes les pages.
`{children}` = le contenu de la page en cours.
Tout ce qui est ici (navbar, footer) apparaît sur chaque page.

### `page.tsx`
Le contenu unique d'une page.
Chaque dossier a le sien.

### `globals.css`
Les variables CSS globales. Les définir ici permet de les réutiliser partout.
```css
:root {
  --color-primary: #6c63ff;
}
/* Utilisation dans n'importe quel fichier CSS */
color: var(--color-primary);
```

## Server Component vs Client Component

| | Server | Client |
|---|---|---|
| Déclaration | rien (défaut) | `"use client"` en haut |
| Peut utiliser | `async/await` | `useState`, `useEffect`, événements |

Par défaut tout est Server Component. C'est mieux pour la performance.

## Métadonnées SEO
```tsx
export const metadata: Metadata = {
  title: "À propos", // devient "À propos | Mon Portfolio" grâce au template
}
```
