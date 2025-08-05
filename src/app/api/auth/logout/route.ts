import { NextResponse } from 'next/server';
import { destroySession, getSession } from '../../../../../lib/auth';

export async function POST() {
  try {
    // Check if user is authenticated
    const session = await getSession();
    
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Destroy session
    await destroySession();

    return NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
} 