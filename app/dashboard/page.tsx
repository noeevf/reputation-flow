"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, TrendingUp, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tableau de bord</h2>
          <p className="text-gray-500 mt-1">
            Bienvenue sur ReputationFlow. Voici ce qu'il se passe aujourd'hui.
          </p>
        </div>
        <Link href="/dashboard/reviews">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Gérer mes avis
          </Button>
        </Link>
      </div>

      {/* Statistiques (Cartes du haut) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Carte 1 : Note Moyenne */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +0.2 ce mois-ci
            </p>
          </CardContent>
        </Card>

        {/* Carte 2 : Total Avis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Avis</CardTitle>
            <MessageSquare className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 cette semaine
            </p>
          </CardContent>
        </Card>

        {/* Carte 3 : En attente */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À traiter</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Nécessite une réponse
            </p>
          </CardContent>
        </Card>

        {/* Carte 4 : Taux de réponse */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réponse</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-green-600 mt-1">
              Top 1% de votre secteur
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Section : Derniers avis (Raccourci) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Avis récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Avis fictif 1 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">S</div>
                  <div>
                    <p className="text-sm font-medium">Sophie Martin</p>
                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Il y a 2h</div>
              </div>

              {/* Avis fictif 2 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">J</div>
                  <div>
                    <p className="text-sm font-medium">Jean Dupont</p>
                    <div className="flex text-yellow-400 text-xs">★★☆☆☆</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Il y a 1j</div>
              </div>

              <Link href="/dashboard/reviews" className="block mt-4">
                <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-800">
                  Voir tous les avis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Section : Conseils ou Actions rapides */}
        <Card className="col-span-3 bg-indigo-600 text-white border-none">
          <CardHeader>
            <CardTitle className="text-white">Le conseil du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              Saviez-vous que répondre aux avis négatifs en moins de 24h augmente de 30% les chances qu'un client modifie sa note ?
            </p>
            <Link href="/dashboard/settings">
              <Button variant="secondary" className="w-full font-bold text-indigo-700">
                Configurer mes réponses auto
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}