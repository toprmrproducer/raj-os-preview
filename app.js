const proofVideos = [
  { id: "Oe2s8j6JomQ", label: "AI Deployment", type: "Vertical testimonial", duration: "00:39", url: "https://youtube.com/shorts/Oe2s8j6JomQ", story: "A client describes the moment an AI deployment moved from a promising demo into a usable operating workflow." },
  { id: "ktfwr3nOFeU", label: "ROI Consulting", type: "Vertical testimonial", duration: "00:59", url: "https://youtube.com/shorts/ktfwr3nOFeU", story: "A concise account of the strategy, decisions, and commercial thinking behind a consulting engagement." },
  { id: "IIjhViAlMTA", label: "AI Services", type: "Vertical testimonial", duration: "01:05", url: "https://youtube.com/shorts/IIjhViAlMTA", story: "A client voice on delivery quality, responsiveness, and turning a requested AI service into something practical." },
  { id: "9OCD3Udnfs8", label: "Client Voice 04", type: "Client testimonial", duration: "00:44", url: "https://youtu.be/9OCD3Udnfs8", story: "A first-person testimonial preserved as source evidence so visitors can judge the work in the client's own voice." },
  { id: "mtmHkGaE0r0", label: "Client Voice 05", type: "Client testimonial", duration: "01:30", url: "https://youtu.be/mtmHkGaE0r0", story: "A longer client account of the engagement, outcome, and experience of working with the team." },
];

const clientCases = [
  {
    id: "uk-realty",
    company: "UK Realty",
    sector: "REAL ESTATE / INDIA",
    metric: "₹80Cr+",
    metricLabel: "PIPELINE INFLUENCED IN ONE MONTH",
    summary: "A real-estate growth engagement designed to help move premium inventory through a faster, more systematic sales pipeline.",
    outcome: "Shreyas reports that the engagement influenced more than ₹80 crore of property pipeline in one month. This is presented as pipeline influenced—not audited realized revenue.",
    image: "./assets/case-studies/uk-realty.png",
    color: "#f3aaa8"
  },
  {
    id: "investors-propmart",
    company: "Investors Propmart",
    sector: "PARTNER SALES / REAL ESTATE",
    metric: "₹50Cr",
    metricLabel: "PARTNER-CHANNEL PROPERTY PIPELINE",
    summary: "A partner-led distribution system for routing high-value real-estate opportunities through a wider sales network.",
    outcome: "Shreyas reports approximately ₹50 crore of flats were channelled through partner relationships. The figure is a client-case claim pending independent audit.",
    image: "./assets/case-studies/investors-propmart.png",
    color: "#b9dfe8"
  },
  {
    id: "imperium-marketing",
    company: "Imperium Marketing",
    sector: "AI COLD CALLING / UNITED KINGDOM",
    metric: "UK",
    metricLabel: "LOCAL-NUMBER AI OUTBOUND",
    summary: "An AI cold-calling deployment using UK phone numbers to reach, qualify, and route prospective leads.",
    outcome: "The system generated lead conversations for the UK marketing operation. No invented lead count or revenue attribution is shown.",
    image: "./assets/case-studies/imperium-marketing.png",
    color: "#c7f36b"
  }
];

const caseFileSystem = {
  name: "Shreyas OS",
  type: "folder",
  children: [
    {
      name: "Case Studies",
      type: "folder",
      children: [
        {
          name: "Real Estate",
          type: "folder",
          children: clientCases.slice(0, 2).map(item => ({ name: `${item.company}.case`, type: "case", caseId: item.id }))
        },
        {
          name: "Voice AI",
          type: "folder",
          children: [
            { name: "Imperium Marketing.case", type: "case", caseId: "imperium-marketing" },
            { name: "Pan-India CPaaS.case", type: "document", title: "Pan-India CPaaS Voice Layer", copy: "Delivered voice cloning and a multi-provider voice layer with Gemini and Cartesia integration, prompt hardening, voicemail handling, and dashboard work." },
            { name: "Dental Voice Agent.case", type: "document", title: "Dental Voice Agent", copy: "A US-practice workflow demo built and iterated for appointment and enquiry handling. Final client sign-off remains pending." }
          ]
        },
        {
          name: "Websites",
          type: "folder",
          children: [
            { name: "Kawsaypac Preview 3.case", type: "link", url: "https://toprmrproducer.github.io/kawsaypac-preview3/", copy: "Final cinematic commerce preview across a 17-product catalog." },
            { name: "EXTNGO.case", type: "link", url: "https://extngo-cable-385.netlify.app", copy: "Shopify-backed product site for a retractable flat CAT6 cable." },
            { name: "SimpliiGood.case", type: "link", url: "https://simpliigood-spirulina.netlify.app/simplii-green", copy: "Retail-first spirulina experience and education system." },
            { name: "Pawd Store.case", type: "link", url: "https://pawdstore.com", copy: "Live pet-commerce storefront and Shopify implementation." },
            { name: "Try Nokt.case", type: "link", url: "https://trynokt.com", copy: "Live product website from the RapidXAI web portfolio." },
            { name: "Fastcreek AI Studio.case", type: "link", url: "https://fastcreek-creatives.vercel.app", copy: "AI-native creative studio website and conversion system." }
          ]
        },
        {
          name: "Consulting",
          type: "folder",
          children: [
            { name: "Revenue System Audit.read", type: "document", title: "Revenue System Audit", copy: "Constraint discovery, leverage mapping, proof criteria, automation boundaries, and an executable build plan." },
            { name: "Deployment Playbook.read", type: "document", title: "Deployment Playbook", copy: "A five-stage loop: find leverage, lock the system, build the sharp edge, test the full loop, then ship and measure." }
          ]
        }
      ]
    },
    {
      name: "Client Videos",
      type: "folder",
      children: proofVideos.map((video, index) => ({
        name: `${String(index + 1).padStart(2, "0")} — ${video.label}.story`,
        type: "video",
        videoId: video.id,
        title: video.label,
        copy: video.story,
        url: video.url
      }))
    },
    {
      name: "AI Field Notes",
      type: "folder",
      children: [
        { name: "AI Specialist in India.article", type: "link", url: "./blog/ai-specialist-india.html", copy: "How to evaluate an applied AI specialist in India." },
        { name: "AI Specialist in Pune.article", type: "link", url: "./blog/ai-specialist-pune.html", copy: "A local buyer's guide to applied AI delivery in Pune." },
        { name: "AI Agency in Pune.article", type: "link", url: "./blog/ai-agency-pune.html", copy: "What separates a production AI agency from a demo shop." }
      ]
    },
    {
      name: "Services",
      type: "folder",
      children: [
        { name: "AI Voice Agents.service", type: "document", title: "AI Voice Agents", copy: "Conversation design, telephony, prompts, voice, integrations, testing, analytics, and operational handoff." },
        { name: "Premium Websites.service", type: "document", title: "Premium Websites", copy: "Distinctive, responsive systems that explain, convert, and remain maintainable after launch." },
        { name: "AI Consulting.service", type: "document", title: "AI Consulting", copy: "Find the expensive business constraint and turn it into a testable implementation plan." },
        { name: "Production Deployment.service", type: "document", title: "Production Deployment", copy: "Infrastructure, integrations, failure paths, monitoring, and the final mile from prototype to daily use." }
      ]
    }
  ]
};

