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

    // Valeurs par défaut
    let userTone = "professionnel"
    let userSignature = ""

    // 1. On va chercher les infos dans Supabase
    if (userId) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (profile) {
        console.log("✅ Profil trouvé :", profile.tone) // Pour le débogage
        userTone = profile.tone || "professionnel"
        userSignature = profile.signature || ""
      } else {
        console.log("❌ Aucun profil trouvé, utilisation du défaut.")
      }
    }

    // 2. Le Prompt "Renforcé"
    const prompt = `
      Tu es un assistant de réponse aux avis clients.
      
      CONTEXTE :
      Client : ${authorName}
      Note : ${rating}/5
      Avis : "${reviewText}"

      ORDRES IMPÉRATIFS :
      1. Adopte STRICTEMENT ce ton : "${userTone.toUpperCase()}".
      2. Si le ton est "humoristique", tu DOIS faire une blague ou être décalé. Ne sois pas formel.
      3. Si le ton est "amical", utilise le tutoiement si approprié.
      4. Sois court (max 3 phrases).
      
      SIGNATURE OBLIGATOIRE :
      Tu DOIS finir la réponse par : "${userSignature}"
      (N'ajoute pas "Cordialement" ou autre avant la signature, mets juste la signature).
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