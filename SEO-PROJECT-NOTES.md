# SEO / Set-Browser Overhaul — Project Notes

Started 2026-08-19. Goal: get MTG cards, Pokemon cards, comics, and every
for-sale item actually indexed by Google. User wants this driven end-to-end;
this file is the running log so any session (or person) can pick it up
without re-discovering the same things.

## CORRECTION (2026-08-19, same day) — the Products CMS collection is a dead end

Everything in the original version of this section below was wrong. The
user corrected it directly: **"there are no live products on site. it's all
the Javascript."** Verified by tracing the actual render path:

- The `/shop` page in Webflow Designer contains exactly one relevant
  element: `<div id="wo-live-shop">`, completely empty. Confirmed via
  `data_element_tool` — zero HTML embeds, zero CMS collection list bound to
  it, nothing static at all.
- That div is filled entirely at runtime by
  **`renderLiveInventory()` in `wo-checkout/worker.js` (~line 1591)**,
  which `fetch()`es `API_BASE + '/api/inventory'` (the ArSca backend,
  `still-resonance-4f87`) client-side and builds a `.wo-live-card` div
  *per item, in JS, with `innerHTML`* — every card, comic, TCG single,
  sports card, everything for sale. Clicking a card calls
  `openWoLiveItemDetail(item)` (~line 1559), which opens a JS modal —
  **not a navigation, not a URL**.
- There is no server route anywhere (ArSca, wo-checkout, or Webflow) that
  renders a single item's page. `wo-ui.js`'s `polishShopInventory()` can
  scroll to and click a card if the page is loaded with `?item=xxx` in the
  URL, but that's still the same generic `/shop` document as far as any
  crawler is concerned — no unique title, description, or content per item.
- **So: zero products on the entire site have an indexable URL. Not just
  MTG/Pokémon — everything.** This is the single root cause behind
  "SEO isn't working" for the whole catalog, not a set-browser-specific
  problem.
- The Webflow **Products CMS collection** (10 items, real buylist-intake
  data, real `/product/{slug}` template pages) that the previous version of
  this doc focused on **is not what's rendered on `/shop` at all** — it
  appears to be a disconnected/unused artifact, not the live storefront.
  The `Product` JSON-LD added to its template page earlier today is
  harmless but very likely inert — it's schema on pages nothing links to.
  **Do not treat that collection as the source of truth for what's live.**
  Worth a follow-up question to the user: what created those 10 CMS items,
  and is anything else pointing at `/product/{slug}` (nav, sitemap
  clicks-through, anything)? If truly orphaned, consider deleting later —
  not done yet, no destructive action taken.
- The `thumbnail: null` "bug" noted below is very likely a non-issue now
  that we know that collection isn't live-rendered — deprioritized, not
  investigated further.

## What the site actually looks like today (superseded by the correction above — kept for the audit trail)

- ~~**Products CMS collection** (Webflow, `product` slug) is real and growing —
  10 live items as of today, auto-created by the buylist/intake pipeline
  (field names like `card-sku`, `buy_session_...` in the description confirm
  this comes from the scanner/dashboard system, not manual entry). Each
  product already gets a real, indexable `/product/{slug}` page. This part
  of the architecture is already SEO-correct.~~ **Wrong — see correction above.**
  - **Bug found, not yet fixed**: new intake items have `thumbnail: null`
    even though `image-url` (a plain-text field pointing at a TCGPlayer CDN
    image) is populated. Whatever renders the product photo on the live page
    needs checking — if it's bound to the `thumbnail` Image field, these 10
    live listings currently have broken/missing photos. Needs a look at the
    Products Template page's element bindings, or wherever intake writes
    `image-url` should also be uploading to `thumbnail` as a real Webflow
    asset. **Deprioritized — see correction above, this collection likely
    isn't live-rendered at all.**
