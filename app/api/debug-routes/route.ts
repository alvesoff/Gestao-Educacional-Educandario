import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const routes = [
      '/api/auth/login',
      '/api/auth/logout', 
      '/api/export',
      '/api/filtros',
      '/api/relatorios',
      '/api/test-sql',
      '/api/debug-routes'
    ];

    const routeStatus = [];

    for (const route of routes) {
      try {
        const baseUrl = request.nextUrl.origin;
        const testUrl = `${baseUrl}${route}`;
        
        routeStatus.push({
          route,
          url: testUrl,
          status: 'exists'
        });
      } catch (error) {
        routeStatus.push({
          route,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercelRegion: process.env.VERCEL_REGION || 'unknown',
      routes: routeStatus,
      availableEnvVars: {
        hasNodeEnv: !!process.env.NODE_ENV,
        hasMysqlHost: !!process.env.MYSQL_HOST,
        hasMysqlPort: !!process.env.MYSQL_PORT,
        hasMysqlDatabase: !!process.env.MYSQL_DATABASE,
        hasMysqlUser: !!process.env.MYSQL_USER,
        hasMysqlPassword: !!process.env.MYSQL_PASSWORD,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasAdminUsername: !!process.env.ADMIN_USERNAME,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD
      }
    });

  } catch (error) {
    console.error('Erro na API debug-routes:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erro ao verificar rotas',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}