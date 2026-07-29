/**
 * Shared chrome: announcement, header, footer, consent, newsletter.
 * Depends on window.NM_BRAND from js/brand.js.
 */
(function () {
  var B = window.NM_BRAND;
  if (!B) return;

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function currentPage() {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!path || path === "") return "index.html";
    return path;
  }

  function navLinks() {
    var page = currentPage();
    return B.nav
      .map(function (item) {
        var active = item.href === page ? ' aria-current="page"' : "";
        return '<a href="' + item.href + '"' + active + ">" + item.label + "</a>";
      })
      .join("");
  }

  function renderAnnouncement() {
    var mount = document.getElementById("nm-announcement");
    if (!mount) return;
    var text = B.announcement;
    var repeats = Array(6)
      .fill('<span>' + text + "</span>")
      .join("");
    mount.outerHTML =
      '<div class="announcement" role="region" aria-label="Announcement">' +
      '<div class="announcement-track">' +
      repeats +
      repeats +
      "</div></div>";
  }

  function renderHeader() {
    var mount = document.getElementById("nm-header");
    if (!mount) return;
    mount.outerHTML =
      '<header class="site-header">' +
      '<div class="container nav">' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>' +
      '<nav id="primary-nav" class="nav-left" aria-label="Primary">' +
      navLinks() +
      "</nav>" +
      '<a class="nav-brand" href="index.html" aria-label="' +
      B.name +
      ' home">' +
      '<img src="' +
      B.logo +
      '" alt="' +
      B.name +
      '">' +
      '<span class="nav-tagline">' +
      B.tagline +
      "</span>" +
      "</a>" +
      '<div class="nav-right">' +
      '<a class="cart-link" href="cart.html">Cart (0)</a>' +
      "</div>" +
      "</div></header>";

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    var header = document.querySelector(".site-header");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (header) syncHomeHeaderSolid();
      });
    }
  }

  /** Homepage: transparent over hero at top; solid cream once scrolled (or menu open). */
  function syncHomeHeaderSolid() {
    if (!document.body.classList.contains("page-home")) return;
    var header = document.querySelector(".site-header");
    if (!header) return;
    var nav = document.getElementById("primary-nav");
    var menuOpen = nav && nav.classList.contains("is-open");
    var scrolled = window.scrollY > 24;
    header.classList.toggle("is-solid", scrolled || menuOpen);
  }

  function wireHomeHeaderBlend() {
    if (!document.body.classList.contains("page-home")) return;
    syncHomeHeaderSolid();
    window.addEventListener("scroll", syncHomeHeaderSolid, { passive: true });
    window.addEventListener("resize", syncHomeHeaderSolid);
  }

  function renderFooter() {
    var mount = document.getElementById("nm-footer");
    if (!mount) return;

    var shopLinks = B.nav
      .map(function (n) {
        return '<a href="' + n.href + '">' + n.label + "</a>";
      })
      .join("");

    var social = B.social
      .map(function (s) {
        return (
          '<a href="' +
          s.href +
          '" target="_blank" rel="noopener noreferrer">' +
          s.label +
          "</a>"
        );
      })
      .join("");

    var extras = B.footerLinks
      .map(function (l) {
        return '<a href="' + l.href + '">' + l.label + "</a>";
      })
      .join("");

    mount.outerHTML =
      '<footer class="site-footer">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      "<div><h4>" +
      B.name +
      "</h4><p>" +
      B.tagline +
      "</p><p>" +
      B.positioning +
      "</p></div>" +
      "<div><h4>Explore</h4>" +
      shopLinks +
      "</div>" +
      "<div><h4>Follow</h4>" +
      social +
      "</div>" +
      "<div><h4>Help</h4>" +
      extras +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<div>&copy; <span id=\"year\"></span> " +
      B.name +
      "</div>" +
      '<div class="footer-legal">' +
      '<a href="' +
      B.privacyCenterUrl +
      '" target="_blank" rel="noopener noreferrer">Privacy Center</a>' +
      '<a href="' +
      B.privacyPolicyUrl +
      '" target="_blank" rel="noopener noreferrer">Privacy Policy</a>' +
      '<a href="' +
      B.privacyChoicesUrl +
      '" target="_blank" rel="noopener noreferrer">Your Privacy Choices</a>' +
      '<a href="#" id="showConsentBanner">Cookie Preferences</a>' +
      "</div></div></div></footer>";

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var consent = document.getElementById("showConsentBanner");
    if (consent) {
      consent.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof transcend !== "undefined" && transcend.showConsentManager) {
          transcend.showConsentManager({ viewState: "AcceptOrRejectAll" });
        }
      });
    }
  }

  function wireNewsletter() {
    var forms = document.querySelectorAll("[data-nm-newsletter]");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = form.parentElement.querySelector("[data-nm-newsletter-status]");
        if (status) {
          // Stub only — map to Transcend Preference Management (Newsletters/Marketing) when wired.
          status.textContent = "Thanks — you're on the list.";
        }
        form.reset();
      });
    });
  }

  function fillHome() {
    if (!document.body.classList.contains("page-home")) return;

    var hero = document.querySelector("[data-nm-hero]");
    if (hero) {
      hero.style.backgroundImage = 'url("' + B.images.hero + '")';
      var title = hero.querySelector("[data-nm-hero-title]");
      if (title) {
        // Two words per line — nowrap spans so large type can't reflow to 1 word/line
        var words = String(B.positioning || "").trim().split(/\s+/);
        if (words.length >= 4) {
          title.innerHTML =
            '<span class="hero-line">' +
            words.slice(0, 2).join(" ") +
            "</span>" +
            '<span class="hero-line">' +
            words.slice(2).join(" ") +
            "</span>";
        } else {
          title.textContent = B.positioning;
        }
      }
      var cta = hero.querySelector("[data-nm-hero-cta]");
      if (cta) {
        cta.textContent = B.copy.heroCta;
        cta.href = "shop.html";
      }
    }

    var newInTitle = document.querySelector("[data-nm-newin-title]");
    if (newInTitle) newInTitle.textContent = B.copy.newIn;

    var grid = document.querySelector("[data-nm-products]");
    if (grid) {
      grid.innerHTML = B.products
        .map(function (p) {
          var price = p.compareAt
            ? "<span class=\"price\"><s>" +
              p.compareAt +
              "</s>" +
              p.price +
              "</span>"
            : '<span class="price">' + p.price + "</span>";
          return (
            '<a class="product-card" href="' +
            p.href +
            '">' +
            '<img src="' +
            p.image +
            '" alt="' +
            p.name +
            '" loading="lazy" decoding="async" width="800" height="800">' +
            "<h3>" +
            p.name +
            "</h3>" +
            price +
            "</a>"
          );
        })
        .join("");
    }

    var editorial = document.querySelector("[data-nm-editorial]");
    if (editorial) {
      var eye = editorial.querySelector("[data-nm-fall-eyebrow]");
      var head = editorial.querySelector("[data-nm-fall-headline]");
      var img = editorial.querySelector("[data-nm-editorial-img]");
      var shopAll = editorial.querySelector("[data-nm-shop-all]");
      var look = editorial.querySelector("[data-nm-lookbook-link]");
      if (eye) eye.textContent = B.copy.fallEyebrow;
      if (head) head.textContent = B.copy.fallHeadline;
      if (img) {
        img.src = B.images.editorial;
        img.alt = B.copy.fallHeadline;
        img.loading = "lazy";
        img.decoding = "async";
      }
      if (shopAll) {
        shopAll.textContent = B.copy.shopAll;
        shopAll.href = "shop.html";
      }
      if (look) look.textContent = B.copy.lookbook;
    }

    var lookTitle = document.querySelector("[data-nm-lookbook-title]");
    if (lookTitle) lookTitle.textContent = B.copy.lookbook;

    var lookGrid = document.querySelector("[data-nm-lookbook-grid]");
    if (lookGrid) {
      lookGrid.innerHTML = B.images.lookbook
        .map(function (src, i) {
          return (
            '<img src="' +
            src +
            '" alt="Nelson Moore lookbook ' +
            (i + 1) +
            '" loading="lazy" decoding="async">'
          );
        })
        .join("");
    }

    var newsEye = document.querySelector("[data-nm-news-eyebrow]");
    var newsHead = document.querySelector("[data-nm-news-headline]");
    var newsBody = document.querySelector("[data-nm-news-body]");
    var newsCta = document.querySelector("[data-nm-news-cta]");
    if (newsEye) newsEye.textContent = B.copy.newsletterEyebrow;
    if (newsHead) newsHead.textContent = B.copy.newsletterHeadline;
    if (newsBody) newsBody.textContent = B.copy.newsletterBody;
    if (newsCta) newsCta.textContent = B.copy.newsletterCta;
  }

  function fillShop() {
    var grid = document.querySelector("[data-nm-shop-grid]");
    if (!grid) return;
    grid.innerHTML = B.products
      .map(function (p) {
        var price = p.compareAt
          ? "<span class=\"price\"><s>" +
            p.compareAt +
            "</s>" +
            p.price +
            "</span>"
          : '<span class="price">' + p.price + "</span>";
        return (
          '<a class="product-card" href="#">' +
          '<img src="' +
          p.image +
          '" alt="' +
          p.name +
          '" loading="lazy" decoding="async" width="800" height="800">' +
          "<h3>" +
          p.name +
          "</h3>" +
          price +
          "</a>"
        );
      })
      .join("");
  }

  function fillAbout() {
    var h = document.querySelector("[data-nm-about-headline]");
    var b = document.querySelector("[data-nm-about-body]");
    if (h) h.textContent = B.copy.aboutHeadline;
    if (b) b.textContent = B.copy.aboutBody;
    var split = document.querySelector("[data-nm-about-split]");
    var band = document.querySelector("[data-nm-about-band]");
    if (split && B.images.aboutSplit) {
      split.src = B.images.aboutSplit;
      if (B.images.aboutSplitSrcset) {
        split.srcset = B.images.aboutSplitSrcset;
        split.sizes = "(max-width: 960px) 100vw, 50vw";
      }
      split.fetchPriority = "high";
    }
    if (band && B.images.aboutBand) {
      band.src = B.images.aboutBand;
      if (B.images.aboutBandSrcset) {
        band.srcset = B.images.aboutBandSrcset;
        band.sizes = "100vw";
      }
      band.loading = "lazy";
      band.decoding = "async";
    }
  }

  function fillContact() {
    var note = document.querySelector("[data-nm-contact-note]");
    if (note) note.textContent = B.copy.contactNote;
    var general = document.querySelector("[data-nm-contact-general]");
    var press = document.querySelector("[data-nm-contact-press]");
    var sales = document.querySelector("[data-nm-contact-sales]");
    if (general) {
      general.textContent = B.contact.general;
      general.href = "mailto:" + B.contact.general;
    }
    if (press) {
      press.textContent = B.contact.press;
      press.href = "mailto:" + B.contact.press;
    }
    if (sales) {
      sales.textContent = B.contact.sales;
      sales.href = "mailto:" + B.contact.sales;
    }
    var portrait = document.querySelector("[data-nm-contact-portrait]");
    var band = document.querySelector("[data-nm-contact-band]");
    if (portrait && B.images.contactPortrait) {
      portrait.src = B.images.contactPortrait;
      if (B.images.contactPortraitSrcset) {
        portrait.srcset = B.images.contactPortraitSrcset;
        portrait.sizes = "(max-width: 960px) 100vw, 50vw";
      }
      portrait.fetchPriority = "high";
    }
    if (band && B.images.contactBand) {
      band.src = B.images.contactBand;
      if (B.images.contactBandSrcset) {
        band.srcset = B.images.contactBandSrcset;
        band.sizes = "100vw";
      }
      band.loading = "lazy";
      band.decoding = "async";
    }
  }

  function fillRewards() {
    var h = document.querySelector("[data-nm-rewards-headline]");
    var b = document.querySelector("[data-nm-rewards-body]");
    if (h) h.textContent = B.copy.rewardsHeadline;
    if (b) b.textContent = B.copy.rewardsBody;
  }

  function fillCart() {
    var empty = document.querySelector("[data-nm-cart-empty]");
    if (empty) empty.textContent = B.copy.cartEmpty;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAnnouncement();
    renderHeader();
    renderFooter();
    wireNewsletter();
    fillHome();
    fillShop();
    fillAbout();
    fillContact();
    fillRewards();
    fillCart();
    wireHomeHeaderBlend();
  });
})();
