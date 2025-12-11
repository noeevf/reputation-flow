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
  // On ajoute un état pour savoir quel avis est en train d'être généré (pour afficher le petit rond qui tourne)
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

  // --- OPTION 1 : SYNCHRO GOOGLE ---
  const syncWithGoogle = async () => {
    setIsSyncing(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session || !session.provider_token) {
        toast({ title: "Connexion requise", description: "Veuillez cliquer sur l'éclair bleu d'abord." })
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

      toast({ title: "Succès !", description: `${result.count} avis synchronisés.` })
      fetchReviews()

    } catch (error: any) {
      toast({ variant: "destructive", title: "Info", description: "Utilisez le mode démo si vous n'avez pas de fiche Google." })
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
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) toast({ variant: "destructive", title: "Erreur", description: error.message })
  }

  // --- OPTION 2 : SIMULATION ---
  const simulateData = async () => {
    setIsSyncing(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const fakeReviews = [
      {
        user_id: user.id,
        google_review_id: `fake-${Date.now()}-1`,
        author_name: "Julie Martin",
        rating: 5,
        text: "Incroyable ! J'ai adoré le service, c'était rapide et efficace. Je reviendrai !",
        date: new Date().toISOString(),
        source: "Google",
        status: "pending"
      },
      {
        user_id: user.id,
        google_review_id: `fake-${Date.now()}-2`,
        author_name: "Pierre Durand",
        rating: 2,
        text: "Assez déçu. L'accueil était froid et j'ai attendu 20 minutes.",
        date: new Date(Date.now() - 86400000).toISOString(),
        source: "Google",
        status: "pending"
      }
    ]

    const { error } = await supabase.from('reviews').upsert(fakeReviews, { onConflict: 'google_review_id' })

    if (!error) {
      toast({ title: "Mode Démo", description: "Nouveaux avis ajoutés !" })
      fetchReviews()
    }
    setIsSyncing(false)
  }

  // 🔥 L'INTELLIGENCE ARTIFICIELLE EST ICI 🔥
  const handleGenerateResponse = async (reviewId: string) => {
    // 1. On active le chargement pour cet avis précis
    setGeneratingId(reviewId)
    
    try {
      const review = reviews.find(r => r.id === reviewId)
      if (!review) return

      // 2. On appelle notre API (le cerveau)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: review.text,
          rating: review.rating,
          authorName: review.author_name,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      const aiReply = data.reply

      // 3. On sauvegarde la réponse de l'IA dans Supabase
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'replied', reply_text: aiReply })
        .eq('id', reviewId)

      if (error) throw error

      // 4. On met à jour l'affichage instantanément
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'replied', reply_text: aiReply } : r))
      
      toast({ 
        title: "Réponse générée ! ✨", 
        description: "L'IA a rédigé une réponse pour vous." 
      })

    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur IA", description: error.message })
    } finally {
      setGeneratingId(null) // On arrête le chargement
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Vos Avis Google</h2>
          <p className="text-gray-500">
            Gérez votre e-réputation avec l'IA.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              onClick={simulateData} 
              variant="outline"
              disabled={isSyncing}
              className="gap-2 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
            >
                <Database className="w-4 h-4" />
                Mode Démo
            </Button>

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
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Prêt à tester l'IA ?</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto mt-2">
            Cliquez sur "Mode Démo" pour créer des avis, puis testez le bouton "Générer une réponse".
          </p>
          <Button onClick={simulateData} variant="outline" className="text-orange-600 border-orange-200">
            Lancer la démo
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
              onGenerateResponse={handleGenerateResponse}
              isGenerating={generatingId === review.id} // On passe l'info si ça charge
            />
          ))}
        </div>
      )}
    </div>
  )
}