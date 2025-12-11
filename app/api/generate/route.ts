import { OpenAI } from "openai"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// On crée un client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { reviewText, rating, authorName, userId } = await req.json()

    console.log("🔍 API appelée pour UserID:", userId)

    let userTone = "professionnel"
    let userSignature = "L'équipe"

    if (userId) {
      // On essaie de lire le profil
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error("❌ Erreur lecture profil Supabase:", error.message)
      }

      if (profile) {
        console.log("✅ Profil trouvé ! Ton:", profile.tone, "| Signature:", profile.signature)
        // On force les valeurs si elles existent
        if (profile.tone) userTone = profile.tone
        if (profile.signature) userSignature = profile.signature
      } else {
        console.warn("⚠️ Profil introuvable pour cet ID.")
      }
    }

    console.log("🤖 Génération avec le ton:", userTone)

    const prompt = `
      Tu es le gérant d'un établissement. Réponds à cet avis client.

      CONTEXTE :
      - Client : ${authorName}
      - Note : ${rating}/5
      - Avis : "${reviewText}"

      ORDRES PRIORITAIRES :
      1. Ton imposé : "${userTone.toUpperCase()}".
      2. Langue : Français.
      
      ${userTone === 'humoristique' ? 'RÈGLE HUMOUR : Fais une blague. Sois drôle. Ne sois pas coincé.' : ''}
      ${userTone === 'amical' ? 'RÈGLE AMICALE : Tu peux tutoyer et utiliser des emojis sympas.' : ''}

      SIGNATURE OBLIGATOIRE :
      Finis ta réponse par : "${userSignature}"
      (N'écris rien après la signature).
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 1.0, // Créativité maximale
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("🔥 Erreur critique API:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}