"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false) // Pour basculer entre Connexion et Inscription
  const router = useRouter()
  const { toast } = useToast()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSignUp) {
        // --- INSCRIPTION ---
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Inscription réussie !",
          description: "Vérifiez vos emails pour confirmer votre compte (si activé).",
        })
      } else {
        // --- CONNEXION ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        
        toast({
          title: "Connexion réussie",
          description: "Redirection vers le dashboard...",
        })

        // 👇 LA LIGNE MAGIQUE POUR DÉBLOQUER LA REDIRECTION 👇
        router.refresh() 
        // 👆 Force le serveur à vérifier les cookies immédiatement
        
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Créer un compte" : "Bon retour parmi nous"}
          </CardTitle>
          <CardDescription className="text-center">
            Entrez vos identifiants pour accéder à ReputationFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? "S'inscrire" : "Se connecter"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500">
              {isSignUp ? "Déjà un compte ? " : "Pas encore de compte ? "}
            </span>
            <button
              className="text-indigo-600 hover:underline font-medium"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Se connecter" : "S'inscrire"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}