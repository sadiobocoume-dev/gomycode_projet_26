//API Route Next.js - s'execute cote serveur
// Recoit les donnees de formulaire et les sauvegarde dans MongoDB

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Message from "@/models/Message"

export async function POST(req: NextRequest) {
    try {
        const { nom, email, message } = await req.json()

        // validation basique
        if (!nom || !email || !message) {
            return NextResponse.json(
                { error: "Tous les champs sont obligatoires" },
                { status: 400 }
            )
        }

        await connectDB()

        // sauvegarde dans MongoDB

        await Message.create({ nom, email, message })

        return NextResponse.json(
            { success: true, message: "Message envoyé ✅" },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        )
    }

}
