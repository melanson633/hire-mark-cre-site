# Deployment

## Stack

- Vite build
- Vercel hosting
- Primary domain: `hire-mark.net`
- Redirect domains: `www.hire-mark.net`, `hire-mark-cre.com`, `www.hire-mark-cre.com`

## Local Verification

```powershell
npm install
npm run build
```

## Deploy Notes

- Keep `.vercel/` out of git.
- Treat the repo root as the Vercel project root.
- Keep host-based redirect rules in `vercel.json` aligned with the active primary domain.
- Verify `hire-mark.net` serves the site and the other attached domains 308-redirect to it after domain changes.

## Manual Checks

- homepage renders on desktop and mobile
- contact links work
- newsletter placeholder still communicates that real email capture is not wired yet
