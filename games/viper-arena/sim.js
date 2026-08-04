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
  const W = 4200, H = 2800;             // arena world size (big enough that threats travel in from off-screen)
  const SAFE_SPAWN_R = 1250;            // enemies may NEVER spawn closer than this: past the zoomed-out view edge
  const DT = 1 / 60;                    // fixed timestep
  const SEG = 9;                        // spacing between body points (px)
  const HEAD_R = 12;                    // head radius
  const BODY_R = 9;                     // body radius
  const PLAYER_SPEED = 320;             // px/s
  const TURN_RATE = 7.5;                // rad/s steering
  const START_LEN = 14;                 // body points
  const MAX_PLAYER_SEGMENTS = 96;       // preserves tail strategy without unbounded collision cost
  const MAX_ENEMY_SEGMENTS = 56;        // bosses grow through scale/behaviour, not 80+ physics points
  const MAX_PROJECTILES = 340;          // protects the fixed-step budget during sustained-fire waves
  const HIT_CELL = 640;
  const HIT_COLS = Math.ceil(W / HIT_CELL), HIT_ROWS = Math.ceil(H / HIT_CELL);
  const MAX_HP = 145;
  const WAVES_PER_LEVEL = 5;            // a level is five waves, so level 3 starts at wave 11
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
      name: 'PISTOL', ammo: Infinity, magSize: 5, reload: 1.05, cd: 0.22, spread: 0.02, pellets: 1,
      speed: 1100, dmg: 18, life: 1.6, radius: 4, recoil: 90, shake: 3,
      knock: 60, pierce: 0, color: '#7CF9FF', kind: 'bullet', style: 'dart',
    },
    shotgun: {
      name: 'SHOTGUN', ammo: 24, magSize: 6, reload: 2.0, cd: 0.62, spread: 0.44, pellets: 11,
      speed: 940, dmg: 16, life: 0.95, radius: 3, recoil: 260, shake: 12,
      knock: 340, pierce: 0, color: '#FFC24B', kind: 'bullet', style: 'slug',
    },
    smg: {
      name: 'SMG', ammo: 120, magSize: 30, reload: 1.55, cd: 0.065, spread: 0.14, pellets: 1,
      speed: 1250, dmg: 12, life: 1.35, radius: 3, recoil: 55, shake: 2.4,
      knock: 40, pierce: 0, color: '#8CFF6B', kind: 'bullet', style: 'dart',
    },
    railgun: {
      name: 'RAILGUN', ammo: 12, magSize: 3, reload: 2.4, cd: 0.9, spread: 0, pellets: 1, charge: 0.55,
      speed: 0, dmg: 120, life: 0, radius: 0, recoil: 320, shake: 20,
      knock: 260, pierce: 999, color: '#FF4D6D', kind: 'beam', range: 3200
    },
    flamethrower: {
      name: 'FLAME', ammo: 240, magSize: 80, reload: 2.1, cd: 0.03, spread: 0.5, pellets: 2,
      speed: 560, dmg: 4.5, life: 0.55, radius: 10, recoil: 30, shake: 1.6,
      knock: 12, pierce: 999, color: '#FF8A2B', kind: 'flame', style: 'flame',
    },
    minigun: {
      name: 'MINIGUN', ammo: 600, magSize: 150, reload: 3.4, cd: 0.045, spread: 0.19, pellets: 1,
      spinup: 0.85,
      speed: 1150, dmg: 11, life: 1.45, radius: 3, recoil: 45, shake: 2.6,
      knock: 34, pierce: 0, color: '#C2B2E9', kind: 'bullet', style: 'dart',
    },
    sniper: {
      name: 'SNIPER', ammo: 20, magSize: 4, reload: 2.5, cd: 1.15, spread: 0, pellets: 1,
      speed: 1900, dmg: 90, life: 1.9, radius: 5, recoil: 300, shake: 14,
      knock: 420, pierce: 1, color: '#F7E45E', kind: 'bullet', style: 'lance',
    },
    burstcannon: {
      name: 'BURST CANNON', ammo: 48, magSize: 12, reload: 1.65, cd: 0.42, spread: 0.13, pellets: 3,
      speed: 1040, dmg: 24, life: 1.4, radius: 4, recoil: 150, shake: 7,
      knock: 125, pierce: 0, color: '#B892FF', kind: 'bullet', style: 'dart',
    },
    needler: {
      name: 'NEEDLER', ammo: 96, magSize: 24, reload: 1.35, cd: 0.10, spread: 0.035, pellets: 1,
      speed: 1680, dmg: 14, life: 1.55, radius: 2.5, recoil: 35, shake: 1.5,
      knock: 28, pierce: 1, color: '#57E8FF', kind: 'bullet', style: 'dart',
    },
    arcwelder: {
      name: 'ARC WELDER', ammo: 72, magSize: 18, reload: 1.8, cd: 0.18, spread: 0, pellets: 1,
      speed: 0, dmg: 31, life: 0, radius: 0, recoil: 62, shake: 4,
      knock: 85, pierce: 2, color: '#5EEAD4', kind: 'beam', range: 1200,
    },
    shredder: {
      name: 'SHREDDER', ammo: 70, magSize: 14, reload: 2.05, cd: 0.26, spread: 0.62, pellets: 7,
      speed: 820, dmg: 10, life: 0.85, radius: 3, recoil: 190, shake: 9,
      knock: 110, pierce: 0, color: '#FF6B9D', kind: 'bullet', style: 'slug',
    }
  };
  const WEAPON_ORDER = ['pistol', 'shotgun', 'smg', 'railgun', 'flamethrower', 'sniper', 'minigun', 'burstcannon', 'needler', 'arcwelder', 'shredder'];

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
    },
    juggernaut: {
      name: 'JUGGERNAUT', color: '#9A8FB8', speedMult: 0.62,
      maxHp: 340, damageScale: 0.5, startWeapon: 'minigun', startAmmo: 600,
      staminaMult: 0.55, turnMult: 0.6
    }
  };

  // ---------- class abilities (press E / ability button) ----------
  const ABILITIES = {
    overdrive: { name: 'OVERCLOCK', desc: 'Fire rate x2 + speed for 3.5s', cd: 14, dur: 3.5 },
    bulwark: { name: 'IRON SHELL', desc: 'Invincible for 2.8s', cd: 16, dur: 2.8 },
    arc: { name: 'EMP BURST', desc: 'Zap + shove everything near you', cd: 12, dur: 0 },
    inferno: { name: 'FIRE RING', desc: 'Ring of flame in every direction', cd: 11, dur: 0 },
    phantom: { name: 'GHOST STEP', desc: 'Untouchable + faster for 2.2s', cd: 13, dur: 2.2 },
    titan: { name: 'SHOCKWAVE', desc: 'Stun + hurl back every enemy', cd: 15, dur: 0 },
    juggernaut: { name: 'SIEGE MODE', desc: 'Rooted, invincible, barrel already spun', cd: 18, dur: 4 }
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
      scale: Math.min(2.4, 1.34 + i * 0.035),
      // Boss weapons use player-grade projectiles. Keep a controlled outgoing
      // damage curve so a weapon swap cannot create an accidental one-shot.
      damageMult: Math.min(0.68, 0.38 + i * 0.04)
    };
  });

  const ENEMY_NAMES = ['VENOM', 'KRAIT', 'MAMBA', 'COBRA', 'ASP', 'RATTLER',
    'BOA', 'PYTHON', 'ADDER', 'TAIPAN', 'SIDEWINDER', 'FANG'];

  // ---------- personalities: every archetype has its own voice ----------
  const PERSONALITIES = {
    grunt: {
      label: 'GRUNT', temper: 'overconfident nobody',
      spawn: ['You lost, lizard.', 'Turn back.', 'Another one for the pile.', 'She is not up here.'],
      hurt: ['Lucky shot!', 'Ow. Rude.', 'That actually hurt.'],
      death: ['...not like this.', 'Tell my wife.', 'Worth it.']
    },
    runner: {
      label: 'RUNNER', temper: 'cocky speedster',
      spawn: ['Too slow!', 'Catch me. Go on.', 'Blink and I am behind you.'],
      hurt: ['You clipped me!', 'Fine. FINE.', 'That was a fluke.'],
      death: ['I was... faster...', 'Unfair.', 'Ugh.']
    },
    brute: {
      label: 'BRUTE', temper: 'slow immovable wall',
      spawn: ['YOU SHALL NOT PASS.', 'The road ends here.', 'I am the door.'],
      hurt: ['Barely felt it.', 'Is that all?', 'Keep going. I like it.'],
      death: ['The wall... falls...', 'Someone else... will hold...', 'Hah. Good.']
    },
    sniper: {
      label: 'SNIPER', temper: 'twitchy coward with a scope',
      spawn: ['Do not come closer.', 'I can see you from here.', 'Stay right there. Perfect.'],
      hurt: ['Too close! Too close!', 'Get back!', 'No no no.'],
      death: ['Should have... kept my distance...', 'Missed.', 'I hate this job.']
    },
    rusher: {
      label: 'RUSHER', temper: 'unhinged kamikaze',
      spawn: ['YOUR FACE. MINE.', 'HELLO HELLO HELLO', 'NO BRAKES!'],
      hurt: ['MORE!', 'HAHA! AGAIN!', 'TICKLES!'],
      death: ['WORTH IIIIT', 'SEE YOU DOWN THERE', 'BOOM.']
    },
    reaper: {
      label: 'THE REAPER', temper: 'cold patient predator',
      spawn: ['I have been sent for you.', 'Do not run. It is worse when you run.', 'The circle is already closing.'],
      hurt: ['Interesting.', 'You have teeth. Good.', 'Noted.'],
      death: ['Another... will be sent...', 'You are still in the circle.', 'She is still up there. Good luck.']
    }
  };

  // ---------- story: the viper is climbing the gauntlet to get his princess back ----------
  const STORY = {
    intro: [
      'They took her at dawn. Dragged her up the gauntlet, past fifty wardens.',
      'You are one snake with a borrowed pistol and five rounds in it.',
      'That has to be enough.'
    ],
    beats: {
      2: 'A scale on the floor. Hers. You are on the right road.',
      5: 'The wardens are talking to each other now. They know you are coming.',
      8: 'Someone scratched a message into the wall: SHE IS STILL ALIVE. KEEP CLIMBING.',
      12: 'Halfway. Your ammo count is a rumour and your tail is shorter than it was.',
      18: 'You hear her. Faint, far up, still fighting. Move.',
      25: 'The air is hot. Whatever is holding her is close now.',
      40: 'The last wardens do not taunt any more. That is worse.'
    },
    bossTauntFallback: [
      'YOU SHALL NOT PASS.',
      'The road ends here, little viper.',
      'She is one floor up. You will not see it.',
      'Everyone who came this far is under my coils.',
      'Turn around. I will pretend I never saw you.',
      'You are late. She stopped waiting.',
      'I was told to make an example. Hold still.',
      'Fifty of us. You are ONE.'
    ],
    bossTaunts: {
      'VENOM TITAN': 'YOU SHALL NOT PASS. I have eaten braver snakes for less.',
      'RAIL WYRM': 'I can put a hole through you from the other side of this arena. Watch.',
      'INFERNO HYDRA': 'Everything you love burns eventually. Let us start with you.',
      'NIGHT ADDER': 'You brought a pistol to my dark. How sweet.',
      'IRON BASILISK': 'Bullets bounce. Hope does not. Try me.',
      'THE REAPER': 'I am not a warden. I am what they call when the wardens fail.',
      'OMEGA LEVIATHAN': 'She is behind me. She has been watching you climb. Do not disappoint her now.'
    },
    victory: 'The last coil falls. She is there. You did not stop.'
  };

  // ---------- snake ----------
  function makeSnake(x, y, heading, len, isPlayer) {
    const pts = [];
    for (let i = 0; i < len; i++) pts.push({ x: x - Math.cos(heading) * i * SEG, y: y - Math.sin(heading) * i * SEG });
    return {
      pts, heading, targetHeading: heading, isPlayer,
      hp: isPlayer ? MAX_HP : 60, maxHp: isPlayer ? MAX_HP : 60,
      len, alive: true, speed: isPlayer ? PLAYER_SPEED : 210,
      weapon: 'pistol', ammo: Infinity, mag: 5, cd: 0, charging: 0, wantFire: false,
      reloading: false, reloadT: 0, spin: 0, turnMult: 1,
      recoil: 0, aimAng: heading, name: isPlayer ? 'YOU' : 'ENEMY',
      hitFlash: 0, color: isPlayer ? '#39FF9E' : '#FF5A5A', damageDir: 0, damageFlash: 0, coilCd: 0,
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
    this.enemyGrid = Array.from({ length: HIT_COLS * HIT_ROWS }, function () { return []; });
    this.projectiles = [];
    this.beams = [];         // timed rail beams for render {x1,y1,x2,y2,life,color}
    this.crates = [];
    this.pellets = [];
    this.floaters = [];      // {x,y,txt,life,color}
    this.events = [];        // drained by render/audio
    this.score = 0;
    this.combo = 1;
    this.comboT = 0;
    this.startLevel = Math.max(1, Math.round(this.options.level || 1));
    this.wave = (this.startLevel - 1) * WAVES_PER_LEVEL;
    this.waveGoal = 0;
    this.coins = 0;
    this.fangs = 0;
    this.revives = 0;
    this.lastStands = 0;
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
    p.mag = WEAPONS[loadout.startWeapon].magSize;
    p.inventory = Object.create(null);
    p.inventory.pistol = { ammo: Infinity, mag: WEAPONS.pistol.magSize };
    p.inventory[p.weapon] = { ammo: p.ammo, mag: p.mag };
    p.reloading = false; p.reloadT = 0; p.spin = 0;
    p.turnMult = loadout.turnMult || 1;
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
    if (p.loadout === 'bulwark' || p.loadout === 'phantom' || p.loadout === 'juggernaut') p.invincibleT = ab.dur;
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

  // paid revive: puts the player back on the field mid-wave without losing the run
  Game.prototype.revive = function () {
    if (!this.gameOver) return false;
    const p = this.player;
    this.gameOver = false;
    this.deathCause = '';
    p.alive = true;
    p.hp = p.maxHp;
    p.stamina = p.maxStamina;
    p.invincibleT = 3.0;
    p.mag = WEAPONS[p.weapon].magSize;
    if (p.inventory && p.inventory[p.weapon]) p.inventory[p.weapon].mag = p.mag;
    p.reloading = false; p.reloadT = 0;
    this.revives++;
    // shove every live enemy away so the revive is not instantly wasted
    const head = p.pts[0];
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const eh = e.pts[0];
      const d = Math.hypot(eh.x - head.x, eh.y - head.y) || 1;
      if (d < 900) {
        const ang = Math.atan2(eh.y - head.y, eh.x - head.x);
        eh.x = clamp(head.x + Math.cos(ang) * 950, 60, W - 60);
        eh.y = clamp(head.y + Math.sin(ang) * 950, 60, H - 60);
      }
    }
    this.emit({ type: 'revive' });
    this.emit({ type: 'shake', amt: 18 });
    return true;
  };

  Game.prototype.emit = function (e) { this.events.push(e); };

  Game.prototype._rndPos = function (margin) {
    margin = margin || 120;
    return { x: margin + this.rng() * (W - margin * 2), y: margin + this.rng() * (H - margin * 2) };
  };

  // pick a spawn far from the player, preferring the arena rim so threats visibly travel in
  Game.prototype._spawnPos = function () {
    const pl = this.player.pts[0];
    let best = null, bestD = -1;
    for (let i = 0; i < 24; i++) {
      // bias toward the rim: pick an edge band, then a position along it
      let x, y;
      if (this.rng() < 0.72) {
        const side = (this.rng() * 4) | 0;
        const band = 140 + this.rng() * 220;
        if (side === 0) { x = band; y = 120 + this.rng() * (H - 240); }
        else if (side === 1) { x = W - band; y = 120 + this.rng() * (H - 240); }
        else if (side === 2) { x = 120 + this.rng() * (W - 240); y = band; }
        else { x = 120 + this.rng() * (W - 240); y = H - band; }
      } else {
        x = 140 + this.rng() * (W - 280);
        y = 140 + this.rng() * (H - 280);
      }
      const d = Math.hypot(x - pl.x, y - pl.y);
      if (d >= SAFE_SPAWN_R) return { x: x, y: y };   // good enough, take it
      if (d > bestD) { bestD = d; best = { x: x, y: y }; }
    }
    // every candidate was close (tiny arena / player hugging centre): push the best one out hard
    const ang = Math.atan2(best.y - pl.y, best.x - pl.x) || 0;
    return {
      x: clamp(pl.x + Math.cos(ang) * SAFE_SPAWN_R, 120, W - 120),
      y: clamp(pl.y + Math.sin(ang) * SAFE_SPAWN_R, 120, H - 120)
    };
  };

  Game.prototype._spawnPellets = function (n) {
    for (let i = 0; i < n; i++) { const p = this._rndPos(80); this.pellets.push({ x: p.x, y: p.y, r: 7, ph: this.rng() * TAU, kind: 'green' }); }
  };

  Game.prototype.spawnCrate = function (type) {
    if (!type) type = WEAPON_ORDER[1 + ((this.rng() * (WEAPON_ORDER.length - 1)) | 0)];
    const p = this._rndPos(140);
    this.crates.push({ x: p.x, y: p.y, type, r: 18, ph: 0 });
    return this.crates[this.crates.length - 1];
  };

  Game.prototype.spawnEnemy = function (hp, options) {
    options = options || {};
    const p = this._spawnPos();
    // pick an archetype for regular enemies: mixed sizes and behaviours
    let arch = options.archetype || 'grunt';
    if (!options.boss && !options.archetype) {
      const roll = this.rng();
      const w = this.wave;
      const reaperAlive = this.enemies.some(e => e.alive && e.archetype === 'reaper');
      // waves 1-2 are deliberately calm: plain grunts only, so a new player can learn the controls
      if (w >= 9 && !reaperAlive && roll < 0.10) arch = 'reaper';
      else if (w >= 3 && roll < 0.26) arch = 'runner';
      else if (w >= 4 && roll < 0.44) arch = 'brute';
      else if (w >= 5 && roll < 0.58) arch = 'sniper';
      else if (w >= 7 && roll < 0.70) arch = 'rusher';
    }
    const baseLen = Math.min(options.boss ? MAX_ENEMY_SEGMENTS : 34, options.length ||
      (arch === 'reaper' ? 55 + ((this.rng() * 14) | 0) :
       arch === 'brute' ? 22 + ((this.rng() * 10) | 0) :
       arch === 'runner' ? 9 + ((this.rng() * 4) | 0) :
       arch === 'sniper' ? 8 + ((this.rng() * 3) | 0) :
       arch === 'rusher' ? 11 + ((this.rng() * 5) | 0) :
       10 + ((this.rng() * 12) | 0)));
    const s = makeSnake(p.x, p.y, this.rng() * TAU, baseLen, false);
    s.archetype = arch;
    s.name = options.name || (
      arch === 'reaper' ? 'THE REAPER' : arch === 'sniper' ? ('LONGSHOT-' + (this.pid++)) :
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
    s.damageMult = options.damageMult || 1;
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
    } else if (this.wave >= 3) {
      const pool = ['pistol', 'smg', 'shotgun'];
      if (this.wave >= 5) pool.push('needler', 'burstcannon');
      if (this.wave >= 8) pool.push('shredder');
      if (this.wave >= 11) pool.push('arcwelder');
      s.weapon = pool[(this.rng() * pool.length) | 0] || 'pistol';
      const wd = WEAPONS[s.weapon];
      s.ammo = wd.ammo === Infinity ? Infinity : wd.ammo * 4;
    }
    s.brain.strafe = this.rng() < 0.5 ? 1 : -1;
    s.brain.tactic = s.boss ? 'command' : ['pressure', 'flank', 'harass'][(this.rng() * 3) | 0];
    s.brain.tacticT = 1.8 + this.rng() * 2.8;
    s.brain.perceptionT = this.rng() * 0.12;
    this.enemies.push(s);
    // personality: bosses and reapers always announce themselves, grunts only sometimes
    if (s.boss) {
      const taunt = STORY.bossTaunts[s.name] ||
        STORY.bossTauntFallback[(this.rng() * STORY.bossTauntFallback.length) | 0];
      this.emit({ type: 'say', who: s.name, line: taunt, x: s.pts[0].x, y: s.pts[0].y, color: s.color, boss: true });
    } else if (s.archetype === 'reaper' || this.rng() < 0.22) {
      this.say(s, 'spawn');
    }
    return s;
  };

  Game.prototype._startWave = function () {
    this.wave++;
    this.betweenWaves = false;
    this.waveKills = 0;
    const mission = BOSS_MISSIONS[this.wave] || null;
    this.currentMission = mission;
    const count = this.wave <= 1 ? 3 : this.wave === 2 ? 4 : Math.round(3 + (this.wave - 2) * 1.5);
    if (mission) {
      this.spawnEnemy(mission.hp, {
        name: mission.name,
        speed: mission.speed,
        length: mission.length,
        weapon: mission.weapon,
        color: mission.color,
        score: mission.score,
        scale: mission.scale,
        damageMult: mission.damageMult,
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
    if (STORY.beats[this.wave]) this.emit({ type: 'story', line: STORY.beats[this.wave] });
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
  Game.prototype._syncInventory = function (snake) {
    if (!snake.isPlayer || !snake.inventory) return;
    snake.inventory[snake.weapon] = { ammo: snake.ammo, mag: snake.mag };
  };

  Game.prototype.switchWeapon = function (type) {
    const p = this.player;
    if (!WEAPONS[type] || !p.inventory || !p.inventory[type] || p.weapon === type) return false;
    this._syncInventory(p);
    const slot = p.inventory[type];
    p.weapon = type;
    p.ammo = slot.ammo;
    p.mag = slot.mag;
    p.cd = 0; p.charging = 0; p.reloading = false; p.reloadT = 0; p.spin = 0;
    this.emit({ type: 'weaponSwitch', weapon: type });
    this.emit({ type: 'sfx', name: 'pickup' });
    return true;
  };

  Game.prototype.cycleWeapon = function (direction) {
    const p = this.player;
    if (!p.inventory) return false;
    const owned = WEAPON_ORDER.filter(function (key) { return !!p.inventory[key]; });
    if (owned.length < 2) return false;
    const current = Math.max(0, owned.indexOf(p.weapon));
    const next = (current + (direction < 0 ? -1 : 1) + owned.length) % owned.length;
    return this.switchWeapon(owned[next]);
  };

  Game.prototype._equip = function (snake, type) {
    const wd = WEAPONS[type];
    if (!wd) return false;
    if (snake.isPlayer && snake.inventory) {
      this._syncInventory(snake);
      const existing = snake.inventory[type];
      if (existing) {
        if (existing.ammo !== Infinity) existing.ammo += wd.ammo;
      } else {
        snake.inventory[type] = { ammo: wd.ammo === Infinity ? Infinity : wd.ammo, mag: wd.magSize };
      }
      this.switchWeapon(type);
      if (snake.weapon === type) {
        const slot = snake.inventory[type];
        snake.ammo = slot.ammo; snake.mag = slot.mag;
      }
      this.emit({ type: 'ammoStack', weapon: type, ammo: snake.ammo });
      return true;
    }
    snake.weapon = type;
    snake.ammo = wd.ammo === Infinity ? Infinity : wd.ammo;
    snake.mag = wd.magSize;
    snake.cd = 0; snake.charging = 0;
    snake.reloading = false; snake.reloadT = 0; snake.spin = 0;
    return true;
  };

  // ---------- reload ----------
  Game.prototype.startReload = function (snake) {
    const wd = WEAPONS[snake.weapon];
    if (snake.reloading) return false;
    if (snake.mag >= wd.magSize) return false;
    if (snake.ammo !== Infinity && snake.ammo <= 0) return false;
    snake.reloading = true;
    snake.reloadT = wd.reload;
    snake.spin = 0;
    if (snake.isPlayer) this.emit({ type: 'sfx', name: 'pickup' });
    return true;
  };

  Game.prototype._tickReload = function (snake, dt) {
    if (!snake.reloading) return;
    snake.reloadT -= dt;
    if (snake.reloadT > 0) return;
    const wd = WEAPONS[snake.weapon];
    const need = wd.magSize - snake.mag;
    if (snake.ammo === Infinity) {
      snake.mag = wd.magSize;
    } else {
      const take = Math.min(need, snake.ammo);
      snake.mag += take;
      snake.ammo -= take;
    }
    snake.reloading = false;
    snake.reloadT = 0;
    this._syncInventory(snake);
    if (snake.isPlayer) this.emit({ type: 'reloaded', weapon: snake.weapon });
  };

  // ---------- dialogue ----------
  Game.prototype.say = function (snake, kind) {
    const p = PERSONALITIES[snake.archetype];
    if (!p) return;
    const pool = p[kind];
    if (!pool || !pool.length) return;
    const line = pool[(this.rng() * pool.length) | 0];
    const head = snake.pts[0];
    this.emit({ type: 'say', who: snake.name, line: line, x: head.x, y: head.y, color: snake.color, boss: !!snake.boss });
  };

  Game.prototype._doFire = function (snake, aimAng) {
    const wd = WEAPONS[snake.weapon];
    if (snake.cd > 0) return false;
    if (snake.reloading) return false;
    // gatling spin-up: the barrel has to be turning before anything comes out
    if (wd.spinup && snake.spin < wd.spinup) return false;
    // magazine empty: out of spare ammo means fall back to the pistol, else reload
    if (snake.mag <= 0) {
      if (snake.ammo !== Infinity && snake.ammo <= 0 && snake.weapon !== 'pistol') this._equip(snake, 'pistol');
      else this.startReload(snake);
      return false;
    }
    // railgun charge gate
    if (wd.charge && snake.charging < wd.charge) return false;

    const head = snake.pts[0];
    const mx = head.x + Math.cos(aimAng) * (HEAD_R + 6);
    const my = head.y + Math.sin(aimAng) * (HEAD_R + 6);
    snake.cd = wd.cd;
    snake.charging = 0;
    snake.mag--;
    this._syncInventory(snake);
    if (snake.mag <= 0) this.startReload(snake);

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
          pierce: wd.pierce, knock: wd.knock, color: wd.color, kind: wd.kind, style: wd.style, hitset: null
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
      if (owner && !owner.isPlayer) dmg *= owner.damageMult || 1;
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
      if (this.rng() < 0.05) this.say(s, 'hurt');
    }
    this.emit({ type: 'blood', x: head.x, y: head.y, color: s.color, n: 6 });
    if (s.hp <= 0) this._killSnake(s, owner);
  };

  Game.prototype._killSnake = function (s, owner) {
    if (!s.alive) return;
    s.alive = false;
    for (let i = 0; i < s.pts.length; i += 2) this.emit({ type: 'burst', x: s.pts[i].x, y: s.pts[i].y, color: s.color });
    if (s.isPlayer) {
      // a Titan does not just fall over. heavy classes get more than one chance.
      const allowed = (s.loadout === 'titan' || s.loadout === 'juggernaut') ? 2 : 1;
      if (this.lastStands < allowed) {
        this.lastStands++;
        s.alive = true;
        s.hp = Math.max(1, Math.round(s.maxHp * 0.30));
        s.invincibleT = 1.8;
        s.damageFlash = 0.6;
        this.floaters.push({ x: s.pts[0].x, y: s.pts[0].y, txt: 'LAST STAND!', life: 1.6, color: '#FFE45E' });
        this.emit({ type: 'lastStand', left: allowed - this.lastStands });
        this.emit({ type: 'shake', amt: 22 });
        this.emit({ type: 'sfx', name: 'hurt' });
        return;
      }
      this.gameOver = true;
      if (!this.deathCause) this.deathCause = (owner && owner.name) ? owner.name : 'THE ARENA';
      this.emit({ type: 'death', cause: this.deathCause });
      this.emit({ type: 'shake', amt: 26 });
      this.emit({ type: 'sfx', name: 'death' });
    } else {
      const gain = Math.round((s.boss ? s.bossScore : 100) * this.combo);
      this.score += gain;
      this.kills++;
      // currency: coins from every kill, a premium FANG occasionally and always from a boss
      this.coins += s.boss ? 120 : 4;
      this.emit({ type: 'coins', x: s.pts[0].x, y: s.pts[0].y, boss: !!s.boss });
      if (s.boss) this.fangs += 3;
      else if (this.rng() < 0.03) this.fangs += 1;
      if (this.rng() < 0.30) this.say(s, 'death');
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
          r: s.boss ? 9 : 7, ph: this.rng() * TAU,
          kind: s.boss ? (i === 0 ? 'rainbow' : 'gold') : 'green'
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
    const pv = this._cachedPlayerVel || this._playerVel();
    const dxp = ph.x - eh.x, dyp = ph.y - eh.y;
    const d = Math.hypot(dxp, dyp) || 1;
    const lead = clamp(d / 900, 0, 0.5);
    const tx = ph.x + pv.x * lead, ty = ph.y + pv.y * lead;
    const toAng = Math.atan2(ty - eh.y, tx - eh.x);

    // Tactical intent changes slowly; steering remains deterministic every frame.
    // This is the seam where a future on-device SLM director can suggest the
    // next tactic without ever owning collision, aim, or movement safety.
    s.brain.tacticT -= DT;
    if (s.brain.tacticT <= 0) {
      const lowHp = s.hp / s.maxHp < 0.34;
      const choices = lowHp ? ['retreat', 'harass'] : (s.boss ? ['command', 'pressure', 'flank'] : ['pressure', 'flank', 'harass']);
      s.brain.tactic = choices[(this.rng() * choices.length) | 0];
      s.brain.tacticT = 2.2 + this.rng() * 3.6;
    }

    // bullet evasion: if a player shot is on a collision course, juke perpendicular to it
    if (s.brain.dodgeT > 0) s.brain.dodgeT -= DT;
    s.brain.perceptionT = (s.brain.perceptionT || 0) - DT;
    let threat = null;
    if (s.brain.perceptionT <= 0) {
      threat = this._incomingThreat(s);
      s.brain.perceptionT = 0.08 + (s.boss ? 0 : (s.pts.length % 5) * 0.012);
    }
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
                  s.archetype === 'sniper' ? 1080 :     // longshots own the far edge
                  (s.boss ? 300 : 340);
    if (s.brain.dodgeT > 0) desired = s.brain.dodgeAng;       // mid-dodge: commit
    else if (s.brain.tactic === 'retreat') desired = toAng + Math.PI;
    else if (s.brain.tactic === 'flank' && d < ideal + 260) desired = toAng + s.brain.strafe * 1.05;
    else if (s.brain.tactic === 'harass' && d < ideal + 220) desired = toAng + s.brain.strafe * (Math.PI / 2);
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
      const range = s.archetype === 'sniper' ? 3000 : 900;
      const wobble = s.archetype === 'sniper' ? 0.22 : 0.12;
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
    s.heading = angLerp(s.heading, s.targetHeading, TURN_RATE * (s.turnMult || 1) * DT);
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
    const capacity = s.isPlayer ? MAX_PLAYER_SEGMENTS : MAX_ENEMY_SEGMENTS;
    for (let i = 0; i < n && s.pts.length < capacity; i++) s.pts.push({ x: tail.x, y: tail.y });
  };

  // ---------- main step (fixed dt) ----------
  Game.prototype.step = function () {
    if (this.gameOver) { this._decayFx(); return; }
    const dt = DT;
    this.t += dt;

    // combo decay
    if (this.comboT > 0) { this.comboT -= dt; if (this.comboT <= 0) this.combo = 1; }

    // waves
    let liveEnemies = 0;
    for (const enemy of this.enemies) if (enemy.alive) liveEnemies++;
    // Dead snakes used to remain in this array forever. Compact in bounded
    // batches so late runs do not pay to scan hundreds of historical corpses.
    if (this.enemies.length > liveEnemies + 24) {
      let write = 0;
      for (let read = 0; read < this.enemies.length; read++) {
        if (this.enemies[read].alive) this.enemies[write++] = this.enemies[read];
      }
      this.enemies.length = write;
    }
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

    // reload + gatling spin
    this._tickReload(p, dt);
    const pwd = WEAPONS[p.weapon];
    if (pwd.spinup) {
      const siege = p.loadout === 'juggernaut' && p.abilityActiveT > 0;
      if ((p.wantFire && !p.reloading) || siege) p.spin = Math.min(pwd.spinup, p.spin + dt);
      else p.spin = Math.max(0, p.spin - dt * 1.7);
    }

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
    this._cachedPlayerVel = { x: Math.cos(p.heading) * p.speed, y: Math.sin(p.heading) * p.speed };

    // enemies
    for (const e of this.enemies) {
      if (!e.alive) continue;
      if (e.cd > 0) e.cd -= dt;
      if (e.coilCd > 0) e.coilCd -= dt;
      this._tickReload(e, dt);
      const ewd = WEAPONS[e.weapon];
      if (ewd.spinup) e.spin = Math.min(ewd.spinup, e.spin + dt);
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
    if (this.projectiles.length > MAX_PROJECTILES) this.projectiles.splice(0, this.projectiles.length - MAX_PROJECTILES);
    for (const cell of this.enemyGrid) cell.length = 0;
    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;
      const head = enemy.pts[0];
      const cx = clamp((head.x / HIT_CELL) | 0, 0, HIT_COLS - 1);
      const cy = clamp((head.y / HIT_CELL) | 0, 0, HIT_ROWS - 1);
      this.enemyGrid[cy * HIT_COLS + cx].push(enemy);
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
      let targets;
      if (pr.owner === 'p') {
        targets = [];
        const cx = clamp((pr.x / HIT_CELL) | 0, 0, HIT_COLS - 1);
        const cy = clamp((pr.y / HIT_CELL) | 0, 0, HIT_ROWS - 1);
        for (let gy = Math.max(0, cy - 1); gy <= Math.min(HIT_ROWS - 1, cy + 1); gy++) {
          for (let gx = Math.max(0, cx - 1); gx <= Math.min(HIT_COLS - 1, cx + 1); gx++) {
            const cell = this.enemyGrid[gy * HIT_COLS + gx];
            for (let ci = 0; ci < cell.length; ci++) targets.push(cell[ci]);
          }
        }
      } else targets = [this.player];
      for (const s of targets) {
        if (!s.alive) continue;
        // head + body hit
        let hit = -1;
        const stride = s.pts.length > 24 ? 2 : 1;
        for (let i = 0; i < s.pts.length; i += stride) {
          const rr = (i === 0 ? HEAD_R : BODY_R) + pr.r + (stride === 2 ? SEG * 0.6 : 0);
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
        const rareMult = pel.kind === 'rainbow' ? 5 : (pel.kind === 'gold' ? 2 : 1);
        this._grow(this.player, pel.kind === 'rainbow' ? 6 : 3);
        this.score += Math.round(10 * rareMult * this.combo);
        const pl = this.player;
        // eating grows the pools themselves (capped), not just tops them up
        pl.maxHp = Math.min(pl.baseMaxHp + 60, pl.maxHp + 0.6);
        pl.maxStamina = Math.min(MAX_STAMINA + 100, pl.maxStamina + 1.2);
        pl.hp = Math.min(pl.maxHp, pl.hp + 10 * rareMult);
        pl.stamina = Math.min(pl.maxStamina, pl.stamina + 6 * rareMult);
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
      for (let j = 4; j < p.pts.length; j += 2) {
        const rr2 = BODY_R + HEAD_R + SEG * 0.45;
        if (dist2(ehd.x, ehd.y, p.pts[j].x, p.pts[j].y) < rr2 * rr2) {
          this.deathCause = '';
          if (e.boss || e.archetype === 'brute') {
            // a Titan does not die to a rope. it hurts, and it gets shoved off.
            if (e.coilCd > 0) break;
            e.coilCd = 0.9;
            const ang = Math.atan2(ehd.y - p.pts[j].y, ehd.x - p.pts[j].x);
            this._hitSnake(e, Math.max(60, e.maxHp * 0.10), ang, 520, p);
            this.floaters.push({ x: ehd.x, y: ehd.y, txt: 'COIL BURN', life: 1.0, color: '#FFC24B' });
          } else {
            this.floaters.push({ x: ehd.x, y: ehd.y, txt: 'COILED!', life: 1.1, color: '#39FF9E' });
            this._killSnake(e, p);
          }
          break;
        }
      }
      if (!e.alive) continue;
      const enemyStride = e.pts.length > 24 ? 2 : 1;
      for (let i = 0; i < e.pts.length; i += enemyStride) {
        const rr = (i === 0 ? HEAD_R : BODY_R) + HEAD_R - 2 + (enemyStride === 2 ? SEG * 0.6 : 0);
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
    let enemyCount = 0, boss = null;
    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;
      enemyCount++;
      if (!boss && enemy.boss) boss = enemy;
    }
    const weaponBelt = [];
    if (p.inventory) {
      for (const key of WEAPON_ORDER) {
        const slot = p.inventory[key];
        if (!slot) continue;
        weaponBelt.push({
          key: key,
          name: WEAPONS[key].name,
          ammo: slot.ammo === Infinity ? Infinity : Math.max(0, Math.round(slot.ammo)),
          mag: Math.max(0, Math.round(slot.mag)),
          active: key === p.weapon
        });
      }
    }
    return {
      alive: p.alive && !this.gameOver,
      score: this.score,
      wave: this.wave,
      health: Math.max(0, Math.round(p.hp)),
      stamina: Math.max(0, Math.round(p.stamina)),
      maxStamina: Math.round(p.maxStamina),
      boosting: !!p.boosting,
      level: Math.floor((Math.max(1, this.wave) - 1) / WAVES_PER_LEVEL) + 1,
      waveInLevel: ((Math.max(1, this.wave) - 1) % WAVES_PER_LEVEL) + 1,
      wavesPerLevel: WAVES_PER_LEVEL,
      mag: p.mag,
      magSize: WEAPONS[p.weapon].magSize,
      reloading: !!p.reloading,
      reloadFrac: p.reloading ? clamp(1 - p.reloadT / WEAPONS[p.weapon].reload, 0, 1) : 1,
      spinFrac: WEAPONS[p.weapon].spinup ? clamp(p.spin / WEAPONS[p.weapon].spinup, 0, 1) : 1,
      coins: this.coins,
      fangs: this.fangs,
      lastStands: this.lastStands,
      revives: this.revives,
      abilityName: (ABILITIES[p.loadout] || {}).name || '',
      abilityReady: p.abilityCdT <= 0,
      abilityCdFrac: (ABILITIES[p.loadout] && ABILITIES[p.loadout].cd) ? clamp(1 - p.abilityCdT / ABILITIES[p.loadout].cd, 0, 1) : 1,
      abilityActive: p.abilityActiveT > 0,
      invincible: p.invincibleT > 0,
      ammo: p.ammo === Infinity ? Infinity : p.ammo,
      weapon: p.weapon,
      weaponBelt: weaponBelt,
      weaponCount: weaponBelt.length,
      headX: Math.round(p.pts[0].x),
      headY: Math.round(p.pts[0].y),
      enemyCount: enemyCount,
      waveGoal: this.waveGoal,
      waveKills: this.waveKills,
      missionName: this.currentMission ? this.currentMission.title : ('CLEAR WAVE ' + this.wave),
      bossName: boss ? boss.name : '',
      bossHp: boss ? Math.max(0, Math.round(boss.hp)) : 0,
      bossMaxHp: boss ? boss.maxHp : 0,
      combo: Math.round(this.combo * 10) / 10,
      length: p.pts.length,
      loadout: p.loadout,
      deathCause: this.deathCause
    };
  };

  return {
    Game, WEAPONS, WEAPON_ORDER, LOADOUTS, BOSS_MISSIONS, ABILITIES, PERSONALITIES, STORY, WAVES_PER_LEVEL,
    W, H, DT, SEG, HEAD_R, BODY_R, MAX_HP, MAX_STAMINA, BOOST_MULT, mulberry32
  };
});
