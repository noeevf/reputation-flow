"use client"

import { useState } from "react"
import { ReviewCard } from "@/components/dashboard/review-card"
import { Review } from "@/lib/types"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

// Données fictives locales (pour être sûr que ça marche)
const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    customerName: "Sophie Martin",
    rating: 5,
    date: "Il y a 2 heures",
    text: "Service incroyable ! J'ai adoré l'accueil et la rapidité du service.",
    source: "Google",
    responded: false
  },
  {
    id: "2",
    customerName: "Jean Dupont",
    rating: 2,
    date: "Il y a 1 jour",
    text: "Assez déçu par l'expérience. L'attente était interminable.",
    source: "Google",
    responded: false
  },
  {
    id: "3",
    customerName: "Marie Curry",
    rating: 4,
    date: "Il y a 3 jours",
    text: "Très bon moment passé en famille. Un peu bruyant mais top.",
    source: "Tripadvisor",
    responded: true,
    response: "Merci Marie ! Nous prenons note pour le bruit."
  }
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)

  const handleGenerateResponse = async (reviewId: string) => {
    // 1. Délai artificiel pour simuler l'IA
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 2. Trouver l'avis
    const reviewToAnswer = reviews.find(r => r.id === reviewId)
    if (!reviewToAnswer) return

    // 3. Choisir une réponse
    let fakeAIResponse = ""
    if (reviewToAnswer.rating >= 4) {
      fakeAIResponse = `Bonjour ${reviewToAnswer.customerName}, merci beaucoup pour cette superbe note ! ⭐ Nous sommes ravis que l'expérience vous ait plu.`
    } else {
      fakeAIResponse = `Bonjour ${reviewToAnswer.customerName}, nous sommes désolés d'apprendre que votre expérience n'a pas été à la hauteur. Nous allons faire mieux la prochaine fois.`
    }

    // 4. Mettre à jour l'état (C'est cette partie qui fait apparaître le texte)
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, response: fakeAIResponse } 
          : review
      )
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Vos Avis</h2>
          <p className="text-gray-500">
            Gérez et répondez à vos avis clients centralisés.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrer
        </Button>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            onGenerateResponse={handleGenerateResponse}
          />
        ))}
      </div>
    </div>
  )
}