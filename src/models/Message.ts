import mongoose, { Schema } from "mongoose"

const MessageSchema = new Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    lu: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)