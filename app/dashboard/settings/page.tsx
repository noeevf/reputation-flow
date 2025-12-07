"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Building, MessageSquare, Globe, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast" // <--- 1. Import

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTone, setSelectedTone] = useState("professional")
  const { toast } = useToast() // <--- 2. Initialisation
  
  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)

    // 3. Déclenchement de la notification
    toast({
      title: "Modifications enregistrées",
      description: "Vos préférences IA ont été mises à jour avec succès.",
      variant: "default", // ou "destructive" pour une erreur rouge
    })
  }

  // ... (Le reste du code reste identique à ce que tu avais avant)
  // Je remets juste le début du return pour que tu voies où ça va, 
  // mais tu peux garder tout ton formulaire existant.
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* ... Ton header et tes cartes ... */}
      
      {/* Si tu veux copier tout le fichier pour être sûr, dis-le moi ! */}
      {/* Pour l'instant, ajoute juste les 3 points ci-dessus dans ton fichier actuel */}

      {/* Code existant... */}
       <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="h-9 w-9 bg-white hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 text-gray-700" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Paramètres</h2>
          <p className="text-gray-500">
            Personnalisez la façon dont l'IA interagit avec vos clients.
          </p>
        </div>
      </div>
      
      {/* ... Le reste de tes cartes ici ... */}
      
      <div className="grid gap-6">
        {/* ... Cartes Profil, Ton, Langue ... */}
        
         <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Building className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle>Profil de l'établissement</CardTitle>
                <CardDescription>Ces informations aident l'IA à contextualiser les réponses.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Nom de l'entreprise
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Le Petit Bistrot" 
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  defaultValue="ReputationFlow"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Site Web (Optionnel)
                </label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Personnalisation de l'IA (Ton et Style) */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Personnalité de l'IA</CardTitle>
                <CardDescription>Choisissez le ton que l'IA doit adopter pour répondre.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Sélecteur de Ton */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Ton de réponse préféré</label>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Option : Professionnel */}
                <div 
                  onClick={() => setSelectedTone("professional")}
                  className={`cursor-pointer border rounded-xl p-4 transition-all hover:border-indigo-600 ${selectedTone === "professional" ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm">Professionnel</span>
                    {selectedTone === "professional" && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    "Nous vous remercions pour votre retour constructif. Cordialement."
                  </p>
                </div>

                {/* Option : Amical */}
                <div 
                  onClick={() => setSelectedTone("friendly")}
                  className={`cursor-pointer border rounded-xl p-4 transition-all hover:border-indigo-600 ${selectedTone === "friendly" ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm">Amical & Chaleureux</span>
                    {selectedTone === "friendly" && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    "Merci beaucoup ! On est super contents que ça vous ait plu ! À bientôt ! 👋"
                  </p>
                </div>

                {/* Option : Empathique */}
                <div 
                  onClick={() => setSelectedTone("empathic")}
                  className={`cursor-pointer border rounded-xl p-4 transition-all hover:border-indigo-600 ${selectedTone === "empathic" ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm">Empathique</span>
                    {selectedTone === "empathic" && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    "Nous sommes sincèrement navrés d'apprendre cela et comprenons votre déception."
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Automatique */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium leading-none">
                Signature automatique (Optionnel)
              </label>
              <input 
                type="text" 
                placeholder="Ex: L'équipe de la Direction" 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              />
              <p className="text-xs text-gray-500">Cette signature sera ajoutée à la fin de chaque réponse générée.</p>
            </div>
          </CardContent>
        </Card>

        {/* 3. Langue */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Langue des réponses</CardTitle>
                <CardDescription>Dans quelle langue l'IA doit-elle répondre par défaut ?</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <select className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <option value="fr">Français (France)</option>
                <option value="en">Anglais (English)</option>
                <option value="es">Espagnol (Español)</option>
                <option value="auto">Détection automatique (Recommandé)</option>
             </select>
          </CardContent>
        </Card>

        {/* Bouton Sauvegarder */}
        <div className="flex justify-end pt-4">
          <Button size="lg" onClick={handleSave} disabled={isLoading} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                </>
            ) : (
                <>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                </>
            )}
          </Button>
        </div>

      </div>
    </div>
  )
}