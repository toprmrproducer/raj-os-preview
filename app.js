const apps = {
  projects: {
    title: "Projects — Finder",
    chrome: "#f5a39c",
    subtitle: "6 SELECTED SYSTEMS",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">SELECTED WORK / 2024—2026</span>
        <h2 class="app-heading">Things that<br><em>actually shipped.</em></h2>
        <p class="app-deck">AI products, revenue infrastructure, and digital experiences built to survive contact with real users. Click a project to open the case file.</p>
        <div class="project-list">
          ${projectCard("01","RapidX Voice Studio","AI Voice Product","A live studio for building personas, testing conversations, generating speech, and launching outbound calls.","LIVE SYSTEM","78–86% MODELLED MARGIN","#b9dfe8","http://168.144.22.217")}
          ${projectCard("02","Kawsaypac","Premium Commerce","A cinematic Shopify experience moving from the Andes to the Amazon across a 17-product catalog.","$1,500 ENGAGEMENT","17 PRODUCT FLOWS","#e3b5a3","https://toprmrproducer.github.io/kawsaypac-ancestral/")}
          ${projectCard("03","EXTNGO","Headless Commerce","A Shopify-backed storefront for a retractable flat CAT6 cable, from product states through purchasing flow.","SHOPIFY BACKED","LIVE DEPLOYMENT","#c7f36b","https://extngo-cable-385.netlify.app")}
          ${projectCard("04","RapidX AI Voice","White-label Voice SaaS","Agent creation, analytics, call storage, telephony, and Gemini integrations under one RapidXAI system.","FULL REBRAND","AUTH + CALL LOGS","#c2b2e9","")}
          ${projectCard("05","Shreyas OS","Personal Operating System","A private local command surface for tasks, focus, calendar, activity, and recent workspaces.","LOCAL FIRST","REAL TASK WRITE-BACK","#ffd95a","")}
          ${projectCard("06","SimpliiGood","Consumer Brand","A retail-first spirulina experience rebuilt around product education and cinematic storytelling.","BRAND-BIBLE BUILD","MOBILE QA","#a9e1d2","https://simpliigood-spirulina.netlify.app/simplii-green")}
        </div>
      </div>`,
  },
  revenue: {
    title: "Revenue — Proof.app",
    chrome: "#c7f36b",
    subtitle: "THE NUMBERS",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">RECEIPTS, NOT VIBES</span>
        <h2 class="app-heading">Built for<br><em>commercial reality.</em></h2>
        <p class="app-deck">The public scoreboard behind the work. Numbers are labelled by what they actually mean, because inflated claims are useless.</p>
        <div class="metric-grid">
          ${metric("₹5–6L","MONTHLY COMPANY GROSS","Current internal operating range for RapidXAI.","#d8efaf")}
          ${metric("100K+","BUILDER COMMUNITY","31.7K YouTube + 71.1K Instagram at the latest recorded check.","#f6c1d0")}
          ${metric("1.81M","YOUTUBE VIEWS","Across 315 published videos at the latest saved channel audit.","#c4e5ed")}
          ${metric("5","VIDEO TESTIMONIALS","Real client testimonial videos archived and ready for proof.","#f8dfa2")}
          ${metric("₹5L","LARGEST SAVED AI DEAL","One-time white-label AI ownership engagement in the internal record.","#d1c5ee")}
          ${metric("₹1/min","AI LAYER FROM","Promotional AI-layer cost. Full carrier-inclusive cost is higher.","#d9edc0")}
        </div>
        <p class="source-note">SYSTEM NOTE: The $1.2M portfolio-sales figure stays out of the headline until attribution and client permission are verified. Proof beats bullshit.</p>
      </div>`,
  },
  process: {
    title: "How We Work — Systems.app",
    chrome: "#a8d7e8",
    subtitle: "OPERATING LOOP",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">THE RAPIDXAI OPERATING LOOP</span>
        <h2 class="app-heading">Fast, but never<br><em>careless.</em></h2>
        <p class="app-deck">Every serious build moves through the same five stages. The point is not more meetings. The point is fewer surprises.</p>
        <div class="process-list">
          ${step("Find the leverage","We isolate the one business constraint worth attacking: cost, speed, conversion, capacity, or attention.","#f5a39c")}
          ${step("Lock the system","Scope, proof criteria, visual direction, data boundaries, and failure paths become one written contract.","#ffd95a")}
          ${step("Build the sharp edge","The differentiating interaction or technical risk gets built first. No polishing a weak core.","#a8d7e8")}
          ${step("Test the full loop","Real-browser QA, mobile behavior, edge cases, and the actual end-user outcome. “It compiled” means nothing.","#c7f36b")}
          ${step("Ship, measure, improve","Production verification, evidence, handoff, then iteration from real usage instead of opinions.","#b8a7e8")}
        </div>
      </div>`,
  },
  achievements: {
    title: "Achievements — Vault.app",
    chrome: "#ffd95a",
    subtitle: "6 / 6 UNLOCKED",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">ACHIEVEMENT VAULT</span>
        <h2 class="app-heading">Proof,<br><em>pixelated.</em></h2>
        <p class="app-deck">Not trophies for showing up. Milestones that changed the operating system.</p>
        <div class="badge-grid">
          ${badge("100K","Audience Engine","Built a six-figure community around practical AI building.","#f5a39c")}
          ${badge("1.8M","Attention Earned","Crossed 1.81 million recorded YouTube views.","#a8d7e8")}
          ${badge("CEO","Founder Mode","Built RapidXAI into a real monthly revenue operation.","#c7f36b")}
          ${badge("05","Client Proof","Archived five real video testimonials.","#ffd95a")}
          ${badge("18","Young Operator","Turned 18 while running an AI systems company.","#b8a7e8")}
          ${badge("LIVE","Ship Streak","Multiple production websites and AI systems launched.","#a9e1d2")}
        </div>
        <div class="quote">“My word is iron. I do what I say, I say what I do.”</div>
      </div>`,
  },
  team: {
    title: "Team — People.app",
    chrome: "#b8a7e8",
    subtitle: "HUMANS IN THE LOOP",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">THE PEOPLE LAYER</span>
        <h2 class="app-heading">Small team.<br><em>Serious output.</em></h2>
        <p class="app-deck">A lean network of strategy, engineering, design, and specialist partners assembled around the problem, not around headcount theatre.</p>
        <div class="team-grid">
          ${team("SR","Shreyas Raj","Founder / Strategy / Product","Owns the business outcome, product direction, commercial system, and final quality bar.","#f5a39c")}
          ${team("HG","Technical Partner","Engineering / Infrastructure","Builds and operates technical systems across voice, product, and deployment layers.","#a8d7e8")}
          ${team("AI","AI Build Swarm","Research / Code / QA","Specialized agents accelerate research, implementation, regression testing, and documentation.","#c7f36b")}
          ${team("+","Specialist Network","Design / Media / Delivery","Trusted collaborators join when a build needs deep domain craft without permanent agency bloat.","#ffd95a")}
        </div>
        <p class="source-note">SYSTEM NOTE: Team identities and client-facing attribution stay intentionally minimal until public naming is approved.</p>
      </div>`,
  },
  socials: {
    title: "Socials — Broadcast.app",
    chrome: "#f4b6cf",
    subtitle: "100K+ CONNECTED",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">THE DISTRIBUTION LAYER</span>
        <h2 class="app-heading">Build in public.<br><em>Learn in public.</em></h2>
        <p class="app-deck">I document the tools, decisions, failures, and systems behind the work for builders who want usable signal.</p>
        <div class="social-list">
          ${social("YT","YouTube","31.7K subscribers · 1.81M views","https://www.youtube.com/@AIwithShreyasRaj","#ffb2ae")}
          ${social("IG","Instagram","71.1K recorded followers","https://www.instagram.com/theshreyasraj9595/","#f3b8db")}
          ${social("X","X / Twitter","Daily experiments and operator notes","https://x.com/TopR9595","#b9dfe8")}
          ${social("IN","LinkedIn","Founder updates and business systems","https://www.linkedin.com/in/shreyasraj-","#c7f36b")}
          ${social("GH","GitHub","Products, experiments, and shipped code","https://github.com/TopR9595","#d4c7ed")}
        </div>
      </div>`,
  },
  about: {
    title: "About — Raj.app",
    chrome: "#e9d19d",
    subtitle: "PROFILE / ONLINE",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">USER PROFILE</span>
        <div class="profile-hero">
          <div class="profile-portrait"><img src="./assets/raj-avatar.png" alt=""></div>
          <div>
            <h2 class="app-heading">Shreyas<br><em>Raj.</em></h2>
            <div class="tag-row"><span class="tag">PUNE, INDIA</span><span class="tag">FOUNDER & CEO</span><span class="tag">18</span></div>
          </div>
        </div>
        <div class="hairline"></div>
        <p class="app-deck">I run RapidXAI, where we build AI voice agents, revenue automations, and premium digital products for real businesses. I also break down the systems, tools, and operating playbooks behind the work for a global audience of builders.</p>
        <p class="app-deck">The mission is simple and difficult: become a self-made millionaire before 19 through real businesses, not theatre. Every project here is another subsystem toward that goal.</p>
        <div class="quote">Founder. Operator. Builder.<br>Still loading.</div>
        <div class="tag-row">
          <span class="tag">AI VOICE</span><span class="tag">REVENUE AUTOMATION</span><span class="tag">PREMIUM WEB</span><span class="tag">CONTENT SYSTEMS</span>
        </div>
      </div>`,
  },
  contact: {
    title: "Contact — Mail.app",
    chrome: "#a9e1d2",
    subtitle: "CHANNEL OPEN",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">OPEN A CHANNEL</span>
        <h2 class="app-heading">Bring me a real<br><em>business problem.</em></h2>
        <p class="app-deck">If the problem is expensive, repetitive, slow, or impossible to scale manually, there is probably a system worth building.</p>
        <div class="contact-panel">
          <div class="contact-links">
            <a class="big-contact" href="mailto:shreyas@rapid-xai.com">SHREYAS@RAPID-XAI.COM ↗</a>
            <a class="big-contact" href="https://calendly.com/shreyasrajsony11/30min" target="_blank" rel="noreferrer">BOOK A 30-MIN CALL ↗</a>
            <button class="contact-option" type="button" data-copy="shreyas@rapid-xai.com">COPY EMAIL TO CLIPBOARD</button>
            <a class="contact-option" href="https://rapidxai.com" target="_blank" rel="noreferrer">VISIT RAPIDXAI.COM</a>
          </div>
          <aside class="system-card">
            <p class="availability"><i></i> SELECT BUILDS OPEN</p>
            <ul>
              <li>AI voice agents</li>
              <li>Revenue automations</li>
              <li>Premium web systems</li>
              <li>Product experiences</li>
            </ul>
            <p class="source-note">BEST INPUT: the constraint, current cost, desired outcome, and deadline.</p>
          </aside>
        </div>
      </div>`,
  },
};

