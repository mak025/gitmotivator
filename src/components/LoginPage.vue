<script setup lang="ts">
import { computed } from 'vue'
import { getGitHubLoginUrl } from '../lib/auth'

const loginUrl = computed(() => getGitHubLoginUrl())

function handleLogin() {
  if (!loginUrl.value) {
    return
  }

  window.location.assign(loginUrl.value)
}
</script>

<template>
  <main class="login-page">
    <section class="card" aria-labelledby="login-title">
      <p class="eyebrow">GitHub App sign in</p>
      <h1 id="login-title">Log in with GitHub</h1>
      <p class="copy">
        Use your GitHub App backend to redirect users into GitHub OAuth, then send them back to
        this app once the backend has created a session.
      </p>

      <button
        type="button"
        class="login-button"
        :disabled="!loginUrl"
        @click="handleLogin"
      >
        Continue with GitHub
      </button>

      <p v-if="loginUrl" class="hint">
        This opens <code>{{ loginUrl }}</code>
      </p>
      <p v-else class="hint error">
        Set <code>VITE_API_URL</code> in your frontend env files so the login button knows where to
        send users.
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.card {
  width: min(100%, 520px);
  padding: 32px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(16px);
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #93c5fd;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.05;
  color: #f8fafc;
}

.copy {
  margin: 16px 0 28px;
  color: #cbd5e1;
  font-size: 1rem;
}

.login-button {
  width: 100%;
  border: 0;
  border-radius: 999px;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  background: linear-gradient(135deg, #ffffff 0%, #dbeafe 100%);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.25);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 16px 36px rgba(59, 130, 246, 0.35);
}

.login-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  box-shadow: none;
}

.hint {
  margin: 16px 0 0;
  color: #94a3b8;
  font-size: 0.92rem;
  word-break: break-word;
}

.hint code {
  padding: 0.18rem 0.42rem;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
}

.error {
  color: #fca5a5;
}
</style>

