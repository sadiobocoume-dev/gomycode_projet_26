import { Product } from './product'

// Un item de commande = produit + quantite + prix au moment de l'achat
interface OrderItem {
    product: Product
    quantity: number
    price: number // prix snapshot (au cas ou le prix change plus tard)
}

export interface Order {
    _id: string
    user: string // id du user
    items: OrderItem[]// tableau d'items
    total: number
    status: 'en_attente' | 'payee' | 'expediee' | 'livree'
    isPaid: boolean
    paymentId?: string // le ? signifie optionnel (pas encore paye = pas de paymentsId)
    createdAt: string
}