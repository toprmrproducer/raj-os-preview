# RAJ OS — One-shot recreation prompt

Build a production-ready, single-screen personal portfolio called **Shreyas OS / RAJ OS**. It must look and behave like a real personal desktop operating system, never a conventional landing page and never a Pokémon/GBA game map.

## Product

The homepage is `shreyasraj.com`. The owner is **Shreyas Raj**, founder, operator, and AI builder. The emotional sequence is curiosity → control → proof → ambition → contact. Use honest, inspectable evidence; keep company revenue and unverified attribution private.

## Art direction

- Premium late-1990s desktop rebuilt with modern editorial taste.
- Fixed `100dvh` desktop, no document scroll. Content opens inside draggable, stackable OS windows.
- Wallpaper: luminous blush → ivory → powder-blue, restrained grid, tiny clouds, atmospheric glow.
- Night mode: indigo space, stars, moon, and a rare original pixel-art cat-in-a-rocket flyby.
- Dark mode: near-black professional workstation.
- Day mode: warm, quiet workstation atmosphere with no fly-by characters or mascots.
- Warm ivory window surfaces, near-black ink, burgundy and electric-lime accents, hard 2–3 px borders and offset shadows.
- Typography: Instrument Serif for editorial display; DM Mono for UI/body; Silkscreen for labels and OS chrome.
- Use original/generated pixel assets only. Avoid emoji icons, generic gradients, excessive pills, glassmorphism, game terrain, or mixed visual styles.

## Desktop

- Menu bar: SR mark, Shreyas OS, Work, Proof, Journey, Search, Day/Night/Dark controls, live local date/time/timezone.
- Left: date-driven Daily Transmission / motivational quote panel; large “Shreyas Raj” identity; short founder line; Enter Portfolio and Start Project.
- Right: professional application icons for Projects, Results, Systems, Proof, Journey, Socials, Agent Lab, Founder.txt, Browser, Contact, Achievements, Game Room.
- Bottom-right: full-body illustrated Shreyas in red T-shirt, burgundy trousers, sunglasses, white sneakers. Clicking cycles Founder/Wave/Builder poses and reveals a hidden `DO_NOT_OPEN` folder.
- Visible red SOS control opens WhatsApp `+91 93075 12816`, phone call, and Calendly.
- Movable sticky note reveals Learn.app, with tap/keyboard fallback.
- Compact global Music Deck above the dock.
- Bottom dock remains visible and launches core apps.

## Required apps

1. **Projects — Finder:** ten evidence-aware case files across consulting, websites, AI voice, and deployment. Label delivered, ongoing, demo, scoped, and pending-sign-off work distinctly. Include a generated systems-map visual; never link dead hosts.
2. **Results — Proof.app:** 6 shipped systems, 1.81M YouTube views, 100K+ builder community, 5 playable testimonials, 315 published videos, 17 Kawsaypac flows. No company revenue.
3. **Systems.app:** five-stage RapidXAI operating loop plus fitness/systems illustrations.
4. **Achievements:** six unlocked milestones and the “My word is iron” quote.
5. **Testimonials:** one `youtube-nocookie.com` iframe at a time, actual audio, thumbnails, five-video selectable playlist, cinema expansion, source links, mobile vertical player, audio stops on minimize. Videos:
   - `Oe2s8j6JomQ`
   - `ktfwr3nOFeU`
   - `IIjhViAlMTA`
   - `9OCD3Udnfs8`
   - `mtmHkGaE0r0`
6. **Journey:** 2015, 2024, 2025, 2026, Next.
7. **Socials:** YouTube, new Instagram `@theshreyasraj9595`, X, GitHub; state that the previous 70K Instagram was banned; no LinkedIn.
8. **Founder.txt:** plain-language founder note.
9. **Garage Mail / Contact:** email, Calendly, RapidXAI, plus two Netlify Forms: Message Raj and Video Suggestion. Include static hidden form blueprints for Netlify detection, AJAX URL-encoded submission, honeypot, validation, success/error state, and mailto fallback.
10. **Talk to Shreyas / Voice Agent:** browser-native speech recognition/synthesis plus typed fallback and four isolated production Dograh widgets selectable inside a same-origin frame. Never expose private Gemini/API keys in the static client.
11. **Browser — RajNet:** URL input, bookmarks, iframe with external-tab fallback.
12. **Music.app / SoundDeck:** four opt-in local tracks, previous/play/next/progress/volume, no autoplay, local volume persistence, music and testimonials pause each other.
13. **Game Room:** same-origin local Viper Arena and Fangs.io. Viper is single-player with persisted callsign, top-ten local scores, escalating missions, boss waves, visible equipment/loadouts, ASMR/Arcade/Mute audio, and touch controls. Fangs.io stores a lighter local leaderboard. Neon Drift is the featured preview case file.
14. **Learn.app:** a selectable, embedded library of six real videos from `youtube.com/@AIwithShreyasRaj`, with canonical YouTube links and no invented titles.
15. **Secret.folder:** three explicit confirmations, then open `https://www.youtube.com/watch?v=dQw4w9WgXcQ` in a new tab. Never trap the browser, force fullscreen, or autoplay. Include `API_KEYS.env` containing only obvious `DEMO_KEY_NOT_REAL` values.

## Interaction contract

- Boot animation lasts about 2 seconds and can be skipped.
- Windows are draggable on desktop, near-fullscreen sheets on mobile, and support focus/minimize/maximize/close.
- `Cmd/Ctrl + K` opens command search; Escape closes the focused window.
- Music, videos, games, and voice never start without explicit interaction.
- Starting music pauses proof video; minimizing Proof or Games unloads their iframe and restores it on reopen.
- All controls must have visible focus states and 44 px mobile targets.
- Respect `prefers-reduced-motion`; hide ambient flybys and stop continuous motion.
- Live clock uses visitor locale/timezone.
- Persist theme, music volume, discoveries, and relevant session state in local storage.

## Netlify

- Static site; no build command; publish directory `.`.
- Include `netlify.toml` with security headers, `www` → apex redirect, no-cache HTML, and asset caching.
- Use Netlify Forms. The owner must enable Form Detection and configure email/webhook notifications after import.
- Do not include a GitHub Pages `CNAME` when Netlify owns the custom domain.

## Quality bar

No placeholders, dead links, invented clients, fake outcomes, or leaked secrets. Use semantic HTML, keyboard access, WCAG AA contrast, responsive layouts at 390/768/1280, error fallbacks, canonical links, and fast static assets. The result must feel authored, sharp, snappy, premium, and unmistakably Shreyas—not like a template.
