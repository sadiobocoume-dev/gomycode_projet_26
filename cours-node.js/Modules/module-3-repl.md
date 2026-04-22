# Module 3 — Le terminal REPL

## C'est quoi le REPL ?

```
R  →  Read    (lit ce que tu tapes)
E  →  Eval    (évalue / exécute le code)
P  →  Print   (affiche le résultat)
L  →  Loop    (recommence — attend la prochaine commande)
```

C'est un **terminal interactif** où tu peux taper du JavaScript directement, sans créer de fichier.

---

## Lancer le REPL

```bash
node
```

Tu verras :
```
Welcome to Node.js v24.14.0
>
```

---

## Tester dans le REPL

```js
> 2 + 2
4

> "Bonjour" + " " + "Node.js"
'Bonjour Node.js'

> let nom = "Sadio"
undefined

> nom.toUpperCase()
'SADIO'
```

---

## Tester des objets et tableaux

```js
> let fruits = ["pomme", "banane", "mangue"]
undefined

> fruits.length
3

> fruits.map(f => f.toUpperCase())
[ 'POMME', 'BANANE', 'MANGUE' ]
```

---

## Les commandes spéciales du REPL

```
.help      →  affiche toutes les commandes disponibles
.exit      →  quitte le REPL (ou Ctrl + C deux fois)
.clear     →  remet le contexte à zéro
.save      →  sauvegarde la session dans un fichier
.load      →  charge un fichier dans le REPL
```

---

## Le underscore `_`

Le REPL garde en mémoire le **dernier résultat** dans `_` :

```js
> 10 * 5
50

> _
50

> _ + 10
60
```

---

## Quand utiliser le REPL ?

```
✅  Tester une expression rapide
✅  Vérifier le comportement d'une méthode
✅  Déboguer une valeur
❌  Écrire un programme complet  →  utilise un fichier .js
```

---

## Ce qu'il faut retenir

```
node          →  lance le REPL
>             →  Node.js attend ton code
_             →  dernier résultat
.exit         →  quitter le REPL
Ctrl + C x2   →  quitter le REPL
```
