# Module 3 — Modélisation des données

## Règle centrale

> Modélise selon comment ton app **lit** les données,
> pas selon comment elles sont liées logiquement.

---

## Les 2 stratégies

### Embedding — tout dans un document
```json
{
  "_id": "123",
  "titre": "Portfolio Next.js",
  "tags": ["Next.js", "TypeScript"],
  "commentaires": [
    { "auteur": "Moussa", "texte": "Super projet !" },
    { "auteur": "Fatou",  "texte": "Très bien fait" }
  ]
}
```
Une seule requête → tout est là.

### Referencing — documents séparés
```json
// Collection "projets"
{ "_id": "123", "titre": "Portfolio Next.js" }

// Collection "commentaires"
{ "_id": "456", "projetId": "123", "auteur": "Moussa" }
```
Deux requêtes → données séparées.

---

## Quand utiliser quoi ?

```
Embedding ✅                      Referencing ✅
─────────────────                 ─────────────────
Données lues ensemble             Données lues séparément
Liste qui reste petite            Liste qui peut être grande
Données propres à 1 document      Données partagées entre documents
```

---

## Les types de relations

### 1-1 : projet → image
```json
{ "titre": "Portfolio", "image": "/project-1.jpg" }
```

### 1-N : projet → tags
```json
{ "titre": "Portfolio", "tags": ["Next.js", "TypeScript", "CSS"] }
```

### N-N : projets → catégories
```json
// projets
{ "titre": "Portfolio", "categorieIds": ["cat1", "cat2"] }

// categories
{ "_id": "cat1", "nom": "Frontend" }
```

---

## Anti-patterns à éviter

### Tableau qui grossit sans limite
```json
// ❌
{ "titre": "Portfolio", "visiteurs": ["ip1", "ip2", ... "ip999999"] }

// ✅
{ "titre": "Portfolio", "vues": 9999 }
```

### Imbrication trop profonde
```json
// ❌
{ "projet": { "details": { "meta": { "stats": { "vues": 10 } } } } }

// ✅
{ "vues": 10 }
```

---

## Modèles du portfolio

### Collection `projets`
```json
{
  "slug": "portfolio-nextjs",
  "titre": "Portfolio Next.js",
  "description": "...",
  "longDescription": "...",
  "tags": ["Next.js", "TypeScript"],
  "image": "/project-1.jpg",
  "github": "https://github.com",
  "demo": "https://vercel.com",
  "vues": 0,
  "publie": true,
  "createdAt": "2026-04-18"
}
```

### Collection `messages`
```json
{
  "nom": "Moussa Diallo",
  "email": "moussa@email.com",
  "message": "Bonjour, j'ai un projet à te proposer.",
  "lu": false,
  "createdAt": "2026-04-18"
}
```

---

## Ce qu'il faut retenir

```
Embedding   →  données petites, toujours lues ensemble
Referencing →  données grandes ou partagées
Jamais      →  tableaux qui grossissent sans limite
Toujours    →  modéliser selon comment l'app lit les données
```