const learningVideos = [
  { id: "iuZeXR6bgGc", title: "Build & Sell Your Own AI OS With Claude Code (Free Full Build)", url: "https://www.youtube.com/watch?v=iuZeXR6bgGc" },
  { id: "P9A8a9-fZ48", title: "Vapi Made Me Broke. This Made It Free.", url: "https://www.youtube.com/watch?v=P9A8a9-fZ48" },
  { id: "k8F-jAggcBA", title: "I Copied Top AI Gurus' Personal Brand Playbook", url: "https://www.youtube.com/watch?v=k8F-jAggcBA" },
  { id: "lWiesgoPekU", title: "I'm 17 and I Charge $5,000 a Project. Here's How.", url: "https://www.youtube.com/watch?v=lWiesgoPekU" },
  { id: "4IWr1Orc0tQ", title: "Get Your First Client in 14 Days With This AI Website System", url: "https://www.youtube.com/watch?v=4IWr1Orc0tQ" },
  { id: "4HJRVXCg2Wc", title: "How I Got My First Client with 3,600 Cold Calls | AI Agency Uncut Ep. 01", url: "https://www.youtube.com/watch?v=4HJRVXCg2Wc" },
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
    subtitle: "10 SELECTED CASE FILES",
    render: () => `
      <div class="app-content projects-app">
        <span class="app-kicker">SELECTED WORK / 2024—2026</span>
        <h2 class="app-heading">Things that<br><em>actually shipped.</em></h2>
        <p class="app-deck">The portfolio is the point of this operating system: consulting, websites, AI voice infrastructure, operational platforms, and the proof behind them.</p>
        <section class="case-study-overview">
          <img src="./assets/case-studies/systems-map.png" alt="Pixel-art systems map connecting consulting, websites, AI voice agents, deployment infrastructure, and analytics" />
          <div class="service-matrix">
            <article><span>01</span><strong>CONSULTING</strong><p>Find the expensive constraint and turn it into an executable system.</p></article>
            <article><span>02</span><strong>WEBSITES</strong><p>Premium interfaces built to explain, convert, and survive real users.</p></article>
            <article><span>03</span><strong>AI VOICE</strong><p>Voice agents, cloning, telephony, prompts, analytics, and operational handoff.</p></article>
            <article><span>04</span><strong>DEPLOYMENT</strong><p>Infrastructure, integrations, monitoring, and the last mile from demo to use.</p></article>
          </div>
        </section>
        <div class="project-list">
          ${projectCard("01","RapidX Voice Studio","AI Voice Product","A studio for building personas, testing conversations, generating speech, and launching outbound calls. The former public host is offline, so this opens as a documented case file instead of a dead link.","ARCHIVED HOST","VOICE INFRASTRUCTURE","#b9dfe8","")}
          ${projectCard("02","Kawsaypac Preview 3","Premium Commerce","The final cinematic Shopify preview, moving from Cotopaxi to the living forest across a 17-product catalog.","FINAL PREVIEW 3","17 PRODUCT FLOWS","#e3b5a3","https://toprmrproducer.github.io/kawsaypac-preview3/")}
          ${projectCard("03","EXTNGO","Headless Commerce","A Shopify-backed storefront for a retractable flat CAT6 cable, from product states through purchasing flow.","SHOPIFY BACKED","LIVE DEPLOYMENT","#c7f36b","https://extngo-cable-385.netlify.app")}
          ${projectCard("04","Pan-India CPaaS Voice Layer","Delivered AI Voice Infrastructure","Delivered voice cloning and a multi-provider AI voice layer: Gemini and Cartesia integration, prompt hardening, voicemail handling, and dashboard work.","DELIVERED + PAID","ANONYMIZED CASE","#c2b2e9","")}
          ${projectCard("05","V2U Stocks Operations","Platform Infrastructure","Operate and maintain backend infrastructure for a stocks-research platform on an ongoing retainer; its public dashboard expansion is scoped, not claimed as shipped.","ONGOING RETAINER","STATUS: OPERATING","#ffd95a","")}
          ${projectCard("06","Dental Voice Agent","US Practice Workflow Demo","Built and iterated a dental voice-agent demo for a US practice workflow; final client sign-off remains pending.","LIVE DEMO","SIGN-OFF PENDING","#a8d7e8","https://voicedemo.rapidx-ai.org")}
          ${projectCard("07","SimpliiGood","Consumer Brand Website","A retail-first spirulina experience rebuilt around product education and cinematic storytelling.","LIVE WEBSITE","MOBILE QA","#a9e1d2","https://simpliigood-spirulina.netlify.app/simplii-green")}
          ${projectCard("08","Pawd Store","Commerce Website","A live pet-commerce storefront and Shopify implementation from the RapidXAI web portfolio.","LIVE STORE","SHOPIFY BUILD","#f5c5a9","https://pawdstore.com")}
          ${projectCard("09","Try Nokt","Product Website","A live product website shipped inside the RapidXAI web portfolio.","LIVE WEBSITE","PUBLIC BUILD","#d9edc0","https://trynokt.com")}
          ${projectCard("10","Fastcreek AI Studio","Creative AI Website","A live creative-studio web experience combining conversion structure with a distinctive AI-native visual system.","LIVE WEBSITE","PUBLIC BUILD","#f6c1d0","https://fastcreek-creatives.vercel.app")}
        </div>
      </div>`,
  },
  revenue: {
    title: "Client Results — Proof.app",
    chrome: "#c7f36b",
    subtitle: "CLIENT-CASE OUTCOMES",
    render: () => `
      <div class="app-content client-results-app">
        <span class="app-kicker">CLIENT RESULTS / COMMERCIAL CASE FILES</span>
        <h2 class="app-heading">Outcomes for<br><em>the companies.</em></h2>
        <p class="app-deck">These are client engagements, not Shreyas OS revenue. Every number is labelled by what it represents so pipeline, sales, leads, and public proof do not get mixed together.</p>
        <div class="client-case-grid">
          ${clientCases.map(renderClientCase).join("")}
        </div>
        <section class="public-proof-strip" aria-label="Public portfolio evidence">
          ${metric("10","SELECTED CASE FILES","AI voice, websites, operations, consulting, and deployment work.","#d8efaf")}
          ${metric("5","PLAYABLE VIDEOS","Client testimonial videos with direct YouTube sources.","#f8dfa2")}
          ${metric("1.81M","YOUTUBE VIEWS","Recorded channel reach at the latest saved audit.","#c4e5ed")}
        </section>
        <p class="source-note">DISCLOSURE: ₹80Cr+ and ₹50Cr are founder/client-case reports supplied for this portfolio. They describe pipeline or channelled property value, not independently audited realized revenue. Open Case Files for the complete wording.</p>
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
      <div class="app-content journey-app">
        <span class="app-kicker">MY JOURNEY / PUBLIC FILE</span>
        <h2 class="app-heading">Built in chapters.<br><em>Still becoming.</em></h2>
        <p class="app-deck">A deliberately honest public timeline. Where the archive is incomplete, it says so instead of inventing a cleaner story.</p>
        <figure class="journey-map">
          <img src="./assets/case-studies/systems-map.png" alt="Pixel-art map connecting consulting, websites, AI voice agents, deployment infrastructure, and analytics" />
          <figcaption>THE SYSTEMS MAP / CONSULTING → BUILD → DEPLOY → PROVE</figcaption>
        </figure>
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
  files: {
    title: "Case Files — Finder",
    chrome: "#a8d7e8",
    subtitle: "NESTED FOLDERS / DOUBLE-CLICK",
    render: () => renderFileExplorer(),
  },
  blog: {
    title: "AI Field Notes — Blog.app",
    chrome: "#b8a7e8",
    subtitle: "PUNE · INDIA · APPLIED AI",
    render: () => `
      <div class="app-content blog-app">
        <span class="app-kicker">SHREYAS RAJ / AI FIELD NOTES</span>
        <h2 class="app-heading">Useful answers.<br><em>Built from the work.</em></h2>
        <p class="app-deck">No one can honestly guarantee a “number one” Google ranking. This library targets the questions buyers actually ask and backs every claim with projects, methods, and clearly labelled case evidence.</p>
        <div class="blog-card-grid">
          ${blogCard("AI Specialist in India","A practical framework for evaluating an AI specialist in India—technical depth, deployment ownership, proof, and commercial outcomes.","./blog/ai-specialist-india.html","#f3aaa8")}
          ${blogCard("AI Specialist in Pune","What Pune companies should look for in an applied AI partner, from discovery through voice, automation, integrations, and handoff.","./blog/ai-specialist-pune.html","#b9dfe8")}
          ${blogCard("AI Agency in Pune","A buyer's guide to selecting an AI agency in Pune without confusing demos, automations, or vanity metrics for production systems.","./blog/ai-agency-pune.html","#c7f36b")}
        </div>
        <a class="blog-index-link" href="./blog/" target="_blank" rel="noreferrer">OPEN THE COMPLETE AI FIELD NOTES INDEX ↗</a>
        <p class="source-note">SEO NOTE: the pages are static, crawlable, internally linked, authored by Shreyas Raj, and written for humans first. Search position still depends on authority, competition, technical health, and external corroboration.</p>
      </div>`,
  },
  whiteboard: {
    title: "Whiteboard — Notes.app",
    chrome: "#fff8dc",
    subtitle: "DRAG · WRITE · PERSIST",
    render: () => `
      <div class="whiteboard-app" data-whiteboard>
        <header>
          <div><span>SHREYAS OS WHITEBOARD</span><h2>Leave a<br><em>sticky note.</em></h2></div>
          <form data-note-form>
            <label for="sticky-note-copy">YOUR NOTE</label>
            <textarea id="sticky-note-copy" data-note-input maxlength="180" rows="3" placeholder="What should Shreyas build, fix, or remember?" required></textarea>
            <div><button type="submit">+ ADD STICKY</button><button type="button" data-reset-desktop>RESET DESKTOP ICONS</button></div>
          </form>
        </header>
        <div class="whiteboard-canvas" data-note-board aria-label="Draggable sticky notes"></div>
        <footer>NOTES AND ICON POSITIONS PERSIST IN THIS BROWSER · DRAG EACH NOTE BY ITS TOP BAR</footer>
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
    title: "Talk to the AI Voice Agent — Concierge.app",
    chrome: "#9fded4",
    subtitle: "BROWSER VOICE / ONLINE",
    render: () => `
      <div class="voice-agent">
        <header class="voice-agent-hero">
          <img src="./assets/premium-world/voice-lab.png" alt="" />
          <div><span>SHREYAS AI CONCIERGE</span><h2>Talk to the<br><em>AI voice agent.</em></h2><p>Ask about projects, results, systems, testimonials, the journey, or starting a project.</p></div>
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
        <div class="voice-embed-slot" data-dograh-lab>
          <header><div><span>LIVE VOICE AGENT EMBEDS</span><strong>DOGRAH CLOUD / PRODUCTION</strong></div><small data-dograh-status>AGENT 01 SELECTED</small></header>
          <nav aria-label="Voice agent selection">
            <button class="active" type="button" data-dograh-agent="1">AGENT 01</button>
            <button type="button" data-dograh-agent="2">AGENT 02</button>
            <button type="button" data-dograh-agent="3">AGENT 03</button>
            <button type="button" data-dograh-agent="4">AGENT 04</button>
          </nav>
          <iframe data-dograh-frame src="./voice-agents/?agent=1" title="Shreyas production voice agent 01" loading="lazy" allow="microphone"></iframe>
          <p>Each agent runs in an isolated frame so the provider widgets cannot collide. Dograh Cloud is currently under maintenance; the local RAJ OS concierge above remains available.</p>
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
    subtitle: "2 LIVE / LOCAL LEADERBOARDS",
    render: () => `
      <div class="game-room">
        <header>
          <div><span>SHREYAS BUILT THESE</span><h2>Game<br><em>Room.</em></h2></div>
          <nav aria-label="Playable games">
            <button class="active" type="button" data-game-url="./games/viper-arena/" data-game-title="VIPER ARENA">VIPER ARENA</button>
            <button type="button" data-game-url="./games/fangs-io/" data-game-title="FANGS.IO">FANGS.IO</button>
            <button type="button" data-game-all>ALL GAMES</button>
            <button type="button" data-game-fullscreen>FULLSCREEN</button>
            <button type="button" data-game-exit-fullscreen hidden>EXIT FULLSCREEN</button>
          </nav>
        </header>
        <div class="game-stage">
          <div class="game-stage-bar"><strong data-game-now>VIPER ARENA</strong><span>USERNAME · LOADOUT · BOSSES · LOCAL LEADERBOARD · ASMR</span><a href="./games/viper-arena/" data-game-external target="_blank" rel="noreferrer">OPEN FULLSCREEN ↗</a></div>
          <iframe data-game-frame src="./games/viper-arena/" title="VIPER ARENA game" loading="lazy" allow="autoplay; fullscreen"></iframe>
        </div>
        <div class="game-case-files">
          <article><img src="./assets/games/viper-arena.png" alt="Viper Arena gameplay screenshot" /><div><strong>VIPER ARENA</strong><span>FLAGSHIP · BOSSES · LOADOUTS · ASMR · SCORES</span></div></article>
          <article class="fangs-feature"><span class="fangs-art" aria-hidden="true">FANGS.IO</span><div><strong>FANGS.IO</strong><span>PLAYABLE · LOCAL HIGH SCORES</span></div></article>
          <article class="neon-feature"><img src="./assets/games/neon-drift.png" alt="Neon Drift gameplay screenshot" /><div><strong>NEON DRIFT</strong><span>FEATURED CASE FILE · PLAYABLE SOURCE RECOVERY NEXT</span></div></article>
        </div>
      </div>`,
  },
  learn: {
    title: "Learn — YouTube.library",
    chrome: "#e6e35f",
    subtitle: "6 VIDEOS / REAL LIBRARY",
    render: () => `
      <div class="app-content learn-app">
        <span class="app-kicker">SHREYAS RAJ / VIDEO LIBRARY</span>
        <h2 class="app-heading">Learn from the<br><em>actual uploads.</em></h2>
        <p class="app-deck">A direct library of practical builds, agency lessons, voice infrastructure, client acquisition, and personal-brand systems from my YouTube channel.</p>
        ${renderLearningLibrary()}
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
function renderClientCase(item) {
  return `<article class="client-case-card" style="--case:${item.color}" data-case-id="${item.id}">
    <div class="client-case-art"><img src="${item.image}" alt="Editorial pixel-art illustration for the ${item.company} case study" loading="lazy" /></div>
    <div class="client-case-copy">
      <small>${item.sector}</small>
      <h3>${item.company}</h3>
      <div class="client-case-metric"><strong>${item.metric}</strong><span>${item.metricLabel}</span></div>
      <p>${item.summary}</p>
      <details><summary>READ THE OUTCOME</summary><p>${item.outcome}</p></details>
    </div>
  </article>`;
}
function blogCard(title, copy, url, color) {
  return `<article class="blog-card" style="--blog:${color}">
    <small>AI FIELD NOTE / SHREYAS RAJ</small>
    <h3>${title}</h3>
    <p>${copy}</p>
    <a href="${url}" target="_blank" rel="noreferrer">READ ARTICLE ↗</a>
  </article>`;
}
function renderFileExplorer() {
  return `
    <div class="file-explorer" data-file-explorer>
      <header class="finder-toolbar">
        <div class="finder-nav"><button type="button" data-finder-back aria-label="Back">‹</button><button type="button" data-finder-forward aria-label="Forward">›</button></div>
        <strong data-finder-title>Shreyas OS</strong>
        <div class="finder-views" aria-hidden="true"><span>▦</span><span>☷</span><span>▥</span></div>
        <label><span>⌕</span><input type="search" data-finder-search placeholder="Search case files" aria-label="Search case files" /></label>
      </header>
      <div class="finder-shell">
        <aside class="finder-sidebar">
          <strong>FAVOURITES</strong>
          <button type="button" data-finder-path="">⌂ All Files</button>
          <button type="button" data-finder-path="Case Studies">▣ Case Studies</button>
          <button type="button" data-finder-path="Client Videos">▶ Client Videos</button>
          <button type="button" data-finder-path="AI Field Notes">✎ AI Field Notes</button>
          <button type="button" data-finder-path="Services">◆ Services</button>
          <strong>LOCATIONS</strong>
          <button type="button" data-open="projects">◫ Projects</button>
          <button type="button" data-open="revenue">▥ Client Results</button>
        </aside>
        <main class="finder-main">
          <nav class="finder-breadcrumbs" data-finder-breadcrumbs aria-label="Current folder"></nav>
          <div class="finder-list-head"><span>NAME</span><span>KIND</span><span>STATUS</span></div>
          <div class="finder-list" data-finder-list></div>
          <p class="finder-hint">DOUBLE-CLICK A FOLDER OR FILE · SINGLE-CLICK TO PREVIEW</p>
        </main>
        <aside class="finder-preview" data-finder-preview>
          <span class="finder-preview-icon">▣</span>
          <h3>Case Files</h3>
          <p>Select a file to preview its story. Double-click to open folders, source links, videos, and articles.</p>
        </aside>
      </div>
    </div>`;
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
        <div class="proof-story">
          <small>THE STORY BEHIND THIS FILE</small>
          <p data-proof-story>${first.story}</p>
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
            data-proof-story="${video.story}"
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

function renderLearningLibrary() {
  const first = learningVideos[0];
  return `
    <section class="learn-library" data-learn-library>
      <div class="learn-player">
        <iframe
          data-learn-frame
          src="https://www.youtube-nocookie.com/embed/${first.id}?rel=0&modestbranding=1"
          title="${first.title}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <div>
          <strong data-learn-now>${first.title}</strong>
          <a data-learn-external href="${first.url}" target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a>
        </div>
      </div>
      <div class="learn-video-grid">
        ${learningVideos.map((video, index) => `
          <button class="${index === 0 ? "active" : ""}" type="button" data-learn-video="${video.id}" data-learn-title="${video.title}" data-learn-url="${video.url}" aria-pressed="${index === 0 ? "true" : "false"}">
            <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy" />
            <span><small>${String(index + 1).padStart(2, "0")} / VIDEO</small><strong>${video.title}</strong></span>
          </button>
        `).join("")}
      </div>
      <a class="youtube-library-link" href="https://www.youtube.com/@AIwithShreyasRaj/videos" target="_blank" rel="noreferrer">OPEN THE FULL YOUTUBE LIBRARY ↗</a>
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
  if (id === "testimonials" || id === "games" || id === "learn") pauseMusic();
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
  const dograhLab = win.querySelector("[data-dograh-lab]");
  if (dograhLab) bindDograhLab(dograhLab);
  const whiteboard = win.querySelector("[data-whiteboard]");
  if (whiteboard) bindWhiteboard(whiteboard);
  const fileExplorer = win.querySelector("[data-file-explorer]");
  if (fileExplorer) bindFileExplorer(fileExplorer);
  const proofTheater = win.querySelector("[data-proof-theater]");
  if (proofTheater) bindProofTheater(win, proofTheater);
  const learnLibrary = win.querySelector("[data-learn-library]");
  if (learnLibrary) bindLearningLibrary(learnLibrary);
  if (win.querySelector("[data-game-frame]")) bindGameRoom(win);
  if (win.querySelector("[data-ajax-form]")) bindAjaxForms(win);
  if (win.querySelector("[data-prank-app]")) bindPrank(win);
  win.querySelectorAll("[data-music-track]").forEach(button => button.addEventListener("click", () => {
    selectMusicTrack(Number(button.dataset.musicTrack), true);
  }));
}

function bindDograhLab(lab) {
  const frame = lab.querySelector("[data-dograh-frame]");
  const status = lab.querySelector("[data-dograh-status]");
  const buttons = [...lab.querySelectorAll("[data-dograh-agent]")];
  buttons.forEach(button => button.addEventListener("click", () => {
    const agent = button.dataset.dograhAgent;
    buttons.forEach(item => item.classList.toggle("active", item === button));
    frame.src = `./voice-agents/?agent=${agent}`;
    frame.title = `Shreyas production voice agent ${agent.padStart(2, "0")}`;
    status.textContent = `AGENT ${agent.padStart(2, "0")} SELECTED`;
  }));
}

function bindLearningLibrary(library) {
  const frame = library.querySelector("[data-learn-frame]");
  const now = library.querySelector("[data-learn-now]");
  const external = library.querySelector("[data-learn-external]");
  const videos = [...library.querySelectorAll("[data-learn-video]")];
  videos.forEach(button => button.addEventListener("click", () => {
    pauseMusic();
    videos.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    frame.src = `https://www.youtube-nocookie.com/embed/${button.dataset.learnVideo}?autoplay=1&rel=0&modestbranding=1`;
    frame.title = button.dataset.learnTitle;
    now.textContent = button.dataset.learnTitle;
    external.href = button.dataset.learnUrl;
  }));
}

