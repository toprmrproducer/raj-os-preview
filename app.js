const proofVideos = [
  { id: "Oe2s8j6JomQ", label: "AI Deployment", type: "Vertical testimonial", duration: "00:39", url: "https://youtube.com/shorts/Oe2s8j6JomQ" },
  { id: "ktfwr3nOFeU", label: "ROI Consulting", type: "Vertical testimonial", duration: "00:59", url: "https://youtube.com/shorts/ktfwr3nOFeU" },
  { id: "IIjhViAlMTA", label: "AI Services", type: "Vertical testimonial", duration: "01:05", url: "https://youtube.com/shorts/IIjhViAlMTA" },
  { id: "9OCD3Udnfs8", label: "Client Voice 04", type: "Client testimonial", duration: "00:44", url: "https://youtu.be/9OCD3Udnfs8" },
  { id: "mtmHkGaE0r0", label: "Client Voice 05", type: "Client testimonial", duration: "01:30", url: "https://youtu.be/mtmHkGaE0r0" },
];

const musicTracks = [
  { title: "Tomb of Death", artist: "Braiz · Super Slowed", duration: "1:53", src: "./assets/music/tomb-of-death-super-slowed.mp3" },
  { title: "Encanto", artist: "KIT", duration: "2:08", src: "./assets/music/encanto-kit.mp3" },
  { title: "Lina Colina", artist: "blueberry · DJ KHRLP", duration: "1:40", src: "./assets/music/lina-colina-blueberry.mp3" },
  { title: "Flutuar", artist: "Sped Up", duration: "2:15", src: "./assets/music/flutuar-sped-up.mp3" },
];

