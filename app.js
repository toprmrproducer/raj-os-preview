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
          ${projectCard("02","Kawsaypac Preview 3","Premium Commerce","The final cinematic Shopify preview, moving from Cotopaxi to the living forest across a 17-product catalog.","FINAL PREVIEW 3","17 PRODUCT FLOWS","#e3b5a3","https://toprmrproducer.github.io/kawsaypac-preview3/")}
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
        <div class="app-scene-grid">
          <figure><img src="./assets/raj-fitness.webp" alt="Shreyas training in a pixel-art kickboxing gym"><figcaption>A weak operator builds a weak business.</figcaption></figure>
          <figure><img src="./assets/raj-systems.webp" alt="Shreyas inside a pixel-art systems control room"><figcaption>Your business is not strong if it needs you awake.</figcaption></figure>
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
  testimonials: {
    title: "Testimonials — Voices.app",
    chrome: "#ffd95a",
    subtitle: "5 REAL VIDEOS",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">CLIENT VOICES / YOUTUBE</span>
        <h2 class="app-heading">Do not trust me.<br><em>Press play.</em></h2>
        <p class="app-deck">Five real RapidXAI client testimonial videos. Labels stay service-based because client names and companies have not been cleared for public attribution.</p>
        <div class="social-list">
          ${social("01","AI Deployment","Vertical testimonial · 00:39","https://youtube.com/shorts/Oe2s8j6JomQ","#f5a39c")}
          ${social("02","ROI Consulting","Vertical testimonial · 00:59","https://youtube.com/shorts/ktfwr3nOFeU","#c7f36b")}
          ${social("03","AI Services","Vertical testimonial · 01:05","https://youtube.com/shorts/IIjhViAlMTA","#a8d7e8")}
          ${social("04","Client Voice","Testimonial · 00:44","https://youtu.be/9OCD3Udnfs8","#b8a7e8")}
          ${social("05","Client Voice","Testimonial · 01:30","https://youtu.be/mtmHkGaE0r0","#ffd95a")}
        </div>
        <p class="source-note">Every card opens the canonical YouTube upload. No invented names, titles, or results.</p>
      </div>`,
  },
  journey: {
    title: "Journey — Timeline.app",
    chrome: "#b8a7e8",
    subtitle: "2015 → NOW",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">MY JOURNEY / PUBLIC FILE</span>
        <h2 class="app-heading">Built in chapters.<br><em>Still becoming.</em></h2>
        <p class="app-deck">A deliberately honest public timeline. Where the archive is incomplete, it says so instead of inventing a cleaner story.</p>
        <div class="journey-list">
          ${milestone("2015","THE FIRST CHAPTER","The public journey file begins here. The exact early archive is still being reconstructed.","#f5d56e")}
          ${milestone("2024","RAPIDXAI / OPERATOR MODE","AI systems, automations, voice infrastructure, and commercial delivery became the operating focus.","#f5a39c")}
          ${milestone("2025","100K+ COMMUNITY","The recorded YouTube and Instagram audience crossed six figures across the saved channel audit.","#a8d7e8")}
          ${milestone("2026","SHREYAS OS ONLINE","Six selected systems, five client videos, and the operating playbook became one interactive public portfolio.","#c7f36b")}
          ${milestone("NEXT","THE UNREASONABLE TARGET","Keep shipping real businesses, durable systems, and work that produces measurable leverage.","#b8a7e8")}
        </div>
      </div>`,
  },
  founder: {
    title: "Founder.txt — Notepad",
    chrome: "#e6e35f",
    subtitle: "PLAIN TEXT / READ ONLY",
    render: () => `
      <div class="notepad-app">
        <header><span>FOUNDER.TXT</span><small>SHREYASRAJ.COM</small></header>
        <p class="notepad-lead">Building systems<br>that make money<br>while I sleep.</p>
        <p>I am Shreyas Raj—founder, operator, and AI builder. I care about commercially useful systems: products that ship, automations that remove expensive work, and interfaces people remember.</p>
        <p>The main folders on this desktop are Projects and Revenue. Start there. The rest explains how the machine works.</p>
        <blockquote>My word is iron. I do what I say, I say what I do.</blockquote>
        <footer>AVAILABLE FOR SELECT BUILDS · LAST PATCHED 29 JUL 2026</footer>
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
        <p class="source-note">My 70K Instagram @ai.w.raj got banned 😭. New account: @theshreyasraj9595.</p>
        <div class="social-list">
          ${social("YT","YouTube","31.7K subscribers · 1.81M views","https://www.youtube.com/@AIwithShreyasRaj","#ffb2ae")}
          ${social("IG","New Instagram","Rebuilding after the 70K account ban","https://www.instagram.com/theshreyasraj9595/","#f3b8db")}
          ${social("X","X / Twitter","Daily experiments and operator notes","https://x.com/TopR9595","#b9dfe8")}
          ${social("GH","GitHub","Products, experiments, and shipped code","https://github.com/TopR9595","#d4c7ed")}
        </div>
        <div class="social-garden" aria-hidden="true">
          <img src="./assets/premium-world/potted-plant.png" alt="">
          <span><i></i><i></i><i></i><i></i><i></i></span>
          <p>DISTRIBUTION GARDEN · GROWING AGAIN</p>
        </div>
      </div>`,
  },
  updates: {
    title: "Updates — Changelog.app",
    chrome: "#9ec58f",
    subtitle: "LIVE OS / v4.0.0",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">PUBLIC CHANGELOG</span>
        <h2 class="app-heading">A portfolio that<br><em>keeps shipping.</em></h2>
        <p class="app-deck">RAJ OS gets patched as the business changes. Projects, proof, lessons, and experiments become visible updates instead of stale résumé bullets.</p>
        <div class="process-list">
          ${step("v4.0.0 · Homepage Mode","Restored the original desktop composition, removed the game world, added Day/Night/Dark themes, professional iconography, honest activity, Founder.txt, and Journey.app.","#f5a39c")}
          ${step("v3.2.0 · Night + Voice","Added a safe browser-native voice concierge and appearance controls.","#a9e1d2")}
          ${step("v3.0.0 · Desktop Mode","One-screen desktop, working browser, emergency channel, movable windows, and a moving Raj.","#c7f36b")}
          ${step("v1.2.0 · Proof Vault","Source-backed metrics and five canonical client testimonial links added.","#ffd95a")}
          ${step("v1.0.0 · First Boot","Desktop OS, draggable windows, command search, projects, revenue, process, achievements, socials, and contact.","#f5a39c")}
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
  voice: {
    title: "Voice Agent — Concierge.app",
    chrome: "#9fded4",
    subtitle: "BROWSER VOICE / ONLINE",
    render: () => `
      <div class="voice-agent">
        <header class="voice-agent-hero">
          <img src="./assets/premium-world/voice-lab.png" alt="" />
          <div><span>RAPIDXAI VOICE CONCIERGE</span><h2>Talk to<br><em>RAJ OS.</em></h2><p>Ask about projects, results, systems, testimonials, the journey, socials, or starting a project.</p></div>
        </header>
        <div class="voice-console">
          <div class="voice-status"><i></i><span data-voice-status>READY FOR A COMMAND</span></div>
          <div class="voice-transcript" data-voice-transcript aria-live="polite">
            <p class="agent-line"><strong>RAJ OS</strong><span>Say “show me the projects” or type below.</span></p>
          </div>
          <div class="voice-controls">
            <button type="button" data-voice-mic>HOLD TO TALK</button>
            <label><input type="text" data-voice-input placeholder="Ask RAJ OS..." autocomplete="off" /><button type="button" data-voice-send>SEND</button></label>
          </div>
          <div class="voice-prompts">
            <button type="button" data-voice-prompt="Show me the projects">PROJECTS</button>
            <button type="button" data-voice-prompt="What results have you generated?">RESULTS</button>
            <button type="button" data-voice-prompt="How can I contact Shreyas?">CONTACT</button>
          </div>
        </div>
        <p class="source-note">PRIVACY: this version uses the browser's speech recognition and speech synthesis. No Gemini or other private API key is exposed in the static site.</p>
      </div>`,
  },
  browser: {
    title: "Browser — RajNet.app",
    chrome: "#a8d7e8",
    subtitle: "WEB / SECURE",
    render: () => `
      <div class="browser-app">
        <div class="browser-toolbar">
          <button type="button" data-browser-home aria-label="Browser home">⌂</button>
          <label><span>HTTPS://</span><input type="text" value="rapidxai.com" aria-label="Web address" /></label>
          <button type="button" data-browser-go>GO</button>
          <button type="button" data-browser-external>OPEN ↗</button>
        </div>
        <nav class="browser-bookmarks" aria-label="Browser bookmarks">
          <button type="button" data-browser-url="https://rapidxai.com">RAPIDXAI</button>
          <button type="button" data-browser-url="https://www.youtube.com/@AIwithShreyasRaj">YOUTUBE</button>
          <button type="button" data-browser-url="https://www.instagram.com/theshreyasraj9595/">INSTAGRAM</button>
          <button type="button" data-browser-url="https://github.com/TopR9595">GITHUB</button>
        </nav>
        <div class="browser-start">
          <img src="./assets/premium-world/update-terminal.png" alt="" />
          <span>RAJNET / READY</span>
          <h2>Where do you<br /><em>want to go?</em></h2>
          <p>This is a working browser surface. Some websites block embedded viewing; OPEN ↗ always launches the address in a full browser tab.</p>
        </div>
        <iframe class="browser-frame" title="RajNet browser page" hidden></iframe>
      </div>`,
  },
  emergency: {
    title: "Emergency — Hotline.app",
    chrome: "#ff6b63",
    subtitle: "PRIORITY CHANNEL",
    render: () => `
      <div class="app-content emergency-content">
        <span class="app-kicker">URGENT BUSINESS IMPLEMENTATION</span>
        <h2 class="app-heading">Need it fixed<br /><em>right now?</em></h2>
        <p class="app-deck">For urgent AI implementation, broken revenue systems, or a high-speed build, reach Shreyas directly. Please use this for genuine business emergencies.</p>
        <div class="emergency-actions">
          <a class="emergency-primary" href="https://wa.me/919307512816?text=Hey%20Shreyas%2C%20I%20have%20an%20urgent%20business%20implementation." target="_blank" rel="noreferrer">WHATSAPP NOW ↗<small>+91 93075 12816</small></a>
          <a class="emergency-secondary" href="tel:+919307512816">CALL SHREYAS ↗<small>Tap to call</small></a>
          <a class="emergency-secondary" href="https://calendly.com/shreyasrajsony11/30min" target="_blank" rel="noreferrer">BOOK 30 MIN ↗<small>For non-emergency builds</small></a>
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
const worldScroll = document.querySelector("#world-scroll");
const worldPlayer = document.querySelector("#world-player");
const playerSprite = worldPlayer?.querySelector("img");
const playerLabel = document.querySelector("#player-label");
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const spriteSources = {
  down: "./assets/raj-front.png",
  up: "./assets/raj-back.png",
  left: "./assets/raj-side.png",
  right: "./assets/raj-side.png",
};
const districtLabels = {
  home: "RAJ · HOME BASE",
  systems: "RAJ · SYSTEMS DISTRICT",
  proof: "RAJ · PROOF PLAZA",
  updates: "RAJ · UPDATE TERMINAL",
};
let playerState = { x: 0, y: 0, direction: "down", waypoint: -1, paused: false };
let walkTimer;

function applyTheme(theme) {
  const safeTheme = ["day", "night", "dark"].includes(theme) ? theme : "day";
  os.dataset.theme = safeTheme;
  os.classList.toggle("night-mode", safeTheme === "night");
  os.classList.toggle("dark-mode", safeTheme === "dark");
  themeButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.themeChoice === safeTheme)));
  localStorage.setItem("raj-os-theme", safeTheme);
}

function toggleTheme() {
  const sequence = ["day", "night", "dark"];
  const current = sequence.indexOf(os.dataset.theme || "day");
  const next = sequence[(current + 1) % sequence.length];
  applyTheme(next);
  toast(`${next.toUpperCase()} MODE`, next === "night" ? "The night desk is online." : next === "dark" ? "Distraction-free dark workstation enabled." : "Day operations resumed.");
}

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
function milestone(year, title, copy, color) { return `<article class="journey-entry" style="--milestone:${color}"><time>${year}</time><div><h3>${title}</h3><p>${copy}</p></div></article>`; }
function badge(glyph, title, copy, color) { return `<article class="badge-card" style="--badge:${color}"><span class="badge-glyph">${glyph}</span><h3>${title}</h3><p>${copy}</p></article>`; }
function team(initials, name, role, copy, color) { return `<article class="team-card" style="--team:${color}"><span class="team-avatar">${initials}</span><h3>${name}</h3><strong>${role}</strong><p>${copy}</p></article>`; }
function social(mark, name, copy, url, color) {
  const sprite = {
    YT: "./assets/premium-dock/voices.png",
    IG: "./assets/premium-apps/socials.png",
    X: "./assets/premium-world/data-beacon.png",
    GH: "./assets/premium-world/data-modules.png",
  }[mark];
  return `<a class="social-link" href="${url}" target="_blank" rel="noreferrer" style="--social:${color}"><span class="social-monogram">${sprite ? `<img src="${sprite}" alt="">` : mark}</span><span><strong>${name}</strong><small>${copy}</small></span><b>↗</b></a>`;
}

function finishBoot() {
  if (booted) return;
  booted = true;
  boot.classList.add("done");
  os.classList.add("ready");
  setTimeout(() => {
    toast("SYSTEM ONLINE", "Shreyas OS loaded. Open an app or press ⌘K.");
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
  if (id === "browser" && desktopWidth > 760) {
    const browserWidth = Math.min(980, desktopWidth - 56);
    win.style.left = `${Math.max(16, (desktopWidth - browserWidth) / 2)}px`;
    win.style.top = "48px";
  }
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
  const browserInput = win.querySelector(".browser-toolbar input");
  const browserFrame = win.querySelector(".browser-frame");
  if (browserInput && browserFrame) {
    const normalizeUrl = value => /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`;
    const navigateBrowser = value => {
      const url = normalizeUrl(value || browserInput.value);
      browserInput.value = url.replace(/^https?:\/\//i, "");
      browserFrame.hidden = false;
      win.querySelector(".browser-start").hidden = true;
      browserFrame.src = url;
      toast("RAJNET", `Loading ${url.replace(/^https?:\/\//i, "")}`);
    };
    win.querySelector("[data-browser-go]").addEventListener("click", () => navigateBrowser());
    win.querySelector("[data-browser-external]").addEventListener("click", () => window.open(normalizeUrl(browserInput.value), "_blank", "noopener,noreferrer"));
    win.querySelector("[data-browser-home]").addEventListener("click", () => {
      browserFrame.hidden = true;
      browserFrame.removeAttribute("src");
      win.querySelector(".browser-start").hidden = false;
    });
    win.querySelectorAll("[data-browser-url]").forEach(button => button.addEventListener("click", () => navigateBrowser(button.dataset.browserUrl)));
    browserInput.addEventListener("keydown", event => { if (event.key === "Enter") navigateBrowser(); });
  }
  const voiceInput = win.querySelector("[data-voice-input]");
  if (voiceInput) bindVoiceAgent(win, voiceInput);
}

function bindVoiceAgent(win, voiceInput) {
  const transcript = win.querySelector("[data-voice-transcript]");
  const status = win.querySelector("[data-voice-status]");
  const mic = win.querySelector("[data-voice-mic]");
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  const addLine = (role, copy) => {
    const line = document.createElement("p");
    line.className = role === "YOU" ? "user-line" : "agent-line";
    const strong = document.createElement("strong");
    const span = document.createElement("span");
    strong.textContent = role;
    span.textContent = copy;
    line.append(strong, span);
    transcript.appendChild(line);
    transcript.scrollTop = transcript.scrollHeight;
  };

  const speak = copy => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(copy);
    utterance.rate = 1.05;
    utterance.pitch = .94;
    window.speechSynthesis.speak(utterance);
  };

  const answer = query => {
    const clean = query.trim();
    if (!clean) {
      status.textContent = "TYPE OR SAY SOMETHING FIRST";
      return;
    }
    addLine("YOU", clean);
    const q = clean.toLowerCase();
    let response = "I can open projects, results, systems, testimonials, the journey, Founder.txt, socials, browser, or the emergency contact channel.";
    let target;
    if (/project|kawsay|ship|work/.test(q)) {
      response = "Opening the shipped project files. Kawsaypac Preview 3 is the final commerce preview.";
      target = "projects";
    } else if (/result|revenue|number|proof|money/.test(q)) {
      response = "Opening verified results and commercial proof. The headline range is five to six lakh rupees in monthly company gross.";
      target = "revenue";
    } else if (/system|process|how.*work/.test(q)) {
      response = "Opening the RapidXAI operating system and delivery loop.";
      target = "process";
    } else if (/testimonial|client|voice.*proof/.test(q)) {
      response = "Opening five canonical client testimonial videos.";
      target = "testimonials";
    } else if (/journey|timeline|2015|milestone/.test(q)) {
      response = "Opening Shreyas's public journey and milestone file.";
      target = "journey";
    } else if (/founder|note|who.*shreyas|about/.test(q)) {
      response = "Opening Founder dot text—the plain-language note behind the operating system.";
      target = "founder";
    } else if (/instagram|social|youtube|github|twitter|\\bx\\b/.test(q)) {
      response = "Opening the live social channels. LinkedIn is intentionally not listed.";
      target = "socials";
    } else if (/contact|call|whatsapp|emergency|hire|start/.test(q)) {
      response = "Opening the priority contact channel. You can WhatsApp, call, email, or book thirty minutes.";
      target = "emergency";
    } else if (/browser|web|internet/.test(q)) {
      response = "Opening RajNet, the built-in browser surface.";
      target = "browser";
    }
    addLine("RAJ OS", response);
    status.textContent = "COMMAND COMPLETE";
    speak(response);
    if (target) setTimeout(() => openApp(target), 420);
  };

  win.querySelector("[data-voice-send]").addEventListener("click", () => {
    answer(voiceInput.value);
    voiceInput.value = "";
  });
  voiceInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      answer(voiceInput.value);
      voiceInput.value = "";
    }
  });
  win.querySelectorAll("[data-voice-prompt]").forEach(button => button.addEventListener("click", () => answer(button.dataset.voicePrompt)));

  if (Recognition) {
    recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.addEventListener("start", () => {
      mic.classList.add("listening");
      mic.textContent = "LISTENING...";
      status.textContent = "MICROPHONE LIVE";
    });
    recognition.addEventListener("result", event => answer(event.results[0][0].transcript));
    recognition.addEventListener("error", event => {
      status.textContent = `MIC ERROR: ${event.error.toUpperCase()}`;
      addLine("RAJ OS", "Microphone access failed. You can still type your command below.");
    });
    recognition.addEventListener("end", () => {
      mic.classList.remove("listening");
      mic.textContent = "HOLD TO TALK";
    });
    mic.addEventListener("click", () => recognition.start());
  } else {
    mic.disabled = true;
    mic.textContent = "VOICE UNSUPPORTED";
    status.textContent = "TYPE MODE READY";
  }
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

