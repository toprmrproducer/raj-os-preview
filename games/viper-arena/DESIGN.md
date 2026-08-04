# Snakes With Guns — Design Contract

## 1. Product intent

`Snakes With Guns` is an immediate, legible neon arena shooter: high-speed movement, readable threats, and a player snake that feels like a character rather than a line of dots. Desktop and touch controls must both remain playable without obscuring combat.

## 2. Visual tokens

| Token | Value | Use |
| --- | --- | --- |
| Arena black | `#04070A` | Canvas and deep surfaces |
| Panel navy | `rgba(6, 12, 16, .72)` | HUD and menus |
| Signal cyan | `#7CF9FF` | Navigation, aim, primary glow |
| Viper mint | `#39FF9E` | Player identity, health, pickups |
| Hazard amber | `#FFC24B` | Weapons, stamina, important rewards |
| Heat orange | `#FF8A2B` | Boost and warnings |
| Damage red | `#FF4D6D` | Damage and hostile danger |
| Ink | `#DFF6F8` | Primary text |

## 3. Typography and spacing

Use the existing system sans stack with uppercase, high-weight labels. HUD labels are 12px with 4px tracking; primary values are 30–42px at weight 900. Keep screen-edge controls at least 22px from the viewport edge and use an 8px internal spacing rhythm.

## 4. Core primitives

- **Neon panel:** translucent navy, 1px low-opacity cyan border, restrained outer glow.
- **Combat meter:** dark recessed track with one bright semantic fill; animate only fill width.
- **Loadout card:** icon, title, short mechanical promise, explicit selected state.
- **Player sprite:** green viper head and orb segments; boosted state adds cyan rim-light only. It must remain identifiable at 32px.
- **Weapon crate:** dark square containment with a single high-contrast glyph and a weapon-specific glow; every weapon needs a distinct silhouette as well as a distinct colour.
- **Weapon belt:** compact HUD strip showing every collected weapon, reserve ammo, and the active slot. Active, depleted, and newly collected states must remain distinguishable without relying on colour alone. Keyboard uses Q/C or mouse wheel; touch receives an explicit SWAP control.
- **Procedural weapon fallback:** weapons without a finished raster still render as a distinct mounted silhouette. Missing art must never make an equipped gun invisible.
- **Cinematic launcher:** the generated gate artwork is the dominant full-viewport surface. The live title, pilot field, PLAY action, and collapsed secondary drawers occupy the left safe zone; configuration must never become an opaque full-screen form. High scores use a compact glass archive at the upper-right.
- **Loadout dossier:** every class card names its starting gun, passive trade-off, exact E ability effect, duration/radius where relevant, and cooldown. Cards remain collapsed behind a single LOADOUT action until requested.
- **Numbered weapon slot:** the first three owned belt slots expose persistent `1`, `2`, and `3` badges. Number keys and clicks select the matching slot directly; Q/C and the wheel remain cycling fallbacks.
- **Sponsor rail:** desktop combat reserves slim left/right safe rails for future ads. Rails never cover the player, vitals, mission, minimap, weapon belt, or touch controls and disappear below 1180px.

## 5. Interaction and motion

Combat effects use transform, opacity, canvas drawing, and short glow pulses. Motion must communicate state (boost, hit, reload, ability) and never delay input. Respect `prefers-reduced-motion` for nonessential menu animation when adding new UI.

Weapon switching is immediate, preserves each gun's loaded magazine and reserve pool, and shows a short text confirmation. Repeated pickups add reserve ammo instead of discarding the existing weapon state.

Launcher drawers animate only opacity/transform, start closed, and keep PLAY available without scrolling at common laptop sizes. Gameplay camera scale targets a wider tactical view (`0.58` desktop, `0.55` compact) while keeping sprite identities legible.

## 6. Responsive behavior and accessibility

At narrow widths the touch controls remain reachable, HUD text contracts before controls overlap, and every control maintains an accessible name. Color never carries the sole meaning: labels, weapon names, and meter placement reinforce it.

## 7. Asset pipeline

Generated game art is committed under `www/assets/`. Source chroma-key artwork is kept as a sibling `*-source.png`; the alpha PNG is the runtime asset. Do not substitute artwork for gameplay collision geometry: sprites decorate the deterministic simulation rather than changing its hitboxes.