const projects = [];
const openWindows = new Map();
const visits = new Set(JSON.parse(localStorage.getItem("raj-os-visits") || "[]"));
let zTop = 1200;
let cascade = 0;
let booted = false;
let dragState = null;

const os = document.querySelector("#os");
const boot = document.querySelector("#boot");
const layer = document.querySelector("#window-layer");
const palette = document.querySelector("#command-palette");
const commandInput = document.querySelector("#command-input");
const commandResults = document.querySelector("#command-results");

function projectCard(index, title, category, copy, proofA, proofB, color, url) {
  return `<article class="project-card" style="--card:${color}" data-project-url="${url}">
    <span class="project-index">${index} / SYSTEM</span>
    <h3>${title}</h3><strong>${category}</strong><p>${copy}</p>
    <div class="proof-chips"><span>${proofA}</span><span>${proofB}</span></div>
    <span class="open-project">${url ? "OPEN ↗" : "CASE FILE"}</span>
  </article>`;
}
function metric(value, label, copy, color) { return `<article class="metric-card" style="--metric:${color}"><strong>${value}</strong><span>${label}</span><p>${copy}</p></article>`; }
function step(title, copy, color) { return `<article class="process-step" style="--step:${color}"><div><h3>${title}</h3><p>${copy}</p></div></article>`; }
function badge(glyph, title, copy, color) { return `<article class="badge-card" style="--badge:${color}"><span class="badge-glyph">${glyph}</span><h3>${title}</h3><p>${copy}</p></article>`; }
function team(initials, name, role, copy, color) { return `<article class="team-card" style="--team:${color}"><span class="team-avatar">${initials}</span><h3>${name}</h3><strong>${role}</strong><p>${copy}</p></article>`; }
function social(mark, name, copy, url, color) { return `<a class="social-link" href="${url}" target="_blank" rel="noreferrer"><span class="social-monogram" style="--social:${color}">${mark}</span><span><strong>${name}</strong><small>${copy}</small></span><b>↗</b></a>`; }

