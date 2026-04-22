//Etape 3 creer les modeles 
//Le schema definit la structure exacte d'un document "projet"
//Mongoose verifie chaque document avant de le souvegarder

import mongoose, { Schema } from "mongoose"

const ProjectSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    tags: { type: [String], default: [] },
    image: { type: String, default: "" },
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    vues: { type: Number, default: 0 },
    publie: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})

//Evite de recreer le modele a chaque hot-reload Next.js

export default mongoose.models.Projet || mongoose.model("Projet", ProjectSchema)