function bindProofTheater(win, theater) {
  const frame = theater.querySelector("[data-proof-frame]");
  const nowPlaying = theater.querySelector("[data-proof-now]");
  const duration = theater.querySelector("[data-proof-duration]");
  const external = theater.querySelector("[data-proof-external]");
  const story = theater.querySelector("[data-proof-story]");
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
    if (story) story.textContent = card.dataset.proofStory;
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
  const enterFullscreen = win.querySelector("[data-game-fullscreen]");
  const exitFullscreen = win.querySelector("[data-game-exit-fullscreen]");
  const allGames = win.querySelector("[data-game-all]");
  const gallery = win.querySelector(".game-case-files");
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
  const syncFullscreen = () => {
    const active = document.fullscreenElement === win;
    enterFullscreen.hidden = active;
    exitFullscreen.hidden = !active;
    win.classList.toggle("game-fullscreen", active);
  };
  enterFullscreen.addEventListener("click", async () => {
    try {
      await win.requestFullscreen();
      syncFullscreen();
    } catch {
      toast("FULLSCREEN BLOCKED", "Use the green window control or open the game in a new tab.");
    }
  });
  exitFullscreen.addEventListener("click", async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    syncFullscreen();
  });
  allGames.addEventListener("click", () => gallery?.scrollIntoView({ behavior: "smooth", block: "start" }));
  document.addEventListener("fullscreenchange", syncFullscreen);
}

