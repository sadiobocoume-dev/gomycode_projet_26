# Module 1 — L'environnement MongoDB

## Les 4 outils

```
MongoDB Atlas      →  base de données hébergée dans le cloud
MongoDB Compass    →  interface visuelle sur ta machine
VSCode Playground  →  tester des requêtes dans VSCode
Mongoose           →  connecter MongoDB à Next.js
```

---

## MongoDB Atlas

```
Cluster
└── Database (ex: mon-portfolio)
    ├── Collection : projets
    │   ├── Document : { titre: "Portfolio Next.js", ... }
    │   └── Document : { titre: "App Météo", ... }
    └── Collection : messages
        └── Document : { nom: "Moussa", message: "..." }
```

- **Cluster** : le serveur qui héberge tout
- **Database** : le projet
- **Collection** : groupe de documents similaires
- **Document** : une entrée individuelle en JSON

---

## MongoDB Compass

Interface visuelle pour explorer et modifier tes données sans code.

```
Quand l'utiliser :
✅ Vérifier qu'un document a bien été sauvegardé
✅ Corriger manuellement une donnée
✅ Déboguer pendant le développement
```

---

## VSCode Playground

Fichier `.mongodb.js` pour tester des requêtes avant de les mettre dans le code.

```js
// Sélectionne la base de données
use('mon-portfolio');

// Insère des documents
db.getCollection('projets').insertMany([
  { titre: "Portfolio Next.js", tags: ["Next.js"], vues: 0 },
  { titre: "App Météo", tags: ["React"], vues: 0 }
]);

// Lit les documents
db.getCollection('projets').find();
```

---

## Mongoose

Relie ton code Next.js à MongoDB.

```
Next.js  ──── Mongoose ────► MongoDB Atlas
  code       traducteur         données
```

---

## Ce qu'il faut retenir

```
Atlas      →  où vivent les données (cloud)
Compass    →  pour visualiser et déboguer
Playground →  pour tester les requêtes
Mongoose   →  pour coder avec MongoDB dans Next.js
```
