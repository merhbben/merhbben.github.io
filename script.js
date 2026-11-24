// ---------- Traductions FR / EN ----------
const EN = {
  "nav.about": "About", "nav.projects": "Projects", "nav.skills": "Skills", "nav.journey": "Journey", "nav.contact": "Contact", "nav.cv": "My resume",
  "hero.badge": "Open to internships & opportunities",
  "hero.iam": "I build",
  "hero.lead": "Engineering student at ESPRIT (Tunisia). I design complete applications, from the AI model to the interface, with one simple goal: useful products that run in production.",
  "hero.cta1": "See my projects",
  "stats.projects": "published projects", "stats.stacks": "tech ecosystems", "stats.countries": "out of 117 teams at the Tunisia–Japan hackathon",
  "p1.award": "Top 16 out of 117 teams", "stats.gov": "governorates modelled (TuniNō)",
  "about.title": "About",
  "about.p1": "I'm an engineering student at <b>ESPRIT</b>. I love projects where code meets a real problem: planning a country's agriculture, running a rental agency's fleet, controlling a restaurant's stock, or powering a pastry shop.",
  "about.p2": "I work across the whole chain: data modelling, APIs, optimisation algorithms and forecasting models, responsive bilingual interfaces, then deployment with Docker and CI/CD.",
  "about.v1": "Traceable data: every number has a source", "about.v2": "Clean layered architecture, tested code", "about.v3": "Built for real users: mobile, RTL, multilingual",
  "projects.title": "Projects",
  "p1.tag": "Kizuna Hackathon · Tunisia 🇹🇳 × Japan 🇯🇵",
  "p1.tagline": "Two nations, one vision: sustainable agriculture.",
  "p1.desc": "Agricultural planning platform inspired by WAGRI (Japan), for two audiences. The <b>Ministry of Agriculture</b> tracks the national balance, plans production by crop, governorate and season, and simulates scenarios. <b>Farmers</b> upload or draw their land, and the <b>AgroBrain</b> engine splits it into optimised plots.",
  "p1.b1": "Land-plan reading with computer vision (OpenCV, ONNX OCR)",
  "p1.b2": "Crop optimisation with OR-Tools, FAO-56 irrigation scheduled with CP-SAT",
  "p1.b3": "XGBoost / LightGBM forecasts with backtesting, FAOSTAT, World Bank and NASA POWER data",
  "p1.b4": "Solar & battery sizing, off-season cold storage simulated hour by hour",
  "p1.b5": "Bilingual French / Tunisian derja interface (RTL), PostGIS, Docker",
  "flow.1": "Land", "flow.2": "Climate & soil", "flow.4": "Optimised plan",
  "common.code": "Source code →", "common.live": "Live demo ↗",
  "p2.desc": "Pastry-shop management app in Flutter, secured with Firebase Auth and Firestore. Live on Firebase Hosting, with GitHub Actions CI/CD and a controlled caching strategy.",
  "p3.desc": "Laravel app to control raw-material consumption for restaurants, hotels and bars: versioned recipes, stock & inventory, theoretical vs. actual variance, KPI dashboards, audit and roles.",
  "p4.desc": "Multi-agency vehicle rental backend: bookings, contracts, payments, maintenance. Layered Controller → Service → Repository architecture, REST APIs tested with Postman.",
  "skills.title": "Skills", "skills.front": "Frontend", "skills.back": "Backend", "skills.ai": "AI & Data", "skills.mobile": "Mobile", "skills.db": "Databases", "skills.devops": "DevOps & tools",
  "journey.title": "Journey",
  "j1.t": "Kizuna (絆) Hackathon Tunisia × Japan: Top 16 / 117 teams", "j1.d": "Ranked in the Top 16 out of 117 teams with TuniNō, a sustainable-agriculture platform for the ministry and farmers.",
  "j2.t": "Academic & professional projects", "j2.d": "AutoLoc (Spring Boot, ASI module), LA-PAIX (Laravel), EnjoySweets (Flutter, deployed to production).",
  "j3.time": "Ongoing", "j3.t": "Engineering degree, ESPRIT", "j3.d": "Private Higher School of Engineering and Technology, Tunis.",
  "contact.title": "Let's work together",
  "contact.text": "I'm looking for an internship or a first role in full-stack development or applied AI. Let's talk about your project.",
  "contact.mail": "Send me an email",
  "footer": "Crafted with care in Tunisia.",
};
const ROLES = {
  fr: ["des applications full-stack.", "des modèles d'IA utiles.", "des apps mobiles Flutter.", "des API robustes."],
  en: ["full-stack applications.", "useful AI models.", "Flutter mobile apps.", "robust APIs."],
};

const FR = {};
document.querySelectorAll("[data-i18n]").forEach((el) => (FR[el.dataset.i18n] = el.innerHTML));

let lang = "fr";
try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("fr") ? "fr" : "en"); } catch {}

