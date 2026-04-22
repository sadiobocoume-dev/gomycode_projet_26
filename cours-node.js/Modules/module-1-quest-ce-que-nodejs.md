# Module 1 — Qu'est-ce que Node.js ?

## Le problème avant Node.js

Avant 2009, JavaScript ne pouvait tourner **que dans le navigateur**. Pour le serveur, on utilisait PHP, Java, Python...

En 2009, **Ryan Dahl** a eu une idée : prendre le moteur JavaScript de Chrome (**V8**) et le faire tourner en dehors du navigateur.

C'est ainsi qu'est né **Node.js**.

---

## Ce que Node.js change

```
AVANT                          APRÈS (Node.js)
─────────────────────────────────────────────
JavaScript  →  navigateur      JavaScript  →  partout
PHP/Python  →  serveur         Node.js     →  serveur
Deux langages différents       Un seul langage : JavaScript
```

---

## Comment Node.js fonctionne

### 1. Le moteur V8
C'est le moteur de Google Chrome. Il compile le JavaScript en code machine ultra-rapide.

```
Ton code JS  →  V8  →  Code machine  →  Exécution rapide
```

### 2. Le modèle non-bloquant
Node.js ne **bloque pas** en attendant une réponse. Il continue à traiter d'autres tâches pendant qu'il attend.

```
Serveur classique (bloquant)     Serveur Node.js (non-bloquant)
────────────────────────────     ──────────────────────────────
Requête 1 → attend...            Requête 1 → lance la tâche
Requête 2 → attend...            Requête 2 → lance la tâche
Requête 3 → attend...            Requête 3 → lance la tâche
                                 Tâche 1 terminée → répond
                                 Tâche 2 terminée → répond
```

---

## Ce que Node.js permet de faire

```
Créer des APIs REST          →  recevoir/envoyer des données JSON
Gérer des fichiers           →  lire, écrire, supprimer des fichiers
Parler à une base de données →  MongoDB, PostgreSQL, MySQL...
Créer des outils en ligne    →  scripts, automatisation
Serveur en temps réel        →  chat, notifications live
```

---

## Ce que Node.js n'est PAS

```
❌  Node.js n'est pas un langage   →  c'est un environnement d'exécution
❌  Node.js n'est pas un framework →  Express est un framework, pas Node
❌  Node.js n'est pas fait pour    →  les calculs lourds (IA, rendu 3D)
    le CPU intensif
```

---

## Ce qu'il faut retenir

```
Node.js          →  JavaScript côté serveur
V8               →  moteur qui exécute le JS (même que Chrome)
Non-bloquant     →  traite plusieurs requêtes en même temps
npm              →  gestionnaire de packages de Node.js
```