const portraitPoses = [
  { src: "./assets/raj-avatar.png", label: "FOUNDER MODE" },
  { src: "./assets/raj-wave.png", label: "HELLO MODE" },
  { src: "./assets/raj-builder.png", label: "BUILDER MODE" },
];

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
          ${projectCard("01","RapidX Voice Studio","AI Voice Product","A live studio for building personas, testing conversations, generating speech, and launching outbound calls.","LIVE SYSTEM","VOICE INFRASTRUCTURE","#b9dfe8","http://168.144.22.217")}
          ${projectCard("02","Kawsaypac Preview 3","Premium Commerce","The final cinematic Shopify preview, moving from Cotopaxi to the living forest across a 17-product catalog.","FINAL PREVIEW 3","17 PRODUCT FLOWS","#e3b5a3","https://toprmrproducer.github.io/kawsaypac-preview3/")}
          ${projectCard("03","EXTNGO","Headless Commerce","A Shopify-backed storefront for a retractable flat CAT6 cable, from product states through purchasing flow.","SHOPIFY BACKED","LIVE DEPLOYMENT","#c7f36b","https://extngo-cable-385.netlify.app")}
          ${projectCard("04","RapidX AI Voice","White-label Voice SaaS","Agent creation, analytics, call storage, telephony, and Gemini integrations under one RapidXAI system.","FULL REBRAND","AUTH + CALL LOGS","#c2b2e9","")}
          ${projectCard("05","Shreyas OS","Personal Operating System","A private local command surface for tasks, focus, calendar, activity, and recent workspaces.","LOCAL FIRST","REAL TASK WRITE-BACK","#ffd95a","")}
          ${projectCard("06","SimpliiGood","Consumer Brand","A retail-first spirulina experience rebuilt around product education and cinematic storytelling.","BRAND-BIBLE BUILD","MOBILE QA","#a9e1d2","https://simpliigood-spirulina.netlify.app/simplii-green")}
        </div>
      </div>`,
  },
  revenue: {
    title: "Results — Proof.app",
    chrome: "#c7f36b",
    subtitle: "PUBLIC EVIDENCE",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">RECEIPTS, NOT VIBES</span>
        <h2 class="app-heading">Visible work.<br><em>Playable proof.</em></h2>
        <p class="app-deck">The public scoreboard behind the work. Internal company revenue stays private; this surface only shows evidence visitors can inspect.</p>
        <div class="metric-grid">
          ${metric("6","SHIPPED SYSTEMS","Selected public products, websites, and operating systems.","#d8efaf")}
          ${metric("1.81M","YOUTUBE VIEWS","Across 315 published videos at the latest saved channel audit.","#c4e5ed")}
          ${metric("100K+","BUILDER COMMUNITY","31.7K YouTube + 71.1K Instagram at the latest recorded check.","#f6c1d0")}
          ${metric("5","PLAYABLE TESTIMONIALS","Real client videos embedded inside Proof.app.","#f8dfa2")}
          ${metric("315","PUBLISHED VIDEOS","Recorded YouTube publishing archive at the latest saved audit.","#d1c5ee")}
          ${metric("17","K_P3 PRODUCT FLOWS","The final Kawsaypac Preview 3 catalog experience.","#d9edc0")}
        </div>
        <p class="source-note">SYSTEM NOTE: company revenue and unverified attribution claims are intentionally private. Open Testimonials.app for the actual client videos.</p>
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
          ${badge("CEO","Founder Mode","Built RapidXAI into a real commercial operation.","#c7f36b")}
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
      <div class="app-content video-proof-app">
        <span class="app-kicker">CLIENT VOICES / YOUTUBE</span>
        <h2 class="app-heading">Do not trust me.<br><em>Press play.</em></h2>
        <p class="app-deck">Five real RapidXAI client testimonial videos with their actual voices. Choose a card to play it here, expand the theater, or open the canonical YouTube upload.</p>
        ${renderProofTheater()}
        <p class="source-note">No invented client names, companies, or outcomes. The clean service labels are navigation categories; playback and source titles come directly from YouTube.</p>
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
        <p>The main folders on this desktop are Projects and Results. Start there. The rest explains how the machine works.</p>
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
    subtitle: "LIVE OS / v5.0.0",
    render: () => `
      <div class="app-content">
        <span class="app-kicker">PUBLIC CHANGELOG</span>
        <h2 class="app-heading">A portfolio that<br><em>keeps shipping.</em></h2>
        <p class="app-deck">RAJ OS gets patched as the business changes. Projects, proof, lessons, and experiments become visible updates instead of stale résumé bullets.</p>
        <div class="process-list">
          ${step("v5.0.0 · Personal World","Added Music Deck, Garage Mail, video suggestions, Game Room, hidden Learn and prank folders, portrait pose switching, a visible SOS channel, and original day/night ambient events.","#f4b6cf")}
          ${step("v4.1.0 · Video Proof","Embedded five real YouTube testimonials with actual audio, thumbnails, playlist selection, cinema expansion, and direct source fallbacks.","#ffd95a")}
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
        <div class="garage-mail-grid">
          <form class="garage-mail" name="garage-mail" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-ajax-form>
            <input type="hidden" name="form-name" value="garage-mail" />
            <input class="form-trap" name="bot-field" tabindex="-1" autocomplete="off" />
            <header><span>GARAGE MAIL</span><small>DIRECT TO RAJ</small></header>
            <label>Your name<input name="name" type="text" maxlength="80" required autocomplete="name" /></label>
            <label>Your email<input name="email" type="email" maxlength="160" required autocomplete="email" /></label>
            <label>What should we build?<textarea name="message" rows="4" maxlength="1600" required></textarea></label>
            <button type="submit">SEND MESSAGE ↗</button>
            <p class="form-status" data-form-status aria-live="polite">NETLIFY DELIVERY · EMAIL FALLBACK READY</p>
          </form>
          <form class="garage-mail suggestion-mail" name="video-suggestion" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-ajax-form>
            <input type="hidden" name="form-name" value="video-suggestion" />
            <input class="form-trap" name="bot-field" tabindex="-1" autocomplete="off" />
            <header><span>VIDEO SUGGESTION</span><small>CONTENT QUEUE</small></header>
            <label>Your name<input name="name" type="text" maxlength="80" required autocomplete="name" /></label>
            <label>Reply email<input name="email" type="email" maxlength="160" required autocomplete="email" /></label>
            <label>What should Shreyas make?<textarea name="suggestion" rows="4" maxlength="1000" required></textarea></label>
            <button type="submit">QUEUE THE IDEA ↗</button>
            <p class="form-status" data-form-status aria-live="polite">GOOD IDEAS BECOME PUBLIC BUILDS</p>
          </form>
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
  music: {
    title: "Music — SoundDeck.app",
    chrome: "#f4b6cf",
    subtitle: "4 TRACKS / MANUAL PLAY",
    render: () => `
      <div class="app-content music-app">
        <span class="app-kicker">SHREYAS'S CURRENT ROTATION</span>
        <h2 class="app-heading">Sound on.<br><em>Build mode.</em></h2>
        <p class="app-deck">The player never autostarts. Pick a track here or use the compact deck on the desktop.</p>
        <div class="music-library">
          ${musicTracks.map((track, index) => `
            <button type="button" data-music-track="${index}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${track.title}</strong>
              <small>${track.artist}</small>
              <time>${track.duration}</time>
            </button>
          `).join("")}
        </div>
        <p class="source-note">MEDIA NOTE: public deployment requires web-distribution permission for every track. Playback is opt-in and local to this browser tab.</p>
      </div>`,
  },
  games: {
    title: "Games — Arcade.app",
    chrome: "#8d78d8",
    subtitle: "2 LIVE / 2 CASE FILES",
    render: () => `
      <div class="game-room">
        <header>
          <div><span>SHREYAS BUILT THESE</span><h2>Game<br><em>Room.</em></h2></div>
          <nav aria-label="Playable games">
            <button class="active" type="button" data-game-url="https://toprmrproducer.github.io/viper-arena/" data-game-title="VIPER ARENA">VIPER ARENA</button>
            <button type="button" data-game-url="https://toprmrproducer.github.io/fangs-io/" data-game-title="FANGS.IO">FANGS.IO</button>
          </nav>
        </header>
        <div class="game-stage">
          <div class="game-stage-bar"><strong data-game-now>VIPER ARENA</strong><span>CLICK THE GAME TO UNLOCK AUDIO</span><a href="https://toprmrproducer.github.io/viper-arena/" data-game-external target="_blank" rel="noreferrer">OPEN FULLSCREEN ↗</a></div>
          <iframe data-game-frame src="https://toprmrproducer.github.io/viper-arena/" title="VIPER ARENA game" loading="lazy" allow="autoplay; fullscreen"></iframe>
        </div>
        <div class="game-case-files">
          <article><img src="./assets/games/neon-drift.png" alt="Neon Drift gameplay screenshot" /><div><strong>NEON DRIFT</strong><span>CASE FILE · SOURCE RECOVERY PENDING</span></div></article>
          <article><img src="./assets/games/shotr.png" alt="Shotr.io gameplay screenshot" /><div><strong>SHOTR.IO</strong><span>SERVER OFFLINE · MULTIPLAYER ARCHIVE</span></div></article>
        </div>
      </div>`,
  },
  learn: {
    title: "Learn — FieldManual.app",
    chrome: "#e6e35f",
    subtitle: "HIDDEN UNDER THE NOTE",
    render: () => `
      <div class="app-content learn-app">
        <span class="app-kicker">THE FIELD MANUAL</span>
        <h2 class="app-heading">Steal the system.<br><em>Not the aesthetic.</em></h2>
        <p class="app-deck">Five short lessons behind the builds. Each one is meant to change what you do next, not fill another bookmarks folder.</p>
        <div class="learn-grid">
          ${step("01 · Start with leverage","Find the expensive constraint before choosing the tool. AI is not the strategy; the bottleneck is.","#f5a39c")}
          ${step("02 · Proof before polish","Ship the riskiest interaction first. A beautiful shell around a weak core is expensive theatre.","#ffd95a")}
          ${step("03 · Make failure visible","Every automation needs a clear failure path, notification, owner, and recovery move.","#a8d7e8")}
          ${step("04 · Distribution is a system","One build should create a case study, a video, a reusable component, and a sharper sales story.","#c7f36b")}
          ${step("05 · Protect the signal","Do not publish private revenue or borrowed credibility. Playable evidence is stronger than inflated copy.","#b8a7e8")}
        </div>
      </div>`,
  },
  keys: {
    title: "API_KEYS.env — TextEdit",
    chrome: "#a9e1d2",
    subtitle: "DEMO FILE / NOT REAL",
    render: () => `
      <div class="fake-keys">
        <header><span>API_KEYS.env</span><strong>SAFE DEMO</strong></header>
        <pre><code># If you found this, congratulations.
# Every value below is intentionally fake.

OPENAI_API_KEY=DEMO_KEY_NOT_REAL
GEMINI_API_KEY=DEMO_KEY_NOT_REAL
STRIPE_SECRET_KEY=DEMO_KEY_NOT_REAL
SUPABASE_SERVICE_ROLE=DEMO_KEY_NOT_REAL

MESSAGE="Nice try. Real secrets never ship to the browser."</code></pre>
        <button type="button" data-open="learn">FINE. TEACH ME SOMETHING ↗</button>
      </div>`,
  },
  prank: {
    title: "DO_NOT_OPEN — Secret.folder",
    chrome: "#ff6b63",
    subtitle: "YOU WERE WARNED",
    render: () => `
      <div class="prank-app" data-prank-app>
        <span class="app-kicker">HIDDEN FILE / 00</span>
        <h2 class="app-heading" data-prank-title>Do not<br><em>open this.</em></h2>
        <p class="app-deck" data-prank-copy>This folder was behind the portrait for a reason. Exit now and your professional reputation remains intact.</p>
        <div class="prank-actions">
          <button type="button" data-prank-next>OPEN IT ANYWAY</button>
          <button type="button" data-prank-exit>CLOSE FOLDER</button>
        </div>
        <button class="api-decoy" type="button" data-open="keys">API_KEYS.env · DEFINITELY SECRET</button>
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
const musicAudio = document.querySelector("#music-audio");
const musicDeck = document.querySelector("[data-music-deck]");
const portraitButton = document.querySelector("[data-portrait]");
const portraitImage = document.querySelector("[data-portrait-img]");
const learnSticky = document.querySelector("[data-learn-sticky]");
let musicIndex = 0;
let portraitIndex = 0;
let stickyDrag = null;
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
function renderProofTheater() {
  const first = proofVideos[0];
  return `
    <section class="proof-theater" data-proof-theater>
      <div class="proof-screen">
        <div class="proof-screen-bar">
          <span><i></i> NOW PLAYING</span>
          <strong data-proof-now>${first.label}</strong>
          <small data-proof-duration>${first.duration}</small>
        </div>
        <div class="proof-frame-wrap">
          <iframe
            data-proof-frame
            src="https://www.youtube-nocookie.com/embed/${first.id}?rel=0&modestbranding=1"
            title="${first.label} client testimonial"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div class="proof-screen-actions">
          <button type="button" data-proof-expand aria-pressed="false">EXPAND THEATER</button>
          <a data-proof-external href="${first.url}" target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a>
        </div>
      </div>
      <div class="proof-playlist" aria-label="Client testimonial videos">
        ${proofVideos.map((video, index) => `
          <button
            class="proof-video-card ${index === 0 ? "active" : ""}"
            type="button"
            data-proof-video="${video.id}"
            data-proof-label="${video.label}"
            data-proof-duration="${video.duration}"
            data-proof-url="${video.url}"
            aria-pressed="${index === 0 ? "true" : "false"}"
          >
            <span class="proof-thumb">
              <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.label} YouTube thumbnail" loading="lazy" />
              <i aria-hidden="true"></i>
              <time>${video.duration}</time>
            </span>
            <span class="proof-card-copy">
              <small>${String(index + 1).padStart(2, "0")} / CLIENT VOICE</small>
              <strong>${video.label}</strong>
              <em>${video.type}</em>
            </span>
          </button>
        `).join("")}
      </div>
    </section>`;
}
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
  if (id === "testimonials" || id === "games") pauseMusic();
  if (openWindows.has(id)) {
    const existing = openWindows.get(id);
    existing.classList.remove("minimized");
    resumeProofMedia(existing);
    resumeGameMedia(existing);
    focusWindow(existing);
    existing.focus({ preventScroll: true });
    return;
  }

  const win = document.createElement("section");
  win.className = "os-window";
  win.dataset.app = id;
  win.tabIndex = -1;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-modal", "false");
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
      <strong class="window-title" id="window-title-${id}">${app.title}</strong>
      <span class="window-meta">${app.subtitle}</span>
    </header>
    <div class="window-body">${app.render()}</div>`;
  layer.appendChild(win);
  win.setAttribute("aria-labelledby", `window-title-${id}`);
  openWindows.set(id, win);
  document.querySelectorAll(`[data-open="${id}"]`).forEach(el => el.classList.add("open"));
  bindWindow(win);
  focusWindow(win);
  win.focus({ preventScroll: true });
  recordVisit(id, options.auto);
}

