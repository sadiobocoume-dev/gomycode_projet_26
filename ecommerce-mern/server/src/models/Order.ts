/*
une commande relie 3 entites:
USer,celui qui commande,
Order, la commande
Product, ce qui est commande
Ds mongoDB on ne copie pas les donnees-
on stocke juste des IDs et on fait des references:
order.user  pointe vers l'id d'un User
order.items[].product  pointe vers l'_id d'un product
c'est ce qu'on appele le referencing(relations entre collections) */

import mongoose, { Schema, Document } from "mongoose"

// Interface d'un article dans la commande

interface IOrderItem {
    product: mongoose.Types.ObjectId // reference vers un Product
    quantity: number
    price: number // prix au moment de l'achat
}

// Interface Ts de la commande complete
export interface IOrder extends Document {
    user: mongoose.Types.ObjectId // reference vers un user
    items: IOrderItem[] // tableau d'articles commandes
    total: number
    status: 'en_attente' | 'payee' | 'expediee' | 'livree'
    isPaid: boolean
    paidAt?: Date  // ? = optionnel (pas encore paye)
    paymentId?: string // id de transaction Stripe ou paydunia
}

const OrderSchema = new Schema<IOrder>(
    {
        // ref : 'User' dit a Mongoose ou aller chercher le document
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',// reference vers la collection users
            required: true
        },

        //Tableau d'articles - chaque article a son propre sous schema
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product', // reference vers la collection products
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'La quantite doit etre au moins 1']
                },
                price: {
                    type: Number,
                    required: true
                    // on stocke le prix au Moment de l'achat
                    // car le prix du produit peut changer apres
                }
            }
        ],
        total: {
            type: Number,
            required: true,
            min: [0, 'Le total ne peut pas etre negatif']
        },

        status: {
            type: String,
            enum: ['en_attente', 'payee', 'expediee', 'livree'],
            default: 'en_attente' // tte nouvelle commande commence ici
        },

        //Cycle de vie d'une commande:
        //pending paid shipped delivered
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date // rempli uniquement apres le paiement
        },
        paymentId: {
            type: String // id retourne par stripe apres paiement
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IOrder>('Order', OrderSchema)

