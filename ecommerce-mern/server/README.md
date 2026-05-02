# E-Commerce MERN — API Backend

Serveur REST développé avec **Node.js**, **Express** et **TypeScript**, connecté à **MongoDB Atlas**. Il gère l'authentification des utilisateurs, la gestion du catalogue produits, les commandes et les paiements en ligne via **Stripe**.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express 5.2 |
| Langage | TypeScript 6.0 |
| Base de données | MongoDB Atlas + Mongoose 9.5 |
| Authentification | JWT + bcryptjs |
| Paiements | Stripe 22.1 |
| Dev | Nodemon + ts-node |

---

## Structure du projet

```
server/
├── src/
│   ├── server.ts               # Point d'entrée, configuration Express
│   ├── config/
│   │   └── db.ts               # Connexion MongoDB
│   ├── models/
│   │   ├── User.ts             # Schéma utilisateur
│   │   ├── Product.ts          # Schéma produit
│   │   └── Order.ts            # Schéma commande
│   ├── controllers/
│   │   ├── authControllers.ts  # Logique register / login
│   │   ├── productControllers.ts # CRUD produits
│   │   └── orderControllers.ts # Commandes et paiements
│   ├── middleware/
│   │   ├── auth.ts             # Vérification JWT
│   │   └── admin.ts            # Vérification rôle admin
│   ├── routes/
│   │   ├── auth.ts             # /api/auth
│   │   ├── products.ts         # /api/products
│   │   └── orders.ts           # /api/orders
│   └── scripts/
│       └── seedProducts.ts     # Peuplement initial de la BDD
├── requests.http               # Tests d'endpoints (REST Client VSCode)
├── .env                        # Variables d'environnement (non versionné)
├── tsconfig.json
└── package.json
```

---

## Installation et démarrage

### Prérequis

- Node.js 20+
- Un compte MongoDB Atlas
- Un compte Stripe (clés de test suffisantes)

### Installation

```bash
cd ecommerce-mern/server
npm install
```

### Variables d'environnement

Crée un fichier `.env` à la racine du dossier `server/` :

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=ta_cle_secrete_jwt
JWT_EXPIRE=30d
NODE_ENV=development
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:3000
```

### Démarrage

```bash
# Développement (rechargement automatique)
npm run dev

# Production
npm run build
npm start
```

### Peupler la base de données

```bash
npx ts-node src/scripts/seedProducts.ts
```

---

## Documentation de l'API

### Base URL

```
http://localhost:5000/api
```

### Authentification

Les routes protégées nécessitent un header :

```
Authorization: Bearer <token>
```

---

### Authentification (`/api/auth`)

#### POST `/api/auth/register`

Crée un nouveau compte utilisateur.

**Corps de la requête :**
```json
{
  "name": "Sadia",
  "email": "sadia@example.com",
  "password": "motdepasse123"
}
```

**Réponse 201 :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "Sadia",
    "email": "sadia@example.com",
    "role": "user"
  }
}
```

---

#### POST `/api/auth/login`

Connecte un utilisateur existant.

**Corps de la requête :**
```json
{
  "email": "sadia@example.com",
  "password": "motdepasse123"
}
```

**Réponse 200 :** même format que register.

---

### Produits (`/api/products`)

#### GET `/api/products` — Public

Liste tous les produits avec filtres optionnels.

| Paramètre | Type | Description |
|---|---|---|
| `category` | string | Filtre par catégorie |
| `search` | string | Recherche dans le nom/description |
| `minPrice` | number | Prix minimum |
| `maxPrice` | number | Prix maximum |

**Exemple :**
```
GET /api/products?category=electronics&minPrice=10000
```

---

#### GET `/api/products/:id` — Public

Retourne un produit par son identifiant.

---

#### POST `/api/products` — Admin

Crée un nouveau produit.

**Corps de la requête :**
```json
{
  "name": "iPhone 15",
  "description": "Smartphone Apple dernière génération",
  "price": 899000,
  "image": "/images/products/iphone15.jpg",
  "category": "electronics",
  "stock": 20
}
```

---

#### PUT `/api/products/:id` — Admin

Met à jour un produit existant. Envoyer uniquement les champs à modifier.

---

#### DELETE `/api/products/:id` — Admin

Supprime un produit.

---

### Commandes (`/api/orders`)