function bindFileExplorer(explorer) {
  const list = explorer.querySelector("[data-finder-list]");
  const preview = explorer.querySelector("[data-finder-preview]");
  const breadcrumbs = explorer.querySelector("[data-finder-breadcrumbs]");
  const title = explorer.querySelector("[data-finder-title]");
  const search = explorer.querySelector("[data-finder-search]");
  const back = explorer.querySelector("[data-finder-back]");
  const forward = explorer.querySelector("[data-finder-forward]");
  let path = [];
  let backStack = [];
  let forwardStack = [];

  const findNode = nextPath => nextPath.reduce((node, segment) => node?.children?.find(item => item.name === segment), caseFileSystem);
  const iconFor = node => node.type === "folder" ? "▣" : node.type === "video" ? "▶" : node.type === "link" ? "↗" : node.type === "case" ? "◆" : "▤";
  const kindFor = node => ({
    folder: "Folder",
    case: "Client case file",
    video: "Video story",
    link: "Web link",
    document: "Read-only document"
  }[node.type] || "File");

  const showPreview = node => {
    const clientCase = node.caseId ? clientCases.find(item => item.id === node.caseId) : null;
    preview.replaceChildren();
    if (clientCase) {
      const image = document.createElement("img");
      image.src = clientCase.image;
      image.alt = `${clientCase.company} case-study art`;
      const heading = document.createElement("h3");
      heading.textContent = clientCase.company;
      const metric = document.createElement("strong");
      metric.textContent = `${clientCase.metric} · ${clientCase.metricLabel}`;
      const copy = document.createElement("p");
      copy.textContent = clientCase.outcome;
      preview.append(image, heading, metric, copy);
      return;
    }
    const glyph = document.createElement("span");
    glyph.className = "finder-preview-icon";
    glyph.textContent = iconFor(node);
    const heading = document.createElement("h3");
    heading.textContent = node.title || node.name;
    const copy = document.createElement("p");
    copy.textContent = node.copy || (node.type === "folder" ? `${node.children?.length || 0} items inside this folder.` : "Double-click to open this file.");
    preview.append(glyph, heading, copy);
    if (node.type === "video") {
      const image = document.createElement("img");
      image.src = `https://i.ytimg.com/vi/${node.videoId}/hqdefault.jpg`;
      image.alt = "";
      preview.prepend(image);
    }
  };

  const openNode = node => {
    if (node.type === "folder") {
      navigate([...path, node.name]);
      return;
    }
    if (node.caseId) {
      openApp("revenue");
      toast("CASE FILE OPEN", `${node.name} is available in Client Results.`);
      return;
    }
    if (node.url) {
      window.open(node.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (node.type === "video") {
      window.open(node.url, "_blank", "noopener,noreferrer");
      return;
    }
    showPreview(node);
  };

  const renderRows = (items, query = "") => {
    const matches = items.filter(node => node.name.toLowerCase().includes(query.toLowerCase()));
    list.replaceChildren();
    matches.forEach(node => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "finder-row";
      row.innerHTML = `<span><i>${iconFor(node)}</i><strong>${node.name}</strong></span><span>${kindFor(node)}</span><span>${node.type === "folder" ? `${node.children?.length || 0} ITEMS` : "READY"}</span>`;
      row.addEventListener("click", () => {
        list.querySelectorAll(".finder-row").forEach(item => item.classList.toggle("selected", item === row));
        showPreview(node);
      });
      row.addEventListener("dblclick", () => openNode(node));
      list.append(row);
    });
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "finder-empty";
      empty.textContent = "No files match this search.";
      list.append(empty);
    }
  };

  const render = () => {
    const node = findNode(path) || caseFileSystem;
    title.textContent = node.name;
    breadcrumbs.replaceChildren();
    ["Shreyas OS", ...path].forEach((segment, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = segment;
      button.addEventListener("click", () => navigate(path.slice(0, index)));
      breadcrumbs.append(button);
    });
    renderRows(node.children || [], search.value);
    back.disabled = !backStack.length;
    forward.disabled = !forwardStack.length;
  };

  function navigate(nextPath, record = true) {
    if (!findNode(nextPath)) return;
    if (record) {
      backStack.push(path);
      forwardStack = [];
    }
    path = nextPath;
    search.value = "";
    render();
  }

  back.addEventListener("click", () => {
    if (!backStack.length) return;
    forwardStack.push(path);
    path = backStack.pop();
    render();
  });
  forward.addEventListener("click", () => {
    if (!forwardStack.length) return;
    backStack.push(path);
    path = forwardStack.pop();
    render();
  });
  search.addEventListener("input", () => render());
  explorer.querySelectorAll("[data-finder-path]").forEach(button => button.addEventListener("click", () => {
    const next = button.dataset.finderPath ? [button.dataset.finderPath] : [];
    navigate(next);
  }));
  render();
}

