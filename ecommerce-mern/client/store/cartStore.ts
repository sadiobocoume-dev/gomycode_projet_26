import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'

// Un article du panier = un produit + une quantité
export interface CartItem {
    product: Product
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem:     (product: Product) => void
    removeItem:  (productId: string) => void
    updateQty:   (productId: string, qty: number) => void
    clearCart:   () => void
    restoreCart: (items: CartItem[]) => void
}

export const useCartStore = create<CartState>()(
    persist(
        // set = modifie l'état / get = lit l'état courant depuis l'intérieur du store
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const items = get().items
                const existing = items.find(i => i.product._id === product._id)

                if (existing) {
                    // Produit déjà dans le panier → on incrémente la quantité
                    // .map() crée un NOUVEAU tableau — on ne modifie jamais l'existant (immutabilité)
                    set({
                        items: items.map(i =>
                            i.product._id === product._id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        )
                    })
                } else {
                    // Nouveau produit → on l'ajoute à la fin avec quantité 1
                    set({ items: [...items, { product, quantity: 1 }] })
                }
            },

            removeItem: (productId) => {
                // .filter() crée un nouveau tableau sans l'élément ciblé
                set({ items: get().items.filter(i => i.product._id !== productId) })
            },

            updateQty: (productId, qty) => {
                // Si qty <= 0, on supprime l'article plutôt que d'afficher 0
                if (qty <= 0) {
                    set({ items: get().items.filter(i => i.product._id !== productId) })
                } else {
                    set({
                        items: get().items.map(i =>
                            i.product._id === productId ? { ...i, quantity: qty } : i
                        )
                    })
                }
            },

            clearCart: () => set({ items: [] }),

            // Utilisé par authStore pour restaurer le panier d'un user à la connexion
            restoreCart: (items: CartItem[]) => set({ items }),
        }),
        { name: 'cart-storage' } // clé dans localStorage
    )
)
