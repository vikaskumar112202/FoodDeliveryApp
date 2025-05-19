import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';

export interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      register: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiRequest('POST', '/api/auth/register', { username, password });
          const data = await res.json();
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
          
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred during registration',
            isLoading: false
          });
        }
      },
      
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiRequest('POST', '/api/auth/login', { username, password });
          const data = await res.json();
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
          
          // Invalidate user related queries
          queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
          
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Invalid username or password',
            isLoading: false
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await apiRequest('POST', '/api/auth/logout', {});
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          });
          
          // Invalidate queries that require auth
          queryClient.invalidateQueries();
          
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred during logout',
            isLoading: false
          });
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
    }
  )
);
