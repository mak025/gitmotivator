# GitMotivator

Small Vue 3 + TypeScript frontend with a single “Login with GitHub” button.

The actual GitHub App OAuth flow must be handled by your backend. This frontend only redirects the user to that backend and expects the backend to create the session / callback flow for GitHub.

## Frontend env

Set the backend base URL in the Vue env files:

```dotenv
VITE_API_URL="http://localhost:5183/api"
```

If your backend uses a different login route than the default `auth/github/login`, add:

```dotenv
VITE_GITHUB_LOGIN_PATH="auth/github/login"
```

## Files changed

- `src/App.vue` renders the login page.
- `src/components/LoginPage.vue` contains the UI and login button.
- `src/lib/auth.ts` builds the backend login URL from env values.
- `src/style.css` contains the global page styling.

## GitHub App flow

1. User clicks **Continue with GitHub**.
2. Frontend redirects to your backend login endpoint.
3. Backend starts the GitHub App OAuth flow.
4. GitHub sends the user back to the backend callback.
5. Backend finishes the login and returns the user to the frontend.

## Run locally

```bash
npm install
npm run dev
```

If the backend is running on a different URL, update `VITE_API_URL` first.