- **Card Sets** and **Checklist Items** CMS collections exist, have real
  template pages (`/card-sets/{slug}`, `/checklist-items/{slug}`), and the
  Card Sets collection already has "Pokemon" and "Magic: The Gathering" as
  Sport options — but **both collections have 0 items**. This looks like
  scaffolding from an earlier, abandoned attempt to do exactly what the user
  is now asking for (one page per card). It was never populated.
- **Comic Inventories** CMS collection: also 0 items, no template page found
  in the page list. Comics for sale currently only exist as the two static
  marketing pages (`/shatterkid`, `/bone-grice`), not as individual
  sellable-item pages.
- **The MTG/Pokemon "set browsers"** (`/mtg-new-releases`,
  `/pokemon-new-releases`, `/mtg-ai-deck-builder`) have no page-specific
  scripts or CMS template behind them in the Webflow API — meaning "every
  card" almost certainly renders inside one big client-side JS widget on a
  single URL, not as individual pages. That's the real reason none of those
  cards show up in Google today: there's no URL for Google to index per
  card, no matter how complete the widget's data is. **This is the core
  problem #2 (below) needs to fix.**
- **Digital Collection Album** (`/digital-collection-album`) is still
  running the *old* engine stack — `wo_ui 10.7.0`, `wo_engine 10.5.0`, plus
  separate per-sport `wo_nfl_v9`/`wo_mlb_v9`/etc scripts — instead of the
  current `wo-ui.js` loaded site-wide via jsDelivr. This is the literal "old
  artifacts from the old site" the user remembered. Needs migrating onto the
  current script stack (functionally, not just for SEO).
- **Structured data (JSON-LD): was zero, everywhere**, checked directly via
  Webflow's schema-markup API on shop/comics/card-set pages before any work
  started.

## Done so far

1. **Performance pass** (2026-08-19): removed ~180 lines of dead legacy CSS
   from the site-wide `<head>` (verified unused by grepping wo-checkout and
   wo-scripts for every class/variable name first — nothing referenced it).
   Made Swiper CSS and PageFlip CSS both non-render-blocking (media=print
   swap trick). Compressed the 5 largest unoptimized images
   (3.65MB "Doug Black and White Color Variant.jpg" among them) to avif via
   Webflow's asset compression API. Published live.
