# Module 7 — Le système de fichiers (fs)

## C'est quoi le module `fs` ?

`fs` = **File System** — module natif pour interagir avec les fichiers et dossiers.

```
fs  →  lire, écrire, modifier, supprimer des fichiers
     →  créer, lister, supprimer des dossiers
```

---

## Deux façons de l'utiliser

```js
// Ancienne syntaxe — callbacks
const fs = require('fs')

// Moderne — avec async/await (recommandée)
const fs = require('fs').promises
```

---

## 1. Écrire un fichier

```js
const fs = require('fs').promises

async function main() {
  await fs.writeFile('message.txt', 'Bonjour depuis Node.js !')
  console.log('✅ Fichier créé')
}

main()
```

---

## 2. Lire un fichier

```js
const fs = require('fs').promises

async function main() {
  const contenu = await fs.readFile('message.txt', 'utf8')
  console.log('Contenu :', contenu)
}

main()
```

> `'utf8'` — indique que le fichier est du texte. Sans ça, Node retourne des bytes bruts.

---

## 3. Ajouter du contenu

```js
const fs = require('fs').promises

async function main() {
  await fs.appendFile('message.txt', '\nNouvelle ligne ajoutée')
  console.log('✅ Contenu ajouté')

  const contenu = await fs.readFile('message.txt', 'utf8')
  console.log(contenu)
}

main()
```

---

## 4. Supprimer un fichier

```js
const fs = require('fs').promises

async function main() {
  await fs.unlink('message.txt')
  console.log('🗑️  Fichier supprimé')
}

main()
```

---

## 5. Travailler avec des dossiers

```js
const fs = require('fs').promises

async function main() {
  await fs.mkdir('mon-dossier')
  console.log('📁 Dossier créé')

  const fichiers = await fs.readdir('.')
  console.log('Contenu :', fichiers)

  await fs.rmdir('mon-dossier')
  console.log('🗑️  Dossier supprimé')
}

main()
```

---

## 6. Vérifier si un fichier existe

```js
const fs = require('fs').promises

async function main() {
  try {
    await fs.access('message.txt')
    console.log('✅ Le fichier existe')
  } catch {
    console.log('❌ Le fichier n\'existe pas')
  }
}

main()
```

---

## Exercice final — mini journal

```js
const fs = require('fs').promises

async function ajouterNote(note) {
  const date = new Date().toLocaleDateString('fr-FR')
  const ligne = `[${date}] ${note}\n`
  await fs.appendFile('journal.txt', ligne)
  console.log('✅ Note ajoutée :', note)
}

async function lireJournal() {
  try {
    const contenu = await fs.readFile('journal.txt', 'utf8')
    console.log('\n📒 Journal :\n', contenu)
  } catch {
    console.log('Journal vide.')
  }
}

async function main() {
  await ajouterNote('Premier jour de Node.js')
  await ajouterNote('J\'ai appris le module fs')
  await ajouterNote('Callbacks et async/await compris')
  await lireJournal()
}

main()
```

---

## Ce qu'il faut retenir

```
fs.writeFile()   →  crée ou écrase un fichier
fs.readFile()    →  lit le contenu d'un fichier
fs.appendFile()  →  ajoute du contenu sans écraser
fs.unlink()      →  supprime un fichier
fs.mkdir()       →  crée un dossier
fs.readdir()     →  liste le contenu d'un dossier
fs.access()      →  vérifie si un fichier existe
'utf8'           →  indique que c'est du texte
```
