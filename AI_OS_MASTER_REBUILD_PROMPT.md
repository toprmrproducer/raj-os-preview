# The Personal AI Operating System
## 50-Part Master Rebuild and Personalization Prompt

Version: 1.0  
Reference implementation: Shreyas Raj OS  
Purpose: give this entire document to a capable coding agent to rebuild the portfolio operating system for any person, profession, studio, agency, or founder.

---

# HOW TO USE THIS MASTER PROMPT

You are the principal product designer, frontend architect, content strategist, interaction designer, accessibility engineer, QA lead, and deployment engineer for a premium personal portfolio that behaves like an operating system.

Your job is not to make a conventional landing page with an OS-inspired visual theme. Your job is to build a complete, interactive, single-page personal operating system in which the visitor explores the owner’s work through applications, files, windows, folders, a dock, system controls, a browser, a whiteboard, media, proof, case studies, contact tools, and optional experiments.

Treat every instruction below as part of one continuous product specification. Do not truncate the specification. Do not replace implementation with a plan. Do not return a mockup without functional interactions. Ask the onboarding questions first, summarize the answers, resolve contradictions, then build, test, and prepare the project for deployment.

The result must feel:

- premium, authored, and specific to the owner;
- unmistakably like a working personal desktop;
- highly readable on desktop, tablet, and phone;
- responsive by reflowing the OS instead of shrinking it;
- useful as a portfolio before it is playful;
- fast and satisfying to operate;
- honest about proof, metrics, and client outcomes;
- safe to publish and easy for the owner to maintain.

The result must not feel:

- like a generic SaaS landing page;
- like a Pokémon, GBA, or game clone;
- like a collection of unrelated visual gimmicks;
- like a pile of tiny pixel text;
- like a dashboard template;
- like an imitation of macOS or Windows using copyrighted assets;
- like an unverified collection of inflated marketing claims;
- like a demo that only works at one viewport size.

Do not begin implementation until the required onboarding interview has been completed or the owner explicitly tells you to use clearly marked placeholders.

---

# PART 01 — REQUIRED ONBOARDING INTERVIEW

Ask these questions in a clean, numbered interview. Ask no more than ten questions at a time. Store every answer in one structured `ownerProfile` object. If the owner skips a question, mark it `TBD`; do not silently invent an answer.

## Identity

1. What is your full public name?
2. What short name, studio name, or operating-system name should appear in the nav?
3. What domain will host the website?
4. What city and country should be associated with your public profile?
5. Which pronouns should the site use?
6. What is your profession in plain language?
7. What is your strongest professional positioning in one sentence?
8. What three to six roles describe you? Example: founder, operator, AI builder, designer, filmmaker.
9. What should the opening headline say?
10. What should the sentence below the headline say?

## Commercial focus

11. What are the three most important services or products you want to sell?
12. What action should the primary call to action trigger?
13. What action should the secondary call to action trigger?
14. What kind of client, employer, partner, or audience is the ideal visitor?
15. What should a qualified visitor understand within ten seconds?
16. What should a qualified visitor do within sixty seconds?
17. Do you have a Calendly, Cal.com, booking, WhatsApp, phone, or email link?
18. Is there an emergency or fast-response contact channel?
19. What time zone and availability should the system display?
20. What should “Build this OS for yourself” link to?

## Work and proof

21. List every project that may appear publicly.
22. For each project, provide its name, URL, dates, client, category, problem, work, result, screenshots, and disclosure constraints.
23. Which projects are selected case studies?
24. Which metrics are verifiable?
25. Which metrics are founder-reported, client-reported, estimated, or illustrative?
26. Which client names may be published?
27. Which client logos may be used?
28. Which results need a source note or qualification?
29. Which testimonials may be embedded?
30. Which YouTube videos, audio clips, articles, or documents should be included?

## Personal story

31. What year should the journey begin?
32. What were the five to ten turning points?
33. Which failures or lessons can be discussed publicly?
34. What achievements matter beyond revenue?
35. What hobbies or personal interests are relevant?
36. Should the site include a stylized portrait or sprite?
37. Provide source photos for any portrait generation.
38. What should the daily motivation card communicate?
39. What makes your working method distinctive?
40. What should `Founder.txt` say?

## Social and content

41. Provide the canonical YouTube channel.
42. Provide Instagram, X, GitHub, newsletter, podcast, and other public profiles.
43. Explicitly state which networks should not appear.
44. Did any account move, get banned, or change handles?
45. Which videos should appear in the Learn library?
46. Which videos are testimonials?
47. Which articles should be indexed by search engines?
48. Which search phrases are strategically important?
49. Who will approve factual claims?
50. Who will maintain the content after launch?

## Visual direction

