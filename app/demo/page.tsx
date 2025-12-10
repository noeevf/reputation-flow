import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Star, TrendingUp, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Vue d'ensemble</h2>
        <div className="flex items-center gap-2">
            <Button variant="outline" disabled>Télécharger le rapport</Button>
            <Button className="bg-indigo-600" disabled>+ Nouvel avis</Button>
        </div>
      </div>

      {/* Les 4 Cartes de statistiques (Fausse données) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avis total</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12% ce mois-ci
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +0.2 points
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réponses IA</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">843</div>
            <p className="text-xs text-gray-500 mt-1">Temps gagné estimé : 42h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Heureux</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-gray-500 mt-1">Taux de satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Zone Graphique fictive */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité des avis</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center rounded-md border border-dashed bg-gray-50 text-gray-400 text-sm">
              [Graphique interactif disponible en version PRO]
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Derniers avis</CardTitle>
            <p className="text-sm text-gray-500">Vous avez 3 avis non traités.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {/* Faux avis 1 */}
               <div className="flex items-center">
                  <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200 items-center justify-center font-bold text-gray-600">JD</span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jean Dupont</p>
                    <p className="text-sm text-gray-500">Il y a 2 heures</p>
                  </div>
                  <div className="ml-auto font-medium text-yellow-500">★★★★★</div>
                </div>
                {/* Faux avis 2 */}
                <div className="flex items-center">
                  <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200 items-center justify-center font-bold text-gray-600">SM</span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Sophie Martin</p>
                    <p className="text-sm text-gray-500">Il y a 5 heures</p>
                  </div>
                  <div className="ml-auto font-medium text-yellow-500">★★★★☆</div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}