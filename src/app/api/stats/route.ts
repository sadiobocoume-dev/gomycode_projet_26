// API Route qui retourne  les statistiques du portofolio
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Projet from "@/models/projet"
import Message from "@/models/Message"

export async function GET() {
    await connectDB()

    // Agrégation 1 : stats des projets
    const statsProjet = await Projet.aggregate([
        {
            $group: {
                _id: null,
                totalProjets: { $sum: 1 },
                totalVues: { $sum: "$vues" },
                maxVues: { $max: "$vues" },
            }
        }
    ])

    // Agrégation 2 : messages non lus
    const statsMessages = await Message.aggregate([
        { $match: { lu: false } },
        { $count: "nonLus" }
    ])
    return NextResponse.json({
        projets: statsProjet[0] ?? { totalProjets: 0, totalVues: 0 },
        messagesNonLus: statsMessages[0]?.nonLus ?? 0
    })
}
