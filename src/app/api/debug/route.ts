import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow in development or with a debug key
  const debugKey = process.env.DEBUG_KEY || 'debug123';
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasAdminUsername: !!process.env.ADMIN_USERNAME,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
    adminUsernameLength: process.env.ADMIN_USERNAME?.length || 0,
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length || 0,
    authSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
    timestamp: new Date().toISOString()
  });
} 