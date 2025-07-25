import Cookies from 'js-cookie'

interface Tokens {
  accessToken: string
  refreshToken: string
}

interface CookieOptions {
  expires: number
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
  path: string
}

const defaultOptions: CookieOptions = {
  secure: true,
  sameSite: 'strict',
  path: '/',
  expires: 20
}

export const setCookies = (tokens: Tokens, user: any) => {
  Cookies.set('accessToken', tokens.accessToken, { ...defaultOptions, expires: 7 })
  Cookies.set('refreshToken', tokens.refreshToken, { ...defaultOptions, expires: 30 })
  Cookies.set('user', JSON.stringify(user), defaultOptions)
}

export const clearCookies = () => {
  const options = { path: '/' }
  Cookies.remove('accessToken', options)
  Cookies.remove('refreshToken', options)
  Cookies.remove('user', options)
}

export const getCookie = (name: string) => {
  try {
    const value = Cookies.get(name)
    return value ? name === 'user' ? JSON.parse(value) : value : null
  } catch {
    return null
  }
}