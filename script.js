/* =========================================================
   Mohamed Merhbene — Portfolio · interactions
   ========================================================= */

// ---------- Configuration ----------
const CONFIG = {
  email: "",            // ex. "prenom.nom@exemple.com" : le bouton e-mail apparaît quand c'est rempli
  cv: "cv.pdf",         // le bouton CV apparaît automatiquement si ce fichier existe
  linkedin: "https://www.linkedin.com/in/merhbene-mohamed-a8b956332/",
  github: "https://github.com/merhbben",
};

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (min-width: 761px)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Traductions ----------
const EN = {
  "nav.profile": "Profile", "nav.projects": "Projects", "nav.skills": "Skills", "nav.certs": "Certifications", "nav.journey": "Journey",
  "nav.search": "Search", "nav.contact": "Contact",
  "hero.status": "Available · internships & opportunities",
  "hero.kicker": "Cybersecurity & Cloud Engineering · ESPRIT",
  "hero.lead": "I build <b>secure</b>, <b>cloud-ready</b> applications: from the network to deployment, through the API and the AI model.",
  "hero.cta1": "See my projects", "hero.cv": "My resume",
  "meta.hack": "/ 117 teams · hackathon", "meta.certs": "Cisco certifications", "meta.projects": "projects online",
  "term.hint": "interactive · type help",
  "profil.title": "Profile",
  "about.p1": "<b>Cybersecurity & Cloud Engineering</b> student at <b>ESPRIT</b>. I love projects where code meets a real problem.",
  "about.p2": "Planning a country's agriculture, running a rental agency's fleet, controlling a restaurant's stock: I work across the whole chain, with security built in from the start, all the way to containerised cloud deployment.",
  "about.v0": "Security by design: auth, roles, audit, secrets kept out of code",
  "about.v1": "Traceable data: every number has a source",
  "about.v2": "Clean layered architecture, tested code",
  "about.v3": "Built for real users: mobile, RTL, multilingual",
  "hack.sub": "Top 14% of teams with TuniNō",
  "certs.sub": "Cisco Networking Academy certifications",
  "focus.sec": "Security", "focus.sec.d": "Auth, RBAC, audit, TLS",
  "focus.cloud": "Cloud & DevOps", "focus.cloud.d": "Docker, CI/CD, hosting",
  "focus.net": "Networking", "focus.net.d": "Cisco IOS, IPv4/IPv6", "focus.dev.d": "APIs, React, ML",
  "loc.sub": "local time",
  "projects.title": "Projects",
  "p1.tag": "Kizuna Hackathon · 🇹🇳 × 🇯🇵", "p1.award": "Top 16 out of 117 teams",
  "p1.tagline": "Two nations, one vision: sustainable agriculture.",
  "p1.desc": "Agricultural planning platform inspired by WAGRI (Japan), for two audiences. The <b>Ministry of Agriculture</b> tracks the national balance, plans production by crop, governorate and season, and simulates scenarios. <b>Farmers</b> upload or draw their land, and the <b>AgroBrain</b> engine splits it into optimised plots.",
  "p1.b1": "Land-plan reading with computer vision (OpenCV, ONNX OCR)",
  "p1.b2": "Crop optimisation with OR-Tools, FAO-56 irrigation scheduled with CP-SAT",
  "p1.b3": "XGBoost / LightGBM forecasts with backtesting, FAOSTAT, World Bank and NASA POWER data",
  "p1.b4": "Solar & battery sizing, off-season cold storage simulated hour by hour",
  "p1.b5": "JWT + bcrypt auth, French / Tunisian derja interface (RTL), PostGIS, Docker",
  "flow.1": "Land", "flow.2": "Climate & soil", "flow.4": "Optimised plan",
  "common.code": "Source code →", "common.live": "Live demo ↗",
  "p2.desc": "Pastry-shop management app in Flutter, secured with Firebase Auth and versioned Firestore rules. Live on Firebase Hosting, with GitHub Actions CI/CD and a controlled caching strategy.",
  "p3.desc": "Laravel app to control raw-material consumption for restaurants, hotels and bars: versioned recipes, stock & inventory, theoretical vs. actual variance, KPI dashboards, audit log and role management.",
  "p4.desc": "Multi-agency vehicle rental backend: bookings, contracts, payments, maintenance. Layered Controller → Service → Repository architecture, REST APIs tested with Postman, quality tracked with SonarQube.",
  "skills.title": "Skills", "skills.sec": "security", "skills.net": "networking", "skills.ai": "ai-data", "skills.db": "databases",
  "sk.secrets": "Secrets management", "sk.addr": "IPv4 / IPv6 addressing", "sk.route": "Routing", "sk.trouble": "Network troubleshooting",
  "certs.title": "Certifications", "cert.verified": "Verified",
  "c1.d": "Switch and router configuration, IPv4 / IPv6 addressing, OSI model, securing and troubleshooting a small network.", "c1.date": "November 2026",
  "c2.d": "Common threats, attacks and vulnerabilities; protecting people and organisations.", "c2.date": "September 2026",
  "c3.d": "Enterprise AI adoption: pilot project, ROI, responsible AI, data classification and governance.", "c3.date": "November 2026",
  "journey.title": "Journey",
  "j1.t": "Kizuna (絆) Hackathon Tunisia × Japan: Top 16 / 117 teams", "j1.d": "Designed and built TuniNō, a sustainable-agriculture platform for the ministry and farmers.",
  "j4.t": "Cisco Networking Academy certifications", "j4.d": "Introduction to Cybersecurity, CCNA: Introduction to Networks, AI Power User Launchpad.",
  "j2.t": "Academic & professional projects", "j2.d": "AutoLoc (Spring Boot, ASI module), LA-PAIX (Laravel), EnjoySweets (Flutter, deployed to production).",
  "j3.time": "Ongoing", "j3.t": "Engineering degree, Cybersecurity & Cloud Engineering, ESPRIT", "j3.d": "Private Higher School of Engineering and Technology, Tunis.",
  "contact.title": "Let's build something <span class=\"grad\">secure</span>.",
  "contact.text": "I'm looking for an internship or a first role in cybersecurity, cloud engineering or secure software development. Let's talk about your project.",
  "contact.li": "Contact me on LinkedIn", "contact.mail": "Send me an email",
  "footer": "Designed and built in Tunisia", "footer.k": "to navigate",
  "cmdk.ph": "Go to… (projects, certifications, GitHub…)", "cmdk.foot": "↑↓ navigate · ↵ open · esc close",
};
const FR = {};
$$("[data-i18n]").forEach((el) => (FR[el.dataset.i18n] = el.innerHTML));
$$("[data-i18n-ph]").forEach((el) => (FR[el.dataset.i18nPh] = el.placeholder));