51. Pick three adjectives for the visual system.
52. Pick one primary color, one accent color, and one neutral.
53. Should the site support Day, Night, and Dark modes?
54. Should the visual language be pixel-editorial, minimal, industrial, playful, luxury, or another style?
55. Which reference websites or screenshots capture the desired quality?
56. What should be avoided?
57. Should windows have square or rounded corners?
58. Should desktop icons be custom illustrations, simplified glyphs, or photographs?
59. Should the name use a serif, mono, grotesk, pixel, or custom display style?
60. What minimum text size feels comfortable to the owner on a phone?

## Technical and deployment

61. Is this a static site or does it need a backend?
62. Where will it be hosted?
63. Which repository should receive the code?
64. Which domain and DNS provider are used?
65. Are forms handled by Netlify, Formspree, Supabase, email, or another provider?
66. Is visitor data allowed to persist in local storage?
67. Does the project need analytics?
68. Does it need a consent banner?
69. Which third-party scripts or embeds are approved?
70. What is the launch deadline?

After receiving the answers, produce a short “Build Contract” that includes:

- owner identity;
- business objective;
- primary audience;
- primary conversion;
- approved proof;
- prohibited claims;
- required applications;
- required media;
- required integrations;
- visual direction;
- deployment target;
- unresolved items.

Ask the owner to approve that contract before implementation.

---

# PART 02 — OWNER PROFILE DATA CONTRACT

Create one canonical data module. Content must not be scattered through event handlers and markup. Use a shape equivalent to:

```js
export const ownerProfile = {
  identity: {
    fullName: "",
    shortName: "",
    osName: "",
    domain: "",
    location: "",
    timezone: "",
    roles: [],
    headline: "",
    intro: "",
    portrait: "",
    sprite: ""
  },
  conversion: {
    primaryLabel: "",
    primaryUrl: "",
    secondaryLabel: "",
    secondaryUrl: "",
    bookingUrl: "",
    whatsappUrl: "",
    email: "",
    emergencyLabel: ""
  },
  metrics: [],
  projects: [],
  clientCases: [],
  testimonials: [],
  journey: [],
  achievements: [],
  services: [],
  videos: [],
  music: [],
  socials: [],
  articles: [],
  themes: {},
  legal: {
    copyrightOwner: "",
    assetLicenses: [],
    metricDisclaimer: ""
  }
};
```

Every metric must carry:

```js
{
  value: "₹80Cr+",
  label: "pipeline influenced",
  status: "client-reported",
  source: "approved case-study note",
  public: true,
  lastVerified: "YYYY-MM-DD"
}
```

Permitted status values:

- `verified`;
- `client-reported`;
- `founder-reported`;
- `estimated`;
- `illustrative`;
- `private`.

Never render a `private` metric. Always show a compact disclosure for estimated, founder-reported, or client-reported outcomes.

---

# PART 03 — PRODUCT PRINCIPLE: AN OS, NOT A LANDING PAGE

The homepage is a single desktop environment. It contains a persistent system nav, wallpaper, applications, movable elements, a dock, a media control surface, system mode controls, and a window layer.

Opening an application must not scroll the visitor to an ordinary marketing section. It must open a window, panel, sheet, or full-screen app within the OS.

The desktop should communicate the portfolio even before an application is opened:

- owner identity;
- professional positioning;
- selected apps;
- primary call to action;
- proof summary;
- current availability;
- recognizable portrait or brand mark;
- visible system affordances.

Applications must reveal deeper information:

- Projects;
- Results;
- Systems;
- Proof;
- Journey;
- Socials;
- AI Voice Agent;
- Founder.txt;
- Whiteboard;
- Browser;
- Contact;
- Case Files;
- AI Field Notes.

Optional apps may include Learn, Achievements, Team, Music, Experiments, Character Configuration, or Games. Optional apps must not distract from the owner’s work.

---

# PART 04 — INFORMATION HIERARCHY

Use this priority order:

1. Owner name and profession.
2. Portfolio and project work.
3. Verifiable outcomes.
4. Working method.
5. Testimonials and public proof.
6. Contact and booking.
7. Voice agents and live product demonstrations.
8. Journey and personal narrative.
9. Social/content library.
10. Playful extras.

If the screen is crowded, remove or defer lower-priority elements before reducing type below the readability floor.

---

# PART 05 — DESKTOP SHELL

Build an edge-to-edge desktop with no unexplained bottom band. The wallpaper must reach all physical viewport edges beneath the nav.

Desktop shell requirements:

- occupy `100dvh`;
- use `position: fixed` or an equivalent stable shell;
- account for safe areas;
- avoid accidental body scrolling on desktop;
- provide internal scrolling on mobile;
- maintain correct z-index layers;
- preserve theme colors when windows open;
- keep the dock and music player above the wallpaper;
- keep windows above apps and below critical system overlays;
- avoid content being hidden behind fixed controls.

