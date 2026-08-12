# Nelson Moore POC

**Live site:** https://coltenschlegel-transcend.github.io/nelsonmoore-poc/

SE-editable copy of the Nelson Moore demo site. Point it at whatever Airgap bundle your POC needs. The stable customer-facing demo lives at [nelsonmoore-demo](https://github.com/coltenschlegel-transcend/nelsonmoore-demo) — change that one only if you mean to.

## Swapping the Airgap bundle

One line, one file: [`js/brand.js`](js/brand.js).

1. Open [js/brand.js in the GitHub web editor](https://github.com/coltenschlegel-transcend/nelsonmoore-poc/edit/main/js/brand.js).
2. Replace `airgapSrc` with your bundle URL. Grab it from the Transcend admin dashboard under **Consent Management → Developer Settings**, or build it from your org's bundle ID:
   ```
   https://transcend-cdn.com/cm/<YOUR-BUNDLE-ID>/airgap.js
   ```
3. Adjust `airgapOverrides` if you need different integrations (space-separated, e.g. `GoogleConsentMode FacebookLDU`). Leave it as `""` for none.
4. Optionally update `privacyCenterUrl`, `privacyPolicyUrl`, and `privacyChoicesUrl` so the footer links match your org.
5. Commit to `main`. GitHub Pages rebuilds in roughly 30-60 seconds. Hard-refresh the live site to clear the old bundle.

The Airgap tag is injected synchronously in the `<head>` of every page, before any tracker loads, so consent gating behaves the way it does in a real deployment. Nothing else needs touching.

Reference: [Installing Airgap](https://docs.transcend.io/docs/articles/consent-management/configuration/installing-airgap), [Synchronous vs Asynchronous](https://docs.transcend.io/docs/articles/consent-management/configuration/installing-airgap/installing-airgap-js), and the [Load Options Glossary](https://docs.transcend.io/docs/articles/consent-management/reference/airgap/load-options) for what can go in `airgapOverrides`.

## Rest of the site

Reskin of [Gymfinity / gymdemo](https://github.com/looboozoo/gymdemo) into the **Nelson Moore** heritage apparel brand. Presentation is Nelson Moore; Transcend consent plumbing (Airgap, Privacy Center, gated trackers) is preserved. Brand tokens are centralized for partner forks (SE-131).

Scouted from https://www.nelsonmoore.us/ — visual/copy match; Squarespace commerce is stubbed.

## Run locally

```bash
cd partner-sandbox/nelson-moore
python3 -m http.server 8000
```

Open http://localhost:8000/

## Structure

| Path | Role |
|------|------|
| `js/brand.js` | **Single fork point** — colors, fonts, logo, imagery, copy, Airgap URL, Privacy Center URL |
| `css/brand.css` | Presentation styles (consumes CSS vars set by `brand.js`) |
| `js/site.js` | Shared header/footer/announcement, consent wire-up, page fills |
| `index.html` | Homepage (announcement, hero, New In, Fall Collection, lookbook, newsletter) |
| `shop.html` / `about.html` / `contact.html` / `rewards.html` / `cart.html` | Secondary pages |
| `trackers.js` | Always-on demo trackers (Airgap gates until consent) |
| `assets/` | Owned logo + imagery (WebP, resized for web; lazy-loaded below the fold) |

## Transcend plumbing

- **Airgap:** injected from `NM_BRAND.airgapSrc` (Nelson Moore production bundle `86e3d946-…`) with `GoogleConsentMode` + `FacebookLDU` overrides
- **Privacy Center:** footer link → `https://privacy.nelsonmoore.us/`
- **Cookie Preferences:** `transcend.showConsentManager({ viewState: 'AcceptOrRejectAll' })`
- **Trackers:** `trackers.js` loads on `DOMContentLoaded`; Airgap intercepts until consent
- **Newsletter:** client-side stub; comment-mapped to Marketing / Newsletters for Preference Management wiring

## Forking for another brand

1. Edit `js/brand.js` (colors, fonts, logo path, imagery, copy, Airgap + Privacy Center URLs).
2. Drop new assets into `assets/`.
3. Confirm: flipping one token (e.g. `--nm-cream` / `colors.cream`) propagates site-wide after reload.
