"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/dashboard/review-card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Loader2, Zap, RefreshCcw } from "lucide-react"
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

  // 🔥 FONCTION DE SYNCHRONISATION 🔥
  const syncWithGoogle = async () => {
    setIsSyncing(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session || !session.provider_token) {
        toast({ title: "Connexion requise", description: "Veuillez cliquer sur 'Reconnecter Google'." })
        await handleConnectGoogle()
        return
      }

      const response = await fetch('/api/sync-google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accessToken: session.provider_token,
          userId: session.user.id 
        })
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error)

      toast({ 
        title: "Succès !", 
        description: `${result.count} avis synchronisés.` 
      })
      
      fetchReviews() // Recharge la liste

    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur Sync", description: error.message })
    } finally {
      setIsSyncing(false)
    }
  }

  const handleConnectGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/business.manage',
        redirectTo: `${window.location.origin}/dashboard/reviews`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) toast({ variant: "destructive", title: "Erreur", description: error.message })
  }

  // Fonction IA (Maintenant elle est utilisée !)
  const handleGenerateResponse = async (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId)
    if (!review) return

    let aiResponse = ""
    if (review.rating >= 4) aiResponse = `Merci ${review.author_name} pour votre super note ! ⭐`
    else aiResponse = `Bonjour ${review.author_name}, nous sommes navrés. Pouvez-vous nous contacter ?`

    // Simulation de sauvegarde
    const { error } = await supabase
      .from('reviews')
      .update({ status: 'replied', reply_text: aiResponse })
      .eq('id', reviewId)

    if (!error) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'replied', reply_text: aiResponse } : r))
      toast({ title: "Réponse générée", description: "La réponse a été ajoutée." })
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
        
        <div className="flex gap-2">
            <Button 
            onClick={syncWithGoogle} 
            disabled={isSyncing}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
                {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                Synchroniser
            </Button>
            
            <Button onClick={handleConnectGoogle} variant="outline" size="icon" title="Reconnecter Google">
                <Zap className="w-4 h-4 text-blue-600" />
            </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" /></div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border">
            <span className="text-2xl">📍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Aucun avis visible</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto mt-2">
            Si vous êtes connecté, cliquez sur "Synchroniser" pour récupérer vos avis.
          </p>
          <Button onClick={syncWithGoogle}>
            Synchroniser maintenant
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
                date: new Date(review.date).toLocaleDateString(),
                source: "Google",
                responded: review.status === 'replied',
                response: review.reply_text
              }} 
              // 👇 C'EST ICI QUE J'AVAIS OUBLIÉ DE METTRE LA FONCTION 👇
              onGenerateResponse={handleGenerateResponse} 
            />
          ))}
        </div>
      )}
    </div>
  )
}