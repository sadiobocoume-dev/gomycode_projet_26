// src/lib/mongodb.ts
//ce fichier gere la connexion a MongoDB Atlas
//LE "cahe" evite de creer une nouvelle connexion
// a chaque requete en developpement(hot-reload Next.js).

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI manquanr dans .env.local")
}

declare global {
    var mongoose: {
        conn: typeof import("mongoose") | null
        promise: Promise<typeof import("mongoose")> | null
    }
}

const cached = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

export async function connectDB() {
    if (cached.conn) return cached.conn
    cached.promise = mongoose.connect(MONGODB_URI)
    cached.conn = await cached.promise

    console.log("MongoDB connecte")
    return cached.conn
}