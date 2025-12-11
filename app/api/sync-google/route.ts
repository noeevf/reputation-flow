import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { accessToken, userId } = await request.json()

    if (!accessToken) {
      return NextResponse.json({ error: 'Pas de token Google' }, { status: 400 })
    }

    // 1. Récupérer le compte Google Business (Account ID)
    const accountsRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const accountsData = await accountsRes.json()
    
    if (!accountsData.accounts || accountsData.accounts.length === 0) {
      return NextResponse.json({ error: 'Aucun compte Google Business trouvé' }, { status: 404 })
    }
    const accountName = accountsData.accounts[0].name // ex: "accounts/12345"

    // 2. Récupérer l'établissement (Location ID)
    const locationsRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const locationsData = await locationsRes.json()

    if (!locationsData.locations || locationsData.locations.length === 0) {
      return NextResponse.json({ error: 'Aucun établissement trouvé' }, { status: 404 })
    }
    
    // On prend le premier établissement trouvé
    const locationName = locationsData.locations[0].name // ex: "accounts/123/locations/456"

    // 3. Récupérer les AVIS (Reviews)
    // Note: On utilise l'API v4 qui gère les reviews
    const reviewsRes = await fetch(`https://mybusiness.googleapis.com/v4/${locationName}/reviews`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const reviewsData = await reviewsRes.json()
    const googleReviews = reviewsData.reviews || []

    // 4. Initialiser Supabase (Admin) pour pouvoir écrire
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 5. Sauvegarder dans la base de données
    let count = 0
    for (const review of googleReviews) {
      // On prépare l'objet proprement
      const newReview = {
        user_id: userId,
        google_review_id: review.reviewId,
        author_name: review.reviewer.displayName,
        rating: ["ONE", "TWO", "THREE", "FOUR", "FIVE"].indexOf(review.starRating) + 1, // Convertit "FIVE" en 5
        text: review.comment || "(Pas de commentaire)",
        date: review.createTime, // Format date Google
        source: 'Google',
        status: review.reviewReply ? 'replied' : 'pending', // Si déjà répondu sur Google
        reply_text: review.reviewReply ? review.reviewReply.comment : null
      }

      // On insère ou on met à jour (Upsert) pour ne pas avoir de doublons
      const { error } = await supabase
        .from('reviews')
        .upsert(newReview, { onConflict: 'google_review_id' })
      
      if (!error) count++
    }

    return NextResponse.json({ success: true, count, location: locationName })

  } catch (error: any) {
    console.error("Erreur Sync:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}