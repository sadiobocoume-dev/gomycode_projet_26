import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'
//Charge les variables du fichier .env ds process.env
//Doit etre appele en PREMIER avant tout le reste
dotenv.config()

// connecte MongoDB atlas
connectDB()

const app = express()

//Middleware globaux
//parse le body json des requetes entrates
// sans ca, req.body est undefined
app.use(express.json())

//autorise le frontend (Next.js) a faire des requetes vers ce backend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

//Route de test - verifie que le serveur tourne
app.get('/', (_req, res) => {
    res.json({ message: 'API E-commerce operationnelle' })
})

//-Demarage du serveur
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Serveur demare sur le port ${PORT}`)
})