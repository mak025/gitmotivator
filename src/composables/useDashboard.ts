import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || 'http://localhost:5183/api'

export interface MilestoneProgress {
  currentLevel: number
  commitsInCurrentLevel: number
  targetForNextLevel: number
  percentage: number
  message: string
}

export interface Milestone {
  id: number
  commitThreshold: number
  isCompleted: boolean
  message: string
  repositoryId: number
}

export interface Repository {
  id: number
  owner: string
  name: string
  url: string
}

export interface LeaderboardEntry {
  authorName: string
  authorEmail: string
  commitCount: number
}

export interface DashboardStats {
  repositoryId: number
  repositoryUrl: string
  totalCommits: number
  milestone: MilestoneProgress
  leaderboard: LeaderboardEntry[]
}

const stats = ref<DashboardStats | null>(null)
const milestones = ref<Milestone[]>([])
const repositories = ref<Repository[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const token = ref<string | null>(null)

export function useDashboard() {
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
        if (stats.value?.repositoryId) {
          await fetchMilestones(stats.value.repositoryId)
        }
      } else {
        throw new Error('Failed to fetch stats')
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchMilestones(repoId: number) {
    try {
      const currentToken = await fetchToken()
      const response = await fetch(`${apiUrl}/Milestone/all/${repoId}`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (response.ok) {
        milestones.value = await response.json()
      }
    } catch (e: any) {
      console.error('Failed to fetch milestones:', e)
    }
  }

  async function fetchRepositories() {
    try {
      const currentToken = await fetchToken()
      const response = await fetch(`${apiUrl}/dashboard/repositories`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      if (response.ok) {
        repositories.value = await response.json()
      }
    } catch (e: any) {
      console.error('Failed to fetch repositories:', e)
    }
  }

  async function createMilestone(data: { commitThreshold: number, message: string, repositoryId: number }) {
    loading.value = true
    error.value = null
    try {
      const currentToken = await fetchToken()
      const response = await fetch(`${apiUrl}/Milestone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        if (stats.value?.repositoryId === data.repositoryId) {
          await fetchMilestones(data.repositoryId)
        }
        return true
      } else {
        const errData = await response.json()
        throw new Error(errData.message || 'Failed to create milestone')
      }
    } catch (e: any) {
      error.value = e.message
      return false
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
    milestones,
    repositories,
    loading,
    error,
    fetchStats,
    fetchMilestones,
    fetchRepositories,
    createMilestone,
    trackRepository
  }
}
