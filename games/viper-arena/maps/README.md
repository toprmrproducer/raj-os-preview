# Deterministic map vertical slice

`maps.js` is a dependency-free browser global and CommonJS module. It defines five biomes:

1. Neon Foundry — open starter arena with heat vents.
2. Acid Marsh — acid slow-zones and spore pulses.
3. Rail Yard — long sightlines, rail sweeps, and arc nodes.
4. Frost Vault — freeze fields and deterministic moving ice.
5. Solar Temple — endgame rotating beams and sun wells.

## Browser integration

Load the registry before the game scripts:

```html
<script src="./maps/maps.js"></script>
```

Create the layout once when a run starts. Do not regenerate it in the frame loop:

```js
const progress = { level: wallet.level, bossesDefeated: wallet.bossesDefeated || 0 };
const map = SWGMaps.selectMap(progress, runSeed);
const layout = SWGMaps.generateLayout(map.id, runSeed, {
  safeZones: [{ x: VIPER.W / 2, y: VIPER.H / 2, radius: 260 }]
});
game.map = map;
game.mapLayout = layout;
```

The renderer can read `game.map.palette`, `game.map.grid`, and `game.mapLayout.props`. The simulation can evaluate hazards with a reusable scratch object so hazard updates allocate nothing:

```js
const scratch = {};
for (let i = 0; i < game.mapLayout.hazards.length; i++) {
  const hazard = game.mapLayout.hazards[i];
  SWGMaps.resolveHazardState(hazard, game.time, scratch);
  if (SWGMaps.pointInHazard(playerX, playerY, hazard, scratch)) {
    // Apply hazard.damagePerSecond * dt and hazard.slowMultiplier.
  }
}
```

## Determinism contract

- The same `mapId` and `runSeed` produce byte-equivalent layout data.
- Props and hazards use separate derived seed channels, so changing prop density does not move hazards.
- Generation uses bounded rejection sampling and reserves a safe zone around the default player spawn.
- Map definitions are frozen. Sprites and decorative props must never alter simulation collision geometry.
- Hazard state is derived from simulation elapsed time, not wall-clock time.

## Progression API

`getUnlockedMaps({ level, bossesDefeated })` returns the legal selection pool. `selectMap(progress, runSeed)` deterministically chooses from that pool. Explicit player choice can call `getMap(id)` after checking that the map appears in the unlocked list.
