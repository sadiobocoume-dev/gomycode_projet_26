import { Request, Response } from 'express'
import Product from '../models/Product'

//GET /api/products - recupere les produits avec filtres et pagination
// Query params: ?category=shoes&search=air&minPrice=10&maxPrice=200&page=1&limit=9
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, search, minPrice, maxPrice, page, limit } = req.query

        // page courante (défaut 1) et nombre de produits par page (défaut 9)
        const currentPage = Math.max(1, Number(page) || 1)
        const pageSize = Math.min(50, Math.max(1, Number(limit) || 9))
        const skip = (currentPage - 1) * pageSize

        const filter: any = {}

        if (category) {
            filter.category = category
        }

        // $regex cherche le texte contenu dans le mot (ex: "airp" trouve "AirPods")
        // $options: 'i' = insensible à la casse
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = Number(minPrice)
            if (maxPrice) filter.price.$lte = Number(maxPrice)
        }

        // Promise.all exécute les deux requêtes en parallèle au lieu de l'une après l'autre
        const [products, total] = await Promise.all([
            Product.find(filter).skip(skip).limit(pageSize),
            Product.countDocuments(filter)
        ])

        res.status(200).json({
            products,
            total,
            page: currentPage,
            totalPages: Math.ceil(total / pageSize)
        })

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// GET /api/products/:id - recupere un seul produit pr sn id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404).json({ message: 'Produit introuvable' })
            return
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

//POST /api/products - cree un produit (admin uniquement)

// POST /api/products — crée un produit (admin uniquement)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        // req.body contient les données envoyées dans le body de la requête
        const { name, description, price, image, category, stock } = req.body

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock,
            rating: 0  // un nouveau produit commence avec 0 avis
        })

        res.status(201).json(product)

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

//PUT /api/products/:id - modifie un produit (admin uniquement)
// PUT /api/products/:id — modifie un produit (admin uniquement)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        // { new: true } = retourne le document APRÈS modification (pas avant)
        // { runValidators: true } = vérifie les règles du modèle lors de la mise à jour
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after', runValidators: true }
        )

        if (!product) {
            res.status(404).json({ message: 'Produit introuvable' })
            return
        }

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

// DELETE /api/products/:id — supprime un produit (admin uniquement)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            res.status(404).json({ message: 'Produit introuvable' })
            return
        }

        res.status(200).json({ message: 'Produit supprimé' })

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }
}

