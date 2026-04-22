/*const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur mon serveur express</h1>')
})

app.get('/api', (req, res) => {
    res.json({ message: "Bonjour depuis express", status: 'ok' })
})

app.listen(3000, () => {
    console.log('serveur demare sur http://localhost:3000')
}) */

/* Module 2
const express = require('express')
const app = express()

// Permet à Express de lire le JSON dans req.body
app.use(express.json())

// Données en mémoire — simuler une base de données
let users = [
    { id: 1, nom: "Sadio", email: "sadio@gmail.com" },
    { id: 2, nom: "Emilie", email: "emilie@gmail.com" },
    { id: 3, nom: "Alex", email: "alex@gmail.com" },
]

// -- GET -- recuperer tous les users
app.get('/users', (req, res) => {
    res.json(users)
})

//-- GET-- recuperer un user par id -------
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === (parseInt(req.params.id)))
    if (!user) {
        return res.status(404).json({ error: "user introuvable" })
    }
    res.json(user)
})

// --POST-- creer un user
app.post('/users', (req, res) => {
    const { nom, email } = req.body
    if (!nom || !email) {
        return res.status(400).json({ error: "nom et email obligatoires" })
    }

    const newUser = {
        id: users.length + 1,
        nom,
        email
    }

    users.push(newUser)
    res.status(201).json(newUser)
})

//--PUT- modifier un user -------
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).json({ error: "User introuvable" })
    }
    const { nom, email } = req.body
    if (nom) user.nom = nom
    if (email) user.email = email

    res.json(user)
})

// --DELETE -- supprimer un user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).json({ error: "user introuvable" })
    }

    users.splice(index, 1)
    res.json({ message: "User supprime" })
})
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000')
})

 fin Module 2*/

//Module 2

const express = require('express')
const app = express()

app.use(express.json())

let users = [
    { id: 1, nom: "Sadio", ville: "Thies", age: 25 },
    { id: 2, nom: "OMAR", ville: "Dakar", age: 32 },
    { id: 3, nom: "ABDOU", ville: "Thies", age: 19 },
    { id: 4, nom: "Kefi", ville: "Dakar", age: 28 },
]

// GET avec query strings
// GET avec query strings — filtrer par ville
app.get('/users', (req, res) => {
    const { ville, age } = req.query

    let resultat = users

    if (ville) {
        resultat = resultat.filter(u => u.ville.toLowerCase() === ville.toLowerCase())
    }

    if (age) {
        resultat = resultat.filter(u => u.age > parseInt(age))
    }

    res.json(resultat)
})

//GET par id - parametre de route
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ error: "User introuvable" })
    res.json(user)
})

// GET plusieurs parametres
app.get('/users/:id/commandes/:commandeId', (req, res) => {
    res.json({
        userId: req.params.id,
        commandeId: req.params.commandeId,
        message: `Commande ${req.params.commandeId} du user ${req.params.id}`
    })
})

app.listen(3000, () => {
    console.log('serveur demare sur http://localhost:3000')
})