"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [tone, setTone] = useState("professionnel")
  const [signature, setSignature] = useState("")
  const { toast } = useToast()

  // 1. Charger les réglages actuels au démarrage
  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (data) {
          setTone(data.tone || "professionnel")
          setSignature(data.signature || "")
        }
      }
    }
    getProfile()
  }, [])

  // 2. Sauvegarder les changements
  const handleSave = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const updates = {
        id: user.id,
        tone,
        signature,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        toast({ variant: "destructive", title: "Erreur", description: error.message })
      } else {
        toast({ title: "Sauvegardé !", description: "L'IA utilisera ces réglages." })
      }
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Paramètres</h2>
        <p className="text-gray-500">Personnalisez le comportement de votre Assistant IA.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personnalité de l'IA</CardTitle>
          <CardDescription>
            Choisissez comment l'IA doit s'adresser à vos clients.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <Label>Ton de réponse</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un ton" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professionnel">👔 Professionnel & Courtois</SelectItem>
                <SelectItem value="amical">👋 Amical & Décontracté</SelectItem>
                <SelectItem value="empathique">❤️ Empathique & Chaleureux</SelectItem>
                <SelectItem value="luxe">💎 Luxe & Vouvoiement strict</SelectItem>
                <SelectItem value="humoristique">😄 Avec une touche d'humour</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">Cela changera le vocabulaire utilisé par ChatGPT.</p>
          </div>

          <div className="space-y-2">
            <Label>Signature automatique</Label>
            <Input 
              placeholder="Ex: L'équipe de la Pizzeria Luigi 🍕" 
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
            <p className="text-sm text-gray-500">Cette phrase sera ajoutée à la fin de chaque réponse.</p>
          </div>

          <Button onClick={handleSave} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Enregistrer les préférences
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}