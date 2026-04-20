import { Platform } from 'react-native'

export type AuthUserSession = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    email: string
    fullName: string
    role: string
    verified: boolean
  }
}

type ApiEnvelope<T> = {
  statusCode?: number
  message?: string
  data?: T
}

const DEFAULT_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000')

async function requestAuth<T>(
  path: 'login' | 'register',
  body: Record<string, string>,
): Promise<T> {
  const response = await fetch(`${DEFAULT_BASE_URL}/auth/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const payload = (await response.json()) as ApiEnvelope<T>

  if (!response.ok) {
    throw new Error(payload.message ?? 'Authentication request failed')
  }

  return (payload.data ?? payload) as T
}

export function login(email: string, password: string) {
  return requestAuth<AuthUserSession>('login', { email, password })
}

export function register(fullName: string, email: string, password: string) {
  return requestAuth<AuthUserSession>('register', {
    fullName,
    email,
    password,
  })
}