function pauseProofMedia(win) {
  const frame = win.querySelector("[data-proof-frame]");
  if (!frame || frame.src === "about:blank") return;
  frame.dataset.restoreSrc = frame.src;
  frame.src = "about:blank";
}

function resumeProofMedia(win) {
  const frame = win.querySelector("[data-proof-frame]");
  if (!frame?.dataset.restoreSrc) return;
  frame.src = frame.dataset.restoreSrc;
  delete frame.dataset.restoreSrc;
}

function pauseGameMedia(win) {
  const frame = win.querySelector("[data-game-frame]");
  if (!frame || frame.src === "about:blank") return;
  frame.dataset.restoreSrc = frame.src;
  frame.src = "about:blank";
}

function resumeGameMedia(win) {
  const frame = win.querySelector("[data-game-frame]");
  if (!frame?.dataset.restoreSrc) return;
  frame.src = frame.dataset.restoreSrc;
  delete frame.dataset.restoreSrc;
}

function bindWindow(win) {
  const bar = win.querySelector(".window-titlebar");
  win.addEventListener("pointerdown", () => focusWindow(win));
  win.querySelector(".close").addEventListener("click", (event) => { event.stopPropagation(); closeWindow(win); });
  win.querySelector(".min").addEventListener("click", (event) => {
    event.stopPropagation();
    pauseProofMedia(win);
    pauseGameMedia(win);
    win.classList.add("minimized");
  });
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
  const proofTheater = win.querySelector("[data-proof-theater]");
  if (proofTheater) bindProofTheater(win, proofTheater);
  if (win.querySelector("[data-game-frame]")) bindGameRoom(win);
  if (win.querySelector("[data-ajax-form]")) bindAjaxForms(win);
  if (win.querySelector("[data-prank-app]")) bindPrank(win);
  win.querySelectorAll("[data-music-track]").forEach(button => button.addEventListener("click", () => {
    selectMusicTrack(Number(button.dataset.musicTrack), true);
  }));
}

