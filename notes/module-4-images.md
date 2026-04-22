# Module 4 — Images Next.js

## `<Image>` vs `<img>`
```tsx
import Image from "next/image" // jamais depuis "next/link"

<Image
  src="/profile.jpg"  // depuis public/
  alt="Description"   // obligatoire
  width={400}
  height={400}
  priority            // uniquement pour l'image visible au 1er chargement
/>
```
Next.js compresse, convertit en WebP et charge les images en lazy loading automatiquement.

## Mode `fill` — remplir un conteneur
```tsx
// Le conteneur DOIT avoir position: relative
<div style={{ position: "relative", width: "100%", height: "200px" }}>
  <Image
    src="/photo.jpg"
    alt="..."
    fill
    style={{ objectFit: "cover" }}
  />
</div>
```
`fill` ignore `width` et `height` — c'est le CSS du parent qui contrôle la taille.

## `sizes` — optimisation selon l'écran
```tsx
sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
```
Dit à Next.js quelle taille d'image servir selon la largeur d'écran.
Économise la bande passante.

---

## Erreurs commises dans ce module

### 1. Mauvais chemin d'import
```tsx
import Image from "next/link"   // ❌ — importe Link, pas Image
import Image from "next/image"  // ✅
```

### 2. Structure `heroInner` incomplète
`heroInner` est un flex container. Il doit avoir exactement 2 enfants :
```tsx
<div className={styles.heroInner}>
  <div>           {/* colonne gauche : texte */}
    ...
  </div>
  <div className={styles.photoWrapper}>  {/* colonne droite : photo */}
    <Image ... />
  </div>
</div>
```

### 3. `className={styles.imageWrapper}` oublié
```tsx
<div>           {/* ❌ — pas de position: relative → fill ne fonctionne pas */}
<div className={styles.imageWrapper}>  {/* ✅ */}
```

### 4. Propriété `image` absente dans les données
```ts
const projects = [
  { id: 1, title: "...", description: "...", tags: [...] }
  // ❌ image oubliée → project.image = undefined → erreur au build
]
```
Toujours vérifier que le type TypeScript et les données correspondent.

### 5. `overflow: hidden` sur la carte
Sans cette propriété, l'image déborde les coins arrondis de la carte.
```css
.card {
  border-radius: 12px;
  overflow: hidden; /* indispensable pour que border-radius soit respecté */
}
```
