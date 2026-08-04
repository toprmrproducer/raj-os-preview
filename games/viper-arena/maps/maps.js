/* Snakes With Guns - deterministic biome registry and layout generator.
   Load as a plain script to expose window.SWGMaps, or require it from Node.
   Map data is immutable; generated layouts are created once per run/map and can
   be consumed by both the simulation and canvas renderer. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SWGMaps = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const API_VERSION = 1;
  const DEFAULT_WORLD = Object.freeze({ width: 2400, height: 1600 });
  const TAU = Math.PI * 2;

  const MAPS = Object.freeze([
    freezeMap({
      id: 'neon_foundry',
      name: 'NEON FOUNDRY',
      chapter: 'THE LOWER WORKS',
      description: 'Open factory floor with readable heat vents and wide firing lanes.',
      seedSalt: 0x4e464452,
      progression: { unlockLevel: 1, unlockBosses: 0, rewardMultiplier: 1 },
      palette: {
        background: '#04070A', floor: '#071116', gridMinor: 'rgba(124,249,255,0.045)',
        gridMajor: 'rgba(124,249,255,0.11)', border: '#7CF9FF', accent: '#39FF9E',
        hazard: '#FF8A2B', prop: '#16333B', fog: 'rgba(14,44,50,0.16)'
      },
      grid: { size: 80, majorEvery: 4, angle: 0, lineWidth: 1 },
      ambient: {
        maxProps: 42, density: 0.000011,
        types: [
          { id: 'coolant_drum', weight: 4, radius: [10, 18] },
          { id: 'pipe_cluster', weight: 3, radius: [16, 28] },
          { id: 'floor_lamp', weight: 2, radius: [6, 10] }
        ]
      },
      hazards: [
        { id: 'heat_vent', type: 'pulse_disc', count: 5, radius: [62, 92], damagePerSecond: 18, cycle: 4.2, activeFor: 1.25, telegraphFor: 0.85 },
        { id: 'slag_lane', type: 'static_rect', count: 2, size: [210, 52], damagePerSecond: 9, cycle: 0, activeFor: 0, telegraphFor: 0 }
      ]
    }),
    freezeMap({
      id: 'acid_marsh',
      name: 'ACID MARSH',
      chapter: 'THE GREEN SINK',
      description: 'Broken islands and slow acid pools reward deliberate flanking.',
      seedSalt: 0x41434944,
      progression: { unlockLevel: 3, unlockBosses: 3, rewardMultiplier: 1.08 },
      palette: {
        background: '#050905', floor: '#09150E', gridMinor: 'rgba(140,255,107,0.04)',
        gridMajor: 'rgba(140,255,107,0.095)', border: '#8CFF6B', accent: '#D7FF68',
        hazard: '#A8FF36', prop: '#1D3B25', fog: 'rgba(58,102,32,0.18)'
      },
      grid: { size: 96, majorEvery: 3, angle: 0, lineWidth: 1 },
      ambient: {
        maxProps: 54, density: 0.000014,
        types: [
          { id: 'reed_cluster', weight: 5, radius: [8, 16] },
          { id: 'bone_pile', weight: 2, radius: [12, 22] },
          { id: 'spore_pod', weight: 3, radius: [9, 15] }
        ]
      },
      hazards: [
        { id: 'acid_pool', type: 'static_disc', count: 8, radius: [45, 86], damagePerSecond: 8, slowMultiplier: 0.72, cycle: 0, activeFor: 0, telegraphFor: 0 },
        { id: 'spore_bloom', type: 'pulse_disc', count: 4, radius: [72, 104], damagePerSecond: 11, cycle: 5.4, activeFor: 1.8, telegraphFor: 1.1 }
      ]
    }),
    freezeMap({
      id: 'rail_yard',
      name: 'RAIL YARD',
      chapter: 'THE MAGLEV GRAVE',
      description: 'Long sightlines crossed by strongly telegraphed energy rails.',
      seedSalt: 0x5241494c,
      progression: { unlockLevel: 6, unlockBosses: 8, rewardMultiplier: 1.16 },
      palette: {
        background: '#05060B', floor: '#0B0D18', gridMinor: 'rgba(184,146,255,0.04)',
        gridMajor: 'rgba(184,146,255,0.105)', border: '#B892FF', accent: '#7CF9FF',
        hazard: '#FF4D9D', prop: '#292346', fog: 'rgba(74,45,110,0.16)'
      },
      grid: { size: 72, majorEvery: 5, angle: 0, lineWidth: 1 },
      ambient: {
        maxProps: 36, density: 0.000009,
        types: [
          { id: 'signal_pylon', weight: 4, radius: [8, 12] },
          { id: 'cargo_block', weight: 3, radius: [20, 34] },
          { id: 'broken_track', weight: 5, radius: [14, 24] }
        ]
      },
      hazards: [
        { id: 'maglev_rail', type: 'sweep_lane', count: 3, size: [1320, 44], damagePerSecond: 30, cycle: 6.2, activeFor: 0.75, telegraphFor: 1.35 },
        { id: 'arc_node', type: 'pulse_disc', count: 4, radius: [50, 68], damagePerSecond: 15, cycle: 4.8, activeFor: 1.05, telegraphFor: 0.9 }
      ]
    }),
    freezeMap({
      id: 'frost_vault',
      name: 'FROST VAULT',
      chapter: 'THE CRYO ARCHIVE',
      description: 'Cold storage chambers with drifting ice and rotating freeze fields.',
      seedSalt: 0x46525354,
      progression: { unlockLevel: 10, unlockBosses: 15, rewardMultiplier: 1.25 },
      palette: {
        background: '#03080E', floor: '#07131E', gridMinor: 'rgba(143,211,255,0.04)',
        gridMajor: 'rgba(143,211,255,0.11)', border: '#8FD3FF', accent: '#D8F7FF',
        hazard: '#57E8FF', prop: '#17364B', fog: 'rgba(83,174,220,0.17)'
      },
      grid: { size: 88, majorEvery: 4, angle: Math.PI / 4, lineWidth: 1 },
      ambient: {
        maxProps: 48, density: 0.000012,
        types: [
          { id: 'ice_shard', weight: 5, radius: [8, 20] },
          { id: 'cryo_tank', weight: 2, radius: [18, 30] },
          { id: 'frost_beacon', weight: 2, radius: [7, 11] }
        ]
      },
      hazards: [
        { id: 'freeze_field', type: 'pulse_disc', count: 6, radius: [58, 88], damagePerSecond: 6, slowMultiplier: 0.54, cycle: 5.8, activeFor: 2.1, telegraphFor: 1.2 },
        { id: 'ice_drift', type: 'moving_disc', count: 3, radius: [36, 52], damagePerSecond: 5, slowMultiplier: 0.68, speed: [26, 46], cycle: 0, activeFor: 0, telegraphFor: 0 }
      ]
    }),
    freezeMap({
      id: 'solar_temple',
      name: 'SOLAR TEMPLE',
      chapter: 'THE CROWN ENGINE',
      description: 'Endgame arena where rotating sun-beams turn movement into timing.',
      seedSalt: 0x534f4c52,
      progression: { unlockLevel: 16, unlockBosses: 25, rewardMultiplier: 1.4 },
      palette: {
        background: '#0B0703', floor: '#171006', gridMinor: 'rgba(255,194,75,0.04)',
        gridMajor: 'rgba(255,194,75,0.105)', border: '#FFC24B', accent: '#FFE45E',
        hazard: '#FF4D6D', prop: '#4A2C12', fog: 'rgba(173,93,22,0.16)'
      },
      grid: { size: 100, majorEvery: 3, angle: Math.PI / 6, lineWidth: 1 },
      ambient: {
        maxProps: 30, density: 0.000008,
        types: [
          { id: 'sun_obelisk', weight: 2, radius: [18, 28] },
          { id: 'golden_rubble', weight: 5, radius: [10, 22] },
          { id: 'ember_brazier', weight: 3, radius: [8, 13] }
        ]
      },
      hazards: [
        { id: 'solar_beam', type: 'rotating_beam', count: 2, size: [900, 38], damagePerSecond: 34, angularSpeed: 0.21, cycle: 7, activeFor: 1.2, telegraphFor: 1.4 },
        { id: 'sun_well', type: 'pulse_disc', count: 4, radius: [70, 105], damagePerSecond: 20, cycle: 5, activeFor: 1.1, telegraphFor: 1 }
      ]
    })
  ]);

  const MAP_BY_ID = Object.create(null);
  for (let i = 0; i < MAPS.length; i++) MAP_BY_ID[MAPS[i].id] = MAPS[i];

  function freezeMap(map) {
    Object.freeze(map.progression);
    Object.freeze(map.palette);
    Object.freeze(map.grid);
    for (let i = 0; i < map.ambient.types.length; i++) Object.freeze(map.ambient.types[i]);
    Object.freeze(map.ambient.types);
    Object.freeze(map.ambient);
    for (let i = 0; i < map.hazards.length; i++) Object.freeze(map.hazards[i]);
    Object.freeze(map.hazards);
    map.world = DEFAULT_WORLD;
    return Object.freeze(map);
  }

  // FNV-1a turns a user-facing seed, map id, and channel into a stable uint32.
  function hashSeed(value) {
    const text = String(value == null ? '' : value);
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  function deriveSeed(runSeed, mapId, channel) {
    const map = getMap(mapId);
    const base = hashSeed(String(runSeed == null ? 1 : runSeed) + '|' + map.id + '|' + (channel || 'layout'));
    return (base ^ map.seedSalt) >>> 0 || 0x6d2b79f5;
  }

  function createRng(seed) {
    let state = (Number(seed) >>> 0) || 0x6d2b79f5;
    return function () {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    };
  }

  function getMap(id) {
    const map = MAP_BY_ID[id];
    if (!map) throw new Error('Unknown map id: ' + id);
    return map;
  }

  function getUnlockedMaps(progress) {
    const level = Math.max(1, Math.floor((progress && progress.level) || 1));
    const bosses = Math.max(0, Math.floor((progress && progress.bossesDefeated) || 0));
    const unlocked = [];
    for (let i = 0; i < MAPS.length; i++) {
      const gate = MAPS[i].progression;
      if (level >= gate.unlockLevel && bosses >= gate.unlockBosses) unlocked.push(MAPS[i]);
    }
    return unlocked;
  }

  function selectMap(progress, runSeed) {
    const unlocked = getUnlockedMaps(progress);
    // Level steers players toward newly unlocked maps; the seed varies repeats.
    const level = Math.max(1, Math.floor((progress && progress.level) || 1));
    const index = hashSeed(String(runSeed == null ? 1 : runSeed) + '|map|' + level) % unlocked.length;
    return unlocked[index];
  }

  function randomRange(rng, range) {
    return range[0] + (range[1] - range[0]) * rng();
  }

  function weightedType(rng, types) {
    let total = 0;
    for (let i = 0; i < types.length; i++) total += types[i].weight;
    let roll = rng() * total;
    for (let i = 0; i < types.length; i++) {
      roll -= types[i].weight;
      if (roll <= 0) return types[i];
    }
    return types[types.length - 1];
  }

  function isSpawnSafe(x, y, safeZones) {
    for (let i = 0; i < safeZones.length; i++) {
      const zone = safeZones[i];
      const dx = x - zone.x, dy = y - zone.y;
      if (dx * dx + dy * dy < zone.radius * zone.radius) return false;
    }
    return true;
  }

  function findPoint(rng, world, margin, safeZones) {
    // Bounded rejection sampling guarantees generation cannot stall a frame.
    for (let attempt = 0; attempt < 24; attempt++) {
      const x = margin + rng() * (world.width - margin * 2);
      const y = margin + rng() * (world.height - margin * 2);
      if (isSpawnSafe(x, y, safeZones)) return { x: x, y: y };
    }
    return { x: margin, y: margin };
  }

  function generateLayout(mapId, runSeed, options) {
    const map = getMap(mapId);
    const world = map.world;
    const opts = options || {};
    const propRng = createRng(deriveSeed(runSeed, map.id, 'props'));
    const hazardRng = createRng(deriveSeed(runSeed, map.id, 'hazards'));
    const safeZones = opts.safeZones || [{ x: world.width / 2, y: world.height / 2, radius: 260 }];
    const areaCount = Math.round(world.width * world.height * map.ambient.density);
    const propCount = Math.min(map.ambient.maxProps, Math.max(0, opts.propCount == null ? areaCount : opts.propCount));
    const props = new Array(propCount);
    const hazards = [];

    for (let i = 0; i < propCount; i++) {
      const type = weightedType(propRng, map.ambient.types);
      const radius = randomRange(propRng, type.radius);
      const point = findPoint(propRng, world, radius + 36, safeZones);
      props[i] = {
        id: 'prop-' + i, type: type.id, x: point.x, y: point.y,
        radius: radius, rotation: propRng() * TAU, variant: Math.floor(propRng() * 4)
      };
    }

    let hazardIndex = 0;
    for (let t = 0; t < map.hazards.length; t++) {
      const spec = map.hazards[t];
      for (let i = 0; i < spec.count; i++) {
        const radius = spec.radius ? randomRange(hazardRng, spec.radius) : Math.max(spec.size[0], spec.size[1]) * 0.5;
        const point = findPoint(hazardRng, world, Math.min(180, radius + 36), safeZones);
        const item = {
          id: 'hazard-' + hazardIndex++, type: spec.type, specId: spec.id,
          x: point.x, y: point.y, radius: radius,
          width: spec.size ? spec.size[0] : radius * 2,
          height: spec.size ? spec.size[1] : radius * 2,
          rotation: hazardRng() * TAU,
          phase: spec.cycle ? hazardRng() * spec.cycle : 0,
          damagePerSecond: spec.damagePerSecond,
          slowMultiplier: spec.slowMultiplier == null ? 1 : spec.slowMultiplier,
          cycle: spec.cycle, activeFor: spec.activeFor, telegraphFor: spec.telegraphFor,
          speed: spec.speed ? randomRange(hazardRng, spec.speed) : 0,
          angularSpeed: spec.angularSpeed || 0
        };
        hazards.push(item);
      }
    }

    return {
      apiVersion: API_VERSION,
      mapId: map.id,
      seed: deriveSeed(runSeed, map.id, 'layout'),
      world: world,
      palette: map.palette,
      grid: map.grid,
      props: props,
      hazards: hazards
    };
  }

  function resolveHazardState(hazard, elapsedSeconds, out) {
    const state = out || {};
    const cycle = hazard.cycle;
    let phase = 0;
    if (cycle > 0) phase = ((elapsedSeconds + hazard.phase) % cycle + cycle) % cycle;
    state.active = cycle <= 0 || phase < hazard.activeFor;
    state.telegraphing = cycle > 0 && !state.active && phase >= cycle - hazard.telegraphFor;
    state.phase = phase;
    state.x = hazard.x;
    state.y = hazard.y;
    state.rotation = hazard.rotation;
    if (hazard.type === 'moving_disc') {
      state.x += Math.cos(hazard.rotation) * Math.sin(elapsedSeconds * 0.38 + hazard.phase) * hazard.speed * 6;
      state.y += Math.sin(hazard.rotation) * Math.sin(elapsedSeconds * 0.38 + hazard.phase) * hazard.speed * 6;
    } else if (hazard.type === 'rotating_beam') {
      state.rotation += elapsedSeconds * hazard.angularSpeed;
    }
    return state;
  }

  function pointInHazard(x, y, hazard, state) {
    if (!state.active) return false;
    const dx = x - state.x, dy = y - state.y;
    if (hazard.type.indexOf('disc') !== -1 || hazard.type === 'sun_well') {
      return dx * dx + dy * dy <= hazard.radius * hazard.radius;
    }
    const c = Math.cos(-state.rotation), s = Math.sin(-state.rotation);
    const localX = dx * c - dy * s, localY = dx * s + dy * c;
    return Math.abs(localX) <= hazard.width * 0.5 && Math.abs(localY) <= hazard.height * 0.5;
  }

  return Object.freeze({
    version: API_VERSION,
    maps: MAPS,
    getMap: getMap,
    getUnlockedMaps: getUnlockedMaps,
    selectMap: selectMap,
    hashSeed: hashSeed,
    deriveSeed: deriveSeed,
    createRng: createRng,
    generateLayout: generateLayout,
    resolveHazardState: resolveHazardState,
    pointInHazard: pointInHazard
  });
});
