<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboard } from '../composables/useDashboard'
import RepoInput from './RepoInput.vue'
import MilestoneTracker from './MilestoneTracker.vue'
import Leaderboard from './Leaderboard.vue'
import { LayoutDashboard, RefreshCw, AlertCircle } from 'lucide-vue-next'

const { stats, loading, error, fetchStats, trackRepository } = useDashboard()

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-12">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Header -->
      <header class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 p-2 rounded-lg shadow-lg">
            <LayoutDashboard class="h-6 w-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-slate-900">GitHub Motivator</h1>
        </div>
        <button
          @click="fetchStats"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          :disabled="loading"
        >
          <RefreshCw class="h-4 w-4" :class="{ 'animate-spin': loading }" />
          Refresh
        </button>
      </header>

      <!-- Error Alert -->
      <div v-if="error" class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
        <AlertCircle class="h-5 w-5 shrink-0" />
        <p class="text-sm font-medium">{{ error }}</p>
      </div>

      <!-- Repo Input -->
      <RepoInput :loading="loading" @track="trackRepository" />

      <!-- Stats Grid -->
      <div v-if="stats && stats.repositoryUrl" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MilestoneTracker :milestone="stats.milestone" :totalCommits="stats.totalCommits" />
        <Leaderboard :leaderboard="stats.leaderboard" />
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
        <p class="text-slate-400 font-medium">No repository being tracked yet.</p>
        <p class="text-slate-400 text-sm">Enter a GitHub URL above to start motivating!</p>
      </div>
    </div>
  </div>
</template>