Recommended layer model:

```txt
0000 wallpaper
0100 environmental details
0200 portrait and decoration
0300 desktop identity
0400 application icons
0500 sticky widgets
1000 window layer
4500 system windows
5400 command palette
5500 dock
5600 music controls
5700 active drag object
9000 boot screen
```

---

# PART 06 — SYSTEM NAVIGATION

The nav should resemble a compact system bar. It should not resemble a conventional marketing navbar.

Required nav content:

- sprite or owner mark;
- OS name;
- Work;
- Proof;
- Journey;
- Search;
- Day, Night, Dark switch;
- availability indicator;
- signal mark;
- current date;
- current local time;
- time zone.

Desktop nav text should normally be at least 12 CSS pixels in a highly legible face. Phone nav text should normally be at least 11 to 13 CSS pixels. If space is limited, hide secondary items instead of shrinking them.

The nav must never overlap Daily Transmission or another desktop widget. Give the desktop an explicit top inset equal to the nav height.

---

# PART 07 — BOOT EXPERIENCE

Provide a short, skippable boot experience.

The boot screen should:

- show the owner sprite or mark rather than generic initials;
- say that the portfolio is loading;
- mention projects, case studies, proof, voice, and media;
- display the OS version;
- contain a visible Skip Boot button;
- complete automatically;
- respect reduced-motion preference;
- never block the site indefinitely;
- avoid autoplaying sound;
- remain readable on a phone.

Store a session flag so repeat visitors can see a shortened boot. Do not make the intro longer than the content it introduces.

---

# PART 08 — IDENTITY MODULE

The identity block includes:

- a welcome line containing the canonical domain;
- an eyebrow describing the owner’s roles;
- a prominent full name;
- a morphing system descriptor;
- one concise positioning statement;
- a portfolio button;
- a project or booking button.

The name must feel authored. Use the approved display direction. For a technical owner, prefer a strong mono or engineered grotesk rather than an ornamental editorial face unless the owner explicitly requests the latter.

The morphing descriptor may rotate through phrases such as:

- `[NAME] OS`;
- `AI SYSTEMS OPERATOR`;
- `VOICE + WEB BUILDER`;
- `FOUNDER MODE: ACTIVE`.

Animate the descriptor with a small spring or font-shift effect. The text must remain available to assistive technology and must not change so rapidly that it becomes distracting.

---

# PART 09 — DAILY TRANSMISSION

Daily Transmission is a movable desktop widget, not a live-activity feed.

It must contain:

- current date;
- one motivational statement;
- a visible “Add a Quick Sticky” action;
- an OS label;
- a small status indicator.

The statement can change daily from a curated array. Avoid generic hustle clichés. The widget must sit below the nav and must become a normal block in the phone layout.

The quick-sticky action opens the Whiteboard app directly.

---

# PART 10 — APPLICATION ICON SYSTEM

Create an original icon family with one consistent visual grammar.

Every icon must share:

- canvas size;
- visual weight;
- outline weight;
- highlight direction;
- shadow direction;
- palette;
- pixel density or illustration style;
- label treatment.

Icons should be professional and clean, not over-rendered fantasy objects unless that style is explicitly approved.

Each desktop app includes:

- icon;
- strong app name;
- one-line description;
- optional badge such as `MAIN DRIVE` or `PROOF VAULT`;
- hover state;
- open indicator;
- accessible button name.

Do not render descriptions below 13 CSS pixels on desktop or 14 CSS pixels on phone. Use fewer columns when necessary.

---

# PART 11 — DESKTOP ARRANGEMENT

Allow application icons to be rearranged with pointer dragging on large screens.

Requirements:

- use pointer events;
- support mouse and pen;
- avoid hijacking normal vertical scrolling on touch devices;
- persist positions in local storage;
- provide Reset Desktop Icons in Settings or Whiteboard;
- keep moved items within the visible desktop bounds;
- elevate the dragged item;
- add a clear grab/grabbing cursor;
- preserve keyboard operation for opening apps;
- never make dragging the only way to use an application.

On phones, disable free dragging by default and use a predictable grid.

---

# PART 12 — WINDOW MANAGER

Build a small window manager with:

- open;
- close;
- focus;
- z-index promotion;
- drag by title bar;
- maximize or full-screen;
- restore;
- optional minimize;
- internal scroll;
- responsive phone sheet.

Each window requires:

- three visible controls;
- application title;
- optional state text;
- scrollable body;
- keyboard focus management;
- Escape behavior;
- correct ARIA dialog semantics where appropriate.

