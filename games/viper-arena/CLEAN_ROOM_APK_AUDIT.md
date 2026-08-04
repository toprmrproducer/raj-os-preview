# Clean-room APK architecture audit

## Scope and provenance

Input: `rusted-warfare-rts-strategy-1.15.180-apkvision.apk`

- SHA-256: `fc36e81929e7dbd5336cca0482fa79d96f57b22138631d84c5d4054a0a0eaa89`
- Package: `com.corrodinggames.rts`
- Reported app version: `1.15` (`versionCode 180`)
- DEX: version 035, 2,137 classes, 19,305 methods
- Static inspection only. The APK was never installed or executed.

The file is signed by `CN=APKVISION.ORG`, not by an identifiable original developer certificate. It is therefore a third-party repack whose integrity and provenance cannot be assumed even if the underlying game file was shared with permission. No executable code, art, audio, map data, unit values, names, or other copyrighted content is imported into Snakes With Guns.

## Observable architecture

The useful architectural pattern is a compact runtime surrounded by data-defined content:

- 131 unit definition files using named sections for core statistics, graphics, attacks, turrets, projectiles, effects, movement, and build relationships.
- 73 orthogonal TMX maps plus 67 TSX tileset definitions.
- Map metadata supports teams, credits, AI flags, fog, resource pools, spawn rules, activation/deactivation triggers, win/lose conditions, messages, and survival-wave modes.
- 31 map/campaign/challenge/survival/menu files are surfaced through separate Android activities for intro, menu, settings, in-game, level selection, loading, replay selection, multiplayer lobby/battleroom, missions, help, credits, and mods.
- Content is separated into maps, tilesets, units, translations, shaders, built-in mods, sound effects, and music states (`starting`, `buildup`, `attacked`).
- Asset footprint is dominated by music (14.53 MiB), while maps, tiles, and units remain compact and data-oriented.
- The APK requests Internet, Wi-Fi state, legacy external storage, and license-check permissions. These permissions are observations, not requirements for our engine.

## Clean-room lessons adopted

1. **Definitions, not subclasses:** weapons, units, abilities, maps, missions, audio cues, and sprites receive validated IDs and data schemas.
2. **Deterministic kernel:** all gameplay advances through one bounded fixed-step clock.
3. **System ownership:** input, AI, movement, collision, combat, pickups, progression, saves, replay, audio, and rendering have explicit system boundaries.
4. **Content registry:** runtime code resolves typed definitions by stable IDs and fails loudly on duplicates or broken references.
5. **Spatial broad phase:** collision and targeting query a bounded grid instead of scanning the whole world.
6. **Save migrations:** persistent data carries versions and deterministic migrations.
7. **Replay contract:** seed, content hash, input ticks, and optional checksums provide reproducible runs.
8. **Platform adapters:** browser, Capacitor Android/iOS, and future desktop shells share the same simulation.
9. **Mod boundary:** future user content is loaded through schemas and namespaces, never through arbitrary executable scripts.
10. **State-aware audio:** music and effects are addressed through semantic buses rather than scattered playback calls.

## Explicit exclusions

- No decompiled methods or algorithms are copied.
- No original or repacked classes are linked or bundled.
- No Rusted Warfare maps, tiles, unit definitions, balance values, sprites, sounds, music, translations, UI layouts, or names are reused.
- No attempt is made to bypass licensing, signatures, networking, purchases, or protection mechanisms.

The result is an independently implemented engine using general game-engine principles confirmed by static architectural evidence.
