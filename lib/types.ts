// Core types for remaining functionality

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Email types (for contact forms)
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

// Utility types
export type CreateData<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type UpdateData<T> = Partial<CreateData<T>>; 