import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Flex container : Met les éléments côte à côte (Sidebar | Contenu)
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      
      {/* 1. La Sidebar (Fixe à gauche) */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r bg-white h-full overflow-y-auto">
        <Sidebar />
      </aside>

      {/* 2. Le Contenu (Prend tout le reste de la place) */}
      <main className="flex-1 h-full overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
    </div>
  )
}