let lang = "fr";
try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("fr") ? "fr" : "en"); } catch {}
const t = (fr, en) => (lang === "en" ? en : fr);

function applyLang(l) {
  lang = l;
  const dict = l === "en" ? EN : FR;
  $$("[data-i18n]").forEach((el) => { const v = dict[el.dataset.i18n]; if (v) el.innerHTML = v; });
  $$("[data-i18n-ph]").forEach((el) => { const v = dict[el.dataset.i18nPh]; if (v) el.placeholder = v; });
  document.documentElement.lang = l;
  $("#langBtn").textContent = l === "en" ? "FR" : "EN";
  try { localStorage.setItem("lang", l); } catch {}
  buildCmdk();
}
$("#langBtn").addEventListener("click", () => applyLang(lang === "fr" ? "en" : "fr"));

// ---------- E-mail et CV (affichés seulement s'ils existent) ----------
if (CONFIG.email) $$("[data-email]").forEach((a) => { a.href = "mailto:" + CONFIG.email; a.hidden = false; });
fetch(CONFIG.cv, { method: "HEAD" }).then((r) => { if (r.ok) { $$("[data-cv]").forEach((a) => (a.hidden = false)); hasCv = true; buildCmdk(); } }).catch(() => {});
let hasCv = false;

// ---------- Séquence de démarrage ----------
const boot = $("#boot");
function runBoot(done) {
  let seen = false;
  try { seen = sessionStorage.getItem("booted"); sessionStorage.setItem("booted", "1"); } catch {}
  if (reduce || seen) { boot.remove(); return done(); }
  document.body.classList.add("booting");
  const lines = [
    t("Initialisation du portfolio v2.0", "Initialising portfolio v2.0"),
    t("Montage de /projets (4)", "Mounting /projects (4)"),
    t("Vérification des certificats Cisco (3)… valides", "Verifying Cisco certificates (3)… valid"),
    t("Connexion TLS sécurisée · pare-feu actif", "Secure TLS connection · firewall up"),
    t("Bienvenue.", "Welcome."),
  ];
  const log = $("#bootLog");
  let i = 0;
  (function next() {
    if (i < lines.length) {
      const last = i === lines.length - 1;
      log.innerHTML += last ? `\n<span class="hl">❯ ${lines[i]}</span>` : `<span class="ok">[  OK  ]</span> ${lines[i]}\n`;
      i++; setTimeout(next, last ? 380 : 150 + Math.random() * 90);
    } else {
      boot.classList.add("done");
      document.body.classList.remove("booting");
      setTimeout(() => boot.remove(), 700);
      done();
    }
  })();
}

