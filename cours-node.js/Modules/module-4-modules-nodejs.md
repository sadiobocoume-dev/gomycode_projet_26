# Module 4 — Les modules Node.js

## C'est quoi un module ?

Un module c'est un **fichier JavaScript** qui contient du code réutilisable.

```
app.js          →  fichier principal
math.js         →  module qui gère les calculs
utilisateur.js  →  module qui gère les utilisateurs
```

---

## Il existe 3 types de modules

```
1. Modules natifs    →  intégrés dans Node.js (fs, path, http...)
2. Modules npm       →  installés via npm (express, mongoose...)
3. Modules locaux    →  tes propres fichiers .js
```

---

## 1. Créer un module local

### `math.js`
```js
function additionner(a, b) {
  return a + b
}

function multiplier(a, b) {
  return a * b
}

module.exports = { additionner, multiplier }
```

### `app.js`
```js
const math = require('./math')

console.log(math.additionner(5, 3))   // 8
console.log(math.multiplier(4, 6))    // 24
```

> `./` signifie "dossier actuel" — ne pas oublier le point !

---

## 2. Les modules natifs

### Le module `path`
```js
const path = require('path')

console.log(path.join(__dirname, 'fichiers', 'data.txt'))
console.log(path.extname('photo.png'))       // .png
console.log(path.basename('dossier/app.js')) // app.js
```

### Le module `os`
```js
const os = require('os')

console.log(os.platform())    // darwin
console.log(os.homedir())     // /Users/sadio
console.log(os.totalmem())    // mémoire totale en bytes
console.log(os.freemem())     // mémoire libre en bytes
```

---

## 3. Export par défaut vs nommé

```js
// Export nommé — plusieurs fonctions
module.exports = { additionner, multiplier }

// Import nommé
const { additionner } = require('./math')


// Export par défaut — une seule valeur
module.exports = additionner

// Import direct
const additionner = require('./math')
```

---

## CommonJS vs ES Modules

```js
// CommonJS (syntaxe classique Node.js)
const path = require('path')
module.exports = { maFonction }

// ES Modules (syntaxe moderne — comme Next.js)
import path from 'path'
export default maFonction
```

---

## Ce qu'il faut retenir

```
require('./math')        →  importe un module local
require('path')          →  importe un module natif
module.exports           →  expose le contenu d'un module
./                       →  dossier actuel (obligatoire)
path                     →  gère les chemins de fichiers
os                       →  infos sur le système
CommonJS                 →  require / module.exports
ES Modules               →  import / export
```
