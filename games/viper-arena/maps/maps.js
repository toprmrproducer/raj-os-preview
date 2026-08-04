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
  const DEFAULT_WORLD = Object.freeze({ width: 4200, height: 2800 });
  const TAU = Math.PI * 2;

  // Chapters 6–36 are declarative so the campaign roster can grow without
  // duplicating layout-generation logic. Array order is campaign order.
  const EXPANSION_MAP_SPECS = Object.freeze([
    {
      "id": "dune_ossuary",
      "name": "DUNE OSSUARY",
      "chapter": "THE BURIED MARCH",
      "description": "Wind-cut bone fields create sparse cover and punishing cross-map sightlines.",
      "family": "desert",
      "colors": [
        "#100904",
        "#201307",
        "#FFD078",
        "#FF9F43",
        "#FF5D3A",
        "#65401E",
        "rgba(184,103,42,0.14)"
      ],
      "props": [
        "rib_arch",
        "sand_anchor",
        "buried_plate"
      ],
      "hazardNames": [
        "sand_burst",
        "scorpion_lane"
      ],
      "hazardTypes": [
        "pulse_disc",
        "sweep_lane"
      ],
      "enemyFaction": "Ossuary Stalkers",
      "enemyPalette": [
        "#DFA65A",
        "#5B2C18",
        "#FF7548"
      ],
      "enemyArchetypes": [
        "burrow-rusher",
        "bone-sniper",
        "dust-screen support"
      ],
      "enemyFlavor": "Patient ambushers emerge from fixed sand wakes; orange chevrons telegraph every breach.",
      "gridSize": 92,
      "gridAngle": 0.08
    },
    {
      "id": "saffron_salt_flats",
      "name": "SAFFRON SALT FLATS",
      "chapter": "THE WHITE HORIZON",
      "description": "Reflective salt plates reward constant repositioning around long cracking fault lines.",
      "family": "desert",
      "colors": [
        "#0D0A06",
        "#201A0E",
        "#FFE8A3",
        "#F7C948",
        "#FF6B35",
        "#685B32",
        "rgba(221,190,96,0.12)"
      ],
      "props": [
        "salt_spire",
        "survey_stake",
        "cracked_marker"
      ],
      "hazardNames": [
        "brine_geyser",
        "fault_flash"
      ],
      "hazardTypes": [
        "pulse_disc",
        "static_rect"
      ],
      "enemyFaction": "Saffron Corsairs",
      "enemyPalette": [
        "#F2D27A",
        "#7E4E24",
        "#FF713D"
      ],
      "enemyArchetypes": [
        "long-range skirmisher",
        "mirage decoy",
        "flank rider"
      ],
      "enemyFlavor": "Fast pale raiders split into mirrored firing lanes but retain solid triangular muzzle tells.",
      "gridSize": 108,
      "gridAngle": 0
    },
    {
      "id": "monsoon_causeway",
      "name": "MONSOON CAUSEWAY",
      "chapter": "THE DROWNED ROAD",
      "description": "Flooded stone lanes alternate between open movement and forceful rain channels.",
      "family": "monsoon",
      "colors": [
        "#02090D",
        "#071921",
        "#7EE8FA",
        "#39BBD6",
        "#FFB347",
        "#174252",
        "rgba(35,135,166,0.20)"
      ],
      "props": [
        "drain_grate",
        "rain_totem",
        "flood_post"
      ],
      "hazardNames": [
        "surge_channel",
        "thunder_pool"
      ],
      "hazardTypes": [
        "sweep_lane",
        "pulse_disc"
      ],
      "enemyFaction": "Monsoon Lancers",
      "enemyPalette": [
        "#37B7C9",
        "#173D63",
        "#FFD166"
      ],
      "enemyArchetypes": [
        "current rider",
        "fork-shot lancer",
        "rain medic"
      ],
      "enemyFlavor": "Blue plated squads surf channel edges and coordinate bursts immediately after lightning telegraphs.",
      "gridSize": 76,
      "gridAngle": 0
    },
    {
      "id": "thunder_delta",
      "name": "THUNDER DELTA",
      "chapter": "THE RIVER OF SKY",
      "description": "Branching electrical waterways make safe ground migrate across the arena.",
      "family": "monsoon",
      "colors": [
        "#02070E",
        "#071326",
        "#93C5FD",
        "#60A5FA",
        "#FDE047",
        "#172A52",
        "rgba(61,105,190,0.20)"
      ],
      "props": [
        "levee_gate",
        "grounding_rod",
        "turbine_buoy"
      ],
      "hazardNames": [
        "delta_arc",
        "flash_flood"
      ],
      "hazardTypes": [
        "rotating_beam",
        "moving_disc"
      ],
      "enemyFaction": "Delta Conductors",
      "enemyPalette": [
        "#2F80ED",
        "#172554",
        "#FDE047"
      ],
      "enemyArchetypes": [
        "arc conductor",
        "wave pusher",
        "grounded bulwark"
      ],
      "enemyFlavor": "Formation leaders bridge lightning through marked allies while bulky units anchor the current.",
      "gridSize": 88,
      "gridAngle": 0.22
    },
    {
      "id": "emerald_canopy",
      "name": "EMERALD CANOPY",
      "chapter": "THE HUNGRY ROOF",
      "description": "Dense roots divide the arena into curved hunting paths under luminous leaves.",
      "family": "jungle",
      "colors": [
        "#020A05",
        "#071B0C",
        "#7EF29A",
        "#35D06F",
        "#FFB84D",
        "#174524",
        "rgba(27,112,57,0.18)"
      ],
      "props": [
        "buttress_root",
        "vine_pillar",
        "broadleaf_fan"
      ],
      "hazardNames": [
        "root_snap",
        "pollen_gust"
      ],
      "hazardTypes": [
        "static_rect",
        "moving_disc"
      ],
      "enemyFaction": "Canopy Hunters",
      "enemyPalette": [
        "#2FAF62",
        "#123B23",
        "#F0C75E"
      ],
      "enemyArchetypes": [
        "branch sniper",
        "vine grappler",
        "pollen scout"
      ],
      "enemyFlavor": "Green-black hunters hold elevation cues and expose amber throat markings before firing.",
      "gridSize": 96,
      "gridAngle": 0.38
    },
    {
      "id": "carnivore_conservatory",
      "name": "CARNIVORE CONSERVATORY",
      "chapter": "THE GLASS JUNGLE",
      "description": "Overgrown research beds open and close around predatory plant machinery.",
      "family": "jungle",
      "colors": [
        "#040906",
        "#0B1A11",
        "#A5F28A",
        "#5ED66F",
        "#FF557A",
        "#284B2C",
        "rgba(68,134,68,0.17)"
      ],
      "props": [
        "sealed_planter",
        "feeding_crane",
        "glass_support"
      ],
      "hazardNames": [
        "jaw_bed",
        "enzyme_mist"
      ],
      "hazardTypes": [
        "pulse_disc",
        "sweep_lane"
      ],
      "enemyFaction": "Conservatory Keepers",
      "enemyPalette": [
        "#6ACA62",
        "#40214B",
        "#FF5C7C"
      ],
      "enemyArchetypes": [
        "trap gardener",
        "spore mortar",
        "glass sentinel"
      ],
      "enemyFlavor": "Keepers seed visible serrated hazard outlines, then herd the player with slow magenta volleys.",
      "gridSize": 80,
      "gridAngle": 0
    },
    {
      "id": "whiteout_trench",
      "name": "WHITEOUT TRENCH",
      "chapter": "THE SILENT CUT",
      "description": "Narrow ice cuts hide slow fields but preserve bold navigation beacons.",
      "family": "tundra",
      "colors": [
        "#02080D",
        "#071521",
        "#D9F3FF",
        "#8AD8F8",
        "#FFB454",
        "#25465B",
        "rgba(176,225,244,0.18)"
      ],
      "props": [
        "snow_fence",
        "ice_bollard",
        "thermal_pipe"
      ],
      "hazardNames": [
        "whiteout_front",
        "crevasse_crack"
      ],
      "hazardTypes": [
        "sweep_lane",
        "static_rect"
      ],
      "enemyFaction": "Trench Wardens",
      "enemyPalette": [
        "#A8DDF0",
        "#294A68",
        "#FFB85C"
      ],
      "enemyArchetypes": [
        "frost shield",
        "ice needler",
        "thermal saboteur"
      ],
      "enemyFlavor": "Armored pale units disappear only into broad fog banks while orange optics keep targets fair.",
      "gridSize": 84,
      "gridAngle": 0
    },
    {
      "id": "aurora_shelf",
      "name": "AURORA SHELF",
      "chapter": "THE POLAR CROWN",
      "description": "Open glacial shelves are crossed by slow aurora beams that bend firing routes.",
      "family": "tundra",
      "colors": [
        "#020713",
        "#08132A",
        "#8BF3FF",
        "#8B7CFF",
        "#FF68B4",
        "#26345D",
        "rgba(78,134,210,0.18)"
      ],
      "props": [
        "ice_monolith",
        "research_cache",
        "wind_vane"
      ],
      "hazardNames": [
        "aurora_sweep",
        "iceberg_drift"
      ],
      "hazardTypes": [
        "rotating_beam",
        "moving_disc"
      ],
      "enemyFaction": "Aurora Phantoms",
      "enemyPalette": [
        "#79E1E8",
        "#523B8E",
        "#FF73B7"
      ],
      "enemyArchetypes": [
        "phase skater",
        "beam prism",
        "cold decoy"
      ],
      "enemyFlavor": "Iridescent enemies skate in arcs, leaving geometric afterimages distinct from damaging bodies.",
      "gridSize": 104,
      "gridAngle": 0.52
    },
    {
      "id": "magma_crucible",
      "name": "MAGMA CRUCIBLE",
      "chapter": "THE RED ENGINE",
      "description": "Conveyor islands surround molten vents with short, readable eruption rhythms.",
      "family": "volcanic",
      "colors": [
        "#0D0302",
        "#220705",
        "#FFB347",
        "#FF6A24",
        "#FF304F",
        "#5E1E13",
        "rgba(177,47,20,0.20)"
      ],
      "props": [
        "slag_crane",
        "heat_shield",
        "ore_hopper"
      ],
      "hazardNames": [
        "magma_vent",
        "slag_conveyor"
      ],
      "hazardTypes": [
        "pulse_disc",
        "sweep_lane"
      ],
      "enemyFaction": "Crucible Forged",
      "enemyPalette": [
        "#D94124",
        "#50130F",
        "#FFC14D"
      ],
      "enemyArchetypes": [
        "ember charger",
        "slag gunner",
        "forge support"
      ],
      "enemyFlavor": "Black iron attackers heat from amber to coral before aggressive rushes, making escalation visible.",
      "gridSize": 72,
      "gridAngle": 0
    },
    {
      "id": "obsidian_caldera",
      "name": "OBSIDIAN CALDERA",
      "chapter": "THE BLACK VOLCANO",
      "description": "Glossy volcanic plates fracture into radial danger zones around a central crater.",
      "family": "volcanic",
      "colors": [
        "#080205",
        "#16050B",
        "#F08CFF",
        "#FF7347",
        "#FF335E",
        "#3C1930",
        "rgba(129,31,62,0.18)"
      ],
      "props": [
        "glass_fumarole",
        "basalt_column",
        "seismic_meter"
      ],
      "hazardNames": [
        "caldera_ring",
        "obsidian_shard"
      ],
      "hazardTypes": [
        "pulse_disc",
        "moving_disc"
      ],
      "enemyFaction": "Caldera Blades",
      "enemyPalette": [
        "#402037",
        "#9E2E55",
        "#FF875E"
      ],
      "enemyArchetypes": [
        "shard lancer",
        "crater orbiters",
        "seismic caller"
      ],
      "enemyFlavor": "Dark glass enemies use bright coral edge lines and attack in expanding ring formations.",
      "gridSize": 90,
      "gridAngle": 0.26
    },
    {
      "id": "sunken_forum",
      "name": "SUNKEN FORUM",
      "chapter": "THE DROWNED EMPIRE",
      "description": "Half-submerged ruins provide broad columns and rotating tidal kill zones.",
      "family": "ruins",
      "colors": [
        "#03090A",
        "#0A1817",
        "#73E0D1",
        "#D8B56B",
        "#FF735C",
        "#355149",
        "rgba(64,127,120,0.18)"
      ],
      "props": [
        "broken_column",
        "mosaic_slab",
        "flooded_plinth"
      ],
      "hazardNames": [
        "tide_wheel",
        "column_fall"
      ],
      "hazardTypes": [
        "rotating_beam",
        "static_rect"
      ],
      "enemyFaction": "Forum Legion",
      "enemyPalette": [
        "#57AFA0",
        "#6D5731",
        "#FF795F"
      ],
      "enemyArchetypes": [
        "trident gunner",
        "mosaic shield",
        "tide caller"
      ],
      "enemyFlavor": "Ancient bronze formations advance in disciplined rows, marked by turquoise weapon inlays.",
      "gridSize": 98,
      "gridAngle": 0
    },
    {
      "id": "ivory_catacombs",
      "name": "IVORY CATACOMBS",
      "chapter": "THE KINGLESS TOMB",
      "description": "Bone-white corridors break into chambers haunted by sliding sarcophagus walls.",
      "family": "ruins",
      "colors": [
        "#090805",
        "#18150D",
        "#F3E4B5",
        "#D2B46E",
        "#B86BFF",
        "#4F4936",
        "rgba(142,128,88,0.15)"
      ],
      "props": [
        "sealed_sarcophagus",
        "bone_arch",
        "funeral_lamp"
      ],
      "hazardNames": [
        "tomb_wall",
        "violet_curse"
      ],
      "hazardTypes": [
        "sweep_lane",
        "pulse_disc"
      ],
      "enemyFaction": "Ivory Remnants",
      "enemyPalette": [
        "#D9C993",
        "#55482C",
        "#B77AFF"
      ],
      "enemyArchetypes": [
        "crypt sentinel",
        "curse caster",
        "relic marksman"
      ],
      "enemyFlavor": "Bone armor hides purple energy channels that brighten in a fixed pattern before every shot.",
      "gridSize": 82,
      "gridAngle": 0.78
    },
    {
      "id": "orbital_drydock",
      "name": "ORBITAL DRYDOCK",
      "chapter": "THE AIRLESS BERTH",
      "description": "Vacuum gantries frame wide lanes where maintenance arms sweep across combat space.",
      "family": "orbital",
      "colors": [
        "#01040A",
        "#050D1A",
        "#77E6FF",
        "#4D8DFF",
        "#FFB84A",
        "#17294A",
        "rgba(39,74,129,0.18)"
      ],
      "props": [
        "docking_clamp",
        "service_satellite",
        "fuel_truss"
      ],
      "hazardNames": [
        "gantry_sweep",
        "decompression_zone"
      ],
      "hazardTypes": [
        "rotating_beam",
        "pulse_disc"
      ],
      "enemyFaction": "Drydock Marines",
      "enemyPalette": [
        "#3E7AC8",
        "#14264C",
        "#FFBE55"
      ],
      "enemyArchetypes": [
        "vacuum lancer",
        "tether unit",
        "hull breacher"
      ],
      "enemyFlavor": "Navy armored squads tether briefly before recoil, creating predictable stationary firing windows.",
      "gridSize": 112,
      "gridAngle": 0
    },
    {
      "id": "zero_g_reliquary",
      "name": "ZERO-G RELIQUARY",
      "chapter": "THE FLOATING SHRINE",
      "description": "Drifting relic platforms create slow moving cover inside a star-lit chamber.",
      "family": "orbital",
      "colors": [
        "#020311",
        "#080A24",
        "#C0A8FF",
        "#66E5FF",
        "#FF7EC8",
        "#292354",
        "rgba(80,63,147,0.18)"
      ],
      "props": [
        "relic_capsule",
        "gravity_icon",
        "orbital_censer"
      ],
      "hazardNames": [
        "gravity_well",
        "relic_drift"
      ],
      "hazardTypes": [
        "pulse_disc",
        "moving_disc"
      ],
      "enemyFaction": "Reliquary Choir",
      "enemyPalette": [
        "#8E79D6",
        "#233F70",
        "#FF82C9"
      ],
      "enemyArchetypes": [
        "gravity cantor",
        "orbit sniper",
        "relic guardian"
      ],
      "enemyFlavor": "Ceremonial enemies maintain visible orbital paths and sing attacks through expanding angular waveforms.",
      "gridSize": 96,
      "gridAngle": 0.42
    },
    {
      "id": "cobalt_reef",
      "name": "COBALT REEF",
      "chapter": "THE PRESSURE GARDEN",
      "description": "Metallic coral channels squeeze movement while pressure jets open escape windows.",
      "family": "abyssal",
      "colors": [
        "#01080D",
        "#041823",
        "#55D7F2",
        "#167AA2",
        "#FFCF66",
        "#173A4A",
        "rgba(19,97,130,0.22)"
      ],
      "props": [
        "metal_coral",
        "pressure_valve",
        "anchor_plate"
      ],
      "hazardNames": [
        "pressure_jet",
        "reef_snap"
      ],
      "hazardTypes": [
        "sweep_lane",
        "static_rect"
      ],
      "enemyFaction": "Cobalt Divers",
      "enemyPalette": [
        "#238AB5",
        "#0E334D",
        "#FFD16C"
      ],
      "enemyArchetypes": [
        "pressure rammer",
        "sonar scout",
        "coral shield"
      ],
      "enemyFlavor": "Blue shell units coordinate through bold concentric sonar lines that never resemble pickups.",
      "gridSize": 86,
      "gridAngle": 0
    },
    {
      "id": "abyssal_pumpworks",
      "name": "ABYSSAL PUMPWORKS",
      "chapter": "THE BLACK WATER",
      "description": "Industrial pumps cycle deep-water currents through four mechanical basins.",
      "family": "abyssal",
      "colors": [
        "#00070B",
        "#03141C",
        "#67F4E8",
        "#126A79",
        "#F064B7",
        "#153A40",
        "rgba(5,84,101,0.24)"
      ],
      "props": [
        "pump_tower",
        "intake_grille",
        "depth_gauge"
      ],
      "hazardNames": [
        "intake_pull",
        "blackwater_bloom"
      ],
      "hazardTypes": [
        "pulse_disc",
        "moving_disc"
      ],
      "enemyFaction": "Pumpwork Eels",
      "enemyPalette": [
        "#157584",
        "#0C2A33",
        "#F269BB"
      ],
      "enemyArchetypes": [
        "current ambusher",
        "depth mine layer",
        "pump hacker"
      ],
      "enemyFlavor": "Slim enemies accelerate only along painted current arrows, then pause at intake nodes.",
      "gridSize": 78,
      "gridAngle": 0.12
    },
    {
      "id": "clockwork_warrens",
      "name": "CLOCKWORK WARRENS",
      "chapter": "THE TOOTHED MAZE",
      "description": "Interlocking floor mechanisms create repeating safe pockets between gear sweeps.",
      "family": "clockwork",
      "colors": [
        "#0A0703",
        "#1B1408",
        "#F1C76A",
        "#B47A30",
        "#FF5F4A",
        "#51401E",
        "rgba(131,91,34,0.16)"
      ],
      "props": [
        "gear_stack",
        "spring_housing",
        "key_shaft"
      ],
      "hazardNames": [
        "gear_sweep",
        "spring_burst"
      ],
      "hazardTypes": [
        "rotating_beam",
        "pulse_disc"
      ],
      "enemyFaction": "Warren Automatons",
      "enemyPalette": [
        "#B9853A",
        "#473319",
        "#FF654F"
      ],
      "enemyArchetypes": [
        "gear rider",
        "spring sniper",
        "ratchet guard"
      ],
      "enemyFlavor": "Clockwork armor exposes a moving tooth index that precisely telegraphs the next attack interval.",
      "gridSize": 64,
      "gridAngle": 0.52
    },
    {
      "id": "pendulum_court",
      "name": "PENDULUM COURT",
      "chapter": "THE HOURS BELOW",
      "description": "Long pendulum shadows divide a ceremonial timekeeping hall into rhythmic lanes.",
      "family": "clockwork",
      "colors": [
        "#080705",
        "#17140D",
        "#F7DF9B",
        "#8FB7C7",
        "#D56CFF",
        "#45453C",
        "rgba(94,104,106,0.16)"
      ],
      "props": [
        "clock_face",
        "balance_weight",
        "escapement_pillar"
      ],
      "hazardNames": [
        "pendulum_lane",
        "hour_chime"
      ],
      "hazardTypes": [
        "sweep_lane",
        "pulse_disc"
      ],
      "enemyFaction": "Court Timekeepers",
      "enemyPalette": [
        "#8CA8B2",
        "#62512F",
        "#D975FF"
      ],
      "enemyArchetypes": [
        "tempo duelist",
        "delayed shooter",
        "hour guard"
      ],
      "enemyFlavor": "Silver-brass enemies act on shared visible beats, rewarding players who learn the formation rhythm.",
      "gridSize": 100,
      "gridAngle": 0
    },
    {
      "id": "stormglass_plateau",
      "name": "STORMGLASS PLATEAU",
      "chapter": "THE SHATTERED SKY",
      "description": "Transparent rock shelves reveal approaching lightning paths beneath the player.",
      "family": "storm",
      "colors": [
        "#020611",
        "#071329",
        "#8ABEFF",
        "#54F0E2",
        "#FFEF69",
        "#22365F",
        "rgba(47,91,164,0.20)"
      ],
      "props": [
        "glass_fin",
        "storm_anchor",
        "charge_cage"
      ],
      "hazardNames": [
        "underbolt",
        "glass_break"
      ],
      "hazardTypes": [
        "sweep_lane",
        "static_rect"
      ],
      "enemyFaction": "Plateau Fulminators",
      "enemyPalette": [
        "#4D91E8",
        "#163465",
        "#FFF073"
      ],
      "enemyArchetypes": [
        "bolt diver",
        "glass sniper",
        "charge anchor"
      ],
      "enemyFlavor": "Electric units mark paths underfoot before diving, separating destination and damage timing.",
      "gridSize": 92,
      "gridAngle": 0.32
    },
    {
      "id": "lightning_monastery",
      "name": "LIGHTNING MONASTERY",
      "chapter": "THE VOW OF THUNDER",
      "description": "Circular courtyards channel rotating arcs between grounded copper towers.",
      "family": "storm",
      "colors": [
        "#03050B",
        "#0B1021",
        "#A7C7FF",
        "#B889FF",
        "#FFE25A",
        "#312857",
        "rgba(74,65,145,0.18)"
      ],
      "props": [
        "copper_stupa",
        "prayer_conductor",
        "grounding_bell"
      ],
      "hazardNames": [
        "vow_arc",
        "bell_shock"
      ],
      "hazardTypes": [
        "rotating_beam",
        "pulse_disc"
      ],
      "enemyFaction": "Thunder Acolytes",
      "enemyPalette": [
        "#7F6BD1",
        "#27315C",
        "#FFE45E"
      ],
      "enemyArchetypes": [
        "arc monk",
        "bell defender",
        "vow sniper"
      ],
      "enemyFlavor": "Disciplined violet enemies pause in coiled stances before coordinated yellow discharge patterns.",
      "gridSize": 108,
      "gridAngle": 0.64
    },
    {
      "id": "mirage_bazaar",
      "name": "MIRAGE BAZAAR",
      "chapter": "THE MARKET OF ECHOES",
      "description": "Abandoned awnings and heat mirages form shifting but clearly bounded combat stalls.",
      "family": "desert_city",
      "colors": [
        "#0E0705",
        "#21110B",
        "#FFD0A1",
        "#E65C7A",
        "#50D7E8",
        "#63402D",
        "rgba(191,91,73,0.16)"
      ],
      "props": [
        "folded_awning",
        "empty_counter",
        "water_clock"
      ],
      "hazardNames": [
        "mirage_wall",
        "awning_snap"
      ],
      "hazardTypes": [
        "moving_disc",
        "static_rect"
      ],
      "enemyFaction": "Bazaar Echoes",
      "enemyPalette": [
        "#C45573",
        "#56301F",
        "#56DCEA"
      ],
      "enemyArchetypes": [
        "echo duplicate",
        "market sniper",
        "awning runner"
      ],
      "enemyFlavor": "Rose-cloth raiders produce translucent offset echoes; only solid cyan weapon cores can deal damage.",
      "gridSize": 74,
      "gridAngle": 0
    },
    {
      "id": "mycelium_hollows",
      "name": "MYCELIUM HOLLOWS",
      "chapter": "THE SPORE NETWORK",
      "description": "Massive fungal cables create organic corridors interrupted by timed cleansing bursts.",
      "family": "fungal",
      "colors": [
        "#050609",
        "#10111B",
        "#D8A4FF",
        "#69D58C",
        "#FFB65C",
        "#343044",
        "rgba(107,73,132,0.18)"
      ],
      "props": [
        "mycelium_cable",
        "shelf_fungus",
        "sealed_spore_chimney"
      ],
      "hazardNames": [
        "spore_front",
        "cleansing_flash"
      ],
      "hazardTypes": [
        "moving_disc",
        "pulse_disc"
      ],
      "enemyFaction": "Hollow Symbiotes",
      "enemyPalette": [
        "#8C61AA",
        "#28533A",
        "#FFB961"
      ],
      "enemyArchetypes": [
        "spore shepherd",
        "hyphae tether",
        "cleanser guard"
      ],
      "enemyFlavor": "Purple-green units share damage through visible tendrils that can be broken by spacing them apart.",
      "gridSize": 90,
      "gridAngle": 0.18
    },
    {
      "id": "crystal_resonator",
      "name": "CRYSTAL RESONATOR",
      "chapter": "THE SINGING CAVE",
      "description": "Faceted pillars redirect shots and emit timed resonance lanes across dark stone.",
      "family": "crystal",
      "colors": [
        "#03050A",
        "#0B1020",
        "#70E5FF",
        "#A66BFF",
        "#FF6F91",
        "#29234E",
        "rgba(70,72,154,0.18)"
      ],
      "props": [
        "crystal_buttress",
        "tuning_fork",
        "damping_pad"
      ],
      "hazardNames": [
        "resonance_lane",
        "facet_pulse"
      ],
      "hazardTypes": [
        "sweep_lane",
        "pulse_disc"
      ],
      "enemyFaction": "Resonant Shards",
      "enemyPalette": [
        "#7458B5",
        "#1E4974",
        "#FF7395"
      ],
      "enemyArchetypes": [
        "prism shooter",
        "echo shield",
        "frequency caller"
      ],
      "enemyFlavor": "Faceted enemies display matching waveform crests before linked attacks; damaged links visibly detune.",
      "gridSize": 102,
      "gridAngle": 0.46
    },
    {
      "id": "graviton_foundry",
      "name": "GRAVITON FOUNDRY",
      "chapter": "THE WEIGHT ENGINE",
      "description": "Gravity presses alter projectile routes around massive suspended fabrication blocks.",
      "family": "gravity",
      "colors": [
        "#02040A",
        "#080D19",
        "#65E6D2",
        "#557DFF",
        "#FF8F57",
        "#1F2D4B",
        "rgba(50,79,143,0.19)"
      ],
      "props": [
        "mass_press",
        "gravity_rail",
        "suspended_ingot"
      ],
      "hazardNames": [
        "gravity_press",
        "mass_drift"
      ],
      "hazardTypes": [
        "static_rect",
        "moving_disc"
      ],
      "enemyFaction": "Graviton Laborers",
      "enemyPalette": [
        "#416DD0",
        "#193E4C",
        "#FF945C"
      ],
      "enemyArchetypes": [
        "mass anchor",
        "trajectory bender",
        "heavy gunner"
      ],
      "enemyFlavor": "Blue-green armor projects square gravity brackets, making altered projectile space explicit.",
      "gridSize": 82,
      "gridAngle": 0
    },
    {
      "id": "royal_menagerie",
      "name": "ROYAL MENAGERIE",
      "chapter": "THE GILDED CAGES",
      "description": "Ceremonial habitats mix broad circular cages with controlled predator-release gates.",
      "family": "royal",
      "colors": [
        "#0B060A",
        "#1A0E18",
        "#F4C56A",
        "#F0A5CB",
        "#66E6DF",
        "#4D2C46",
        "rgba(138,65,119,0.16)"
      ],
      "props": [
        "gilded_cage",
        "royal_perch",
        "feeding_console"
      ],
      "hazardNames": [
        "cage_lock",
        "keeper_sweep"
      ],
      "hazardTypes": [
        "pulse_disc",
        "sweep_lane"
      ],
      "enemyFaction": "Menagerie Keepers",
      "enemyPalette": [
        "#A95E8E",
        "#62421D",
        "#6CEBE4"
      ],
      "enemyArchetypes": [
        "beast handler",
        "gilded guard",
        "tranquilizer sniper"
      ],
      "enemyFlavor": "Pink-gold keepers command small formations through turquoise baton arcs, never through hidden orders.",
      "gridSize": 94,
      "gridAngle": 0.24
    },
    {
      "id": "prism_labyrinth",
      "name": "PRISM LABYRINTH",
      "chapter": "THE SPLIT LIGHT",
      "description": "Color-separated walls refract hazards into angular but predictable mirrored routes.",
      "family": "prism",
      "colors": [
        "#03040A",
        "#0B0E1C",
        "#E5F1FF",
        "#63E8FF",
        "#FF5FA2",
        "#302B52",
        "rgba(97,82,174,0.17)"
      ],
      "props": [
        "prism_wall",
        "beam_stop",
        "refraction_marker"
      ],
      "hazardNames": [
        "refracted_beam",
        "prism_shift"
      ],
      "hazardTypes": [
        "rotating_beam",
        "moving_disc"
      ],
      "enemyFaction": "Labyrinth Refractors",
      "enemyPalette": [
        "#6BDFF0",
        "#6A4EB0",
        "#FF64A6"
      ],
      "enemyArchetypes": [
        "mirror duelist",
        "beam splitter",
        "refraction scout"
      ],
      "enemyFlavor": "White-armored enemies split colored attack previews, but lethal beams always converge to a coral core.",
      "gridSize": 70,
      "gridAngle": 0.68
    },
    {
      "id": "ashen_skybridge",
      "name": "ASHEN SKYBRIDGE",
      "chapter": "THE OPEN DROP",
      "description": "Exposed bridge decks combine gale lanes with crumbling cover above an ember abyss.",
      "family": "skybridge",
      "colors": [
        "#080504",
        "#17100D",
        "#BFD5D8",
        "#FF8A4B",
        "#FF4F65",
        "#49413B",
        "rgba(117,93,77,0.20)"
      ],
      "props": [
        "cable_anchor",
        "wind_screen",
        "bridge_joint"
      ],
      "hazardNames": [
        "gale_lane",
        "deck_collapse"
      ],
      "hazardTypes": [
        "sweep_lane",
        "static_rect"
      ],
      "enemyFaction": "Skybridge Reavers",
      "enemyPalette": [
        "#78959B",
        "#5C3424",
        "#FF566A"
      ],
      "enemyArchetypes": [
        "wind rider",
        "cable sniper",
        "bridge rammer"
      ],
      "enemyFlavor": "Gray-orange raiders lean visibly into gusts and use anchored firing stances before recoil.",
      "gridSize": 110,
      "gridAngle": 0
    },
    {
      "id": "memory_palace",
      "name": "MEMORY PALACE",
      "chapter": "THE FALSE PAST",
      "description": "Architectural memories rearrange as broad data walls while real routes stay cyan-edged.",
      "family": "digital",
      "colors": [
        "#02040A",
        "#071020",
        "#79F0FF",
        "#C171FF",
        "#FFCA62",
        "#252550",
        "rgba(88,58,158,0.19)"
      ],
      "props": [
        "memory_frame",
        "data_sarcophagus",
        "archive_gate"
      ],
      "hazardNames": [
        "memory_wall",
        "recall_burst"
      ],
      "hazardTypes": [
        "moving_disc",
        "pulse_disc"
      ],
      "enemyFaction": "Mnemonic Copies",
      "enemyPalette": [
        "#7B55B9",
        "#1D6283",
        "#FFCC67"
      ],
      "enemyArchetypes": [
        "copied class",
        "archive sniper",
        "memory healer"
      ],
      "enemyFlavor": "Data-serpents borrow one familiar class silhouette at a time but retain violet bodies and amber tells.",
      "gridSize": 88,
      "gridAngle": 0.14
    },
    {
      "id": "serpent_armada_deck",
      "name": "SERPENT ARMADA DECK",
      "chapter": "THE LAST FLEET",
      "description": "A vast warship deck layers broadside warning lanes over mobile cargo cover.",
      "family": "armada",
      "colors": [
        "#02060A",
        "#07131B",
        "#79D5E8",
        "#355C8A",
        "#FFB153",
        "#243846",
        "rgba(45,84,108,0.20)"
      ],
      "props": [
        "deck_turret",
        "cargo_magazine",
        "launch_rail"
      ],
      "hazardNames": [
        "broadside_lane",
        "deck_missile"
      ],
      "hazardTypes": [
        "sweep_lane",
        "moving_disc"
      ],
      "enemyFaction": "Armada Marines",
      "enemyPalette": [
        "#2E6385",
        "#152F46",
        "#FFB65B"
      ],
      "enemyArchetypes": [
        "deck gunner",
        "missile spotter",
        "boarding rammer"
      ],
      "enemyFlavor": "Navy formations call broadside lanes with oversized amber deck arrows before committing.",
      "gridSize": 96,
      "gridAngle": 0
    },
    {
      "id": "warden_spire_apex",
      "name": "WARDEN SPIRE APEX",
      "chapter": "THE FIFTIETH ASCENT",
      "description": "Rotating crown machinery recombines the campaign's clearest hazards into a final arena.",
      "family": "finale",
      "colors": [
        "#030308",
        "#0D0B18",
        "#7CF9FF",
        "#F5C04A",
        "#FF4F70",
        "#3A274B",
        "rgba(99,64,125,0.20)"
      ],
      "props": [
        "crown_drive",
        "royal_signal",
        "warden_standard"
      ],
      "hazardNames": [
        "crown_beam",
        "ascendant_ring"
      ],
      "hazardTypes": [
        "rotating_beam",
        "pulse_disc"
      ],
      "enemyFaction": "Apex Wardens",
      "enemyPalette": [
        "#5D4B8C",
        "#206879",
        "#FF546F"
      ],
      "enemyArchetypes": [
        "adaptive elite",
        "royal guard",
        "ascendant support"
      ],
      "enemyFlavor": "Final wardens combine prior archetypes one at a time, preserving familiar tells and strict color roles.",
      "gridSize": 120,
      "gridAngle": 0.52
    },
    {
      "id": "crown_of_vacuum",
      "name": "CROWN OF VACUUM",
      "chapter": "THE WORLD ABOVE",
      "description": "An exterior orbital crown offers huge visibility, drifting debris, and the final royal signal.",
      "family": "orbital_final",
      "colors": [
        "#000107",
        "#030818",
        "#7CF9FF",
        "#F4B6D2",
        "#FFD25E",
        "#1B2E52",
        "rgba(35,58,112,0.22)"
      ],
      "props": [
        "crown_segment",
        "signal_array",
        "debris_shield"
      ],
      "hazardNames": [
        "vacuum_shear",
        "royal_flare"
      ],
      "hazardTypes": [
        "sweep_lane",
        "pulse_disc"
      ],
      "enemyFaction": "Vacuum Crown Guard",
      "enemyPalette": [
        "#315F9B",
        "#815474",
        "#FFD663"
      ],
      "enemyArchetypes": [
        "crown sentinel",
        "signal suppressor",
        "zero-g royal guard"
      ],
      "enemyFlavor": "Blue-pink final guards defend the princess signal using gold countdown bands and broad safe corridors.",
      "gridSize": 128,
      "gridAngle": 0.18
    }
  ]);

  const MAPS = Object.freeze([
    freezeMap({
      id: 'neon_foundry',
      name: 'NEON FOUNDRY',
      chapter: 'THE LOWER WORKS',
      description: 'Open factory floor with readable heat vents and wide firing lanes.',
      enemyTheme: {
        "faction": "Foundry Reavers",
        "palette": {
          "primary": "#D84C3F",
          "secondary": "#481B24",
          "telegraph": "#FFB347"
        },
        "archetypes": [
          "close-range rusher",
          "SMG skirmisher",
          "heat-vent engineer"
        ],
        "flavor": "Aggressive red foundry crews push broad lanes and pause near vent cycles before rushing."
      },
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
      enemyTheme: {
        "faction": "Marsh Brood",
        "palette": {
          "primary": "#7BCB48",
          "secondary": "#273F20",
          "telegraph": "#E7F36A"
        },
        "archetypes": [
          "poison gardener",
          "island flanker",
          "spore support"
        ],
        "flavor": "Green-brown brood units shepherd players toward acid while bright yellow throat marks telegraph attacks."
      },
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
      enemyTheme: {
        "faction": "Maglev Corsairs",
        "palette": {
          "primary": "#8D5ECC",
          "secondary": "#2E214A",
          "telegraph": "#FF5FA8"
        },
        "archetypes": [
          "rail sniper",
          "cargo bulwark",
          "signal coordinator"
        ],
        "flavor": "Violet marksmen occupy long lanes and expose coral sight beams well before firing."
      },
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
      enemyTheme: {
        "faction": "Cryo Custodians",
        "palette": {
          "primary": "#72BCE3",
          "secondary": "#24435B",
          "telegraph": "#E1FAFF"
        },
        "archetypes": [
          "freeze caster",
          "ice drifter",
          "cryo tank"
        ],
        "flavor": "Pale custodians slow and divide space, using white geometric tells distinct from pickups."
      },
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
      enemyTheme: {
        "faction": "Solar Hierophants",
        "palette": {
          "primary": "#D8972C",
          "secondary": "#5E2816",
          "telegraph": "#FFE45E"
        },
        "archetypes": [
          "beam cantor",
          "sun shield",
          "ember lancer"
        ],
        "flavor": "Gold-red elites synchronize attacks with rotating beams and illuminate their next firing arc."
      },
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
  ].concat(EXPANSION_MAP_SPECS.map(buildExpansionMap)));

  const MAP_BY_ID = Object.create(null);
  for (let i = 0; i < MAPS.length; i++) MAP_BY_ID[MAPS[i].id] = MAPS[i];

  function buildExpansionMap(spec, index) {
    const colors = spec.colors;
    const hazardBase = 10 + Math.min(18, index * 0.45);
    const firstType = spec.hazardTypes[0];
    const secondType = spec.hazardTypes[1];
    return freezeMap({
      id: spec.id,
      name: spec.name,
      chapter: spec.chapter,
      description: spec.description,
      seedSalt: hashSeed('campaign-map|' + spec.id),
      progression: {
        campaignIndex: index + 6,
        unlockLevel: index + 18,
        unlockBosses: Math.min(50, index + 27),
        rewardMultiplier: Math.round((1.44 + index * 0.025) * 100) / 100,
        recommendedPower: 340 + index * 45,
        biomeFamily: spec.family
      },
      palette: {
        background: colors[0], floor: colors[1],
        gridMinor: hexToRgba(colors[2], 0.04), gridMajor: hexToRgba(colors[2], 0.105),
        border: colors[2], accent: colors[3], hazard: colors[4], prop: colors[5], fog: colors[6]
      },
      grid: { size: spec.gridSize, majorEvery: 3 + index % 3, angle: spec.gridAngle, lineWidth: 1 },
      ambient: {
        maxProps: 34 + index % 5 * 4,
        density: 0.000009 + index % 4 * 0.000001,
        types: [
          { id: spec.props[0], weight: 5, radius: [12, 24] },
          { id: spec.props[1], weight: 3, radius: [17, 31] },
          { id: spec.props[2], weight: 2, radius: [8, 16] }
        ]
      },
      hazards: [
        makeHazardSpec(spec.id + '_' + spec.hazardNames[0], firstType, 3 + index % 4, hazardBase, index),
        makeHazardSpec(spec.id + '_' + spec.hazardNames[1], secondType, 2 + (index + 1) % 4, hazardBase * 0.78, index + 3)
      ],
      enemyTheme: {
        faction: spec.enemyFaction,
        palette: {
          primary: spec.enemyPalette[0],
          secondary: spec.enemyPalette[1],
          telegraph: spec.enemyPalette[2]
        },
        archetypes: spec.enemyArchetypes.slice(),
        flavor: spec.enemyFlavor
      }
    });
  }

  function makeHazardSpec(id, type, count, damage, variant) {
    const spec = {
      id: id,
      type: type,
      count: count,
      damagePerSecond: Math.round(damage * 10) / 10,
      cycle: type === 'static_disc' || type === 'static_rect' ? 0 : 4.4 + variant % 5 * 0.45,
      activeFor: type === 'static_disc' || type === 'static_rect' ? 0 : 0.8 + variant % 3 * 0.22,
      telegraphFor: type === 'static_disc' || type === 'static_rect' ? 0 : 0.9 + variant % 4 * 0.16
    };
    if (type.indexOf('disc') !== -1) spec.radius = [48 + variant % 4 * 6, 78 + variant % 5 * 7];
    else spec.size = [type === 'rotating_beam' || type === 'sweep_lane' ? 920 + variant % 4 * 140 : 180 + variant % 4 * 24, 38 + variant % 3 * 9];
    if (type === 'moving_disc') spec.speed = [24 + variant % 4 * 4, 42 + variant % 5 * 5];
    if (type === 'rotating_beam') spec.angularSpeed = 0.14 + variant % 5 * 0.025;
    return spec;
  }

  function hexToRgba(hex, alpha) {
    const value = parseInt(hex.slice(1), 16);
    return 'rgba(' + (value >> 16 & 255) + ',' + (value >> 8 & 255) + ',' + (value & 255) + ',' + alpha + ')';
  }

  function freezeMap(map) {
    Object.freeze(map.progression);
    Object.freeze(map.palette);
    Object.freeze(map.grid);
    Object.freeze(map.enemyTheme.palette);
    Object.freeze(map.enemyTheme.archetypes);
    Object.freeze(map.enemyTheme);
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
    const obstacleRng = createRng(deriveSeed(runSeed, map.id, 'obstacles'));
    const safeZones = opts.safeZones || [{ x: world.width / 2, y: world.height / 2, radius: 260 }];
    const areaCount = Math.round(world.width * world.height * map.ambient.density);
    const propCount = Math.min(map.ambient.maxProps, Math.max(0, opts.propCount == null ? areaCount : opts.propCount));
    const props = new Array(propCount);
    const hazards = [];
    const obstacles = [];

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

    const obstacleCount = 8 + Math.floor(obstacleRng() * 6);
    for (let i = 0; i < obstacleCount; i++) {
      const radius = 52 + obstacleRng() * 54;
      const point = findPoint(obstacleRng, world, radius + 80, safeZones);
      obstacles.push({
        id: 'obstacle-' + i, type: i % 3 === 0 ? 'reactor_ring' : 'stone_ring',
        x: point.x, y: point.y, radius: radius, rotation: obstacleRng() * TAU,
        variant: Math.floor(obstacleRng() * 4)
      });
    }

    return {
      apiVersion: API_VERSION,
      mapId: map.id,
      seed: deriveSeed(runSeed, map.id, 'layout'),
      world: world,
      palette: map.palette,
      grid: map.grid,
      enemyTheme: map.enemyTheme,
      props: props,
      obstacles: obstacles,
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
