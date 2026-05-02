import mongoose, { Schema, Document } from "mongoose";

// Interface Typescript - structure d'un produit
export interface IProduct extends Document {
    name: string
    description: string
    price: number
    image: string
    category: string
    stock: number
    rating: number
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Le nom du produit est obligatoire '],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'le nom du produit est obligatoire'],

        },
        price: {
            type: Number,
            required: [true, 'Le prix est obligatoire'],
            min: [0, 'Le prix ne peut pas etre negatif']
        },
        image: {
            type: String,
            required: [true, "L'image est obligatoire"]
        },
        category: {
            type: String,
            required: [true, 'La categorie est obligatoire'],
            // Les categories disponibles sur le site
            enum: ['electronics', 'clothing', 'food', 'books', 'other']
        },
        stock: {
            type: Number,
            required: true,
            default: 0,  // par defaut un produit commence avec 0 en stock
            min: [0, 'Le stock ne peut pas etre negatif']
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5 // note sur 5
        }
    },
    {
        timestamps: true
    }
)

// Index composé : accélère les filtres par catégorie et par prix combinés
ProductSchema.index({ category: 1, price: 1 })

export default mongoose.model<IProduct>('Product', ProductSchema)