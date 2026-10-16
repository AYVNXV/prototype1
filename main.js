/* Bombay Fancy Cloth site interactions and editable business details. */
"use strict";

const SITE_CONFIG = {
  brand: "Bombay Fancy Cloth",
  // Add the shop's WhatsApp number before enabling order links.
  whatsappNumber: "",
  contactEmail: "",
  mapUrl: "https://maps.app.goo.gl/gPVbsNuXD9sg8tyKA",
  branches: [
    {
      id: "daska-shop",
      city: "Daska",
      name: "Bombay Fancy Cloth",
      address: "89M3+8Q6, Machli Bazaar, Altaf Garah, Daska 51010, Pakistan",
      mapUrl: "https://maps.app.goo.gl/gPVbsNuXD9sg8tyKA"
    }
  ]
};

const PRODUCTS = {
  "noor-lawn": { title: "Women's Cotton Lawn Suit", shortTitle: "Women's Cotton Lawn Suit", price: "Ask in store", sku: "Confirm with shop", category: "Women's unstitched · Cotton lawn", images: ["images/women/42601236-_12.webp", "images/women/42601237-_2.webp", "images/women/42503721-_6.webp"] },
  "gulnaar-chiffon": { title: "Women's Embroidered Suit", shortTitle: "Women's Embroidered Suit", price: "Ask in store", sku: "Confirm with shop", category: "Women's unstitched · Festive", images: ["images/women/42601237-_2.webp", "images/women/42503721-_6.webp", "images/women/il_300x300.8282790875_7tbo.webp"] },
  "shahkaar-wash-wear": { title: "Men's Cotton Wash & Wear Suit", shortTitle: "Men's Cotton Wash & Wear Suit", price: "Ask in store", sku: "Confirm with shop", category: "Men's unstitched · Wash & wear", images: ["images/men/Armani-18-18mtrdsc1407-angle-3.webp", "images/men/Arman-11-18mtrdsc1539-angle-1-1.webp", "images/men/BTE-006-Angle-1.webp"] },
  "mehr-silk": { title: "Women's Brocade Occasion Suit", shortTitle: "Women's Brocade Occasion Suit", price: "Ask in store", sku: "Confirm with shop", category: "Women's unstitched · Occasion", images: ["images/women/42503721-_6.webp", "images/women/il_300x300.8282790875_7tbo.webp", "images/women/42601236-_12.webp"] },
  "zarb-boski": { title: "Men's Fine Boski Suit", shortTitle: "Men's Fine Boski Suit", price: "Ask in store", sku: "Confirm with shop", category: "Men's unstitched · Formal", images: ["images/men/BTE-006-Angle-1.webp", "images/men/ZJNL-004-1C-Angle-.webp", "images/men/ZJNL-010-8C-Angle-1.jpg"] },
  "raabta-khaddar": { title: "Men's Khaddar Suit", shortTitle: "Men's Khaddar Suit", price: "Ask in store", sku: "Confirm with shop", category: "Men's unstitched · Khaddar", images: ["images/men/ZJNL-010-8C-Angle-1.jpg", "images/men/ZJNL-010-8C-Angle-2.webp", "images/men/Armani-18-18mtrdsc1407-angle-3.webp"] },
  "black-embroidered-suit": { title: "Women's Black Embroidered Suit", shortTitle: "Women's Black Embroidered Suit", price: "Ask in store", sku: "Confirm with shop", category: "Women's unstitched · Festive", images: ["images/women/il_300x300.8282790875_7tbo.webp"] },
  "mens-tan-fabric": { title: "Men's Tan Suit Fabric", shortTitle: "Men's Tan Suit Fabric", price: "Ask in store", sku: "Confirm with shop", category: "Men's unstitched · Fabric example", images: ["images/men/1774763833_FC-012_20_283_29.webp"] },
  "mens-navy-fabric": { title: "Men's Navy Suit Fabric", shortTitle: "Men's Navy Suit Fabric", price: "Ask in store", sku: "Confirm with shop", category: "Men's unstitched · Fabric example", images: ["images/men/1774765018_FC-008_20_281_29.webp"] }
};

const BRANDS = [
  { slug: "cambridge", name: "Cambridge (Mashriq)", folder: "Cambridge", gender: "men", description: "Refined menswear fabrics, selected from the Cambridge examples in your collection." },
  { slug: "edenrobe", name: "Edenrobe", description: "The Edenrobe collection is being prepared." },
  { slug: "gul-ahmed", name: "Gul Ahmed", folder: "GulAhmed", description: "Everyday cotton and wash-and-wear from Gul Ahmed." },
  { slug: "mtj", name: "MTJ", description: "The MTJ collection is being prepared." },
  { slug: "zainjee", name: "ZainJee", folder: "ZainJee", description: "Browse ZainJee fabrics by season and collection." },
  { slug: "zellbury", name: "Zellbury", folder: "ZellBury", description: "A first Zellbury fabric example from your image folder." },
  { slug: "diners", name: "Diners", description: "The Diners collection is being prepared." },
  { slug: "j", name: "J.", description: "The J. collection is being prepared." },
  { slug: "asim-jofa", name: "Asim Jofa", description: "The Asim Jofa collection is being prepared." },
  { slug: "lawrencepur", name: "Lawrencepur", description: "The Lawrencepur collection is being prepared." },
  { slug: "chase-value", name: "Chase Value", description: "The Chase Value collection is being prepared." }
];

