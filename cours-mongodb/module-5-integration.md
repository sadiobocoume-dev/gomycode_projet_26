# Module 5 — Intégration dans le portfolio

## Objectif

```
Avant   →  données dans src/data/projects.ts (statique)
Après   →  données dans MongoDB Atlas (dynamique)
```

---

## Lire les projets depuis MongoDB

```ts
// projects/page.tsx
await connectDB()

const projets = await Projet.find({ publie: true })
  .sort({ createdAt: -1 })  // du plus récent au plus ancien
  .lean()                    // retourne du JSON simple — obligatoire dans Next.js
```

---

## Route dynamique avec MongoDB

```ts
// projects/[slug]/page.tsx

// Pré-génère les pages au build depuis MongoDB
export async function generateStaticParams() {
  await connectDB()
  const projets = await Projet.find({ publie: true }).lean()
  return projets.map((p) => ({ slug: p.slug }))
}
```

---

## Compteur de vues

```ts
// Récupère le projet ET incrémente les vues en une seule requête
const projet = await Projet.findOneAndUpdate(
  { slug },                        // filtre : quel projet ?
  { $inc: { vues: 1 } },           // modification : +1 vue
  { returnDocument: 'after' }      // retourne le document après modification
).lean()
```

> `findOneAndUpdate` = trouver + modifier en une seule requête.
> `$inc` = incrémenter sans écraser la valeur existante.
> `returnDocument: 'after'` = retourne les données mises à jour.

---

## Erreurs commises dans ce module

### 1. Conflit de nom modèle/variable
```ts
// ❌ "projet" utilisé pour le modèle ET la variable → conflit
import projet from "@/models/projet"
const projet = await projet.findOneAndUpdate(...)

// ✅ Modèle en MAJUSCULE, variable en minuscule
import Projet from "@/models/projet"
const projet = await Projet.findOneAndUpdate(...)
```

### 2. Option dépréciée
```ts
// ❌ Deprecated dans les nouvelles versions de Mongoose
{ new: true }

// ✅ Nouvelle syntaxe
{ returnDocument: 'after' }
```

### 3. Mauvais champ dans generateMetadata
```ts
// ❌ "title" n'existe pas dans le schéma
title: projet?.title ?? "Projet introuvable"

// ✅ "titre" correspond au champ du modèle
title: projet?.titre ?? "Projet introuvable"
```

---

## Ce qu'il faut retenir

```
.lean()              →  toujours utiliser dans Next.js
.sort({ createdAt: -1 }) →  du plus récent au plus ancien
findOneAndUpdate()   →  trouve ET modifie en une seule requête
$inc: { vues: 1 }   →  incrémente sans écraser
returnDocument: 'after' →  retourne le document après modification
Modèle = Majuscule  →  variable = minuscule
```
