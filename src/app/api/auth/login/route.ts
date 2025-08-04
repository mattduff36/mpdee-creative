import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession } from '../../../../../lib/auth';
import { LoginCredentials } from '../../../../../lib/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { username, password }: LoginCredentials = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    const isValid = await validateCredentials({ username, password });
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create session
    await createSession(username);

    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
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