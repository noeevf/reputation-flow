import { OpenAI } from "openai"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { reviewText, rating, authorName, userId } = await req.json()

    // Valeurs par défaut (si la base de données ne répond pas)
    let userTone = "professionnel"
    let userSignature = "L'équipe"

    // 1. Récupération des réglages
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      // Si on trouve un profil, on écrase les valeurs par défaut
      if (profile) {
        userTone = profile.tone || "professionnel"
        userSignature = profile.signature || "L'équipe"
      }
    }

    // 2. Création du Prompt (Consignes améliorées)
    const prompt = `
      Tu es le gérant d'un établissement. Réponds à cet avis client.

      INFOS AVIS :
      - Client : ${authorName}
      - Note : ${rating}/5
      - Commentaire : "${reviewText}"

      CONSIGNES DE STYLE :
      - Ton imposé : ${userTone}
      - Langue : Français
      - Longueur : Court (2-3 phrases max).
      - IMPORTANT : Ne commence JAMAIS ta réponse par le nom du ton. Commence directement la phrase.

      ${userTone === 'humoristique' ? 'RÈGLE SPÉCIALE HUMOUR : Fais une blague, sois décalé, utilise des emojis drôles. Ne sois surtout pas corporatif.' : ''}
      
      SIGNATURE :
      Tu DOIS finir ta réponse uniquement par : "${userSignature}"
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.9, // On augmente la créativité (0.7 -> 0.9) pour l'humour
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("Erreur API:", error)
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 })
  }
}