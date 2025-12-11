import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { reviewText, rating, authorName } = await req.json()

    // Le Prompt : C'est ici qu'on dit à l'IA comment se comporter
    const prompt = `
      Tu es un expert en relation client pour une entreprise locale.
      Rédige une réponse professionnelle, empathique et courte à cet avis Google.
      
      Détails de l'avis :
      - Client : ${authorName}
      - Note : ${rating}/5 étoiles
      - Commentaire : "${reviewText}"

      Consignes :
      - Si la note est basse, excuse-toi et propose une solution.
      - Si la note est bonne, remercie chaleureusement.
      - Ne signe pas la réponse.
      - Ton ton doit être humain, pas robotique.
      - Réponse en français.
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo", // Rapide et pas cher (ou gpt-4 pour plus d'intelligence)
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error("Erreur OpenAI:", error)
    return NextResponse.json(
      { error: "Impossible de générer la réponse." },
      { status: 500 }
    )
  }
}