<script setup lang="ts">
import type { MilestoneProgress } from '../composables/useDashboard'

defineProps<{
  milestone: MilestoneProgress
  totalCommits: number
}>()
</script>

<template>
  <div class="bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl p-8 md:p-10 shadow-2xl">
    <div class="text-premium-muted uppercase tracking-[0.04em] text-sm font-bold mb-2">Fælles milestone</div>
    <h1 class="text-4xl md:text-5xl font-black mb-3 tracking-tight">{{ milestone.message }}</h1>
    <p class="text-lg text-[#c3ccda] mb-10">Sammen når vi længere.</p>

    <div class="mb-12">
      <div class="h-[42px] bg-white/10 rounded-full overflow-hidden relative border border-white/5">
        <div 
          class="h-full bg-gradient-to-r from-premium-green to-[#58d878] flex items-center justify-end pr-6 text-white font-black text-lg transition-all duration-1000 ease-out shadow-[0_0_30px_rgba(62,228,124,0.32)]"
          :style="{ width: `${milestone.percentage}%` }"
        >
          {{ Math.round(milestone.percentage) }}%
        </div>
      </div>
      
      <div class="grid grid-cols-5 mt-4 text-premium-muted text-xs md:text-sm">
        <div class="relative pt-6 before:content-[''] before:absolute before:top-0 before:left-2 before:w-0.5 before:h-2 before:bg-premium-muted">
          <strong class="block text-premium-text font-medium mb-1">0%</strong>
          <span class="hidden sm:inline">Start</span>
        </div>
        <div class="relative pt-6 before:content-[''] before:absolute before:top-0 before:left-2 before:w-0.5 before:h-2 before:bg-premium-muted">
          <strong class="block text-premium-text font-medium mb-1">25%</strong>
          <span class="hidden sm:inline">Fundament</span>
        </div>
        <div class="relative pt-6 before:content-[''] before:absolute before:top-0 before:left-2 before:w-0.5 before:h-2 before:bg-premium-muted">
          <strong class="block text-premium-text font-medium mb-1">50%</strong>
          <span class="hidden sm:inline">Funktionalitet</span>
        </div>
        <div class="relative pt-6 before:content-[''] before:absolute before:top-0 before:left-2 before:w-0.5 before:h-2 before:bg-premium-muted">
          <strong class="block text-premium-text font-medium mb-1">75%</strong>
          <span class="hidden sm:inline">Polish</span>
        </div>
        <div class="relative pt-6 before:content-[''] before:absolute before:top-0 before:right-2 before:w-0.5 before:h-2 before:bg-premium-muted text-right">
          <strong class="block text-premium-text font-medium mb-1">100%</strong>
          <span class="hidden sm:inline">Launch 🎉</span>
        </div>
      </div>
    </div>

    <div class="items-center justify-center gap-4 md:gap-6 flex flex-col md:flex-row">
      <div class="text-center border-r border-premium-line px-2">
        <div class="text-2xl md:text-3xl font-black text-premium-green mb-1">{{ totalCommits.toLocaleString() }}</div>
        <div class="text-premium-muted text-xs md:text-sm uppercase font-bold tracking-wider">Commits</div>
      </div>
      <div class="text-center px-2">
        <div class="text-2xl md:text-3xl font-black mb-1">47</div>
        <div class="text-premium-muted text-xs md:text-sm uppercase font-bold tracking-wider">Dage tilbage</div>
      </div>
    </div>
  </div>
</template>
