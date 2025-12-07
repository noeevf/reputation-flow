# ReputationFlow

SaaS B2B pour aider les commerçants français à répondre automatiquement à leurs avis Google en utilisant l'IA.

## Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript
- **Style**: Tailwind CSS
- **Composants UI**: Shadcn UI + Lucide React
- **Backend/Auth**: Supabase (structure préparée)
- **IA**: OpenAI API (gpt-4o-mini)

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env.local` à la racine du projet :
```env
OPENAI_API_KEY=votre_clé_api_openai
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du Projet

- `/app` - Pages et routes Next.js 14
  - `/page.tsx` - Landing page
  - `/dashboard/page.tsx` - Dashboard principal
  - `/api/generate-response` - API route pour générer les réponses IA
- `/components` - Composants React réutilisables
  - `/ui` - Composants Shadcn UI
  - `/dashboard` - Composants spécifiques au dashboard
- `/lib` - Utilitaires et types
  - `mock-data.ts` - Données fictives pour le développement
  - `types.ts` - Types TypeScript

## Fonctionnalités

- ✅ Landing page avec Hero section et "Comment ça marche"
- ✅ Dashboard avec sidebar de navigation
- ✅ Liste des avis clients avec données mockées
- ✅ Génération de réponses IA via OpenAI
- ✅ États de chargement et gestion des erreurs
- ✅ Design responsive et moderne

## Prochaines Étapes

- [ ] Intégration complète avec Supabase (authentification)
- [ ] Connexion réelle avec Google Business API
- [ ] Publication automatique des réponses sur Google
- [ ] Historique et analytics
- [ ] Personnalisation des prompts IA