const BRAND_PRODUCTS = [];

function toSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getBrandAssetGroups(brand) {
  const paths = window.BRAND_ASSETS?.[brand.folder] || [];
  const groups = new Map();
  paths.forEach((path) => {
    const file = path.split("/").pop().replace(/\.[^.]+$/, "");
    const parts = path.split("/");
    let collection = brand.folder;
    let title = file.replace(/[_-]+/g, " ");
    let idTitle = title;
    if (brand.folder === "ZainJee") {
      collection = parts[3] || parts[2] || brand.folder;
      title = `${collection} Collection`;
    } else if (brand.folder === "GulAhmed") {
      const match = file.match(/^(.+?)(?:-unstitched-fabric|_\d|$)/i);
      title = (match?.[1] || file).replace(/[_-]+/g, " ");
      collection = "Fabrics";
    } else if (brand.folder === "Cambridge") {
      const match = file.match(/^(Black|D-Brown|M-Brown)/i);
      idTitle = match ? match[1].replace("-", " ") : file;
      title = match
        ? ({ black: "Black", "d-brown": "Dark Brown", "m-brown": "Medium Brown" }[match[1].toLowerCase()])
        : `Fabric ${String(groups.size + 1).padStart(2, "0")}`;
      collection = "Fabrics";
    } else if (brand.folder === "ZellBury") {
      const match = file.match(/^(JADE-PC|MSKJS\d+)/i);
      title = match ? match[1].replace("-", " ") : file;
      collection = "Fabrics";
    }
    if (brand.folder !== "Cambridge") idTitle = title;
    const key = `${collection}:${title}`.toLowerCase();
    if (!groups.has(key)) groups.set(key, { title, collection, idTitle, images: [] });
    groups.get(key).images.push(path);
  });
  return [...groups.values()];
}

function getColorReference(path, index) {
  const file = path.split("/").pop().replace(/\.[^.]+$/, "");
  const code = file.match(/(?:^|[-_.])([0-9]{1,2}C)(?:[-_.]|$)/i)
    || file.match(/(?:^|[-_.])([0-9]{1,2})(?:[-_.]angle|[-_.]|$)/i);
  return code ? code[1].toUpperCase() : `Reference ${index + 1}`;
}

function registerBrandProducts() {
  BRANDS.forEach((brand) => {
    brand.products = getBrandAssetGroups(brand);
    brand.products.forEach((item, index) => {
      const id = `brand-${brand.slug}-${toSlug(item.idTitle)}-${index + 1}`;
      const product = {
        title: `${brand.name} ${item.title}`,
        shortTitle: `${brand.name} ${item.title}`,
        price: "Ask in store",
        sku: item.title,
        category: `${brand.name} · ${item.collection}`,
        images: item.images,
        brandSlug: brand.slug,
        brandName: brand.name,
        gender: brand.gender || "",
        collection: item.collection,
        colorVariants: brand.folder === "ZainJee"
          ? item.images.map((image, imageIndex) => ({ label: getColorReference(image, imageIndex), image }))
          : []
      };
      item.productId = id;
      Object.assign(item, product, { brand });
      BRAND_PRODUCTS.push(item);
      PRODUCTS[id] = product;
    });
  });
}

const WHATSAPP_NUMBER_NOTICE = "Please update the WhatsApp number in main.js before placing an order.";
const FAVORITES_STORAGE_KEY = "bombay-fancy-cloth-favorites";
const FAVORITES_CONSENT_KEY = "bombay-fancy-cloth-favorites-consent";

function showSiteNotice(message) {
  let notice = document.querySelector(".site-notice");
  if (!notice) {
    notice = document.createElement("p");
    notice.className = "site-notice";
    notice.setAttribute("role", "status");
    document.body.append(notice);
  }
  notice.textContent = message;
  notice.classList.add("is-visible");
  window.clearTimeout(notice.timeoutId);
  notice.timeoutId = window.setTimeout(() => notice.classList.remove("is-visible"), 3600);
}

function readFavoriteIds() {
  const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!stored) return [];
  const ids = JSON.parse(stored);
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string" || !Object.hasOwn(PRODUCTS, id))) {
    throw new Error("Saved favourites in browser storage are not valid.");
  }
  return [...new Set(ids)];
}

