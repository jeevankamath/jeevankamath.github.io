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
document.documentElement.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Path quiz */
const LABELS = { new: "Your path: New rep. Start with free SDR mentoring.", sdr: "Your path: SDR. Start with free SDR mentoring.", lead: "Your path: Team lead. Let's talk about your SDR function." };
document.querySelectorAll("#quiz .chip").forEach(btn => {
  btn.setAttribute("aria-pressed", "false");
  btn.addEventListener("click", () => {
    const p = btn.dataset.path;
    document.querySelectorAll("#quiz .chip").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    document.getElementById("quiz-result").textContent = LABELS[p];
    document.querySelectorAll("#paths .path").forEach(a => a.classList.toggle("pick", a.dataset.for.split(" ").includes(p)));
  });
});

/* Scroll progress + floating pill */
const bar = document.getElementById("progress"), fab = document.getElementById("fab"), hero = document.getElementById("top");
function onScroll() {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  fab.classList.toggle("show", scrollY > hero.offsetHeight - 80);
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* Flip cards */
document.querySelectorAll(".flip").forEach(f => f.addEventListener("click", () =>
  f.setAttribute("aria-pressed", String(f.getAttribute("aria-pressed") !== "true"))));

/* Discovery checklist */
const boxes = [...document.querySelectorAll("#checklist input")];
boxes.forEach(b => b.addEventListener("change", () => { document.getElementById("unlock").hidden = !boxes.every(x => x.checked); }));

/* Onboarding level map: 4 phases x 5 modules */
const phases = document.getElementById("phases");
for (let p = 1; p <= 4; p++) {
  const li = document.createElement("li"); li.className = "phase";
  li.innerHTML = `<b>Phase ${p}</b><div class="dots">` +
    [1,2,3,4,5].map(m => { const n = (p - 1) * 5 + m; return `<button type="button" class="dot" aria-label="Module ${n}: page, video, SOP and self-check">${n}</button>`; }).join("") + "</div>";
  phases.appendChild(li);
}

/* Principle cards */
const pcs = [...document.querySelectorAll(".pcard")]; let pi = 0;
function showP(i) { pi = (i + pcs.length) % pcs.length; pcs.forEach((c, k) => c.classList.toggle("active", k === pi)); }
document.getElementById("pprev").addEventListener("click", () => showP(pi - 1));
document.getElementById("pnext").addEventListener("click", () => showP(pi + 1));
let sx = null; const pbox = document.getElementById("principles");
pbox.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
pbox.addEventListener("touchend", e => { if (sx === null) return; const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 40) showP(pi + (d < 0 ? 1 : -1)); sx = null; });
pbox.addEventListener("click", () => showP(pi + 1));

/* FAQ: one open at a time */
const dets = [...document.querySelectorAll("#faq details")];
dets.forEach(d => d.addEventListener("toggle", () => { if (d.open) dets.forEach(o => { if (o !== d) o.open = false; }); }));

/* Reveal, active nav, section badges (localStorage only) */
const KEY = "jk-seen";
let seen = []; try { seen = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) {}
const markSeen = id => { const a = document.querySelector(`.nav nav a[data-sec="${id}"]`); if (a) a.classList.add("seen"); };
seen.forEach(markSeen);
if ("IntersectionObserver" in window) {
  const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => reduce ? el.classList.add("in") : rev.observe(el));
  const act = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll(".nav nav a").forEach(a => a.classList.toggle("active", a.dataset.sec === e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  const badge = new IntersectionObserver(es => es.forEach(e => {
    if (scrollY > 0 && (e.intersectionRatio >= 0.6 || (e.isIntersecting && e.intersectionRect.height >= innerHeight * 0.6))) {
      const id = e.target.id;
      if (!seen.includes(id)) { seen.push(id); try { localStorage.setItem(KEY, JSON.stringify(seen)); } catch (x) {} }
      markSeen(id);
    }
  }), { threshold: [0.6, 0.3] });
  document.querySelectorAll("section[id]").forEach(s => { act.observe(s); badge.observe(s); });
} else document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