2. **JSON-LD, first pass** (2026-08-19): added `Product` schema (dynamic,
   bound to the Products CMS template so it applies to every current and
   future product automatically — name/description/image/sku/brand/price/
   availability/url via Webflow's `{{wf {"path":...} }}` field tokens) and
   basic `Organization` schema on the homepage. Published live. **Not yet
   spot-checked with Google's Rich Results Test** — this session's sandbox
   can't reach the live domain (network egress policy blocks it). Worth a
   manual check next time someone's at a keyboard with browser access:
   https://search.google.com/test/rich-results

## Not started yet — the big pieces

### Phase 2: give every item its own URL (the core SEO fix — sitewide, not just cards)
Confirmed (see correction above): **the entire live catalog** — sports
cards, TCG singles, comics, everything `/api/inventory` returns — renders
client-side into `#wo-live-shop` via `renderLiveInventory()` in
`wo-checkout/worker.js`, with zero per-item URLs. This is the one fix that
actually gets anything found by search, for the whole shop, not just
MTG/Pokémon.

Real inventory (the stuff actually for sale, fed by ArSca's `/api/inventory`
/ `/public/storefront`) is a different, separate problem from the MTG/Pokémon
**set browsers** (`/mtg-new-releases`, `/pokemon-new-releases` —
reference/catalog pages, not necessarily tied to what's in stock). Both need
real URLs, but they're likely different data sources and may want different
solutions:

  - **Live inventory (cards/comics actually for sale)**: the cleanest fix is
    a server-rendered item-detail route — e.g. wo-checkout or ArSca serves
    `/item/{id}` (or similar) with real `<title>`/meta/JSON-LD baked in
    server-side from the same inventory data `renderLiveInventory()` already
    fetches, then the JS shop grid's cards link to that real URL instead of
    (only) opening a JS modal. Modal can stay for the in-page UX; the card
    also needs a real `<a href>` for crawlers and for anyone who wants to
    share/bookmark a specific item. This does NOT require touching Webflow's
    CMS at all — it's a Worker route change in wo-checkout/ArSca.
  - **MTG/Pokémon set browsers**: separate question — is this reference data
    (every card in every set, whether or not in stock) or does it overlap
    with live inventory? If it's reference data, populating the existing
    (currently empty) Card Sets / Checklist Items Webflow CMS collections is
    the natural fit (they already have Pokemon/MTG as Sport options and
    ready-made template pages at `/card-sets/{slug}` and
    `/checklist-items/{slug}`). If it's actually the same live inventory,
    fold it into the item-detail-route fix above instead of building two
    separate systems.
  - Whichever way, each item needs: a unique URL, real
    title/description/image, and Product JSON-LD — generated server-side,
    not just client-side JS.

**Next step before building anything**: confirm with the user (a) whether
the MTG/Pokémon set browsers are reference catalogs or live inventory, and
(b) sign off on the `/item/{id}` server-rendered route approach for
`wo-checkout`/ArSca before it's built, since it touches the checkout
worker's routing.

**ANSWERED (2026-08-19)**: user confirmed the set browsers should show
**"all cards in each set with prices"** — a full reference catalog, not
filtered to in-stock inventory. This rules out populating it into Webflow's
CMS at full scope: Scryfall alone has 500,000+ individual printings across
MTG's ~30-year history; Pokémon TCG API has tens of thousands across
hundreds of sets. No Webflow CMS plan supports that many items in one
collection. The right architecture is the same pattern as the `/item/{id}`
inventory fix: **Worker-rendered pages, not Webflow CMS**, sourced directly
from Scryfall (free/public, no key needed, includes `prices.usd` /
`prices.usd_foil`) and the Pokémon TCG API (free, API key recommended for
rate limits, includes `tcgplayer.prices` directly) — both already give
price data inline, so this does NOT need the ArSca backend's separate
TCGPlayer `mpapi` resolver at all. Cache aggressively (KV/R2) since the
underlying set data changes rarely.

**Still open**: exact scope. "MTG New Releases" as a page name suggests
current/recent sets were the original intent, not the full 30-year archive
— but the user said "all cards in each set," which could mean either. This
changes the build from a few thousand pages (current Standard-legal sets)
to several hundred thousand (entire competitive history of both games).
Asked the user directly via AskUserQuestion before starting the build.

**ANSWERED (2026-08-19)**: user chose "everything ever printed" — full
historical catalog, both games.

### MAJOR DISCOVERY (2026-08-19): most of the MTG pipeline already exists

Before building anything from scratch, traced `MTG_CATALOG_R2`
(`wrangler.deploy.jsonc` binding → R2 bucket `arsca-offline-catalogs`) and
found real, working, already-proven infrastructure:

- **`scripts/mtg/build-mtg-offline-bundle.mjs`** (ArSca repo, 255 lines) —
  a complete, working local build script that calls Scryfall's own
  `bulk-data` API, downloads the full `default_cards` bulk export (every
  card, every printing, all ~30 years — this IS the "everything ever
  printed" dataset), and builds gzip'd jsonl bundles (cards, market prices,
  PriceCharting links). This already does exactly the bulk-import step the
  earlier version of this doc assumed would need to be built new.
- **The Worker already has R2-backed, versioned, gzip'd jsonl catalog
  storage proven at real scale**: the `topps` category (sports card
  checklists) already has **400,000+ live records** in this exact system
  (see the streaming-merge code around `cloudflare-worker-full.js:3477` —
  there's a code comment noting a naive full-materialize approach blew the
  Worker's memory limit at this record count, so it now streams). Read
  routes exist per category: `GET /{category}/manifest.json` and per-file
  reads, generic across `mtg`, `topps`, and (by the same pattern) could
  cover `pokemon` too.
- **What's missing for MTG**: no script pushes `build-mtg-offline-bundle.mjs`'s
  output to the Worker's R2 `mtg` category the way `import-topps-checklists.js`
  pushes Topps data (that push script exists and is the template to copy —
  simple authenticated `PUT` with the built bundle). And there are no
  *public, server-rendered HTML pages* reading this data yet — today it's
  only consumed by `mtg-offline-browser.js`, a **client-side IndexedDB
  cache** for the in-store `mtg-deck-lab.html` tool (staff-facing, not
  public/SEO-facing at all).
- **Pokémon has none of this** — no bulk-import script, no R2 category
  populated (only a single-card live-lookup route against
  `api.pokemontcg.io`, used by the buylist/pricing tool, confirmed at
  `cloudflare-worker-full.js:8878`). Needs an equivalent pipeline built from
  scratch, following the same pattern as the MTG one. `api.pokemontcg.io`
  doesn't offer one bulk dump file the way Scryfall does — needs a paginated
  sync (250 cards/page) instead, but that's a well-understood, doable job.

### Revised Phase 2 plan (MTG)
1. Write the push script (copy `import-topps-checklists.js`'s PUT pattern)
   to publish `build-mtg-offline-bundle.mjs`'s output to the Worker's `mtg`
   R2 category — reuses everything, no new pipeline needed.
2. Add new **public** Worker routes (`/mtg/{set-slug}` and
   `/mtg/{set-slug}/{card-slug}`, naming TBD) that stream-read the same R2
   jsonl.gz data server-side and render real HTML with per-card
   title/description/image/price and Product JSON-LD — this is genuinely
   new work, but it's "just" a read-and-render layer on top of data that
   will already be sitting in R2.
3. Sitemap: at this scale (Scryfall alone is 500k+ printings) a single
   sitemap.xml won't work (50k URL cap) — needs a sitemap index with
   multiple sub-sitemaps. Not yet built.

### Revised Phase 2 plan (Pokémon) — build from scratch, mirror the MTG pattern
1. Write a bulk-sync script against `api.pokemontcg.io` (paginated, 250/page,
   `POKEMONTCG_API_KEY` already exists in the Worker env) producing the same
   gzip'd jsonl bundle shape as the MTG builder.
2. Push script + `pokemon` R2 category, same as MTG.
3. Same new public rendering routes + sitemap index approach as MTG.

Nothing built yet for either game beyond this research — next actual coding
step is the MTG push script (#1 above), since it's the smallest, lowest-risk
piece that unlocks everything else.

### Phase 3: mobile + PC UI redesign of the set browsers
Should happen *after* Phase 2's URL structure exists — a nicer UI on the
same single-URL widget doesn't move SEO at all. Once each
card/set has a real page, redesign those templates for mobile/desktop.

### Phase 4: comics + FAQ
"Every comic book and FAQ" needs real content to exist first — ShatterKid/
Bone Grice currently only have single marketing pages, no per-issue pages
and no FAQ content found anywhere on the site. Needs the user to confirm
what FAQ content should say (not something to invent) before building
FAQPage schema against it. Comic Inventories CMS collection exists and
is the natural place for per-issue sellable pages, same pattern as Products.

### Phase 5: cleanup
Migrate Digital Collection Album off the old wo_ui 10.7.0/wo_engine 10.5.0
stack onto current wo-ui.js. Also: Webflow's registered-scripts list has
199 entries going back through 11+ versions of "WO UI" — not a runtime
problem (only applied scripts execute) but worth pruning for sanity someday.

## Open questions for the user
- Where does the live MTG/Pokemon card catalog data actually come from
  today (the data the set-browser widgets render)? Need this to decide
  Phase 2(a) vs 2(b).
- What should live in the comic FAQ content? Real product/shipping/con
  dition-grading FAQ, or something else?
- Confirm the `thumbnail: null` product-photo bug above — is `image-url`
  supposed to feed a real Webflow asset upload for `thumbnail`, or is the
  live product page actually rendering `image-url` directly (in which case
  this note is a false alarm)?
