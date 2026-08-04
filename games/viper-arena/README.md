# Snakes With Guns

A neon arcade snake shooter built as a mobile-ready Capacitor web app. The core loop is already playable: steer, aim, fire, collect orbs, swap weapons, survive escalating waves, and fight a boss every third wave.

## Serpent Engine

The game now boots through a clean-room TypeScript engine in `engine/` rather than owning its frame loop directly in the gameplay script. The first engine layer provides a deterministic fixed-step clock, lifecycle events, an ECS world, spatial hashing, validated content registries, semantic input actions, collision separation, tactical squad phases, versioned saves, seeded replay records, render commands, audio buses, and platform adapters.

The current JavaScript simulation and renderer are connected as compatibility systems while they are migrated module-by-module. This keeps the playable build intact while establishing one authoritative runtime instead of attempting a risky rewrite. See `ENGINE_ARCHITECTURE.md` for the migration boundaries and `CLEAN_ROOM_APK_AUDIT.md` for the static reference audit and provenance warning.

```sh
pnpm engine:check
pnpm engine:test
pnpm engine:build
```

`engine:build` emits the browser bundle at `www/engine.js`, which must load before the game content and compatibility systems.

## Run locally

```sh
python3 -m http.server 4173 --directory www
```

Then open `http://127.0.0.1:4173`.

## Current art pass

The first runtime sprite kit lives at `www/assets/player-snake-kit-replicate.png`. It adds the mint player viper head in normal and boost states while preserving the canvas simulation and collision geometry. It was cut out with Replicate's `bria/remove-background` model; the matching chroma-key source is kept beside it as `player-snake-kit-source.png`.

The 4 August generated drop has now been audited: 260 files, 38 exact duplicates, 6 unique unrelated images, and 216 unique game assets. The source catalog, transparency results, Replicate cutouts, title concepts, and missing-art prompts live at `/Users/shreyasraj/Downloads/SnakesWithGuns_Recent_Art_Drop`.

The runtime intentionally ships optimized bundles rather than the 433 MB production masters. The current build uses the generated title background, five biome textures, twenty encounter portraits, seven snake kits, six core gun sprites, pickups, crates, coins, and combat effects. See `RECENT_ASSET_INTAKE.md` for the loading policy and remaining promotion work.

## Checks

```sh
node --check www/render.js
node --check www/sim.js
node --check www/main.js
```

Use the bundled Node runtime if `node` is not on your shell path.
