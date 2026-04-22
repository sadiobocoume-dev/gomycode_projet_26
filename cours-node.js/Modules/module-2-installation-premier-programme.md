# Module 2 — Installation & Premier programme

## Vérifier si Node.js est déjà installé

```bash
node -v
npm -v
```

Si tu vois des numéros de version (ex: `v24.14.0`), Node.js est installé.

---

## Si Node.js n'est pas installé

Va sur **nodejs.org** → Download → **LTS** → installe le .pkg (Mac)

---

## Créer ton premier programme

### 1. Crée un dossier de travail
```bash
mkdir cours-nodejs
cd cours-nodejs
```

### 2. Crée `app.js`
```js
console.log("Hello depuis Node.js !")
```

### 3. Exécute-le
```bash
node app.js
```

Résultat :
```
Hello depuis Node.js !
```

---

## La différence avec le navigateur

```js
// Dans le navigateur — accès au DOM
document.getElementById("titre")
window.location.href

// Dans Node.js — pas de DOM, mais accès au système
console.log(__dirname)    // chemin du dossier actuel
console.log(__filename)   // chemin du fichier actuel
process.platform          // "darwin" (Mac), "win32" (Windows)
```

### Teste dans `app.js` :
```js
console.log("Dossier :", __dirname)
console.log("Fichier :", __filename)
console.log("Système :", process.platform)
console.log("Version Node :", process.version)
```

---

## Les variables globales de Node.js

```
__dirname    →  chemin absolu du dossier du fichier actuel
__filename   →  chemin absolu du fichier actuel
process      →  infos sur l'environnement d'exécution
console      →  afficher dans le terminal
```

---

## Ce qu'il faut retenir

```
node -v           →  vérifie la version installée
node app.js       →  exécute un fichier JavaScript
__dirname         →  chemin du dossier actuel
__filename        →  chemin du fichier actuel
process           →  objet global avec les infos système
Pas de DOM        →  Node.js n'a pas accès au navigateur
```