function finishBoot() {
  if (booted) return;
  booted = true;
  boot.classList.add("done");
  os.classList.add("ready");
  setTimeout(() => {
    toast("SYSTEM ONLINE", "RAJ OS loaded. Open an app or press ⌘K.");
    openApp("about", { auto: true });
  }, 680);
}

function openApp(id, options = {}) {
  const app = apps[id];
  if (!app) return;
  if (openWindows.has(id)) {
    const existing = openWindows.get(id);
    existing.classList.remove("minimized");
    focusWindow(existing);
    return;
  }

  const win = document.createElement("section");
  win.className = "os-window";
  win.dataset.app = id;
  win.style.setProperty("--chrome", app.chrome);
  const desktopWidth = window.innerWidth;
  const baseLeft = desktopWidth > 760 ? Math.min(180 + (cascade % 5) * 34, desktopWidth - 730) : 8;
  const baseTop = desktopWidth > 760 ? 64 + (cascade % 5) * 27 : 8;
  win.style.left = `${Math.max(16, baseLeft)}px`;
  win.style.top = `${baseTop}px`;
  win.style.zIndex = ++zTop;
  cascade += 1;
  win.innerHTML = `
    <header class="window-titlebar">
      <div class="window-controls">
        <button class="window-control close" type="button" aria-label="Close ${app.title}"></button>
        <button class="window-control min" type="button" aria-label="Minimize ${app.title}"></button>
        <button class="window-control max" type="button" aria-label="Maximize ${app.title}"></button>
      </div>
      <strong class="window-title">${app.title}</strong>
      <span class="window-meta">${app.subtitle}</span>
    </header>
    <div class="window-body">${app.render()}</div>`;
  layer.appendChild(win);
  openWindows.set(id, win);
  document.querySelectorAll(`[data-open="${id}"]`).forEach(el => el.classList.add("open"));
  bindWindow(win);
  focusWindow(win);
  recordVisit(id, options.auto);
}