function bindWhiteboard(boardApp) {
  const storageKey = "raj-os-whiteboard-v1";
  const board = boardApp.querySelector("[data-note-board]");
  const form = boardApp.querySelector("[data-note-form]");
  const input = boardApp.querySelector("[data-note-input]");
  const colors = ["#fff38a", "#f7b5cc", "#b9e4f0", "#c7f36b", "#d5c8f4"];
  let notes;
  try {
    notes = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(notes)) notes = [];
  } catch {
    notes = [];
  }

  const save = () => localStorage.setItem(storageKey, JSON.stringify(notes.slice(0, 24)));
  const render = () => {
    board.replaceChildren();
    notes.forEach(note => {
      const card = document.createElement("article");
      const grip = document.createElement("button");
      const area = document.createElement("textarea");
      const remove = document.createElement("button");
      card.className = "board-note";
      card.style.left = `${note.x}px`;
      card.style.top = `${note.y}px`;
      card.style.background = note.color;
      card.style.transform = `rotate(${note.rotation}deg)`;
      grip.type = "button";
      grip.className = "note-grip";
      grip.textContent = "DRAG NOTE";
      grip.setAttribute("aria-label", "Drag sticky note");
      area.value = note.text;
      area.maxLength = 180;
      area.setAttribute("aria-label", "Sticky note text");
      remove.type = "button";
      remove.className = "note-delete";
      remove.textContent = "×";
      remove.setAttribute("aria-label", "Delete sticky note");
      card.append(grip, area, remove);
      board.append(card);

      area.addEventListener("input", () => {
        note.text = area.value;
        save();
      });
      remove.addEventListener("click", () => {
        notes = notes.filter(item => item.id !== note.id);
        save();
        render();
      });
      grip.addEventListener("pointerdown", event => {
        event.stopPropagation();
        grip.setPointerCapture(event.pointerId);
        const start = { x: event.clientX, y: event.clientY, left: note.x, top: note.y };
        const move = moveEvent => {
          const maxX = Math.max(0, board.clientWidth - card.offsetWidth);
          const maxY = Math.max(0, board.clientHeight - card.offsetHeight);
          note.x = Math.max(0, Math.min(maxX, start.left + moveEvent.clientX - start.x));
          note.y = Math.max(0, Math.min(maxY, start.top + moveEvent.clientY - start.y));
          card.style.left = `${note.x}px`;
          card.style.top = `${note.y}px`;
        };
        const end = () => {
          grip.removeEventListener("pointermove", move);
          save();
        };
        grip.addEventListener("pointermove", move);
        grip.addEventListener("pointerup", end, { once: true });
        grip.addEventListener("pointercancel", end, { once: true });
      });
    });
  };

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const index = notes.length;
    notes.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      x: 18 + (index % 4) * 155,
      y: 18 + (index % 3) * 128,
      color: colors[index % colors.length],
      rotation: [-2, 1, -1, 2][index % 4],
    });
    input.value = "";
    save();
    render();
  });

  boardApp.querySelector("[data-reset-desktop]").addEventListener("click", () => {
    localStorage.removeItem("raj-os-desktop-layout-v1");
    document.querySelectorAll(".desktop-app").forEach(button => {
      button.style.removeProperty("transform");
      button.classList.remove("arranged");
    });
    toast("DESKTOP RESET", "Application icons returned to their original grid.");
  });
  render();
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
  musicDeck.querySelector("[data-music-play]").textContent = musicAudio.paused ? "▶ PLAY" : "❚❚ PAUSE";
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

