# Module 6 — Boucle d'événements & Callbacks

## Le problème du code bloquant

```
❌ Serveur bloquant
──────────────────
Client 1 commande  →  serveur attend en cuisine  →  sert client 1
Client 2 commande  →  serveur attend en cuisine  →  sert client 2
Client 3 attend... attend... attend...

✅ Serveur non-bloquant (Node.js)
─────────────────────────────────
Client 1 commande  →  commande en cuisine  →  va voir client 2
Client 2 commande  →  commande en cuisine  →  va voir client 3
Cuisine prête 1    →  sert client 1
Cuisine prête 2    →  sert client 2
```

---

## La boucle d'événements

```
Code synchrone → Call Stack → exécuté immédiatement
Code async     → Web APIs  → mis en attente
Résultat prêt  → Callback Queue → attend que la stack soit vide
               → Event Loop → pousse dans la Call Stack
```

---

## Code synchrone vs asynchrone

```js
console.log("1 - Début")

setTimeout(() => {
  console.log("2 - Dans le setTimeout")
}, 2000)

console.log("3 - Fin")
```

Résultat :
```
1 - Début
3 - Fin
2 - Dans le setTimeout   ← arrive après 2 secondes
```

Node.js n'a pas attendu le `setTimeout` — il a continué.

---

## Les callbacks

Un **callback** c'est une fonction passée en argument, exécutée quand la tâche est terminée.

```js
function direBonjour(nom, callback) {
  console.log("Bonjour " + nom)
  callback()
}

function apresBonjour() {
  console.log("Comment ça va ?")
}

direBonjour("Sadio", apresBonjour)
```

---

## Callback asynchrone — exemple réel

```js
const fs = require('fs')

console.log("1 - Avant la lecture")

fs.readFile('./package.json', 'utf8', (erreur, contenu) => {
  if (erreur) {
    console.log("Erreur :", erreur)
    return
  }
  console.log("2 - Fichier lu :", contenu.slice(0, 50))
})

console.log("3 - Après la lecture")
```

Résultat :
```
1 - Avant la lecture
3 - Après la lecture
2 - Fichier lu : ...
```

---

## Le Callback Hell

```js
// ❌ Callback Hell — pyramide de la mort
lireFichier(fichier1, (err, data1) => {
  lireFichier(fichier2, (err, data2) => {
    lireFichier(fichier3, (err, data3) => {
      traiter(data1, data2, data3, (err, result) => {
        // ...
      })
    })
  })
})
```

---

## La solution — async/await

```js
// ✅ Lisible et non-bloquant
const fs = require('fs').promises

async function lireFichier() {
  const contenu = await fs.readFile('./package.json', 'utf8')
  console.log(contenu.slice(0, 50))
}

lireFichier()
```

---

## Les trois étapes de l'asynchrone

```
Étape 1 (vieille)   →  Callbacks
Étape 2 (moderne)   →  Promises (.then / .catch)
Étape 3 (actuelle)  →  async / await
```

---

## Ce qu'il faut retenir

```
Synchrone         →  bloque jusqu'à la fin
Asynchrone        →  continue sans attendre
Callback          →  fonction exécutée quand c'est prêt
Event Loop        →  gère l'ordre d'exécution
setTimeout        →  exécute après un délai
async/await       →  écrit l'asynchrone comme du synchrone
```