function bindWindow(win) {
  const bar = win.querySelector(".window-titlebar");
  win.addEventListener("pointerdown", () => focusWindow(win));
  win.querySelector(".close").addEventListener("click", (event) => { event.stopPropagation(); closeWindow(win); });
  win.querySelector(".min").addEventListener("click", (event) => { event.stopPropagation(); win.classList.add("minimized"); });
  win.querySelector(".max").addEventListener("click", (event) => { event.stopPropagation(); win.classList.toggle("maximized"); });
  bar.addEventListener("dblclick", () => win.classList.toggle("maximized"));
  bar.addEventListener("pointerdown", startDrag);
  win.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", () => copyText(button.dataset.copy)));
  win.querySelectorAll("[data-project-url]").forEach(card => card.addEventListener("click", () => {
    const url = card.dataset.projectUrl;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else toast("CASE FILE", "This system is documented internally. Public deployment pending.");
  }));
}

function startDrag(event) {
  if (window.innerWidth <= 760 || event.target.closest(".window-controls")) return;
  const win = event.currentTarget.closest(".os-window");
  if (win.classList.contains("maximized")) return;
  const rect = win.getBoundingClientRect();
  dragState = { win, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
  event.currentTarget.setPointerCapture(event.pointerId);
}
window.addEventListener("pointermove", event => {
  if (!dragState) return;
  const { win, x, y, left, top } = dragState;
  const nextLeft = Math.max(0, Math.min(window.innerWidth - 120, left + event.clientX - x));
  const nextTop = Math.max(0, Math.min(window.innerHeight - 110, top + event.clientY - y - 38));
  win.style.left = `${nextLeft}px`;
  win.style.top = `${nextTop}px`;
});
window.addEventListener("pointerup", () => { dragState = null; });

function focusWindow(win) {
  document.querySelectorAll(".os-window").forEach(item => item.classList.remove("focused"));
  win.classList.add("focused");
  win.style.zIndex = ++zTop;
}
function closeWindow(win) {
  const id = win.dataset.app;
  win.style.opacity = "0";
  win.style.transform = "scale(.92)";
  setTimeout(() => win.remove(), 150);
  openWindows.delete(id);
  document.querySelectorAll(`[data-open="${id}"]`).forEach(el => el.classList.remove("open"));
}
function closeFocused() {
  const focused = document.querySelector(".os-window.focused");
  if (focused) closeWindow(focused);
}
function showDesktop() {
  openWindows.forEach(win => win.classList.add("minimized"));
  toast("SHOW DESKTOP", "All windows minimized. Click an open app to restore it.");
}

function recordVisit(id, silent = false) {
  const before = visits.size;
  visits.add(id);
  localStorage.setItem("raj-os-visits", JSON.stringify([...visits]));
  if (!silent && visits.size > before) toast("APP DISCOVERED", `${apps[id].title} added to your session.`);
  if (visits.size === Object.keys(apps).length) toast("ACHIEVEMENT UNLOCKED", "FULL SYSTEM TOUR — you found every Raj OS app.");
}

function toast(title, message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  document.querySelector("#toast-stack").appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(20px)"; }, 3600);
  setTimeout(() => el.remove(), 3950);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    toast("COPIED", `${value} is on your clipboard.`);
  } catch {
    toast("COPY FAILED", `Use this address: ${value}`);
  }
}

