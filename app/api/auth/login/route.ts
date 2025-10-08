import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Verificar credenciais com as variáveis de ambiente
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD

    if (username === adminUsername && password === adminPassword) {
      // Login bem-sucedido
      const response = NextResponse.json(
        { message: 'Login realizado com sucesso' },
        { status: 200 }
      )

      // Definir cookie de autenticação
      response.cookies.set('authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })

      return response
    } else {
      // Credenciais inválidas
      return NextResponse.json(
        { message: 'Usuário ou senha incorretos' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}