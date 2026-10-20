/* ===== SITE CONFIG: swap links here =====
   TODO: replace every "#" below. Items with todo:true are unknown/placeholder. */
const CONFIG = {
  booking:    { href: "https://calendar.app.google/WUWmh8HrbW56DnaH7", todo: false },  // Google Calendar appointment schedule (1:1 mentoring)
  consulting: { href: "https://calendar.app.google/WUWmh8HrbW56DnaH7", todo: false },  // same booking page for now
  socials: [
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/g1.mov/", todo: false },
    { key: "linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/in/jeevan-kamath-802820140/", todo: false },
    { key: "x",         label: "X",         href: "#", todo: true, hidden: true }, // TODO: X handle unknown. Add href and set hidden:false to show the icon
    { key: "youtube",   label: "YouTube",   href: "https://www.youtube.com/@Jeevankamath71", todo: false },
    { key: "threads",   label: "Threads",   href: "https://www.threads.com/@jeevankamath71", todo: false },
  ],
};

const ICONS = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
  threads: '<circle cx="12" cy="12" r="4"/><path d="M16 12c0 5-3 8-6 8a8 8 0 1 1 8-8"/>',
};

function applyLink(el, cfg) {
  el.href = cfg.href;
  if (cfg.todo) el.dataset.todo = "true";
  if (cfg.href.startsWith("http")) { el.target = "_blank"; el.rel = "noopener"; }
}

document.querySelectorAll("[data-link]").forEach(el => {
  const k = el.dataset.link;
  const cfg = CONFIG[k] || CONFIG.socials.find(s => s.key === k);
  if (cfg) applyLink(el, cfg);
});

document.querySelectorAll("[data-socials]").forEach(box => {
  CONFIG.socials.filter(s => !s.hidden).forEach(s => {
    const a = document.createElement("a");
    a.setAttribute("aria-label", s.label); a.title = s.label;
    a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[s.key]}</svg>`;
    applyLink(a, s); box.appendChild(a);
  });
});
document.getElementById("yr").textContent = new Date().getFullYear();
