# User Stories — E-commerce MERN (Next.js + TypeScript)
> Format SBOK Guide · Estimation en Story Points (SP)
> 1 SP = simple · 3 SP = moyen · 5 SP = complexe · 8 SP = très complexe

---

## Légende

```
[ ] → À faire
[x] → Terminé (code + test + push GitHub)
[~] → En cours
SP  → Story Points (complexité)
```

---

## SPRINT 1 — Fondations Backend
> Vélocité cible : 30 SP · Durée : 1 semaine

---

**US-01** · `3 SP`
```
En tant que développeur
Je veux initialiser la structure du projet (client/ + server/)
Afin d'avoir une base de travail organisée dès le départ
```
- [ ] Créer `client/` avec Next.js + TypeScript + Tailwind
- [ ] Créer `server/` avec Node.js + Express + TypeScript
- [ ] Configurer `.env` (MONGO_URI, JWT_SECRET, PORT)
- [ ] Pusher la structure initiale sur GitHub

---

**US-02** · `3 SP`
```
En tant que développeur
Je veux connecter l'application à MongoDB Atlas
Afin de pouvoir stocker et récupérer les données en cloud
```
- [ ] Créer le cluster MongoDB Atlas
- [ ] Écrire `config/db.ts` avec mongoose.connect()
- [ ] Tester la connexion au démarrage du serveur

---

**US-03** · `5 SP`
```
En tant que visiteur
Je veux pouvoir créer un compte avec mon email et mot de passe
Afin d'accéder aux fonctionnalités réservées aux membres
```
- [ ] Modèle `User.ts` (name, email, password, role)
- [ ] Route `POST /api/auth/register`
- [ ] Hash du mot de passe avec bcryptjs
- [ ] Tester avec Postman

---

**US-04** · `5 SP`
```
En tant qu'utilisateur inscrit
Je veux me connecter avec mon email et mot de passe
Afin de recevoir un token JWT et accéder à mon compte
```
- [ ] Route `POST /api/auth/login`
- [ ] Génération du JWT signé
- [ ] Middleware `auth.ts` → vérifie le token sur les routes protégées
- [ ] Middleware `admin.ts` → vérifie le rôle admin

---

**US-05** · `3 SP`
```
En tant que développeur
Je veux définir les modèles de données Product et Order
Afin d'avoir une structure cohérente pour toute l'application
```
- [ ] Modèle `Product.ts` (name, description, price, image, category, stock, rating)
- [ ] Modèle `Order.ts` (user, items, total, status, isPaid, paymentId)

---

**Vélocité Sprint 1 : 19 SP**
**Livrable :** API auth fonctionnelle testée sur Postman

---

## SPRINT 2 — Catalogue Produits
> Vélocité cible : 35 SP · Durée : 1 semaine

---

**US-06** · `5 SP`
```
En tant que client
Je veux voir la liste de tous les produits disponibles
Afin de découvrir ce que le site propose
```
- [ ] Route `GET /api/products` (liste complète)
- [ ] Page `app/products/page.tsx` (Server Component SSR)
- [ ] Composant `ProductCard.tsx`
- [ ] Composant `ProductList.tsx`

---

**US-07** · `5 SP`
```
En tant que client
Je veux filtrer les produits par catégorie, mot-clé et prix
Afin de trouver rapidement ce qui m'intéresse
```
- [ ] Filtres backend : `?category=`, `?search=`, `?minPrice=`, `?maxPrice=`
- [ ] Composant `ProductFilter.tsx` (Client Component)
- [ ] Mise à jour de l'URL avec les paramètres de recherche

---

**US-08** · `3 SP`
```
En tant que client
Je veux voir le détail d'un produit (image, description, prix, stock)
Afin de décider si je veux l'acheter
```
- [ ] Route `GET /api/products/:id`
- [ ] Page `app/products/[slug]/page.tsx`

---