// ---------- Texte qui se « déchiffre » ----------
function decrypt(el, delay = 0) {
  const final = el.dataset.text, glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*<>/";
  if (reduce) return (el.textContent = final);
  let frame = 0; const total = 26 + final.length * 2;
  setTimeout(function step() {
    const revealed = Math.floor((frame / total) * final.length);
    el.textContent = final.split("").map((c, i) => (i < revealed ? c : glyphs[(Math.random() * glyphs.length) | 0])).join("");
    if (++frame <= total) requestAnimationFrame(step); else el.textContent = final;
  }, delay);
}

// ---------- Terminal interactif ----------
const out = $("#termOut"), tin = $("#termIn"), tbody = $("#termBody");
const hist = []; let hIdx = 0;
const L = (url, label) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
const CMDS = {
  help: () => t(
`<span class="m">Commandes disponibles :</span>
  <span class="k">whoami</span>      qui suis-je
  <span class="k">skills</span>      compétences
  <span class="k">projects</span>    projets
  <span class="k">certs</span>       certifications
  <span class="k">hackathon</span>   Kizuna Tunisie × Japon
  <span class="k">contact</span>     me joindre
  <span class="k">lang</span> en|fr  changer de langue
  <span class="k">clear</span>       effacer l'écran`,
`<span class="m">Available commands:</span>
  <span class="k">whoami</span>      who am I
  <span class="k">skills</span>      skills
  <span class="k">projects</span>    projects
  <span class="k">certs</span>       certifications
  <span class="k">hackathon</span>   Kizuna Tunisia × Japan
  <span class="k">contact</span>     reach me
  <span class="k">lang</span> en|fr  switch language
  <span class="k">clear</span>       clear the screen`),
  whoami: () => t(
`<b>Mohamed Merhbene</b>
Élève ingénieur · <span class="k">Cybersécurité & Cloud Engineering</span>
<span class="m">@ ESPRIT, Tunis 🇹🇳</span>
Statut : <span class="k">● disponible</span> pour un stage ou une opportunité`,
`<b>Mohamed Merhbene</b>
Engineering student · <span class="k">Cybersecurity & Cloud Engineering</span>
<span class="m">@ ESPRIT, Tunis 🇹🇳</span>
Status: <span class="k">● available</span> for an internship or opportunity`),
  skills: () =>
`<span class="k">security</span>   JWT · bcrypt · RBAC · audit · TLS · Firestore rules
<span class="k">cloud</span>      Docker · GitHub Actions · Firebase Hosting · Linux
<span class="k">network</span>    Cisco IOS · IPv4/IPv6 · OSI/TCP-IP · switching
<span class="k">backend</span>    FastAPI · Spring Boot · Laravel
<span class="k">frontend</span>   React · TypeScript · Tailwind
<span class="k">ai-data</span>    XGBoost · LightGBM · OR-Tools · OpenCV
<span class="k">mobile</span>     Flutter · Firebase`,
  projects: () =>
`<span class="g">★</span> ${L("https://github.com/merhbben/hackathon-kizuna", "TuniNō")}       <span class="m">${t("agriculture durable · Top 16/117", "sustainable agriculture · Top 16/117")}</span>
  ${L("https://github.com/merhbben/EnjoySweets", "EnjoySweets")}  <span class="m">Flutter · Firebase · CI/CD</span>
  ${L("https://github.com/merhbben/LA-PAIX", "LA-PAIX")}      <span class="m">Laravel · ${t("audit & rôles", "audit & roles")}</span>
  ${L("https://github.com/merhbben/autoloc", "AutoLoc")}      <span class="m">Spring Boot · REST</span>`,
  certs: () =>
`<span class="k">✓</span> CCNA: Introduction to Networks   <span class="m">Cisco · ${t("nov.", "Nov")} 2026</span>
<span class="k">✓</span> Introduction to Cybersecurity    <span class="m">Cisco · ${t("sept.", "Sep")} 2026</span>
<span class="k">✓</span> AI Power User Launchpad          <span class="m">Cisco · ${t("nov.", "Nov")} 2026</span>`,
  hackathon: () => t(
`<span class="g">🏆 Top 16 / 117 équipes</span> · Hackathon Kizuna 絆 Tunisie × Japon
Projet : <b>TuniNō</b>, du terrain de l'agriculteur au plan optimisé par AgroBrain.`,
`<span class="g">🏆 Top 16 / 117 teams</span> · Kizuna 絆 Hackathon Tunisia × Japan
Project: <b>TuniNō</b>, from the farmer's land to a plan optimised by AgroBrain.`),
  contact: () =>
`LinkedIn  ${L(CONFIG.linkedin, "merhbene-mohamed")}
GitHub    ${L(CONFIG.github, "merhbben")}${CONFIG.email ? `\nE-mail    <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>` : ""}`,
  ls: () => `<span class="v">projects/</span>  <span class="v">certs/</span>  about.txt  contact.sh`,
  pwd: () => "/home/merhbene",
  date: () => new Date().toLocaleString(lang === "en" ? "en-GB" : "fr-FR", { timeZone: "Africa/Tunis" }) + " (Tunis)",
  echo: (a) => esc(a.join(" ")),
  sudo: () => t(`[sudo] mot de passe pour visiteur : ********\n<span class="e">Accès refusé.</span> Mais vous pouvez toujours me recruter 😉`,
                `[sudo] password for visitor: ********\n<span class="e">Access denied.</span> But you can still hire me 😉`),
};
CMDS.cat = (a) => (a[0] === "about.txt" ? CMDS.whoami() : a[0] === "contact.sh" ? CMDS.contact() : `<span class="e">cat: ${esc(a[0] || "")}: ${t("fichier introuvable", "no such file")}</span>`);
CMDS["./contact.sh"] = CMDS.contact;

