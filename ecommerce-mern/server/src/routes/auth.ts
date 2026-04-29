/* Une route est une URL + une methode HTTP + une fonction a executer
router.post('/register', register)

quand quelqu'un envoie POST /api/auth/register
Express trouve cette route
appele la fonction register du controller
*/

import { Router } from 'express'
import { register, login } from '../controllers/authControllers'

//Router = mini-application Express dediee a un groupes de routes
//Permet de regrouper ttes les routes /api/auth enssemble

const router = Router()

// POST /api/auth/register - inscription
router.post('/register', register)

//POST /api/auth/login connexion
router.post('/login', login)

export default router