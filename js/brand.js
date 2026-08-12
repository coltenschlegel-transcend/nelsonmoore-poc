/**
 * Nelson Moore — centralized brand tokens (SE-131 fork point).
 * Flip colors, fonts, logo, imagery, Airgap, or Privacy Center here;
 * presentation pages and site.js consume these values.
 *
 * Newsletter form maps to Marketing / Newsletters preference purpose
 * when Preference Management is wired; submit is client-side stub for now.
 */
window.NM_BRAND = {
  name: "Nelson Moore",
  tagline: "EST. LONDON 1912",
  positioning: "Where Land Meets Loom",
  voice: "Heritage, Renewed",

  /* Transcend plumbing — Nelson Moore production.
     POC EDIT POINT: swap airgapSrc for your own bundle
     (https://transcend-cdn.com/cm/<BUNDLE-ID>/airgap.js), commit to main,
     and Pages redeploys in under a minute. See README. */
  airgapSrc:
  src="https://transcend-cdn.com/cm/afb7f6ea-772c-4c18-ac1f-4de68254ab75/airgap.js"
  airgapOverrides: "GoogleConsentMode FacebookLDU",
  privacyCenterUrl: "https://privacy.nelsonmoore.us/",
  privacyPolicyUrl: "https://privacy.nelsonmoore.us/policies",
  privacyChoicesUrl: "https://www.nelsonmoore.us/privacy-policy",

  colors: {
    ink: "#1A1A1A",
    white: "#FFFFFF",
    cream: "#F4EFE7",
    page: "#F7F5F1",
    muted: "#6B6B6B",
    border: "#E5E0D8",
  },

  fonts: {
    display: '"Playfair Display", Georgia, "Times New Roman", serif',
    /* Active: Libre Franklin. Alternate heritage option: Marcellus
       ui: '"Marcellus", Georgia, serif', uiWeight: "400" */
    ui: '"Libre Franklin", system-ui, sans-serif',
    uiWeight: "300",
  },

  logo: "assets/Left_Aligned_Stacked.webp",
  announcement: "FREE GIFT WITH EVERY PURCHASE / CODE: CELEBRATE",

  images: {
    hero: "assets/visualelectric-1755838492461.webp",
    heroSrcset:
      "assets/visualelectric-1755838492461-960.webp 960w, assets/visualelectric-1755838492461.webp 1280w",
    editorial: "assets/visualelectric-1755825347324.webp",
    aboutSplit: "assets/about-hero.webp",
    aboutSplitSrcset: "assets/about-hero-800.webp 800w, assets/about-hero.webp 1280w",
    aboutBand: "assets/about-band.webp",
    aboutBandSrcset: "assets/about-band-960.webp 960w, assets/about-band.webp 1920w",
    contactPortrait: "assets/contact-portrait.webp",
    contactPortraitSrcset:
      "assets/contact-portrait-700.webp 700w, assets/contact-portrait.webp 1200w",
    contactBand: "assets/contact-band.webp",
    contactBandSrcset:
      "assets/contact-band-960.webp 960w, assets/contact-band.webp 1920w",
    lookbook: [
      "assets/visualelectric-1755825227154.webp",
      "assets/visualelectric-1755825218488.webp",
      "assets/visualelectric-1755825351191.webp",
      "assets/visualelectric-1755838708398.webp",
      "assets/visualelectric-1755839276744.webp",
      "assets/visualelectric-1755840702933.webp",
    ],
  },

  products: [
    {
      name: "Messenger Bag",
      price: "$1,600.00",
      image: "assets/visualelectric-1755838873198.webp",
      href: "shop.html",
    },
    {
      name: "Harris Coat",
      price: "$4,008.00",
      image: "assets/visualelectric-1755838908973.webp",
      href: "shop.html",
    },
    {
      name: "Denim Chore Jacket",
      price: "$1,200.00",
      image: "assets/visualelectric-1755838791606.webp",
      href: "shop.html",
    },
    {
      name: "Aisling Wool Sweater",
      price: "$1,800.00",
      compareAt: "$2,400.00",
      image: "assets/visualelectric-1755838824735.webp",
      href: "shop.html",
    },
  ],

  nav: [
    { label: "Shop", href: "shop.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
    { label: "Loyalty", href: "rewards.html" },
  ],

  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],

  footerLinks: [
    { label: "FAQs", href: "#" },
    { label: "Stockists", href: "#" },
    { label: "Shipping & Returns", href: "#" },
  ],

  copy: {
    heroCta: "Shop Now",
    newIn: "New In",
    fallEyebrow: "Fall Collection",
    fallHeadline: "Heritage, Renewed",
    shopAll: "Shop All",
    lookbook: "Explore Our Lookbook",
    newsletterEyebrow: "Subscribe to our newsletter",
    newsletterHeadline: "Get The Latest",
    newsletterBody:
      "Sign up with your email to receive news about new collections, events and sales.",
    newsletterCta: "Sign Up",
    aboutHeadline: "About Us",
    aboutBody:
      "Born in 1912, our legacy is all about timeless elegance, expert craftsmanship, and a dedication to keeping traditional British style alive. We blend classic designs with a modern touch in our collection, creating pieces that can be passed down through the generations. From sharp suits to high-end accessories, Nelson Moore embodies British luxury fashion, making each item a cherished keepsake.",
    contactNote:
      "Follow our Instagram, or sign up for our newsletter to get updates on our new collections and sales.",
    rewardsHeadline: "Join our rewards program",
    rewardsBody: "Get exclusive early access, discounts, VIP invites, and more.",
    cartEmpty: "Your cart is empty.",
  },

  contact: {
    general: "General@NelsonMoore.com",
    press: "Press@NelsonMoore.com",
    sales: "Sales@NelsonMoore.com",
  },
};

/** Apply CSS custom properties from tokens (single flip propagates site-wide). */
(function applyBrandTokens() {
  var c = window.NM_BRAND.colors;
  var f = window.NM_BRAND.fonts;
  var root = document.documentElement;
  root.style.setProperty("--nm-ink", c.ink);
  root.style.setProperty("--nm-white", c.white);
  root.style.setProperty("--nm-cream", c.cream);
  root.style.setProperty("--nm-page", c.page);
  root.style.setProperty("--nm-muted", c.muted);
  root.style.setProperty("--nm-border", c.border);
  root.style.setProperty("--nm-font-display", f.display);
  root.style.setProperty("--nm-font-ui", f.ui);
  if (f.uiWeight) {
    root.style.setProperty("--nm-font-ui-weight", f.uiWeight);
  }
})();