function print(html, cls = "") { const d = document.createElement("div"); d.className = "blk " + cls; d.innerHTML = html; out.appendChild(d); tbody.scrollTop = tbody.scrollHeight; }
function run(raw) {
  const line = raw.trim();
  print(esc(line), "cmd");
  if (!line) return;
  hist.push(line); hIdx = hist.length;
  const [cmd, ...args] = line.split(/\s+/);
  const c = cmd.toLowerCase();
  if (c === "clear") return (out.innerHTML = "");
  if (c === "lang") { const l = (args[0] || "").toLowerCase(); if (l === "en" || l === "fr") { applyLang(l); return print(t("Langue : français ✓", "Language: English ✓"), "k"); } return print("lang en | lang fr", "m"); }
  if (CMDS[c]) return print(CMDS[c](args));
  print(`<span class="e">${t("commande introuvable", "command not found")} : ${esc(cmd)}</span> · ${t("tapez", "type")} <span class="k">help</span>`);
}
$("#termForm").addEventListener("submit", (e) => { e.preventDefault(); run(tin.value); tin.value = ""; });
tin.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && hIdx > 0) { tin.value = hist[--hIdx]; e.preventDefault(); }
  else if (e.key === "ArrowDown") { hIdx = Math.min(hIdx + 1, hist.length); tin.value = hist[hIdx] || ""; e.preventDefault(); }
  else if (e.key === "Tab") { e.preventDefault(); const m = Object.keys(CMDS).concat("clear", "lang").find((k) => k.startsWith(tin.value)); if (m && tin.value) tin.value = m; }
});
tbody.addEventListener("click", () => { if (!getSelection().toString()) tin.focus({ preventScroll: true }); });

