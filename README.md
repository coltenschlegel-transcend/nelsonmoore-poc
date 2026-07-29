# Nelson Moore — Partner Demo Site

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
