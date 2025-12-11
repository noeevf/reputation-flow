import { OpenAI } from "openai"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// On initialise OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// On initialise Supabase (Côté Serveur)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    // On récupère aussi le userId maintenant !
    const { reviewText, rating, authorName, userId } = await req.json()

    // 1. Récupérer les réglages de l'utilisateur (Ton, Signature)
    let userTone = "professionnel"
    let userSignature = ""

    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (profile) {
        userTone = profile.tone || "professionnel"
        userSignature = profile.signature || ""
      }
    }

    // 2. Construire le Prompt Dynamique
    const prompt = `
      Tu es un expert en relation client.
      Rédige une réponse à cet avis Google.
      
      Détails de l'avis :
      - Client : ${authorName}
      - Note : ${rating}/5
      - Commentaire : "${reviewText}"

      CONSIGNES DE PERSONNALITÉ (IMPORTANT) :
      - Ton à adopter : ${userTone}
      - Langue : Français
      ${userSignature ? `- Termine obligatoirement la réponse par cette signature : "${userSignature}"` : ''}
      
      Règles de rédaction :
      - Sois concis et pertinent.
      - Ne mets pas de guillemets autour de la réponse.
      - Si la note est faible, sois désolé et constructif.
      - Si la note est bonne, sois reconnaissant.
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur génération" }, { status: 500 })
  }
}