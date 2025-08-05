// Database connection and Prisma client setup

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single instance of Prisma Client
export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Database utility functions
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to database successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect();
    console.log('Disconnected from database successfully');
  } catch (error) {
    console.error('Failed to disconnect from database:', error);
    throw error;
  }
}

// Health check function
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

// Transaction wrapper
export async function withTransaction<T>(
  fn: (prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(fn);
}

// Cleanup function for graceful shutdown
export async function cleanup() {
  await disconnectFromDatabase();
} 