On phone, windows should become nearly full-screen sheets with 4 to 8 pixels of outer space. The window body must remain readable and scroll independently above the dock and media controls.

---

# PART 13 — PROJECTS APP

Projects is the main drive and the primary portfolio destination.

The Projects app must:

- open by clicking Enter the Portfolio;
- present selected case files before secondary experiments;
- support at least six to ten projects;
- show category, role, dates, problem, build, outcome, and URL;
- distinguish live links from archived work;
- show screenshots or branded case imagery;
- never use broken links;
- use honest result language;
- allow a visitor to open a detailed case.

Project schema:

```js
{
  id: "",
  name: "",
  client: "",
  category: "",
  dates: "",
  role: "",
  problem: "",
  intervention: "",
  outcome: "",
  outcomeStatus: "verified",
  url: "",
  repository: "",
  image: "",
  stack: [],
  services: [],
  featured: true
}
```

Prioritize real deployed work over visual experiments.

---

# PART 14 — RESULTS APP

Results must show company/client outcomes, not a vanity page about the owner.

Each case result must include:

- client or anonymized category;
- challenge;
- delivered system;
- metric;
- metric disclosure;
- compact narrative;
- image;
- external link when available.

Example structure:

```txt
UK Realty
₹80Cr+ pipeline influenced in one month
Client-reported case outcome
AI systems, marketing infrastructure, and operating support
```

If a result cannot be verified, label it. Never present pipeline as realized revenue. Never imply causation when the system only influenced or assisted an outcome.

---

# PART 15 — CASE-STUDY VISUALS

Generate a bespoke visual for each flagship case study.

Visual requirements:

- original composition;
- no unauthorized client logo;
- readable at card size;
- consistent palette;
- no embedded fake metrics;
- no illegible AI-generated text;
- export in a modern image format;
- include descriptive alt text;
- use `object-fit: contain` when the illustration should remain complete;
- retain enough negative space for a premium layout.

Before publishing, inspect every generated image at actual rendered size.

---

# PART 16 — SYSTEMS APP

Systems explains how the owner works.

Recommended operating loop:

1. Find the leverage.
2. Lock the system.
3. Build the sharp edge.
4. Integrate the workflow.
5. Prove and hand off.

For each step explain:

- purpose;
- owner responsibility;
- client responsibility;
- artifact produced;
- validation gate;
- common failure mode.

Avoid vague phrases such as “we innovate.” Show the actual operating method.

---

# PART 17 — PROOF APP

Proof is a video-first testimonial vault.

Requirements:

- actual approved video embeds;
- thumbnail;
- title;
- duration;
- client/category label;
- story context;
- canonical external URL;
- expand/cinema mode;
- close and exit-full-screen control;
- loading state;
- privacy-friendly embedding where practical.

Do not invent testimonial names, titles, or results. A joke or placeholder video must be clearly marked and removed before launch.

---

# PART 18 — VIDEO STORY LAYER

Every proof video should include a short case-story layer:

- who the work was for;
- what constraint existed;
- what was built;
- what changed;
- what the viewer should listen for;
- link to the related project or case file.

Keep the story separate from the client’s spoken words. Do not rewrite a testimonial as a fabricated quote.

---

# PART 19 — JOURNEY APP

Journey is a chronological, visual narrative.

Each milestone contains:

- year or date;
- title;
- short story;
- image or artifact;
- skill or operating-system upgrade;
- optional related project.

The journey must communicate progression rather than a résumé dump. Include meaningful failures when approved. Use a clear vertical timeline on phone.

---

# PART 20 — ACHIEVEMENTS APP

Achievements can use a game-like vault without becoming childish.

Achievement categories:

- audience;
- attention;
- shipped work;
- client proof;
- founder milestone;
- technical milestone;
- personal discipline;
- community.

Every badge needs a plain-language explanation. Avoid meaningless counts. Never imply a credential that was not earned.

---

# PART 21 — SOCIALS APP

Socials should document public work and distribution.

For each network show:

- network name;
- current handle;
- relevant metric;
- purpose;
- external URL;
- status.

If an account was banned or replaced, the owner may show a short human note and the active backup account. Do not include LinkedIn if the owner says they do not use LinkedIn.

Use original gamified icons only if they remain clean and readable.

---

# PART 22 — LEARN APP

Learn is the owner’s YouTube/video library.

It must:

- use real thumbnails;
- group videos by topic;
- open a selected video;
- show title and description;
- link to the canonical channel;
- work without autoplay;
- expose keyboard controls;
- remain usable if third-party embeds fail.

Learn is not a generic education marketplace. It is the owner’s public knowledge library.

---

# PART 23 — AI VOICE AGENT APP

The label should be “AI Voice Agent” or “Talk to the AI Voice Agent,” not “Talk to [Owner]” unless a real owner voice clone is intentionally deployed and disclosed.