function applyLang(l) {
  lang = l;
  const dict = l === "en" ? EN : FR;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.dataset.i18n];
    if (v) el.innerHTML = v;
  });
  document.documentElement.lang = l;
  document.getElementById("langBtn").textContent = l === "en" ? "FR" : "EN";
  try { localStorage.setItem("lang", l); } catch {}
  roleIdx = 0; charIdx = 0; deleting = false;
}
document.getElementById("langBtn").addEventListener("click", () => applyLang(lang === "fr" ? "en" : "fr"));

// ---------- Effet machine à écrire ----------
const typedEl = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;
function tick() {
  const word = ROLES[lang][roleIdx % ROLES[lang].length];
  charIdx += deleting ? -1 : 1;
  typedEl.textContent = word.slice(0, charIdx);
  let delay = deleting ? 35 : 70;
  if (!deleting && charIdx === word.length) { delay = 1800; deleting = true; }
  else if (deleting && charIdx === 0) { deleting = false; roleIdx++; delay = 300; }
  setTimeout(tick, delay);
}

// ---------- Apparition au scroll + compteurs ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-count]").forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

function countUp(el) {
  const target = +el.dataset.count, start = performance.now(), dur = 1400;
  const step = (t) => {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

document.getElementById("year").textContent = new Date().getFullYear();
applyLang(lang);
tick();

// ================= ANIMATIONS+ =================
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (min-width: 681px)").matches;

// Preloader
window.addEventListener("load", () => setTimeout(() => document.getElementById("preloader").classList.add("done"), reduce ? 0 : 1100));

// Reveal en cascade + directions
document.querySelectorAll(".grid, .skills, .timeline, .stats").forEach((g) =>
  [...g.querySelectorAll(".reveal")].forEach((el, i) => el.style.setProperty("--d", i * 0.12 + "s")));
document.querySelectorAll(".skill").forEach((el, i) => el.classList.add(i % 2 ? "from-right" : "from-left"));
document.querySelectorAll(".card, .feature").forEach((el) => el.classList.add("zoom"));
document.querySelectorAll(".card, .skill, .feature").forEach((el) => el.classList.add("tilt"));

// Barre de progression + ligne de la timeline
const progress = document.getElementById("progress");
const timeline = document.querySelector(".timeline");
function onScroll() {
  const h = document.documentElement;
  progress.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  const r = timeline.getBoundingClientRect();
  const p = Math.min(Math.max((innerHeight * 0.75 - r.top) / r.height, 0), 1);
  timeline.style.setProperty("--tl", p * 100 + "%");
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (!reduce) {
  // Curseur personnalisé + spotlight
  if (finePointer) {
    const dot = document.getElementById("cdot"), ring = document.getElementById("cring");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      document.body.classList.add("has-cursor");
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      document.documentElement.style.setProperty("--mx", mx + "px");
      document.documentElement.style.setProperty("--my", my + "px");
    });
    (function follow() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    })();
    document.querySelectorAll("a, button, .card, .chips span").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });

    // Tilt 3D + reflet
    document.querySelectorAll(".tilt").forEach((el) => {
      const max = el.classList.contains("feature") ? 4 : 10;
      el.addEventListener("mousemove", (e) => {
        if (!el.classList.contains("in")) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`;
        el.style.setProperty("--gx", x * 100 + "%");
        el.style.setProperty("--gy", y * 100 + "%");
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });

    // Boutons magnétiques
    document.querySelectorAll(".btn").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      b.addEventListener("mouseleave", () => (b.style.transform = ""));
    });

    // Parallaxe de la carte du hero
    const heroCard = document.querySelector(".hero-card");
    addEventListener("mousemove", (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      heroCard.style.translate = `${x * -18}px ${y * -18}px`;
    });
  }

  // Constellation animée (canvas)
  const cv = document.getElementById("stars"), ctx = cv.getContext("2d");
  let W, H, pts, mouse = { x: -999, y: -999 };
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const n = Math.min(Math.round((innerWidth * innerHeight) / 14000), 110);
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
    }));
  }
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { const d = Math.min(devicePixelRatio || 1, 2); mouse.x = e.clientX * d; mouse.y = e.clientY * d; });
  resize();
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    const link = 130 * Math.min(devicePixelRatio || 1, 2);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dmx = p.x - mouse.x, dmy = p.y - mouse.y, dm = Math.hypot(dmx, dmy);
      if (dm < link) { p.x += dmx / dm * 0.8; p.y += dmy / dm * 0.8; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200,210,255,.7)"; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(140,160,255,${(1 - d / link) * 0.22})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    requestAnimationFrame(draw);
  })();
}

// Après l'apparition, transitions rapides pour le tilt
document.querySelectorAll(".tilt").forEach((el) =>
  el.addEventListener("transitionend", (e) => { if (e.propertyName === "opacity" && el.classList.contains("in")) el.classList.add("settled"); }));
