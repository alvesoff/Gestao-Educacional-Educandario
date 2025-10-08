import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET() {
  try {
    console.log('=== TESTE DE CONEXÃO MYSQL ===');
    console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
    console.log('MYSQL_PORT:', process.env.MYSQL_PORT);
    console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
    console.log('MYSQL_USER:', process.env.MYSQL_USER);
    console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '***DEFINIDA***' : 'NÃO DEFINIDA');
    
    // Teste simples de conexão
    const result = await executeQuery('SELECT 1 as test, NOW() as current_time');
    
    console.log('Conexão MySQL bem-sucedida!', result);
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com MySQL estabelecida com sucesso!',
      data: result,
      env_check: {
        host: process.env.MYSQL_HOST || 'NÃO DEFINIDO',
        port: process.env.MYSQL_PORT || 'NÃO DEFINIDO',
        database: process.env.MYSQL_DATABASE || 'NÃO DEFINIDO',
        user: process.env.MYSQL_USER || 'NÃO DEFINIDO',
        password_set: !!process.env.MYSQL_PASSWORD
      }
    });
    
  } catch (error: any) {
    console.error('=== ERRO DE CONEXÃO MYSQL ===');
    console.error('Erro completo:', error);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: error.toString(),
      env_check: {
        host: process.env.MYSQL_HOST || 'NÃO DEFINIDO',
        port: process.env.MYSQL_PORT || 'NÃO DEFINIDO',
        database: process.env.MYSQL_DATABASE || 'NÃO DEFINIDO',
        user: process.env.MYSQL_USER || 'NÃO DEFINIDO',
        password_set: !!process.env.MYSQL_PASSWORD
      }
    }, { status: 500 });
  }
}