function updateFavoriteButtons(ids) {
  document.querySelectorAll("[data-favorite-id]").forEach((button) => {
    const saved = ids.includes(button.dataset.favoriteId);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", saved ? "Remove from favourites" : "Add to favourites");
    button.title = saved ? "Remove from favourites" : "Add to favourites";
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z"></path></svg>';
  });
  const link = document.querySelector(".favorites-link");
  if (link) {
    const count = link.querySelector(".favorites-count");
    if (count) {
      count.textContent = ids.length ? String(ids.length) : "";
      count.hidden = ids.length === 0;
    }
    link.setAttribute("aria-label", ids.length ? `My favourites, ${ids.length} saved` : "My favourites");
  }
  const favoritesCount = document.querySelector("[data-favorites-count]");
  if (favoritesCount) favoritesCount.textContent = `${String(ids.length).padStart(2, "0")} saved`;
}

function createFavoriteButton(productId) {
  const button = document.createElement("button");
  button.className = "wishlist-button";
  button.type = "button";
  button.dataset.favoriteId = productId;
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-label", "Add to favourites");
  button.title = "Add to favourites";
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z"></path></svg>';
  return button;
}

function renderFavorites(ids) {
  const grid = document.querySelector("[data-favorites-grid]");
  if (!grid) return;
  const empty = document.querySelector("[data-favorites-empty]");
  grid.replaceChildren();
  ids.forEach((id) => {
    const product = PRODUCTS[id];
    if (!product) return;
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = id;
    const imageLink = document.createElement("a");
    imageLink.className = "product-image";
    imageLink.href = `product-detail.html?product=${encodeURIComponent(id)}`;
    const image = document.createElement("img");
    image.src = product.images[0];
    image.alt = `Example image for ${product.title}`;
    image.loading = "lazy";
    const label = document.createElement("span");
    label.className = "product-label";
    label.textContent = product.category;
    imageLink.append(image, label);
    card.append(imageLink, createFavoriteButton(id));
    const info = document.createElement("div");
    info.className = "product-info";
    const details = document.createElement("div");
    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;
    const heading = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = imageLink.href;
    titleLink.textContent = product.title;
    heading.append(titleLink);
    details.append(category, heading);
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = product.price;
    info.append(details, price);
    card.append(info);
    grid.append(card);
  });
  if (empty) empty.hidden = ids.length > 0;
}

function setupFavorites() {
  const headerActions = document.querySelector(".header-actions");
  if (headerActions && !headerActions.querySelector(".favorites-link")) {
    const link = document.createElement("a");
    link.className = "favorites-link";
    link.href = "favorites.html";
    link.setAttribute("aria-label", "My favourites");
    link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z"></path></svg><span class="favorites-count" hidden></span>';
    const search = headerActions.querySelector(".search-trigger");
    headerActions.insertBefore(link, search ? search.nextSibling : headerActions.firstChild);
  }

  const dialog = document.createElement("dialog");
  dialog.className = "favorites-consent";
  dialog.setAttribute("aria-labelledby", "favorites-consent-title");
  dialog.innerHTML = '<div class="favorites-consent-mark" aria-hidden="true">B·F</div><p class="eyebrow">Your saved pieces</p><h2 id="favorites-consent-title">Keep your favourites close.</h2><p>Allow this browser to save your favourite suits on this device. No account is needed; saved items stay until browser data is cleared. This uses local browser storage, not cookies.</p><div class="favorites-consent-actions"><button class="button button-dark" type="button" data-favorites-allow>Allow favourites</button><button class="favorites-reject" type="button" data-favorites-reject>Not now</button></div>';
  document.body.append(dialog);

  let pendingProductId = "";
  const rejectConsent = () => {
    pendingProductId = "";
    dialog.close();
    showSiteNotice("You cancelled saving this favourite. You can keep browsing and choose a heart again whenever you want to save favourites.");
  };
  dialog.querySelector("[data-favorites-reject]").addEventListener("click", rejectConsent);
  dialog.addEventListener("cancel", () => {
    pendingProductId = "";
    showSiteNotice("You cancelled saving this favourite. You can keep browsing and choose a heart again whenever you want to save favourites.");
  });
  dialog.querySelector("[data-favorites-allow]").addEventListener("click", () => {
    try {
      localStorage.setItem(FAVORITES_CONSENT_KEY, "accepted");
      const productId = pendingProductId;
      pendingProductId = "";
      dialog.close();
      if (productId) toggleFavorite(productId);
      else showSiteNotice("Browser storage is enabled for your favourites on this device.");
    } catch (error) {
      pendingProductId = "";
      dialog.close();
      showSiteNotice(`Could not enable browser storage: ${error.message}`);
    }
  });

  function toggleFavorite(productId) {
    try {
      const ids = readFavoriteIds();
      const updated = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      updateFavoriteButtons(updated);
      renderFavorites(updated);
      showSiteNotice(updated.includes(productId) ? "Added to your favourites on this device." : "Removed from your favourites.");
    } catch (error) {
      showSiteNotice(`Could not save your favourites: ${error.message}`);
    }
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    const link = card.querySelector('a[href*="product-detail.html?product="]');
    const match = link?.href.match(/[?&]product=([^&]+)/);
    const productId = match ? decodeURIComponent(match[1]) : "";
    if (productId && Object.hasOwn(PRODUCTS, productId) && !card.querySelector("[data-favorite-id]")) {
      card.append(createFavoriteButton(productId));
    }
  });
  const detailTitle = document.querySelector("[data-product-title]");
  if (detailTitle) {
    const productId = new URLSearchParams(window.location.search).get("product") || "noor-lawn";
    if (Object.hasOwn(PRODUCTS, productId)) detailTitle.after(createFavoriteButton(productId));
  }

  document.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-favorite-id]") : null;
    if (!button) return;
    const productId = button.dataset.favoriteId;
    try {
      if (localStorage.getItem(FAVORITES_CONSENT_KEY) !== "accepted") {
        pendingProductId = productId;
        dialog.showModal();
        return;
      }
      toggleFavorite(productId);
    } catch (error) {
      showSiteNotice(`Could not access browser storage: ${error.message}`);
    }
  });

  let ids = [];
  try {
    if (localStorage.getItem(FAVORITES_CONSENT_KEY) === "accepted") ids = readFavoriteIds();
  } catch (error) {
    showSiteNotice(`Could not read your favourites: ${error.message}`);
  }
  updateFavoriteButtons(ids);
  renderFavorites(ids);
  window.addEventListener("storage", (event) => {
    if (event.key !== FAVORITES_STORAGE_KEY && event.key !== FAVORITES_CONSENT_KEY) return;
    try {
      const updated = localStorage.getItem(FAVORITES_CONSENT_KEY) === "accepted" ? readFavoriteIds() : [];
      updateFavoriteButtons(updated);
      renderFavorites(updated);
    } catch (error) {
      showSiteNotice(`Could not update your favourites: ${error.message}`);
    }
  });
}

