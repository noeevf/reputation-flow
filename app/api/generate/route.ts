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

    // Valeur par défaut propre (pas de [Your Name])
    let userTone = "professionnel"
    let userSignature = "L'équipe" 

    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (profile) {
        userTone = profile.tone || "professionnel"
        // Si l'utilisateur a laissé vide, on garde "L'équipe", sinon on prend sa signature
        if (profile.signature && profile.signature.length > 2) {
            userSignature = profile.signature
        }
      }
    }

    const prompt = `
      Tu es le gérant d'un établissement. Réponds à cet avis client.

      INFOS AVIS :
      - Client : ${authorName}
      - Note : ${rating}/5
      - Commentaire : "${reviewText}"

      CONSIGNES STRICTES :
      1. Ton : ${userTone}.
      2. Langue : Français.
      3. Longueur : Court (max 3 phrases).
      4. INTERDIT : Ne mets JAMAIS de placeholder comme "[Ton nom]" ou "[Votre prénom]".
      5. INTERDIT : Ne mets pas "Cordialement" ou de formule de politesse à la fin, mets JUSTE la signature.
      
      SIGNATURE OBLIGATOIRE :
      Finis ta réponse uniquement par : "${userSignature}"
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("Erreur API:", error)
    return NextResponse.json({ error: "Erreur génération" }, { status: 500 })
  }
}