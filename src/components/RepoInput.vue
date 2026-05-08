<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'track', url: string): void
}>()

const repoUrl = ref('')

function handleSubmit() {
  if (repoUrl.value.trim()) {
    emit('track', repoUrl.value.trim())
  }
}
</script>

<template>
  <div class="bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl p-8 shadow-2xl">
    <h3 class="text-sm font-bold uppercase tracking-wider text-premium-muted mb-4">Track a new repository</h3>
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-premium-muted" />
        </div>
        <input
          v-model="repoUrl"
          type="text"
          placeholder="https://github.com/owner/repo"
          class="block w-full pl-12 pr-4 py-3 bg-premium-bg border border-premium-border rounded-xl text-base text-premium-text placeholder:text-premium-muted/50 focus:outline-none focus:ring-2 focus:ring-premium-green/20 focus:border-premium-green transition-all"
          :disabled="loading"
        />
      </div>
      <button
        type="submit"
        class="px-8 py-3 bg-premium-green hover:bg-premium-green-dark text-premium-bg text-base font-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(62,228,124,0.3)] active:scale-95"
        :disabled="loading || !repoUrl.trim()"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Track Repository</span>
      </button>
    </form>
  </div>
</template>
