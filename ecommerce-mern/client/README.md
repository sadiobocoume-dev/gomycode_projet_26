# Galsen E-Commerce — Client

Interface web de la plateforme e-commerce **Galsen Shop**, construite avec Next.js 16 (App Router), React 19, TypeScript et Tailwind CSS 4. Elle se connecte à une API REST Express/MongoDB via Axios et intègre Stripe pour les paiements.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.4 | Framework React (App Router, SSR) |
| React | 19.2.4 | UI |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | 4 | Styles utilitaires |
| Zustand | 5.0.12 | Gestion d'état global (auth, panier) |
| Axios | 1.15.2 | Requêtes HTTP vers l'API |
| Stripe | 6.3.0 / 9.4.0 | Paiement en ligne |

---

## Lancer le projet

```bash
# Depuis le dossier client/
npm install
npm run dev        # Démarre sur http://localhost:3000
npm run build      # Build de production
npm start          # Démarre le build de production
npm run lint       # Analyse ESLint
```

### Variables d'environnement requises

Créer un fichier `.env.local` à la racine de `client/` :

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## Structure des dossiers

```
client/
├── app/                        # Pages Next.js (App Router)
│   ├── layout.tsx              # Layout racine : Header + Footer
│   ├── page.tsx                # Page d'accueil
│   ├── products/
│   │   ├── page.tsx            # Liste des produits avec filtres
│   │   └── [id]/page.tsx       # Fiche produit
│   ├── cart/page.tsx           # Panier
│   ├── checkout/page.tsx       # Formulaire de commande
│   ├── payment/[id]/page.tsx   # Paiement Stripe
│   ├── orders/
│   │   ├── page.tsx            # Historique des commandes
│   │   └── [id]/confirmation/  # Confirmation de commande
│   ├── login/page.tsx          # Connexion
│   ├── register/page.tsx       # Inscription
│   ├── admin/
│   │   ├── page.tsx            # Dashboard administrateur
│   │   ├── products/new/       # Créer un produit
│   │   ├── products/[id]/edit/ # Modifier un produit
│   │   └── orders/[id]/        # Détail commande (admin)
│   ├── about/page.tsx
│   ├── founder/page.tsx
│   ├── partenariats/page.tsx
│   ├── contact/page.tsx
│   └── globals.css             # Tailwind + variables CSS
├── components/                 # Composants réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageHero.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductFilter.tsx
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ProtectedRoute.tsx      # Garde de route : utilisateur connecté
│   └── AdminRoute.tsx          # Garde de route : rôle admin
├── lib/
│   └── api.ts                  # Instance Axios avec intercepteur JWT
├── store/
│   ├── authStore.ts            # État auth (user, token, login, logout)
│   └── cartStore.ts            # État panier (items, addItem, removeItem…)
├── types/
│   ├── product.ts              # Interface Product
│   ├── user.ts                 # Interface User
│   └── order.ts                # Interfaces Order, OrderItem
└── public/
    └── images/products/        # Images locales des produits
```

---

## Routes de l'application

| Route | Accès | Description |
|---|---|---|
| `/` | Public | Page d'accueil |
| `/products` | Public | Catalogue avec filtres |
| `/products/:id` | Public | Fiche produit |
| `/cart` | Public | Panier |
| `/checkout` | Connecté | Saisie de la commande |
| `/payment/:id` | Connecté | Paiement Stripe |
| `/orders` | Connecté | Historique des commandes |
| `/orders/:id/confirmation` | Connecté | Confirmation de commande |
| `/login` | Public | Connexion |
| `/register` | Public | Inscription |
| `/about` | Public | À propos |
| `/founder` | Public | Fondateur |
| `/partenariats` | Public | Partenariats |
| `/contact` | Public | Contact |
| `/admin` | Admin | Dashboard administrateur |
| `/admin/products/new` | Admin | Créer un produit |
| `/admin/products/:id/edit` | Admin | Modifier un produit |
| `/admin/orders/:id` | Admin | Détail d'une commande |

---

## Gestion d'état (Zustand)

### `authStore`

Gère la session utilisateur avec persistance dans le `localStorage`.

```typescript
interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}
```

- **`login()`** — enregistre le token JWT et restaure le panier de l'utilisateur depuis le localStorage.
- **`logout()`** — sauvegarde le panier sous la clé `cart-{userId}` avant de vider la session.
- Clé de persistance : `auth-storage`.

### `cartStore`

Gère le panier avec persistance dans le `localStorage`.

```typescript
interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  restoreCart: (items: CartItem[]) => void
}
```

- **`addItem()`** — incrémente la quantité si le produit est déjà dans le panier.
- **`updateQty()`** — supprime l'article si la quantité tombe à 0 ou moins.
- **`restoreCart()`** — appelé par `authStore.login()` pour restaurer le panier après connexion.
- Clé de persistance : `cart-storage`.

Chaque utilisateur a un panier isolé dans le localStorage (`cart-{userId}`).

---

## Appels API (`lib/api.ts`)

Instance Axios préconfigurée :

- **Base URL** : `NEXT_PUBLIC_API_URL` (défaut : `http://localhost:5001`)
- **Intercepteur de requête** : injecte automatiquement le token JWT depuis le localStorage dans l'en-tête `Authorization: Bearer <token>`.

Tous les appels API de l'application passent par cette instance.

---

## Types TypeScript

### `Product`

```typescript
interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number      // 0 à 5
  createdAt: string
}
```

### `User`

```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}
```

### `Order`

```typescript
interface OrderItem {
  product: Product
  quantity: number
  price: number       // Prix capturé au moment de l'achat
}

interface Order {
  _id: string
  user: string
  items: OrderItem[]
  total: number
  status: 'en_attente' | 'payee' | 'expediee' | 'livree'
  isPaid: boolean
  paymentId?: string
  createdAt: string
}
```

---

## Composants principaux

### `Header`

Navigation principale sticky. Contient le logo, la barre de recherche, le menu de navigation, le compteur du panier et les boutons connexion/déconnexion.

### `ProductCard`

Carte produit affichant l'image, le nom, le prix, le stock et un bouton « Ajouter au panier ». Utilise `cartStore.addItem()`.

### `ProductFilter`

Barre de filtres latérale (catégorie, plage de prix, note). Communique avec la page produit via les query params.

### `ProtectedRoute` / `AdminRoute`

Composants guards qui redirigent vers `/login` si l'utilisateur n'est pas connecté, ou vers `/` si le rôle `admin` est requis.

---

## Flux de paiement Stripe

1. L'utilisateur valide sa commande sur `/checkout` → la commande est créée côté serveur.
2. Il est redirigé vers `/payment/:id` où Stripe Elements est initialisé avec un `paymentIntent`.
3. Après paiement réussi, Stripe redirige vers `/orders/:id/confirmation`.

---

## Contexte du projet

- Interface en **français**, contexte sénégalais (Thiès, prix en FCFA).
- Nom du site : **Galsen Shop**.
- Backend : API Express/Node.js + MongoDB (dossier `server/`).
