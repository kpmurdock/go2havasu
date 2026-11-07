# Go2Havasu secure checkout setup

The storefront has a server-side Stripe Checkout Session endpoint at `/api/checkout`. **Checkout is intentionally disabled until the store owner configures Stripe.** Card details are handled on Stripe's hosted checkout, not on Go2Havasu. Product prices are resolved server-side from Stripe Price IDs; the browser cannot choose amounts.

## Vercel project environment variables

Configure these in the **Go2Havasu Vercel project** for Preview and (when approved) Production:

- `STRIPE_SECRET_KEY` — your Stripe secret API key (use `sk_test_...` in Preview).
- `STRIPE_PRICE_CAP` — Stripe Price ID for Classic Havasu Cap.
- `STRIPE_PRICE_TEE` — Stripe Price ID for Sunset Logo Tee.
- `STRIPE_PRICE_MUG` — Stripe Price ID for Lake Morning Mug.
- `CHECKOUT_SITE_URL` — trusted absolute HTTPS origin of the site, without a trailing slash, e.g. the specific Vercel preview URL.

The displayed sample merchandise prices in the HTML are illustrative. Before accepting real payments, align the Stripe Price IDs, product descriptions, sales tax, shipping, returns policy and displayed prices. Set up Stripe tax and shipping collection as needed, and configure a verified Stripe webhook to fulfill orders only after confirmed payment. A success-page redirect alone is **not** proof of payment. Do not place secret keys in GitHub source or frontend files.

## Tourism pages

The navigation includes Things to Do, Boating, Hiking, Events, Dining, Places to Stay, Travel Stories, and Trip Planning. Event listings and booking availability are not live feeds. Replace placeholder content with verified local information and properly licensed photographs before production launch.

## Preview and production

Work is on branch `feature/destination-guides-business-plan`. Keep `go2havasu.com` on its existing production deployment until the preview is reviewed and approved. The approved screenshot is the desktop visual reference at 1672 × 941 pixels.
