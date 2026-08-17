# ctype

A Monkeytype-style typing trainer for source code. Python and C++. No compiler,
no execution, no output — pure transcription practice.

One file, `index.html`. No npm, no framework, no build step, no CDN. Open it
from disk or serve it from GitHub Pages; it behaves identically either way.

The page opens with a snippet already on screen and a blinking caret. There is
no start button, no modal, no language picker. Your first keystroke starts the
timer.

## Quick start

```
open index.html          # macOS      — or just double-click it
xdg-open index.html      # Linux
```

To host it: push, then in **Settings → Pages** set the source to this branch
(root). `index.html` at the repo root is the whole site; the `.nojekyll` file
next to it tells GitHub Pages to serve the repo as static files instead of
running it through Jekyll — without it, Jekyll would try to build the 500
Markdown files under `snippets/` into pages on every deploy.

## The typing model

This is the part worth reading. It is not the same as typing prose.

**Leading whitespace is never typed.** The engine supplies it. When you advance
to a new line the caret lands on the first non-whitespace character. Indentation
is rendered, dimmed, so the shape of the code stays visible, but it is not part
of the typable character stream — it never reaches WPM, accuracy, errors, or the
keystroke log.

**Two strictness rules, by character class:**

| | Behaviour |
|---|---|
| In-line characters | **Forgiving.** A wrong key is marked incorrect, counted as an error, and the caret advances anyway. Backspace un-marks and steps back. Same as Monkeytype, so existing muscle memory carries over. |
| Line breaks | **Strict.** Enter advances only at the end of a line. Enter pressed mid-line is an error and moves nothing. A printable character where a break is expected is an error and moves nothing. |

The asymmetry is deliberate: bracket-dense code desyncs badly if line structure
is allowed to drift, but per-character strictness makes typing feel like a
punishment.

**Blank lines are auto-consumed.** One Enter at the end of a line advances to the
next non-blank line, skipping any blank lines between.

**Backspace never crosses a line break.** At the first typable character of a
line it does nothing.

### Normalization

Applied once when a snippet loads, before rendering: tabs become 4 spaces,
trailing whitespace is stripped from every line, leading and trailing blank
lines are stripped. Interior blank lines stay.

## Keys

No action needs the mouse.

