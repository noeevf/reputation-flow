"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Star, Settings, LogOut, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase" // <--- 1. On importe Supabase
import { useToast } from "@/components/ui/use-toast"

const sidebarItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mes Avis",
    href: "/dashboard/reviews",
    icon: Star,
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  // --- LA FONCTION DE DÉCONNEXION ---
  const handleLogout = async () => {
    // 1. On dit à Supabase de fermer la session
    await supabase.auth.signOut()
    
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    })

    // 2. On rafraîchit pour que le site comprenne qu'on n'est plus là
    router.refresh()
    
    // 3. On renvoie vers la page d'accueil (ou login)
    router.push("/")
  }

  return (
    <div className="flex h-full w-full flex-col bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <div className="h-8 w-8 bg-indigo-600 text-white rounded flex items-center justify-center text-sm">R</div>
          <span>ReputationFlow</span>
        </Link>
      </div>

      {/* Liens de navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-indigo-600",
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bas de page (Support + Déconnexion) */}
      <div className="border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-2 text-gray-500" asChild>
          <Link href="mailto:support@reputationflow.com">
            <LifeBuoy className="h-4 w-4" />
            Support
          </Link>
        </Button>
        
        {/* BOUTON DÉCONNEXION ACTIF */}
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout} // <--- On branche la fonction ici
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </Button>
      </div>
    </div>
  )
}