function bindProofTheater(win, theater) {
  const frame = theater.querySelector("[data-proof-frame]");
  const nowPlaying = theater.querySelector("[data-proof-now]");
  const duration = theater.querySelector("[data-proof-duration]");
  const external = theater.querySelector("[data-proof-external]");
  const expand = theater.querySelector("[data-proof-expand]");
  const cards = [...theater.querySelectorAll("[data-proof-video]")];

  const selectVideo = card => {
    pauseMusic();
    cards.forEach(item => {
      const selected = item === card;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    nowPlaying.textContent = card.dataset.proofLabel;
    duration.textContent = card.dataset.proofDuration;
    external.href = card.dataset.proofUrl;
    frame.title = `${card.dataset.proofLabel} client testimonial`;
    delete frame.dataset.restoreSrc;
    frame.src = `https://www.youtube-nocookie.com/embed/${card.dataset.proofVideo}?autoplay=1&rel=0&modestbranding=1`;
    toast("PROOF LOADED", `${card.dataset.proofLabel} · ${card.dataset.proofDuration}`);
  };

  cards.forEach(card => card.addEventListener("click", () => selectVideo(card)));
  theater.querySelectorAll(".proof-thumb img").forEach(image => image.addEventListener("error", () => {
    image.hidden = true;
    image.closest(".proof-thumb")?.classList.add("thumb-error");
  }));
  expand.addEventListener("click", () => {
    const expanded = theater.classList.toggle("cinema-mode");
    win.classList.toggle("proof-cinema-window", expanded);
    expand.textContent = expanded ? "EXIT THEATER" : "EXPAND THEATER";
    expand.setAttribute("aria-pressed", String(expanded));
  });
}

function bindGameRoom(win) {
  const frame = win.querySelector("[data-game-frame]");
  const title = win.querySelector("[data-game-now]");
  const external = win.querySelector("[data-game-external]");
  win.querySelectorAll("[data-game-url]").forEach(button => button.addEventListener("click", () => {
    const url = button.dataset.gameUrl;
    frame.src = url;
    delete frame.dataset.restoreSrc;
    frame.title = `${button.dataset.gameTitle} game`;
    title.textContent = button.dataset.gameTitle;
    external.href = url;
    win.querySelectorAll("[data-game-url]").forEach(item => item.classList.toggle("active", item === button));
    toast("ARCADE LOADED", `${button.dataset.gameTitle} is ready.`);
  }));
}

function encodeForm(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

function mailFallback(form) {
  const data = Object.fromEntries(new FormData(form));
  const subject = data["form-name"] === "video-suggestion" ? "Video suggestion for Shreyas" : "Garage Mail for Shreyas";
  const message = data.message || data.suggestion || "";
  return `mailto:shreyas@rapid-xai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\nFrom: ${data.name || ""} <${data.email || ""}>`)}`;
}

function bindAjaxForms(win) {
  win.querySelectorAll("[data-ajax-form]").forEach(form => form.addEventListener("submit", async event => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector('button[type="submit"]');
    if (!form.reportValidity()) return;
    status.textContent = "TRANSMITTING…";
    submit.disabled = true;
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(form),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const formName = form.querySelector('[name="form-name"]').value;
      status.textContent = formName === "video-suggestion" ? "IDEA QUEUED. THANK YOU." : "MESSAGE DELIVERED TO RAJ.";
      toast("GARAGE MAIL", "Transmission received. Shreyas has your note.");
      form.reset();
    } catch {
      status.textContent = "NETLIFY IS NOT ACTIVE HERE. ";
      const fallback = document.createElement("a");
      fallback.href = mailFallback(form);
      fallback.textContent = "SEND BY EMAIL ↗";
      status.appendChild(fallback);
    } finally {
      submit.disabled = false;
    }
  }));
}

function bindPrank(win) {
  const root = win.querySelector("[data-prank-app]");
  const title = root.querySelector("[data-prank-title]");
  const copy = root.querySelector("[data-prank-copy]");
  const next = root.querySelector("[data-prank-next]");
  const exit = root.querySelector("[data-prank-exit]");
  const steps = [
    ["Still opening it?", "You had one job. There is still time to leave.", "YES, I AM SURE"],
    ["Last warning.", "The file is labelled definitely_not_a_rickroll.mov. That seems trustworthy.", "PLAY THE VERY NORMAL VIDEO"],
    ["You chose this.", "The prank opens in a new tab. Nothing autoplays, traps your browser, or steals focus.", "TAKE ME TO THE VIDEO ↗"],
  ];
  let stepIndex = 0;
  next.addEventListener("click", () => {
    if (stepIndex < steps.length) {
      const [heading, body, label] = steps[stepIndex];
      title.innerHTML = `${heading.split(" ")[0]}<br><em>${heading.split(" ").slice(1).join(" ")}</em>`;
      copy.textContent = body;
      next.textContent = label;
      stepIndex += 1;
      return;
    }
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank", "noopener,noreferrer");
    toast("PRANK COMPLETE", "You were warned three separate times.");
  });
  exit.addEventListener("click", () => closeWindow(win));
}

function updateMusicDeck() {
  if (!musicDeck || !musicAudio) return;
  const track = musicTracks[musicIndex];
  musicDeck.querySelector("[data-music-title]").textContent = track.title;
  musicDeck.querySelector("[data-music-artist]").textContent = track.artist;
  musicDeck.querySelector("[data-music-play]").textContent = musicAudio.paused ? "PLAY" : "PAUSE";
  musicDeck.querySelector("[data-music-play]").setAttribute("aria-pressed", String(!musicAudio.paused));
  document.querySelectorAll("[data-music-track]").forEach(button => button.classList.toggle("active", Number(button.dataset.musicTrack) === musicIndex));
}

function selectMusicTrack(index, shouldPlay = false) {
  if (!musicAudio) return;
  musicIndex = (index + musicTracks.length) % musicTracks.length;
  const track = musicTracks[musicIndex];
  musicAudio.src = track.src;
  musicAudio.load();
  updateMusicDeck();
  if (shouldPlay) playMusic();
}

function playMusic() {
  if (!musicAudio) return;
  openWindows.forEach(win => pauseProofMedia(win));
  if (!musicAudio.src) selectMusicTrack(musicIndex);
  musicAudio.play().then(() => {
    updateMusicDeck();
    toast("SOUND DECK", `${musicTracks[musicIndex].title} is playing.`);
  }).catch(() => toast("AUDIO BLOCKED", "Tap PLAY again to allow audio in this browser."));
}

function pauseMusic() {
  if (!musicAudio) return;
  musicAudio.pause();
  updateMusicDeck();
}

function toggleMusic() {
  if (!musicAudio) return;
  musicAudio.paused ? playMusic() : pauseMusic();
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
      response = "Opening public results and inspectable proof. Internal company revenue stays private.";
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
  openWindows.forEach(win => {
    pauseProofMedia(win);
    pauseGameMedia(win);
    win.classList.add("minimized");
  });
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

function cyclePortrait() {
  if (!portraitButton || !portraitImage) return;
  portraitIndex = (portraitIndex + 1) % portraitPoses.length;
  const pose = portraitPoses[portraitIndex];
  portraitImage.src = pose.src;
  portraitButton.querySelector("span").textContent = `PLAYER 01 / ${pose.label}`;
  portraitButton.classList.add("secret-revealed");
  document.querySelector("[data-secret-folder]")?.classList.add("revealed");
  toast("POSE CHANGED", `${pose.label}. A hidden file moved into view.`);
}

function revealLearn() {
  document.querySelector("[data-learn-cluster]")?.classList.add("revealed");
  toast("HIDDEN FILE FOUND", "Learn.app was underneath the sticky note.");
}

if (musicDeck && musicAudio) {
  const playButton = musicDeck.querySelector("[data-music-play]");
  const progress = musicDeck.querySelector("[data-music-progress]");
  const volume = musicDeck.querySelector("[data-music-volume]");
  const savedVolume = Number(localStorage.getItem("raj-os-volume") || ".72");
  musicAudio.volume = Number.isFinite(savedVolume) ? Math.max(0, Math.min(1, savedVolume)) : .72;
  volume.value = String(musicAudio.volume);
  playButton.addEventListener("click", toggleMusic);
  musicDeck.querySelector("[data-music-prev]").addEventListener("click", () => selectMusicTrack(musicIndex - 1, true));
  musicDeck.querySelector("[data-music-next]").addEventListener("click", () => selectMusicTrack(musicIndex + 1, true));
  musicDeck.querySelector("[data-music-open]").addEventListener("click", () => openApp("music"));
  progress.addEventListener("input", () => {
    if (musicAudio.duration) musicAudio.currentTime = (Number(progress.value) / 1000) * musicAudio.duration;
  });
  volume.addEventListener("input", () => {
    musicAudio.volume = Number(volume.value);
    localStorage.setItem("raj-os-volume", String(musicAudio.volume));
  });
  musicAudio.addEventListener("timeupdate", () => {
    progress.value = musicAudio.duration ? String(Math.round((musicAudio.currentTime / musicAudio.duration) * 1000)) : "0";
  });
  musicAudio.addEventListener("play", updateMusicDeck);
  musicAudio.addEventListener("pause", updateMusicDeck);
  musicAudio.addEventListener("ended", () => selectMusicTrack(musicIndex + 1, true));
  selectMusicTrack(0);
}

portraitButton?.addEventListener("click", event => {
  event.stopPropagation();
  cyclePortrait();
});

learnSticky?.addEventListener("click", revealLearn);
learnSticky?.addEventListener("pointerdown", event => {
  stickyDrag = { x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY };
  learnSticky.setPointerCapture(event.pointerId);
});
learnSticky?.addEventListener("pointermove", event => {
  if (!stickyDrag) return;
  stickyDrag.x = event.clientX;
  stickyDrag.y = event.clientY;
  const dx = Math.max(-70, Math.min(95, event.clientX - stickyDrag.startX));
  const dy = Math.max(-45, Math.min(85, event.clientY - stickyDrag.startY));
  learnSticky.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(-3deg)`;
  if (Math.abs(dx) + Math.abs(dy) > 38) revealLearn();
});
learnSticky?.addEventListener("pointerup", () => { stickyDrag = null; });

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
