const API_BASE_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') ?? ''
const GITHUB_LOGIN_PATH = import.meta.env.VITE_GITHUB_LOGIN_PATH?.trim() || 'auth/github/login'

export function getGitHubLoginUrl(): string | null {
  if (!API_BASE_URL) {
    return null
  }

  const normalizedBase = `${API_BASE_URL}/`
  const normalizedPath = GITHUB_LOGIN_PATH.replace(/^\//, '')

  return new URL(normalizedPath, normalizedBase).toString()
}

