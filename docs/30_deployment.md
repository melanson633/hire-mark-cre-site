# Deployment

## Stack

- Vite build
- Vercel hosting
- Primary domain: `markbuilds.ai`
- Redirect domain: `www.markbuilds.ai` → apex

## Local Verification

```powershell
npm install
npm run verify
npm run build
```

## Deploy Notes

- Keep `.vercel/` out of git.
- Treat the repo root as the Vercel project root.
- Keep host-based redirect rules in `vercel.json` aligned with the active primary domain.
- Verify `markbuilds.ai` serves the site and `www.markbuilds.ai` 308-redirects to it after domain changes.

## Manual Checks

- homepage renders on desktop and mobile
- contact links work
- newsletter page clearly states signups are not live (no fake success state)
- domain redirect still sends `www.markbuilds.ai` to `markbuilds.ai`
