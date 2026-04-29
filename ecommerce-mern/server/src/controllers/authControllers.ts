import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'


//Fonction utilitaire - genere un token pour un utilisateur
// on la reutilise dans register Et login
const generateToken = (id: string, role: string): string => {
    return jwt.sign(
        { id, role }, //payload -donnes encodes dans le token
        process.env.JWT_SECRET as string, // cle secrete pour signrer
        { expiresIn: process.env.JWT_EXPIRE } as jwt.SignOptions // duree de validite
    )
}


//POST /api/auth/register -Inscription

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body
        //1.verifier que l'email n'est pas deja utilise
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'Cet email est deja utilise' })
            return
        }

        //2. Creer l'utilisateur - le middleware pre('save') hash le password automatiquement
        const user = await User.create({ name, email, password })
        //3. Generer le token JWT
        const token = generateToken(user._id.toString(), user.role)
        //4. repondre avec le token et les infos utilisateur
        // on ne renvoie jamais le password- meme hashe
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    };
}


// POST /api/auth/login - Connexion

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        //1. verifier que email et password st fournis
        if (!email || !password) {
            res.status(400).json({ message: 'Email et mot de passe requis' })
            return
        }

        //2. Chercher l'utilisateur par email
        //.select('+password') - force l'inclusion du password(select:false dans le modele)
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' })
            return
        }
        //3. Comparer le password saisi avec le hash en base
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            //Messsage volontairement vague - on ne dit pas lequel est incorrect
            // Raison securite : eviter de confirmer qu'un email existe
            res.status(401).json({ message: "Email ou mot de passe incorrect" })
            return
        }
        //4.Generer le token JWT
        const token = generateToken(user._id.toString(), user.role)

        //5. Repondre avec le token et les infos utilisateurs
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error })
    }

}