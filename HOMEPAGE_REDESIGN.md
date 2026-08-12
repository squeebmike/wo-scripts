# The Mana Pocket homepage redesign

## Audit summary

The public site is a Webflow application. The homepage is composed from the existing `navbar6_component`, `page-content`, `woh-*`, publishing, community, and footer sections. Webflow owns routing, metadata, analytics, and the underlying page content.

The public shop is not a mock catalog. `wo-cart.js` fetches live inventory from `https://wo-checkout.swarnerauto.workers.dev/api/inventory`. That Worker returns the existing Supabase-backed inventory fields, including item IDs, category, condition, price, stock, images, and timestamps. Existing category routes use `/shop?cat=tcg`, `/shop?cat=sports-cards`, `/shop?cat=comics`, and `/shop?cat=supplies`.

Cart state remains in `wo_cart_v1` in local storage. Existing `window.WO.addToCart` behavior enforces the live stock count, opens the current cart drawer, and keeps the existing Worker/Stripe checkout endpoints. This redesign calls that function instead of introducing a second cart.

The public homepage does not expose a customer-account or Supabase Auth flow. The “My Team” control is the existing theme picker. Supabase Auth belongs to the separate internal vending/admin application and is not changed here.

The theme picker in `wo-ui.js` remains the only source of color. It maps a selected team, Pokémon, or MTG palette into contrast-checked semantic roles. The redesign adds the remaining semantic custom properties for hover, hero, footer, chip, shadow, and on-color states, then uses only those properties in `homepage-redesign.css`.

## What the redesign adds

- A large, configurable merchandising hero using real inventory imagery.
- Four editorial category destinations using the existing routes.
- “Fresh in the Pocket,” sorted from live `addedAt` inventory data.
- A large brand/editorial statement.
- “Pulled at the Pocket,” ready for future social/video content and currently supported by real inventory plus the existing Whatnot destination.
- “Shop the Case,” selected from actual premium/high-value inventory.
- “Happening at the Pocket,” linking to existing live-sale, shop, and updates destinations.
- “Get Pocketed,” linking to the existing fan-club route without inventing a newsletter backend.
- Responsive swipe rows, tap-sized actions, reduced-motion support, focus states, and a single homepage H1.

Existing nav, promo strip, original-art, publishing, community, footer, cart, checkout, analytics, and metadata remain in place. Redundant legacy homepage sections are hidden only by the additive homepage stylesheet; they are not deleted from Webflow.

## Optional content configuration

Webflow can define this before `wo-ui.js` without changing the layout code:

```html
<script>
window.MANA_HOMEPAGE_CONFIG = {
  heroTitle: 'Built for the chase.',
  heroCopy: 'Fresh cards, key books, strange finds, and the good stuff you never stopped looking for.',
  heroImage: '',
  heroImageAlt: '',
  primaryHref: '/shop',
  secondaryHref: '/publishing',
  nostalgiaHref: '/shop'
};
</script>
```

If `heroImage` is empty, the hero automatically uses current live inventory images.

## Deployment

`wo-ui.js` loads `homepage-redesign.js` from the same jsDelivr repository revision, and that script loads `homepage-redesign.css` from the same revision. After these files are committed, update the existing Webflow `wo-ui.js` script URL from its current pinned commit to the new commit hash. No new Webflow embed is required.

Keep the jsDelivr URL pinned to a commit. Do not switch production to `@main`.

## Verification completed

- JavaScript syntax checks for both scripts.
- No color literals in the new homepage JavaScript or stylesheet.
- Desktop test at 1440 × 900 with no document overflow.
- Mobile test at 390 × 844 with one-column categories, full-width CTAs, and horizontally swipeable product rows.
- Theme selection changed the complete semantic palette used by the redesign.
- Real category routes remained unchanged.
- Add-to-cart handed the real item ID, price, image, and available quantity to the existing cart function.
- One H1, complete image alt attributes, and named buttons/links.
