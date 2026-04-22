# Module 2 — Routing & Navigation

## `<Link>` vs `<a>`
```tsx
<a href="/about">     // recharge toute la page ❌
<Link href="/about">  // navigation instantanée ✅
```
`<Link>` est importé depuis `"next/link"`.

## Lien actif avec `usePathname()`
```tsx
"use client"; // obligatoire — usePathname est un hook React

const pathname = usePathname(); // ex: "/about"
const isActive = pathname === "/about"; // true ou false

<Link className={`${styles.link} ${isActive ? styles.active : ""}`}>
```

## Pourquoi `"use client"` sur la Navbar ?
`usePathname()` s'exécute dans le navigateur pour détecter l'URL courante.
Les hooks React ne peuvent pas s'exécuter côté serveur.
Donc : Navbar = Client Component.

---

## Erreurs commises dans ce module

### 1. Import parasite
L'autocomplétion avait ajouté un import interne de Next.js inutile.
```tsx
// ❌ À supprimer immédiatement si l'autocomplétion l'ajoute
import { isHmrRefresh } from "next/dist/server/app-render/..."
```
Règle : n'importe jamais depuis `next/dist/...` — c'est l'interne de Next.js.

### 2. Faute de frappe silencieuse
```tsx
className={styles.log}   // ❌ — la classe n'existe pas, aucun style appliqué
className={styles.logo}  // ✅
```
Le CSS Module ne plante pas si la classe est absente, il l'ignore silencieusement.
Toujours vérifier l'orthographe exacte.

### 3. `key` manquant dans un `.map()`
```tsx
// ❌ Warning React dans la console
<li>

// ✅ La key doit être sur l'élément RACINE du .map()
<li key={link.href}>
```
React utilise `key` pour identifier chaque élément dans une liste.
Sans elle, les mises à jour de l'interface peuvent être incorrectes.