function typeCmd(text, cb) {
  if (reduce) { run(text); return cb && cb(); }
  let i = 0;
  (function k() { tin.value = text.slice(0, ++i); if (i < text.length) setTimeout(k, 70 + Math.random() * 60); else setTimeout(() => { run(text); tin.value = ""; cb && cb(); }, 260); })();
}
function termIntro() {
  print(t(`<span class="m">Bienvenue sur mon portfolio. Ce terminal est interactif.</span>`, `<span class="m">Welcome to my portfolio. This terminal is interactive.</span>`));
  setTimeout(() => typeCmd("whoami", () => setTimeout(() => typeCmd("certs", () =>
    print(t(`<span class="m">Tapez</span> <span class="k">help</span> <span class="m">pour voir toutes les commandes.</span>`,
            `<span class="m">Type</span> <span class="k">help</span> <span class="m">to see all commands.</span>`))), 700)), 500);
}

// ---------- Apparition au scroll, compteurs ----------
const groups = [".bento", ".proj-grid", ".mods", ".certs", ".timeline"];
groups.forEach((g) => $$(`${g} > .reveal`).forEach((el, i) => el.style.setProperty("--d", (i % 4) * 0.09 + "s")));
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  $$("[data-count]", e.target).forEach(countUp);
  if (e.target.matches("[data-count]")) countUp(e.target);
  io.unobserve(e.target);
}), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el) => io.observe(el));
$$(".tilt").forEach((el) => el.addEventListener("transitionend", (e) => { if (e.propertyName === "opacity" && el.classList.contains("in")) el.classList.add("settled"); }));

