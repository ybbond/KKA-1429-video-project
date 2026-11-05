# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary audience:** The **Allah Dan Ciptaan | Class 2026 (KKA 1429)** course lecturer and fellow university students watching the video as a course submission and/or in-class screening.
- **Creators (Kelompok 15):**
  - Frans Jesky Yeremi (`01086250003` - Sistem Informasi)
  - Sisilia Gunung Ata Kewae (`01086250017` - Sistem Informasi)
  - Vick Rab Wilbert (`01085250019` - Informatika)
  - Willy Lengkong (`01086250001` - Sistem Informasi)
  - Winson Winson (`01085250003` - Informatika)
  - Yohanes Bandung Bondowoso (`01085250015` - Informatika)

## Product Purpose

A 3-minute (180-second) animated explainer video in Indonesian for the college subject "Allah dan Ciptaan" (KKA-1429), titled *The Student Who Let AI Do Everything*. It follows a Computer Science student who initially uses AI to grasp difficult programming concepts, gradually delegates all assignments, projects, and decisions to AI, and hits a crisis when he can no longer understand or fix work submitted under his own name. Connecting this arc to the Cultural Mandate, the video demonstrates that humans are called to work and cultivate creation—and that AI should assist human work, not replace human responsibility.

Success means delivering a clear, relatable 3-minute narrative (beginning, conflict, and resolution) that holds attention during class screening, communicates the theological and practical takeaway with clarity, and renders cleanly to `out/main.mp4`.

## Positioning

A programmatic, frame-deterministic Remotion SVG animation tailored specifically to the intersection of a Computer Science student's AI workflow and the Christian Cultural Mandate ("Allah dan Ciptaan"), where every visual beat and scene transition is mathematically locked to Indonesian reading speed and future voiceover timing.

## Operating Context

- Delivered as a `1920x1080`, 30 fps MP4 (`out/main.mp4`) for course submission and classroom presentation, with voiceover/audio to be added in a later pass.
- Currently carries the full narrative through on-screen Indonesian captions (`src/timeline.ts`), which also serve as the script and timing track for the planned voiceover.
- Developed and previewed on macOS via Remotion Studio (`bun run dev`), typechecked with `bun run typecheck`, and visually verified via full MP4 render (`bun run render`) plus sampled contact sheets (`ffmpeg`).

## Capabilities and Constraints

- **Strict 180-second runtime & reading-speed guardrails:** `src/timeline.ts` enforces `TARGET_SECONDS = 180` (5,400 frames at 30 fps) and `MAX_CHARS_PER_SECOND = 18`. Every caption duration must resolve to a whole number of frames, and caption strings must be unique within a scene.
- **Coupled scene timing:** Each scene in `src/scenes/*.tsx` lasts exactly as long as its captions in `TIMELINE`, with animation cues (`useSeconds`, `ramp`, `Pop`) hard-coded in seconds within the scene. Changing caption durations requires updating the corresponding scene cues.
- **Deterministic frame-driven motion:** All motion and randomness must derive from the current frame (`useSeconds`, `ramp`, `Pop`, and Remotion's seeded `random()`), never `Math.random()`, `setTimeout`, or CSS animations.
- **Canvas & safe-zone geometry:** Scenes render on a `1920x1080` SVG canvas (`src/components/Stage.tsx`) with characters standing on `GROUND_Y` (`780`). Captions occupy roughly `y > 900`, so scene visuals and labels must stay above `y = 900`.
- **Architecture (SOLID & KISS):** One visual component per scene (`src/scenes/*.tsx`), shared visual primitives (`Stage`, `motion`, `characters`, `labels`, `props`, `Captions`), and centralized colours/typography in `src/theme.ts`.
- **Open / changeable story specifics:** While the core narrative arc, Cultural Mandate connection, and practical takeaway from `script.md` are fixed, several details drafted in code—the protagonist's name ("Raka"), the broken project demo in `Crisis.tsx`, the exact Kejadian 2:15 quote in `Mandate.tsx`, and specific Indonesian caption/label phrasings—are working defaults and remain open to change if stronger alternatives are found.

## Brand Commitments

- **Kurzgesagt-inspired flat animation (`script.md`):** Bright flat vector geometry, bold night/neon contrast (`src/theme.ts`), expressive simplified character/robot silhouettes, and continuous subtle motion on a `1920x1080` stage.
- **Indonesian academic & reflective voice:** Clear, natural Indonesian suitable for university peers and theology/ethics coursework.

## Evidence on Hand

- `script.md`: Canonical story brief, theme, Cultural Mandate connection, and practical takeaway.
- `AGENTS.md`: Architecture guide, timing invariants, Studio safety rules, and verification commands.
- `src/timeline.ts` & `src/scenes/*.tsx`: Complete 10-scene baseline implementation (`Intro`, `Meet`, `Discover`, `Growth`, `Slope`, `Hollow`, `Crisis`, `Realize`, `Mandate`, `Takeaway`).
- **Confirmed absences:** No voiceover recording, background music, or sound effects are included yet; future work must not fabricate claims about existing audio tracks until they are added.

## Product Principles

1. **Stewardship over shortcutting:** Visual metaphors and narrative beats must keep the focus on human agency, learning, and moral responsibility—portraying AI as a capable tool alongside historical tools, never as a substitute for the worker.
2. **Caption-first legibility and timing:** Because captions carry the story today and anchor voiceover tomorrow, visual composition must respect reading pace (`<= 18` chars/sec), avoid competing text clutter, and keep critical action clear of the `y > 900` caption zone.
3. **Deterministic, modular craft (SOLID & KISS):** Prefer small, composable SVG primitives and pure frame-based math over complex stateful abstractions so every frame renders identically in Studio and `out/main.mp4`.
4. **Earned narrative progression:** Let the visual atmosphere evolve clearly across the 10 scenes—from late-night struggle, to collaborative discovery, to over-reliance and hollow praise, through crisis, and finally into grounded realization and calling.

## Accessibility & Inclusion

- **Photosensitive viewer safety:** Alarm and crisis visuals (such as the red overlay pulse in `Crisis.tsx`) must remain slow and low-frequency to prevent unsafe flashing or strobing.
- **Full caption coverage & readable pacing:** All narrative content is presented via high-contrast captions enforced at `<= 18` characters per second, ensuring the video remains fully comprehensible without audio.
