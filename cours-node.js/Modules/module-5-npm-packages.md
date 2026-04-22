# Module 5 — npm & Gestion des packages

## C'est quoi npm ?

```
npm  →  Node Package Manager
```

Le gestionnaire de packages de Node.js — installe des bibliothèques créées par d'autres développeurs.

---

## Initialiser un projet Node.js

```bash
npm init -y
```

Crée un fichier **`package.json`** :

```json
{
  "name": "cours-node.js",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## C'est quoi `package.json` ?

```
name            →  nom du projet
version         →  version actuelle
main            →  fichier d'entrée
scripts         →  commandes personnalisées
dependencies    →  packages nécessaires en production
devDependencies →  packages uniquement en développement
```

---

## Installer un package

```bash
npm install chalk@4
```

Cela crée :
```
node_modules/      →  code du package
package-lock.json  →  verrouille les versions exactes
```

### Utiliser chalk dans `app.js`

```js
const chalk = require('chalk')

console.log(chalk.green("✅ Succès !"))
console.log(chalk.red("❌ Erreur !"))
console.log(chalk.blue("ℹ️  Information"))
console.log(chalk.yellow.bold("⚠️  Attention !"))
```

---

## Les commandes npm essentielles

```bash
npm init -y                →  initialise un projet
npm install <package>      →  installe un package
npm install <package> -D   →  installe en devDependency
npm uninstall <package>    →  désinstalle un package
npm install                →  installe tous les packages du package.json
npm run <script>           →  exécute un script personnalisé
npm list                   →  liste les packages installés
```

---

## Les scripts personnalisés

```json
"scripts": {
  "start": "node app.js",
  "dev": "node app.js"
}
```

```bash
npm start   →  au lieu de node app.js
```

---

## Le dossier `node_modules`

```
✅  Ne jamais le modifier manuellement
✅  Ne jamais le pousser sur GitHub
✅  Toujours l'ajouter dans .gitignore
```

### `.gitignore`
```
node_modules/
```

---

## Ce qu'il faut retenir

```
npm init -y          →  crée package.json
npm install X        →  installe un package
node_modules/        →  contient le code des packages
package.json         →  liste les dépendances
package-lock.json    →  verrouille les versions exactes
.gitignore           →  exclut node_modules du git
npm start            →  exécute le script "start"
```
