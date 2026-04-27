# Q1 2026 New England Construction LinkedIn Document

Current-state folder for the April 24, 2026 LinkedIn post package.

## Current files

- `00_current/construction-q1-2026-slide-deck-v2.pdf` - current 11-page LinkedIn slide document.
- `00_current/construction-q1-2026-slide-deck-v2.html` - editable source for the slide document.
- `00_current/construction-q1-2026-slide-deck-v3.pdf` - construction-specific visual refresh candidate.
- `00_current/construction-q1-2026-slide-deck-v3.html` - editable source for the V3 visual refresh candidate.
- `00_current/construction-q1-2026-longread-v2-linkedin.pdf` - current long-read PDF export.
- `00_current/construction-q1-2026-longread-v2.html` - editable source for the long-read.
- `00_current/linkedin-post-approved.md` - approved caption and first-comment copy.

## Folder map

- `00_current/` - most recent publishable artifacts, based on last-updated timestamps.
- `01_source/` - build/source scripts and content specs for the current version.
- `02_notes/` - production notes, self-review, v2 changes, and earlier caption draft.
- `02_notes/visual-style-review-2026-04-24/` - visual baseline renders, V3 rendered checks, and construction style note.
- `09_archive/v1/` - earlier v1 document package and exported slide images.
- `09_archive/generated/` - generated cache files preserved only for reference.

## Regenerating

Run `python .\01_source\build_longread_pdf.py` from this folder to regenerate the long-read PDF into `00_current/`.
