"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Fermer le menu automatiquement quand on change de page (ex: clic sur "Avis")
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen w-full bg-gray-50">
      
      {/* 1. SIDEBAR DESKTOP (Cachée sur mobile, visible sur PC) */}
      <div className="hidden md:block w-64 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* 2. CONTENU PRINCIPAL + EN-TÊTE MOBILE */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* EN-TÊTE MOBILE (Visible uniquement sur mobile) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b h-16 flex-shrink-0 z-20">
          <div className="font-bold text-xl text-indigo-600 flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 text-white rounded flex items-center justify-center text-sm">R</div>
            <span>ReputationFlow</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Le contenu de la page (Avis, Settings...) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* 3. MENU MOBILE (OVERLAY) */}
      {/* C'est ce qui s'affiche quand on clique sur le bouton Menu sur iPhone */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Fond noir transparent (cliquer pour fermer) */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Le Menu Latéral Glissant */}
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Bouton pour fermer */}
            <div className="absolute top-2 right-2 z-50">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* On réutilise le composant Sidebar ici */}
            <div className="h-full pt-8">
               <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}