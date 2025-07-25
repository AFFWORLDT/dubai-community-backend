'use client'
import { create } from 'zustand'
import { clearCookies, getCookie, setCookies } from '@/utils/cookies'
interface AuthState {
  user: any
  accessToken: string | null
  isAuthenticated: boolean
  login: (tokens: { accessToken: string; refreshToken: string }, user: any) => void
  logout: () => void
  getToken: () => string | null
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getCookie('user'),
  accessToken: getCookie('accessToken'),
  isAuthenticated: !!getCookie('accessToken'),

  login: (tokens, userData) => {
    setCookies(tokens, userData)
    set({ 
      user: userData, 
      accessToken: tokens.accessToken,
      isAuthenticated: true 
    })
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    clearCookies()
    set({ 
      user: null, 
      accessToken: null,
      isAuthenticated: false 
    })
  },

  getToken: () => get().accessToken
}))