#### POST `/api/orders` — Authentifié

Crée une nouvelle commande.

**Corps de la requête :**
```json
{
  "items": [
    { "product": "produitId", "quantity": 2, "price": 45000 }
  ],
  "total": 90000
}
```

---

#### GET `/api/orders/user/mine` — Authentifié

Retourne toutes les commandes de l'utilisateur connecté, triées de la plus récente à la plus ancienne.

---

#### GET `/api/orders/:id` — Authentifié

Retourne une commande spécifique avec les détails des produits. L'utilisateur ne peut accéder qu'à ses propres commandes.

---

#### POST `/api/orders/:id/pay` — Authentifié

Paiement en deux étapes via Stripe.

**Étape 1** — Créer l'intention de paiement (corps vide) :
```json
{}
```
**Réponse :**
```json
{ "clientSecret": "pi_xxx_secret_xxx" }
```

**Étape 2** — Confirmer le paiement :
```json
{ "paymentIntentId": "pi_xxx" }
```
**Réponse :** la commande mise à jour avec `isPaid: true` et `status: "payee"`.

---

#### PATCH `/api/orders/:id/status` — Admin

Met à jour le statut d'une commande.

| Statut | Description |
|---|---|
| `en_attente` | Commande créée, pas encore payée |
| `payee` | Paiement confirmé (géré par Stripe) |
| `expediee` | Commande expédiée |
| `livree` | Commande livrée |

**Corps :**
```json
{ "status": "expediee" }
```

---

#### GET `/api/orders/admin/all` — Admin

Retourne toutes les commandes de tous les utilisateurs.

---

#### GET `/api/orders/admin/:id` — Admin

Retourne une commande avec les informations complètes de l'utilisateur et des produits.

---

## Modèles de données

### User

```typescript
{
  name: string          // requis
  email: string         // requis, unique
  password: string      // hashé avec bcryptjs (non retourné par défaut)
  role: 'user' | 'admin' // défaut : 'user'
  createdAt: Date
  updatedAt: Date
}
```

### Product

```typescript
{
  name: string
  description: string
  price: number           // min 0
  image: string           // chemin ou URL
  category: 'electronics' | 'clothing' | 'food' | 'books' | 'other'
  stock: number           // défaut 0
  rating: number          // 0–5, défaut 0
  createdAt: Date
  updatedAt: Date
}
```

### Order

```typescript
{
  user: ObjectId          // référence User
  items: [
    {
      product: ObjectId   // référence Product
      quantity: number    // min 1
      price: number       // prix au moment de l'achat
    }
  ]
  total: number
  status: 'en_attente' | 'payee' | 'expediee' | 'livree'
  isPaid: boolean
  paidAt?: Date
  paymentId?: string      // identifiant Stripe
  createdAt: Date
  updatedAt: Date
}
```

---

## Sécurité

- **Mots de passe** hashés avec bcryptjs (coût 12)
- **Tokens JWT** valides 30 jours, signés avec `JWT_SECRET`
- **Routes protégées** : le middleware `protect` vérifie le token avant chaque accès
- **Routes admin** : le middleware `admin` vérifie le rôle après `protect`
- **Isolation des commandes** : un utilisateur ne peut voir et payer que ses propres commandes
- **Paiement sécurisé** : le serveur vérifie indépendamment le statut du paiement auprès de Stripe (jamais confiance au frontend seul)
- **CORS** : seule l'origine `FRONTEND_URL` est autorisée

---

## Fonctionnalités réalisées

- [x] Inscription et connexion avec JWT
- [x] Hashage sécurisé des mots de passe
- [x] Gestion des rôles utilisateur / admin
- [x] CRUD complet du catalogue produits
- [x] Filtrage des produits par catégorie, recherche textuelle, fourchette de prix
- [x] Création et suivi des commandes
- [x] Intégration Stripe (PaymentIntent, vérification côté serveur)
- [x] Cycle de vie des commandes (en attente → payée → expédiée → livrée)
- [x] Script de peuplement avec 30 produits répartis en 5 catégories
- [x] Fichier de tests d'endpoints (REST Client)

---

## Tests des endpoints

Le fichier [requests.http](./requests.http) contient plus de 20 requêtes de test couvrant tous les endpoints. Il est compatible avec l'extension **REST Client** de VSCode.
