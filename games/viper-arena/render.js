/* VIPER ARENA - Canvas 2D renderer. Camera follows the player head; draws arena
   grid + border glow, snakes as glowing segmented bodies (head->tail gradient),
   pellets, weapon crates with per-weapon icons, projectiles with tracers, muzzle
   flash, particle bursts, screen shake, floating damage numbers, hitmarker, red
   damage vignette, and a corner minimap. Browser-only but node --check safe. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.VRender = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const S = (typeof VIPER !== 'undefined') ? VIPER : (typeof require !== 'undefined' ? require('./sim.js') : {});
  const W = S.W || 2400, H = S.H || 1600;
  const HEAD_R = S.HEAD_R || 12, BODY_R = S.BODY_R || 9;
  const WEAPONS = S.WEAPONS || {};
  const TAU = Math.PI * 2;

  // per-weapon crate colours (fallback to weapon color)
  const CRATE_COL = {
    pistol: '#7CF9FF', shotgun: '#FFC24B', smg: '#8CFF6B',
    railgun: '#FF4D6D', flamethrower: '#FF8A2B', sniper: '#F7E45E',
    minigun: '#C2B2E9', burstcannon: '#B892FF', needler: '#57E8FF',
    arcwelder: '#5EEAD4', shredder: '#FF6B9D'
  };

  const SPRITE_PATHS = {
    player: './assets/generated/player-snake-kit.png',
    grunt: './assets/generated/enemy-red-kit.png',
    runner: './assets/generated/enemy-blue-kit.png',
    brute: './assets/generated/enemy-purple-kit.png',
    reaper: './assets/generated/enemy-reaper-kit.png',
    sniperEnemy: './assets/generated/enemy-sniper-kit.png',
    rusher: './assets/generated/enemy-rusher-kit.png',
    pistol: './assets/generated/pistol.png', smg: './assets/generated/smg.png',
    shotgun: './assets/generated/shotgun.png', railgun: './assets/generated/railgun.png',
    flamethrower: './assets/generated/flamethrower.png', sniper: './assets/generated/sniper.png',
    crate: './assets/generated/weapon-crate.png', orbs: './assets/generated/orbs.png',
    coins: './assets/generated/coins.png', combatFx: './assets/generated/combat-fx.png',
    arenaFloor: './assets/generated/arena-floor.png', grassFloor: './assets/generated/grass-floor.png',
    arenaBorder: './assets/generated/arena-border.png'
  };

  const MAP_FLOOR_KEYS = {
    neon_foundry: 'mapNeonFoundry', acid_marsh: 'mapAcidMarsh',
    rail_yard: 'mapRailYard', frost_vault: 'mapFrostVault',
    solar_temple: 'mapSolarTemple'
  };
  const MAP_SPRITE_PATHS = {
    mapNeonFoundry: './assets/generated/maps/neon-foundry.webp',
    mapAcidMarsh: './assets/generated/maps/acid-marsh.webp',
    mapRailYard: './assets/generated/maps/rail-yard.webp',
    mapFrostVault: './assets/generated/maps/frost-vault.webp',
    mapSolarTemple: './assets/generated/maps/solar-temple.webp'
  };

  // Measured from the actual Replicate outputs in Downloads; the generators did
  // not use one shared atlas geometry, so each archetype gets explicit cells.
  const SNAKE_ATLAS = {
    player: { head: [72, 36, 330, 292], large: [385, 35, 255, 275], small: [645, 70, 205, 230], facesLeft: true },
    grunt: { head: [280, 45, 470, 300], large: [170, 350, 390, 250], small: [540, 360, 300, 250] },
    runner: { head: [125, 65, 320, 155], large: [155, 230, 245, 120], small: [390, 230, 210, 120] },
    brute: { head: [235, 35, 420, 310], large: [105, 345, 380, 275], small: [545, 355, 345, 265] },
    reaper: { head: [85, 45, 455, 275], large: [105, 345, 410, 300], small: [120, 670, 410, 245], facesLeft: true },
    sniperEnemy: { head: [150, 45, 330, 230], large: [235, 285, 260, 210], small: [525, 330, 230, 170], facesLeft: true },
    rusher: { head: [95, 45, 350, 280], large: [145, 370, 370, 245], small: [565, 390, 320, 220], facesLeft: true }
  };

  function loadSprite(path) {
    const image = new Image();
    image.ready = false;
    image.addEventListener('load', function () { image.ready = true; });
    image.addEventListener('error', function () { image.ready = false; });
    image.src = path;
    return image;
  }

  function Renderer(canvas, minimap) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mini = minimap || null;
    this.mctx = minimap ? minimap.getContext('2d') : null;
    this.vw = 0; this.vh = 0; this.dpr = 1;
    this.camX = W / 2; this.camY = H / 2;
    this.shake = 0; this.shakeX = 0; this.shakeY = 0;  // screen shake
    this.vignette = 0;            // red damage flash 0..1
    this.particles = [];          // {x,y,vx,vy,life,max,r,color,kind}
    this.hitmarkerT = 0;
    this.time = 0;
    this.crowded = false;
    this.lastMinimapAt = -1;
    // One-time asset intake. Collision remains deterministic and independent of
    // pixels; failed images fall back to the existing vector renderer.
    this.sprites = {};
    for (const key in SPRITE_PATHS) this.sprites[key] = loadSprite(SPRITE_PATHS[key]);
    this.floorPatterns = Object.create(null);
    this.resize();
  }

  Renderer.prototype.resize = function () {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.dpr = dpr;
    // guard against a zero-size viewport (webview mid-rotation, hidden tab, early boot):
    // a 0-wide canvas renders nothing at all, so fall back to a sane frame
    this.vw = window.innerWidth || document.documentElement.clientWidth || 960;
    this.vh = window.innerHeight || document.documentElement.clientHeight || 640;
    // zoomed out so the player can see threats travelling in from the rim
    this.zoom = this.vw < 700 ? 0.41 : 0.43;
    this.wvw = this.vw / this.zoom;   // world units visible horizontally
    this.wvh = this.vh / this.zoom;
    this.canvas.width = Math.floor(this.vw * dpr);
    this.canvas.height = Math.floor(this.vh * dpr);
    this.canvas.style.width = this.vw + 'px';
    this.canvas.style.height = this.vh + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.mini) {
      const mw = this.mini.clientWidth || 180, mh = this.mini.clientHeight || 120;
      this.mini.width = Math.floor(mw * dpr);
      this.mini.height = Math.floor(mh * dpr);
      this.mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.miniW = mw; this.miniH = mh;
    }
  };

  // ---- particle spawners, fed from game.events ----
  Renderer.prototype.addShake = function (amt) { if (amt > this.shake) this.shake = amt; };
  Renderer.prototype.flashDamage = function () { this.vignette = 1; };
  Renderer.prototype.hitmarker = function () { this.hitmarkerT = 0.14; };

  Renderer.prototype.burst = function (x, y, color, n, speed, life) {
    n = n || 10; speed = speed || 220; life = life || 0.6;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, sp = (0.4 + Math.random()) * speed;
      this.particles.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: life * (0.6 + Math.random() * 0.7), max: life,
        r: 2 + Math.random() * 3, color: color || '#7CF9FF', kind: 'spark'
      });
    }
    this._capParticles();
  };

  Renderer.prototype._capParticles = function () {
    const max = 300;
    if (this.particles.length > max) this.particles.splice(0, this.particles.length - max);
  };

  Renderer.prototype.muzzle = function (x, y, ang, power, color, kind) {
    const n = 5 + power * 5, flame = kind === 'flame';
    for (let i = 0; i < n; i++) {
      const a = ang + (Math.random() - 0.5) * (flame ? 0.9 : 0.5);
      const sp = 200 + Math.random() * 340 * power;
      this.particles.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 0.12 + Math.random() * 0.12, max: 0.24, r: 2 + Math.random() * 3.5,
        color: color || '#FFC24B', kind: flame ? 'flame' : 'muzzle'
      });
    }
    // bright flash blob at the muzzle
    this.particles.push({ x: x, y: y, vx: 0, vy: 0, life: 0.06, max: 0.06, r: 10 + power * 8, color: color || '#FFF', kind: 'flash' });
    this._capParticles();
  };

  // ---- drain events emitted by the sim ----
  Renderer.prototype.consume = function (events) {
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      switch (e.type) {
        case 'shake': this.addShake(e.amt); break;
        case 'muzzle': this.muzzle(e.x, e.y, e.ang, e.power || 1, e.color, e.kind); break;
        case 'spark': this.burst(e.x, e.y, e.color, 4, 160, 0.4); break;
        case 'blood': this.burst(e.x, e.y, e.color, e.n || 6, 200, 0.5); break;
        case 'burst': this.burst(e.x, e.y, e.color, 14, 300, 0.8); break;
        case 'pop': this.burst(e.x, e.y, '#9CFFB0', 8, 180, 0.5); break;
        case 'pickup': this.burst(e.x, e.y, CRATE_COL[e.weapon] || '#FFF', 18, 260, 0.7); break;
        case 'kill': this.burst(e.x, e.y, '#FFE45E', 20, 340, 0.9); break;
        case 'coins':
          for (let c = 0; c < (e.boss ? 8 : 3); c++) {
            this.particles.push({
              x: e.x, y: e.y, vx: (Math.random() - 0.5) * 220,
              vy: -100 - Math.random() * 180, life: 0.8 + Math.random() * 0.45,
              max: 1.25, r: e.boss ? 8 : 6, color: '#FFE45E', kind: e.boss && c === 0 ? 'coinStack' : 'coin'
            });
          }
          this._capParticles();
          break;
        case 'bossKill':
          this.burst(e.x, e.y, '#FF4D9D', 48, 520, 1.3);
          this.particles.push({ x: e.x, y: e.y, vx: 0, vy: 0, life: 0.62, max: 0.62, r: 72, color: '#FF8A2B', kind: 'explosion' });
          this.addShake(30);
          break;
        case 'say': this.speak(e.x, e.y, e.line, e.color, e.boss); break;
        case 'lastStand': this.addShake(22); this.flashDamage(); break;
        case 'hitmarker': this.hitmarker(); break;
        case 'death': this.addShake(26); break;
        default: break;
      }
    }
  };

  // ---- per-frame update of visual state ----
  Renderer.prototype.update = function (dt, headX, headY) {
    this.time += dt;
    this.camX += (headX - this.camX) * Math.min(1, dt * 8);
    this.camY += (headY - this.camY) * Math.min(1, dt * 8);
    // clamp the camera inside the arena so the view never shows dead space
    // outside the border (only clamp on an axis where the arena is bigger
    // than the viewport, otherwise centre it).
    const hw = this.wvw / 2, hh = this.wvh / 2;
    this.camX = this.wvw >= W ? W / 2 : Math.max(hw, Math.min(W - hw, this.camX));
    this.camY = this.wvh >= H ? H / 2 : Math.max(hh, Math.min(H - hh, this.camY));
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 42);
      this.shakeX = (Math.random() - 0.5) * this.shake * 2;
      this.shakeY = (Math.random() - 0.5) * this.shake * 2;
    } else { this.shakeX = 0; this.shakeY = 0; }
    if (this.vignette > 0) this.vignette = Math.max(0, this.vignette - dt * 1.8);
    if (this.hitmarkerT > 0) this.hitmarkerT -= dt;
    if (this.speech && this.speech.length) {
      for (let i = this.speech.length - 1; i >= 0; i--) {
        this.speech[i].life -= dt;
        if (this.speech[i].life <= 0) this.speech.splice(i, 1);
      }
    }
    const ps = this.particles;
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      p.life -= dt;
      if (p.life <= 0) { ps.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vx *= 0.90; p.vy *= 0.90;
      if (p.kind === 'flame') p.vy -= 40 * dt; // flame rises
    }
  };

  Renderer.prototype._originX = function () { return this.camX - this.wvw / 2 + this.shakeX; };
  Renderer.prototype._originY = function () { return this.camY - this.wvh / 2 + this.shakeY; };

  // ---- main draw ----
  Renderer.prototype.draw = function (game) {
    const ctx = this.ctx;
    const ox = this._originX(), oy = this._originY();
    this.crowded = game.enemies.length > 30 || game.projectiles.length > 220;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const palette = game.map ? game.map.palette : null;
    ctx.fillStyle = palette ? palette.background : '#04070a';
    ctx.fillRect(0, 0, this.vw, this.vh);
    ctx.save();
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-ox, -oy);   // -> world space
    this._drawMap(ctx, game, ox, oy);
    this._drawGrid(ctx, ox, oy, game.map);
    this._drawBorder(ctx, game.map);
    this._drawPellets(ctx, game.pellets);
    this._drawCrates(ctx, game.crates);
    this._drawBeams(ctx, game.beams);
    this._drawProjectiles(ctx, game.projectiles);
    for (const e of game.enemies) if (e.alive && this._snakeVisible(e, ox, oy)) this._drawSnake(ctx, e, false);
    if (game.player.alive) this._drawSnake(ctx, game.player, true);
    this._drawAimLine(ctx, game);
    this._drawParticles(ctx);
    this._drawFloaters(ctx, game.floaters);
    this._drawSpeech(ctx);
    ctx.restore();             // -> screen space
    this._drawVignette(ctx, game.player);
    this._drawHitmarker(ctx);
    if (this.time - this.lastMinimapAt >= 0.09) {
      this._drawMinimap(game);
      this.lastMinimapAt = this.time;
    }
  };

  Renderer.prototype._snakeVisible = function (snake, ox, oy) {
    const head = snake.pts[0];
    const pad = 180 + (snake.scale || 1) * 60;
    return head.x >= ox - pad && head.x <= ox + this.wvw + pad &&
      head.y >= oy - pad && head.y <= oy + this.wvh + pad;
  };

  Renderer.prototype._drawMap = function (ctx, game, ox, oy) {
    const map = game.map, layout = game.mapLayout;
    if (!map || !layout) return;
    const palette = map.palette;
    ctx.save();
    ctx.fillStyle = palette.floor;
    ctx.fillRect(0, 0, W, H);
    // Every chapter has its own generated texture. Images are loaded once and
    // converted to cached CanvasPattern objects; the fallback palette still
    // renders immediately while a map-specific WebP decodes.
    const floorKey = MAP_FLOOR_KEYS[map.id] || (map.id === 'acid_marsh' ? 'grassFloor' : 'arenaFloor');
    if (!this.sprites[floorKey] && MAP_SPRITE_PATHS[floorKey]) {
      this.sprites[floorKey] = loadSprite(MAP_SPRITE_PATHS[floorKey]);
    }
    const floor = floorKey && this.sprites[floorKey];
    if (floor && floor.ready) {
      if (!this.floorPatterns[floorKey]) this.floorPatterns[floorKey] = ctx.createPattern(floor, 'repeat');
      ctx.globalAlpha = map.id === 'acid_marsh' ? 0.34 : 0.28;
      ctx.fillStyle = this.floorPatterns[floorKey];
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    // Props and hazards are generated once and remain deliberately simple: they
    // give each map identity without adding per-frame simulation allocations.
    const pad = 100, x2 = ox + this.wvw + pad, y2 = oy + this.wvh + pad;
    for (let i = 0; i < layout.props.length; i++) {
      const p = layout.props[i];
      if (p.x < ox - pad || p.x > x2 || p.y < oy - pad || p.y > y2) continue;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation || 0);
      ctx.globalAlpha = 0.46; ctx.fillStyle = palette.prop;
      ctx.fillRect(-p.radius, -p.radius * 0.38, p.radius * 2, p.radius * 0.76);
      ctx.globalAlpha = 0.62; ctx.strokeStyle = palette.accent; ctx.lineWidth = 1.5;
      ctx.strokeRect(-p.radius * 0.55, -p.radius * 0.55, p.radius * 1.1, p.radius * 1.1);
      ctx.restore();
    }
    const obstacles = layout.obstacles || [];
    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      if (o.x < ox - pad || o.x > x2 || o.y < oy - pad || o.y > y2) continue;
      ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.rotation || 0);
      ctx.globalAlpha = 0.96; ctx.fillStyle = palette.floor; ctx.strokeStyle = palette.border; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.arc(0, 0, o.radius, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 0.55; ctx.strokeStyle = palette.prop; ctx.lineWidth = 12;
      ctx.beginPath(); ctx.arc(0, 0, Math.max(18, o.radius - 20), 0, TAU); ctx.stroke();
      ctx.globalAlpha = 0.85; ctx.fillStyle = palette.accent;
      for (let b = 0; b < 6; b++) {
        const a = b / 6 * TAU;
        ctx.fillRect(Math.cos(a) * (o.radius - 10) - 3, Math.sin(a) * (o.radius - 10) - 3, 6, 6);
      }
      ctx.restore();
    }
    const state = {};
    for (let i = 0; i < layout.hazards.length; i++) {
      const h = layout.hazards[i];
      const hs = (typeof SWGMaps !== 'undefined') ? SWGMaps.resolveHazardState(h, game.t || 0, state) : state;
      ctx.save(); ctx.translate(hs.x || h.x, hs.y || h.y); ctx.rotate(hs.rotation || h.rotation || 0);
      ctx.globalAlpha = hs.active ? 0.28 : (hs.telegraphing ? 0.18 : 0.08);
      ctx.fillStyle = palette.hazard; ctx.strokeStyle = palette.hazard; ctx.lineWidth = hs.telegraphing ? 4 : 2;
      if (h.type.indexOf('disc') !== -1) {
        ctx.beginPath(); ctx.arc(0, 0, h.radius, 0, TAU); ctx.fill(); ctx.stroke();
      } else {
        ctx.fillRect(-h.width / 2, -h.height / 2, h.width, h.height);
        ctx.strokeRect(-h.width / 2, -h.height / 2, h.width, h.height);
      }
      ctx.restore();
    }
    ctx.restore();
  };

  Renderer.prototype._drawGrid = function (ctx, ox, oy, map) {
    const grid = map ? map.grid : null;
    const step = grid ? grid.size : 80;
    const x1 = ox + this.wvw, y1 = oy + this.wvh;
    ctx.lineWidth = 1;
    ctx.strokeStyle = map ? map.palette.gridMinor : 'rgba(124,249,255,0.05)';
    ctx.beginPath();
    for (let x = Math.floor(ox / step) * step; x <= x1; x += step) {
      if (x < 0 || x > W) continue;
      ctx.moveTo(x, Math.max(0, oy)); ctx.lineTo(x, Math.min(H, y1));
    }
    for (let y = Math.floor(oy / step) * step; y <= y1; y += step) {
      if (y < 0 || y > H) continue;
      ctx.moveTo(Math.max(0, ox), y); ctx.lineTo(Math.min(W, x1), y);
    }
    ctx.stroke();
  };

  Renderer.prototype._drawBorder = function (ctx, map) {
    const color = map ? map.palette.border : '#7CF9FF';
    ctx.save();
    const border = this.sprites.arenaBorder;
    if (border && border.ready) {
      const sx = 25, sy = 265, sw = 970, sh = 135, thickness = 34;
      ctx.globalAlpha = 0.92;
      ctx.drawImage(border, sx, sy, sw, sh, 0, -thickness * 0.15, W, thickness);
      ctx.save(); ctx.translate(W, 0); ctx.rotate(Math.PI / 2);
      ctx.drawImage(border, sx, sy, sw, sh, 0, -thickness * 0.15, H, thickness); ctx.restore();
      ctx.save(); ctx.translate(W, H); ctx.rotate(Math.PI);
      ctx.drawImage(border, sx, sy, sw, sh, 0, -thickness * 0.15, W, thickness); ctx.restore();
      ctx.save(); ctx.translate(0, H); ctx.rotate(-Math.PI / 2);
      ctx.drawImage(border, sx, sy, sw, sh, 0, -thickness * 0.15, H, thickness); ctx.restore();
    }
    ctx.shadowColor = color; ctx.shadowBlur = 26;
    ctx.strokeStyle = color; ctx.globalAlpha = 0.78; ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, W, H);
    ctx.restore();
  };

  Renderer.prototype._drawSnake = function (ctx, s, isPlayer) {
    const pts = s.pts, n = pts.length;
    if (n < 2) return;
    const scale = s.scale || 1;
    const head = pts[0];
    const flash = s.hitFlash > 0;
    const base = flash ? '#ffffff' : s.color;
    const tail = isPlayer ? '#0e6b46' : '#5a1414';
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = isPlayer ? '#39FF9E' : '#FF5A5A';
    ctx.shadowBlur = 18;
    // Crowd mode turns N tapered strokes into one path per snake. The close-up
    // renderer keeps the richer gradient when the arena is less saturated.
    if (this.crowded) {
      ctx.shadowBlur = 0; ctx.strokeStyle = base; ctx.lineWidth = BODY_R * scale * 1.55;
      ctx.beginPath(); ctx.moveTo(pts[n - 1].x, pts[n - 1].y);
      for (let i = n - 2; i >= 0; i--) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    } else for (let i = n - 1; i >= 1; i--) {
      const a = pts[i], b = pts[i - 1], t = i / n;
      ctx.strokeStyle = mix(base, tail, t);
      ctx.lineWidth = Math.max(2, BODY_R * scale * (1 - t * 0.55) * 2);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    ctx.shadowBlur = 0;
    this._drawSnakeBodySprites(ctx, s, isPlayer);
    // head
    ctx.fillStyle = flash ? '#fff' : (isPlayer ? '#8BFFD0' : '#FF9A9A');
    ctx.beginPath(); ctx.arc(head.x, head.y, HEAD_R * scale, 0, TAU); ctx.fill();
    // eye pointing at the aim
    const ax = Math.cos(s.aimAng), ay = Math.sin(s.aimAng);
    if (isPlayer) this._drawEquipment(ctx, s, head, ax, ay);
    ctx.fillStyle = '#04070a';
    ctx.beginPath(); ctx.arc(head.x + ax * 4 * scale, head.y + ay * 4 * scale, 3.4 * scale, 0, TAU); ctx.fill();
    this._drawSnakeSprite(ctx, s, head, isPlayer);
    this._drawWeaponSprite(ctx, s, head);
    // recoil flash line
    const rk = s.recoil / 320;
    if (rk > 0.02) {
      ctx.strokeStyle = isPlayer ? '#39FF9E' : '#FF5A5A';
      ctx.globalAlpha = rk; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(head.x + ax * HEAD_R * scale, head.y + ay * HEAD_R * scale);
      ctx.lineTo(head.x + ax * (HEAD_R * scale + 16 * rk), head.y + ay * (HEAD_R * scale + 16 * rk));
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    // enemy health pip
    if (!isPlayer && (s.hp < s.maxHp || s.boss)) {
      const w = s.boss ? 92 : 34, hpr = Math.max(0, s.hp / s.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(head.x - w / 2, head.y - HEAD_R * scale - 17, w, s.boss ? 6 : 4);
      ctx.fillStyle = s.boss ? s.color : (hpr > 0.4 ? '#8CFF6B' : '#FF4D6D');
      ctx.fillRect(head.x - w / 2, head.y - HEAD_R * scale - 17, w * hpr, s.boss ? 6 : 4);
      if (s.boss) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '800 11px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fillText(s.name, head.x, head.y - HEAD_R * scale - 23);
        ctx.restore();
      }
    }
  };

  Renderer.prototype._drawSnakeSprite = function (ctx, snake, head, isPlayer) {
    const key = isPlayer ? 'player' : (snake.archetype === 'sniper' ? 'sniperEnemy' : (snake.archetype || 'grunt'));
    const sprite = this.sprites[key] || this.sprites.grunt;
    if (!sprite || !sprite.ready) return;
    const atlas = SNAKE_ATLAS[key] || SNAKE_ATLAS.grunt;
    const crop = atlas.head;
    const size = (key === 'grunt' || key === 'brute' ? 58 : 54) * (snake.scale || 1);
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate((snake.aimAng || 0) + (atlas.facesLeft ? Math.PI : 0));
    ctx.globalAlpha = snake.hitFlash > 0 ? 0.72 : 1;
    ctx.drawImage(sprite, crop[0], crop[1], crop[2], crop[3], -size * 0.54, -size * 0.42, size, size * 0.84);
    ctx.restore();
  };

  Renderer.prototype._drawSnakeBodySprites = function (ctx, snake, isPlayer) {
    const key = isPlayer ? 'player' : (snake.archetype === 'sniper' ? 'sniperEnemy' : (snake.archetype || 'grunt'));
    const sprite = this.sprites[key] || this.sprites.grunt;
    if (!sprite || !sprite.ready) return;
    const atlas = SNAKE_ATLAS[key] || SNAKE_ATLAS.grunt;
    const pts = snake.pts, scale = snake.scale || 1;
    const maxAccents = this.crowded ? 2 : Math.min(6, Math.max(2, Math.floor(pts.length / 5)));
    const stride = Math.max(2, Math.floor((pts.length - 2) / maxAccents));
    let drawn = 0;
    for (let i = 2; i < pts.length && drawn < maxAccents; i += stride, drawn++) {
      const p = pts[i];
      const small = i > pts.length * 0.58;
      const crop = small ? atlas.small : atlas.large;
      const size = (small ? 24 : 30) * scale;
      ctx.drawImage(sprite, crop[0], crop[1], crop[2], crop[3], p.x - size / 2, p.y - size / 2, size, size);
    }
  };

  Renderer.prototype._drawWeaponSprite = function (ctx, snake, head) {
    const sprite = this.sprites[snake.weapon];
    const scale = snake.scale || 1;
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(snake.aimAng || 0);
    ctx.globalAlpha = 0.96;
    if (sprite && sprite.ready) {
      // Full transparent canvas is intentional: each weapon's art occupies the
      // centre and keeps a consistent visual pivot across the generated files.
      ctx.drawImage(sprite, -27 * scale, -36 * scale, 108 * scale, 72 * scale);
    } else {
      ctx.translate(24 * scale, 1 * scale);
      ctx.scale(scale, scale);
      ctx.strokeStyle = ctx.fillStyle = CRATE_COL[snake.weapon] || '#7CF9FF';
      ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 8;
      drawWeaponIcon(ctx, snake.weapon, 17);
    }
    ctx.restore();
  };

  Renderer.prototype._drawEquipment = function (ctx, s, head, ax, ay) {
    const color = s.equipmentColor || '#7CF9FF';
    const px = -ay, py = ax;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    if (s.loadout === 'bulwark') {
      ctx.globalAlpha = 0.82;
      ctx.lineWidth = 3;
      for (let i = 2; i < Math.min(s.pts.length, 11); i += 2) {
        const p = s.pts[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, BODY_R + 3, 0, TAU);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(head.x, head.y, HEAD_R + 5, -0.9, 0.9);
      ctx.stroke();
    } else if (s.loadout === 'arc') {
      const pulse = 18 + Math.sin(this.time * 8) * 2;
      ctx.globalAlpha = 0.72;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(head.x, head.y, pulse, this.time * 2, this.time * 2 + Math.PI * 1.55);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(head.x + px * 7, head.y + py * 7);
      ctx.lineTo(head.x - ax * 12, head.y - ay * 12);
      ctx.lineTo(head.x - px * 7, head.y - py * 7);
      ctx.stroke();
    } else {
      ctx.globalAlpha = 0.88;
      ctx.beginPath();
      ctx.moveTo(head.x - ax * 4 + px * 8, head.y - ay * 4 + py * 8);
      ctx.lineTo(head.x - ax * 18 + px * 15, head.y - ay * 18 + py * 15);
      ctx.lineTo(head.x - ax * 13 + px * 3, head.y - ay * 13 + py * 3);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(head.x - ax * 4 - px * 8, head.y - ay * 4 - py * 8);
      ctx.lineTo(head.x - ax * 18 - px * 15, head.y - ay * 18 - py * 15);
      ctx.lineTo(head.x - ax * 13 - px * 3, head.y - ay * 13 - py * 3);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  };

  Renderer.prototype._drawPellets = function (ctx, pellets) {
    ctx.save();
    ctx.shadowColor = '#9CFFB0'; ctx.shadowBlur = 12;
    const orbSprite = this.sprites.orbs;
    for (const p of pellets) {
      const pr = p.r * (0.85 + Math.sin(p.ph) * 0.18);
      if (orbSprite && orbSprite.ready) {
        const crop = p.kind === 'rainbow' ? [385, 385, 260, 250] : (p.kind === 'gold' ? [130, 380, 230, 240] : [150, 135, 200, 210]);
        const size = pr * (p.kind === 'rainbow' ? 5.2 : (p.kind === 'gold' ? 4.7 : 4.2));
        ctx.drawImage(orbSprite, crop[0], crop[1], crop[2], crop[3], p.x - size / 2, p.y - size / 2, size, size);
        continue;
      }
      ctx.fillStyle = '#9CFFB0';
      ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(p.x - pr * 0.3, p.y - pr * 0.3, pr * 0.35, 0, TAU); ctx.fill();
    }
    ctx.restore();
  };

  Renderer.prototype._drawCrates = function (ctx, crates) {
    for (const c of crates) {
      const col = CRATE_COL[c.type] || (WEAPONS[c.type] && WEAPONS[c.type].color) || '#FFF';
      const r = c.r;
      ctx.save();
      ctx.translate(c.x, c.y + Math.sin(c.ph) * 3);
      ctx.rotate(Math.sin(c.ph * 0.5) * 0.12);
      const crateSprite = this.sprites.crate;
      if (crateSprite && crateSprite.ready) {
        ctx.globalAlpha = 0.98;
        ctx.drawImage(crateSprite, -r * 2.05, -r * 2.05, r * 4.1, r * 4.1);
        ctx.fillStyle = col; ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 8;
        drawWeaponIcon(ctx, c.type, r * 0.78);
        ctx.restore();
        continue;
      }
      ctx.shadowColor = col; ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(6,12,16,0.9)'; ctx.strokeStyle = col; ctx.lineWidth = 3;
      roundRect(ctx, -r, -r, r * 2, r * 2, 5);
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = col; ctx.strokeStyle = col;
      drawWeaponIcon(ctx, c.type, r);
      ctx.restore();
    }
  };

  // trajectory line so you always know exactly where the shot goes
  Renderer.prototype._drawAimLine = function (ctx, game) {
    const p = game.player;
    if (!p.alive || game.gameOver) return;
    const head = p.pts[0];
    const a = p.aimAng;
    const wd = (game.constructor && game.WEAPONS) ? null : null;
    const len = 620;
    const sx = head.x + Math.cos(a) * 26, sy = head.y + Math.sin(a) * 26;
    const ex = head.x + Math.cos(a) * len, ey = head.y + Math.sin(a) * len;
    ctx.save();
    // main dashed trajectory
    const grad = ctx.createLinearGradient(sx, sy, ex, ey);
    grad.addColorStop(0, 'rgba(124,249,255,0.55)');
    grad.addColorStop(0.55, 'rgba(124,249,255,0.18)');
    grad.addColorStop(1, 'rgba(124,249,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.setLineDash([14, 12]);
    ctx.lineDashOffset = -(this.time * 90) % 26;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.setLineDash([]);
    // muzzle tick so the origin is unambiguous
    ctx.strokeStyle = 'rgba(124,249,255,0.75)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(sx, sy);
    ctx.lineTo(head.x + Math.cos(a) * 54, head.y + Math.sin(a) * 54); ctx.stroke();
    // small reticle where the shot lands
    ctx.strokeStyle = 'rgba(124,249,255,0.5)';
    ctx.lineWidth = 2;
    const rx = head.x + Math.cos(a) * (len * 0.72), ry = head.y + Math.sin(a) * (len * 0.72);
    ctx.beginPath(); ctx.arc(rx, ry, 9, 0, TAU); ctx.stroke();
    ctx.restore();
  };

  Renderer.prototype.speak = function (x, y, line, color, boss) {
    this.speech = this.speech || [];
    this.speech.push({ x: x, y: y, line: line, color: color || '#fff', boss: !!boss, life: boss ? 4.2 : 2.6, max: boss ? 4.2 : 2.6 });
    if (this.speech.length > 6) this.speech.shift();
  };

  Renderer.prototype._drawSpeech = function (ctx) {
    if (!this.speech || !this.speech.length) return;
    ctx.save();
    ctx.textAlign = 'center';
    for (const s of this.speech) {
      const k = Math.min(1, s.life / 0.4);
      const rise = (1 - s.life / s.max) * 26;
      ctx.globalAlpha = k;
      ctx.font = (s.boss ? '700 20px' : '600 15px') + " 'Courier New', monospace";
      const w = ctx.measureText(s.line).width + 24;
      const bx = s.x - w / 2, by = s.y - 52 - rise;
      ctx.fillStyle = 'rgba(4,7,10,0.86)';
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by, w, 30, 6); else ctx.rect(bx, by, w, 30);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = s.boss ? s.color : '#e8f6ff';
      ctx.fillText(s.line, s.x, by + 20);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  Renderer.prototype._drawProjectiles = function (ctx, projs) {
    ctx.save();
    ctx.lineCap = 'round';
    for (const p of projs) {
      const sp = Math.hypot(p.vx, p.vy) || 1;
      const ux = p.vx / sp, uy = p.vy / sp;
      // every weapon's round reads differently in flight
      const style = p.style || (sp > 1700 ? 'lance' : p.kind === 'flame' ? 'flame' : sp > 1150 ? 'dart' : 'slug');
      const tl = style === 'lance' ? 74 : style === 'dart' ? 30 : style === 'flame' ? 10 : 18;
      const bx = p.x - ux * tl, by = p.y - uy * tl;
      ctx.shadowColor = p.color; ctx.shadowBlur = style === 'lance' ? 20 : 12;
      const grad = ctx.createLinearGradient(bx, by, p.x, p.y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, p.color);
      ctx.strokeStyle = grad;
      ctx.lineWidth = style === 'lance' ? p.r * 1.1 : style === 'slug' ? p.r * 2.1 : p.r * 1.6;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(p.x, p.y); ctx.stroke();
      if (style === 'flame') {
        // soft blob that swells as it travels
        ctx.fillStyle = p.color; ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 3, 0, TAU); ctx.fill();
        ctx.globalAlpha = 1;
      } else if (style === 'lance') {
        // long thin sabot with a white-hot tip
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.85, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x - ux * 20, p.y - uy * 20); ctx.lineTo(p.x, p.y); ctx.stroke();
      } else if (style === 'slug') {
        // fat pellet with a dark core so shotgun spray reads as mass
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 1.4, 0, TAU); ctx.fill();
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.5, 0, TAU); ctx.fill();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 0.5, 0, TAU); ctx.fill();
      }
    }
    ctx.restore();
  };

  Renderer.prototype._drawBeams = function (ctx, beams) {
    ctx.save();
    ctx.lineCap = 'round';
    for (const b of beams) {
      const a = Math.max(0, b.life / 0.16);
      ctx.globalAlpha = a;
      ctx.shadowColor = b.color; ctx.shadowBlur = 30;
      ctx.strokeStyle = b.color; ctx.lineWidth = 6 * a + 2;
      ctx.beginPath(); ctx.moveTo(b.x1, b.y1); ctx.lineTo(b.x2, b.y2); ctx.stroke();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2 * a;
      ctx.beginPath(); ctx.moveTo(b.x1, b.y1); ctx.lineTo(b.x2, b.y2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  Renderer.prototype._drawParticles = function (ctx) {
    ctx.save();
    for (const p of this.particles) {
      const a = Math.max(0, Math.min(1, p.life / p.max));
      ctx.globalAlpha = a;
      if (p.kind === 'coin' && this.sprites.coins && this.sprites.coins.ready) {
        const size = p.r * 4;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((1 - a) * 7);
        ctx.drawImage(this.sprites.coins, 145, 35, 315, 280, -size / 2, -size / 2, size, size); ctx.restore();
        continue;
      }
      if (p.kind === 'coinStack' && this.sprites.coins && this.sprites.coins.ready) {
        const size = p.r * 7;
        ctx.drawImage(this.sprites.coins, 520, 340, 400, 280, p.x - size / 2, p.y - size / 2, size, size * 0.72);
        continue;
      }
      if (p.kind === 'explosion' && this.sprites.combatFx && this.sprites.combatFx.ready) {
        const size = p.r * (1.3 - a * 0.3);
        ctx.drawImage(this.sprites.combatFx, 240, 360, 290, 230, p.x - size / 2, p.y - size / 2, size, size);
        continue;
      }
      if (p.kind === 'flash' && this.sprites.combatFx && this.sprites.combatFx.ready) {
        const size = p.r * 4.6;
        ctx.drawImage(this.sprites.combatFx, 380, 80, 270, 230, p.x - size / 2, p.y - size / 2, size, size);
        continue;
      }
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.kind === 'flash' ? 24 : 8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (p.kind === 'flame' ? (0.5 + a) : 1), 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  Renderer.prototype._drawFloaters = function (ctx, floaters) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '900 22px "Segoe UI", Arial, sans-serif';
    for (const f of floaters) {
      ctx.globalAlpha = Math.max(0, Math.min(1, f.life));
      ctx.shadowColor = f.color; ctx.shadowBlur = 10;
      ctx.fillStyle = f.color;
      ctx.fillText(f.txt, f.x, f.y);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  Renderer.prototype._drawVignette = function (ctx, player) {
    const dmg = player.damageFlash > 0 ? player.damageFlash : 0;
    const v = Math.max(this.vignette, dmg * 1.4);
    // ambient pulse when health is low
    const lowHp = player.hp / (player.maxHp || 100);
    const amb = lowHp < 0.3 ? (0.18 + Math.sin(this.time * 6) * 0.06) * (1 - lowHp / 0.3) : 0;
    const strength = Math.max(v * 0.6, amb);
    if (strength <= 0.001) return;
    const g = ctx.createRadialGradient(
      this.vw / 2, this.vh / 2, Math.min(this.vw, this.vh) * 0.35,
      this.vw / 2, this.vh / 2, Math.max(this.vw, this.vh) * 0.72);
    g.addColorStop(0, 'rgba(255,40,70,0)');
    g.addColorStop(1, 'rgba(255,30,60,' + Math.min(0.7, strength).toFixed(3) + ')');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.vw, this.vh);
  };

  Renderer.prototype._drawHitmarker = function (ctx) {
    if (this.hitmarkerT <= 0) return;
    const cx = this.vw / 2, cy = this.vh / 2;
    ctx.save();
    ctx.globalAlpha = this.hitmarkerT / 0.14;
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3;
    for (let k = 0; k < 4; k++) {
      const ang = Math.PI / 4 + k * Math.PI / 2;
      const dx = Math.cos(ang), dy = Math.sin(ang);
      ctx.beginPath();
      ctx.moveTo(cx + dx * 6, cy + dy * 6);
      ctx.lineTo(cx + dx * 14, cy + dy * 14);
      ctx.stroke();
    }
    ctx.restore();
  };

  Renderer.prototype._drawMinimap = function (game) {
    if (!this.mctx) return;
    const ctx = this.mctx, mw = this.miniW, mh = this.miniH;
    const sx = mw / W, sy = mh / H;
    ctx.clearRect(0, 0, mw, mh);
    ctx.fillStyle = 'rgba(156,255,176,0.6)';
    for (const p of game.pellets) ctx.fillRect(p.x * sx - 0.5, p.y * sy - 0.5, 1.5, 1.5);
    for (const c of game.crates) {
      ctx.fillStyle = CRATE_COL[c.type] || '#FFF';
      ctx.fillRect(c.x * sx - 1.5, c.y * sy - 1.5, 3, 3);
    }
    ctx.fillStyle = '#FF5A5A';
    for (const e of game.enemies) {
      if (!e.alive) continue;
      const h = e.pts[0];
      ctx.beginPath(); ctx.arc(h.x * sx, h.y * sy, 2.4, 0, TAU); ctx.fill();
    }
    if (game.player.alive) {
      const h = game.player.pts[0];
      ctx.fillStyle = '#39FF9E';
      ctx.shadowColor = '#39FF9E'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(h.x * sx, h.y * sy, 3, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(124,249,255,0.5)'; ctx.lineWidth = 1;
      const rw = this.vw * sx, rh = this.vh * sy;
      ctx.strokeRect(this.camX * sx - rw / 2, this.camY * sy - rh / 2, rw, rh);
    }
  };

  // ---------- helpers ----------
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // simple per-weapon glyphs, centered in the crate
  function drawWeaponIcon(ctx, type, r) {
    const s = r * 0.62;
    ctx.lineWidth = 2.4; ctx.lineCap = 'round';
    ctx.beginPath();
    switch (type) {
      case 'pistol':
        ctx.moveTo(-s, -s * 0.3); ctx.lineTo(s * 0.6, -s * 0.3);
        ctx.lineTo(s * 0.6, s * 0.1); ctx.lineTo(-s * 0.2, s * 0.1);
        ctx.lineTo(-s * 0.4, s * 0.7); ctx.lineTo(-s * 0.7, s * 0.7);
        ctx.lineTo(-s * 0.5, s * 0.1); ctx.lineTo(-s, s * 0.1); ctx.closePath();
        ctx.stroke();
        break;
      case 'smg':
        ctx.rect(-s, -s * 0.35, s * 1.7, s * 0.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s * 0.2, s * 0.15); ctx.lineTo(-s * 0.2, s * 0.8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s * 0.6, s * 0.15); ctx.lineTo(-s * 0.6, s * 0.6); ctx.stroke();
        break;
      case 'shotgun':
        ctx.moveTo(-s, -s * 0.15); ctx.lineTo(s, -s * 0.15);
        ctx.moveTo(-s, s * 0.15); ctx.lineTo(s, s * 0.15); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s * 0.5, s * 0.15); ctx.lineTo(-s * 0.8, s * 0.75); ctx.stroke();
        break;
      case 'railgun':
        ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.stroke();
        ctx.beginPath();
        for (let i = -1; i <= 1; i++) { ctx.moveTo(i * s * 0.5, -s * 0.6); ctx.lineTo(i * s * 0.5, s * 0.6); }
        ctx.stroke();
        break;
      case 'flamethrower':
        ctx.moveTo(-s * 0.8, s * 0.6);
        ctx.quadraticCurveTo(-s * 1.1, -s * 0.2, -s * 0.2, -s * 0.7);
        ctx.quadraticCurveTo(0, 0, s * 0.4, -s * 0.3);
        ctx.quadraticCurveTo(s, s * 0.2, s * 0.4, s * 0.6);
        ctx.closePath(); ctx.fill();
        break;
      case 'needler':
        ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s * 0.25, -s * 0.32); ctx.lineTo(s, 0); ctx.lineTo(s * 0.25, s * 0.32); ctx.stroke();
        break;
      case 'burstcannon':
        ctx.rect(-s, -s * 0.32, s * 1.55, s * 0.64); ctx.stroke();
        ctx.beginPath(); ctx.arc(-s * 0.35, s * 0.36, s * 0.24, 0, TAU); ctx.stroke();
        break;
      case 'arcwelder':
        ctx.moveTo(-s, 0); ctx.lineTo(-s * 0.25, 0); ctx.lineTo(0, -s * 0.45); ctx.lineTo(s * 0.15, s * 0.15); ctx.lineTo(s, 0); ctx.stroke();
        break;
      case 'shredder':
        ctx.arc(0, 0, s * 0.55, 0, TAU); ctx.stroke();
        for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * s * 0.28, Math.sin(a) * s * 0.28); ctx.lineTo(Math.cos(a + 0.5) * s * 0.72, Math.sin(a + 0.5) * s * 0.72); ctx.stroke(); }
        break;
      default:
        ctx.arc(0, 0, s * 0.6, 0, TAU); ctx.stroke();
    }
  }

  // color parsing + mixing (cached, gradient tail colours)
  function hexToRgb(h) {
    if (h[0] === '#') h = h.slice(1);
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const _mixCache = {};
  function mix(a, b, t) {
    const key = a + b + (t * 16 | 0);
    if (_mixCache[key]) return _mixCache[key];
    const ca = hexToRgb(a), cb = hexToRgb(b);
    const out = 'rgb(' +
      Math.round(ca[0] + (cb[0] - ca[0]) * t) + ',' +
      Math.round(ca[1] + (cb[1] - ca[1]) * t) + ',' +
      Math.round(ca[2] + (cb[2] - ca[2]) * t) + ')';
    _mixCache[key] = out;
    return out;
  }

  return { Renderer };
});
