const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

if (document.body && !document.querySelector(".case-study-fab")) {
  const fab = document.createElement("a");
  fab.className = "case-study-fab";
  fab.href = "case-studies.html";
  fab.innerHTML = "Case studies <span>↗</span>";
  document.body.appendChild(fab);

  const style = document.createElement("style");
  style.textContent = `.case-study-fab{position:fixed;right:24px;bottom:22px;z-index:30;display:flex;gap:18px;align-items:center;padding:12px 15px;background:#d5fb4e;color:#11130d;border:1px solid #11130d;font:800 10px/1 Manrope,sans-serif;box-shadow:0 10px 30px #0005}.case-study-fab span{font-size:16px}.case-study-fab:hover{transform:translateY(-2px)}@media(max-width:700px){.case-study-fab{right:14px;bottom:14px;padding:11px 13px}}`;
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