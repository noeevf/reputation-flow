"use client"

import { useState } from "react"
import { ReviewCard } from "@/components/dashboard/review-card"
import { Review } from "@/lib/types"
import { Sparkles, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

// Données fictives initiales
const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    customerName: "Sophie Martin",
    rating: 5,
    date: "Il y a 2 heures",
    text: "Service incroyable ! J'ai adoré l'accueil et la rapidité du service. Je recommande vivement cet endroit à tous mes amis.",
    source: "Google",
    responded: false
  },
  {
    id: "2",
    customerName: "Jean Dupont",
    rating: 2,
    date: "Il y a 1 jour",
    text: "Assez déçu par l'expérience. L'attente était interminable et le personnel semblait débordé. J'espère que ce sera mieux la prochaine fois.",
    source: "Google",
    responded: false
  },
  {
    id: "3",
    customerName: "Marie Curry",
    rating: 4,
    date: "Il y a 3 jours",
    text: "Très bon moment passé en famille. Juste un petit bémol sur le bruit dans la salle, mais le reste était parfait.",
    source: "Tripadvisor",
    responded: true,
    response: "Merci Marie pour votre retour ! Nous sommes ravis que vous ayez passé un bon moment. Nous prenons note pour le bruit et allons améliorer l'acoustique."
  }
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)

  // Cette fonction simule l'appel à l'IA
  const handleGenerateResponse = async (reviewId: string) => {
    // 1. On trouve l'avis concerné
    const reviewToAnswer = reviews.find(r => r.id === reviewId)
    if (!reviewToAnswer) return

    // 2. On simule un délai de réflexion de l'IA (1.5 secondes)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 3. On génère une réponse fictive basée sur la note
    let fakeAIResponse = ""
    if (reviewToAnswer.rating >= 4) {
      fakeAIResponse = `Bonjour ${reviewToAnswer.customerName}, merci beaucoup pour cette superbe note ! ⭐ Nous sommes ravis que l'expérience vous ait plu. Au plaisir de vous revoir bientôt !`
    } else {
      fakeAIResponse = `Bonjour ${reviewToAnswer.customerName}, nous sommes désolés d'apprendre que votre expérience n'a pas été à la hauteur. Nous aimerions comprendre ce qui s'est passé pour nous améliorer. Pouvez-vous nous contacter en privé ?`
    }

    // 4. On met à jour l'état
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, response: fakeAIResponse } // On ajoute la réponse générée
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