function setText(selector, value, root = document) {
  root.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
}

function renderFooter() {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return;
  const branches = SITE_CONFIG.branches.map((branch) => `
    <div class="footer-branch">
      <strong>${branch.name} · ${branch.city}</strong>
      <p>${branch.address}</p>
      <a href="${branch.mapUrl}" target="_blank" rel="noopener noreferrer">Find us on Google Maps ↗</a>
    </div>`).join("");
  footer.innerHTML = `
    <div class="footer-inner">
            <div class="footer-brand">
        <a class="brand" href="index.html" aria-label="${SITE_CONFIG.brand} home"><span class="brand-main">BOMBAY</span><span class="brand-sub">Fancy Cloth House</span></a>
        <p>Unstitched suits for women and men. Beautiful cloth, chosen in Daska and made your way.</p>

        <div class="social-links" aria-label="Social media">
          <a class="social-link" href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a>
          <a class="social-link" href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">ig</a>
          <a class="social-link" href="${getWhatsAppUrl("Assalamu Alaikum! I would like to know more about Bombay Fancy Cloth.")}" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">wa</a>
          <a class="social-link" href="https://www.tiktok.com/" aria-label="TikTok" target="_blank" rel="noopener noreferrer">tk</a>
        </div>
      </div>
      <div><p class="footer-heading">Find your way</p><nav class="footer-links" aria-label="Footer navigation"><a href="index.html">Home</a><a href="brands.html">Shop by brand</a><a href="suits.html">Fabric collections</a><a href="gallery.html">Fabric gallery</a><a href="favorites.html">My favourites</a><a href="about.html">Our story</a><a href="contact.html">Visit us</a></nav></div>
      <div><p class="footer-heading">Here to help</p><nav class="footer-links" aria-label="Customer support"><a href="contact.html">Visit our Daska shop</a><a href="suits.html">Browse unstitched suits</a><a href="product-detail.html#size-guide">Fabric set details</a><a href="${SITE_CONFIG.mapUrl}" target="_blank" rel="noopener noreferrer">Get directions</a></nav>${SITE_CONFIG.contactEmail ? `<p class="footer-heading footer-heading-spaced">Write to us</p><div class="footer-links"><a href="mailto:${SITE_CONFIG.contactEmail}">${SITE_CONFIG.contactEmail}</a></div>` : ""}</div>
      <div><p class="footer-heading">Come say hello</p>${branches}</div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${SITE_CONFIG.brand}. Made with care.</span><span>Machli Bazaar · Daska, Pakistan</span></div>`;
  footer.querySelectorAll(".social-link[aria-label='WhatsApp']").forEach((link) => {
    if (!SITE_CONFIG.whatsappNumber || !/^\d{8,15}$/.test(SITE_CONFIG.whatsappNumber)) link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert(WHATSAPP_NUMBER_NOTICE);
    });
  });
}

function getWhatsAppUrl(message) {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };
  toggle.addEventListener("click", () => {
    const open = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 700) closeMenu(); });
}