function setDailyMotivation() {
  const quotes = [
    "BUILD THE THING YOU KEEP WISHING EXISTED.",
    "YOUR NEXT CLIENT NEEDS PROOF, NOT ANOTHER PROMISE.",
    "SHIP THE HARD PART FIRST. POLISH WHAT SURVIVES.",
    "LEVERAGE BEGINS WHERE REPETITIVE WORK ENDS.",
    "MAKE THE SYSTEM STRONG ENOUGH TO WORK WITHOUT YOU.",
    "THE PORTFOLIO IS THE RECEIPT. KEEP SHIPPING.",
    "CONSISTENCY LOOKS BORING UNTIL IT BECOMES UNFAIR.",
  ];
  const today = new Date();
  const index = Math.floor(today.getTime() / 86400000) % quotes.length;
  const quote = document.querySelector("[data-motivation-quote]");
  const date = document.querySelector("[data-motivation-date]");
  if (quote) quote.textContent = quotes[index];
  if (date) date.textContent = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(today).toUpperCase();
}

function bindIdentityMorph() {
  const label = document.querySelector("[data-identity-morph]");
  if (!label) return;
  const identities = ["SHREYAS RAJ OS", "AI SYSTEMS OPERATOR", "VOICE + WEB BUILDER", "SHREYAS RAJ OS"];
  let index = 0;
  window.setInterval(() => {
    label.classList.remove("spring-in");
    label.classList.add("spring-out");
    window.setTimeout(() => {
      index = (index + 1) % identities.length;
      label.textContent = identities[index];
      label.classList.remove("spring-out");
      label.classList.add("spring-in");
    }, 220);
  }, 3200);
}

