# Content Index — Python & C++

Design rule for every snippet: **it must be worth typing.** Prefer code dense in
the syntax that's genuinely hard to type — brackets, template angle brackets,
pointer sigils, decorators, comprehensions, capture lists. Prose-like code
(long variable names, plain assignments) is filler. Cut it.

Target snippet length: 5–25 lines. Anything longer is a "long form" pack —
the build script warns (not fails) past 25.

---

## Structure

```
snippets/
  python/
    core-syntax/
    dsa/
    numerical/
    ml/
    data/
    functional-meta/
    concurrency/
    nways/
  cpp/
    core-syntax/
    stl/
    templates-meta/
    dsa/
    low-latency/
    concurrency/
    cuda/
    nways/
tools/
  build.mjs        # snippets/** -> dist/index.json + dist/shards/*.json
dist/               # generated, committed so GitHub Pages needs no build step
```

One file = one snippet. Filename is the ID. Frontmatter holds metadata, body
holds the code. Adding content = dropping in a file and running
`node tools/build.mjs`. No schema ceremony.

```
---
lang: cpp
topic: templates-meta
tier: 3
tags: [sfinae, type-traits]
note: enable_if is the pre-concepts way to constrain a template.
---
template <typename T, std::enable_if_t<std::is_integral_v<T>, int> = 0>
T twice(T x) { return x * 2; }
```

Path and frontmatter must agree: `snippets/<lang>/<topic>/<name>.md` becomes
id `<lang>/<topic>/<name>`, and the build fails if `lang:`/`topic:` in the
frontmatter don't match the directory — that redundancy exists to catch a
file moved without updating its metadata.

`note` is shown **after** you finish, never during. That's the whole learning
layer — no quizzes, no explanations cluttering the typing screen.

Tiers: 1 = syntax atoms, 2 = idioms, 3 = advanced, 4 = expert/obscure.

### `nways/` — one adaptation from the original spec

The original plan called for "one file with numbered variants" per pack. The
engine's snippet schema is one code block per snippet (that's what the typing
model, the metrics, and the keystroke log all key off), so instead each
technique is its own file under `nways/`, tagged `nways` and grouped by
`lang`. Selecting `?topic=nways` and cycling with Tab+Enter gives the same
"same problem, several techniques, back to back" feel the spec asked for,
without a second content shape for the engine to understand. Fewer states.

---

## Build pipeline

```
node tools/build.mjs            # validate every snippet, write dist/
node tools/build.mjs --check    # validate only, write nothing (CI-friendly)
```

The build:
- Parses the minimal frontmatter (no YAML dependency — `key: value` lines
  and `[a, b]` arrays are all the format supports).
- Validates: `lang` is `python`/`cpp` and matches the path, `topic` matches
  the path, `tier` is an integer 1–4, `note` is required and one line, code
  is non-empty after the engine's own normalization (tabs→4 spaces, trim
  trailing whitespace, strip leading/trailing blank lines), and every `id`
  is unique.
- Warns (does not fail) on snippets outside the 5–25 line target.
- Groups into one shard per `lang-topic` pair, sorted, so an unrelated edit
  produces a small diff.
- Writes `dist/index.json` (the shard list) and `dist/shards/*.json`.

Errors block the build; warnings don't. Zero dependencies — plain Node.

## How every snippet in this corpus was verified

Writing 480 snippets by hand and trusting them by eye was not good enough —
the process below is what actually shipped, and it caught real bugs (listed
at the end so the failure modes are on record, not just the success count).

**Python (319 snippets) — executed, not just parsed.**
Every snippet's body is run under the real interpreter with empty stdin.
`ModuleNotFoundError` is the only tolerated failure class before a library is
installed; everything else must exit 0. `numpy`, `pandas`, `scikit-learn`,
and `torch` (CPU build) were installed specifically so the numerical, data,
and ml tracks execute for real rather than being skipped. Snippets that touch
the filesystem or stdin are allowed to fail with the specific IO exception
they're demonstrating.

