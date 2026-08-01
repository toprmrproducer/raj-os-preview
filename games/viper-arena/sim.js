/* VIPER ARENA - core simulation.
   Pure logic, ZERO DOM/canvas references so it can be imported in node for tests
   AND run in the browser via a plain <script> tag. Deterministic fixed-step. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.VIPER = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------- constants ----------
  const W = 2400, H = 1600;             // arena world size
  const DT = 1 / 60;                    // fixed timestep
  const SEG = 9;                        // spacing between body points (px)
  const HEAD_R = 12;                    // head radius
  const BODY_R = 9;                     // body radius
  const PLAYER_SPEED = 320;             // px/s
  const TURN_RATE = 7.5;                // rad/s steering
  const START_LEN = 14;                 // body points
  const MAX_HP = 145;
  const MAX_STAMINA = 100;              // base stamina pool, grows as the snake eats
  const BOOST_MULT = 1.65;              // speed multiplier while boosting
  const BOOST_DRAIN = 34;               // stamina/sec consumed while boosting
  const STAMINA_REGEN = 14;             // stamina/sec regenerated while not boosting

  // ---------- rng ----------
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- math ----------
  const TAU = Math.PI * 2;
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const dist2 = (ax, ay, bx, by) => { const dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; };
  function angLerp(a, b, t) {
    let d = ((b - a + Math.PI) % TAU) - Math.PI;
    if (d < -Math.PI) d += TAU;
    return a + d * t;
  }

  // ---------- weapons ----------
  // fire() returns array of projectile specs relative to muzzle; sim adds owner/pos.
  const WEAPONS = {
    pistol: {
      name: 'PISTOL', ammo: Infinity, cd: 0.22, spread: 0.02, pellets: 1,
      speed: 1100, dmg: 26, life: 1.1, radius: 4, recoil: 90, shake: 3,
      knock: 60, pierce: 0, color: '#7CF9FF', kind: 'bullet'
    },
    shotgun: {
      name: 'SHOTGUN', ammo: 20, cd: 0.62, spread: 0.44, pellets: 11,
      speed: 940, dmg: 16, life: 0.72, radius: 3, recoil: 260, shake: 12,
      knock: 340, pierce: 0, color: '#FFC24B', kind: 'bullet'
    },
    smg: {
      name: 'SMG', ammo: 90, cd: 0.065, spread: 0.14, pellets: 1,
      speed: 1250, dmg: 12, life: 0.9, radius: 3, recoil: 55, shake: 2.4,
      knock: 40, pierce: 0, color: '#8CFF6B', kind: 'bullet'
    },
    railgun: {
      name: 'RAILGUN', ammo: 6, cd: 0.9, spread: 0, pellets: 1, charge: 0.55,
      speed: 0, dmg: 120, life: 0, radius: 0, recoil: 320, shake: 20,
      knock: 260, pierce: 999, color: '#FF4D6D', kind: 'beam', range: 3200
    },
    flamethrower: {
      name: 'FLAME', ammo: 200, cd: 0.03, spread: 0.5, pellets: 2,
      speed: 560, dmg: 4.5, life: 0.28, radius: 10, recoil: 30, shake: 1.6,
      knock: 12, pierce: 999, color: '#FF8A2B', kind: 'flame'
    },
    sniper: {
      name: 'SNIPER', ammo: 8, cd: 1.15, spread: 0, pellets: 1,
      speed: 1900, dmg: 90, life: 1.4, radius: 5, recoil: 300, shake: 14,
      knock: 420, pierce: 1, color: '#F7E45E', kind: 'bullet'
    }
  };
  const WEAPON_ORDER = ['pistol', 'shotgun', 'smg', 'railgun', 'flamethrower', 'sniper'];

  const LOADOUTS = {
    overdrive: {
      name: 'OVERDRIVE FINS', color: '#7CF9FF', speedMult: 1.10,
      maxHp: 145, damageScale: 1, startWeapon: 'smg', startAmmo: 54
    },
    bulwark: {
      name: 'BULWARK PLATING', color: '#FFC24B', speedMult: 0.94,
      maxHp: 195, damageScale: 0.72, startWeapon: 'shotgun', startAmmo: 12
    },
    arc: {
      name: 'ARC COIL', color: '#FF4D9D', speedMult: 1,
      maxHp: 128, damageScale: 1.08, startWeapon: 'railgun', startAmmo: 3
    },
    inferno: {
      name: 'INFERNO GLANDS', color: '#FF8A2B', speedMult: 1.04,
      maxHp: 150, damageScale: 1, startWeapon: 'flamethrower', startAmmo: 160
    },
    phantom: {
      name: 'PHANTOM SCALES', color: '#8CFF6B', speedMult: 1.22,
      maxHp: 112, damageScale: 1.18, startWeapon: 'pistol', startAmmo: Infinity,
      staminaMult: 1.5
    },
    titan: {
      name: 'TITAN CORE', color: '#C2B2E9', speedMult: 0.86,
      maxHp: 250, damageScale: 0.6, startWeapon: 'shotgun', startAmmo: 16,
      staminaMult: 0.7
    }
  };

  // ---------- class abilities (press E / ability button) ----------
  const ABILITIES = {
    overdrive: { name: 'OVERCLOCK', desc: 'Fire rate x2 + speed for 3.5s', cd: 14, dur: 3.5 },
    bulwark: { name: 'IRON SHELL', desc: 'Invincible for 2.8s', cd: 16, dur: 2.8 },
    arc: { name: 'EMP BURST', desc: 'Zap + shove everything near you', cd: 12, dur: 0 },
    inferno: { name: 'FIRE RING', desc: 'Ring of flame in every direction', cd: 11, dur: 0 },
    phantom: { name: 'GHOST STEP', desc: 'Untouchable + faster for 2.2s', cd: 13, dur: 2.2 },
    titan: { name: 'SHOCKWAVE', desc: 'Stun + hurl back every enemy', cd: 15, dur: 0 }
  };

  // ---------- boss roster: a boss every 3rd wave, 50 unique bosses deep ----------
  const BOSS_ROSTER = [
    ['VENOM TITAN', 'BREAK THE TITAN', 'shotgun', '#FFC24B'],
    ['RAIL WYRM', 'CUT THE RAIL WYRM', 'railgun', '#FF4D9D'],
    ['INFERNO HYDRA', 'SURVIVE THE HYDRA', 'flamethrower', '#FF8A2B'],
    ['NIGHT ADDER', 'OUTLAST THE ADDER', 'smg', '#8CFF6B'],
    ['IRON BASILISK', 'SHATTER THE BASILISK', 'shotgun', '#C2B2E9'],
    ['STORM SERPENT', 'GROUND THE STORM', 'railgun', '#7CF9FF'],
    ['MAGMA MAMBA', 'COOL THE MAMBA', 'flamethrower', '#FF5A5A'],
    ['GHOST COIL', 'CATCH THE GHOST', 'smg', '#E8E8E8'],
    ['DOOM KRAIT', 'DENY THE DOOM', 'shotgun', '#FFD95A'],
    ['PLASMA PYTHON', 'VENT THE PLASMA', 'railgun', '#FF4D6D'],
    ['CINDER COBRA', 'SMOTHER THE CINDER', 'flamethrower', '#FF9A5A'],
    ['NEON TAIPAN', 'DIM THE NEON', 'smg', '#39FF9E'],
    ['GRAVE BOA', 'BURY THE BOA', 'shotgun', '#B9DFE8'],
    ['VOLT VIPER', 'SHORT THE VOLT', 'railgun', '#F7E45E'],
    ['ASH RATTLER', 'SCATTER THE ASH', 'flamethrower', '#D0CFCB'],
    ['RAZOR SIDEWINDER', 'DULL THE RAZOR', 'smg', '#A9E1D2'],
    ['OBSIDIAN FANG', 'CRACK THE OBSIDIAN', 'shotgun', '#9A8FB8'],
    ['PULSE LEVIATHAN', 'STILL THE PULSE', 'railgun', '#7CF9FF'],
    ['FURNACE WYRM', 'QUENCH THE FURNACE', 'flamethrower', '#FF8A2B'],
    ['SPECTER ASP', 'EXPOSE THE SPECTER', 'smg', '#CFE8B9'],
    ['TITANIUM KRAIT', 'BEND THE TITANIUM', 'shotgun', '#C9D6DF'],
    ['ARC BASILISK', 'BREAK THE ARC', 'railgun', '#FF4D9D'],
    ['PYRE PYTHON', 'DROWN THE PYRE', 'flamethrower', '#FF6B4A'],
    ['STATIC MAMBA', 'MUTE THE STATIC', 'smg', '#B5F44A'],
    ['BULWARK BOA', 'PIERCE THE BULWARK', 'shotgun', '#FFC24B'],
    ['ION SERPENT', 'DISCHARGE THE ION', 'railgun', '#8FD3FF'],
    ['EMBER ADDER', 'STAMP THE EMBER', 'flamethrower', '#FF9E58'],
    ['PHANTOM RATTLER', 'PIN THE PHANTOM', 'smg', '#A0FFB7'],
    ['GRANITE COBRA', 'SPLIT THE GRANITE', 'shotgun', '#BFB8AE'],
    ['TESLA TAIPAN', 'UNPLUG THE TESLA', 'railgun', '#7EE3FF'],
    ['BLAZE SIDEWINDER', 'STARVE THE BLAZE', 'flamethrower', '#FF7B39'],
    ['VAPOR FANG', 'CONDENSE THE VAPOR', 'smg', '#D8F7FF'],
    ['ANVIL VIPER', 'LIFT THE ANVIL', 'shotgun', '#A8A29E'],
    ['SURGE WYRM', 'DAM THE SURGE', 'railgun', '#66E0FF'],
    ['SCORCH HYDRA', 'CHILL THE SCORCH', 'flamethrower', '#FF5F1F'],
    ['WISP KRAIT', 'SNUFF THE WISP', 'smg', '#E5FFB8'],
    ['FORTRESS BOA', 'STORM THE FORTRESS', 'shotgun', '#D4C7ED'],
    ['DYNAMO ASP', 'STALL THE DYNAMO', 'railgun', '#5EEAD4'],
    ['CALDERA COBRA', 'CAP THE CALDERA', 'flamethrower', '#FF4500'],
    ['MIRAGE MAMBA', 'REVEAL THE MIRAGE', 'smg', '#B8E1FF'],
    ['JUGGERNAUT PYTHON', 'HALT THE JUGGERNAUT', 'shotgun', '#8B8589'],
    ['CAPACITOR KRAIT', 'DRAIN THE CAPACITOR', 'railgun', '#9BF6FF'],
    ['SOLSTICE SERPENT', 'ECLIPSE THE SOLSTICE', 'flamethrower', '#FFB627'],
    ['SHADOW TAIPAN', 'LIGHT THE SHADOW', 'smg', '#6B7280'],
    ['RAMPART RATTLER', 'BREACH THE RAMPART', 'shotgun', '#E0C9A6'],
    ['REACTOR WYRM', 'SCRAM THE REACTOR', 'railgun', '#4ADE80'],
    ['PYROCLAST BOA', 'SETTLE THE PYROCLAST', 'flamethrower', '#F97316'],
    ['WRAITH SIDEWINDER', 'BANISH THE WRAITH', 'smg', '#CBD5E1'],
    ['MONOLITH ADDER', 'TOPPLE THE MONOLITH', 'shotgun', '#94A3B8'],
    ['OMEGA LEVIATHAN', 'END THE OMEGA', 'railgun', '#FF2BD6']
  ];

  // waves 3, 6, 9, ... 150 — one boss per entry, stats scale with depth
  const BOSS_MISSIONS = {};
  BOSS_ROSTER.forEach(function (row, i) {
    const wave = (i + 1) * 3;
    BOSS_MISSIONS[wave] = {
      name: row[0], title: row[1], weapon: row[2], color: row[3],
      hp: Math.round(520 + i * 190 + i * i * 6),
      speed: Math.min(420, 235 + i * 5),
      length: Math.min(80, 30 + i * 2),
      escorts: Math.min(10, 2 + Math.floor(i * 0.6)),
      score: 1600 + i * 800,
      scale: Math.min(2.4, 1.34 + i * 0.035)
    };
  });

  const ENEMY_NAMES = ['VENOM', 'KRAIT', 'MAMBA', 'COBRA', 'ASP', 'RATTLER',
    'BOA', 'PYTHON', 'ADDER', 'TAIPAN', 'SIDEWINDER', 'FANG'];

  // ---------- snake ----------
  function makeSnake(x, y, heading, len, isPlayer) {
    const pts = [];
    for (let i = 0; i < len; i++) pts.push({ x: x - Math.cos(heading) * i * SEG, y: y - Math.sin(heading) * i * SEG });
    return {
      pts, heading, targetHeading: heading, isPlayer,
      hp: isPlayer ? MAX_HP : 60, maxHp: isPlayer ? MAX_HP : 60,
      len, alive: true, speed: isPlayer ? PLAYER_SPEED : 210,
      weapon: 'pistol', ammo: Infinity, cd: 0, charging: 0, wantFire: false,
      recoil: 0, aimAng: heading, name: isPlayer ? 'YOU' : 'ENEMY',
      hitFlash: 0, color: isPlayer ? '#39FF9E' : '#FF5A5A', damageDir: 0, damageFlash: 0,
      brain: { reactT: 0, strafe: 1, dodgeT: 0, dodgeAng: 0 }
    };
  }

  // ---------- game ----------
  function Game(seed, options) {
    this.seed = seed || 1337;
    this.options = options || {};
    this.reset();
  }

  Game.prototype.reset = function () {
    this.rng = mulberry32(this.seed);
    this.t = 0;
    this.player = makeSnake(W / 2, H / 2, 0, START_LEN, true);
    this.enemies = [];
    this.projectiles = [];
    this.beams = [];         // timed rail beams for render {x1,y1,x2,y2,life,color}
    this.crates = [];
    this.pellets = [];
    this.floaters = [];      // {x,y,txt,life,color}
    this.events = [];        // drained by render/audio
    this.score = 0;
    this.combo = 1;
    this.comboT = 0;
    this.wave = 0;
    this.waveGoal = 0;
    this.waveKills = 0;
    this.currentMission = null;
    this.waveCountdown = 1.2;
    this.betweenWaves = true;
    this.gameOver = false;
    this.deathCause = '';
    this.kills = 0;
    this.pid = 1;
    this.applyLoadout(this.options.loadout || 'overdrive');
    this._spawnPellets(18);
    return this;
  };

  Game.prototype.applyLoadout = function (key) {
    const loadout = LOADOUTS[key] || LOADOUTS.overdrive;
    const p = this.player;
    p.loadout = LOADOUTS[key] ? key : 'overdrive';
    p.equipmentColor = loadout.color;
    p.baseMaxHp = loadout.maxHp;
    p.maxHp = loadout.maxHp;
    p.hp = loadout.maxHp;
    p.speed = PLAYER_SPEED * loadout.speedMult;
    p.damageScale = loadout.damageScale;
    p.weapon = loadout.startWeapon;
    p.ammo = loadout.startAmmo;
    p.maxStamina = Math.round(MAX_STAMINA * (loadout.staminaMult || 1));
    p.stamina = p.maxStamina;
    p.wantBoost = false;
    p.boosting = false;
    p.abilityCdT = 0;        // seconds until the ability is ready again
    p.abilityActiveT = 0;    // seconds the ability effect has left
    p.invincibleT = 0;
  };

  Game.prototype.useAbility = function () {
    const p = this.player;
    if (this.gameOver || !p.alive) return false;
    const ab = ABILITIES[p.loadout];
    if (!ab || p.abilityCdT > 0) return false;
    p.abilityCdT = ab.cd;
    const head = p.pts[0];
    if (ab.dur > 0) p.abilityActiveT = ab.dur;
    if (p.loadout === 'bulwark' || p.loadout === 'phantom') p.invincibleT = ab.dur;
    if (p.loadout === 'arc') {
      for (const e of this.enemies) {
        if (!e.alive) continue;
        const eh = e.pts[0];
        const d = Math.hypot(eh.x - head.x, eh.y - head.y);
        if (d < 430) {
          const ang = Math.atan2(eh.y - head.y, eh.x - head.x);
          this._hitSnake(e, 85, ang, 620, p);
          e.brain.reactT = Math.max(e.brain.reactT, 0.9);
        }
      }
      this.emit({ type: 'shake', amt: 14 });
    }
    if (p.loadout === 'inferno') {
      for (let i = 0; i < 26; i++) {
        const ang = (i / 26) * TAU;
        this.projectiles.push({
          x: head.x + Math.cos(ang) * 20, y: head.y + Math.sin(ang) * 20,
          vx: Math.cos(ang) * 620, vy: Math.sin(ang) * 620,
          life: 0.55, r: 10, dmg: 14, knock: 60, pierce: 2,
          color: '#FF8A2B', owner: 'p', kind: 'flame'
        });
      }
      this.emit({ type: 'shake', amt: 8 });
    }
    if (p.loadout === 'titan') {
      for (const e of this.enemies) {
        if (!e.alive) continue;
        const eh = e.pts[0];
        const d = Math.hypot(eh.x - head.x, eh.y - head.y);
        if (d < 480) {
          const ang = Math.atan2(eh.y - head.y, eh.x - head.x);
          this._hitSnake(e, 40, ang, 980, p);
          e.brain.reactT = Math.max(e.brain.reactT, 1.4);   // stunned
        }
      }
      this.emit({ type: 'shake', amt: 20 });
    }
    this.emit({ type: 'ability', name: ab.name, x: head.x, y: head.y, loadout: p.loadout });
    this.emit({ type: 'sfx', name: 'pickup' });
    return true;
  };

  Game.prototype.setBoost = function (down) { this.player.wantBoost = !!down; };

  Game.prototype.emit = function (e) { this.events.push(e); };

  Game.prototype._rndPos = function (margin) {
    margin = margin || 120;
    return { x: margin + this.rng() * (W - margin * 2), y: margin + this.rng() * (H - margin * 2) };
  };

  Game.prototype._spawnPellets = function (n) {
    for (let i = 0; i < n; i++) { const p = this._rndPos(80); this.pellets.push({ x: p.x, y: p.y, r: 7, ph: this.rng() * TAU }); }
  };

  Game.prototype.spawnCrate = function (type) {
    if (!type) type = WEAPON_ORDER[1 + ((this.rng() * (WEAPON_ORDER.length - 1)) | 0)];
    const p = this._rndPos(140);
    this.crates.push({ x: p.x, y: p.y, type, r: 18, ph: 0 });
    return this.crates[this.crates.length - 1];
  };

  Game.prototype.spawnEnemy = function (hp, options) {
    options = options || {};
    const p = this._rndPos(160);
    // keep away from player spawn
    const pl = this.player.pts[0];
    if (dist2(p.x, p.y, pl.x, pl.y) < 420 * 420) { p.x = clamp(p.x + 520, 120, W - 120); }
    // pick an archetype for regular enemies: mixed sizes and behaviours
    let arch = options.archetype || 'grunt';
    if (!options.boss && !options.archetype) {
      const roll = this.rng();
      const reaperAlive = this.enemies.some(e => e.alive && e.archetype === 'reaper');
      if (this.wave >= 5 && !reaperAlive && roll < 0.10) arch = 'reaper';
      else if (roll < 0.28) arch = 'runner';
      else if (roll < 0.46) arch = 'brute';
      else if (this.wave >= 4 && roll < 0.58) arch = 'sniper';
      else if (this.wave >= 3 && roll < 0.72) arch = 'rusher';
    }
    const baseLen = options.length ||
      (arch === 'reaper' ? 55 + ((this.rng() * 14) | 0) :
       arch === 'brute' ? 22 + ((this.rng() * 10) | 0) :
       arch === 'runner' ? 9 + ((this.rng() * 4) | 0) :
       arch === 'sniper' ? 8 + ((this.rng() * 3) | 0) :
       arch === 'rusher' ? 11 + ((this.rng() * 5) | 0) :
       10 + ((this.rng() * 12) | 0));
    const s = makeSnake(p.x, p.y, this.rng() * TAU, baseLen, false);
    s.archetype = arch;
    s.name = options.name || (
      arch === 'reaper' ? 'THE REAPER' :
      (ENEMY_NAMES[(this.rng() * ENEMY_NAMES.length) | 0] + '-' + (this.pid++)));
    let baseHp = hp || (55 + this.wave * 8);
    let baseSpd = options.speed || (195 + Math.min(175, this.wave * 10) + this.rng() * 35);
    if (!options.boss && !hp) {
      if (arch === 'runner') { baseHp *= 0.7; baseSpd += 85; s.color = '#5AA7FF'; s.scale = 0.88; }
      if (arch === 'brute') { baseHp *= 2.1; baseSpd -= 45; s.color = '#B14AFF'; s.scale = 1.3; }
      if (arch === 'reaper') { baseHp *= 1.9; baseSpd += 25; s.color = '#FF2BD6'; s.scale = 1.15; }
      if (arch === 'sniper') { baseHp *= 0.45; baseSpd -= 30; s.color = '#F7E45E'; s.scale = 0.92; }
      if (arch === 'rusher') { baseHp *= 0.8; baseSpd += 110; s.color = '#FF5F1F'; s.scale = 0.95; }
    }
    s.maxHp = s.hp = baseHp;
    s.speed = baseSpd;
    s.boss = !!options.boss;
    s.bossScore = options.score || 0;
    if (options.scale) s.scale = options.scale; else if (!s.scale) s.scale = 1;
    if (options.color) s.color = options.color;
    // arm enemies from wave 2+
    if (options.weapon) {
      s.weapon = options.weapon;
      const wd = WEAPONS[s.weapon];
      s.ammo = wd.ammo === Infinity ? Infinity : wd.ammo * 12;
    } else if (arch === 'sniper') {
      s.weapon = 'sniper';
      s.ammo = Infinity;
    } else if (this.wave >= 2) {
      const pool = ['pistol', 'smg', 'shotgun'];
      s.weapon = pool[(this.rng() * (Math.min(pool.length, 1 + (this.wave / 2 | 0)))) | 0] || 'pistol';
      const wd = WEAPONS[s.weapon];
      s.ammo = wd.ammo === Infinity ? Infinity : wd.ammo * 4;
    }
    s.brain.strafe = this.rng() < 0.5 ? 1 : -1;
    this.enemies.push(s);
    return s;
  };

  Game.prototype._startWave = function () {
    this.wave++;
    this.betweenWaves = false;
    this.waveKills = 0;
    const mission = BOSS_MISSIONS[this.wave] || null;
    this.currentMission = mission;
    const count = 3 + Math.floor(this.wave * 1.7);
    if (mission) {
      this.spawnEnemy(mission.hp, {
        name: mission.name,
        speed: mission.speed,
        length: mission.length,
        weapon: mission.weapon,
        color: mission.color,
        score: mission.score,
        scale: mission.scale,
        boss: true
      });
      for (let i = 0; i < mission.escorts; i++) this.spawnEnemy();
      this.waveGoal = mission.escorts + 1;
    } else {
      for (let i = 0; i < count; i++) this.spawnEnemy();
      this.waveGoal = count;
    }
    // guarantee a crate each wave
    this.spawnCrate();
    if (this.wave % 2 === 0) this.spawnCrate();
    this.emit({
      type: mission ? 'bossWave' : 'wave',
      wave: this.wave,
      title: mission ? mission.title : ('WAVE ' + this.wave)
    });
  };

  // ---------- input surface ----------
  Game.prototype.setKeyDir = function (dir) { this._dir = dir; };
  Game.prototype.setAim = function (x, y) { this._aimX = x; this._aimY = y; this._hasAim = true; };
  Game.prototype.setFire = function (down) { this.player.wantFire = !!down; };

  // dir vector from keyboard set by main/input; sim also accepts direct keymap
  Game.prototype.applyKeys = function (keys) {
    let dx = 0, dy = 0;
    if (keys.up) dy -= 1; if (keys.down) dy += 1;
    if (keys.left) dx -= 1; if (keys.right) dx += 1;
    if (dx || dy) this.player.targetHeading = Math.atan2(dy, dx);
    this._keysActive = !!(dx || dy);
  };

  // ---------- firing ----------
  Game.prototype._equip = function (snake, type) {
    snake.weapon = type;
    const wd = WEAPONS[type];
    snake.ammo = wd.ammo === Infinity ? Infinity : wd.ammo;
    snake.cd = 0; snake.charging = 0;
  };

  Game.prototype._doFire = function (snake, aimAng) {
    const wd = WEAPONS[snake.weapon];
    if (snake.cd > 0) return false;
    if (snake.ammo !== Infinity && snake.ammo <= 0) {
      if (snake.weapon !== 'pistol') this._equip(snake, 'pistol');
      return false;
    }
    // railgun charge gate
    if (wd.charge && snake.charging < wd.charge) return false;

    const head = snake.pts[0];
    const mx = head.x + Math.cos(aimAng) * (HEAD_R + 6);
    const my = head.y + Math.sin(aimAng) * (HEAD_R + 6);
    snake.cd = wd.cd;
    snake.charging = 0;
    if (snake.ammo !== Infinity) snake.ammo--;

    if (wd.kind === 'beam') {
      // hitscan piercing beam
      const ex = head.x + Math.cos(aimAng) * wd.range;
      const ey = head.y + Math.sin(aimAng) * wd.range;
      this._beamDamage(snake, head.x, head.y, aimAng, wd);
      this.beams.push({ x1: mx, y1: my, x2: ex, y2: ey, life: 0.16, color: wd.color });
      snake.recoil = wd.recoil;
      this.emit({ type: 'muzzle', x: mx, y: my, ang: aimAng, power: 2, color: wd.color });
      this.emit({ type: 'shake', amt: wd.shake });
      this.emit({ type: 'sfx', name: 'rail' });
    } else {
      for (let i = 0; i < wd.pellets; i++) {
        const sp = (this.rng() - 0.5) * wd.spread * 2;
        const a = aimAng + sp;
        this.projectiles.push({
          x: mx, y: my, vx: Math.cos(a) * wd.speed, vy: Math.sin(a) * wd.speed,
          dmg: wd.dmg, life: wd.life, r: wd.radius, owner: snake.isPlayer ? 'p' : 'e',
          pierce: wd.pierce, knock: wd.knock, color: wd.color, kind: wd.kind, hitset: null
        });
      }
      snake.recoil = wd.recoil;
      this.emit({ type: 'muzzle', x: mx, y: my, ang: aimAng, power: wd.pellets > 4 ? 2 : 1, color: wd.color, kind: wd.kind });
      this.emit({ type: 'shake', amt: wd.shake });
      this.emit({ type: 'sfx', name: snake.weapon });
    }
    return true;
  };

  Game.prototype._beamDamage = function (owner, x, y, ang, wd) {
    const dx = Math.cos(ang), dy = Math.sin(ang);
    const list = owner.isPlayer ? this.enemies : [this.player];
    for (const s of list) {
      if (!s.alive) continue;
      for (let i = 0; i < s.pts.length; i++) {
        const p = s.pts[i];
        // project point onto ray
        const t = (p.x - x) * dx + (p.y - y) * dy;
        if (t < 0 || t > wd.range) continue;
        const px = x + dx * t, py = y + dy * t;
        if (dist2(px, py, p.x, p.y) < (BODY_R + 10) * (BODY_R + 10)) {
          this._hitSnake(s, wd.dmg, ang, wd.knock, owner);
          break;
        }
      }
    }
  };

  // ---------- damage ----------
  Game.prototype._hitSnake = function (s, dmg, ang, knock, owner) {
    if (!s.alive) return;
    if (s.isPlayer) {
      if (s.invincibleT > 0) {
        this.emit({ type: 'spark', x: s.pts[0].x, y: s.pts[0].y, color: '#7CF9FF' });
        return;   // ability shield: no damage, no knockback
      }
      dmg *= s.damageScale || 1;
      if (this.wave <= 3) dmg *= 0.78;   // early-wave mercy so round two doesn't annihilate new players
    }
    s.hp -= dmg;
    s.hitFlash = 0.14;
    // knockback nudges head
    const head = s.pts[0];
    head.x = clamp(head.x + Math.cos(ang) * knock * DT, 10, W - 10);
    head.y = clamp(head.y + Math.sin(ang) * knock * DT, 10, H - 10);
    if (s.isPlayer) {
      s.damageDir = ang;
      s.damageFlash = 0.5;
      // losing hp also trims tail a touch
      if (s.pts.length > 8 && this.rng() < 0.5) s.pts.pop();
      this.emit({ type: 'sfx', name: 'hurt' });
    } else if (owner && owner.isPlayer) {
      this.emit({ type: 'hitmarker' });
      this.emit({ type: 'sfx', name: 'tick' });
    }
    this.emit({ type: 'blood', x: head.x, y: head.y, color: s.color, n: 6 });
    if (s.hp <= 0) this._killSnake(s, owner);
  };

  Game.prototype._killSnake = function (s, owner) {
    if (!s.alive) return;
    s.alive = false;
    for (let i = 0; i < s.pts.length; i += 2) this.emit({ type: 'burst', x: s.pts[i].x, y: s.pts[i].y, color: s.color });
    if (s.isPlayer) {
      this.gameOver = true;
      if (!this.deathCause) this.deathCause = (owner && owner.name) ? owner.name : 'THE ARENA';
      this.emit({ type: 'death', cause: this.deathCause });
      this.emit({ type: 'shake', amt: 26 });
      this.emit({ type: 'sfx', name: 'death' });
    } else {
      const gain = Math.round((s.boss ? s.bossScore : 100) * this.combo);
      this.score += gain;
      this.kills++;
      this.waveKills++;
      this.combo = Math.min(8, this.combo + 0.5);
      this.comboT = 3.2;
      // drop orbs proportional to how big the snake got
      const hp0 = s.pts[0];
      const drops = clamp(Math.round(s.pts.length / 5), 1, 14);
      for (let i = 0; i < drops; i++) {
        const a = this.rng() * TAU, rr = this.rng() * Math.min(140, 20 + s.pts.length * 2);
        this.pellets.push({
          x: clamp(hp0.x + Math.cos(a) * rr, 40, W - 40),
          y: clamp(hp0.y + Math.sin(a) * rr, 40, H - 40),
          r: 7, ph: this.rng() * TAU
        });
      }
      if (this.rng() < 0.22) this.crates.push({ x: hp0.x, y: hp0.y, type: WEAPON_ORDER[1 + ((this.rng() * (WEAPON_ORDER.length - 1)) | 0)], r: 18, ph: 0 });
      this.floaters.push({ x: hp0.x, y: hp0.y, txt: '+' + gain, life: 1.0, color: '#FFE45E' });
      this.emit({ type: 'kill', x: hp0.x, y: hp0.y, name: s.name });
      if (s.boss) this.emit({ type: 'bossKill', x: hp0.x, y: hp0.y, name: s.name });
      this.emit({ type: 'shake', amt: 8 });
      this.emit({ type: 'sfx', name: s.boss ? 'bossKill' : 'kill' });
    }
  };

  // ---------- enemy AI ----------
  // returns the most dangerous incoming player bullet, or null
  Game.prototype._incomingThreat = function (s) {
    const eh = s.pts[0];
    let worst = null, worstT = Infinity;
    for (const pr of this.projectiles) {
      if (pr.owner !== 'p' || pr.life <= 0) continue;
      const rx = eh.x - pr.x, ry = eh.y - pr.y;
      const spd2 = pr.vx * pr.vx + pr.vy * pr.vy;
      if (spd2 < 1) continue;
      // time until the bullet is closest to the enemy head
      const t = (rx * pr.vx + ry * pr.vy) / spd2;
      if (t < 0 || t > 0.65) continue;                 // already passed, or too far out to care
      const cx = pr.x + pr.vx * t - eh.x;
      const cy = pr.y + pr.vy * t - eh.y;
      const miss = Math.hypot(cx, cy);
      if (miss < HEAD_R + pr.r + 34 && t < worstT) { worstT = t; worst = pr; }
    }
    return worst;
  };

  Game.prototype._thinkEnemy = function (s) {
    const ph = this.player.pts[0];
    const eh = s.pts[0];
    // lead prediction: aim where player will be
    const pv = this._playerVel();
    const dxp = ph.x - eh.x, dyp = ph.y - eh.y;
    const d = Math.hypot(dxp, dyp) || 1;
    const lead = clamp(d / 900, 0, 0.5);
    const tx = ph.x + pv.x * lead, ty = ph.y + pv.y * lead;
    const toAng = Math.atan2(ty - eh.y, tx - eh.x);

    // bullet evasion: if a player shot is on a collision course, juke perpendicular to it
    if (s.brain.dodgeT > 0) s.brain.dodgeT -= DT;
    const threat = this._incomingThreat(s);
    if (threat && s.brain.dodgeT <= 0) {
      const bulletAng = Math.atan2(threat.vy, threat.vx);
      // pick the perpendicular that also moves away from the bullet's line
      const side = Math.sin(Math.atan2(eh.y - threat.y, eh.x - threat.x) - bulletAng) >= 0 ? 1 : -1;
      s.brain.dodgeAng = bulletAng + side * (Math.PI / 2);
      // bosses read shots faster and commit to cleaner dodges
      s.brain.dodgeT = s.boss ? 0.34 : 0.26;
      s.brain.strafe = side; // carry the juke into the orbit direction
    }

    // the rusher only wants one thing: your head. full-speed ramming runs.
    if (s.archetype === 'rusher') {
      s.brain.boostPhase = (s.brain.boostPhase || 0) + DT;
      s.boosting = (s.brain.boostPhase % 1.8) < 1.0;
    }

    // the reaper hunts differently: boost in close and coil around the player
    if (s.archetype === 'reaper') {
      s.brain.boostPhase = (s.brain.boostPhase || 0) + DT;
      s.boosting = d > 260 && (s.brain.boostPhase % 2.2) < 1.4;   // duty-cycle boost, always closing
    }

    // desired: chase, then circle the player at fighting distance
    let desired;
    const ideal = s.archetype === 'reaper' ? 165 :
                  s.archetype === 'rusher' ? 0 :        // rusher: no standoff, ram the head
                  s.archetype === 'sniper' ? 720 :      // sniper: stay far away
                  (s.boss ? 300 : 340);
    if (s.brain.dodgeT > 0) desired = s.brain.dodgeAng;       // mid-dodge: commit
    else if (d > ideal + 120) desired = toAng;                // close in on the player
    else if (d < ideal - 120) desired = toAng + Math.PI;      // back off
    else desired = toAng + s.brain.strafe * (Math.PI / 2) * (s.archetype === 'reaper' ? 1.05 : s.boss ? 0.92 : 0.8); // circle
    // flip orbit direction now and then so the circle isn't predictable
    if (s.brain.flipT === undefined) s.brain.flipT = 2 + this.rng() * 3;
    s.brain.flipT -= DT;
    if (s.brain.flipT <= 0) { s.brain.strafe *= -1; s.brain.flipT = 2 + this.rng() * 3; }
    // wall avoidance
    const m = 140;
    if (eh.x < m) desired = angLerp(desired, 0, 0.6);
    else if (eh.x > W - m) desired = angLerp(desired, Math.PI, 0.6);
    if (eh.y < m) desired = angLerp(desired, Math.PI / 2, 0.6);
    else if (eh.y > H - m) desired = angLerp(desired, -Math.PI / 2, 0.6);

    s.targetHeading = desired;
    s.aimAng = toAng;
    // shoot if armed, roughly facing, and in range
    if (s.weapon !== 'pistol' || this.wave >= 2) {
      s.brain.reactT -= DT;
      const facing = Math.abs(((toAng - s.heading + Math.PI) % TAU) - Math.PI) < 0.5;
      const range = s.archetype === 'sniper' ? 1600 : 900;
      const wobble = s.archetype === 'sniper' ? 0.34 : 0.12;   // snipers hit hard but wander wide
      if (s.archetype !== 'rusher' && d < range && facing && s.brain.reactT <= 0) {
        const enemyWeapon = WEAPONS[s.weapon];
        if (enemyWeapon.charge) s.charging = enemyWeapon.charge;
        this._doFire(s, toAng + (this.rng() - 0.5) * wobble);
        s.brain.reactT = s.archetype === 'sniper' ? (1.3 + this.rng() * 0.9) :
          ((s.boss ? 0.08 : 0.15) + this.rng() * (s.boss ? 0.12 : 0.25));
      }
    }
  };

  Game.prototype._playerVel = function () {
    const p = this.player;
    return { x: Math.cos(p.heading) * p.speed, y: Math.sin(p.heading) * p.speed };
  };

  // ---------- snake movement ----------
  Game.prototype._moveSnake = function (s) {
    s.heading = angLerp(s.heading, s.targetHeading, TURN_RATE * DT);
    const head = s.pts[0];
    let spd = s.boosting ? s.speed * BOOST_MULT : s.speed;
    if (s.isPlayer && s.speedBonus) spd *= s.speedBonus;
    const nx = clamp(head.x + Math.cos(s.heading) * spd * DT, HEAD_R, W - HEAD_R);
    const ny = clamp(head.y + Math.sin(s.heading) * spd * DT, HEAD_R, H - HEAD_R);
    // prepend new head, keep spacing follow
    head.px = head.x; head.py = head.y;
    head.x = nx; head.y = ny;
    for (let i = 1; i < s.pts.length; i++) {
      const a = s.pts[i - 1], b = s.pts[i];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dd = Math.hypot(dx, dy) || 1;
      if (dd > SEG) { const k = (dd - SEG) / dd; b.x += dx * k; b.y += dy * k; }
    }
  };

  Game.prototype._grow = function (s, n) {
    const tail = s.pts[s.pts.length - 1];
    for (let i = 0; i < n; i++) s.pts.push({ x: tail.x, y: tail.y });
  };

  // ---------- main step (fixed dt) ----------
  Game.prototype.step = function () {
    if (this.gameOver) { this._decayFx(); return; }
    const dt = DT;
    this.t += dt;

    // combo decay
    if (this.comboT > 0) { this.comboT -= dt; if (this.comboT <= 0) this.combo = 1; }

    // waves
    const liveEnemies = this.enemies.filter(e => e.alive).length;
    if (!this.betweenWaves && liveEnemies === 0) { this.betweenWaves = true; this.waveCountdown = 2.4; }
    if (this.betweenWaves) { this.waveCountdown -= dt; if (this.waveCountdown <= 0) this._startWave(); }

    // player firing / charge
    const p = this.player;
    const wd = WEAPONS[p.weapon];
    if (this._hasAim) p.aimAng = Math.atan2(this._aimY - p.pts[0].y, this._aimX - p.pts[0].x);
    if (p.cd > 0) p.cd -= dt;
    if (wd.charge) { if (p.wantFire) p.charging = Math.min(wd.charge, p.charging + dt); }
    if (p.wantFire) {
      if (wd.charge) { if (p.charging >= wd.charge) this._doFire(p, p.aimAng); }
      else this._doFire(p, p.aimAng);
    }
    if (p.recoil > 0) p.recoil = Math.max(0, p.recoil - 900 * dt);
    if (p.hitFlash > 0) p.hitFlash -= dt;
    if (p.damageFlash > 0) p.damageFlash -= dt;

    // ability timers
    if (p.abilityCdT > 0) p.abilityCdT = Math.max(0, p.abilityCdT - dt);
    if (p.abilityActiveT > 0) p.abilityActiveT = Math.max(0, p.abilityActiveT - dt);
    if (p.invincibleT > 0) p.invincibleT = Math.max(0, p.invincibleT - dt);
    const overclocked = p.loadout === 'overdrive' && p.abilityActiveT > 0;
    const ghosting = p.loadout === 'phantom' && p.abilityActiveT > 0;
    p.speedBonus = (overclocked ? 1.15 : 1) * (ghosting ? 1.5 : 1);
    if (overclocked && p.cd > 0) p.cd -= dt;   // second cd tick = double fire rate

    // boost / stamina
    p.boosting = !!(p.wantBoost && p.stamina > 0);
    if (p.boosting) p.stamina = Math.max(0, p.stamina - BOOST_DRAIN * dt);
    else p.stamina = Math.min(p.maxStamina, p.stamina + STAMINA_REGEN * dt);

    // move player
    this._moveSnake(p);

    // enemies
    for (const e of this.enemies) {
      if (!e.alive) continue;
      if (e.cd > 0) e.cd -= dt;
      if (e.hitFlash > 0) e.hitFlash -= dt;
      if (e.recoil > 0) e.recoil = Math.max(0, e.recoil - 900 * dt);
      this._thinkEnemy(e);
      this._moveSnake(e);
    }

    // projectiles
    for (const pr of this.projectiles) {
      pr.x += pr.vx * dt; pr.y += pr.vy * dt; pr.life -= dt;
      if (pr.x < 0 || pr.x > W || pr.y < 0 || pr.y > H) pr.life = 0;
    }
    this._projectileHits();
    this.projectiles = this.projectiles.filter(pr => pr.life > 0);

    // beams / floaters fx
    for (const b of this.beams) b.life -= dt;
    this.beams = this.beams.filter(b => b.life > 0);
    for (const f of this.floaters) { f.life -= dt; f.y -= 24 * dt; }
    this.floaters = this.floaters.filter(f => f.life > 0);

    // pellets
    this._pelletPickup();
    // crates
    this._cratePickup();
    // collisions (bodies)
    this._bodyCollisions();

    // keep pellets stocked
    if (this.pellets.length < 15) this._spawnPellets(2);
  };

  Game.prototype._projectileHits = function () {
    for (const pr of this.projectiles) {
      if (pr.life <= 0) continue;
      const targets = pr.owner === 'p' ? this.enemies : [this.player];
      for (const s of targets) {
        if (!s.alive) continue;
        // head + body hit
        let hit = -1;
        for (let i = 0; i < s.pts.length; i++) {
          const rr = (i === 0 ? HEAD_R : BODY_R) + pr.r;
          if (dist2(pr.x, pr.y, s.pts[i].x, s.pts[i].y) < rr * rr) { hit = i; break; }
        }
        if (hit >= 0) {
          const ang = Math.atan2(pr.vy, pr.vx);
          this._hitSnake(s, pr.dmg, ang, pr.knock, pr.owner === 'p' ? this.player : this._shooterFor(s));
          this.emit({ type: 'spark', x: pr.x, y: pr.y, color: pr.color });
          if (pr.pierce > 0) { pr.pierce--; } else { pr.life = 0; break; }
        }
      }
    }
  };

  Game.prototype._shooterFor = function () { // enemy that shot the player (name only needed)
    // pick nearest alive enemy as attribution
    const ph = this.player.pts[0]; let best = null, bd = Infinity;
    for (const e of this.enemies) { if (!e.alive) continue; const d = dist2(ph.x, ph.y, e.pts[0].x, e.pts[0].y); if (d < bd) { bd = d; best = e; } }
    return best;
  };

  Game.prototype._pelletPickup = function () {
    const head = this.player.pts[0];
    const MAGNET_R = 95;                       // auto-collect radius: orbs get pulled in when this close
    const MAGNET_R2 = MAGNET_R * MAGNET_R;
    for (const pel of this.pellets) {
      pel.ph += DT * 4;
      const d2 = dist2(head.x, head.y, pel.x, pel.y);
      // magnet: pull nearby orbs toward the head so scarce pellets auto-collect
      if (d2 < MAGNET_R2) {
        const d = Math.sqrt(d2) || 1;
        const pull = (1 - d / MAGNET_R) * 460 * DT;   // stronger the closer it is
        pel.x += ((head.x - pel.x) / d) * pull;
        pel.y += ((head.y - pel.y) / d) * pull;
      }
      if (dist2(head.x, head.y, pel.x, pel.y) < (HEAD_R + pel.r + 4) * (HEAD_R + pel.r + 4)) {
        pel.dead = true;
        this._grow(this.player, 3);
        this.score += Math.round(10 * this.combo);
        const pl = this.player;
        // eating grows the pools themselves (capped), not just tops them up
        pl.maxHp = Math.min(pl.baseMaxHp + 60, pl.maxHp + 0.6);
        pl.maxStamina = Math.min(MAX_STAMINA + 100, pl.maxStamina + 1.2);
        pl.hp = Math.min(pl.maxHp, pl.hp + 10);
        pl.stamina = Math.min(pl.maxStamina, pl.stamina + 6);
        this.emit({ type: 'pop', x: pel.x, y: pel.y });
        this.emit({ type: 'sfx', name: 'pellet' });
      }
    }
    this.pellets = this.pellets.filter(p => !p.dead);
  };

  Game.prototype._cratePickup = function () {
    const head = this.player.pts[0];
    for (const c of this.crates) {
      c.ph += DT * 3;
      if (dist2(head.x, head.y, c.x, c.y) < (HEAD_R + c.r) * (HEAD_R + c.r)) {
        c.dead = true;
        this._equip(this.player, c.type);
        this.floaters.push({ x: c.x, y: c.y - 10, txt: WEAPONS[c.type].name, life: 1.1, color: WEAPONS[c.type].color });
        this.emit({ type: 'pickup', x: c.x, y: c.y, weapon: c.type });
        this.emit({ type: 'sfx', name: 'pickup' });
      }
    }
    this.crates = this.crates.filter(c => !c.dead);
  };

  Game.prototype._bodyCollisions = function () {
    const p = this.player;
    if (!p.alive) return;
    const head = p.pts[0];
    // no self-collision death: cutting your own tail to shrink your signature is a valid move, not a death
    // enemy bodies
    for (const e of this.enemies) {
      if (!e.alive) continue;
      // coil kill: an enemy head that runs into YOUR tail dies — encircling is a real weapon
      const ehd = e.pts[0];
      for (let j = 4; j < p.pts.length; j++) {
        const rr2 = BODY_R + HEAD_R - 2;
        if (dist2(ehd.x, ehd.y, p.pts[j].x, p.pts[j].y) < rr2 * rr2) {
          this.deathCause = '';
          this.floaters.push({ x: ehd.x, y: ehd.y, txt: 'COILED!', life: 1.1, color: '#39FF9E' });
          this._killSnake(e, p);
          break;
        }
      }
      if (!e.alive) continue;
      for (let i = 0; i < e.pts.length; i++) {
        const rr = (i === 0 ? HEAD_R : BODY_R) + HEAD_R - 2;
        if (dist2(head.x, head.y, e.pts[i].x, e.pts[i].y) < rr * rr) {
          if (i === 0) {
            // head-on head: a heavy trade with knockback, not an instant death
            this._hitSnake(e, 44, e.heading, 420, p);
            this._hitSnake(p, 30, p.heading + Math.PI, 420, e);
            if (!p.alive) this.deathCause = e.name;
          } else {
            // your head into their body: you die (classic snake rules)
            this.deathCause = e.name;
            this._killSnake(p, e);
          }
          return;
        }
      }
    }
  };

  Game.prototype._decayFx = function () {
    for (const f of this.floaters) { f.life -= DT; f.y -= 24 * DT; }
    this.floaters = this.floaters.filter(f => f.life > 0);
    for (const b of this.beams) b.life -= DT;
    this.beams = this.beams.filter(b => b.life > 0);
  };

  // ---------- state for HUD / tests ----------
  Game.prototype.getState = function () {
    const p = this.player;
    return {
      alive: p.alive && !this.gameOver,
      score: this.score,
      wave: this.wave,
      health: Math.max(0, Math.round(p.hp)),
      stamina: Math.max(0, Math.round(p.stamina)),
      maxStamina: Math.round(p.maxStamina),
      boosting: !!p.boosting,
      abilityName: (ABILITIES[p.loadout] || {}).name || '',
      abilityReady: p.abilityCdT <= 0,
      abilityCdFrac: (ABILITIES[p.loadout] && ABILITIES[p.loadout].cd) ? clamp(1 - p.abilityCdT / ABILITIES[p.loadout].cd, 0, 1) : 1,
      abilityActive: p.abilityActiveT > 0,
      invincible: p.invincibleT > 0,
      ammo: p.ammo === Infinity ? Infinity : p.ammo,
      weapon: p.weapon,
      headX: Math.round(p.pts[0].x),
      headY: Math.round(p.pts[0].y),
      enemyCount: this.enemies.filter(e => e.alive).length,
      waveGoal: this.waveGoal,
      waveKills: this.waveKills,
      missionName: this.currentMission ? this.currentMission.title : ('CLEAR WAVE ' + this.wave),
      bossName: (() => {
        const boss = this.enemies.find(e => e.alive && e.boss);
        return boss ? boss.name : '';
      })(),
      bossHp: (() => {
        const boss = this.enemies.find(e => e.alive && e.boss);
        return boss ? Math.max(0, Math.round(boss.hp)) : 0;
      })(),
      bossMaxHp: (() => {
        const boss = this.enemies.find(e => e.alive && e.boss);
        return boss ? boss.maxHp : 0;
      })(),
      combo: Math.round(this.combo * 10) / 10,
      length: p.pts.length,
      loadout: p.loadout,
      deathCause: this.deathCause
    };
  };

  return {
    Game, WEAPONS, WEAPON_ORDER, LOADOUTS, BOSS_MISSIONS, ABILITIES,
    W, H, DT, SEG, HEAD_R, BODY_R, MAX_HP, MAX_STAMINA, BOOST_MULT, mulberry32
  };
});