function jumpTo(id) {
  const section = document.querySelector(`#${id}`);
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  if (playerLabel) playerLabel.textContent = districtLabels[id] || "RAJ · ONLINE";
}

function renderPlayer() {
  if (!worldPlayer || !playerSprite) return;
  const scale = window.innerWidth <= 760 ? .78 : 1;
  worldPlayer.style.transform = `translate3d(${playerState.x}px, ${playerState.y}px, 0) scale(${scale})`;
  playerSprite.src = spriteSources[playerState.direction];
  worldPlayer.classList.toggle("facing-left", playerState.direction === "left");
  worldPlayer.classList.add("walking");
  clearTimeout(walkTimer);
  walkTimer = setTimeout(() => worldPlayer.classList.remove("walking"), 1900);
}

function syncWorld() {
  if (playerLabel) playerLabel.textContent = "RAJ · HOME BASE";
}

function patrolWaypoints() {
  const mobile = window.innerWidth <= 760;
  const x = window.innerWidth;
  const y = window.innerHeight;
  return mobile
    ? [
        { x: 0, y: 0, label: "RAJ · HOME BASE" },
        { x: -x * .18, y: -y * .08, label: "RAJ · CHECKING FILES" },
        { x: x * .12, y: -y * .15, label: "RAJ · SHIPPING" },
        { x: x * .04, y: -y * .02, label: "RAJ · ONLINE" },
      ]
    : [
        { x: 0, y: 0, label: "RAJ · HOME BASE" },
        { x: -x * .17, y: -y * .04, label: "RAJ · CHECKING FILES" },
        { x: -x * .08, y: -y * .19, label: "RAJ · BUILDING" },
        { x: x * .16, y: -y * .16, label: "RAJ · SHIPPING" },
        { x: x * .08, y: -y * .03, label: "RAJ · BACK ONLINE" },
      ];
}