function bindDesktopArrangement() {
  const storageKey = "raj-os-desktop-layout-v1";
  let layout;
  try {
    layout = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (!layout || typeof layout !== "object") layout = {};
  } catch {
    layout = {};
  }
  const save = () => localStorage.setItem(storageKey, JSON.stringify(layout));
  document.querySelectorAll(".desktop-app[data-open]").forEach(button => {
    const id = button.dataset.open;
    const saved = layout[id];
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      button.style.transform = `translate3d(${saved.x}px, ${saved.y}px, 0)`;
      button.classList.add("arranged");
    }
    let drag = null;
    let suppressClick = false;
    button.addEventListener("pointerdown", event => {
      if (window.innerWidth <= 760 || event.button !== 0) return;
      const current = layout[id] || { x: 0, y: 0 };
      drag = { startX: event.clientX, startY: event.clientY, x: current.x, y: current.y, moved: false };
      button.setPointerCapture(event.pointerId);
    });
    button.addEventListener("pointermove", event => {
      if (!drag) return;
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (Math.abs(dx) + Math.abs(dy) < 7 && !drag.moved) return;
      drag.moved = true;
      const x = Math.max(-520, Math.min(520, drag.x + dx));
      const y = Math.max(-280, Math.min(470, drag.y + dy));
      layout[id] = { x, y };
      button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      button.classList.add("arranged", "dragging");
    });
    const end = () => {
      if (!drag) return;
      suppressClick = drag.moved;
      button.classList.remove("dragging");
      if (drag.moved) save();
      drag = null;
      setTimeout(() => { suppressClick = false; }, 0);
    };
    button.addEventListener("pointerup", end);
    button.addEventListener("pointercancel", end);
    button.addEventListener("click", event => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  });
}