**US-09** · `3 SP`
```
En tant qu'admin
Je veux ajouter, modifier et supprimer des produits
Afin de maintenir le catalogue à jour
```
- [ ] Route `POST /api/products` (admin)
- [ ] Route `PUT /api/products/:id` (admin)
- [ ] Route `DELETE /api/products/:id` (admin)
- [ ] Ajouter 10 produits de test dans MongoDB

---

**US-10** · `1 SP`
```
En tant que développeur
Je veux définir les interfaces TypeScript pour les données
Afin d'avoir un typage strict sur tout le projet
```
- [ ] Interface `Product` dans `types/product.ts`
- [ ] Interface `User` dans `types/user.ts`
- [ ] Interface `Order` dans `types/order.ts`
- [ ] Configuration Axios dans `lib/api.ts`

---

**Vélocité Sprint 2 : 17 SP**
**Livrable :** Catalogue produits visible et filtrable dans le navigateur

---

## SPRINT 3 — Authentification Frontend + Panier
> Vélocité cible : 40 SP · Durée : 1 semaine

---

**US-11** · `5 SP`
```
En tant que visiteur
Je veux me connecter depuis l'interface du site
Afin d'accéder à mon compte sans passer par Postman
```
- [ ] Store Zustand `authStore.ts` (user, token, login, logout)
- [ ] Page `app/login/page.tsx`
- [ ] Composant `LoginForm.tsx`
- [ ] Stockage du JWT dans localStorage
- [ ] Intercepteur Axios → ajoute JWT automatiquement

---

**US-12** · `3 SP`
```
En tant que visiteur
Je veux créer un compte depuis l'interface du site
Afin de m'inscrire sans outil technique
```
- [ ] Page `app/register/page.tsx`
- [ ] Composant `RegisterForm.tsx`
- [ ] Redirection vers accueil après inscription

---

**US-13** · `8 SP`
```
En tant que client
Je veux ajouter des produits à mon panier et voir le total
Afin de préparer ma commande avant de payer
```
- [ ] Store Zustand `cartStore.ts` (addItem, removeItem, updateQty, total, clear)
- [ ] Bouton "Ajouter au panier" sur ProductCard
- [ ] Page `app/cart/page.tsx`
- [ ] Composant `CartItem.tsx`
- [ ] Composant `CartSummary.tsx`
- [ ] Compteur articles dans le Header

---

**US-14** · `3 SP`
```
En tant qu'utilisateur
Je veux un header avec la navigation, l'icône panier et mon profil
Afin de naviguer facilement sur le site
```
- [ ] Composant `Header.tsx`
- [ ] Composant `Footer.tsx`
- [ ] `app/layout.tsx` global

---

**US-15** · `2 SP`
```
En tant qu'utilisateur non connecté
Je veux être redirigé vers la page login si j'accède à une route protégée
Afin que mes données soient sécurisées
```
- [ ] Protection des routes privées (cart, checkout, orders)
- [ ] Redirection automatique vers `/login`

---

**Vélocité Sprint 3 : 21 SP**
**Livrable :** Connexion + inscription + panier fonctionnels

---

## SPRINT 4 — Commandes & Paiement Stripe
> Vélocité cible : 40 SP · Durée : 1 semaine

---

**US-16** · `5 SP`
```
En tant que client connecté
Je veux passer une commande depuis mon panier
Afin d'enregistrer mon achat dans le système
```
- [ ] Route `POST /api/orders` (créer une commande)
- [ ] Route `GET /api/orders/:id` (détail)
- [ ] Route `GET /api/orders/user/mine` (mes commandes)
- [ ] Page `app/checkout/page.tsx`

---

**US-17** · `8 SP`
```
En tant que client
Je veux payer ma commande par carte bancaire via Stripe
Afin de finaliser mon achat de façon sécurisée
```
- [ ] Intégration Stripe backend (`paymentIntents.create`)
- [ ] Route `POST /api/orders/:id/pay`
- [ ] Intégration Stripe Elements frontend (formulaire carte)
- [ ] Mise à jour commande (status: paid, isPaid: true)

---

