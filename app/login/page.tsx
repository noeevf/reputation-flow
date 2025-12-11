"use client"

import { useState, useEffect } from "react"
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
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // 🕵️‍♂️ L'ESPION : Il surveille si Supabase valide la connexion
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Dès qu'on est connecté, on force le passage vers le dashboard
        router.refresh()
        router.push("/dashboard")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

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
          description: "Vérifiez vos emails (si activé) ou connectez-vous.",
        })
        setIsLoading(false) // On arrête le chargement pour laisser l'utilisateur basculer sur connexion
      } else {
        // --- CONNEXION ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        
        toast({
          title: "Connexion en cours...",
          description: "Nous vous redirigeons.",
        })
        // Note : On ne fait pas de redirection ici, c'est l'Espion (useEffect) plus haut qui va le faire automatiquement
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
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