function setupSearch() {
  const panel = document.querySelector(".search-panel");
  const trigger = document.querySelector(".search-trigger");
  if (!panel || !trigger) return;
  const input = panel.querySelector("input[type='search']");
  trigger.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) input.focus();
  });
  panel.querySelector(".search-close").addEventListener("click", () => { panel.hidden = true; });
  panel.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    window.location.href = `gallery.html?search=${encodeURIComponent(query)}`;
  });
}

function setupReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  elements.forEach((element) => element.classList.add("will-reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  elements.forEach((element) => observer.observe(element));
}

function setupHeroSlider() {
  const slides = [...document.querySelectorAll(".hero-image")];
  if (!slides.length) return;
  const slideCopy = [
    {
      eyebrow: "The Daska fabric house",
      heading: "Find your<br>fabric.<br><em>Make it yours.</em>",
      copy: "Unstitched suits for women and men, chosen for the colour, the craft and everything you will make them your own.",
      caption: "Beautiful fabric, chosen by you"
    },
    { eyebrow: "A little colour, a lot of you", heading: "Find your<br>fabric. <em>Find your feeling.</em>", copy: "Discover colourful unstitched suits, chosen for the details you will make your own.", caption: "Fresh colours for your next favourite" },
    { eyebrow: "Made for your special moments", heading: "Beautiful cloth.<br><em>Made your way.</em>", copy: "Explore occasion-ready embroidery and find a fabric that feels just right.", caption: "A special look, made your way" },
    { eyebrow: "Your style starts with the fabric", heading: "Choose the cloth.<br><em>Make it yours.</em>", copy: "Find a favourite colour, then let your own tailor bring your idea to life.", caption: "Picked with care in Daska" }
  ];
  let current = 0;
  const heroCopyContent = document.querySelector(".hero-copy-content");
  let copyChangeTimeout = 0;
  const updateSlideCopy = (copy) => {
    const eyebrow = document.querySelector("[data-hero-eyebrow]");
    const heading = document.querySelector("[data-hero-heading]");
    const description = document.querySelector("[data-hero-copy]");
    const caption = document.querySelector("[data-hero-caption]");
    if (eyebrow) eyebrow.textContent = copy.eyebrow;
    if (heading) heading.innerHTML = copy.heading;
    if (description) description.textContent = copy.copy;
    if (caption) caption.textContent = copy.caption;
  };
  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === current));
    const copy = slideCopy[current];
    if (copy) {
      window.clearTimeout(copyChangeTimeout);
      if (heroCopyContent && heroCopyContent.dataset.slideInitialized) {
        heroCopyContent.classList.add("is-changing");
        copyChangeTimeout = window.setTimeout(() => {
          updateSlideCopy(copy);
          window.requestAnimationFrame(() => heroCopyContent.classList.remove("is-changing"));
        }, 450);
      } else {
        updateSlideCopy(copy);
        if (heroCopyContent) heroCopyContent.dataset.slideInitialized = "true";
      }
    }
    const number = document.querySelector(".hero-bottom > span:first-child");
    if (number) number.textContent = `${String(current + 1).padStart(2, "0")} — ${String(slides.length).padStart(2, "0")}`;
  };
  const hero = document.querySelector(".hero");
  let intervalId = 0;
  const stopRotation = () => {
    window.clearInterval(intervalId);
    intervalId = 0;
  };
  const startRotation = () => {
    stopRotation();
    intervalId = window.setInterval(() => showSlide(current + 1), 3500);
  };
  document.querySelector(".hero-next")?.addEventListener("click", () => { showSlide(current + 1); startRotation(); });
  document.querySelector(".hero-prev")?.addEventListener("click", () => { showSlide(current - 1); startRotation(); });
  document.addEventListener("visibilitychange", startRotation);
  showSlide(0);
  startRotation();
}

function setupProductFilters() {
  document.querySelectorAll("[data-feature-filters], .gallery-filters").forEach((group) => {
    const cards = [...document.querySelectorAll(".product-card[data-category]")];
    const buttons = [...group.querySelectorAll("[data-filter]")];
    const hideTimers = new WeakMap();
    if (!cards.length || !buttons.length) return;
    const applyFilter = (filter) => {
      buttons.forEach((button) => button.classList.toggle("active", button.dataset.filter === filter));
      cards.forEach((card) => {
        window.clearTimeout(hideTimers.get(card));
        const visible = filter === "All" || card.dataset.category.split(/\s+/).includes(filter);
        if (visible) {
          card.hidden = false;
          card.classList.remove("is-hiding");
        } else {
          card.classList.add("is-hiding");
          hideTimers.set(card, window.setTimeout(() => {
            card.hidden = true;
            card.classList.remove("is-hiding");
          }, 350));
        }
      });
      const count = document.querySelector("[data-product-count]");
      if (count) {
        const total = cards.filter((card) => filter === "All" || card.dataset.category.split(/\s+/).includes(filter)).length;
        const label = group.dataset.countLabel || "fabric";
        count.textContent = `${String(total).padStart(2, "0")} ${label}${total === 1 ? "" : "s"}`;
      }
      const empty = document.querySelector(".empty-state");
      if (empty) empty.hidden = cards.some((card) => filter === "All" || card.dataset.category.split(/\s+/).includes(filter));
    };
    buttons.forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.filter)));
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const audience = params.get("audience");
    if (audience && group.classList.contains("gallery-filters")) {
      const filter = audience[0].toUpperCase() + audience.slice(1).toLowerCase();
      if (buttons.some((button) => button.dataset.filter === filter)) applyFilter(filter);
    } else if (search && group.classList.contains("gallery-filters")) {
      let visible = 0;
      cards.forEach((card) => {
        const matches = card.textContent.toLowerCase().includes(search) || (card.querySelector("img")?.alt.toLowerCase().includes(search) ?? false);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      const label = group.dataset.countLabel || "fabric";
      setText("[data-product-count]", `${String(visible).padStart(2, "0")} ${label}${visible === 1 ? "" : "s"}`);
      const empty = document.querySelector(".empty-state");
      if (empty) empty.hidden = visible > 0;
    }
  });
}

