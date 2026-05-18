<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDashboard } from '../composables/useDashboard'
import { Plus, Target, MessageSquare, CheckCircle2, ListTodo, X } from 'lucide-vue-next'

const { milestones, repositories, fetchRepositories, createMilestone, stats, loading, error } = useDashboard()

const showForm = ref(false)
const isSubmitting = ref(false)
const newMilestone = ref({
  message: '',
  commitThreshold: 10,
  repositoryId: null as number | null
})

onMounted(async () => {
  await fetchRepositories()
  if (stats.value?.repositoryId) {
    newMilestone.value.repositoryId = stats.value.repositoryId
  }
})

// Update selected repo when stats change
watch(() => stats.value?.repositoryId, (newId) => {
  if (newId) {
    newMilestone.value.repositoryId = newId
  }
})

async function handleSubmit() {
  if (!newMilestone.value.repositoryId || !newMilestone.value.message) return
  
  isSubmitting.value = true
  const success = await createMilestone({
    message: newMilestone.value.message,
    commitThreshold: newMilestone.value.commitThreshold,
    repositoryId: newMilestone.value.repositoryId
  })
  isSubmitting.value = false

  if (success) {
    newMilestone.value.message = ''
    showForm.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-premium-green/10 rounded-lg border border-premium-green/20">
          <ListTodo class="h-5 w-5 text-premium-green" />
        </div>
        <h2 class="text-2xl font-black tracking-tight uppercase">Custom Milestones</h2>
      </div>
      
      <button 
        @click="showForm = !showForm"
        class="flex items-center gap-2 px-4 py-2 bg-premium-green text-premium-bg rounded-full font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(62,228,124,0.3)]"
      >
        <Plus v-if="!showForm" class="h-4 w-4" />
        <X v-else class="h-4 w-4" />
        {{ showForm ? 'Annuller' : 'Opret Milestone' }}
      </button>
    </div>

    <!-- Create Form -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showForm" class="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-premium-border rounded-2xl p-6 shadow-2xl">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Repository Selection -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-premium-muted uppercase tracking-wider">Repository</label>
              <select 
                v-model="newMilestone.repositoryId"
                required
                class="w-full bg-premium-bg border border-premium-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-premium-green transition-colors appearance-none text-premium-text"
              >
                <option :value="null" disabled>Vælg repository</option>
                <option v-for="repo in repositories" :key="repo.id" :value="repo.id">
                  {{ repo.owner }}/{{ repo.name }}
                </option>
              </select>
            </div>

            <!-- Commit Threshold -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-premium-muted uppercase tracking-wider">Commit Grænse</label>
              <div class="relative">
                <Target class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-premium-muted" />
                <input 
                  v-model.number="newMilestone.commitThreshold"
                  type="number"
                  min="1"
                  required
                  class="w-full bg-premium-bg border border-premium-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-premium-green transition-colors text-premium-text"
                  placeholder="F.eks. 100"
                />
              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-premium-muted uppercase tracking-wider">Besked / Navn</label>
            <div class="relative">
              <MessageSquare class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-premium-muted" />
              <input 
                v-model="newMilestone.message"
                type="text"
                required
                class="w-full bg-premium-bg border border-premium-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-premium-green transition-colors text-premium-text"
                placeholder="F.eks. Pizza Party 🍕"
              />
            </div>
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting || !newMilestone.repositoryId || !newMilestone.message"
            class="w-full py-4 bg-gradient-to-r from-premium-green to-premium-green-dark text-premium-bg font-black rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-sm"
          >
            {{ isSubmitting ? 'Opretter...' : 'Bekræft Milestone' }}
          </button>
        </form>
      </div>
    </transition>

    <!-- Milestone List -->
    <div v-if="milestones.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="m in milestones" 
        :key="m.id"
        class="group bg-gradient-to-b from-white/[0.035] to-white/[0.015] border border-premium-border rounded-2xl p-5 shadow-xl hover:border-premium-green/30 transition-all duration-300"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div 
              class="p-2 rounded-lg"
              :class="m.isCompleted ? 'bg-premium-green/10 border border-premium-green/20' : 'bg-white/5 border border-white/10'"
            >
              <CheckCircle2 v-if="m.isCompleted" class="h-5 w-5 text-premium-green" />
              <Target v-else class="h-5 w-5 text-premium-muted" />
            </div>
            <div>
              <h3 class="font-bold text-lg leading-tight">{{ m.message }}</h3>
              <p class="text-xs text-premium-muted uppercase tracking-wider font-bold mt-1">
                Threshold: {{ m.commitThreshold }} commits
              </p>
            </div>
          </div>
          <div v-if="m.isCompleted" class="px-2 py-1 bg-premium-green/20 text-premium-green text-[10px] font-black uppercase rounded border border-premium-green/30">
            Completed
          </div>
        </div>

        <!-- Progress Bar for specific milestone -->
        <div class="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div 
            class="h-full bg-premium-green transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(62,228,124,0.4)]"
            :style="{ width: `${Math.min(100, (stats?.totalCommits || 0) / m.commitThreshold * 100)}%` }"
          ></div>
        </div>
        <div class="flex justify-between mt-2">
          <span class="text-[10px] text-premium-muted uppercase font-bold">{{ stats?.totalCommits || 0 }} / {{ m.commitThreshold }}</span>
          <span class="text-[10px] text-premium-muted uppercase font-bold">{{ Math.min(100, Math.round((stats?.totalCommits || 0) / m.commitThreshold * 100)) }}%</span>
        </div>
      </div>
    </div>
    
    <div v-else-if="!loading" class="text-center py-12 bg-white/[0.02] rounded-2xl border border-dashed border-premium-border">
      <Target class="h-8 w-8 text-premium-muted mx-auto mb-3 opacity-20" />
      <p class="text-premium-muted font-medium">Ingen custom milestones fundet for dette repo.</p>
    </div>
  </div>
</template>
