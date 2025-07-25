import Cookies from 'js-cookie'
import { clearCookies, getCookie } from './cookies'
import { jwtDecode } from 'jwt-decode'

interface Token {
  value: string
  expiresAt: number
}

class TokenStore {
  private token: Token | null = null
  private refreshToken: Token | null = null
  private readonly TOKEN_KEY = 'access_token'
  private readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private readonly COOKIE_TOKEN_KEY = 'accessToken'
  private readonly COOKIE_REFRESH_TOKEN_KEY = 'refreshToken'
  private listeners: Set<(token: Token | null) => void> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeFromCookies()
    }
  }

  private initializeFromCookies(): void {
    try {
      const cookieToken = getCookie(this.COOKIE_TOKEN_KEY)
      const cookieRefreshToken = getCookie(this.COOKIE_REFRESH_TOKEN_KEY)

      if (cookieToken) {
        this.token = {
          value: cookieToken,
          expiresAt: Date.now() + (20 * 24 * 60 * 60 * 1000) // 20 days in milliseconds
        }
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this.token))
      }
      if (cookieRefreshToken) {
        this.refreshToken = {
          value: cookieRefreshToken,
          expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days in milliseconds
        }
        localStorage.setItem(this.REFRESH_TOKEN_KEY, JSON.stringify(this.refreshToken))
      }
    } catch (error) {
      console.error('Error initializing from cookies:', error)
      this.clearTokens()
    }
  }

  public subscribe(listener: (token: Token | null) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.token))
  }

  public getToken(): string | null {
    try {
      const cookieToken = Cookies.get(this.COOKIE_TOKEN_KEY)
      const token = cookieToken || this.token?.value || null
      
      if (token && this.isTokenExpiredJWT(token)) {
        this.clearTokens()
        return null
      }
      
      return token
    } catch (error) {
      console.error('Error getting token:', error)
      return null
    }
  }

  private isTokenExpiredJWT(token: string): boolean {
    try {
      const decoded = jwtDecode<{ exp: number }>(token)
      return decoded.exp * 1000 < Date.now()
    } catch (error) {
      console.error('Error decoding token:', error)
      return true
    }
  }

  public setToken(newToken: string | null, expiresIn: number = 20 * 24 * 60 * 60): void {
    // Handle Bearer token format
    if (newToken?.startsWith('Bearer ')) {
      newToken = newToken.replace('Bearer ', '').trim()
    }
    if (newToken) {
      this.token = {
        value: newToken,
        expiresAt: Date.now() + expiresIn * 1000
      }
      Cookies.set(this.COOKIE_TOKEN_KEY, newToken, {
        expires: expiresIn / 86400,
        secure: true,
        sameSite: 'strict',
        path: '/'
      })
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this.token))
    } else {
      this.token = null
      Cookies.remove(this.COOKIE_TOKEN_KEY, { path: '/' })
      localStorage.removeItem(this.TOKEN_KEY)
    }
    this.notifyListeners()
  }

  public getRefreshToken(): string | null {
    const cookieRefreshToken = getCookie(this.COOKIE_REFRESH_TOKEN_KEY)
    return cookieRefreshToken || this.refreshToken?.value || null
  }

  public setRefreshToken(newRefreshToken: string | null, expiresIn: number = 30 * 24 * 60 * 60): void {
    if (newRefreshToken) {
      this.refreshToken = {
        value: newRefreshToken,
        expiresAt: Date.now() + expiresIn * 1000
      }
      Cookies.set(this.COOKIE_REFRESH_TOKEN_KEY, newRefreshToken, {
        expires: expiresIn / 86400,
        secure: true,
        sameSite: 'strict',
        path: '/'
      })
      localStorage.setItem(this.REFRESH_TOKEN_KEY, JSON.stringify(this.refreshToken))
    } else {
      this.refreshToken = null
      Cookies.remove(this.COOKIE_REFRESH_TOKEN_KEY, { path: '/' })
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    }
  }

  public isTokenExpired(): boolean {
    if (!this.token) return true
    return Date.now() >= this.token.expiresAt
  }

  public isRefreshTokenExpired(): boolean {
    if (!this.refreshToken) return true
    return Date.now() >= this.refreshToken.expiresAt
  }

  public clearTokens(): void {
    this.token = null
    this.refreshToken = null
    clearCookies()
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    this.notifyListeners()
  }
}

const tokenStoreInstance = new TokenStore()
export default tokenStoreInstance