Requirements:

- clear agent identity;
- clear purpose;
- approved third-party embed;
- loading state;
- maintenance/offline state;
- fallback contact action;
- privacy note;
- no secret API key in client code;
- multiple agents organized as separate demonstrations when provided.

If a vendor supplies script embeds, give each agent a unique mount target or separate route so duplicate script IDs do not collide.

---

# PART 24 — FOUNDER.TXT

Create a notepad-style personal note.

Suggested structure:

- who I am;
- what I build;
- why I care;
- how I work;
- what I am currently exploring;
- who I want to work with;
- what I refuse to compromise;
- contact.

Use the owner’s voice. Avoid generic founder mythology.

---

# PART 25 — WHITEBOARD AND STICKY NOTES

Visitors can add, edit, move, and delete sticky notes.

Whiteboard requirements:

- visible note input;
- Add Sticky button;
- maximum safe note length;
- multiple color choices;
- draggable notes;
- editable text areas;
- delete control;
- local-storage persistence;
- board bounds;
- reset action;
- touch-friendly controls;
- no network transmission unless explicitly approved.

Tell visitors where the note is stored. If it is local-only, do not imply that the owner will receive it. If the owner needs incoming messages, use the Contact app instead.

---

# PART 26 — BROWSER APP

The Browser app is an internal portfolio browser called something owner-specific, such as RajNet.

It can:

- navigate approved project URLs;
- show bookmarks;
- open external links in a new tab;
- display a URL field;
- provide back, forward, refresh, and home controls;
- explain cross-origin iframe limitations.

Do not claim that arbitrary websites can be fully embedded when their security headers prevent framing.

---

# PART 27 — CONTACT APP

Contact must optimize for real conversion.

Include:

- booking action;
- WhatsApp or phone action when approved;
- email-copy action;
- service list;
- compact project brief form;
- name;
- email;
- desired build;
- budget or operating range if appropriate;
- timeline;
- current stack or context;
- success definition.

Provide a clear success state and fallback email route. Protect forms with honeypot or platform spam controls.

---

# PART 28 — FOLDED-CORNER CALL TAB

Create an OS-native call prompt in the physical bottom-right corner.

Desktop behavior:

- a triangular folded corner;
- dark outer layer;
- brand-color inner fold;
- diagonal edge;
- legible “Want this for yourself?”;
- legible “Book a call”;
- direct booking link;
- no oversized floating banner.

Phone behavior:

- convert the fold into a full-width call card in normal document flow;
- do not rotate tiny text;
- do not cover the dock or media controls;
- preserve a minimum 44-pixel touch target.

---

# PART 29 — EMERGENCY CONTACT

Emergency contact means rapid business implementation, not a life-safety service.

Label it clearly:

- `SOS`;
- `REACH [OWNER] NOW`;
- `URGENT BUSINESS IMPLEMENTATION`;
- WhatsApp;
- phone.

Do not create confusion with medical or public emergency services. The phone link, WhatsApp link, and displayed number must match.

---

# PART 30 — CASE FILES AND FINDER

Case Files may use an explorer-style file system.

Possible structure:

```txt
Case Files/
  Start Here/
  Real Estate/
    UK Realty.case
    Investors Propmart.case
  Voice Agents/
    Imperium Marketing.case
  Websites/
  Products/
  Experiments/
  Proof/
```

The explorer should support folders, files, breadcrumbs, back, forward, list view, search, and preview.

If the existing explorer is intentionally frozen or marked beta, do not refactor it without the owner’s permission.

---

# PART 31 — AI FIELD NOTES AND SEO LIBRARY

Create crawlable static article routes for strategically important topics.

Each article requires:

- unique title;
- unique description;
- canonical URL;
- clear author;
- publication/update date;
- useful first-party perspective;
- internal links;
- project evidence;
- structured data where appropriate;
- accessible heading order.

Never claim “number one” ranking as a fact without independent evidence. A target keyword is not a credential.

The OS window can preview the article library, but the articles themselves should also exist as normal static pages so search engines and users can access them without operating the desktop.

---

# PART 32 — SEARCH AND COMMAND PALETTE

Provide a command palette opened by Search and a keyboard shortcut.

Searchable items:

- apps;
- projects;
- cases;
- clients;
- services;
- videos;
- articles;
- contact commands;
- theme commands.

Features:

- fuzzy matching;
- keyboard arrows;
- Enter to open;
- Escape to close;
- visible result type;
- no focus trap bugs;
- mobile search button.

---

# PART 33 — MUSIC PLAYER

The music player may include owner-provided tracks only when the owner has the right to publish them.

Controls:

- previous;
- play/pause;
- next;
- track title;
- artist;
- progress;
- seeking;
- volume;
- accessible labels.

