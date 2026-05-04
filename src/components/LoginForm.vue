<script setup lang="ts">
import { computed } from 'vue'
import { getGitHubLoginUrl } from '../lib/auth'

const loginUrl = computed(() => getGitHubLoginUrl())

async function handleLogin() {
  if (!loginUrl.value) {
    return
  }

  window.location.assign(loginUrl.value)
}
</script>

<template>
  <div class="login-form">
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
      Set <code>VITE_API_URL</code> in your frontend env files.
    </p>
  </div>
</template>

<style scoped>
.login-form {
  width: 100%;
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
