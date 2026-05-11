<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useDashboard } from '../composables/useDashboard'
import { sendCommitCountToPi } from '../services/senseHatService'
import RepoInput from './RepoInput.vue'
import MilestoneTracker from './MilestoneTracker.vue'
import Leaderboard from './Leaderboard.vue'
import { LayoutDashboard, RefreshCw, AlertCircle } from 'lucide-vue-next'

const { stats, loading, error, fetchStats, trackRepository } = useDashboard()

let piInterval: any = null

// Watch for changes in totalCommits and sync with Pi
watch(() => stats.value?.totalCommits, async (newCount) => {
  if (newCount !== undefined) {
    await sendCommitCountToPi(newCount)
  }
})

onMounted(async () => {
  await fetchStats()
  
  // Set up 1-minute interval for background stats refresh
  // The Pi sync will be triggered by the watch above
  piInterval = setInterval(async () => {
    await fetchStats()
  }, 60000) // 1 minute
})

onUnmounted(() => {
  if (piInterval) {
    clearInterval(piInterval)
  }
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="max-w-[1180px] mx-auto flex justify-between items-center mb-8 py-8 px-6">
      <div class="flex items-center gap-3">
        <span class="text-2xl font-extrabold text-premium-green">‹/›</span>
        <h1 class="text-xl font-extrabold tracking-tight">Dev Leaderboard</h1>
      </div>
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <span class="text-premium-text">Synced with GitHub</span>
          <span class="w-2.5 h-2.5 rounded-full bg-premium-green shadow-[0_0_15px_rgba(62,228,124,0.8)]"></span>
        </div>
        <button
          @click="fetchStats"
          class="flex items-center gap-2 text-premium-muted hover:text-premium-text transition-colors"
          :disabled="loading"
        >
          <span class="text-xs">2 min ago</span>
          <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': loading }" />
        </button>
      </div>
    </header>

    <main class="max-w-[1180px] mx-auto px-6 pb-12 space-y-10">
      <!-- Error Alert -->
      <div v-if="error" class="p-4 bg-red-900/20 border border-red-500/50 rounded-md flex items-center gap-3 text-red-400">
        <AlertCircle class="h-5 w-5 shrink-0" />
        <p class="text-sm font-medium">{{ error }}</p>
      </div>

      <!-- Repo Input Section -->
      <section>
        <RepoInput :loading="loading" @track="trackRepository" />
      </section>

      <!-- Stats Sections -->
      <div v-if="stats && stats.repositoryUrl" class="space-y-12">
        <section>
          <MilestoneTracker :milestone="stats.milestone" :totalCommits="stats.totalCommits" />
        </section>

        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-black tracking-tight uppercase">Leaderboard</h2>
          </div>

          <Leaderboard :leaderboard="stats.leaderboard" />
        </section>

        <!-- New Cards Section -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article class="bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl p-6 shadow-2xl">
            <h3 class="text-premium-muted text-xs font-bold uppercase mb-6">Top repo</h3>
            <div class="text-xl font-extrabold mb-2">{{ stats.repositoryUrl.split('/').pop() }}</div>
            <div class="text-premium-muted text-sm">{{ stats.totalCommits }} commits</div>
            <div class="h-2.5 bg-white/10 rounded-full mt-6 overflow-hidden">
              <div class="h-full bg-premium-green w-2/3"></div>
            </div>
          </article>

          <article class="bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl p-6 shadow-2xl">
            <h3 class="text-premium-muted text-xs font-bold uppercase mb-6">Mest aktive dag</h3>
            <div class="text-xl font-extrabold mb-2">📅 Tirsdag</div>
            <div class="text-premium-muted text-sm">18% af alle commits</div>
          </article>

          <article class="bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl p-6 shadow-2xl">
            <h3 class="text-premium-muted text-xs font-bold uppercase mb-6">Aktivitet</h3>
            <div class="flex items-end gap-2 h-[70px] mb-4">
              <div class="w-3.5 bg-gradient-to-t from-premium-green-dark to-premium-green rounded-t-sm h-[40%]"></div>
              <div class="w-3.5 bg-gradient-to-t from-premium-green-dark to-premium-green rounded-t-sm h-[60%]"></div>
              <div class="w-3.5 bg-gradient-to-t from-premium-green-dark to-premium-green rounded-t-sm h-[50%]"></div>
              <div class="w-3.5 bg-gradient-to-t from-premium-green-dark to-premium-green rounded-t-sm h-[80%]"></div>
              <div class="w-3.5 bg-gradient-to-t from-premium-green-dark to-premium-green rounded-t-sm h-[100%]"></div>
            </div>
            <div class="text-xl font-extrabold text-premium-green">↑ 23%</div>
            <div class="text-premium-muted text-sm">vs. sidste uge</div>
          </article>
        </section>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-24 bg-gradient-to-b from-white/[0.035] to-white/[0.015] rounded-2xl border border-premium-border border-dashed">
        <div class="flex justify-center mb-6">
          <div class="p-6 bg-premium-bg rounded-full border border-premium-border">
            <LayoutDashboard class="h-10 w-10 text-premium-muted" />
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-2">No repository being tracked</h2>
        <p class="text-premium-muted text-base max-w-md mx-auto">Enter a GitHub repository URL above to start motivating your team with premium insights!</p>
      </div>

      <footer class="text-center text-premium-muted text-sm pt-8">
        Data hentes fra GitHub API • Opdateres hvert 5. minut
      </footer>
    </main>
  </div>
</template>
