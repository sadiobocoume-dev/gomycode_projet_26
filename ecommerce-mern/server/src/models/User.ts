// MongoDB stocke des documents JSON libres (sans structure fixe)
//Mongoose ajoute une structure obligatoire: le Schema

import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

//Interface Typescript - definit la structure d'un utilisateur
//Document = type Mongoose qui ajoute _id, save(), etc.
export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
    createdAt: Date
    // Methode pour comparer les mots de passe
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'le nom est obligatoire'],
            trim: true  // supprime les espaces avant/apres
        },
        email: {
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,   // pas deux utilisateurs avecle meme email
            lowercase: true,   // stocke toujours en miniscules
            trim: true
        },
        password: {
            type: String,
            required: [true, 'le mot de passe est obligatoire'],
            minlength: [8, 'le mot de passe doit avoir au moins 8 caracteres'],
            select: false   // n'est jamais retourne dans les requetes par defaut
        },
        role: {
            type: String,
            enum: ['user', 'admin'],    // seules ces deux valeurs sont acceptables
            default: 'user'             // par defaut tout nouveau compte est user
        }
    },
    {
        timestamps: true // ajoute automatiquement createdAt, updatedAt
    }
)

// Middleware pre('save') : intercepte chaque sauvegarde d'un utilisateur.
// "this" = le document en cours. On hash le mot de passe uniquement
// s'il a été modifié — pour ne pas re-hasher un hash existant.
// function() obligatoire (pas arrow) pour que "this" pointe sur le document.

UserSchema.pre('save', async function () {
    // si le ne mot de passe n'a pas change, on ne re-hash pas
    if (!this.isModified('password')) return
    //bcrypt hash le password avec un "salt" de force 12
    //  plus le nombre est eleve, plus c'est securise (mais lent)
    this.password = await bcrypt.hash(this.password, 12)


})

// METHODE - compare le mot de passe saisi avec le hash en base
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    // bcrypt.compare retourne true si les mots de passe correspondent
    return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser>('User', UserSchema)