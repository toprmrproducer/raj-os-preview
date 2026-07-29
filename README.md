# RAJ OS

A one-screen personal AI operating system for Shreyas Raj and the homepage of `shreyasraj.com`. Version 5.1 preserves the original editorial desktop composition and makes the portfolio the core product: ten evidence-aware case files, four service lanes, a generated systems map, real video proof, a YouTube learning library, four production Dograh voice-agent embeds, daily motivation, music, two upgraded playable games, Netlify Garage Mail, video suggestions, portrait poses, ambient characters, hidden folders, and a visible SOS channel.

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

## Art direction

The desktop follows the clean RAJ OS v1 reference: blush-to-ivory-to-blue atmospheric wallpaper, editorial typography, crisp OS chrome, a generated full-body Shreyas portrait, and one coherent family of ten generated pixel application icons. The Pokémon/GBA landscape, roaming sprite, hills, paths, grass, and mixed inventory-art direction were deliberately removed. Generated art is reserved for the portrait, icon family, and Voice Agent Lab surfaces.

## Voice concierge

`Talk to Shreyas.app` uses browser speech recognition and speech synthesis, plus a typed fallback, to answer portfolio questions and open the relevant OS apps. It also isolates four production Dograh widgets in a same-origin agent frame so their identical widget IDs cannot collide. The provider script/API origins are explicitly allowed by the production CSP. No private Gemini key is embedded in the static site.

## Video proof

`Testimonials.app` contains five real YouTube testimonial videos with their original audio, thumbnails, durations, a selectable in-window player, cinema expansion, and canonical YouTube fallbacks. Only one privacy-enhanced YouTube iframe is mounted at a time. Playback never autostarts on page load and is stopped when the proof window is minimized.

## Games and music

`Games.app` embeds local production copies of Viper Arena and Fangs.io. Viper Arena is the flagship single-player build with a persistent pilot name, top-ten local leaderboard, escalating mission goals, three boss waves, equipment loadouts, ASMR/Arcade/Mute sound modes, and responsive touch controls. Fangs.io stores a lighter local high-score table. Neon Drift remains a featured visual case file. `Music.app` and the desktop Sound Deck expose four user-supplied tracks with unmistakable play/pause controls, progress, volume, and no autoplay. Confirm web-distribution permission for every audio file before using the production domain.

## Netlify

The repository contains `netlify.toml` and two Netlify Forms (`garage-mail` and `video-suggestion`). Import the GitHub repository with a blank build command and publish directory `.`. Enable Form Detection after the first deploy, then add an email or webhook notification in Netlify. The GitHub Pages `CNAME` is intentionally removed while Netlify becomes the domain owner.

The complete rebuild specification lives in [`RECREATE-PROMPT.md`](./RECREATE-PROMPT.md).

## Content guardrails

The public metrics and case-study statuses are taken from Shreyas's source-backed portfolio material. Company revenue and unverified attribution claims stay private. Delivered, ongoing, demo, scoped, and pending-sign-off work are labeled separately; no fake company or revenue win is presented as real.
