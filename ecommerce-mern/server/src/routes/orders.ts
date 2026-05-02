import { Router } from 'express'
import protect, { isAdmin } from '../middleware/auth'
import { createOrder, getMyOrders, getOrderById, payOrder, getAllOrders, getOrderByIdAdmin, updateOrderStatus } from '../controllers/orderControllers'

const router = Router()

// ⚠️ L'ordre des routes est CRITIQUE en Express
// /user/mine doit être AVANT /:id
// Sinon Express interpréterait "mine" comme un ID MongoDB → erreur 500

// Routes admin — AVANT /:id pour qu'Express ne confonde pas "admin" avec un ID MongoDB
router.get('/admin/all', protect, isAdmin, getAllOrders)
router.get('/admin/:id', protect, isAdmin, getOrderByIdAdmin)

// POST /api/orders — créer une commande (connecté requis)
router.post('/', protect, createOrder)

// GET /api/orders/user/mine — mes commandes (connecté requis)
// protect s'exécute AVANT getMyOrders
// Si le token est invalide → protect répond 401, getMyOrders n'est jamais appelé
router.get('/user/mine', protect, getMyOrders)

// GET /api/orders/:id — détail d'une commande (connecté requis)
router.get('/:id', protect, getOrderById)

// POST /api/orders/:id/pay — payer une commande (connecté requis)
router.post('/:id/pay', protect, payOrder)

// PATCH /api/orders/:id/status — modifier le statut (admin requis)
router.patch('/:id/status', protect, isAdmin, updateOrderStatus)

export default router