Rules:

- no autoplay;
- remember volume, not forced playback;
- use a real Pause label while playing;
- provide a compact phone layout;
- keep controls above the dock;
- do not cover essential content;
- include licensing information.

---

# PART 34 — THEME SYSTEM

Provide Day, Night, and Dark modes.

Day:

- warm pink-to-cream-to-blue wallpaper;
- dark ink;
- high-contrast cream panels.

Night:

- indigo and violet atmosphere;
- stars;
- moon;
- cream text;
- readable app descriptions.

Dark:

- near-black workstation;
- restrained colored glow;
- light foreground;
- no muddy low-contrast gray text.

All modes must pass contrast review. Theme switching should preserve open windows and user state. Respect system preference only as the initial default if approved.

---

# PART 35 — CUSTOM CURSOR

A custom cursor is optional.

If used:

- provide normal and pointer variants;
- keep hotspot accurate;
- preserve native cursor on form text entry;
- disable on touch devices;
- include a normal fallback;
- do not use a huge glowing cursor that hides content;
- respect reduced motion.

---

# PART 36 — PORTRAIT AND SPRITE

Use the owner’s approved image as a desktop portrait or brand sprite.

Rules:

- preserve likeness;
- use a transparent background where needed;
- avoid placing the portrait in an environment that looks physically nonsensical;
- remove running characters, flying cats, or ambient mascots when the owner requests a professional direction;
- do not mix incompatible visual universes;
- provide alt text;
- optimize image size.

The portrait can change pose on click if the change feels intentional. Character Configuration can contain more playful sprite experiments away from the main desktop.

---

# PART 37 — OPTIONAL GAMES

Games are optional and lower priority than the portfolio.

If games are included:

- place them inside Game Room;
- open the game full-screen;
- provide an obvious Exit Full Screen action;
- preserve keyboard escape;
- prevent scroll trapping;
- pause when hidden;
- do not auto-play sound.

Game progress systems, leaderboards, usernames, cookies, bosses, equipment, and sound design must be treated as separate product requirements. Do not let game scope compromise the portfolio launch.

---

# PART 38 — RESPONSIVE STRATEGY

Do not scale the entire desktop down.

Desktop:

- one-screen OS composition;
- movable icons and widgets;
- folded corner;
- portrait visible;
- dock centered;
- app grid positioned.

Tablet:

- four-column app grid;
- reduced decoration;
- normal document flow where necessary;
- full-width windows;
- dock remains usable.

Phone:

- fixed system bar;
- internally scrolling wallpaper;
- Daily Transmission as the first block;
- identity as the second block;
- two-column app grid;
- full-width CTA card;
- two-column proof cards;
- full-screen app windows;
- horizontally scrollable dock;
- compact fixed player;
- no free-drag desktop icons.

Test at:

- 320 × 568;
- 360 × 800;
- 390 × 844;
- 430 × 932;
- 768 × 1024;
- 1024 × 768;
- 1366 × 768;
- 1440 × 900;
- 1920 × 1080.

---

# PART 39 — READABILITY STANDARD

Readability is a launch blocker.

Minimum targets:

- body copy: 16 pixels desktop, 17 to 18 pixels phone;
- app labels: 13 to 14 pixels desktop, 14 pixels phone;
- app descriptions: 13 pixels desktop, 15 pixels phone;
- controls: 11 to 12 pixels minimum in a pixel face, preferably larger;
- touch targets: 44 × 44 pixels minimum;
- line height: 1.45 to 1.7 for body text;
- maximum line length: 75 characters for long copy.

Pixel fonts appear optically smaller. Compensate with a larger CSS size. Never reduce important information to 5 to 8 pixels simply to preserve a layout.

Audit:

- nav;
- Daily Transmission;
- app labels;
- app descriptions;
- music controls;
- window titles;
- window state text;
- form labels;
- buttons;
- dock tooltips;
- disclosures;
- dark and night modes.

---

# PART 40 — ACCESSIBILITY

Meet practical WCAG 2.2 AA expectations.

Requirements:

- semantic buttons and links;
- visible focus;
- keyboard-openable apps;
- Escape closes overlays;
- alt text;
- form labels;
- reduced-motion support;
- sufficient contrast;
- no color-only meaning;
- live regions used sparingly;
- descriptive link text;
- logical tab order;
- correct dialog behavior;
- no keyboard trap;
- screen-reader names for icons;
- captions or transcripts for important video content where available.

---

# PART 41 — PERFORMANCE

Targets:

- fast first render;
- no giant uncompressed images;
- lazy-load offscreen media;
- defer third-party embeds;
- preload only critical fonts/assets;
- use image dimensions to prevent layout shift;
- use modern audio and image encoding;
- avoid heavy animation libraries unless justified;
- no repeated global intervals;
- no memory leaks from window reopening.