**US-18** · `3 SP`
```
En tant que client
Je veux recevoir une confirmation après mon paiement
Afin de savoir que ma commande a bien été enregistrée
```
- [ ] Page confirmation commande
- [ ] `cartStore.clear()` après paiement réussi
- [ ] Affichage du numéro de commande

---

**US-19** · `3 SP`
```
En tant que client connecté
Je veux voir l'historique de toutes mes commandes
Afin de suivre mes achats passés
```
- [ ] Page `app/orders/page.tsx`
- [ ] Liste des commandes avec statut et total

---

**Vélocité Sprint 4 : 19 SP**
**Livrable :** Achat complet de bout en bout fonctionnel

---

## SPRINT 5 — Dashboard Admin + Déploiement
> Vélocité cible : 35 SP · Durée : 1 semaine

---

**US-20** · `5 SP`
```
En tant qu'admin
Je veux accéder à un dashboard pour gérer les produits et commandes
Afin d'administrer le site sans toucher à la base de données
```
- [ ] Page `app/admin/page.tsx` (protégée — role admin)
- [ ] Liste produits avec boutons modifier / supprimer
- [ ] Formulaire ajout / modification produit
- [ ] Liste toutes les commandes

---

**US-21** · `3 SP`
```
En tant qu'admin
Je veux modifier le statut d'une commande (shipped, delivered)
Afin d'informer le client de l'avancement de sa livraison
```
- [ ] Route `PUT /api/orders/:id/status` (admin)
- [ ] Bouton changement statut dans le dashboard

---

**US-22** · `8 SP`
```
En tant que visiteur du monde entier
Je veux accéder au site via une URL publique
Afin de pouvoir utiliser l'application sans que le développeur soit connecté
```
- [ ] Variables d'environnement configurées sur Render
- [ ] Variables d'environnement configurées sur Vercel
- [ ] MongoDB Atlas Network Access → `0.0.0.0/0`
- [ ] Backend déployé sur Render
- [ ] Frontend déployé sur Vercel
- [ ] `NEXT_PUBLIC_API_URL` pointant vers Render
- [ ] Test du flux complet en production

---

**Vélocité Sprint 5 : 16 SP**
**Livrable :** Site en production avec URL publique

---

## Tableau de bord des Sprints

| Sprint | User Stories | SP Total | Statut | Date début | Date fin |
|--------|-------------|----------|--------|------------|----------|
| Sprint 1 | US-01 à US-05 | 19 SP | [ ] À démarrer | | |
| Sprint 2 | US-06 à US-10 | 17 SP | [ ] À démarrer | | |
| Sprint 3 | US-11 à US-15 | 21 SP | [ ] À démarrer | | |
| Sprint 4 | US-16 à US-19 | 19 SP | [ ] À démarrer | | |
| Sprint 5 | US-20 à US-22 | 16 SP | [ ] À démarrer | | |
| **TOTAL** | **22 User Stories** | **92 SP** | | | |

---

## Definition of Done (DoD)

```
Une User Story est cochée [x] uniquement quand :
  ✓ Toutes ses sous-tâches sont complétées
  ✓ Testé manuellement (navigateur ou Postman)
  ✓ Aucune régression sur les fonctionnalités précédentes
  ✓ Code pushé sur GitHub
```

---

## Retrospective (à remplir après chaque sprint)

### Sprint 1
```
Ce qui a bien marché :
Ce qui n'a pas marché :
Ce qu'on améliore au prochain sprint :
```

### Sprint 2
```
Ce qui a bien marché :
Ce qui n'a pas marché :
Ce qu'on améliore au prochain sprint :
```

### Sprint 3
```
Ce qui a bien marché :
Ce qui n'a pas marché :
Ce qu'on améliore au prochain sprint :
```

### Sprint 4
```
Ce qui a bien marché :
Ce qui n'a pas marché :
Ce qu'on améliore au prochain sprint :
```

### Sprint 5
```
Ce qui a bien marché :
Ce qui n'a pas marché :
Ce qu'on améliore au prochain sprint :
```
