<script setup lang="ts">
import LoginForm from './LoginForm.vue'
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="mb-12">
      <span class="text-6xl font-black text-premium-green drop-shadow-[0_0_20px_rgba(62,228,124,0.5)]">‹/›</span>
    </div>

    <section class="w-full max-w-[420px] bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-premium-border rounded-3xl p-10 shadow-2xl">
      <h1 class="text-3xl font-black text-center mb-4 tracking-tight">Dev Leaderboard</h1>
      <p class="text-center text-premium-muted mb-10 text-base leading-relaxed">
        Connect your GitHub to start tracking progress and compete with your team.
      </p>

      <LoginForm />
    </section>

    <div class="mt-8 text-premium-muted text-sm font-medium">
      Built for developers by developers.
    </div>
  </main>
</template>

<style scoped>
</style>

