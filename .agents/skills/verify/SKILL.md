---
name: verify
description: Build the site and open a local preview for visual check. Use after making changes to confirm nothing is broken.
---

Run these steps in order:

1. Run `npm run build` — if it fails, stop and show the errors.
2. Start `npm run preview` in the background (it serves from `dist/` on port 4173 by default).
3. Tell the user the preview is running and to open http://localhost:4173 in their browser.
4. Wait for the user to confirm the visual check looks good.
5. Kill the preview server when done.