The boot screen must not hide a slow site. Measure actual load behavior.

---

# PART 42 — SECURITY AND PRIVACY

Never place private API keys in frontend JavaScript.

Requirements:

- sanitize visitor-generated content before HTML insertion;
- use `textContent` for sticky notes;
- add `rel="noreferrer noopener"` to external tabs;
- restrict third-party scripts;
- document every embed;
- use platform form protection;
- do not collect data without a purpose;
- explain local-only persistence;
- add a Content Security Policy when integrations permit it;
- rotate any access token pasted into a conversation or committed accidentally.

---

# PART 43 — CONTENT INTEGRITY

Before launch, create a claim ledger.

For every number or statement record:

- exact public wording;
- owner;
- source;
- verification status;
- last checked date;
- approved route;
- disclaimer if needed.

Remove:

- fake live activity;
- fake revenue notifications presented as real;
- fake customer names;
- fake testimonials;
- unsupported superlatives;
- invented press mentions.

Illustrative UI data is acceptable only when visibly labelled illustrative.

---

# PART 44 — SEO TECHNICAL BASE

Provide:

- semantic title and description;
- canonical domain;
- Open Graph metadata;
- Twitter card metadata;
- favicon;
- `robots.txt`;
- `sitemap.xml`;
- structured Person, ProfessionalService, and WebSite data;
- crawlable blog routes;
- descriptive internal links;
- no broken canonical paths;
- no accidental `noindex`.

SEO content must be useful to a buyer. Do not create thin pages that repeat city and keyword names.

---

# PART 45 — FORMS AND DELIVERY

If using Netlify:

- include static form blueprints in the initial HTML;
- include `form-name`;
- include a honeypot;
- return a success state;
- configure notifications;
- test the production form.

If using another provider:

- keep secrets server-side;
- show failure and retry states;
- provide a mail fallback;
- verify that data actually arrives.

---

# PART 46 — LOCAL STORAGE CONTRACT

Permitted local persistence:

- chosen theme;
- moved desktop icon positions;
- movable widget positions;
- visitor sticky notes;
- boot seen flag;
- music volume;
- optional recent app state.

Use versioned keys such as:

```txt
personal-os-theme-v1
personal-os-layout-v1
personal-os-whiteboard-v1
personal-os-widgets-v1
personal-os-media-v1
```

Handle malformed data gracefully. Provide reset controls.

---

# PART 47 — TEST PLAN

Functional tests:

1. Boot completes.
2. Skip Boot works.
3. Every desktop app opens.
4. Every window closes.
5. Window focus order works.
6. Windows remain within the viewport.
7. Search finds applications.
8. Theme switch works.
9. Current time updates.
10. Projects render.
11. Every project URL resolves.
12. Results show disclosures.
13. Proof videos load.
14. Learn videos load.
15. Voice agent handles offline state.
16. Contact form succeeds.
17. Booking opens.
18. WhatsApp opens.
19. Music plays after user interaction.
20. Pause works.
21. Previous and Next work.
22. Whiteboard creates a note.
23. Whiteboard edits a note.
24. Whiteboard moves a note.
25. Whiteboard deletes a note.
26. Notes survive reload.
27. Desktop icon positions survive reload.
28. Reset works.
29. Blog routes return 200.
30. Sitemap returns 200.

Responsive tests:

- no bottom band;
- no nav overlap;
- no horizontal body overflow;
- no clipped owner name;
- app text is readable;
- controls remain tappable;
- dock does not prevent scrolling;
- music player does not hide conversion actions;
- phone windows can reach all content.

Accessibility tests:

- keyboard only;
- focus visibility;
- screen-reader landmarks;
- reduced motion;
- contrast;
- zoom at 200 percent.

---

# PART 48 — VISUAL QA CHECKLIST

Inspect the build at actual size, not only in a design canvas.

Check:

- icon consistency;
- label baseline alignment;
- shadow direction;
- border weight;
- app spacing;
- owner name treatment;
- wallpaper continuity;
- nav height;
- Daily Transmission safe zone;
- folded-corner geometry;
- dock centering;
- mobile dock overflow;
- window chrome;
- form readability;
- night contrast;
- dark contrast;
- generated-image quality;
- absence of accidental white or blue bands;
- absence of childish ambient assets unless approved.

Take screenshots at the agreed breakpoints and compare them as a set.

---

# PART 49 — REPOSITORY AND DEPLOYMENT

Repository requirements:

- descriptive repository name such as `personal-ai-operating-system`;
- complete source;
- assets;
- README;
- setup instructions;
- content customization instructions;
- environment-variable example;
- license;
- deployment config;
- no secrets;
- meaningful commits.

