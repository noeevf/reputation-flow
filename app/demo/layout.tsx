import { Sidebar } from "@/components/dashboard/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar (Menu Gauche) */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r bg-white h-full overflow-y-auto relative">
        {/* On réutilise ta Sidebar existante */}
        <Sidebar />
        
        {/* Encart "Créer un compte" par dessus le menu */}
        <div className="absolute bottom-4 left-4 right-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center shadow-sm">
          <p className="text-xs font-bold text-indigo-800 mb-2">Mode Démo</p>
          <p className="text-[10px] text-indigo-600 mb-3">
            Vous testez l'interface. Vos données ne sont pas sauvegardées.
          </p>
          <Link href="/login">
            <Button size="sm" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700">
              Créer mon compte
            </Button>
          </Link>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className="flex-1 h-full overflow-y-auto flex flex-col">
        {/* Bandeau d'avertissement en haut */}
        <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium px-4 shadow-md z-10">
          👋 Vous êtes en mode démonstration. 
          <Link href="/login" className="underline ml-2 hover:text-indigo-200 font-bold bg-white/20 px-2 py-1 rounded transition">
            Passer au vrai compte
          </Link>
        </div>
        
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}