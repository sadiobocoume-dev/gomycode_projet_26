//Interface = contrat qui decrit la forme d'un objet
//Partout ou tu utilises un produit, ts verifie que le contrat est respecte

export interface Product {
    _id: string // identifiant Mongodb(ObjecId converti en string)
    name: string
    description: string
    price: number
    image: string       // URL de l'image
    category: string
    stock: number
    rating: number // note de 0 a 5
    createdAt: string
}