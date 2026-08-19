# SEO / Set-Browser Overhaul — Project Notes

Started 2026-08-19. Goal: get MTG cards, Pokemon cards, comics, and every
for-sale item actually indexed by Google. User wants this driven end-to-end;
this file is the running log so any session (or person) can pick it up
without re-discovering the same things.

## What the site actually looks like today (audited 2026-08-19)

- **Products CMS collection** (Webflow, `product` slug) is real and growing —
  10 live items as of today, auto-created by the buylist/intake pipeline
  (field names like `card-sku`, `buy_session_...` in the description confirm
  this comes from the scanner/dashboard system, not manual entry). Each
  product already gets a real, indexable `/product/{slug}` page. This part
  of the architecture is already SEO-correct.
  - **Bug found, not yet fixed**: new intake items have `thumbnail: null`
    even though `image-url` (a plain-text field pointing at a TCGPlayer CDN
    image) is populated. Whatever renders the product photo on the live page
    needs checking — if it's bound to the `thumbnail` Image field, these 10
    live listings currently have broken/missing photos. Needs a look at the
    Products Template page's element bindings, or wherever intake writes
    `image-url` should also be uploading to `thumbnail` as a real Webflow
    asset. **Flagged to the user, not yet fixed.**
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

### Phase 2: give every card its own URL (the core SEO fix)
This is the one that actually gets "every MTG card, every Pokemon card"
found by search. Two real options, needs a decision before building:
  - **(a) Populate the existing Card Sets / Checklist Items collections**
    with the full catalog data the set-browser widgets already have, and
    build real CMS template pages for them (they already have the right
    schema/fields, they're just empty). Reuses existing Webflow structure.
  - **(b) Server-render the set browsers** some other way (e.g. a Worker
    route per card, similar to how wo-checkout/ArSca already serve
    dynamic pages) if the live card data changes too often/is too large for
    manual CMS population (TCG sets can be 200+ cards each; Pokemon has
    thousands of cards across hundreds of sets — CMS item creation via API
    is very doable in bulk, but worth confirming where the canonical card
    data source is first — Scryfall API for MTG, pokemontcg.io for Pokemon,
    or something already wired into ArSca/the dashboard).
  - Whichever way, each card/set needs: a unique URL, real
    title/description/image, and Product or CollectionPage JSON-LD.

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
