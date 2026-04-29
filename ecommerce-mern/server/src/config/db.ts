import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI
        if (!mongoURI) {
            throw new Error("MONGO_URI manquant dans le fichier .env")
        }
        const conn = await mongoose.connect(mongoURI as string)
        console.log(`MongoDB connecte : ${conn.connection.host}`)
    } catch (error) {
        console.error(`Erreur connexion MongoDB : ${error}`)
        process.exit(1)
    }
}

export default connectDB