function countUp(el) {
  if (el.dataset.done) return; el.dataset.done = 1;
  const target = +el.dataset.count, start = performance.now(), dur = reduce ? 0 : 1300;
  (function step(now) {
    const p = dur ? Math.min((now - start) / dur, 1) : 1;
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

// ---------- Scroll : barre de progression, nav, timeline ----------
const nav = $("#nav"), progress = $("#progress"), tl = $("#timeline");
function onScroll() {
  const h = document.documentElement, y = h.scrollTop;
  progress.style.transform = `scaleX(${y / (h.scrollHeight - h.clientHeight || 1)})`;
  nav.classList.toggle("scrolled", y > 30);
  const r = tl.getBoundingClientRect();
  tl.style.setProperty("--tl", Math.min(Math.max((innerHeight * 0.7 - r.top) / r.height, 0), 1) * 100 + "%");
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// lien actif dans la nav (pastille glissante)
const pill = $("#navPill"), navLinks = $$("#navLinks a");
function movePill(a) {
  navLinks.forEach((l) => l.classList.toggle("active", l === a));
  if (!a) return (pill.style.opacity = 0);
  pill.style.opacity = 1; pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px";
}
const secIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) movePill(navLinks.find((a) => a.getAttribute("href") === "#" + e.target.id) || null);
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach((s) => secIO.observe(s));

// ---------- Horloge de Tunis ----------
const clock = $("#clock");
function tickClock() { clock.textContent = new Date().toLocaleTimeString("fr-FR", { timeZone: "Africa/Tunis" }); }
tickClock(); setInterval(tickClock, 1000);

// ---------- Palette de commandes (⌘K) ----------
const cmdk = $("#cmdk"), cIn = $("#cmdkIn"), cList = $("#cmdkList");
let items = [], sel = 0;
function buildCmdk() {
  const go = (id) => () => document.getElementById(id).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  const open = (u) => () => window.open(u, "_blank", "noopener");
  items = [
    ["👤", t("Profil", "Profile"), "#", go("profil")],
    ["🚀", t("Projets", "Projects"), "#", go("projects")],
    ["🏆", "TuniNō · Top 16/117", "#", go("projects")],
    ["🛠️", t("Compétences", "Skills"), "#", go("skills")],
    ["📜", "Certifications", "#", go("certs")],
    ["🧭", t("Parcours", "Journey"), "#", go("journey")],
    ["✉️", "Contact", "#", go("contact")],
    ["💼", "LinkedIn", "↗", open(CONFIG.linkedin)],
    ["🐙", "GitHub", "↗", open(CONFIG.github)],
    ["🌐", t("Switch to English", "Passer en français"), "⇄", () => applyLang(lang === "fr" ? "en" : "fr")],
    [">_", t("Ouvrir le terminal", "Open the terminal"), "#", () => { $("#term").scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => tin.focus({ preventScroll: true }), 400); }],
  ];
  if (hasCv) items.splice(7, 0, ["📄", t("Télécharger mon CV", "Download my resume"), "↗", open(CONFIG.cv)]);
  if (CONFIG.email) items.splice(7, 0, ["📧", CONFIG.email, "@", () => (location.href = "mailto:" + CONFIG.email)]);
  if (!cmdk.hidden) renderCmdk();
}
function renderCmdk() {
  const q = cIn.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const list = items.filter((it) => it[1].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q));
  sel = Math.min(sel, Math.max(list.length - 1, 0));
  cList.innerHTML = list.map((it, i) => `<li role="option" data-i="${items.indexOf(it)}" class="${i === sel ? "sel" : ""}"><span class="ci">${it[0]}</span>${esc(it[1])}<small>${it[2]}</small></li>`).join("")
    || `<li>${t("Aucun résultat", "No results")}</li>`;
}
function openCmdk() { cmdk.hidden = false; cIn.value = ""; sel = 0; renderCmdk(); setTimeout(() => cIn.focus(), 10); }
function closeCmdk() { cmdk.hidden = true; }
function exec(i) { const it = items[i]; if (!it) return; closeCmdk(); it[3](); }
$("#cmdkBtn").addEventListener("click", openCmdk);
cIn.addEventListener("input", () => { sel = 0; renderCmdk(); });
cIn.addEventListener("keydown", (e) => {
  const n = cList.querySelectorAll("li[data-i]").length;
  if (e.key === "ArrowDown") { sel = (sel + 1) % (n || 1); renderCmdk(); e.preventDefault(); }
  else if (e.key === "ArrowUp") { sel = (sel - 1 + (n || 1)) % (n || 1); renderCmdk(); e.preventDefault(); }
  else if (e.key === "Enter") { const li = cList.querySelector("li.sel"); if (li) exec(+li.dataset.i); }
});
cList.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) exec(+li.dataset.i); });
cmdk.addEventListener("click", (e) => { if (e.target === cmdk) closeCmdk(); });
addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.hidden ? openCmdk() : closeCmdk(); }
  if (e.key === "Escape") { closeCmdk(); closeLb(); }
});

// ---------- Agrandissement des certificats ----------
const lb = $("#lightbox"), lbImg = $("img", lb);
const openLb = (c) => { lbImg.src = c.dataset.full; lbImg.alt = $("h4", c).textContent; lb.hidden = false; };
function closeLb() { lb.hidden = true; }
$$(".cert").forEach((c) => {
  c.addEventListener("click", () => openLb(c));
  c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(c); } });
});
lb.addEventListener("click", closeLb);

