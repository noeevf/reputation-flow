"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/dashboard/review-card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Loader2, Zap } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type DBReview = {
  id: string
  author_name: string
  rating: number
  text: string
  date: string
  source: string
  status: string
  reply_text?: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<DBReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Charger les avis depuis Supabase
  const fetchReviews = async () => {
    setIsLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setReviews(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // 🔥 LA FONCTION DE CONNEXION GOOGLE 🔥
  const handleConnectGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // C'est ici qu'on demande la permission de gérer le Business Profile
        scopes: 'https://www.googleapis.com/auth/business.manage',
        redirectTo: `${window.location.origin}/dashboard/reviews`, // Revenir ici après
        queryParams: {
          access_type: 'offline', // Important pour garder la connexion active
          prompt: 'consent', // Force l'écran de validation pour être sûr d'avoir les droits
        },
      },
    })

    if (error) {
      toast({ variant: "destructive", title: "Erreur", description: error.message })
    }
  }

  // Fonction IA (inchangée pour l'instant)
  const handleGenerateResponse = async (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId)
    if (!review) return

    let aiResponse = ""
    if (review.rating >= 4) aiResponse = `Merci ${review.author_name} ! ⭐`
    else aiResponse = `Bonjour ${review.author_name}, désolé pour ce problème.`

    const { error } = await supabase
      .from('reviews')
      .update({ status: 'replied', reply_text: aiResponse })
      .eq('id', reviewId)

    if (!error) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'replied', reply_text: aiResponse } : r))
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Vos Avis Google</h2>
          <p className="text-gray-500">
            Connectez votre fiche pour voir vos vrais avis.
          </p>
        </div>
        
        {/* LE BOUTON DE CONNEXION RÉEL */}
        <Button 
          onClick={handleConnectGoogle} 
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
        >
            <Zap className="w-4 h-4 fill-current" />
            Connecter Google Business
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" /></div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border">
            <span className="text-2xl">📍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Aucun avis connecté</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto mt-2">
            Cliquez sur le bouton bleu en haut pour autoriser ReputationFlow à lire vos avis Google.
          </p>
          <Button onClick={handleConnectGoogle} variant="outline">
            Lancer la connexion
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={{
                id: review.id,
                customerName: review.author_name,
                rating: review.rating,
                text: review.text,
                date: review.date,
                source: "Google",
                responded: review.status === 'replied',
                response: review.reply_text
              }} 
              onGenerateResponse={handleGenerateResponse}
            />
          ))}
        </div>
      )}
    </div>
  )
}