function bindMovableWidgets() {
  const storageKey = "raj-os-widget-layout-v1";
  let layout;
  try {
    layout = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (!layout || typeof layout !== "object") layout = {};
  } catch {
    layout = {};
  }
  document.querySelectorAll("[data-movable-widget]").forEach(widget => {
    const id = widget.dataset.movableWidget;
    const saved = layout[id];
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) widget.style.translate = `${saved.x}px ${saved.y}px`;
    let drag = null;
    widget.addEventListener("pointerdown", event => {
      if (window.innerWidth <= 900 || event.button !== 0 || event.target.closest("button,a,input,textarea")) return;
      const current = layout[id] || { x: 0, y: 0 };
      drag = { x: event.clientX, y: event.clientY, left: current.x, top: current.y };
      widget.setPointerCapture(event.pointerId);
      widget.classList.add("widget-dragging");
    });
    widget.addEventListener("pointermove", event => {
      if (!drag) return;
      const x = Math.max(-700, Math.min(700, drag.left + event.clientX - drag.x));
      const y = Math.max(-500, Math.min(500, drag.top + event.clientY - drag.y));
      layout[id] = { x, y };
      widget.style.translate = `${x}px ${y}px`;
    });
    const stop = () => {
      if (!drag) return;
      drag = null;
      widget.classList.remove("widget-dragging");
      localStorage.setItem(storageKey, JSON.stringify(layout));
    };
    widget.addEventListener("pointerup", stop);
    widget.addEventListener("pointercancel", stop);
  });
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
setDailyMotivation();
bindIdentityMorph();
bindDesktopArrangement();
bindMovableWidgets();

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
