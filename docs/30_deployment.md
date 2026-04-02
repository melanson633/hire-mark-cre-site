# Deployment

## Stack

- Vite build
- Vercel hosting
- Custom domain: `hire-mark-cre.com`

## Local Verification

```powershell
npm install
npm run build
```

## Deploy Notes

- Keep `.vercel/` out of git.
- Treat the repo root as the Vercel project root.
- Verify both `hire-mark-cre.com` and `www.hire-mark-cre.com` after domain changes.

## Manual Checks

- homepage renders on desktop and mobile
- contact links work
- newsletter placeholder still communicates that real email capture is not wired yet
