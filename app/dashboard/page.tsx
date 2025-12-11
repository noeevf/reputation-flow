"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Star, TrendingUp, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    pendingReviews: 0,
    repliedCount: 0
  })
  const [recentReviews, setRecentReviews] = useState<any[]>([])
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // 1. On récupère le prénom depuis l'email (ex: "Jean" pour jean@gmail.com)
        const name = user.email?.split('@')[0] || "Client"
        setUserName(name.charAt(0).toUpperCase() + name.slice(1))

        // 2. On récupère TOUS les avis pour faire les maths
        const { data: reviews } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })

        if (reviews && reviews.length > 0) {
          // --- CALCULS DES STATISTIQUES ---
          const total = reviews.length
          // Somme des étoiles
          const totalStars = reviews.reduce((acc, review) => acc + review.rating, 0)
          // Moyenne (avec 1 chiffre après la virgule)
          const average = (totalStars / total).toFixed(1)
          
          const pending = reviews.filter(r => r.status === 'pending').length
          const replied = reviews.filter(r => r.status === 'replied').length

          setStats({
            totalReviews: total,
            averageRating: Number(average),
            pendingReviews: pending,
            repliedCount: replied
          })

          // On garde juste les 3 plus récents pour l'affichage
          setRecentReviews(reviews.slice(0, 3))
        }
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bonjour, {userName} 👋</h2>
          <p className="text-gray-500">Voici l'état de votre réputation en ligne.</p>
        </div>
        <div className="hidden md:flex gap-2">
            <Link href="/dashboard/reviews">
                <Button>Gérer mes avis</Button>
            </Link>
        </div>
      </div>

      {/* --- LES 4 CARTES DE STATS (VRAIES DONNÉES) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Carte 1 : Total Avis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Avis</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-gray-500">Avis synchronisés</p>
          </CardContent>
        </Card>

        {/* Carte 2 : Note Moyenne */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className={`h-4 w-4 ${stats.averageRating >= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating || "-"} / 5</div>
            <p className="text-xs text-gray-500">Qualité globale</p>
          </CardContent>
        </Card>

        {/* Carte 3 : À traiter */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À répondre</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</div>
            <p className="text-xs text-gray-500">Nécessite votre attention</p>
          </CardContent>
        </Card>

        {/* Carte 4 : Réponses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réponses envoyées</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.repliedCount}</div>
            <p className="text-xs text-gray-500">Traités via l'application</p>
          </CardContent>
        </Card>
      </div>

      {/* --- SECTION BASSE --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* GRAPHIQUE (Vide pour l'instant) */}
        <Card className="col-span-4 bg-gray-50/50 border-dashed flex flex-col items-center justify-center min-h-[300px]">
          <div className="p-6 text-center">
            <TrendingUp className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Analyse d'évolution</h3>
            <p className="text-sm text-gray-500 mb-4">Disponible bientôt : Graphique de vos étoiles mois par mois.</p>
            <Button variant="outline" disabled>Bientôt disponible</Button>
          </div>
        </Card>

        {/* DERNIERS AVIS (Vrais) */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Derniers avis reçus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentReviews.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-sm text-gray-500 mb-2">Aucune donnée.</p>
                    <Link href="/dashboard/reviews">
                        <Button variant="outline" size="sm">Générer des avis</Button>
                    </Link>
                </div>
              ) : (
                recentReviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    {/* Avatar (Initiale) */}
                    <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-indigo-100 items-center justify-center font-bold text-indigo-700 uppercase">
                      {review.author_name.charAt(0)}
                    </span>
                    
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium leading-none truncate max-w-[120px]">{review.author_name}</p>
                        <span className="text-yellow-500 text-xs font-bold tracking-widest flex">
                          {"★".repeat(review.rating)}
                          <span className="text-gray-200">{"★".repeat(5 - review.rating)}</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 italic">
                        "{review.text || "Pas de commentaire"}"
                      </p>
                      <p className="text-[10px] text-gray-400 pt-1">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {/* Lien Voir tout */}
              {recentReviews.length > 0 && (
                  <Link href="/dashboard/reviews" className="block pt-2">
                    <Button variant="ghost" className="w-full text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                        Voir tous les avis <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}