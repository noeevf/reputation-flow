"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Settings, LogOut, MoreHorizontal, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Avis", href: "/dashboard/reviews", icon: MessageSquare },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* En-tête Sidebar */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {/* Tu peux ajouter un logo icône ici si tu veux */}
          <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">ReputationFlow</h1>
        </Link>
      </div>
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">ReputationFlow</h1>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      {/* Menu Utilisateur en bas */}
      <div className="p-4 border-t border-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center w-full gap-3 p-2 text-left rounded-md hover:bg-gray-50 transition-colors outline-none group">
              {/* Avatar simulé */}
              <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                JD
              </div>
              
              {/* Infos utilisateur */}
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>

              {/* Icône 3 points */}
              <MoreHorizontal className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          
          {/* Contenu du menu */}
          <DropdownMenuContent align="end" className="w-56" side="right" sideOffset={10}>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-gray-500" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}