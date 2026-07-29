# RAJ OS

A one-screen personal AI operating system for Shreyas Raj and the homepage of `shreyasraj.com`. Version 4 restores the original editorial desktop composition: Shreyas's portrait, professional generated application icons, draggable applications, a working mini-browser, verified proof, real testimonial links, project files, voice agent, socials, Founder.txt, Journey.app, and honest activity notifications.

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

`Voice Agent.app` uses browser speech recognition and speech synthesis, plus a typed fallback, to answer portfolio questions and open the relevant OS apps. No private Gemini key is embedded in the static site. A Gemini-backed conversational model would require a server-side proxy.

## Content guardrails

The public metrics are taken from Shreyas's source-backed portfolio brief. Activity notifications use verified project and proof events; no fake company or revenue win is presented as real. The unverified `$1.2M+` attribution claim is intentionally excluded from the headline until underlying proof and client permission are confirmed.
