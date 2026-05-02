import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

//on etend le type de Request d'Express pour ajouter "user"
// Par defaut Request n'a pas de champ user - on l'ajoute

export interface AuthRequest extends Request {
    user?: {
        id: string
        role: string
    }
}


// Middleware auth - verifie que le JWT est valide
// S'utilise sur ttes les routes protegees

const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
    //1. Recuperer le token depuis le header Authorisation
    //Format attendu:  "Bearer eyJhbGciOiJIUzI1NiJ9..."

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Acces refuse - token manquant' })
        return
    }

    //2. Extraire le token - on enleve "Bearer" (7 caracteres)

    const token = authHeader.split(' ')[1]
    try {
        //3. verifier et decoder le token
        // jwt.verify lance une erreur si le token est invalide ou expire
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string
            role: string
        }

        //4. Attacher les infos utilisateur a la requete
        // Les controllers pourront acceder a req.user.id et req.user.role
        req.user = decoded

        // 5. Passer au prochain middleware ou controller
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expire' })
    }
}

// Middleware admin — à chaîner APRÈS protect
// protect garantit que req.user existe déjà
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ message: 'Accès réservé aux administrateurs' })
        return
    }
    next()
}

export default protect