import { Response } from 'express'
import Order from '../models/Order'
import { AuthRequest } from '../middleware/auth'
import Stripe from 'stripe'

// ─────────────────────────────────────────────
// POST /api/orders — Créer une commande
// Route protégée : l'utilisateur doit être connecté
// ─────────────────────────────────────────────
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { items, total } = req.body

        // Validation minimale — on vérifie que le panier n'est pas vide
        if (!items || items.length === 0) {
            res.status(400).json({ message: 'Le panier est vide' })
            return
        }

        // req.user.id est injecté par le middleware protect
        // Il contient l'id de l'utilisateur extrait du JWT
        // On lie la commande à cet utilisateur automatiquement
        const order = await Order.create({
            user: req.user!.id,
            items,
            total,
            // status: 'en_attente' et isPaid: false sont les valeurs par défaut du modèle
        })

        // 201 = Created (ressource créée avec succès)
        res.status(201).json(order)

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// ─────────────────────────────────────────────
// GET /api/orders/user/mine — Mes commandes
// Route protégée : retourne uniquement les commandes de l'utilisateur connecté
// ─────────────────────────────────────────────
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // On filtre par user pour que chaque utilisateur
        // ne voie QUE ses propres commandes, jamais celles des autres
        const orders = await Order.find({ user: req.user!.id })
            .sort({ createdAt: -1 }) // les plus récentes en premier

        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// ─────────────────────────────────────────────
// GET /api/orders/:id — Détail d'une commande
// Route protégée : l'utilisateur ne peut voir que ses propres commandes
// ─────────────────────────────────────────────
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // populate('items.product') remplace l'ObjectId du produit
        // par les données complètes du produit (nom, prix, image...)
        // Sans populate : items[0].product = "64abc123..."
        // Avec populate  : items[0].product = { name: "iPhone", price: 500, ... }
        const order = await Order.findById(req.params.id)
            .populate('items.product', 'name price image')

        if (!order) {
            res.status(404).json({ message: 'Commande introuvable' })
            return
        }

        // Sécurité : un utilisateur ne peut pas voir la commande d'un autre
        // .toString() car order.user est un ObjectId MongoDB, req.user.id est une string
        if (order.user.toString() !== req.user!.id) {
            res.status(403).json({ message: 'Accès refusé' })
            return
        }

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// ─────────────────────────────────────────────
// GET /api/orders/admin/all — Toutes les commandes (admin)
// ─────────────────────────────────────────────
export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // populate('user', 'name email') remplace l'ObjectId user
        // par { name, email } — pour afficher "qui a commandé" dans le dashboard
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// ─────────────────────────────────────────────
// GET /api/orders/admin/:id — Détail d'une commande (admin)
// Pas de vérification de propriété — l'admin peut voir toutes les commandes
// ─────────────────────────────────────────────
export const getOrderByIdAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name price image')

        if (!order) {
            res.status(404).json({ message: 'Commande introuvable' })
            return
        }

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// ─────────────────────────────────────────────
// PATCH /api/orders/:id/status — Modifier le statut (admin)
// ─────────────────────────────────────────────
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { status } = req.body

        // Liste blanche — l'admin ne peut que expédier ou livrer
        // 'en_attente' → 'payee' est géré par Stripe, pas l'admin
        const allowed = ['expediee', 'livree']
        if (!allowed.includes(status)) {
            res.status(400).json({ message: 'Statut invalide' })
            return
        }

        const order = await Order.findById(req.params.id)
        if (!order) {
            res.status(404).json({ message: 'Commande introuvable' })
            return
        }

        // Transitions autorisées : payee → expediee → livree
        if (status === 'expediee' && order.status !== 'payee') {
            res.status(400).json({ message: 'La commande doit être payée avant d\'être expédiée' })
            return
        }
        if (status === 'livree' && order.status !== 'expediee') {
            res.status(400).json({ message: 'La commande doit être expédiée avant d\'être livrée' })
            return
        }

        order.status = status
        await order.save()

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// ─────────────────────────────────────────────
// POST /api/orders/:id/pay — Payer une commande
// Deux cas selon le body :
//   - body vide         → crée un PaymentIntent → retourne clientSecret
//   - { paymentIntentId } → vérifie + marque la commande payée
// ─────────────────────────────────────────────
export const payOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    // Stripe initialisé ici (pas au niveau module) pour s'assurer que
    // dotenv.config() a bien été appelé avant et que STRIPE_SECRET_KEY est disponible
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            res.status(404).json({ message: 'Commande introuvable' })
            return
        }

        // Sécurité : seul le propriétaire peut payer sa commande
        if (order.user.toString() !== req.user!.id) {
            res.status(403).json({ message: 'Accès refusé' })
            return
        }

        if (order.isPaid) {
            res.status(400).json({ message: 'Cette commande est déjà payée' })
            return
        }

        const { paymentIntentId } = req.body

        if (paymentIntentId) {
            // ── Étape 2 : le frontend a confirmé le paiement côté Stripe
            // On vérifie auprès de Stripe que le paiement est vraiment réussi
            // Double vérification : ne jamais faire confiance au frontend seul
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

            if (paymentIntent.status !== 'succeeded') {
                res.status(400).json({ message: 'Paiement non confirmé' })
                return
            }

            // Mise à jour de la commande en base
            order.isPaid    = true
            order.paidAt    = new Date()
            order.status    = 'payee'
            order.paymentId = paymentIntentId
            await order.save()

            res.status(200).json({ message: 'Commande payée avec succès', order })

        } else {
            // ── Étape 1 : le frontend demande un PaymentIntent
            // Stripe travaille en centimes → on multiplie par 100
            const paymentIntent = await stripe.paymentIntents.create({
                amount:   Math.round(order.total * 100),
                currency: 'eur',
                automatic_payment_methods: { enabled: true },
                metadata: {
                    orderId: order._id.toString(),
                    userId:  req.user!.id
                }
            })

            // On renvoie uniquement le clientSecret — jamais la clé secrète Stripe
            res.status(200).json({ clientSecret: paymentIntent.client_secret })
        }

    } catch (error) {
        res.status(500).json({ message: 'Erreur Stripe', error })
    }
}
