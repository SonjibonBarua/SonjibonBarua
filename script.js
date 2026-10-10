const themeSheet = document.createElement("link");
themeSheet.rel = "stylesheet";
themeSheet.href = "theme.css";
document.head.appendChild(themeSheet);

const typographySheet = document.createElement("link");
typographySheet.rel = "stylesheet";
typographySheet.href = "typography.css";
document.head.appendChild(typographySheet);

const personalSheet = document.createElement("link");
personalSheet.rel = "stylesheet";
personalSheet.href = "personal.css";
document.head.appendChild(personalSheet);

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/* Hero portrait: use the committed SVG asset through jsDelivr CDN.
   The SVG contains the optimized WebP, so the browser receives one small image asset. */
const heroVisual = document.querySelector(".hero-visual");
if (heroVisual) {
  const portrait = heroVisual.querySelector(".profile-portrait");
  const portraitUrl = "https://cdn.jsdelivr.net/gh/SonjibonBarua/SonjibonBarua@d9caa217b601e2cffb862a04475306a316d311c9/assets/profile.svg";

  if (portrait) {
    portrait.style.opacity = "0";
    portrait.style.transition = "opacity .25s ease";
    portrait.src = portraitUrl;
    portrait.loading = "eager";
    portrait.fetchPriority = "high";
    portrait.decoding = "async";
    portrait.onload = () => { portrait.style.opacity = "1"; };
    portrait.onerror = () => {
      portrait.style.opacity = "0";
      portrait.style.display = "none";
      heroVisual.classList.add("portrait-failed");
    };
  } else {
    const newPortrait = document.createElement("img");
    newPortrait.className = "profile-portrait";
    newPortrait.src = portraitUrl;
    newPortrait.alt = "Sonjibon Barua — Digital Marketing & Admissions Manager, Creative Designer and Brand Strategist";
    newPortrait.width = 360;
    newPortrait.height = 470;
    newPortrait.loading = "eager";
    newPortrait.fetchPriority = "high";
    newPortrait.decoding = "async";
    heroVisual.prepend(newPortrait);
  }

  const portraitPreload = document.querySelector('link[rel="preload"][as="image"]');
  if (portraitPreload) {
    portraitPreload.href = portraitUrl;
    portraitPreload.type = "image/svg+xml";
  }
}

const contactActions = document.querySelector(".contact-actions");
if (contactActions && !document.querySelector(".contact-details")) {
  const details = document.createElement("div");
  details.className = "contact-details";
  details.innerHTML = `
    <a href="tel:+8801893072379"><span>PHONE</span><strong>+880 1893072379</strong></a>
    <a href="mailto:barua.sonjibon@gmail.com"><span>EMAIL</span><strong>barua.sonjibon@gmail.com</strong></a>
    <div><span>LOCATION</span><strong>Dhaka, Bangladesh</strong></div>
  `;
  contactActions.insertAdjacentElement("afterend", details);
}

if (document.body && !document.querySelector(".case-study-fab")) {
  const fab = document.createElement("a");
  fab.className = "case-study-fab";
  fab.href = "case-studies.html";
  fab.innerHTML = "Case studies <span>↗</span>";
  document.body.appendChild(fab);

  const proof = document.createElement("a");
  proof.className = "growth-proof-fab";
  proof.href = "bit-growth-proof.html";
  proof.innerHTML = "BIT growth proof <span>↗</span>";
  document.body.appendChild(proof);

  const style = document.createElement("style");
  style.textContent = `.case-study-fab,.growth-proof-fab{position:fixed;right:24px;z-index:30;display:flex;gap:18px;align-items:center;padding:12px 15px;border:1px solid #101721;font:800 10px/1 Manrope,sans-serif;box-shadow:0 10px 30px #0005}.case-study-fab{bottom:22px;background:#c9a86a;color:#101721}.growth-proof-fab{bottom:67px;background:#111b29;color:#e2c995;border-color:#c9a86a}.case-study-fab span,.growth-proof-fab span{font-size:16px}.case-study-fab:hover,.growth-proof-fab:hover{transform:translateY(-2px)}@media(max-width:700px){.case-study-fab{right:14px;bottom:14px}.growth-proof-fab{right:14px;bottom:58px;padding:11px 13px}.case-study-fab{padding:11px 13px}}`;
  document.head.appendChild(style);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}
