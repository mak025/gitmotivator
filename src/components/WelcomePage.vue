<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = ref('')
const githubToken = ref('')
const apiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || 'http://localhost:5183/api'

onMounted(async () => {
  try {
    const response = await fetch(`${apiUrl}/auth/token`, {
      credentials: 'include'
    })
    if (response.ok) {
      const data = await response.json()
      token.value = data.token
      githubToken.value = data.githubToken

      // Redirect to dashboard after a short delay or immediately
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  } catch (e) {
    console.error('Error fetching tokens:', e)
  }
})
</script>

<template>
  <div class="welcome">
    <h1>logged in</h1>
    <div v-if="token" class="info">
      <p>Tokens logged to console for testing.</p>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.info {
  margin-top: 20px;
  color: #64748b;
  font-size: 0.9rem;
}
</style>
