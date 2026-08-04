# Serpent Engine architecture

Serpent Engine is the clean-room runtime for Snakes With Guns. TypeScript source lives in `engine/src`; the browser receives one compiled `www/engine.js` bundle. Game content remains separate from engine code and is registered by stable IDs.

## Runtime layers

```text
Platform shell (Web / Capacitor / future desktop)
  └─ Engine lifecycle + fixed-step clock
      ├─ Input actions
      ├─ ECS world + ordered systems
      ├─ Tactical director
      ├─ Spatial hash + collision
      ├─ Content registry
      ├─ Saves + migrations
      ├─ Replay recorder/player
      ├─ Render command buffer
      └─ Audio mixer
```

## Deterministic update order

1. Sample player/replay input.
2. Resolve high-level AI intentions at a bounded cadence.
3. Apply steering and movement.
4. Rebuild/query the spatial index.
5. Resolve physical separation before damage.
6. Resolve weapons/projectiles/abilities.
7. Resolve pickups, deaths, rewards, missions, and progression.
8. Emit semantic audio/render events.
9. Record replay input and state checksum.

Rendering may interpolate between fixed ticks but can never mutate simulation state.

## Engine contracts implemented

- `Engine`: owns requestAnimationFrame lifecycle, bounded catch-up, pause-safe timing, interpolation alpha, and frame-drop events.
- `World`: entity lifecycle, typed component stores, deterministic ordered systems, and multi-component queries.
- `ContentRegistry`: unique definitions, validators, lookup, required references, and missing-reference audits.
- `SpatialHash`: broad-phase insertion/rebuild and deduplicated circular queries.
- `ActionInput`: semantic actions independent of keyboard/touch/gamepad codes.
- `separateCircles`: deterministic physical contact resolution.
- `TacticalDirector`: reusable hold/bait/flank/strike/retreat wing orders.
- `VersionedSaveStore`: namespaced JSON envelopes with sequential migrations and validation.
- `ReplayRecorder` / `ReplayPlayer`: seed/content-hash input timelines with optional deterministic checksums.
- `CommandBuffer`: layer-sorted render instructions.
- `AudioMixer`: semantic master/music/SFX/UI/voice gain buses.
- `PlatformAdapter`: time, frame, content I/O, optional persistence/haptics boundary.

## Content direction

The existing 36 maps, weapons, abilities, loadouts, bosses, enemy archetypes, story beats, and sprite metadata will move behind JSON-compatible schemas. Authoring tools can then add content without editing simulation code. Invalid or missing references fail during build/startup instead of halfway through a run.

## Migration rule

The playable production build is migrated incrementally behind adapters. A system moves only after parity assertions pass. The first production integration delegates lifecycle/fixed-step ownership to `Engine`; subsequent passes move input, content, collision, AI, save/replay, rendering, and audio in that order. The legacy modules remain temporary compatibility plugins, not permanent architecture.

## Commands

```sh
pnpm engine:check
pnpm engine:test
pnpm engine:build
```

The final browser bundle is `www/engine.js`; TypeScript source maps are generated for our own engine code only.
