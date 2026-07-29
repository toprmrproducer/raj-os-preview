# RAJ OS

A one-screen, pixel-art personal operating system for Shreyas Raj. It combines an interactive desktop wallpaper and movable Raj sprite with draggable applications, a working mini-browser, verified proof, real testimonial links, project files, emergency contact, socials, and a public changelog.

## Open locally

The current preview runs at:

`http://localhost:4173`

To restart it later from this folder:

```bash
python3 -m http.server 4173
```

## Controls

- Raj automatically patrols the desktop and changes direction as he moves.
- Click or keyboard-activate Raj to make him wave.
- Click the sun or moon to toggle the complete day/night world.
- Click a desktop app, menu item, or dock icon to open its OS window.
- Drag windows by their title bars on desktop.
- Double-click a title bar to maximize.
- Red, yellow, and green controls close, minimize, and maximize.
- Press `Cmd/Ctrl + K` for command search.
- Press `Escape` to close the active window.
- On mobile, apps open as full-screen sheets.

## Art direction

The interface uses a bespoke 16-bit operating-system world rather than stock iconography. Generated assets include directional Shreyas sprites, a Hardik companion sprite, fitness and systems scenes, gamified social-channel icons, interactive buildings, shipped crates, an update terminal, and matching world props. Desktop and dock launchers deliberately use restrained Mac-like tiles. The desktop also includes a custom pixel cursor, drifting clouds, day/night themes, and a grounded Voice Agent Lab.

## Voice concierge

`Voice Agent.app` uses browser speech recognition and speech synthesis, plus a typed fallback, to answer portfolio questions and open the relevant OS apps. No private Gemini key is embedded in the static site. A Gemini-backed conversational model would require a server-side proxy.

## Content guardrails

The public metrics are taken from Shreyas's source-backed portfolio brief. The unverified `$1.2M+` attribution claim is intentionally excluded from the headline until underlying proof and client permission are confirmed.
