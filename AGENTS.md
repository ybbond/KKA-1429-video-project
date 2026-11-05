# KKA-1429 video project

A 3-minute Remotion video for the college subject "Allah dan Ciptaan", in Indonesian. `script.md` is the brief: a Computer Science student lets AI do everything and learns that AI should assist human work, not replace human responsibility.

The owner asked for SOLID and KISS. Prefer small changes that fit the structure below.

## Commands

```sh
bun run dev        # Studio preview, on localhost:3000 by default
bun run typecheck  # tsc --noEmit
bun run render     # writes out/main.mp4 (about 1 minute)
impeccable detect src/                                         # scan for UI/design anti-patterns
impeccable install -y --providers=antigravity --scope=project  # install/sync repo-scoped skill
```

Tools come from `mise.toml` (`bun`, `node` 22 because the Remotion CLI runs on Node, and `npm:impeccable` for the repo-scoped design skill). `out/` and `node_modules/` are gitignored.

## Agent skill (`impeccable`)

The repository uses the `impeccable` agent skill (`.agent/skills/impeccable/SKILL.md`), managed via `mise.toml` (`"npm:impeccable" = "4.8.0"`).

- **Setup / Re-sync:** run `mise install && impeccable install -y --providers=antigravity --scope=project` to install or update the skill in `.agent/skills/impeccable/`.
- **Usage:** use `/impeccable` workflows (`init`, `critique`, `audit`, `polish`, `typeset`, `colorize`, `animate`) and `impeccable detect src/` when designing, reviewing, or refining scenes and visual components.

## Structure

| Path | Responsibility |
|---|---|
| `src/timeline.ts` | Scene order and all caption text and timing. Checks the total length and reading speed. |
| `src/Main.tsx` | Plays the scenes in order, with fades and captions |
| `src/Root.tsx` | Registers the composition, with length from the timeline |
| `src/scenes/*.tsx` | One file per scene, visuals only |
| `src/components/Stage.tsx` | Backdrop and the 1920x1080 SVG canvas. Exports `GROUND_Y` and `Ground`. |
| `src/components/motion.tsx` | `useSeconds`, `ramp`, `Pop` |
| `src/components/characters.tsx` | `Person`, `Robot` |
| `src/components/labels.tsx` | `Tag`, `Bubble`, `Headline` |
| `src/components/props.tsx` | `Desk`, `Bulb` |
| `src/components/Captions.tsx` | Caption overlay (skips rendering when a caption's `text` is `""`, e.g. for title/credits cards) |
| `src/theme.ts` | `COLORS`, `FONT` |

Current scene order, with start times: Intro 0:00 (0.9s title card + 0.9s–5.0s Butlerian/O.C.B. opening quote card + 5.0s–16.0s globe intro), Meet 0:16, Discover 0:31, Growth 0:49, Slope 1:03, Hollow 1:23, Crisis 1:39, Realize 1:57, Mandate 2:12, Takeaway 2:34, Credits 2:52.

## How to change things

- **Add a scene:** create `src/scenes/X.tsx` and add one `TIMELINE` entry. Nothing else needs registering.
- **Total length:** `timeline.ts` throws unless captions add up to exactly `TARGET_SECONDS` (180, from `script.md`). If you add time, take it from another scene or change the target.
- **Caption speed:** `timeline.ts` throws above 18 characters per second. Caption `seconds` must come to a whole number of frames at 30 fps, and caption text must be unique within its scene because it is the React key.
- **Timing is coupled:** a scene lasts as long as its captions, and its animation cues are hard-coded in seconds within that scene. If you change a caption's duration, update the cues in that scene file.
- **Drawing:** scenes are SVG on a 1920x1080 canvas. Stand characters on `GROUND_Y` (their origin is at the feet). Captions cover roughly y > 900, so keep content above that.
- **Animation:** derive everything from the current frame through `useSeconds`, `ramp` and `Pop`. Use Remotion's `random(seed)`, not `Math.random`, and avoid `setTimeout` or CSS animations, which do not render reliably.
- **Colours:** use `COLORS` from `theme.ts`.
- **Flashing:** keep alarm effects slow, like the pulse in `Crisis.tsx`, for photosensitive viewers.

## Verifying a change

- **Do not automatically run `bun run render` after every prompt.** Changes in `src/` hot-reload directly in the owner's open Remotion Studio, and full video rendering takes ~1 minute. Only run `bun run render` when the owner explicitly asks to render or verify rendered frames.
- Run `bun run typecheck` (or `impeccable detect src/`) for fast checks.
- When asked to render and inspect frames:

```sh
bun run render
ffmpeg -y -v error -i out/main.mp4 -vf "fps=1/5,scale=640:-1,tile=6x6" -frames:v 1 <scratch-dir>/sheet.png
```

Frames sampled this way show position and overlap problems, not how the motion feels, so say so if nobody has watched the video play.

## Known limits

- **No audio:** there is no voiceover, music or sound effects. The story is carried by captions. macOS's Indonesian voice (Damayanti) is installed but sounds robotic, and the owner has not decided on a voiceover. `TIMELINE` captions are the text to record.
- **Font:** the font stack only matches on macOS (see the `shortcut:` comment in `theme.ts`).
- **Style:** it follows Kurzgesagt's flat shapes, bright colours and constant motion, but the drawings are much simpler.
- **Tag and bubble width:** estimated from character count (`CHAR_WIDTH` in `labels.tsx`), so check long text in a frame.

## Content not yet confirmed by the owner

`script.md` has no narration, so these were written by the previous agent:

- All caption text, and the on-screen labels in the scenes.
- The student's name, "Raka".
- The demo scene as the "real problem" in `Crisis.tsx`.
- The Kejadian 2:15 quote in `Mandate.tsx`, which was written from memory. Check it against the owner's Bible translation and course material.

## Studio pitfalls

- **`SyntaxError: Unexpected token '<'` in the Studio:** most likely a stale browser tab (the owner uses Safari). The server answers a missing hot-update file with its HTML page and status 200. This was not reproduced in Safari itself, but the wording matches Safari's engine loading HTML as a script, and the bundle parses fine there. Open a new tab or hard-reload before debugging code. If it persists, find the `.js` request whose response starts with `<!DOCTYPE` in Web Inspector.
- **The owner may have their own Studio running on port 3000.** Do not kill it. The process renames itself to `npx remotion studio`, so `pkill -f` by port flag misses it and `pkill -f "remotion studio"` hits every Studio, including the owner's. Start your own with `--port=<other> --no-open` and stop it by PID from `lsof -nP -tiTCP:<port> -sTCP:LISTEN`.
- **Do not make throwaway edits in `src/` for experiments.** They hot-reload into the owner's open Studio. Test on a copy outside the project: copy `src`, `package.json`, `tsconfig.json` and `remotion.config.ts`, symlink `node_modules`, and pass `--bundle-cache=false`.

## Git

Commit only when asked. The video work so far is staged but not committed.