| Key | |
|---|---|
| `Tab` `Enter` | Next snippet (Monkeytype convention; Tab's focus behaviour is suppressed) |
| `Enter` | On the results panel: next snippet |
| `Esc` | Restart the current snippet |
| `p` | On the results panel: practise just the lines you made errors on |
| `e` | On the results panel: export history as JSON |

### Missed-line practice

After a run with errors, `p` builds a drill from only the lines you fumbled, in
file order, with their original indentation. A drill is an ordinary snippet, so
everything works on it unchanged — including `p` again, which narrows to
whatever you missed in the drill. `Esc` retries the drill; `Enter` leaves it for
a fresh snippet.

Drill sessions are saved to history flagged `practice: true`. Normal records
never carry the flag, so a clean WPM trend is `history.filter(s => !s.practice)`.

## Filtering

All optional, all combinable:

```
index.html?lang=cpp
index.html?lang=python&topic=decorators
index.html?lang=cpp&topic=templates-meta&tier=3
```

`lang` is `python` or `cpp`. An empty result falls back to the full pool rather
than showing a blank screen, so a nonsense filter still gives you something to
type. Combine `topic` from the table below with `tier` (`1`–`4`, easiest to
hardest) to drill exactly what you want.

## Topics

```
index.html?lang=python&topic=dsa
index.html?lang=cpp&topic=templates-meta&tier=4
```

| Python `topic=` | snippets | | C++ `topic=` | snippets |
|---|---|---|---|---|
| `core-syntax` | 70 | | `core-syntax` | 28 |
| `dsa` | 92 | | `dsa` | 25 |
| `numerical` | 47 | | `stl` | 28 |
| `ml` | 35 | | `templates-meta` | 26 |
| `data` | 33 | | `low-latency` | 21 |
| `functional-meta` | 21 | | `cuda` | 15 |
| `concurrency` | 8 | | `concurrency` | 8 |
| `nways` | 25 | | `nways` | 18 |

`nways` is the odd one out: instead of one topic, it's the same handful of
problems (fibonacci, dedup, parallel sum, matrix multiply, singleton...) each
solved several different ways, meant to be typed back to back with
`Tab`→`Enter` so the contrast sticks.

## Snippets

Ten snippets are embedded in `index.html` itself, so the engine is fully
usable with no corpus on disk: 5 Python, 5 C++, tiers 1–4, with heavy
coverage of `{}`, `<>`, `::`, `->`, `**kwargs`, and `[&]`.

The real corpus lives in `snippets/` — 500 snippets (331 Python, 169 C++)
across the 16 topics above, detailed in [`CONTENT.md`](CONTENT.md), which
also documents how every one of them was verified (executed, differentially
tested against brute force, compiled and run under ASan/UBSan, or — for the
CUDA track, where no compiler is available here — typed end-to-end through
the real engine). `dist/` is the built, committed output; regenerate it
after editing `snippets/` with:

```
node tools/build.mjs            # validates every snippet, writes dist/
node tools/build.mjs --check    # validate only, for CI
```

When served over http(s), the page fetches `./dist/index.json` — an array of
shard paths, resolved relative to `dist/` — then fetches and merges those
shards, replacing the embedded ten. On any failure (including `file://`,
where the fetch is skipped outright) it stays on the embedded set silently.

```
dist/index.json          ["shards/python-core-syntax.json", ...]
dist/shards/python-core-syntax.json   [ {snippet}, {snippet}, ... ]
```

A snippet:

```js
{
  id: "cpp/templates-meta/fold-expressions",
  lang: "cpp",             // "python" | "cpp"
  topic: "templates-meta",
  tier: 3,                 // 1..4
  code: "template <typename... Ts>\nauto sum(Ts... xs) { return (xs + ...); }",
  note: "Fold expressions collapse a parameter pack without recursion."
}
```

`note` is shown on the results panel only, never while you type. Entries with an
unknown `lang`, or whose `code` normalizes to nothing, are dropped.

Two notes on loading. On `file://` the fetch is skipped outright rather than
attempted and caught — a blocked `file://` request logs a console error that
`try`/`catch` cannot suppress, and the fallback is the same either way. And a
corpus that arrives before your first keystroke swaps the snippet in; one that
arrives mid-session does not, so it can never yank the code out from under your
fingers.

## Metrics

```
wpm      = (correctChars / 5) / minutesElapsed
raw      = (totalChars / 5)   / minutesElapsed
accuracy = correctChars / totalKeystrokes
errors   = count of incorrect keystrokes
```

Auto-supplied indentation is excluded from all four. The timer starts on the
first keystroke, not on load.

Counters are keystroke-based and monotonic: backspace restores the display and
the caret, it does not refund an error. So a perfect run reads exactly 100% and
0 errors, and fixing a mistake still shows as a mistake.

## Storage

`localStorage`, one key, `ctype.history`: an array of session records, FIFO
capped at 200.

```js
{ id, lang, topic, tier, wpm, raw, acc, errors, durationMs, endedAt, keys: [...] }
```

Every session carries its full keystroke log:

```js
{ i, expected, typed, t, correct }   // i = index in the typable stream
                                     // t = ms since the first keystroke
```

Capped at 5000 entries per session. Nothing analyses this yet — it is the input
to token-level weak-spot detection later, and it cannot be reconstructed after
the fact, which is why it is captured from day one. Backspaces are not logged: an
entry records an attempt against an `expected` character, and a backspace has no
expectation to compare against.

All `localStorage` access is wrapped — it throws in some `file://` contexts and
the app keeps working without it, holding the session list in memory. On a quota
error the oldest session is shed and the write retried, since 200 keystroke logs
can outgrow the ~5 MB budget.

`e` on the results panel downloads the history as JSON. There is no import.

## Theming

Every colour is a custom property on `:root` at the top of the file. A new theme
is a diff of that block.

```css
--bg  --fg  --muted  --dim  --err  --err-bg  --caret  --font  --size  --lh
```

`--fg` is correct text, `--muted` is pending, `--err` is incorrect, `--dim` is
the auto-supplied indent (between muted and background). An incorrect *space*
gets an `--err-bg` background tint, because a red space is invisible.

## Performance

Input latency is the whole product. Every character is its own `<span>`, grouped
into line elements. A keystroke writes one `className` and one caret transform —
the snippet is never re-rendered. Caret offsets are measured once per snippet
into a lookup table, so typing never reads layout. Line changes scroll the
active line toward centre; same-line keystrokes never scroll.

Measured in Chromium: 200 keystrokes dispatched in one synchronous loop are
handled in ~4 ms, about 0.02 ms per key, with the caret landing on the exact
expected stream index.

## Not in v1

No accounts, leaderboards, syntax highlighting, sound, settings UI, theme
switcher, daily snippet mode, recall mode, weak-spot dashboard, history charts,
CLI, multiplayer, achievements, compiler, or execution.
