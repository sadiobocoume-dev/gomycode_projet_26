# Module 6 — Agrégations

## C'est quoi ?

Une **pipeline** de transformations enchaînées sur tes données.

```
Collection  →  $match  →  $group  →  $sort  →  Résultat
```

---

## Les étapes principales

```
$match   →  filtre les documents (comme .find())
$group   →  regroupe et calcule (somme, moyenne, compte)
$sort    →  trie les résultats
$limit   →  limite le nombre de résultats
$project →  sélectionne les champs à retourner
$count   →  compte les documents
$unwind  →  décompose un tableau en documents individuels
```

---

## Cas pratiques

### Total des vues
```js
db.getCollection('projets').aggregate([
  {
    $group: {
      _id: null,                     // regroupe TOUS les documents
      totalVues: { $sum: "$vues" }   // additionne toutes les vues
    }
  }
])
// { _id: null, totalVues: 42 }
```

### Projet le plus consulté
```js
db.getCollection('projets').aggregate([
  { $sort: { vues: -1 } },                        // trie par vues
  { $limit: 1 },                                   // garde le premier
  { $project: { titre: 1, vues: 1, _id: 0 } }     // champs à retourner
])
// { titre: "Portfolio Next.js", vues: 25 }
```

### Nombre de projets par tag
```js
db.getCollection('projets').aggregate([
  { $unwind: "$tags" },                 // décompose le tableau tags
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
// { _id: "React", count: 2 }
// { _id: "Next.js", count: 1 }
```

### Statistiques complètes
```js
db.getCollection('projets').aggregate([
  {
    $group: {
      _id: null,
      totalProjets: { $sum: 1 },
      totalVues:    { $sum: "$vues" },
      moyenneVues:  { $avg: "$vues" },
      maxVues:      { $max: "$vues" },
    }
  }
])
```

### Messages non lus
```js
db.getCollection('messages').aggregate([
  { $match: { lu: false } },
  { $count: "messagesNonLus" }
])
// { messagesNonLus: 3 }
```

---

## Dans Next.js

```ts
// API Route src/app/api/stats/route.ts
import Projet from "@/models/projet"
import Message from "@/models/Message"

export async function GET() {
  await connectDB()

  const statsProjet = await Projet.aggregate([
    {
      $group: {
        _id: null,
        totalProjets: { $sum: 1 },
        totalVues:    { $sum: "$vues" },
        maxVues:      { $max: "$vues" },
      }
    }
  ])

  const statsMessages = await Message.aggregate([
    { $match: { lu: false } },
    { $count: "nonLus" }
  ])

  return NextResponse.json({
    projets: statsProjet[0] ?? { totalProjets: 0, totalVues: 0 },
    messagesNonLus: statsMessages[0]?.nonLus ?? 0
  })
}
```

---

## Pourquoi importer le modèle dans les composants ?

```
MongoDB Atlas    →  la bibliothèque (les données)
Schéma           →  le catalogue (la structure)
Modèle           →  le bibliothécaire (celui qui accède aux données)
```

On importe le **modèle**, pas le schéma.
Sans le modèle → impossible de faire `.find()`, `.aggregate()`, etc.

---

## Ce qu'il faut retenir

```
aggregate([])        →  pipeline de transformations
$match               →  filtre (avant $group pour économiser)
$group               →  regroupe et calcule
$sum / $avg / $max   →  opérateurs de calcul
$unwind              →  décompose un tableau en documents
$project             →  choisit les champs à retourner
_id: null            →  regroupe TOUS les documents ensemble
```
