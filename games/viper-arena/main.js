/* VIPER ARENA - browser glue, profile persistence, local leaderboard, loadouts,
   sound modes, responsive controls, HUD, RAF loop, and test surface. */
(function () {
  'use strict';

  const VIPER = window.VIPER;
  const VRender = window.VRender;
  const VAudio = window.VAudio || {
    play: function () {}, unlock: function () {}, setMode: function () { return 'mute'; },
    getMode: function () { return 'mute'; }, cycleMode: function () { return 'mute'; }
  };
  const DT = VIPER.DT, W = VIPER.W, H = VIPER.H;
  const WEAPONS = VIPER.WEAPONS;
  const LOADOUTS = VIPER.LOADOUTS;
  const PROFILE_KEY = 'viper_arena_profile_v3';
  const SCORES_KEY = 'viper_arena_scores_v3';
  const COOKIE_NAME = 'viper_pilot';
  const MAX_STEPS = 6;

  const $ = function (id) { return document.getElementById(id); };
  const canvas = $('game');
  const minimap = $('minimap');
  const el = {
    hud: $('hud'), score: $('hud-score'), wave: $('hud-wave'), combo: $('hud-combo'),
    enemies: $('hud-enemies'), progress: $('hud-progress'), mission: $('hud-mission'),
    player: $('hud-player'), banner: $('wave-banner'), healthFill: $('health-fill'),
    healthNum: $('hud-health-num'), staminaFill: $('stamina-fill'), weapon: $('hud-weapon'), ammo: $('hud-ammo'),
    weaponBelt: $('weapon-belt'),
    abilityChip: $('hud-ability'), abilityFill: $('ability-fill'), abilityLabel: $('ability-label'),
    loadout: $('hud-loadout'), bossMeter: $('boss-meter'), bossName: $('boss-name'), bossPortrait: $('boss-portrait'),
    bossFill: $('boss-fill'), bossHpText: $('boss-hp-text'), soundToggle: $('sound-toggle'),
    assistToggle: $('assist-toggle'),
    title: $('title'), username: $('username'), usernameError: $('username-error'),
    btnStart: $('btn-start'), leaderboard: $('leaderboard'),
    selectedLoadoutName: $('selected-loadout-name'),
    gameover: $('gameover'), deathCause: $('death-cause'), finalPlayer: $('final-player'),
    finalScore: $('final-score'), finalWave: $('final-wave'), finalKills: $('final-kills'),
    rankResult: $('rank-result'), btnRestart: $('btn-restart'),
    coins: $('hud-coins'), fangs: $('hud-fangs'), levelLbl: $('hud-level'),
    reloadWrap: $('reload-wrap'), reloadFill: $('reload-fill'),
    spinWrap: $('spin-wrap'), spinFill: $('spin-fill'),
    storyTicker: $('story-ticker'), storyIntro: $('story-intro'),
    storyLines: $('story-lines'), storyEyebrow: $('story-eyebrow'), storyVisual: $('story-visual'), btnStoryGo: $('btn-story-go'),
    levelRow: $('level-row'), revivePanel: $('revive-panel'),
    btnRevive: $('btn-revive'), reviveCost: $('revive-cost'), reviveNote: $('revive-note'),
    chapterComplete: $('chapter-complete'), chapterCompleteVisual: $('chapter-complete-visual'),
    chapterCompleteKicker: $('chapter-complete-kicker'), chapterCompleteTitle: $('chapter-complete-title'),
    chapterCompleteMap: $('chapter-complete-map'), chapterRewardCoins: $('chapter-reward-coins'),
    chapterRewardFangs: $('chapter-reward-fangs'), chapterNextUnlock: $('chapter-next-unlock'),
    btnNextChapter: $('btn-next-chapter'), btnReplayChapter: $('btn-replay-chapter'), btnChapterMenu: $('btn-chapter-menu'),
    musMenu: $('mus-menu'), musCombat: $('mus-combat'), musBoss: $('mus-boss')
  };
  el.pause = $('pause');
  el.btnResume = $('btn-resume');

  const renderer = new VRender.Renderer(canvas, minimap);
  const keys = { up: false, down: false, left: false, right: false };
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, has: false };
  let profile = loadProfile();
  let leaderboard = loadScores();
  let game = null;
  let running = false;
  let started = false;
  let firing = false;
  let boosting = false;
  let touchMode = false;
  let acc = 0;
  let lastT = 0;
  let waveBannerT = 0;
  let bannerText = '';
  let runSaved = false;
  let runBanked = false;
  let storyT = 0;
  let beltSignature = '';
  let nextHudAt = 0;
  let bossPortraitKey = '';
  let completedChapter = 0;
  const WALLET_KEY = 'swg_wallet_v1';
  const REVIVE_COST = 3;
  const CHAPTER_COUNT = 36;
  const CHAPTER_ASSETS = ['neon-foundry', 'acid-marsh', 'rail-yard', 'frost-vault', 'solar-temple'];
  let wallet = loadWallet();

  function loadWallet() {
    let w = null;
    try { w = JSON.parse(safeRead(WALLET_KEY) || 'null'); } catch (_) { w = null; }
    return {
      coins: Math.max(0, Math.round((w && w.coins) || 0)),
      fangs: Math.max(0, Math.round((w && w.fangs) || 5)),   // 5 free fangs so revive is discoverable
      maxLevel: Math.min(CHAPTER_COUNT, Math.max(1, Math.round((w && w.maxLevel) || 1))),
      level: Math.min(CHAPTER_COUNT, Math.max(1, Math.round((w && w.level) || 1)))
    };
  }
  function saveWallet() { safeWrite(WALLET_KEY, JSON.stringify(wallet)); }

  // ---- music ----
  const music = {
    cur: null,
    play: function (which) {
      const map = { menu: el.musMenu, combat: el.musCombat, boss: el.musBoss };
      const next = map[which];
      if (!next || this.cur === next) return;
      [el.musMenu, el.musCombat, el.musBoss].forEach(function (a) {
        if (a && a !== next) { try { a.pause(); a.currentTime = 0; } catch (_) {} }
      });
      this.cur = next;
      const muted = (VAudio.getMode ? VAudio.getMode() : profile.sound) === 'mute';
      next.volume = muted ? 0 : 0.32;
      next.play().catch(function () {});
    },
    setMuted: function (m) { if (this.cur) this.cur.volume = m ? 0 : 0.32; }
  };

  function chapterMeta(level) {
    const maps = window.SWGMaps && window.SWGMaps.maps ? window.SWGMaps.maps : [];
    const mapIndex = maps.length ? (level - 1) % maps.length : 0;
    const map = maps[mapIndex] || null;
    return {
      level: level,
      mapName: map ? map.name : 'VIPER ARENA',
      chapterName: map ? map.chapter : 'THE ASCENT',
      description: map ? map.description : 'Break the next warden line and keep climbing.',
      visual: './assets/generated/maps/' + CHAPTER_ASSETS[mapIndex % CHAPTER_ASSETS.length] + '.webp',
      firstWave: (level - 1) * VIPER.WAVES_PER_LEVEL + 1,
      lastWave: level * VIPER.WAVES_PER_LEVEL
    };
  }

  function selectChapter(level, deploy) {
    if (level < 1 || level > wallet.maxLevel) return false;
    wallet.level = level;
    saveWallet();
    renderLevelRow();
    if (deploy) return start();
    return true;
  }

  function renderLevelRow() {
    if (!el.levelRow) return;
    el.levelRow.replaceChildren();
    for (let i = 1; i <= CHAPTER_COUNT; i++) {
      const meta = chapterMeta(i);
      const unlocked = i <= wallet.maxLevel;
      const card = document.createElement('article');
      card.className = 'chapter-card' + (i === wallet.level ? ' selected' : '') + (!unlocked ? ' locked' : '');

      const select = document.createElement('button');
      select.type = 'button';
      select.className = 'chapter-select';
      select.disabled = !unlocked;
      select.setAttribute('aria-pressed', String(i === wallet.level));
      select.setAttribute('aria-label', (unlocked ? 'Select' : 'Locked') + ' chapter ' + i + ', waves ' + meta.firstWave + ' to ' + meta.lastWave);
      const number = document.createElement('span'); number.textContent = String(i).padStart(2, '0');
      const copy = document.createElement('span');
      const title = document.createElement('b'); title.textContent = meta.chapterName;
      const waves = document.createElement('small'); waves.textContent = 'WAVES ' + meta.firstWave + '—' + meta.lastWave + ' · ' + meta.mapName;
      copy.append(title, waves); select.append(number, copy);

      const deploy = document.createElement('button');
      deploy.type = 'button';
      deploy.className = 'chapter-deploy';
      deploy.disabled = !unlocked;
      deploy.textContent = !unlocked ? 'LOCKED' : (i < wallet.maxLevel ? 'REPLAY' : 'DEPLOY');
      select.addEventListener('click', function () { selectChapter(i, false); });
      deploy.addEventListener('click', function () { selectChapter(i, true); });
      card.append(select, deploy);
      el.levelRow.appendChild(card);
    }
  }

  function showStory(lines, then, meta) {
    el.storyLines.replaceChildren();
    lines.forEach(function (t) { const p = document.createElement('p'); p.textContent = t; el.storyLines.appendChild(p); });
    if (el.storyEyebrow) el.storyEyebrow.textContent = meta && meta.eyebrow ? meta.eyebrow : 'CHAPTER ONE';
    if (el.storyVisual) {
      if (meta && meta.visual) {
        el.storyVisual.src = meta.visual;
        el.storyVisual.alt = meta.alt || 'Chapter arena briefing';
        el.storyVisual.classList.remove('hidden');
      } else {
        el.storyVisual.removeAttribute('src');
        el.storyVisual.classList.add('hidden');
      }
    }
    el.btnStoryGo.textContent = meta && meta.action ? meta.action : 'CLIMB';
    el.storyIntro.classList.remove('hidden');
    el.btnStoryGo.onclick = function () { el.storyIntro.classList.add('hidden'); then(); };
  }

  function safeRead(key) {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  }

  function safeWrite(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (_) { return false; }
  }

  function readCookie(name) {
    const prefix = name + '=';
    const entry = document.cookie.split(';').map(function (part) { return part.trim(); })
      .find(function (part) { return part.indexOf(prefix) === 0; });
    return entry ? decodeURIComponent(entry.slice(prefix.length)) : '';
  }

  function writePilotCookie(name) {
    document.cookie = COOKIE_NAME + '=' + encodeURIComponent(name) +
      '; Max-Age=31536000; Path=/; SameSite=Lax';
  }

  function normalizeName(value) {
    return String(value || '')
      .replace(/[^a-zA-Z0-9 _-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 16);
  }

  function loadProfile() {
    let saved = null;
    try { saved = JSON.parse(safeRead(PROFILE_KEY) || 'null'); } catch (_) { saved = null; }
    const cookieName = normalizeName(readCookie(COOKIE_NAME));
    return {
      name: normalizeName(saved && saved.name) || cookieName || '',
      loadout: LOADOUTS[saved && saved.loadout] ? saved.loadout : 'overdrive',
      sound: ['asmr', 'arcade', 'mute'].includes(saved && saved.sound) ? saved.sound : 'asmr',
      assist: ['manual', 'aim', 'fire'].includes(saved && saved.assist) ? saved.assist : 'manual'
    };
  }

  function saveProfile() {
    safeWrite(PROFILE_KEY, JSON.stringify(profile));
    writePilotCookie(profile.name);
  }

  function loadScores() {
    try {
      const parsed = JSON.parse(safeRead(SCORES_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (entry) {
        return entry && typeof entry.score === 'number' && normalizeName(entry.name);
      }).map(function (entry) {
        return {
          name: normalizeName(entry.name),
          score: Math.max(0, Math.round(entry.score)),
          wave: Math.max(0, Math.round(entry.wave || 0)),
          kills: Math.max(0, Math.round(entry.kills || 0)),
          loadout: LOADOUTS[entry.loadout] ? entry.loadout : 'overdrive',
          at: Number(entry.at) || 0
        };
      }).sort(scoreSort).slice(0, 10);
    } catch (_) {
      return [];
    }
  }

  function scoreSort(a, b) {
    return b.score - a.score || b.wave - a.wave || b.kills - a.kills || a.at - b.at;
  }

  function archiveRun(state) {
    const entry = {
      name: profile.name,
      score: state.score,
      wave: state.wave,
      kills: game.kills,
      loadout: profile.loadout,
      at: Date.now()
    };
    leaderboard.push(entry);
    leaderboard.sort(scoreSort);
    leaderboard = leaderboard.slice(0, 10);
    safeWrite(SCORES_KEY, JSON.stringify(leaderboard));
    return leaderboard.indexOf(entry) + 1;
  }

  function renderLeaderboard() {
    el.leaderboard.replaceChildren();
    if (!leaderboard.length) {
      const empty = document.createElement('li');
      empty.className = 'leaderboard-empty';
      empty.textContent = 'NO RUNS YET — CLAIM THE BOARD';
      el.leaderboard.appendChild(empty);
      return;
    }
    leaderboard.slice(0, 7).forEach(function (entry, index) {
      const row = document.createElement('li');
      const rank = document.createElement('span');
      const pilot = document.createElement('span');
      const score = document.createElement('strong');
      rank.textContent = String(index + 1).padStart(2, '0');
      pilot.textContent = entry.name;
      score.textContent = entry.score.toLocaleString();
      row.append(rank, pilot, score);
      el.leaderboard.appendChild(row);
    });
  }

  function syncMenu() {
    el.username.value = profile.name;
    if (el.selectedLoadoutName && LOADOUTS[profile.loadout]) el.selectedLoadoutName.textContent = LOADOUTS[profile.loadout].name;
    document.querySelectorAll('[data-loadout]').forEach(function (button) {
      const selected = button.dataset.loadout === profile.loadout;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-sound-mode]').forEach(function (button) {
      const selected = button.dataset.soundMode === profile.sound;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    VAudio.setMode(profile.sound);
    updateSoundLabel();
    updateAssistLabel();
    renderLeaderboard();
    renderLevelRow();
    music.setMuted(profile.sound === 'mute');
  }

  function updateSoundLabel() {
    const mode = (VAudio.getMode ? VAudio.getMode() : profile.sound).toUpperCase();
    el.soundToggle.textContent = 'SOUND · ' + mode;
    el.soundToggle.setAttribute('aria-label', 'Sound mode ' + mode + '. Activate to change.');
  }

  function updateAssistLabel() {
    if (!el.assistToggle) return;
    const labels = { manual: 'MANUAL', aim: 'AUTO AIM', fire: 'AUTO FIRE' };
    const next = profile.assist === 'manual' ? 'auto aim' : (profile.assist === 'aim' ? 'auto fire' : 'manual aim');
    el.assistToggle.textContent = 'ASSIST · ' + labels[profile.assist] + ' [F]';
    el.assistToggle.classList.toggle('active', profile.assist !== 'manual');
    el.assistToggle.setAttribute('aria-label', 'Combat assist ' + labels[profile.assist] + '. Activate to switch to ' + next + '.');
    el.assistToggle.setAttribute('aria-pressed', String(profile.assist !== 'manual'));
  }

  function cycleAssist() {
    const modes = ['manual', 'aim', 'fire'];
    profile.assist = modes[(modes.indexOf(profile.assist) + 1) % modes.length];
    saveProfile();
    updateAssistLabel();
    VAudio.play('pickup');
    return profile.assist;
  }

  function setKey(code, down) {
    const keymap = {
      KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down',
      KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right'
    };
    const dir = keymap[code];
    if (dir) { keys[dir] = down; return true; }
    if (code === 'Space') { firing = down; return true; }
    if (code === 'ShiftLeft' || code === 'ShiftRight') { boosting = down; return true; }
    if ((code === 'Escape' || code === 'KeyP') && down && started && game && !game.gameOver) {
      togglePause(); return true;
    }
    if (code === 'KeyE') { if (down && game && started) game.useAbility(); return true; }
    if (code === 'KeyF' && down && started) { cycleAssist(); return true; }
    if ((code === 'KeyQ' || code === 'KeyC') && down && game && started && !game.gameOver) {
      game.cycleWeapon(code === 'KeyQ' ? -1 : 1); return true;
    }
    if (/^(Digit|Numpad)[123]$/.test(code) && down && game && started && !game.gameOver) {
      game.switchWeaponSlot(Number(code.slice(-1)) - 1); return true;
    }
    if (code === 'KeyR' && down && started) {
      if (game && game.gameOver) restartDirect();
      else if (game) game.startReload(game.player);
      return true;
    }
    return false;
  }

  window.addEventListener('keydown', function (event) {
    if (setKey(event.code, true)) event.preventDefault();
  });
  window.addEventListener('keyup', function (event) {
    if (setKey(event.code, false)) event.preventDefault();
  });
  window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.has = true;
    touchMode = false;
  });
  window.addEventListener('mousedown', function (event) {
    if (event.button === 0 && !event.target.closest('button, input')) firing = true;
  });
  window.addEventListener('mouseup', function (event) {
    if (event.button === 0) firing = false;
  });
  window.addEventListener('blur', function () {
    resetInput();
    if (started && running && game && !game.gameOver) pauseGame();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && started && running && game && !game.gameOver) pauseGame();
  });
  window.addEventListener('resize', function () { renderer.resize(); });
  canvas.addEventListener('wheel', function (event) {
    if (!started || !running || !game || game.gameOver) return;
    event.preventDefault();
    game.cycleWeapon(event.deltaY < 0 ? -1 : 1);
  }, { passive: false });

  function resetInput() {
    keys.up = keys.down = keys.left = keys.right = false;
    firing = false;
    boosting = false;
  }

  function pauseGame() {
    if (!started || !running || !game || game.gameOver) return false;
    running = false;
    resetInput();
    el.pause.classList.remove('hidden');
    el.btnResume.focus();
    return true;
  }

  function resumeGame() {
    if (!started || running || !game || game.gameOver) return false;
    el.pause.classList.add('hidden');
    running = true;
    acc = 0;
    lastT = performance.now();
    canvas.focus();
    return true;
  }

  function togglePause() { return running ? pauseGame() : resumeGame(); }

  document.querySelectorAll('[data-loadout]').forEach(function (button) {
    button.addEventListener('click', function () {
      profile.loadout = button.dataset.loadout;
      syncMenu();
    });
  });

  document.querySelectorAll('[data-sound-mode]').forEach(function (button) {
    button.addEventListener('click', function () {
      profile.sound = button.dataset.soundMode;
      VAudio.setMode(profile.sound);
      syncMenu();
    });
  });

  el.soundToggle.addEventListener('click', function () {
    profile.sound = VAudio.cycleMode();
    saveProfile();
    syncMenu();
  });
  if (el.assistToggle) el.assistToggle.addEventListener('click', cycleAssist);

  el.btnStart.addEventListener('click', start);
  el.btnResume.addEventListener('click', resumeGame);
  if (el.btnNextChapter) el.btnNextChapter.addEventListener('click', function () {
    deployChapter(Math.min(CHAPTER_COUNT, completedChapter + 1));
  });
  if (el.btnReplayChapter) el.btnReplayChapter.addEventListener('click', function () {
    deployChapter(Math.max(1, completedChapter));
  });
  if (el.btnChapterMenu) el.btnChapterMenu.addEventListener('click', function () {
    running = false;
    started = false;
    resetInput();
    el.chapterComplete.classList.add('hidden');
    el.hud.classList.add('hidden');
    el.title.classList.remove('hidden');
    renderLevelRow();
    music.play('menu');
  });
  el.username.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') start();
  });
  el.btnRevive.addEventListener('click', function () {
    if (!game || wallet.fangs < REVIVE_COST) return;
    wallet.fangs -= REVIVE_COST;
    saveWallet();
    if (game.revive()) {
      el.gameover.classList.add('hidden');
      el.revivePanel.classList.add('hidden');
      running = true;
      runSaved = false;
      runBanked = false;
      lastT = performance.now();
      music.play('combat');
    }
  });

  el.btnRestart.addEventListener('click', function () {
    running = false;
    started = false;
    resetInput();
    el.gameover.classList.add('hidden');
    el.hud.classList.add('hidden');
    el.title.classList.remove('hidden');
    renderLeaderboard();
    el.btnStart.focus();
  });

  document.querySelectorAll('[data-touch-key]').forEach(function (button) {
    const dir = button.dataset.touchKey;
    const down = function (event) {
      event.preventDefault();
      touchMode = true;
      keys[dir] = true;
      button.classList.add('pressed');
      if (button.setPointerCapture && event.pointerId !== undefined) button.setPointerCapture(event.pointerId);
    };
    const up = function (event) {
      event.preventDefault();
      keys[dir] = false;
      button.classList.remove('pressed');
    };
    button.addEventListener('pointerdown', down);
    button.addEventListener('pointerup', up);
    button.addEventListener('pointercancel', up);
    button.addEventListener('lostpointercapture', up);
  });

  const touchFire = document.querySelector('[data-touch-fire]');
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (type) {
    touchFire.addEventListener(type, function (event) {
      event.preventDefault();
      firing = false;
      touchFire.classList.remove('pressed');
    });
  });
  touchFire.addEventListener('pointerdown', function (event) {
    event.preventDefault();
    touchMode = true;
    firing = true;
    touchFire.classList.add('pressed');
    if (touchFire.setPointerCapture && event.pointerId !== undefined) touchFire.setPointerCapture(event.pointerId);
  });

  const touchAbility = document.querySelector('[data-touch-ability]');
  touchAbility.addEventListener('pointerdown', function (event) {
    event.preventDefault();
    touchMode = true;
    if (game && started) game.useAbility();
  });

  const touchBoost = document.querySelector('[data-touch-boost]');
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (type) {
    touchBoost.addEventListener(type, function (event) {
      event.preventDefault();
      boosting = false;
      touchBoost.classList.remove('pressed');
    });
  });
  touchBoost.addEventListener('pointerdown', function (event) {
    event.preventDefault();
    touchMode = true;
    boosting = true;
    touchBoost.classList.add('pressed');
    if (touchBoost.setPointerCapture && event.pointerId !== undefined) touchBoost.setPointerCapture(event.pointerId);
  });

  const touchSwap = document.querySelector('[data-touch-swap]');
  if (touchSwap) touchSwap.addEventListener('pointerdown', function (event) {
    event.preventDefault(); touchMode = true;
    if (game && started && !game.gameOver) game.cycleWeapon(1);
  });

  if (el.weaponBelt) el.weaponBelt.addEventListener('click', function (event) {
    const button = event.target.closest('[data-weapon]');
    if (button && game) game.switchWeapon(button.dataset.weapon);
  });

  function findAssistTarget() {
    if (!game) return null;
      const head = game.player.pts[0];
      let target = null;
      let best = Infinity;
      game.enemies.forEach(function (enemy) {
        if (!enemy.alive) return;
        const enemyHead = enemy.pts[0];
        const d = Math.hypot(enemyHead.x - head.x, enemyHead.y - head.y);
        if (d < best) { best = d; target = enemyHead; }
      });
    return target;
  }

  function currentAimWorld() {
    if ((profile.assist !== 'manual' || touchMode) && game) {
      const target = findAssistTarget();
      if (target) return { x: target.x, y: target.y };
    }
    // Screen pixels must be divided by zoom. The previous mapping used a 1:1
    // offset, which compressed the available aim arc after the camera zoom-out.
    return {
      x: renderer.camX + (mouse.x - renderer.vw / 2) / renderer.zoom,
      y: renderer.camY + (mouse.y - renderer.vh / 2) / renderer.zoom
    };
  }

  function newGame() {
    const runSeed = (Date.now() & 0xffffff) || 1337;
    game = new VIPER.Game(runSeed, { loadout: profile.loadout, level: wallet.level });
    if (window.SWGMaps) {
      // Chapters deliberately advance through the five map families. Layouts are
      // generated once per run, never in the animation loop.
      const mapIndex = (wallet.level - 1) % window.SWGMaps.maps.length;
      game.map = window.SWGMaps.maps[mapIndex];
      game.mapLayout = window.SWGMaps.generateLayout(game.map.id, runSeed, {
        safeZones: [{ x: VIPER.W / 2, y: VIPER.H / 2, radius: 280 }]
      });
    }
    renderer.camX = game.player.pts[0].x;
    renderer.camY = game.player.pts[0].y;
    renderer.particles.length = 0;
    renderer.shake = 0;
    renderer.vignette = 0;
    waveBannerT = 0;
    bannerText = '';
    acc = 0;
    runSaved = false;
    runBanked = false;
  }

  function start() {
    const name = normalizeName(el.username.value);
    if (name.length < 2) {
      el.usernameError.textContent = 'ENTER A CALLSIGN WITH AT LEAST 2 CHARACTERS.';
      el.username.focus();
      return false;
    }
    profile.name = name;
    profile.sound = VAudio.getMode ? VAudio.getMode() : profile.sound;
    saveProfile();
    el.usernameError.textContent = '';
    VAudio.setMode(profile.sound);
    VAudio.unlock();
    const launch = function () {
      newGame();
      started = true;
      running = true;
      el.title.classList.add('hidden');
      el.gameover.classList.add('hidden');
      el.hud.classList.remove('hidden');
      el.pause.classList.add('hidden');
      music.play('combat');
      lastT = performance.now();
    };
    const chapterSeenKey = 'swg_seen_chapter_' + wallet.level;
    if (!safeRead(chapterSeenKey)) {
      safeWrite(chapterSeenKey, '1');
      el.title.classList.add('hidden');
      const meta = chapterMeta(wallet.level);
      const lines = wallet.level === 1 ? VIPER.STORY.intro.slice() : [
        'WARDEN LINE ' + String(wallet.level).padStart(2, '0') + ' // ' + meta.chapterName,
        meta.description,
        'Five waves stand between you and the next ascent. Secure every weapon crate and break the final formation.'
      ];
      showStory(lines, launch, {
        eyebrow: 'CHAPTER ' + String(wallet.level).padStart(2, '0') + ' · ' + meta.mapName,
        visual: meta.visual,
        alt: meta.mapName + ' chapter arena',
        action: 'ENTER CHAPTER ' + String(wallet.level).padStart(2, '0')
      });
    } else {
      launch();
    }
    return true;
  }

  function restartDirect() {
    if (!started) return start();
    VAudio.unlock();
    newGame();
    running = true;
    el.gameover.classList.add('hidden');
    el.hud.classList.remove('hidden');
    lastT = performance.now();
    return true;
  }

  function bankAndArchiveChapter(state) {
    if (!runSaved) {
      archiveRun(state);
      runSaved = true;
      renderLeaderboard();
    }
    if (!runBanked) {
      wallet.coins += state.coins;
      wallet.fangs += state.fangs;
      runBanked = true;
    }
  }

  function showChapterComplete(event) {
    if (!el.chapterComplete || !game) return;
    running = false;
    resetInput();
    const state = game.getState();
    const chapter = Math.max(1, Math.round(event.chapter || state.level));
    completedChapter = chapter;
    const nextChapter = Math.min(CHAPTER_COUNT, chapter + 1);
    const rewardCoins = Math.max(0, Math.round(event.rewardCoins || 0));
    const rewardFangs = Math.max(0, Math.round(event.rewardFangs || 0));
    const meta = chapterMeta(chapter);
    bankAndArchiveChapter(state);
    wallet.coins += rewardCoins;
    wallet.fangs += rewardFangs;
    wallet.maxLevel = Math.max(wallet.maxLevel, nextChapter);
    saveWallet();
    renderLevelRow();

    el.chapterCompleteKicker.textContent = 'CHAPTER ' + String(chapter).padStart(2, '0') + ' CLEARED';
    el.chapterCompleteTitle.textContent = chapter >= CHAPTER_COUNT ? 'THE ASCENT IS COMPLETE' : 'WARDEN LINE BROKEN';
    el.chapterCompleteMap.textContent = meta.chapterName + ' · ' + meta.mapName;
    el.chapterRewardCoins.textContent = rewardCoins.toLocaleString();
    el.chapterRewardFangs.textContent = rewardFangs.toLocaleString();
    el.chapterNextUnlock.textContent = chapter >= CHAPTER_COUNT ? 'CROWNED' : String(nextChapter).padStart(2, '0');
    el.chapterCompleteVisual.src = meta.visual;
    el.chapterCompleteVisual.alt = meta.mapName + ' secured';
    el.btnNextChapter.classList.toggle('hidden', chapter >= CHAPTER_COUNT);
    el.chapterComplete.classList.remove('hidden');
    music.play('menu');
    (chapter >= CHAPTER_COUNT ? el.btnReplayChapter : el.btnNextChapter).focus();
  }

  function deployChapter(level) {
    wallet.level = Math.max(1, Math.min(wallet.maxLevel, level));
    saveWallet();
    el.chapterComplete.classList.add('hidden');
    const launch = function () {
      newGame();
      started = true;
      running = true;
      el.title.classList.add('hidden');
      el.gameover.classList.add('hidden');
      el.hud.classList.remove('hidden');
      music.play('combat');
      lastT = performance.now();
    };
    const seenKey = 'swg_seen_chapter_' + wallet.level;
    if (!safeRead(seenKey)) {
      safeWrite(seenKey, '1');
      el.hud.classList.add('hidden');
      const meta = chapterMeta(wallet.level);
      showStory([
        'WARDEN LINE ' + String(wallet.level).padStart(2, '0') + ' // ' + meta.chapterName,
        meta.description,
        'Five waves. One secured ascent. The next warden is already moving.'
      ], launch, {
        eyebrow: 'CHAPTER ' + String(wallet.level).padStart(2, '0') + ' · ' + meta.mapName,
        visual: meta.visual,
        alt: meta.mapName + ' chapter arena',
        action: 'ENTER CHAPTER ' + String(wallet.level).padStart(2, '0')
      });
    } else {
      launch();
    }
  }

  function gameOverScreen() {
    running = false;
    const state = game.getState();
    let rank = 0;
    if (!runSaved) {
      rank = archiveRun(state);
      runSaved = true;
      renderLeaderboard();
    }
    const best = leaderboard.filter(function (entry) { return entry.name === profile.name; })[0];
    const personalBest = best ? best.score : state.score;
    el.finalPlayer.textContent = 'PILOT // ' + profile.name;
    el.deathCause.textContent = 'KILLED BY ' + (game.deathCause || 'THE ARENA');
    el.finalScore.textContent = state.score.toLocaleString();
    el.finalWave.textContent = state.wave;
    el.finalKills.textContent = game.kills;
    el.rankResult.textContent = rank > 0 && rank <= 10
      ? ('LOCAL RANK #' + rank + ' · PERSONAL BEST ' + personalBest.toLocaleString())
      : ('RUN ARCHIVED · PERSONAL BEST ' + personalBest.toLocaleString());
    if (!runBanked) {
      wallet.coins += state.coins;
      wallet.fangs += state.fangs;
      runBanked = true;
      saveWallet();
    }
    el.reviveCost.textContent = REVIVE_COST;
    if (game.revives < 3) {
      el.revivePanel.classList.remove('hidden');
      const afford = wallet.fangs >= REVIVE_COST;
      el.btnRevive.disabled = !afford;
      el.reviveNote.textContent = afford
        ? ('You have ' + wallet.fangs + ' fangs. Bosses drop them.')
        : ('Not enough fangs. You have ' + wallet.fangs + '. Kill bosses to earn more.');
    } else {
      el.revivePanel.classList.add('hidden');
    }
    el.gameover.classList.remove('hidden');
  }

  function processEvents() {
    const events = game.events;
    for (let index = 0; index < events.length; index++) {
      const event = events[index];
      if (event.type === 'sfx') VAudio.play(event.name);
      else if (event.type === 'wave' || event.type === 'bossWave') {
        bannerText = event.title || ('WAVE ' + event.wave);
        waveBannerT = event.type === 'bossWave' ? 2.25 : 1.1;
        VAudio.play(event.type === 'bossWave' ? 'bossWave' : 'wave');
        music.play(event.type === 'bossWave' ? 'boss' : 'combat');
        const lv = Math.floor((event.wave - 1) / VIPER.WAVES_PER_LEVEL) + 1;
        if (lv > wallet.maxLevel) { wallet.maxLevel = lv; saveWallet(); }
      }
      else if (event.type === 'story') {
        el.storyTicker.textContent = event.line;
        el.storyTicker.classList.remove('hidden');
        storyT = 6;
      }
      else if (event.type === 'chapterComplete') {
        showChapterComplete(event);
      }
      else if (event.type === 'ability') {
        el.storyTicker.textContent = event.name + ' ONLINE' + (event.desc ? ' · ' + event.desc : '');
        el.storyTicker.classList.remove('hidden');
        storyT = event.loadout === 'juggernaut' ? 3 : 1.8;
        VAudio.play(event.sound || 'pickup');
      }
      else if (event.type === 'siegeImpact') VAudio.play('siegeImpact');
      else if (event.type === 'contactBounce') VAudio.play('bounce');
      else if (event.type === 'lastStand') {
        el.storyTicker.textContent = 'LAST STAND. ' + (event.left > 0 ? 'One more in you.' : 'That was the last one.');
        el.storyTicker.classList.remove('hidden');
        storyT = 3;
      }
      else if (event.type === 'weaponSwitch' || event.type === 'ammoStack') {
        const weapon = WEAPONS[event.weapon];
        el.storyTicker.textContent = event.type === 'ammoStack'
          ? ((weapon ? weapon.name : event.weapon) + ' AMMO STACKED')
          : ('EQUIPPED ' + (weapon ? weapon.name : event.weapon));
        el.storyTicker.classList.remove('hidden');
        storyT = 1.35;
      }
    }
    renderer.consume(events);
    events.length = 0;
  }

  function updateHud() {
    const state = game.getState();
    el.score.textContent = state.score.toLocaleString();
    el.wave.textContent = state.wave || 1;
    el.player.textContent = profile.name.toUpperCase();
    el.progress.textContent = state.waveKills + ' / ' + state.waveGoal;
    el.enemies.textContent = state.enemyCount + (state.enemyCount === 1 ? ' HOSTILE LIVE' : ' HOSTILES LIVE');
    el.mission.textContent = state.missionName;
    el.combo.textContent = game.combo > 1.05 ? ('COMBO x' + game.combo.toFixed(1)) : '';

    const health = Math.max(0, Math.min(100, (state.health / (game.player.maxHp || 100)) * 100));
    el.healthFill.style.width = health + '%';
    el.healthFill.classList.toggle('low', health <= 30);
    el.healthNum.textContent = state.health + ' / ' + Math.round(game.player.maxHp);
    const staminaPct = Math.max(0, Math.min(100, (state.stamina / (state.maxStamina || 100)) * 100));
    el.staminaFill.style.width = staminaPct + '%';
    el.staminaFill.classList.toggle('empty', staminaPct <= 0);
    el.ammo.textContent = state.mag + ' / ' + (state.ammo === Infinity ? '\u221E' : state.ammo);
    if (state.reloading) {
      el.reloadWrap.classList.remove('hidden');
      el.reloadFill.style.width = (state.reloadFrac * 100) + '%';
    } else el.reloadWrap.classList.add('hidden');
    if (state.spinFrac < 1) {
      el.spinWrap.classList.remove('hidden');
      el.spinFill.style.width = (state.spinFrac * 100) + '%';
    } else el.spinWrap.classList.add('hidden');
    el.coins.textContent = (wallet.coins + state.coins).toLocaleString();
    el.fangs.textContent = (wallet.fangs + state.fangs).toLocaleString();
    el.levelLbl.textContent = 'LEVEL ' + state.level + ' \u00B7 ' + state.waveInLevel + '/' + state.wavesPerLevel +
      (game.map ? ' \u00B7 ' + game.map.name : '');
    el.loadout.textContent = LOADOUTS[state.loadout].name;
    el.loadout.style.setProperty('--loadout-color', LOADOUTS[state.loadout].color);
    el.abilityLabel.textContent = state.abilityActive ? (state.abilityName + ' ON') : (state.abilityName + (state.abilityReady ? ' [E]' : ''));
    el.abilityChip.title = state.abilityDesc || state.abilityName;
    el.abilityFill.style.width = (state.abilityCdFrac * 100) + '%';
    el.abilityChip.classList.toggle('ready', state.abilityReady);
    el.abilityChip.classList.toggle('active', state.abilityActive || state.invincible);
    el.hud.classList.toggle('siege-active', state.loadout === 'juggernaut' && state.abilityActive);

    const signature = (state.weaponBelt || []).map(function (slot) {
      return slot.key + ':' + slot.mag + ':' + slot.ammo + ':' + slot.active;
    }).join('|');
    if (el.weaponBelt && signature !== beltSignature) {
      beltSignature = signature;
      el.weaponBelt.replaceChildren();
      (state.weaponBelt || []).forEach(function (slot, index) {
        const button = document.createElement('button');
        button.type = 'button'; button.dataset.weapon = slot.key;
        button.className = 'weapon-slot' + (slot.active ? ' active' : '');
        const shortcut = document.createElement('kbd');
        shortcut.textContent = index < 3 ? String(index + 1) : '·';
        const name = document.createElement('b'); name.textContent = slot.name;
        const ammo = document.createElement('span'); ammo.textContent = slot.mag + ' · ' + (slot.ammo === Infinity ? '∞' : slot.ammo);
        button.append(shortcut, name, ammo);
        el.weaponBelt.appendChild(button);
      });
    }

    const weapon = WEAPONS[state.weapon];
    el.weapon.textContent = weapon ? weapon.name : state.weapon.toUpperCase();
    if (state.ammo === Infinity || state.ammo === null) {
      el.ammo.textContent = state.mag + ' / ∞';
      el.ammo.classList.remove('empty');
    } else {
      el.ammo.textContent = state.mag + ' / ' + state.ammo;
      el.ammo.classList.toggle('empty', state.mag <= 0 && state.ammo <= 0);
    }

    if (state.bossName) {
      const ratio = state.bossMaxHp ? Math.max(0, state.bossHp / state.bossMaxHp) : 0;
      el.bossMeter.classList.remove('hidden');
      el.bossName.textContent = state.bossName + (state.bossProtocol ? ' · ' + state.bossProtocol : '');
      const portraitNumber = String((((Math.ceil(state.wave / 3) - 1) % 20) + 1)).padStart(2, '0');
      if (el.bossPortrait && portraitNumber !== bossPortraitKey) {
        bossPortraitKey = portraitNumber;
        el.bossPortrait.src = './assets/generated/bosses/boss-' + portraitNumber + '.webp';
        el.bossPortrait.alt = state.bossName + ' portrait';
      }
      el.bossHpText.textContent = Math.round(ratio * 100) + '%';
      el.bossFill.style.width = (ratio * 100) + '%';
    } else {
      el.bossMeter.classList.add('hidden');
      bossPortraitKey = '';
    }

    if (waveBannerT > 0) {
      el.banner.textContent = bannerText;
      el.banner.classList.remove('hidden');
    } else {
      el.banner.classList.add('hidden');
    }
  }

  function tick() {
    game.applyKeys(keys);
    const aim = currentAimWorld();
    game.setAim(aim.x, aim.y);
    const assistedFire = profile.assist === 'fire' && !!findAssistTarget();
    game.setFire(firing || assistedFire);
    game.setBoost(boosting);
    game.step();
    processEvents();
    if (waveBannerT > 0) waveBannerT -= DT;
    if (storyT > 0) { storyT -= DT; if (storyT <= 0) el.storyTicker.classList.add('hidden'); }
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (!started || !game) return;
    let delta = (now - lastT) / 1000;
    lastT = now;
    if (delta > 0.25) delta = 0.25;

    if (running && !game.gameOver) {
      acc += delta;
      let steps = 0;
      while (acc >= DT && steps < MAX_STEPS) {
        tick();
        acc -= DT;
        steps++;
      }
      if (steps === MAX_STEPS) acc = 0;
    } else if (running && game.gameOver) {
      game.step();
      processEvents();
      gameOverScreen();
    }

    const head = game.player.pts[0];
    renderer.update(delta, head.x, head.y);
    renderer.draw(game);
    if (now >= nextHudAt) { updateHud(); nextHudAt = now + 66; }
  }

  syncMenu();
  requestAnimationFrame(frame);

  window.__viper = {
    start: start,
    restart: restartDirect,
    state: function () {
      if (!game) return {
        alive: false, score: 0, wave: 0, health: 0, ammo: 0,
        weapon: 'pistol', headX: 0, headY: 0, enemyCount: 0
      };
      return game.getState();
    },
    profile: function () { return Object.assign({}, profile); },
    setProfile: function (name, loadout, sound) {
      profile.name = normalizeName(name);
      if (LOADOUTS[loadout]) profile.loadout = loadout;
      if (['asmr', 'arcade', 'mute'].includes(sound)) profile.sound = sound;
      syncMenu();
      saveProfile();
      return Object.assign({}, profile);
    },
    scores: function () { return leaderboard.slice(); },
    key: function (code, down) { setKey(code, !!down); return Object.assign({}, keys); },
    aim: function (x, y) {
      mouse.x = x; mouse.y = y; mouse.has = true; touchMode = false;
      return { x: x, y: y };
    },
    aimWorld: function (worldX, worldY) {
      mouse.x = (worldX - renderer.camX) * renderer.zoom + renderer.vw / 2;
      mouse.y = (worldY - renderer.camY) * renderer.zoom + renderer.vh / 2;
      touchMode = false;
      return { x: mouse.x, y: mouse.y };
    },
    fire: function () {
      if (!game) return false;
      firing = true; tick(); firing = false; return true;
    },
    setFire: function (down) { firing = !!down; return firing; },
    pause: pauseGame,
    resume: resumeGame,
    spawnCrate: function (type) { return game ? game.spawnCrate(type) : null; },
    spawnEnemy: function () { return game ? game.spawnEnemy() : null; },
    forceWave: function (wave) {
      if (!game || wave < 1) return false;
      game.enemies.forEach(function (enemy) { enemy.alive = false; });
      game.wave = Math.round(wave) - 1;
      game.betweenWaves = true;
      game.waveCountdown = 0;
      tick();
      return game.getState();
    },
    tick: function (count) {
      const steps = Math.max(1, Math.round(count || 1));
      for (let index = 0; index < steps; index++) {
        if (!game || game.gameOver) break;
        tick();
      }
      return game ? game.getState() : null;
    },
    wallet: function () { return Object.assign({}, wallet); },
    setWallet: function (w) { Object.assign(wallet, w); saveWallet(); renderLevelRow(); return Object.assign({}, wallet); },
    reload: function () { return game ? game.startReload(game.player) : false; },
    cycleWeapon: function (direction) { return game ? game.cycleWeapon(direction || 1) : false; },
    switchWeaponSlot: function (index) { return game ? game.switchWeaponSlot(index) : false; },
    switchWeapon: function (type) { return game ? game.switchWeapon(type) : false; },
    cycleAssist: cycleAssist,
    revive: function () { return el.btnRevive.click(); },
    music: function () { return music.cur ? music.cur.id : null; },
    game: function () { return game; },
    renderer: function () { return renderer; }
  };
})();
