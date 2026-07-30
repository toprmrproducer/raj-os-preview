# RAJ OS

A one-screen personal AI operating system for Shreyas Raj and the homepage of `shreyasraj.com`. Version 5.3 preserves the original desktop composition, enforces readable typography across desktop/tablet/phone, and makes the portfolio the core product: client-result case files with generated visuals, ten selected project files, a nested Finder-style case archive, four service lanes, real video proof and stories, a YouTube learning library, four production Dograh voice-agent embeds, a draggable daily transmission, a persistent sticky-note whiteboard, movable desktop icons, music, Netlify Garage Mail, portrait poses, a visible SOS channel, and a responsive phone/tablet shell.

## Open locally

The current preview runs at:

`http://localhost:4173`

To restart it later from this folder:

```bash
python3 -m http.server 4173
```

## Controls

- Choose Day, Night, or Dark from the menu bar. The preference persists.
- Click a desktop app, menu item, or dock icon to open its OS window.
- Drag windows by their title bars on desktop.
- Double-click a title bar to maximize.
- Red, yellow, and green controls close, minimize, and maximize.
- Press `Cmd/Ctrl + K` for command search.
- Press `Escape` to close the active window.
- On mobile, apps open as full-screen sheets.
- Desktop icons, the Daily Transmission, and the Music Deck can be rearranged on larger screens and persist in the current browser.
- Whiteboard notes can be added, edited, deleted, and rearranged; they also persist in the current browser.

## Art direction

The desktop follows the clean RAJ OS v1 reference: blush-to-ivory-to-blue atmospheric wallpaper, editorial typography, crisp OS chrome, a generated full-body Shreyas portrait, and one coherent family of generated pixel application icons. The Pokémon/GBA landscape, roaming character, running ambient figure, rocket cat, hills, paths, grass, and mixed inventory-art direction were deliberately removed. Generated art is reserved for Shreyas, the icon family, the Voice Agent Lab, and clearly identified case-study illustrations.

## Voice concierge

`AI Voice Agent.app` uses browser speech recognition and speech synthesis, plus a typed fallback, to answer portfolio questions and open the relevant OS apps. It also isolates four production Dograh widgets in a same-origin agent frame so their identical widget IDs cannot collide. The provider script/API origins are explicitly allowed by the production CSP. No private Gemini key is embedded in the static site.

## Video proof

`Testimonials.app` contains five real YouTube testimonial videos with their original audio, thumbnails, durations, a selectable in-window player, cinema expansion, and canonical YouTube fallbacks. Only one privacy-enhanced YouTube iframe is mounted at a time. Playback never autostarts on page load and is stopped when the proof window is minimized.

## Games and music

The games remain available as secondary local apps but are intentionally removed from the primary desktop surface. Viper Arena keeps the persistent pilot name, local leaderboard, boss waves, equipment loadouts, sound modes, and touch controls. `Music.app` and the desktop Music Deck expose four user-supplied tracks with unmistakable play/pause controls, progress, volume, and no autoplay. Confirm web-distribution permission for every audio file before using the production domain.

## Search and field notes

The site includes a static, crawlable `/blog/` library with original guides for AI specialists in India, AI specialists in Pune, and AI agencies in Pune. Every page has unique titles, descriptions, canonical URLs, author attribution, internal links, responsive typography, and `BlogPosting` structured data. `robots.txt`, `sitemap.xml`, and `llms.txt` expose the authoritative pages. The content deliberately avoids pretending that a self-published “number one” claim is an independent ranking.

## Netlify

The repository contains `netlify.toml` and two Netlify Forms (`garage-mail` and `video-suggestion`). Import the GitHub repository with a blank build command and publish directory `.`. Enable Form Detection after the first deploy, then add an email or webhook notification in Netlify. The GitHub Pages `CNAME` is intentionally removed while Netlify becomes the domain owner.

The reusable personalization and rebuild system lives in [`AI_OS_MASTER_REBUILD_PROMPT.md`](./AI_OS_MASTER_REBUILD_PROMPT.md). It contains the full onboarding interview, owner data contract, 50-part component specification, responsive and accessibility standards, deployment sequence, test plan, and copy-paste execution block. The earlier implementation-specific notes remain in [`RECREATE-PROMPT.md`](./RECREATE-PROMPT.md).

## Content guardrails

The client-result cases use names and figures supplied by Shreyas. ₹80Cr+ and ₹50Cr are disclosed as founder/client-case reports describing pipeline or channelled property value—not independently audited realized revenue and not Shreyas OS company revenue. Delivered, ongoing, demo, scoped, and pending-sign-off work are labeled separately.