// ---------- Bordure lumineuse qui suit la souris ----------
$$(".glow").forEach((el) => el.addEventListener("pointermove", (e) => {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--gx", e.clientX - r.left + "px");
  el.style.setProperty("--gy", e.clientY - r.top + "px");
}));

if (!reduce && finePointer) {
  // curseur + projecteur
  const dot = $("#cdot"), ring = $("#cring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add("has-cursor");
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    document.documentElement.style.setProperty("--mx", mx + "px");
    document.documentElement.style.setProperty("--my", my + "px");
  });
  document.addEventListener("pointerleave", () => document.body.classList.remove("has-cursor"));
  (function follow() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`; requestAnimationFrame(follow); })();
  document.addEventListener("pointerover", (e) => ring.classList.toggle("hover", !!e.target.closest("a, button, .cert, .chips span, input")));

  // inclinaison 3D
  $$(".tilt").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      if (!el.classList.contains("settled")) return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 7}deg) translateY(-4px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });

  // boutons magnétiques
  $$(".magnet").forEach((b) => {
    b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`; });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });

  // parallaxe du terminal
  const hr = $(".hero-right .term");
  addEventListener("pointermove", (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    hr.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
}

// ---------- Fond : topologie réseau avec paquets ----------
if (!reduce) {
  const cv = $("#net"), ctx = cv.getContext("2d");
  let W, H, D, nodes = [], packets = [], mouse = { x: -1e4, y: -1e4 };
  function resize() {
    D = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * D; H = cv.height = innerHeight * D;
    const n = Math.min(Math.round((innerWidth * innerHeight) / 16000), 95);
    nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3 * D, vy: (Math.random() - 0.5) * 0.3 * D, r: (Math.random() * 1.3 + 0.6) * D, hub: Math.random() < 0.08 }));
    packets = [];
  }
  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mouse.x = e.clientX * D; mouse.y = e.clientY * D; });
  resize();
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) requestAnimationFrame(draw); });
  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    const link = 140 * D, edges = [];
    for (const p of nodes) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120 * D && d > 0) { p.x += (dx / d) * 0.7; p.y += (dy / d) * 0.7; }
    }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < link) {
        edges.push([a, b]);
        ctx.strokeStyle = `rgba(110, 170, 220, ${(1 - d / link) * 0.16})`;
        ctx.lineWidth = D * 0.8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    for (const p of nodes) {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.hub ? p.r * 1.8 : p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.hub ? "rgba(45, 226, 180, .85)" : "rgba(190, 205, 235, .55)"; ctx.fill();
      if (p.hub) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fillStyle = "rgba(45, 226, 180, .06)"; ctx.fill(); }
    }
    // paquets qui circulent sur les liens
    if (packets.length < 14 && edges.length && Math.random() < 0.12) {
      const [a, b] = edges[(Math.random() * edges.length) | 0];
      packets.push({ a, b, t: 0, s: 0.012 + Math.random() * 0.018, c: Math.random() < 0.75 ? "45, 226, 180" : "124, 124, 255" });
    }
    packets = packets.filter((k) => (k.t += k.s) < 1);
    for (const k of packets) {
      const x = k.a.x + (k.b.x - k.a.x) * k.t, y = k.a.y + (k.b.y - k.a.y) * k.t;
      ctx.beginPath(); ctx.arc(x, y, 2.2 * D, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${k.c}, .95)`; ctx.shadowBlur = 12 * D; ctx.shadowColor = `rgba(${k.c}, 1)`; ctx.fill(); ctx.shadowBlur = 0;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// ---------- Démarrage ----------
$("#year").textContent = new Date().getFullYear();
applyLang(lang);
runBoot(() => {
  $$(".decrypt").forEach((el, i) => decrypt(el, 150 + i * 180));
  $$(".hero-meta [data-count]").forEach((el) => setTimeout(() => countUp(el), 700));
  setTimeout(termIntro, reduce ? 0 : 900);
});