function setupBrandDirectory() {
  const grid = document.querySelector("[data-brand-grid]");
  if (!grid) return;
  const cards = BRANDS.map((brand) => {
    const card = document.createElement("a");
    card.className = `brand-card${brand.products.length ? "" : " is-coming-soon"}`;
    card.href = `brand.html?brand=${encodeURIComponent(brand.slug)}`;
    card.setAttribute("aria-label", `${brand.name}: ${brand.products.length ? "browse collection" : "collection coming soon"}`);
    const imagePath = brand.products[0]?.images[0];
    if (imagePath) {
      const image = document.createElement("img");
      image.src = imagePath;
      image.alt = `${brand.name} fabric example`;
      image.loading = "lazy";
      card.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "brand-card-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = brand.name.split(/\s+/).map((word) => word[0]).join("").slice(0, 2);
      card.append(placeholder);
    }
    const copy = document.createElement("span");
    copy.className = "brand-card-copy";
    const name = document.createElement("strong");
    name.textContent = brand.name;
    const status = document.createElement("span");
    status.textContent = brand.products.length
      ? `${String(brand.products.length).padStart(2, "0")} styles · Explore`
      : "Photos coming soon";
    copy.append(name, status);
    card.append(copy);
    return card;
  });
  grid.replaceChildren(...cards);
}

function setupBrandPage() {
  const grid = document.querySelector("[data-brand-products]");
  if (!grid) return;
  const brand = BRANDS.find((item) => item.slug === new URLSearchParams(window.location.search).get("brand"));
  const heading = document.querySelector("[data-brand-title]");
  const description = document.querySelector("[data-brand-description]");
  const count = document.querySelector("[data-brand-count]");
  const filters = document.querySelector("[data-brand-filters]");
  const empty = document.querySelector("[data-brand-empty]");
  const heroImage = document.querySelector("[data-brand-hero-image]");
  if (!brand) {
    if (heading) heading.textContent = "Collection not found";
    if (description) description.textContent = "Choose a label from the brand directory to browse its collection.";
    grid.hidden = true;
    return;
  }
  document.title = `${brand.name} Fabrics — Bombay Fancy Cloth`;
  if (heading) heading.textContent = brand.name;
  if (description) description.textContent = brand.description;
  if (count) count.textContent = `${String(brand.products.length).padStart(2, "0")} styles`;
  const heroImages = [...new Set(brand.products.map((product) => product.images[0]).filter(Boolean))].slice(0, 8);
  if (heroImage && heroImages.length) {
    heroImage.src = heroImages[0];
    heroImage.alt = `${brand.name} fabric collection`;
    if (heroImages.length > 1) {
      let index = 0;
      let opacityTimer = 0;
      window.setInterval(() => {
        window.clearTimeout(opacityTimer);
        heroImage.classList.add("is-fading");
        opacityTimer = window.setTimeout(() => {
          index = (index + 1) % heroImages.length;
          heroImage.src = heroImages[index];
          window.requestAnimationFrame(() => heroImage.classList.remove("is-fading"));
        }, 500);
      }, 3500);
    }
  } else if (heroImage) {
    heroImage.hidden = true;
  }
  if (!brand.products.length) {
    grid.hidden = true;
    if (empty) {
      empty.hidden = false;
      empty.textContent = `We are preparing the ${brand.name} collection. Add its product photos to the images folder and the catalogue can be filled in.`;
    }
    if (filters) filters.hidden = true;
    return;
  }
  const collections = [...new Set(brand.products.map((product) => product.collection))];
  if (filters) {
    const options = ["All collections", ...collections];
    filters.replaceChildren(...options.map((collection, index) => {
      const button = document.createElement("button");
      button.className = `filter-chip${index === 0 ? " active" : ""}`;
      button.type = "button";
      button.dataset.brandFilter = collection;
      button.textContent = index === 0 ? "All styles" : collection;
      return button;
    }));
    filters.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-brand-filter]") : null;
      if (!button) return;
      filters.querySelectorAll("[data-brand-filter]").forEach((item) => item.classList.toggle("active", item === button));
      const selected = button.dataset.brandFilter;
      grid.querySelectorAll(".brand-product-card").forEach((card) => {
        card.hidden = selected !== "All collections" && card.dataset.collection !== selected;
      });
      if (count) {
        const visible = brand.products.filter((item) => selected === "All collections" || item.collection === selected).length;
        count.textContent = `${String(visible).padStart(2, "0")} styles`;
      }
    });
  }
  const cards = brand.products.map((product) => {
    const card = document.createElement("article");
    card.className = "product-card brand-product-card";
    card.dataset.collection = product.collection;
    card.dataset.productId = product.productId;
    const link = document.createElement("a");
    link.className = "product-image";
    link.href = `product-detail.html?product=${encodeURIComponent(product.productId)}`;
    const image = document.createElement("img");
    image.src = product.images[0];
    image.alt = `${product.brandName} ${product.title} fabric example`;
    image.loading = "lazy";
    const label = document.createElement("span");
    label.className = "product-label";
    label.textContent = product.collection;
    const quick = document.createElement("span");
    quick.className = "image-quick";
    quick.textContent = "Explore this fabric";
    link.append(image, label, quick);
    const info = document.createElement("div");
    info.className = "product-info";
    const text = document.createElement("div");
    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.brandName;
    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = link.href;
    titleLink.textContent = product.title;
    title.append(titleLink);
    text.append(category, title);
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "Ask in store";
    info.append(text, price);
    card.append(link, info);
    return card;
  });
  grid.replaceChildren(...cards);
  if (empty) empty.hidden = true;
}

