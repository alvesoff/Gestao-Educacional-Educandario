import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true'
  
  // Rotas que não precisam de autenticação
  const publicRoutes = ['/login']
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
  
  // Se não está autenticado e não está em uma rota pública, redirecionar para login
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Se está autenticado e está na página de login, redirecionar para home
  if (isAuthenticated && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}