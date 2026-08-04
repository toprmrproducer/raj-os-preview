"use strict";
var SerpentEngine = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // engine/src/index.ts
  var index_exports = {};
  __export(index_exports, {
    ActionInput: () => ActionInput,
    AudioMixer: () => AudioMixer,
    CommandBuffer: () => CommandBuffer,
    ContentRegistry: () => ContentRegistry,
    Engine: () => Engine,
    EventBus: () => EventBus,
    FixedStepClock: () => FixedStepClock,
    ReplayPlayer: () => ReplayPlayer,
    ReplayRecorder: () => ReplayRecorder,
    SpatialHash: () => SpatialHash,
    TacticalDirector: () => TacticalDirector,
    VERSION: () => VERSION,
    VersionedSaveStore: () => VersionedSaveStore,
    World: () => World,
    checksumNumbers: () => checksumNumbers,
    component: () => component,
    createWebPlatform: () => createWebPlatform,
    separateCircles: () => separateCircles
  });

  // engine/src/core/EventBus.ts
  var EventBus = class {
    constructor() {
      this.listeners = /* @__PURE__ */ new Map();
    }
    on(type, listener) {
      let bucket = this.listeners.get(type);
      if (!bucket) {
        bucket = /* @__PURE__ */ new Set();
        this.listeners.set(type, bucket);
      }
      bucket.add(listener);
      return () => bucket?.delete(listener);
    }
    emit(type, event) {
      const bucket = this.listeners.get(type);
      if (!bucket) return;
      for (const listener of [...bucket]) listener(event);
    }
    clear(type) {
      if (type === void 0) this.listeners.clear();
      else this.listeners.delete(type);
    }
  };

  // engine/src/core/FixedStepClock.ts
  var FixedStepClock = class {
    constructor(fixedDelta = 1 / 60, maxCatchUpSteps = 6) {
      this.accumulator = 0;
      this.lastTimeMs = null;
      if (!(fixedDelta > 0) || !Number.isFinite(fixedDelta)) throw new Error("fixedDelta must be positive");
      if (!Number.isInteger(maxCatchUpSteps) || maxCatchUpSteps < 1) throw new Error("maxCatchUpSteps must be a positive integer");
      this.fixedDelta = fixedDelta;
      this.maxCatchUpSteps = maxCatchUpSteps;
    }
    reset(nowMs) {
      this.accumulator = 0;
      this.lastTimeMs = nowMs ?? null;
    }
    advance(nowMs, update, enabled = true) {
      if (this.lastTimeMs === null) {
        this.lastTimeMs = nowMs;
        return { steps: 0, alpha: 0, droppedSeconds: 0 };
      }
      const raw = Math.max(0, (nowMs - this.lastTimeMs) / 1e3);
      this.lastTimeMs = nowMs;
      if (!enabled) {
        this.accumulator = 0;
        return { steps: 0, alpha: 0, droppedSeconds: 0 };
      }
      this.accumulator += Math.min(raw, 0.25);
      let steps = 0;
      while (this.accumulator >= this.fixedDelta && steps < this.maxCatchUpSteps) {
        update(this.fixedDelta);
        this.accumulator -= this.fixedDelta;
        steps++;
      }
      let droppedSeconds = 0;
      if (steps === this.maxCatchUpSteps && this.accumulator >= this.fixedDelta) {
        droppedSeconds = this.accumulator;
        this.accumulator = 0;
      }
      return { steps, alpha: this.accumulator / this.fixedDelta, droppedSeconds };
    }
  };

  // engine/src/core/Engine.ts
  var Engine = class {
    constructor(options = {}) {
      this.events = new EventBus();
      this.frameId = null;
      this.lifecycle = null;
      this.running = false;
      this.previousFrameMs = null;
      this.frame = (nowMs) => {
        if (!this.running) return;
        this.frameOnce(nowMs);
        this.frameId = this.requestFrame(this.frame);
      };
      this.clock = new FixedStepClock(options.fixedDelta, options.maxCatchUpSteps);
      this.requestFrame = options.requestFrame ?? ((callback) => requestAnimationFrame(callback));
      this.cancelFrame = options.cancelFrame ?? ((id) => cancelAnimationFrame(id));
    }
    start(lifecycle) {
      if (this.running) return;
      this.lifecycle = lifecycle;
      this.running = true;
      this.previousFrameMs = null;
      this.clock.reset();
      this.events.emit("started", { at: Date.now() });
      this.frameId = this.requestFrame(this.frame);
    }
    stop() {
      if (!this.running) return;
      this.running = false;
      if (this.frameId !== null) this.cancelFrame(this.frameId);
      this.frameId = null;
      this.events.emit("stopped", { at: Date.now() });
    }
    isRunning() {
      return this.running;
    }
    frameOnce(nowMs) {
      const lifecycle = this.lifecycle;
      if (!lifecycle) return;
      const frameDelta = this.previousFrameMs === null ? 0 : Math.min(0.25, Math.max(0, (nowMs - this.previousFrameMs) / 1e3));
      this.previousFrameMs = nowMs;
      const result = this.clock.advance(nowMs, (delta) => lifecycle.fixedUpdate(delta), lifecycle.shouldUpdate());
      if (result.droppedSeconds > 0) this.events.emit("frameDrop", { seconds: result.droppedSeconds });
      lifecycle.render(result.alpha, frameDelta);
    }
  };

  // engine/src/ecs/World.ts
  function component(name) {
    return Symbol(name);
  }
  var World = class {
    constructor() {
      this.nextEntity = 1;
      this.alive = /* @__PURE__ */ new Set();
      this.stores = /* @__PURE__ */ new Map();
      this.systems = [];
    }
    create() {
      const entity = this.nextEntity++;
      this.alive.add(entity);
      return entity;
    }
    destroy(entity) {
      if (!this.alive.delete(entity)) return false;
      for (const store of this.stores.values()) store.delete(entity);
      return true;
    }
    hasEntity(entity) {
      return this.alive.has(entity);
    }
    set(entity, key, value) {
      if (!this.alive.has(entity)) throw new Error(`Unknown entity ${entity}`);
      let store = this.stores.get(key);
      if (!store) {
        store = /* @__PURE__ */ new Map();
        this.stores.set(key, store);
      }
      store.set(entity, value);
      return value;
    }
    get(entity, key) {
      return this.stores.get(key)?.get(entity);
    }
    remove(entity, key) {
      return this.stores.get(key)?.delete(entity) ?? false;
    }
    query(...keys) {
      if (!keys.length) return [];
      const first = this.stores.get(keys[0]);
      if (!first) return [];
      const result = [];
      for (const [entity, value] of first) {
        const row = [entity, value];
        let matches = true;
        for (let i = 1; i < keys.length; i++) {
          const next = this.stores.get(keys[i])?.get(entity);
          if (next === void 0) {
            matches = false;
            break;
          }
          row.push(next);
        }
        if (matches) result.push(row);
      }
      return result;
    }
    addSystem(system) {
      if (this.systems.some((entry) => entry.name === system.name)) throw new Error(`Duplicate system ${system.name}`);
      this.systems.push(system);
      this.systems.sort((left, right) => left.order - right.order || left.name.localeCompare(right.name));
    }
    update(delta) {
      for (const system of this.systems) system.update(this, delta);
    }
    clear() {
      this.alive.clear();
      this.stores.clear();
      this.nextEntity = 1;
    }
  };

  // engine/src/spatial/SpatialHash.ts
  var SpatialHash = class {
    constructor(cellSize = 256) {
      this.cells = /* @__PURE__ */ new Map();
      if (!(cellSize > 0)) throw new Error("cellSize must be positive");
      this.cellSize = cellSize;
    }
    clear() {
      this.cells.clear();
    }
    insert(item) {
      const minX = Math.floor((item.x - item.radius) / this.cellSize);
      const maxX = Math.floor((item.x + item.radius) / this.cellSize);
      const minY = Math.floor((item.y - item.radius) / this.cellSize);
      const maxY = Math.floor((item.y + item.radius) / this.cellSize);
      for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
        const key = `${x},${y}`;
        const bucket = this.cells.get(key);
        if (bucket) bucket.push(item);
        else this.cells.set(key, [item]);
      }
    }
    rebuild(items) {
      this.clear();
      for (const item of items) this.insert(item);
    }
    queryCircle(x, y, radius) {
      const found = /* @__PURE__ */ new Map();
      const minX = Math.floor((x - radius) / this.cellSize);
      const maxX = Math.floor((x + radius) / this.cellSize);
      const minY = Math.floor((y - radius) / this.cellSize);
      const maxY = Math.floor((y + radius) / this.cellSize);
      for (let cy = minY; cy <= maxY; cy++) for (let cx = minX; cx <= maxX; cx++) {
        for (const item of this.cells.get(`${cx},${cy}`) ?? []) {
          const reach = radius + item.radius;
          const dx = item.x - x, dy = item.y - y;
          if (dx * dx + dy * dy <= reach * reach) found.set(item.id, item);
        }
      }
      return [...found.values()];
    }
  };

  // engine/src/content/ContentRegistry.ts
  var ContentRegistry = class {
    constructor() {
      this.records = /* @__PURE__ */ new Map();
      this.validators = /* @__PURE__ */ new Map();
    }
    setValidator(kind, validator) {
      this.validators.set(kind, validator);
    }
    register(kind, value) {
      if (!value || typeof value.id !== "string" || !/^[a-z0-9][a-z0-9_-]*$/i.test(value.id)) {
        throw new Error(`Invalid ${kind} id`);
      }
      const id = value.id;
      const validator = this.validators.get(kind);
      if (validator && !validator(value)) throw new Error(`Invalid ${kind} definition: ${id}`);
      let bucket = this.records.get(kind);
      if (!bucket) {
        bucket = /* @__PURE__ */ new Map();
        this.records.set(kind, bucket);
      }
      if (bucket.has(value.id)) throw new Error(`Duplicate ${kind}: ${value.id}`);
      bucket.set(value.id, Object.freeze({ ...value }));
      return value;
    }
    get(kind, id) {
      return this.records.get(kind)?.get(id);
    }
    require(kind, id) {
      const value = this.get(kind, id);
      if (!value) throw new Error(`Missing ${kind}: ${id}`);
      return value;
    }
    list(kind) {
      return [...this.records.get(kind)?.values() ?? []];
    }
    validateReferences(kind, ids) {
      const missing = [];
      for (const id of ids) if (!this.records.get(kind)?.has(id)) missing.push(id);
      return missing;
    }
  };

  // engine/src/input/ActionInput.ts
  var ActionInput = class {
    constructor() {
      this.bindings = /* @__PURE__ */ new Map();
      this.down = /* @__PURE__ */ new Set();
      this.pressed = /* @__PURE__ */ new Set();
      this.released = /* @__PURE__ */ new Set();
    }
    bind(action, ...codes) {
      if (!action || !codes.length) throw new Error("Action and at least one code are required");
      this.bindings.set(action, new Set(codes));
    }
    setCode(code, isDown) {
      if (isDown && !this.down.has(code)) this.pressed.add(code);
      if (!isDown && this.down.has(code)) this.released.add(code);
      if (isDown) this.down.add(code);
      else this.down.delete(code);
    }
    state(action) {
      const codes = this.bindings.get(action);
      if (!codes) return "idle";
      if ([...codes].some((code) => this.pressed.has(code))) return "pressed";
      if ([...codes].some((code) => this.released.has(code))) return "released";
      if ([...codes].some((code) => this.down.has(code))) return "held";
      return "idle";
    }
    value(action) {
      return this.state(action) === "idle" || this.state(action) === "released" ? 0 : 1;
    }
    endFrame() {
      this.pressed.clear();
      this.released.clear();
    }
    reset() {
      this.down.clear();
      this.endFrame();
    }
  };

  // engine/src/physics/Collision.ts
  function separateCircles(a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const minDistance = a.radius + b.radius;
    const distanceSquared = dx * dx + dy * dy;
    if (distanceSquared >= minDistance * minDistance) return { collided: false, normalX: 0, normalY: 0, penetration: 0 };
    const distance = Math.sqrt(distanceSquared);
    const normalX = distance > 1e-5 ? dx / distance : 1;
    const normalY = distance > 1e-5 ? dy / distance : 0;
    const penetration = minDistance - distance;
    const aShare = a.immovable ? 0 : b.immovable ? 1 : 0.5;
    const bShare = b.immovable ? 0 : a.immovable ? 1 : 0.5;
    a.x -= normalX * penetration * aShare;
    a.y -= normalY * penetration * aShare;
    b.x += normalX * penetration * bShare;
    b.y += normalY * penetration * bShare;
    return { collided: true, normalX, normalY, penetration };
  }

  // engine/src/ai/TacticalDirector.ts
  var TacticalDirector = class {
    constructor(cycleSeconds = 9) {
      this.cycleSeconds = Math.max(4, cycleSeconds);
    }
    orderFor(role, elapsed) {
      const phase = (elapsed % this.cycleSeconds + this.cycleSeconds) % this.cycleSeconds;
      if (phase < 2.2) return { intent: "hold", startsAt: 0, endsAt: 2.2 };
      if (phase >= 6.4) return { intent: "retreat", startsAt: 6.4, endsAt: this.cycleSeconds };
      if (role === "bait") return { intent: "bait", startsAt: 2.2, endsAt: 4.2 };
      if (role === "flank-left") return { intent: "flank-left", startsAt: 2.8, endsAt: 5.4 };
      if (role === "flank-right") return { intent: "flank-right", startsAt: 2.8, endsAt: 5.4 };
      return phase < 3.8 ? { intent: "hold", startsAt: 2.2, endsAt: 3.8 } : { intent: "strike", startsAt: 3.8, endsAt: 6.4 };
    }
  };

  // engine/src/save/VersionedSaveStore.ts
  var VersionedSaveStore = class {
    constructor(storage, namespace) {
      this.migrations = /* @__PURE__ */ new Map();
      this.storage = storage;
      this.namespace = namespace;
    }
    addMigration(fromVersion, migration) {
      if (this.migrations.has(fromVersion)) throw new Error(`Migration ${fromVersion} already exists`);
      this.migrations.set(fromVersion, migration);
    }
    save(slot, version, data) {
      const envelope = { version, savedAt: Date.now(), data };
      this.storage.setItem(this.key(slot), JSON.stringify(envelope));
      return envelope;
    }
    load(slot, targetVersion, validate) {
      const raw = this.storage.getItem(this.key(slot));
      if (!raw) return null;
      let envelope;
      try {
        envelope = JSON.parse(raw);
      } catch {
        throw new Error(`Corrupt save slot: ${slot}`);
      }
      while (envelope.version < targetVersion) {
        const migration = this.migrations.get(envelope.version);
        if (!migration) throw new Error(`Missing migration ${envelope.version} -> ${envelope.version + 1}`);
        envelope = { ...envelope, version: envelope.version + 1, data: migration(envelope.data) };
      }
      if (envelope.version !== targetVersion || !validate(envelope.data)) throw new Error(`Invalid save slot: ${slot}`);
      return envelope;
    }
    remove(slot) {
      this.storage.removeItem(this.key(slot));
    }
    key(slot) {
      return `${this.namespace}:${slot}`;
    }
  };

  // engine/src/replay/Replay.ts
  var ReplayRecorder = class {
    constructor(engineVersion, seed, contentHash) {
      this.frames = [];
      this.engineVersion = engineVersion;
      this.seed = seed;
      this.contentHash = contentHash;
    }
    record(tick, input, checksum) {
      if (!Number.isInteger(tick) || tick < 0) throw new Error("Replay tick must be a non-negative integer");
      const previous = this.frames[this.frames.length - 1];
      if (previous && tick <= previous.tick) throw new Error("Replay ticks must be strictly increasing");
      const frame = checksum === void 0 ? { tick, input } : { tick, input, checksum };
      this.frames.push(structuredClone(frame));
    }
    finish() {
      return { engineVersion: this.engineVersion, seed: this.seed, contentHash: this.contentHash, frames: structuredClone(this.frames) };
    }
  };
  var ReplayPlayer = class {
    constructor(replay) {
      this.cursor = 0;
      this.replay = replay;
    }
    inputsAt(tick) {
      const frames = [];
      while (this.cursor < this.replay.frames.length && this.replay.frames[this.cursor].tick <= tick) {
        const frame = this.replay.frames[this.cursor++];
        if (frame.tick === tick) frames.push(frame);
      }
      return frames;
    }
    reset() {
      this.cursor = 0;
    }
  };
  function checksumNumbers(values) {
    let hash = 2166136261;
    for (const value of values) {
      const scaled = Math.round(value * 1e3) | 0;
      hash ^= scaled;
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  // engine/src/platform/Platform.ts
  function createWebPlatform() {
    return {
      name: "web",
      now: () => performance.now(),
      requestFrame: (callback) => requestAnimationFrame(callback),
      cancelFrame: (id) => cancelAnimationFrame(id),
      async readText(path) {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
        return response.text();
      }
    };
  }

  // engine/src/render/CommandBuffer.ts
  var CommandBuffer = class {
    constructor() {
      this.commands = [];
    }
    push(command) {
      this.commands.push(command);
    }
    drain() {
      this.commands.sort((a, b) => a.layer - b.layer);
      const output = this.commands;
      this.commands = [];
      return output;
    }
    get size() {
      return this.commands.length;
    }
  };

  // engine/src/audio/AudioMixer.ts
  var AudioMixer = class {
    constructor() {
      this.gains = /* @__PURE__ */ new Map([
        ["master", 1],
        ["music", 0.35],
        ["sfx", 1],
        ["ui", 0.8],
        ["voice", 1]
      ]);
      this.muted = false;
    }
    setGain(bus, gain) {
      this.gains.set(bus, Math.max(0, Math.min(1, gain)));
    }
    getGain(bus) {
      return this.muted ? 0 : (this.gains.get(bus) ?? 1) * (this.gains.get("master") ?? 1);
    }
    setMuted(muted) {
      this.muted = muted;
    }
    isMuted() {
      return this.muted;
    }
  };

  // engine/src/index.ts
  var VERSION = 1;
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=engine.js.map
