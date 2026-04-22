# Module 2 — MQL : Le langage de requêtes

## SQL vs MQL

```
SQL                          MQL
─────────────────────────────────────────────
SELECT * FROM projets        db.projets.find()
INSERT INTO projets...       db.projets.insertOne({...})
UPDATE projets SET...        db.projets.updateOne({...})
DELETE FROM projets...       db.projets.deleteOne({...})
```

---

## CRUD

### CREATE
```js
// Un document
db.getCollection('projets').insertOne({
  titre: "Portfolio Next.js",
  tags: ["Next.js", "TypeScript"],
  vues: 0
});

// Plusieurs documents
db.getCollection('projets').insertMany([
  { titre: "App Météo", tags: ["React"], vues: 0 },
  { titre: "E-commerce", tags: ["Node.js"], vues: 0 }
]);
```

### READ
```js
db.getCollection('projets').find();                        // tous
db.getCollection('projets').find({ titre: "App Météo" });  // filtrés
db.getCollection('projets').findOne({ titre: "App Météo" }); // un seul
db.getCollection('projets').find().sort({ vues: -1 });     // triés
db.getCollection('projets').find().limit(2);               // limités
db.getCollection('projets').countDocuments();              // comptés
```

### UPDATE
```js
// Modifier un champ
db.getCollection('projets').updateOne(
  { titre: "App Météo" },
  { $set: { vues: 10 } }
);

// Incrémenter
db.getCollection('projets').updateOne(
  { titre: "App Météo" },
  { $inc: { vues: 1 } }
);

// Modifier plusieurs
db.getCollection('projets').updateMany(
  { tags: "React" },
  { $set: { publie: true } }
);
```

### DELETE
```js
db.getCollection('projets').deleteOne({ titre: "App Météo" });
db.getCollection('projets').deleteMany({ publie: false });
```

---

## Opérateurs de comparaison

```js
$eq   →  { vues: { $eq: 10 } }       // égal à
$gt   →  { vues: { $gt: 5 } }        // supérieur à
$gte  →  { vues: { $gte: 5 } }       // supérieur ou égal
$lt   →  { vues: { $lt: 100 } }      // inférieur à
$lte  →  { vues: { $lte: 100 } }     // inférieur ou égal
$ne   →  { vues: { $ne: 0 } }        // différent de
$in   →  { tags: { $in: ["React"] } } // dans une liste
```

## Opérateurs logiques

```js
// ET
db.getCollection('projets').find({
  $and: [{ publie: true }, { vues: { $gt: 5 } }]
});

// OU
db.getCollection('projets').find({
  $or: [{ tags: "React" }, { tags: "Next.js" }]
});
```

---

## Ce qu'il faut retenir

```
find()       →  lire
insertOne()  →  créer un document
updateOne()  →  modifier avec $set ou $inc
deleteOne()  →  supprimer
$gt $lt $in  →  comparer et filtrer
$and $or     →  combiner les filtres
```
