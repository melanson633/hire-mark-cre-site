# Google Maps Lead Scraping

> Local-agent playbook for bookmarks about scraping Google Maps or map-like local directories to extract business information, enrich leads, and generate outbound offers.

## Agent Usage

Use this topic when a Codex, Claude Code, or other local CLI agent is asked to find bookmarks or build workflows around:

- scraping Google Maps for local businesses
- replacing Apollo or list vendors with agentic prospecting
- extracting business names, websites, phones, reviews, categories, and location data
- turning reviews or local-business data into cold-email personalization
- building a local-business AI automation agency prospecting system

Start with semantic retrieval:

```powershell
python scripts\wiki_rag.py search "scrape Google Maps extract local business information reviews cold email leads city"
```

For outbound-specific work:

```powershell
python scripts\wiki_rag.py search "Google Maps scraping Apollo replacement local business cold email" --topic cold-email
```

For monetization or agency positioning:

```powershell
python scripts\wiki_rag.py search "sell AI automations local businesses Google Maps leads agency" --topic ai-side-business
```

## What This Cluster Is

The bookmarks point to a practical pattern: use a local agent or vibe-coded tool to query a business type plus city, extract matching businesses from Google Maps, enrich each row with public signals, and turn those signals into outreach.

The core value is not just the scrape. It is the loop:

1. Search a local niche.
2. Extract business records.
3. Pull public context such as reviews, website quality, category, location, and contact fields.
4. Detect a pain signal.
5. Write a specific outreach hook.
6. Package it as a cheap Apollo replacement or as an agency lead-gen engine.

## Canonical Source Bookmarks

Browser-reviewed enrichment: [google-maps-source-review.md](google-maps-source-review.md).

- [@om_patel5, Apr 4 2026](https://x.com/om_patel5/status/2040295631793635465) - strongest direct example. A vibe-coded tool finds businesses, reads reviews, writes cold emails from customer complaints, accepts business type plus city, and scrapes matching Google Maps businesses with 30+ data fields.
- [@ErickSky, Apr 18 2026](https://x.com/ErickSky/status/2045339825213940143) - explicit Spanish-language `Google Maps Scrapper` bookmark framed for freelancers and agencies closing deals, with rate-limit and repo language.
- [@levikmunneke, Apr 13 2026](https://x.com/levikmunneke/status/2043507299193606155) - Claude-agent framing: cancel an Apollo subscription because a Claude agent can scrape maps cheaply.
- [@NoahEpstein_, Apr 20 2026](https://x.com/NoahEpstein_/status/2046336170574159973) - adjacent local-business automation market map: dentists, landscapers, pool companies, PT clinics, funeral homes. Useful for niche selection, but not a direct scraping example.

## Agent Workflow Pattern

### 1. Define The Niche Query

Inputs:

- business category: `dentists`, `landscapers`, `pool companies`, `PT clinics`, `funeral homes`, `roofers`, `HVAC`, `law firms`, `gyms`
- geography: city, metro, state, or ZIP radius
- minimum quality bar: rating count, open status, website present or missing, review volume, category fit

Output a clear search plan before scraping:

```text
Query: "dentists in Worcester MA"
Goal: find clinics with review complaints about scheduling, response time, insurance confusion, or outdated websites.
Fields: name, category, address, phone, website, rating, review count, top complaint themes, maps URL.
```

### 2. Extract Business Rows

Target fields for a local-agent CSV or SQLite table:

- `business_name`
- `category`
- `city`
- `address`
- `phone`
- `website`
- `maps_url`
- `rating`
- `review_count`
- `recent_review_snippets`
- `complaint_themes`
- `lead_score`
- `outreach_angle`
- `source_query`
- `scraped_at`

Keep provenance fields. Agents need `maps_url`, `source_query`, and `scraped_at` to debug bad rows and avoid hallucinating source claims.

### 3. Enrich For Pain Signals

Good signal classes:

- repeated complaint in reviews
- slow response or missed calls
- weak website or no booking flow
- low review velocity
- high review count but unmanaged replies
- niche-specific operational pain, such as appointment scheduling for dentists or quote follow-up for landscapers

Bad signal classes:

- generic "you need AI" claims
- scraped contact data with no business-specific reason to reach out
- broad claims based only on category

### 4. Generate Outreach Rows

The agent should produce a row-level hook, not just a generic email:

```text
Because several recent reviews mention long booking delays, lead with a missed-appointment and scheduling automation offer.
```

Useful output columns:

- `first_line`
- `pain_observed`
- `offer`
- `proof_needed`
- `cta`
- `risk_notes`

### 5. Package The Offer

Best-fit offers from this cluster:

- review complaint analysis plus cold-email system
- Apollo replacement for local-business prospecting
- AI automation audit for one vertical
- appointment, quote, or review-response automation for a niche
- low-cost lead list plus personalized opener generation

## Local Agent Prompt

Use this as a seed prompt for Codex or Claude Code when building a local workflow:

```text
You are building a local-first Google Maps lead research workflow. Search this repo for source bookmarks about Google Maps scraping, Apollo replacement, local-business prospecting, reviews, and cold email. Then design a minimal script or table schema that takes a business category and city, extracts public business records, preserves source URLs, identifies review complaint themes, and outputs outreach-ready rows. Prefer CSV or SQLite. Keep the workflow transparent and auditable; do not invent contact fields or claims that are not present in the source data.
```

## Retrieval Queries

Good broad semantic queries:

- `Google Maps scraper freelancers agencies closing deals`
- `Claude agent scrape maps Apollo subscription replacement`
- `business type city scrapes matching business Google Maps data fields`
- `reviews customer complaints cold emails local businesses`
- `local business automation dentists landscapers pool companies PT clinics funeral homes`
- `AI agency lead generation Google Maps local businesses`
- `extract business information maps phone website reviews`

## Boundaries

Include:

- bookmarks explicitly about scraping Google Maps or maps data
- agentic lead extraction from public local-business sources
- review-to-email workflows tied to a city and business category
- Apollo replacement workflows based on local public data
- local-business niche selection when it supports Maps scraping or prospecting

Exclude:

- generic cold-email templates with no local-business data source
- generic AI automation agency posts with no prospecting or extraction angle
- generic web scraping infrastructure unless Maps, local business data, or outbound enrichment is the use case
- Google product news unrelated to Maps, Places, or local-business discovery

## Safety And Quality Notes

- Treat source terms like `scraper` and `scrape` as bookmark language, not legal guidance.
- Prefer official APIs or compliant data providers when moving from bookmark analysis to production.
- Respect rate limits, robots.txt where applicable, terms of service, and applicable privacy/spam rules.
- Keep raw data, source URLs, and generated claims separate so agents can audit what came from public data versus what was inferred.

## Cross-References

- [[Cold Email]] - outbound writing, follow-ups, and personalization workflows.
- [[AI Side Business]] - solo and agency monetization for local-business AI services.
- [[AI Business]] - broader market and business strategy around local-business automation.
- [[AI Workflows]] - automation pipeline design for extraction, enrichment, and output generation.
- [[AI Agents]] - Codex, Claude Code, and local tool-use patterns.