function openPalette() {
  palette.classList.add("open");
  palette.setAttribute("aria-hidden", "false");
  commandInput.value = "";
  renderCommands("");
  setTimeout(() => commandInput.focus(), 30);
}
function closePalette() {
  palette.classList.remove("open");
  palette.setAttribute("aria-hidden", "true");
}
function renderCommands(query) {
  const commands = [
    ...Object.entries(apps).map(([id, app]) => ({ id, label: `Open ${app.title}`, hint: "APP" })),
    { id: "desktop", label: "Show desktop", hint: "SYSTEM" },
    { id: "email", label: "Copy Shreyas's email", hint: "ACTION" },
  ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  commandResults.innerHTML = commands.map((item, index) => `<button class="command-result ${index === 0 ? "active" : ""}" type="button" data-command-id="${item.id}"><strong>${item.label}</strong><small>${item.hint}</small></button>`).join("");
  commandResults.querySelectorAll(".command-result").forEach(button => button.addEventListener("click", () => runCommand(button.dataset.commandId)));
}
function runCommand(id) {
  closePalette();
  if (apps[id]) openApp(id);
  else if (id === "desktop") showDesktop();
  else if (id === "email") copyText("shreyas@rapid-xai.com");
}

document.addEventListener("click", event => {
  const opener = event.target.closest("[data-open]");
  if (opener) openApp(opener.dataset.open);
  if (event.target.closest("[data-home]")) showDesktop();
  if (event.target.closest("[data-command]")) openPalette();
});
document.querySelector(".boot-skip").addEventListener("click", finishBoot);
document.querySelector(".palette-backdrop").addEventListener("click", closePalette);
commandInput.addEventListener("input", event => renderCommands(event.target.value));
commandInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const first = commandResults.querySelector(".command-result");
    if (first) runCommand(first.dataset.commandId);
  }
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openPalette(); }
  if (event.key === "Escape") { palette.classList.contains("open") ? closePalette() : closeFocused(); }
});
document.querySelector(".sticky").addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") openApp("contact"); });

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}
updateClock();
setInterval(updateClock, 30000);
setTimeout(finishBoot, 2450);