**Differential testing against brute force.**
Parsing and running isn't enough to catch a wrong answer that happens not to
crash. ~1500 randomized trials compared the "hard" algorithms — segment
tree, Fenwick tree, sparse table, lazy propagation, KMP, Z-algorithm,
Rabin-Karp, Manacher, monotonic stack/deque, LIS, edit distance, coin
change, subset-sum bitset, matrix-chain DP, digit DP, bitmask DP, Dijkstra,
Bellman-Ford, Floyd-Warshall, Tarjan vs. Kosaraju SCC, Kruskal vs. Prim MST —
against reference implementations (brute force, `itertools`-based
enumeration, or a second independent algorithm for the same answer). Zero
disagreements survived to the final corpus.

**C++ (161 snippets) — compiled, then executed under sanitizers.**
Every snippet is compiled with `g++ -std=c++20 -fsyntax-only`, either
as top-level declarations or wrapped in `int main` depending on its shape.
146 of 161 compile this way (15 are CUDA — see below). Snippets exposing a
zero-argument `demo()` are then compiled for real with
`-fsanitize=address,undefined -fno-sanitize-recover=all` and *executed*, not
just compiled — 136 ran clean, catching real undefined behavior (use-after-move,
data races on plain non-atomics, out-of-bounds) that a syntax check cannot see.

**CUDA (15 snippets) — no compile gate; verified in the actual typing engine
instead.** This sandbox has no `nvcc` and no GPU. These snippets got careful
manual review plus a bracket/string/comment-aware balance checker (catches
the error class most likely from hand-written template-heavy code: an
unclosed `<`, `{`, or `(`). Every one of the 15 was then typed start-to-finish
through a real headless-browser session against the actual built `dist/`
corpus, confirming each renders, tokenizes, and scores 100% when typed
correctly — the one thing that actually matters for this product, even
without a compiler to confirm the CUDA semantics are perfect.

**Self-check sanity pass.** Many snippets end with a `print(...)` /
`std::cout` assertion of their own claim (`np.allclose(...)`,
`a.use_count() == ...`). Every snippet's stdout was scanned for a literal
`False` that wasn't part of a deliberate before/after contrast (e.g. z-score
vs. robust z-score on purpose flagging different points) — this caught three
wrong claims in prose/notes that the code itself didn't fail on.

**End-to-end in the real engine.** After building the real `dist/`, a
headless-browser session loaded it over http (the served code path, not
`file://`), cycled through every CUDA snippet, ran a tier-4 DSA snippet
through the missed-line practice drill, and exercised the `?lang=&topic=&tier=`
filters — all against the actual generated shards, not a fixture.

### Bugs this process actually caught, before they reached the corpus

- A weave loop in linked-list reordering read `second.next` after it had
  already been overwritten (`NoneType has no attribute 'next'`).
- `merge_intervals`'s helper compared a `list` against a `tuple` mid-sort
  because of an unnecessary type mismatch in how the new interval was cast.
- `except*` (exception groups) does not allow a bare `return` inside its
  block — a real Python 3.11+ syntax rule, not caught by `ast.parse`
  (only by `compile()`, which is why the checker uses the latter).
- A from-scratch 2-layer backprop net diverged to `NaN` at its stated
  learning rate; swept `hidden × lr × init-scale` empirically instead of
  guessing a fix.
- `std::to_underlying` is C++23, not C++20 — compiled under one standard,
  silently wouldn't under the project's declared one.
- `std::views::zip` is likewise C++23-only.
- A CRTP class with two empty base classes plus `int x, y` members hit a
  real C++17+ aggregate-initialization rule (bases count as the first
  initializer-list elements), so `Point a{1, 2}` didn't do what it looked
  like it did — needed an explicit constructor instead.
- The test harness itself had a bug before the snippets did: an injected
  `struct Node` stand-in (meant to help snippets that reference an
  undefined type) collided with snippets that legitimately define their
  own `Node`, `TreeNode`, or `ListNode`.
