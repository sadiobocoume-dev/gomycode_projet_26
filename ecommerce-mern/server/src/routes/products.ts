import { Router } from 'express'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productControllers'

import protect from '../middleware/auth'
import admin from '../middleware/admin'

const router = Router()

//Routes publiques - tout le monde peut voir les produits
router.get('/', getProducts)
router.get('/:id', getProductById)

//Routes protegees - protect verifie le JWT, admin verifie le role
//les deux middleware s'executent ds l'ordre avt le controller
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)

export default router