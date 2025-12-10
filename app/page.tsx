"use client" // <--- 1. INDISPENSABLE pour que le menu mobile marche

import { useState } from "react" // <--- 2. On importe la mémoire du bouton
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Sparkles, MessageSquare, Star, ArrowRight, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Home() {
  // 3. Cette variable retient si le menu est ouvert ou fermé
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <div className="h-8 w-8 bg-indigo-600 text-white rounded flex items-center justify-center">R</div>
            <span>ReputationFlow</span>
          </div>
          
          {/* MENU DESKTOP (Caché sur mobile) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-indigo-600 transition">Fonctionnalités</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition">Tarifs</Link>
            <Link href="#testimonials" className="hover:text-indigo-600 transition">Témoignages</Link>
          </nav>

          {/* BOUTONS DESKTOP (Cachés sur mobile) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Se connecter
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Essayer gratuitement</Button>
            </Link>
          </div>

          {/* BOUTON HAMBURGER (Visible UNIQUEMENT sur mobile) */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* --- LE MENU MOBILE (S'affiche quand on clique) --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b bg-white absolute w-full left-0 top-16 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <Link 
              href="#features" 
              className="text-sm font-medium text-gray-600 py-2 hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu au clic
            >
              Fonctionnalités
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium text-gray-600 py-2 hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium text-indigo-600 py-2 font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Se connecter
            </Link>
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Essayer gratuitement
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white pt-20 pb-32">
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-8">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Nouveau : Intégration GPT-4 Turbo</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Vos avis Google <br />
              <span className="text-indigo-600">gérés par l'IA.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              ReputationFlow rédige des réponses professionnelles, empathiques et personnalisées à tous vos clients.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="text-lg px-8 py-6 h-auto w-full shadow-xl shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700">
                  Commencer <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto">
                Voir la démo
                </Button>
                </Link>
            </div>

            {/* Note Social Proof */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
              </div>
              <span>Approuvé par +500 commerçants</span>
            </div>
          </div>
        </section>

        {/* Section Logos / Trust */}
        <section className="border-y border-gray-100 bg-white py-10">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-bold">Acme Corp</span>
              <span className="text-xl font-bold">GlobalTech</span>
              <span className="text-xl font-bold">RestoOne</span>
              <span className="text-xl font-bold">BeautySpa</span>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-gray-600">3 étapes simples pour automatiser votre relation client.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-7 h-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">1. Connexion</CardTitle>
                  <CardDescription className="text-base">
                    Connectez votre fiche Google Business Profile en un clic.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Magique
                </div>
                <CardHeader>
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">2. Génération IA</CardTitle>
                  <CardDescription className="text-base">
                    L'IA analyse le sentiment et rédige une réponse parfaite instantanément.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">3. Publication</CardTitle>
                  <CardDescription className="text-base">
                    Validez la réponse ou laissez l'IA publier automatiquement.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Tarifs (Pricing) */}
        <section id="pricing" className="py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tarifs simples.
              </h2>
              <p className="text-lg text-gray-600">
                Aucun frais caché. Annulable à tout moment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
              
              {/* PLAN 1 : GRATUIT */}
              <Card className="border shadow-sm hover:shadow-md transition-shadow relative bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Découverte</CardTitle>
                  <CardDescription>Pour tester la puissance de l'IA.</CardDescription>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">0€</span>
                    <span className="text-gray-500">/mois</span>
                  </div>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 5 réponses / mois</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 1 établissement</li>
                    <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4" /> Pas de support prioritaire</li>
                  </ul>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">Commencer gratuitement</Button>
                  </Link>
                </div>
              </Card>

              {/* PLAN 2 : PRO */}
              <Card className="border-2 border-indigo-600 shadow-xl relative bg-white transform md:-translate-y-4">
                <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Populaire
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-600">Pro</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">29€</span>
                    <span className="text-gray-500">/mois</span>
                  </div>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> <strong>Réponses illimitées</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> IA Supérieure (GPT-4)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Support 7j/7</li>
                  </ul>
                  <Link href="/dashboard">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11">
                      Choisir Pro
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* PLAN 3 : AGENCE */}
              <Card className="border shadow-sm hover:shadow-md transition-shadow relative bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Agence</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">99€</span>
                    <span className="text-gray-500">/mois</span>
                  </div>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Tout illimité</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Multi-comptes</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Marque blanche</li>
                  </ul>
                  <Link href="mailto:contact@reputationflow.com">
                    <Button variant="outline" className="w-full">Nous contacter</Button>
                  </Link>
                </div>
              </Card>

            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-indigo-900 py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à gagner du temps ?
            </h2>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 text-indigo-900 font-bold hover:bg-white">
                Essai gratuit
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12 text-gray-600">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 font-bold text-xl text-indigo-600 mb-4">
              <div className="h-6 w-6 bg-indigo-600 text-white rounded flex items-center justify-center text-xs">R</div>
              <span>ReputationFlow</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 ReputationFlow.
            </div>
        </div>
      </footer>
    </div>
  )
}