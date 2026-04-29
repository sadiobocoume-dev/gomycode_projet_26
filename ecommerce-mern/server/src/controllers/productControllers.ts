import { Request, Response } from 'express'
import Product from '../models/Product'

//GET /api/products - recupers ts les produits
//Query params optionnes: ?category=shoes&search=air&minPrice=10&maxPrice=200
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        //req.query contient les parametres apres le ? ds l'url
        const { category, search, minPrice, maxPrice } = req.query
        // on construit le filtre dynamiquement selon ce qui est fourni
        // {} = aucun filtre retourne tout
        const filter: any = {}
        // si ?category=shoes filtre 
        if (category) {
            filter.category = category
        }
        // si ?search=air cherche "air" ds le nom OU la description
        //$regex = expression reguliere MongoDB
        //$options: 'i' = insensible a la casse (Air = air = AIR)
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        // si  ?minPrice=10&maxPrice=200 filtre par fourchette de prix
        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = Number(minPrice)
            if (maxPrice) filter.price.$lte = Number(maxPrice)
        }
        // .find(filter) = cherche ts les documents qui correspondent au filtre
        const products = await Product.find(filter)
        res.status(200).json(products)

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

