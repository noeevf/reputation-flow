"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/dashboard/review-card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Loader2, Zap, RefreshCcw, Database } from "lucide-react"
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
  const [isSyncing, setIsSyncing] = useState(false)
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  
  const { toast } = useToast()

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

  // --- LOGIQUE IA : GÉNÉRATION (Brouillon) ---
  const handleGenerateResponse = async (reviewId: string) => {
    setGeneratingId(reviewId)
    try {
      const review = reviews.find(r => r.id === reviewId)
      if (!review) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Non connecté")

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: review.text,
          rating: review.rating,
          authorName: review.author_name,
          userId: user.id,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      // IMPORTANT : On sauvegarde en statut 'draft' (Brouillon)
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'draft', reply_text: data.reply })
        .eq('id', reviewId)

      if (error) throw error

      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'draft', reply_text: data.reply } : r))
      
      toast({ title: "Brouillon prêt 📝", description: "Vous pouvez maintenant relire et valider la réponse." })

    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message })
    } finally {
      setGeneratingId(null)
    }
  }

  // --- LOGIQUE VALIDATION : PUBLICATION ---
  const handlePublishResponse = async (reviewId: string, finalText: string) => {
    try {
      // 1. On met à jour le statut en 'replied' avec le texte final modifié par l'utilisateur
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'replied', reply_text: finalText })
        .eq('id', reviewId)

      if (error) throw error

      // 2. Mise à jour visuelle
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'replied', reply_text: finalText } : r))

      toast({ 
        title: "Publié ! ✅", 
        description: "La réponse a été enregistrée (Simulation d'envoi Google)." 
      })

      // (Note: C'est ici qu'on ajouterait plus tard l'appel à l'API Google pour poster la réponse pour de vrai)

    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur sauvegarde", description: error.message })
    }
  }

  // --- (Le reste : Sync Google & Mode Démo inchangés) ---
  const syncWithGoogle = async () => { /* ... code existant ... */ }
  const handleConnectGoogle = async () => { /* ... code existant ... */ }
  
  const simulateData = async () => {
    setIsSyncing(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const fakeReviews = [
      {
        user_id: user.id, google_review_id: `fake-${Date.now()}-1`, author_name: "Julie Martin", rating: 5, text: "Top service !", date: new Date().toISOString(), source: "Google", status: "pending"
      },
      {
        user_id: user.id, google_review_id: `fake-${Date.now()}-2`, author_name: "Paul B.", rating: 3, text: "Moyen...", date: new Date().toISOString(), source: "Google", status: "pending"
      }
    ]
    const { error } = await supabase.from('reviews').upsert(fakeReviews, { onConflict: 'google_review_id' })
    if (!error) { toast({ title: "Mode Démo", description: "Avis ajoutés" }); fetchReviews() }
    setIsSyncing(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Vos Avis Google</h2>
          <p className="text-gray-500">Gérez, modifiez et publiez vos réponses.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={simulateData} variant="outline" className="gap-2 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"><Database className="w-4 h-4" /> Mode Démo</Button>
            <Button onClick={() => window.location.reload()} variant="ghost" size="icon"><RefreshCcw className="w-4 h-4" /></Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" /></div>
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
                date: new Date(review.date).toLocaleDateString(),
                source: "Google",
                status: review.status,
                reply_text: review.reply_text
              }} 
              onGenerateResponse={handleGenerateResponse}
              onPublishResponse={handlePublishResponse} // <-- Nouvelle fonction passée ici
              isGenerating={generatingId === review.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}