function autoPatrol() {
  if (!worldPlayer || !playerSprite) return;
  if (playerState.paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const waypoints = patrolWaypoints();
  playerState.waypoint = (playerState.waypoint + 1) % waypoints.length;
  const target = waypoints[playerState.waypoint];
  const deltaX = target.x - playerState.x;
  const deltaY = target.y - playerState.y;
  playerState.direction = Math.abs(deltaX) > Math.abs(deltaY)
    ? (deltaX < 0 ? "left" : "right")
    : (deltaY < 0 ? "up" : "down");
  playerState.x = target.x;
  playerState.y = target.y;
  playerLabel.textContent = target.label;
  renderPlayer();
}

function waveHello() {
  if (!worldPlayer || !playerSprite) return;
  playerState.paused = true;
  worldPlayer.classList.remove("walking");
  worldPlayer.classList.add("waving");
  playerSprite.src = spriteSources.down;
  worldPlayer.classList.remove("facing-left");
  playerLabel.textContent = "RAJ · HEY THERE!";
  toast("PLAYER 01", "Raj waved. He is getting back to work.");
  setTimeout(() => {
    worldPlayer.classList.remove("waving");
    playerState.paused = false;
    playerLabel.textContent = "RAJ · BACK TO WORK";
    autoPatrol();
  }, 1450);
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
    { id: "theme", label: "Cycle day / night / dark", hint: "SYSTEM" },
    { id: "email", label: "Copy Shreyas's email", hint: "ACTION" },
  ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  commandResults.innerHTML = commands.map((item, index) => `<button class="command-result ${index === 0 ? "active" : ""}" type="button" data-command-id="${item.id}"><strong>${item.label}</strong><small>${item.hint}</small></button>`).join("");
  commandResults.querySelectorAll(".command-result").forEach(button => button.addEventListener("click", () => runCommand(button.dataset.commandId)));
}
function runCommand(id) {
  closePalette();
  if (apps[id]) openApp(id);
  else if (id === "desktop") showDesktop();
  else if (id === "theme") toggleTheme();
  else if (id === "email") copyText("shreyas@rapid-xai.com");
}

document.addEventListener("click", event => {
  const opener = event.target.closest("[data-open]");
  if (opener) openApp(opener.dataset.open);
  const jumper = event.target.closest("[data-jump]");
  if (jumper) jumpTo(jumper.dataset.jump);
  if (event.target.closest("[data-home]")) showDesktop();
  if (event.target.closest("[data-command]")) openPalette();
});
document.querySelector(".boot-skip").addEventListener("click", finishBoot);
themeButtons.forEach(button => button.addEventListener("click", () => {
  applyTheme(button.dataset.themeChoice);
  toast(`${button.dataset.themeChoice.toUpperCase()} MODE`, "Appearance updated and saved.");
}));
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
document.querySelector(".sticky")?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") openApp(event.currentTarget.dataset.open);
});
worldPlayer?.addEventListener("click", event => { event.stopPropagation(); waveHello(); });
worldPlayer?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    waveHello();
  }
});
window.addEventListener("resize", () => {
  playerState.waypoint = -1;
  autoPatrol();
});

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  document.querySelector("#date").textContent = now.toLocaleDateString([], { day: "2-digit", month: "short" }).toUpperCase();
  const zone = Intl.DateTimeFormat([], { timeZoneName: "short" }).formatToParts(now).find(part => part.type === "timeZoneName");
  document.querySelector("#timezone").textContent = zone ? zone.value.toUpperCase() : "LOCAL";
}
updateClock();
applyTheme(localStorage.getItem("raj-os-theme") || "day");
syncWorld();
setInterval(updateClock, 30000);
setTimeout(finishBoot, 2450);