Suggested structure:

```txt
personal-ai-operating-system/
  index.html
  styles.css
  app.js
  content/
    owner-profile.js
    projects.js
    cases.js
    videos.js
  assets/
    icons/
    portraits/
    cases/
    music/
  blog/
  voice-agents/
  games/
  netlify.toml
  robots.txt
  sitemap.xml
  README.md
  AI_OS_MASTER_REBUILD_PROMPT.md
```

Deployment sequence:

1. Run syntax checks.
2. Run functional tests.
3. Inspect repository diff.
4. Remove secrets and temporary artifacts.
5. Commit.
6. Push.
7. Deploy to a preview URL.
8. Verify all public routes.
9. Attach the custom domain.
10. Verify HTTPS.
11. Test forms in production.
12. Test third-party embeds in production.
13. Submit sitemap when approved.
14. Record release version.

---

# PART 50 — DEFINITION OF DONE

Do not call the project done until all of the following are true:

- the homepage looks and behaves like one coherent OS;
- portfolio work is the main content;
- project links are valid;
- case-study claims are approved and labelled;
- applications open and close correctly;
- app text is readable without zoom;
- phone and tablet layouts reflow rather than shrink;
- the wallpaper reaches the bottom edge;
- the nav does not overlap Daily Transmission;
- the folded call tab matches the approved direction;
- a visitor can add a persistent sticky note;
- the contact route works;
- booking works;
- music has Play and Pause;
- themes remain readable;
- no unauthorized or childish ambient elements remain;
- generated visuals look intentional;
- blog routes are crawlable;
- favicon and metadata exist;
- no access token or secret is committed;
- local preview is available;
- production deployment is verified;
- the final repository contains this master prompt.

When finished, return:

1. Local preview URL.
2. Production URL.
3. Repository URL.
4. Commit hash.
5. Applications implemented.
6. Tests performed.
7. Known limitations.
8. Owner actions still required.

---

# COPY-PASTE EXECUTION BLOCK

Use the block below when giving this specification to another AI coding agent:

```txt
Build me a premium personal portfolio that behaves like a complete interactive operating system.

Read the attached “The Personal AI Operating System — 50-Part Master Rebuild and Personalization Prompt” from beginning to end before writing code.

First, run the Required Onboarding Interview. Ask no more than ten questions per message. Do not invent missing identity, project, metric, testimonial, social, contact, legal, asset, or deployment information. Create an ownerProfile data contract and a Build Contract from my answers. Ask me to approve the Build Contract.

After approval, implement the operating system, not a conventional landing page. Portfolio projects and verifiable client outcomes are the primary content. Apps, windows, files, proof videos, contact, booking, voice agents, the whiteboard, media, themes, and search must function. Make the visual system original and premium.

Readability is a launch blocker. Reflow the product for phone and tablet. Never shrink essential text to preserve a desktop composition. App labels, captions, window chrome, music controls, buttons, disclosures, forms, and theme text must remain readable.

Use honest claims. Distinguish verified, client-reported, founder-reported, estimated, illustrative, and private data. Never present pipeline as realized revenue. Never promise a number-one search ranking.

Do not expose secrets. Do not autoplay media. Do not use copyrighted game assets. Do not add decorative characters that conflict with the approved professional direction.

Build, test, inspect, fix, commit, push, deploy, and verify. Do not stop at a plan or mockup. Return the local URL, production URL, repository URL, commit hash, tests, known limitations, and exact owner actions.
```

---

# OPTIONAL PERSONALIZATION WORKSHEET

Copy this object, fill it in, and attach it with the master prompt:

```json
{
  "fullName": "",
  "osName": "",
  "domain": "",
  "location": "",
  "timezone": "",
  "profession": "",
  "roles": [],
  "headline": "",
  "positioningStatement": "",
  "primaryAudience": "",
  "primaryConversion": "",
  "bookingUrl": "",
  "whatsappUrl": "",
  "email": "",
  "services": [],
  "projects": [],
  "clientCases": [],
  "metrics": [],
  "testimonials": [],
  "videos": [],
  "journey": [],
  "achievements": [],
  "socials": [],
  "articles": [],
  "music": [],
  "visualAdjectives": [],
  "primaryColor": "",
  "accentColor": "",
  "neutralColor": "",
  "displayFontDirection": "",
  "portraitSourceFiles": [],
  "requiredApps": [],
  "optionalApps": [],
  "prohibitedClaims": [],
  "prohibitedVisuals": [],
  "repository": "",
  "hostingProvider": "",
  "domainProvider": "",
  "analyticsProvider": "",
  "formProvider": "",
  "launchDeadline": ""
}
```

End of master prompt.
