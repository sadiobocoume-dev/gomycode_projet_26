# Module 4 — Mongoose & Next.js

## C'est quoi Mongoose ?

```
Next.js  ──── Mongoose ────► MongoDB Atlas
  code       traducteur         données
```

Mongoose apporte 2 choses :
```
1. Schémas  →  définit la structure des documents
2. Modèles  →  l'interface pour faire les requêtes
```

---

## Installation

```bash
npm install mongoose
```

---

## Fichier de connexion `src/lib/mongodb.ts`

```ts
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI manquant dans .env.local")
}

declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null
    promise: Promise<typeof import("mongoose")> | null
  }
}

// Cache — évite de recréer une connexion à chaque hot-reload
const cached = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

export async function connectDB() {
  if (cached.conn) return cached.conn  // déjà connecté → retourne
  cached.promise = mongoose.connect(MONGODB_URI)
  cached.conn = await cached.promise
  console.log("MongoDB connecté ✅")
  return cached.conn
}
```

---

## `.env.local`

```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mon-portfolio?retryWrites=true&w=majority
```

> Jamais dans le code — toujours dans `.env.local`.

---

## Modèle Projet `src/models/projet.ts`

```ts
import mongoose, { Schema } from "mongoose"

const ProjetSchema = new Schema({
  slug:            { type: String,   required: true, unique: true },
  titre:           { type: String,   required: true },
  description:     { type: String,   required: true },
  longDescription: { type: String,   default: "" },
  tags:            { type: [String], default: [] },
  image:           { type: String,   default: "" },
  github:          { type: String,   default: "" },
  demo:            { type: String,   default: "" },
  vues:            { type: Number,   default: 0 },
  publie:          { type: Boolean,  default: true },
  createdAt:       { type: Date,     default: Date.now }
})

// Évite de recréer le modèle au hot-reload Next.js
export default mongoose.models.Projet || mongoose.model("Projet", ProjetSchema)
```

---

## Modèle Message `src/models/Message.ts`

```ts
import mongoose, { Schema } from "mongoose"

const MessageSchema = new Schema({
  nom:       { type: String,  required: true },
  email:     { type: String,  required: true },
  message:   { type: String,  required: true },
  lu:        { type: Boolean, default: false },
  createdAt: { type: Date,    default: Date.now }
})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
```

---

## API Route `src/app/api/contact/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Message from "@/models/Message"

export async function POST(req: NextRequest) {
  try {
    const { nom, email, message } = await req.json()

    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      )
    }

    await connectDB()
    await Message.create({ nom, email, message })

    return NextResponse.json(
      { success: true, message: "Message envoyé ✅" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
```

---

## Erreurs commises dans ce module

### 1. Import parasite dans les modèles
```ts
// ❌ À supprimer si l'autocomplétion l'ajoute
import { unique } from "next/dist/build/utils"
```

### 2. Mauvais type pour un tableau
```ts
// ❌ String = un seul texte
tags: { type: String, default: [] }

// ✅ [String] = tableau de textes
tags: { type: [String], default: [] }
```

### 3. `metadata` dans un Client Component
```ts
// ❌ Impossible — metadata ne fonctionne que côté serveur
"use client"
export const metadata = { title: "Contact" }
```

---

## Ce qu'il faut retenir

```
connectDB()     →  toujours appeler avant une requête
.lean()         →  retourne du JSON simple (obligatoire dans Next.js)
mongoose.models →  évite de recréer le modèle au hot-reload
try/catch       →  gère les erreurs sans planter l'app
status 201      →  document créé avec succès
status 400      →  données invalides
status 500      →  erreur serveur
```
