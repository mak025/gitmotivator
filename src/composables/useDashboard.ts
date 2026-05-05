import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || 'http://localhost:5183/api'

export interface MilestoneProgress {
  currentLevel: number
  commitsInCurrentLevel: number
  targetForNextLevel: number
  percentage: number
}

export interface LeaderboardEntry {
  authorName: string
  authorEmail: string
  commitCount: number
}

export interface DashboardStats {
  repositoryUrl: string
  totalCommits: number
  milestone: MilestoneProgress
  leaderboard: LeaderboardEntry[]
}

export function useDashboard() {
  const stats = ref<DashboardStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const token = ref<string | null>(null)

  async function fetchToken() {
    try {
      const response = await fetch(`${apiUrl}/auth/token`, { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        token.value = data.token
        return data.token
      }
    } catch (e) {
      console.error('Failed to fetch token', e)
    }
    return null
  }

  async function fetchStats() {
    loading.value = true
    error.value = null
    try {
      const currentToken = token.value || await fetchToken()
      if (!currentToken) throw new Error('Not authenticated')

      const response = await fetch(`${apiUrl}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (response.ok) {
        stats.value = await response.json()
      } else {
        throw new Error('Failed to fetch stats')
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function trackRepository(url: string) {
    loading.value = true
    error.value = null
    try {
      const currentToken = token.value || await fetchToken()
      if (!currentToken) throw new Error('Not authenticated')

      const response = await fetch(`${apiUrl}/dashboard/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ url })
      })

      if (response.ok) {
        await fetchStats()
      } else {
        const errData = await response.text()
        throw new Error(errData || 'Failed to track repository')
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    error,
    fetchStats,
    trackRepository
  }
}
