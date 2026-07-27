# Deployment Guide (Vercel)

SyncSpace Lite is a static single-page app — there's no backend, no environment
variables, and no database to provision. Deploying it is just "build and serve."

## Option A: Deploy from a Git repository (recommended)

1. **Push the project to GitHub, GitLab, or Bitbucket.**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SyncSpace Lite"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import the project in Vercel.**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select **Add New → Project**.
   - Choose your repository.

3. **Confirm build settings.** Vercel auto-detects Vite; the included `vercel.json`
   pins these explicitly:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Framework Preset: `vite`

4. **No environment variables are needed.** Click **Deploy**.

5. Once the build finishes, Vercel gives you a live URL
   (e.g. `https://syncspace-lite.vercel.app`). Every subsequent push to `main`
   redeploys automatically.

## Option B: Deploy with the Vercel CLI

```bash
npm install -g vercel
cd syncspace-lite
vercel          # first deploy, follow the prompts
vercel --prod   # promote to production
```

## Client-side routing

Because this is a single-page app using React Router, all paths need to resolve to
`index.html` so the router can take over. This is already handled by the `rewrites`
rule in `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Without this, refreshing the page on a route like `/notes/abc-123` would 404.

## Verifying the deployment

After deploying, check:

- [ ] The landing page loads at the root URL.
- [ ] `/register` creates an account and redirects to `/dashboard`.
- [ ] Creating a note, whiteboard, and code file all persist after a page refresh.
- [ ] Refreshing while on a nested route (e.g. `/notes/<id>`) does not 404.
- [ ] Toggling dark mode and accent color in Settings applies immediately.

## Custom domains

Vercel supports attaching a custom domain from the project's **Settings → Domains**
tab — no changes to the app are required since it's fully static.
