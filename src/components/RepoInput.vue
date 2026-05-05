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
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <h3 class="text-lg font-semibold text-slate-800 mb-4">Track Repository</h3>
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-black " />
        </div>
        <input
          v-model="repoUrl"
          type="text"
          placeholder="https://github.com/owner/repo"
          class="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          :disabled="loading"
        />
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        :disabled="loading || !repoUrl.trim()"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Track</span>
      </button>
    </form>
  </div>
</template>
