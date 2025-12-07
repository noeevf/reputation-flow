import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Sparkles, MessageSquare, Star, ArrowRight, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <div className="h-8 w-8 bg-indigo-600 text-white rounded flex items-center justify-center">R</div>
            <span>ReputationFlow</span>
          </div>
          
          {/* Liens Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-indigo-600 transition">Fonctionnalités</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition">Tarifs</Link>
            <Link href="#testimonials" className="hover:text-indigo-600 transition">Témoignages</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 hidden md:block">
              Se connecter
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Essayer gratuitement</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white pt-20 pb-32">
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Badge de nouveauté */}
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-8">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Nouveau : Intégration GPT-4 Turbo</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Ne laissez plus aucun avis <br />
              <span className="text-indigo-600">Google sans réponse.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              ReputationFlow utilise l'intelligence artificielle pour générer des réponses professionnelles, empathiques et personnalisées à tous vos avis clients.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto shadow-xl shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700">
                  Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto">
                Voir la démo
              </Button>
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

        {/* 2. Section Logos / Trust */}
        <section className="border-y border-gray-100 bg-white py-10">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">
              Ils boostent leur réputation avec nous
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-bold">Acme Corp</span>
              <span className="text-xl font-bold">GlobalTech</span>
              <span className="text-xl font-bold">RestoOne</span>
              <span className="text-xl font-bold">BeautySpa</span>
              <span className="text-xl font-bold">AutoFix</span>
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
              {/* Carte 1 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-7 h-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">1. Connexion Google</CardTitle>
                  <CardDescription className="text-base">
                    Connectez votre fiche Google Business Profile en un clic. Nous récupérons vos avis en temps réel et en toute sécurité.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Carte 2 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  L'étape magique
                </div>
                <CardHeader>
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">2. Génération IA</CardTitle>
                  <CardDescription className="text-base">
                    Notre IA analyse le sentiment de l'avis et rédige une réponse personnalisée, polie et adaptée à votre image de marque.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Carte 3 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">3. Validation & Publication</CardTitle>
                  <CardDescription className="text-base">
                    Gardez le contrôle : modifiez la réponse si besoin ou validez-la pour une publication instantanée sur Google.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Tarifs (Pricing) - NOUVEAU */}
        <section id="pricing" className="py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Des tarifs simples et transparents.
              </h2>
              <p className="text-lg text-gray-600">
                Commencez gratuitement, passez à la vitesse supérieure quand vous êtes prêt.
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
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 5 réponses générées / mois</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 1 établissement Google</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Ton "Professionnel" uniquement</li>
                    <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4" /> Pas de support prioritaire</li>
                  </ul>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">Commencer gratuitement</Button>
                  </Link>
                </div>
              </Card>

              {/* PLAN 2 : PRO (Mis en avant) */}
              <Card className="border-2 border-indigo-600 shadow-xl relative bg-white transform md:-translate-y-4">
                <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Le plus populaire
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-600">Pro</CardTitle>
                  <CardDescription>Pour les commerçants ambitieux.</CardDescription>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">29€</span>
                    <span className="text-gray-500">/mois</span>
                  </div>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> <strong>Réponses illimitées</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Jusqu'à 3 établissements</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Tous les tons (Amical, Empathique...)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Support prioritaire 24/7</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Connexion API Google</li>
                  </ul>
                  <Link href="/dashboard">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-lg">
                      Essayer le plan Pro
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-gray-500 mt-3">7 jours d'essai gratuit, sans engagement.</p>
                </div>
              </Card>

              {/* PLAN 3 : AGENCE */}
              <Card className="border shadow-sm hover:shadow-md transition-shadow relative bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Agence</CardTitle>
                  <CardDescription>Pour gérer plusieurs clients.</CardDescription>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">99€</span>
                    <span className="text-gray-500">/mois</span>
                  </div>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Tout illimité</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <strong>Comptes clients illimités</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Marque blanche (Votre logo)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Manager de compte dédié</li>
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
              Prêt à reprendre le contrôle de vos avis ?
            </h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
              Rejoignez les commerçants qui gagnent 2h par semaine grâce à ReputationFlow. Sans carte bancaire requise.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 text-indigo-900 font-bold hover:bg-white">
                Commencer gratuitement
              </Button>
            </Link>
            <p className="mt-6 text-sm text-indigo-300">Essai gratuit de 7 jours • Pas de carte requise</p>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="bg-gray-50 border-t py-12 text-gray-600">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 mb-4">
              <div className="h-6 w-6 bg-indigo-600 text-white rounded flex items-center justify-center text-xs">R</div>
              <span>ReputationFlow</span>
            </div>
            <p className="max-w-xs mb-6">
              La solution complète pour gérer votre e-réputation grâce à l'intelligence artificielle.
            </p>
            <div className="text-sm text-gray-400">
              © 2024 ReputationFlow. Tous droits réservés.
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Produit</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-indigo-600">Fonctionnalités</Link></li>
              <li><Link href="#pricing" className="hover:text-indigo-600">Tarifs</Link></li>
              <li><Link href="#testimonials" className="hover:text-indigo-600">Témoignages</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-600">Mentions légales</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Politique de confidentialité</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">CGV</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Contact</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}