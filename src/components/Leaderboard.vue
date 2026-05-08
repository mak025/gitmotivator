<script setup lang="ts">
import type { LeaderboardEntry } from '../composables/useDashboard'

defineProps<{
  leaderboard: LeaderboardEntry[]
}>()
</script>

<template>
  <div class="bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl overflow-hidden shadow-2xl">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[860px]">
        <thead>
          <tr class="text-premium-muted text-sm border-b border-premium-line">
            <th class="px-6 py-5 font-semibold">#</th>
            <th class="px-6 py-5 font-semibold">Contributor</th>
            <th class="px-6 py-5 font-semibold">Commits</th>
            <th class="px-6 py-5 font-semibold">PRs</th>
            <th class="px-6 py-5 font-semibold">Merges</th>
            <th class="px-6 py-5 font-semibold">Reviews</th>
            <th class="px-6 py-5 font-semibold">Streak</th>
            <th class="px-6 py-5 font-semibold text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in leaderboard" :key="entry.authorEmail" class="hover:bg-white/[0.02] transition-colors group border-b border-premium-line last:border-0">
            <td class="px-6 py-5 text-xl">
              <span v-if="index === 0">🥇</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else class="text-premium-muted text-lg">{{ index + 1 }}</span>
            </td>
            <td class="px-6 py-5">
              <div class="flex items-center gap-4">
                <div class="h-11 w-11 rounded-full bg-gradient-to-br from-[#dfe8f5] to-[#6f7c8e] flex items-center justify-center text-premium-bg font-black text-sm shrink-0 shadow-lg border border-white/10">
                  {{ entry.authorName ? entry.authorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?' }}
                </div>
                <div>
                  <div class="font-extrabold text-premium-text text-base">{{ entry.authorName || 'Unknown' }}</div>
                  <div class="text-premium-muted text-xs font-medium">@{{ entry.authorEmail ? entry.authorEmail.split('@')[0] : 'unknown' }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-5 text-premium-green font-black">{{ entry.commitCount }}</td>
            <td class="px-6 py-5 text-[#e6ebf3]">{{ Math.round(entry.commitCount * 0.2) }}</td>
            <td class="px-6 py-5 text-[#e6ebf3]">{{ Math.round(entry.commitCount * 0.1) }}</td>
            <td class="px-6 py-5 text-[#e6ebf3]">{{ Math.round(entry.commitCount * 0.3) }}</td>
            <td class="px-6 py-5 text-[#e6ebf3]">{{ Math.round(entry.commitCount / 10) }}🔥</td>
            <td class="px-6 py-5 text-right font-black text-premium-text">{{ (entry.commitCount * 4).toLocaleString() }}</td>
          </tr>
          <tr v-if="leaderboard.length === 0">
            <td colspan="8" class="px-6 py-20 text-center text-premium-muted italic text-base">
              No activity recorded yet. Join the race!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
