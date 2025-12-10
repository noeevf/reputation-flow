import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. On prépare la réponse (pour pouvoir y écrire des cookies si besoin)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. On crée un client Supabase temporaire juste pour ce "check"
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // 3. On vérifie : Est-ce que l'utilisateur est connecté ?
  const { data: { user } } = await supabase.auth.getUser()

  // 4. LA RÈGLE DE SÉCURITÉ :
  // Si l'utilisateur veut aller sur le Dashboard MAIS qu'il n'est pas connecté...
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    // ... On le redirige vers la page de Login !
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si tout est bon, on le laisse passer
  return response
}

// On dit au Vigile de surveiller uniquement les routes du Dashboard
export const config = {
  matcher: ['/dashboard/:path*'],
}