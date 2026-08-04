# Recent generated asset intake

The 4 August art drop contains 260 files. After hash deduplication and exclusion of unrelated renders, the game owns 216 unique assets. The authoritative audit and source manifest live in `/Users/shreyasraj/Downloads/SnakesWithGuns_Recent_Art_Drop`.

## Runtime bundle now used

- `www/assets/generated/ui/title-screen-background.webp`: clean text-free 16:9 title art.
- `www/assets/generated/maps/*.webp`: one optimized generated floor per playable biome.
- `www/assets/generated/bosses/boss-01.webp` through `boss-20.webp`: generated encounter portraits loaded only while a boss meter is visible.
- Existing generated snake, weapon, pickup, crate, coin, and combat-FX sheets remain the boot-time combat bundle.

The 433 MB source-art library is deliberately not copied into `www`. Shipping all production masters would increase download time and memory pressure without making the arena look better. Screen-specific artwork should be promoted from the audited manifest into an optimized lazy bundle as its consuming screen is implemented.

## Generated title art

Mode: edit from the approved title-screen concept. The clean runtime edit removed all baked typography and UI while preserving the colossal gate, green gunslinger, pink princess, orange portal, and dark left-side negative space for live HTML controls.

## Background removal

Only four opaque isolated sheets were processed with Replicate `bria/remove-background`. All other opaque files are intentional full-screen scenes or tileable terrain and retain their backgrounds.
