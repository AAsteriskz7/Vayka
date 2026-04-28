import { cookies } from 'next/headers'

const COOKIE_NAME = 'vayka_session'
const MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

export interface SessionPayload {
  userId: string
  role: 'user' | 'admin'
  displayName: string
  email: string
  exp: number
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET ?? 'dev-secret-change-in-production'
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret).buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

function toBase64Url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function fromBase64Url(str: string): ArrayBuffer {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer as ArrayBuffer
}

async function signData(data: string): Promise<string> {
  const key = await getKey()
  const sig = await crypto.subtle.sign(
    'HMAC', key,
    new TextEncoder().encode(data).buffer as ArrayBuffer
  )
  return toBase64Url(sig)
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const dot = token.lastIndexOf('.')
    if (dot === -1) return null
    const data = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const key = await getKey()
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      fromBase64Url(sig),
      new TextEncoder().encode(data).buffer as ArrayBuffer
    )
    if (!valid) return null
    const json = new TextDecoder().decode(fromBase64Url(data))
    const payload: SessionPayload = JSON.parse(json)
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export async function createSession(payload: Omit<SessionPayload, 'exp'>) {
  const full: SessionPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + MAX_AGE }
  const data = toBase64Url(new TextEncoder().encode(JSON.stringify(full)).buffer as ArrayBuffer)
  const sig = await signData(data)
  const token = `${data}.${sig}`
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