function setupGalleryThumbnails() {
  const mainImage = document.querySelector("[data-main-product-image]");
  const thumbnails = document.querySelectorAll("[data-product-image]");
  if (!mainImage || !thumbnails.length) return;
  thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener("click", () => {
    mainImage.src = thumbnail.dataset.productImage;
    thumbnails.forEach((item) => item.classList.toggle("active", item === thumbnail));
    const variant = [...document.querySelectorAll("[data-color-image]")].find((item) => item.dataset.colorImage === thumbnail.dataset.productImage);
    if (variant && !variant.classList.contains("active")) variant.click();
    const note = document.querySelector(".product-image-note");
    if (note) note.textContent = `${String(index + 1).padStart(2, "0")} / ${String(thumbnails.length).padStart(2, "0")}`;
  }));
}

function setupProductDetail() {
  const detail = document.querySelector(".product-detail-section");
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const product = PRODUCTS[params.get("product")] || PRODUCTS["noor-lawn"];
  const productImages = product.images;
  document.title = `${product.shortTitle} — ${SITE_CONFIG.brand}`;
  setText("[data-product-title]", product.title);
  setText("[data-breadcrumb-title]", product.shortTitle);
  setText("[data-product-price]", product.price);
  setText("[data-product-sku]", product.sku);
  setText("[data-product-category]", product.category);
  const mainImage = document.querySelector("[data-main-product-image]");
  if (mainImage) {
    mainImage.src = productImages[0];
    mainImage.alt = `Example image for ${product.title}. Confirm the current fabric with the shop.`;
  }
  const thumbnailList = document.querySelector(".thumbnail-list");
  if (thumbnailList && productImages.length > thumbnailList.children.length) {
    thumbnailList.replaceChildren(...productImages.map((imagePath, index) => {
      const button = document.createElement("button");
      button.className = `thumbnail${index === 0 ? " active" : ""}`;
      button.type = "button";
      button.setAttribute("aria-label", `View product image ${index + 1}`);
      button.dataset.productImage = imagePath;
      const image = document.createElement("img");
      image.src = imagePath;
      image.alt = "";
      button.append(image);
      return button;
    }));
  }
  const thumbnails = document.querySelectorAll("[data-product-image]");
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.hidden = !productImages[index];
    if (!productImages[index]) return;
    thumbnail.dataset.productImage = productImages[index];
    const thumbImage = thumbnail.querySelector("img");
    if (thumbImage) thumbImage.src = productImages[index];
    thumbnail.classList.toggle("active", index === 0);
  });
  if (thumbnailList) thumbnailList.hidden = productImages.length === 1;
  const imageNote = document.querySelector(".product-image-note");
  if (imageNote) imageNote.textContent = `01 / ${String(productImages.length).padStart(2, "0")}`;
  if (product.brandSlug) {
    const swatches = document.querySelector(".swatch-list");
    if (swatches) {
      if (product.colorVariants.length > 1) {
        swatches.replaceChildren(...product.colorVariants.map((variant, index) => {
          const button = document.createElement("button");
          button.className = `color-swatch color-variant${index === 0 ? " active" : ""}`;
          button.type = "button";
          button.dataset.color = variant.label;
          button.dataset.colorImage = variant.image;
          button.setAttribute("aria-label", `Select colour or design reference ${variant.label}`);
          button.setAttribute("aria-pressed", String(index === 0));
          button.style.backgroundImage = `url("${encodeURI(variant.image)}")`;
          return button;
        }));
        setText(".selected-color-name", product.colorVariants[0].label);
      } else {
        const note = document.createElement("span");
        note.className = "color-availability-note";
        note.textContent = "Ask the shop which colours are currently available.";
        swatches.replaceChildren(note);
        setText(".selected-color-name", "Confirm with shop");
      }
    }
  }
  const state = {
    color: document.querySelector(".color-swatch.active")?.dataset.color
      || product.colorVariants[0]?.label
      || (product.brandSlug ? "Confirm with shop" : "Natural"),
    size: ""
  };
  if (product.gender === "men" || /^Men's\b/.test(product.category)) {
    const sizeGroup = document.querySelector(".size-group");
    const sizeList = sizeGroup?.querySelector(".size-list");
    if (sizeGroup && sizeList) {
      const legend = sizeGroup.querySelector("legend");
      if (legend?.firstChild) legend.firstChild.textContent = "Choose men's fabric ";
      const option = document.createElement("button");
      option.className = "size-button";
      option.type = "button";
      option.dataset.size = "Men's unstitched fabric";
      option.textContent = "Men's fabric";
      sizeList.replaceChildren(option);
    }
  }
  const feedback = document.querySelector(".selection-feedback");
  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.removeAttribute("title");
    swatch.addEventListener("click", () => {
      state.color = swatch.dataset.color;
      document.querySelectorAll(".color-swatch").forEach((item) => {
        const active = item === swatch;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      if (swatch.dataset.colorImage && mainImage) {
        mainImage.src = swatch.dataset.colorImage;
        document.querySelectorAll("[data-product-image]").forEach((thumbnail, index) => {
          const active = thumbnail.dataset.productImage === swatch.dataset.colorImage;
          thumbnail.classList.toggle("active", active);
          if (active) setText(".product-image-note", `${String(index + 1).padStart(2, "0")} / ${String(productImages.length).padStart(2, "0")}`);
        });
      }
      setText(".selected-color-name", state.color);
    });
  });
  document.querySelectorAll(".size-button").forEach((button) => button.addEventListener("click", () => {
    state.size = button.dataset.size;
    document.querySelectorAll(".size-button").forEach((item) => item.classList.toggle("active", item === button));
    setText(".selected-size-name", state.size);
    if (feedback) feedback.textContent = "";
  }));
  const buy = () => {
    if (!state.size) {
      if (feedback) feedback.textContent = "Choose a fabric set first, and we will be ready to help.";
      document.querySelector(".size-group")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const message = `Assalamu Alaikum! I would like to enquire about this unstitched suit:\n- Fabric: ${product.title}\n- Price: ${product.price}\n- Selected Colour: ${state.color}\n- Fabric set: ${state.size}\n- SKU: ${product.sku}`;
    if (!SITE_CONFIG.whatsappNumber || !/^\d{8,15}$/.test(SITE_CONFIG.whatsappNumber)) {
      window.alert(WHATSAPP_NUMBER_NOTICE);
      return;
    }
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };
  document.querySelector("[data-buy-now]")?.addEventListener("click", buy);
  document.querySelector("[data-whatsapp-buy]")?.addEventListener("click", buy);
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Fabric enquiry — ${data.get("branch")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nEnquiry: ${data.get("branch")}\n\n${data.get("message")}`;
    const feedback = form.querySelector(".form-feedback");
    if (!SITE_CONFIG.contactEmail) {
      if (feedback) feedback.textContent = "Please use the shop's Google Maps listing to contact Bombay Fancy Cloth; a direct email address has not been added yet.";
      return;
    }
    if (feedback) feedback.textContent = "Your email app is opening with your note ready to send.";
    window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  document.querySelectorAll(".newsletter-form").forEach((newsletter) => newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = newsletter.parentElement.querySelector(".form-feedback");
    if (feedback) feedback.textContent = "Thank you for being here. Newsletter sign-ups need to be connected to your email platform.";
    newsletter.reset();
  }));
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = getWhatsAppUrl("Assalamu Alaikum! I have a question about an unstitched suit from Bombay Fancy Cloth.");
    if (!SITE_CONFIG.whatsappNumber || !/^\d{8,15}$/.test(SITE_CONFIG.whatsappNumber)) link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert(WHATSAPP_NUMBER_NOTICE);
    });
  });
}

function init() {
  registerBrandProducts();
  renderFooter();
  setupMobileNavigation();
  setupSearch();
  setupReveal();
  setupHeroSlider();
  setupProductFilters();
  setupBrandDirectory();
  setupBrandPage();
  setupFavorites();
  setupProductDetail();
  setupGalleryThumbnails();
  setupContactForm();
}

document.addEventListener("DOMContentLoaded", init);
