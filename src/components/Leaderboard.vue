<script setup lang="ts">
import { Users } from 'lucide-vue-next'
import type { LeaderboardEntry } from '../composables/useDashboard'

defineProps<{
  leaderboard: LeaderboardEntry[]
}>()
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-6">
      <Users class="h-5 w-5 text-indigo-500" />
      Leaderboard
    </h3>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-slate-100">
            <th class="pb-3 font-semibold text-slate-600 text-sm">Collaborator</th>
            <th class="pb-3 font-semibold text-slate-600 text-sm text-right">Commits</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="(entry, index) in leaderboard" :key="entry.authorEmail" class="group">
            <td class="py-4">
              <div class="flex items-center gap-3">
                <span class="w-6 text-sm font-bold text-slate-400">#{{ index + 1 }}</span>
                <div>
                  <div class="font-medium text-slate-800">{{ entry.authorName }}</div>
                  <div class="text-xs text-slate-500">{{ entry.authorEmail }}</div>
                </div>
              </div>
            </td>
            <td class="py-4 text-right">
              <span class="font-bold text-slate-800">{{ entry.commitCount }}</span>
            </td>
          </tr>
          <tr v-if="leaderboard.length === 0">
            <td colspan="2" class="py-8 text-center text-slate-400 italic text-sm">
              No commits tracked yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
