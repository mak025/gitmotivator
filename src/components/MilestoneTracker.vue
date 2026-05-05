<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import type { MilestoneProgress } from '../composables/useDashboard'

defineProps<{
  milestone: MilestoneProgress
  totalCommits: number
}>()
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
        <Trophy class="h-5 w-5 text-yellow-500" />
        Milestone Progress
      </h3>
      <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
        Level {{ milestone.currentLevel }}
      </span>
    </div>

    <div class="space-y-4">
      <div class="flex justify-between text-sm font-medium text-slate-600">
        <span>{{ totalCommits }} Total Commits</span>
        <span>Target: {{ milestone.targetForNextLevel }}</span>
      </div>

      <div class="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden">
        <div
            class="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
            :style="{ width: `${milestone.percentage}%` }"
        ></div>
      </div>

      <div class="text-center text-sm text-slate-500 italic">
        {{ milestone.targetForNextLevel - totalCommits }} more commits to reach Level {{ milestone.currentLevel + 1 }}!
      </div>
    </div>
  </div>
</template>
