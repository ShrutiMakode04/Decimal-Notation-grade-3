# Product Requirements Document (PRD)

## Decimal Notation for Money | Grade 3 Math
### Intellia SG | Singapore Primary Mathematics Curriculum (MOE), aligned to global Grade 3 math standards

═══════════════════════════════════════════════════════════════════════════════

## 1. Executive Summary

This document defines product requirements for the **"Decimal Notation for Money"** interactive lesson module, delivered within Intellia SG's **Grade 3 Math** program. The module targets Grade 3 students aged 8–9 worldwide and teaches the concept of writing, reading, comparing, and operating on amounts of money using decimal notation (e.g. $4.65), fully aligned with the Singapore MOE Mathematics Framework (Primary 3, Money sub-strand) and cross-referenced against the global Grade 3 math syllabus (Common Core 3.NF / 3.MD money concepts, Cambridge Primary, IB PYP) to ensure the module is usable by students of all countries, not Singapore alone.

The product is a standalone web page to be hosted at:

`https://intelliasg.com/courses/grade-3-math/lessons/decimal-notation-for-money/`

It is built using **React (Vite + JSX, JavaScript/CSS)** and designed to **strictly mirror the visual and UX structure** established at `https://equal-tau.vercel.app/` and the repository `https://github.com/dsamyak/equal`. No deviation from this established phase structure, visual language, or component pattern is permitted — this reference implementation is the binding source of truth for UI/UX decisions in this document.

Audio narration uses **ElevenLabs exclusively** (Voice: Alice, Voice ID: `Xb7hH8MSUJpSbSDYk0k2`, Model: `eleven_multilingual_v2`) with pre-generated static `.mp3` files for all phase narrations and dynamic generation for practice questions — matching the pipeline already established and used in the Equal Groups reference module.

The module follows Intellia's proven 5-phase learner journey, unchanged in structure from the reference implementation, re-themed for money and decimals:

| Phase | Name | Purpose |
|---|---|---|
| Phase 1 | **WONDER** | Curiosity hook — a relatable money puzzle |
| Phase 2 | **STORY** | Narrative-based concept introduction (global, multicultural characters) |
| Phase 3 | **SIMULATE** | Sandbox-style interactive simulation (3 stations: coin counter, decimal builder, price comparison) |
| Phase 4 | **PLAY** | IntelliPlay™ gamified practice (100 randomised questions, every question and every option randomised on every attempt) |
| Phase 5 | **REFLECT** | Journal / LearnFlow AI prompt + completion badge |

═══════════════════════════════════════════════════════════════════════════════

## 2. Product Vision & Goals

### Vision

To make decimal notation for money intuitive, visual, and joyful for 8–9 year old learners anywhere in the world — building a concrete-pictorial-abstract (CPA) bridge from physical coins/notes to the abstract decimal point, through animated simulations, an engaging multicultural story, and adaptive gamified challenge — entirely matching the proven Equal Groups learning model in tone, pacing, and UI.

### Goals

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 5 phases |
| Practice Engagement | ≥90% attempt at least 10 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥15 minutes per session |
| Curriculum Alignment | 100% aligned to Singapore MOE Primary 3 Money (decimal notation sub-topic) and cross-checked against global Grade 3 syllabi |
| Phase Progression | ≥80% reach Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |
| Question Randomisation Integrity | 100% of sessions present a different question order and a different distractor set than any prior session |

═══════════════════════════════════════════════════════════════════════════════

## 3. Target Users

### Primary: Grade 3 Students (Age 8–9), Global

- Comfortable readers; can follow multi-sentence word problems with support
- Learn concretely first (Concrete → Pictorial → Abstract), now extending into the abstract decimal notation itself
- Need frequent micro-rewards but can sustain slightly longer focus than Grade 1 learners (sessions ~15 min)
- **Global context**: the module avoids any single nation's currency, denomination set, or cultural assumption baked into the core logic. Currency symbol and unit names ("dollars and cents") are used as the **default international representation** consistent with the Singapore MOE syllabus and widely recognised in global Grade 3 math syllabi (Common Core, Cambridge Primary, IB), with all character names drawn from a deliberately diverse, globally-recognisable name pool (see Section 7.4) rather than any single nationality

### Secondary: Parents & Teachers

- Assign as classwork or enrichment homework, anywhere in the world
- Expect strict MOE/Grade 3 curriculum alignment for the decimal-notation-for-money sub-topic specifically
- Monitor via phase completion indicators embedded in the lesson page

═══════════════════════════════════════════════════════════════════════════════

## 4. Curriculum Alignment — Money: Decimal Notation (Grade 3 / Primary 3)

**Topic:** Money — Decimal Notation
**Programme:** Intellia SG Grade 3 Math — Section: Money
**Lesson URL:** `https://intelliasg.com/courses/grade-3-math/lessons/decimal-notation-for-money/`
**Source Course Page (to match exactly):** `https://intelliasg.com/courses/grade-3-math` *(user-supplied; final content must be cross-checked against this page once uploaded, and only topic-relevant material from it is to be used)*

### Source References

- **Singapore MOE Primary Mathematics Syllabus (Primary 1–6)**
  → Strand: Measurement and Geometry
  → Sub-strand: Money
  → Primary 3 anchor: "Money in decimal notation" — writing amounts of money in decimal notation, converting between dollars-and-cents and decimal form, and adding/subtracting money in decimal notation
- **Global Grade 3 Math Syllabus cross-reference** (used only where it reinforces or extends, never contradicts, the MOE anchor):
  → Common Core-aligned Grade 3 money and decimal-readiness benchmarks (counting and representing money amounts, comparing values)
  → Cambridge Primary Mathematics Stage 3 (Money: total cost of items, giving change, recognising decimal notation in money contexts)
  → IB PYP Grade 3 numeracy benchmarks on money and place value

### MOE Learning Objectives Covered

| Code | Objective |
|---|---|
| LO1 | Recognise that $1 = 100 cents and express this relationship in decimal notation |
| LO2 | Write a given amount of money in decimal notation (e.g. 4 dollars 65 cents → $4.65) |
| LO3 | Read and say an amount of money written in decimal notation correctly (e.g. $4.65 → "four dollars and sixty-five cents") |
| LO4 | Convert an amount of money in decimal notation to cents only, and vice versa |
| LO5 | Compare two or more amounts of money expressed in decimal notation |
| LO6 | Add and subtract amounts of money in decimal notation (with and without regrouping) |
| LO7 | Solve word problems involving addition and subtraction of money in decimal notation, in real-life contexts (shopping, saving, allowance) |

### CPA Progression for This Lesson

| Stage | Representation |
|---|---|
| Concrete | Play coins and notes counted and combined digitally (simulated coin/note tray) |
| Pictorial | Place-value chart showing dollars (ones/tens) and cents (tenths/hundredths) with a visible decimal point separator |
| Abstract | Standard decimal notation: `$4.65`; addition/subtraction of decimal money amounts using the standard algorithm |

### Number Ranges

| Level | Range |
|---|---|
| Easy | Amounts up to $10.00, whole-dollar or simple cent values (e.g. $1.50, $5.00) |
| Medium | Amounts up to $50.00, two-decimal-place cent values, single regrouping in addition/subtraction |
| Hard | Amounts up to $100.00, mixed amounts, multi-step word problems, regrouping in both addition and subtraction |

### Vocabulary Focus (age-appropriate)

"decimal point", "decimal notation", "dollars", "cents", "dollars and cents", "in all", "altogether", "change", "how much more", "how much less", "total cost", "regroup"

### Explicitly Excluded (per MOE syllabus scope for this level)

- Multiplication or division of money by a decimal
- Combinations of currencies (foreign exchange)
- Money amounts beyond two decimal places

═══════════════════════════════════════════════════════════════════════════════

## 5. The 5-Phase Learner Journey (Intellia Model — Strictly Matching equal-tau.vercel.app)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (5-step visual tracker, top bar)                │
│ Welcome: "Hello! Today we're going to learn Decimal Notation for Money! 🪙" │
│ Lesson badge shown (locked). 5 glowing phase dots visible.                  │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈ 1–2 min)                                                │
│                                                                              │
│ Hook: "Sarah has 4 one-dollar coins and 3 quarters in her piggy bank. Her   │
│ friend says she has '$4.75'. What does that funny dot in the middle mean?" │
│                                                                              │
│ Visual: Animated coins dropping into a piggy bank one by one, counter ticks │
│ Animation: Coins merge into a glowing price tag reading "$4.75"            │
│ Narration (ElevenLabs): Alice voice reads the hook warmly                  │
│ → Mascot (LearnFlow robot) appears with a curious expression               │
│ → "Let's find out what that little dot really means!"                     │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈ 2–3 min)                                                 │
│                                                                              │
│ Narrative: John and Sarah run a weekend lemonade stand                     │
│ Panel 1: "John sells a cup of lemonade for 1 dollar and 50 cents. 🍋"      │
│ Panel 2: "He writes it on the price board as $1.50. That dot is special!" │
│ Panel 3: Place-value chart appears — Dollars | . | Tenths | Hundredths    │
│ Panel 4: "The dot is called the DECIMAL POINT. Dollars on the left,        │
│           cents on the right!"                                            │
│ Panel 5: "Sarah counts the cash box: 6 one-dollar coins and 25 cents.      │
│           That's $6.25 altogether!"                                        │
│ Panel 6: "At the end of the day, they had $1.50 + $6.25 = $7.75. Time to   │
│           split it fairly between them! 💰"                                │
│                                                                              │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration       │
│ → Key vocabulary highlighted: "decimal point", "dollars", "cents"          │
│ → Place-value chart diagram introduced visually (column-based, animated)  │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈ 5–6 min)                                              │
│                                                                              │
│ 3 Interactive Stations — student must complete all 3 to advance            │
│                                                                              │
│ Station A — "The Coin Counter" (Concrete)                                  │
│   Drag coins and notes into a tray; live decimal total updates as a        │
│   ticking price-tag readout: "$0.00" → "$4.65"                            │
│                                                                              │
│ Station B — "Build the Decimal" (Pictorial)                                │
│   A place-value chart with empty Dollar / Tenths / Hundredths slots.       │
│   Student drags digit tiles into the correct column to build a given       │
│   amount, watching the decimal point anchor the columns visually.          │
│                                                                              │
│ Station C — "Price Tag Match-Up" (Abstract)                                │
│   Compare two price tags (e.g. $3.40 vs $3.04) and tap the greater/lesser  │
│   amount, or add/subtract two price tags to find change or total cost.     │
│                                                                              │
│ → Mascot reacts to each completed station                                  │
│ → ElevenLabs narrates each station instruction and feedback                │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈ 6–8 min)                                                  │
│                                                                              │
│ IntelliPlay™ Level: 100 randomised questions across 10 worlds              │
│ 10 questions per world, world unlocks at ≥6/10 correct                     │
│ EVERY question, EVERY option order, and EVERY numeric value is randomised  │
│ on every playthrough — no two sessions are ever identical                  │
│ Stars (1–3), XP, badges, and streak fire counter active                   │
│ → Mastery gates the world map; encouragement-first feedback               │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈ 1–2 min)                                              │
│                                                                              │
│ Journal prompt: "Can you write your own amount of money using a decimal    │
│ point and tell me what each part means?"                                  │
│ Or: LearnFlow AI chat — type/speak your understanding                     │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.         │
│ → "Share with your teacher!" button (screenshot / export)                 │
└────────────────────────────────────────────────────────────────────────────┘
```

═══════════════════════════════════════════════════════════════════════════════

## 6. Phase 3 — Simulation Design (Detailed)

### 6.1 Station A — The Coin Counter (Concrete)

**Visual:**
- A cheerful tray/mat area representing a cash drawer
- A pool of draggable coin/note objects on the left (1c, 5c, 10c, 25c coins; $1, $5, $10 notes — globally generic denominations matching the $/¢ system used throughout)
- A live decimal-readout price tag at the top, e.g. "$0.00", updating in real time as objects are dropped in
- "Drop coins and notes to make exactly $4.65!" instruction narrated by Alice (ElevenLabs)

**Interaction:**
- Student drags objects one at a time into the tray
- OR taps an object + taps the tray (accessibility mode)
- Running total updates with a satisfying "cha-ching" micro-animation and ticking digit roll
- A place-value chart mirrors the running total below in real time

**Feedback:**
- Exact target reached → mascot dances, "Perfect! You made exactly $4.65!" 🎉
- Overshoot/undershoot on submit → gentle shake + "So close! Check your total again."

**Variants per round (randomised):**
- Round 1: Target $2.35 (whole dollars + simple coins)
- Round 2: Target $4.65 (mixed notes and coins)
- Round 3: Target $7.20 (larger note combination)
- Round 4: Target $9.99 (maximum-coin edge case)

### 6.2 Station B — Build the Decimal (Pictorial)

**Visual:**
- A place-value chart with three labelled columns: **Dollars | Tenths (10c) | Hundredths (1c)**, separated visually by a glowing decimal point
- A given spoken amount (e.g. "six dollars and forty cents") shown as a prompt
- Digit tiles (0–9) available below to drag into the correct column

**Interaction:**
- Student drags the correct digit into each column
- Decimal point is fixed and animated to "snap" the columns into place visually
- On submit: correct columns glow green and the full notation "$6.40" assembles with a pop animation; incorrect columns glow red with a hint

**Teaching goal:**
- Cementing the dollars-left, cents-right structure of decimal notation
- Reinforcing that the decimal point is a fixed separator, not just a "dot"

**Rounds (3 rounds per station, increasing complexity):**
- Round 1: Whole dollar amounts only (e.g. $3.00)
- Round 2: Dollars + simple tens-of-cents (e.g. $5.40)
- Round 3: Dollars + full two-digit cents, including a leading zero in cents (e.g. $8.05)

### 6.3 Station C — Price Tag Match-Up (Abstract)

**Visual:**
- Two price tags shown side-by-side (e.g. "$3.40" and "$3.04")
- Mode toggles between **Compare** (tap the greater/lesser amount) and **Combine** (add or subtract two tags to find a total cost or amount of change)

**Interaction:**
- Compare mode: tap the correct price tag; immediate visual feedback
- Combine mode: number pad input for the resulting decimal amount, with a "Show me the place value chart" hint button always visible
- On submit: correct → bounce animation; incorrect → shake + hint highlighting the column where the error occurred

**Variants (rotated per round):**
- Round 1: Compare two close decimal amounts (tests place-value understanding, not just "bigger digit")
- Round 2: Add two price tags to find total cost (e.g. $2.50 + $3.75)
- Round 3: Subtract to find change from a fixed amount (e.g. "You pay with $10.00 for an item costing $6.45 — how much change?")

ElevenLabs narrates each price tag and instruction aloud when displayed.

═══════════════════════════════════════════════════════════════════════════════

## 7. Phase 4 — Question Bank (100 Randomised Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total)

| Type | Description | Example |
|---|---|---|
| Q1 | Write amount in decimal notation | John has 5 dollars and 30 cents. Write this in decimal notation. |
| Q2 | Read/identify decimal amount | Which words match $7.05? (MCQ) |
| Q3 | Convert decimal notation to cents only | $3.45 = ___ cents |
| Q4 | Convert cents only to decimal notation | 260 cents = $___ |
| Q5 | Compare two decimal money amounts | Which is greater: $4.60 or $4.06? |
| Q6 | Add two amounts in decimal notation | $2.50 + $3.75 = $___ |
| Q7 | Subtract to find change | Sarah pays $10.00 for a $6.45 toy. How much change does she get? |
| Q8 | True or False — is this decimal notation correct? | "4 dollars 5 cents = $4.50" — True or False? |
| Q9 | Place-value identification | In $6.42, what digit is in the tenths place? |
| Q10 | Multi-step word problem (real-life shopping context) | Mike buys a pencil for $1.20 and an eraser for $0.85. How much did he spend in all? |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy (≤$10) | Medium (≤$50) | Hard (≤$100) |
|---|---|---|---|---|
| Q1 | 10 | 5 | 3 | 2 |
| Q2 | 10 | 5 | 3 | 2 |
| Q3 | 10 | 4 | 4 | 2 |
| Q4 | 10 | 4 | 4 | 2 |
| Q5 | 10 | 4 | 4 | 2 |
| Q6 | 10 | 3 | 4 | 3 |
| Q7 | 10 | 3 | 4 | 3 |
| Q8 | 10 | 5 | 3 | 2 |
| Q9 | 10 | 5 | 3 | 2 |
| Q10 | 10 | 2 | 4 | 4 |
| **TOTAL** | **100** | **40** | **36** | **24** |

### 7.3 Randomisation Requirements (Mandatory)

- All 100 questions are randomised in **order** per session using a Fisher-Yates shuffle — no two sessions present the same sequence
- All **numeric values** within a question template are re-rolled within the defined difficulty range on every session (not fixed sample data) — every question is functionally unique per playthrough, not just reordered
- All **MCQ option order** is independently shuffled per question render
- All **MCQ distractors** are regenerated per session using plausible decimal-point-shift and place-value error patterns (see Section 9.2 of the companion TRD) — never the same wrong-answer set twice
- Word problem **character names, objects, and contexts** are drawn randomly from the pools in Section 7.4 on every question render, so the same question type never feels repetitive across sessions

### 7.4 Global Character Names & Objects Used in Word Problems

To keep the module usable by Grade 3 students of all global countries, character names are pulled from a deliberately international, easily-pronounceable pool rather than any single nationality:

**Names:** John, Mike, Sarah, Emma, Liam, Olivia, Noah, Ava, Lucas, Sophia, Daniel, Maria, Ethan, Grace, Ryan, Mia, Aiden, Zoe, James, Chloe

**Objects/items (shopping context, globally neutral):** pencil, eraser, notebook, storybook, toy car, juice box, sandwich, sticker pack, water bottle, ice cream, kite, ball, backpack, cap, balloon

**Contexts:** school store, weekend market, lemonade stand, toy shop, book fair, bakery, stationery shop, neighbourhood store

### 7.5 MOE-Aligned Language Requirements

All questions use approved curriculum vocabulary:

- "decimal notation", "decimal point", "dollars and cents", "in all", "altogether"
- "how much change", "how much more", "how much less", "total cost"

Sentence structures match Primary 3 Targeting Mathematics word-problem style while remaining understandable to an international English-fluent Grade 3 audience.

═══════════════════════════════════════════════════════════════════════════════

## 8. Gamification Design

### 8.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5

### 8.2 Badges (Unlockable)

| Badge | Condition |
|---|---|
| 🏅 "Money Explorer" | Complete Wonder + Story phases |
| 🥈 "Decimal Builder" | Complete all 3 Simulation stations |
| 🥇 "Decimal Champion" | Score ≥80% on Play phase |
| 💎 "Perfect Change" | Score 10/10 in any world |
| 🔥 "Streak Star" | Achieve a streak of 10 consecutive correct answers |
| 🌟 "Full Journey" | Complete all 5 phases (lesson complete badge) |
| 🎯 "Sharp Counter" | Get 5 correct in Station A without overshooting the target |
| 🤝 "Smart Shopper" | Answer 5 change/word-problem questions (Q7, Q10) correctly |

### 8.3 Feedback Mechanics

**✅ Correct:**
- Bounce animation on answer card + mascot happy mood
- ElevenLabs celebration audio: "Perfect! That's exactly right! 🎉"
- XP floats up from answer card (+10 / +7 / +5)
- Streak fire counter increments

**❌ Incorrect (Attempt 1):**
- Gentle shake animation on answer card
- ElevenLabs gentle voice: "Not quite! Let's check the decimal point again 🔢"
- Hint 1 activates: place-value chart highlighted with column labels shown

**❌ Incorrect (Attempt 2):**
- Stronger shake + Hint 2: animated walkthrough shows dollars and cents being separated
- ElevenLabs: "Watch the columns with me! Which one is the dollars?"

**❌ Incorrect (Attempt 3):**
- Answer revealed with animated explanation (mascot explains)
- ElevenLabs: full explanation read aloud
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression)

| World | Theme | Questions | Range |
|---|---|---|---|
| 1 | "Lemonade Stand" | Q1–10 | Easy, ≤$5 |
| 2 | "School Store" | Q11–20 | Easy, ≤$10 |
| 3 | "Toy Shop Adventure" | Q21–30 | Easy-Medium, ≤$15 |
| 4 | "Weekend Market" | Q31–40 | Medium, ≤$25 |
| 5 | "Bakery Corner" | Q41–50 | Medium, ≤$30 |
| 6 | "Book Fair" | Q51–60 | Medium-Hard, ≤$40, includes change problems |
| 7 | "Sports Day Stall" | Q61–70 | Hard, ≤$60, word problems |
| 8 | "Holiday Bazaar" | Q71–80 | Hard, ≤$75, mixed types |
| 9 | "City Mall" | Q81–90 | Hard, ≤$100, all types mixed |
| 10 | "Treasure Vault" | Q91–100 | Hardest, multi-step, regrouping required |

Unlock gate: ≥6/10 correct (1-star minimum) required to advance to next world.
3 stars in a world unlocks a hidden "Bonus Challenge" (3 extra questions).

### 8.5 Mascot (LearnFlow AI Companion)

- **Character:** Friendly robot — "LearnFlow" (matching Intellia branding, consistent with the Equal Groups module)
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Simulation feedback, Reflect phase
- **Reactions:** Correct answer, badge unlock, streak milestone, world completion
- **Audio:** All mascot speech via ElevenLabs Alice voice (pre-generated .mp3)

═══════════════════════════════════════════════════════════════════════════════

## 9. Audio & Narration Design

### 9.1 ElevenLabs Pipeline (matching the established Equal Groups pipeline)

| Setting | Value |
|---|---|
| Voice Provider | ElevenLabs (ONLY — no browser Web Speech API fallback) |
| Voice Name | Alice (Clear, Engaging Educator) |
| Voice ID | `Xb7hH8MSUJpSbSDYk0k2` |
| Model | `eleven_multilingual_v2` |
| API Key Env Var | `VITE_ELEVENLABS_API_KEY` |

### 9.2 Speech Styles Mapped to ElevenLabs Settings

| Style | stability | similarity_boost | style | Use case |
|---|---|---|---|---|
| statement | 0.75 | 0.75 | 0.0 | Story narration, instructions |
| instruction | 0.80 | 0.75 | 0.0 | Simulation station prompts |
| question | 0.60 | 0.80 | 0.3 | Practice question read-aloud |
| encouragement | 0.55 | 0.85 | 0.6 | Correct answer feedback |
| emphasis | 0.85 | 0.70 | 0.1 | Key vocabulary highlight (e.g. "decimal point") |
| thinking | 0.65 | 0.80 | 0.2 | Mascot thinking moments |
| celebration | 0.45 | 0.90 | 0.8 | Badge unlock, world complete |

### 9.3 Pre-generated Audio Files

All phase narration lines (Wonder, Story panels, Simulate instructions, Reflect prompt, badge unlock messages, world completion) are pre-generated offline and stored as static `.mp3` in `public/assets/audio/`, exactly mirroring the file organisation already used in the Equal Groups module. `audioMap.js` is auto-generated and maps exact text strings → file paths.

### 9.4 Dynamic Generation

Practice questions (Phase 4) are generated dynamically if not pre-cached, since their numeric values are randomised per session. Requires `VITE_ELEVENLABS_API_KEY` in `.env.local`. If the key is absent, narration silently skipped (no browser TTS fallback). An internal memory cache prevents re-fetching identical text within a session.

### 9.5 Segment Synchronisation

The audio engine parses narration as an array of segments (one per sentence). While segment *i* plays, segment *i+1* is eagerly preloaded. This guarantees seamless, gap-free narration across multi-sentence scripts, using the HTML5 Audio API.

### 9.6 Narration Script Examples

**Phase 1 (Wonder) — style: thinking**
> "Sarah has four one-dollar coins and three quarters in her piggy bank."
> "Her friend says she has four dollars and seventy-five cents — written as four point seven five."
> "What does that funny dot in the middle mean? Let's find out!"

**Phase 2 (Story, Panel 2) — style: emphasis**
> "He writes it on the price board as one dollar and fifty cents."
> "That dot is special — it is called the decimal point!"

**Phase 3 (Station A) — style: instruction**
> "Drop coins and notes into the tray to make exactly four dollars and sixty-five cents!"
> "Watch the price tag at the top change as you add each coin."

**Phase 4 (Correct feedback) — style: celebration**
> "Perfect! That's exactly right! You're a Decimal Champion in the making!"

**Phase 5 (Reflect) — style: thinking**
> "What a journey today! Can you write your own amount of money using a decimal point?"

═══════════════════════════════════════════════════════════════════════════════

## 10. UX & Visual Design Requirements

### 10.1 Visual Theme

- **Brand:** Intellia SG — Think. Explore. Become.
- **Reference UI (binding, mirror exactly):** `https://equal-tau.vercel.app/`
- **Reference Repo (binding, mirror exactly):** `https://github.com/dsamyak/equal`
- **Colours:** Match `equal-tau.vercel.app` exactly — primary blue, accent gold/yellow for rewards and stars, soft coral/red for wrong-answer shake states, white card backgrounds with soft drop shadows, distinct phase band colours matching the existing Intellia journey infographic
- **Typography:** Rounded, playful — Nunito or Fredoka One
- **Illustrations:** Cartoon-style, child-friendly, globally neutral imagery (coins, notes, shops, market stalls — no single-country iconography)
- **Decimal/Place-Value Visuals:** Column-based place-value chart component, colour-coded by column (dollars / tenths / hundredths), used throughout all phases as the primary recurring visual motif — playing the same anchoring role that the "equal group bubble diagram" plays in the reference module

### 10.2 Layout Structure (mirrors equal-tau.vercel.app exactly)

| Region | Content |
|---|---|
| Top Bar | Intellia logo \| Lesson title "Decimal Notation for Money" \| 5-phase dot tracker |
| Main Area | Phase content (fills screen, responsive, smooth phase transitions) |
| Bottom Bar | XP counter \| Star count \| Streak fire \| Phase navigation arrows |
| Sidebar | Hidden on mobile; shown on tablet+ as vertical phase map |

### 10.3 Place-Value / Decimal Diagram Visual Component (Primary Visual)

Used throughout all phases. Visual spec:
- Three (or two, for cents-only views) labelled columns: Dollars | Tenths | Hundredths
- A large, glowing decimal point anchoring the dollars and cents columns
- Digits animate in (pop/count-up animation) when the diagram first renders
- Missing value shown as a dashed-border slot with "?" inside
- Connecting label underneath, e.g. "$4 . 6 5 = four dollars and sixty-five cents"

### 10.4 Accessibility

- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast on all text elements
- All narration via ElevenLabs (premium, consistent voice)
- Keyboard navigable (Tab + Enter for all interactions)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback

### 10.5 Responsive Design

- Primary: iPad / tablet (768px+) — classroom context
- Secondary: Desktop browser (1024px+)
- Tertiary: Mobile (375px+) — stacked single-column layout

═══════════════════════════════════════════════════════════════════════════════

## 11. Content Requirements

### 11.1 Simulation Visuals

- Place-value charts: column-based React/SVG components with animated digit entry
- Coin/note object pool: visually distinct denominations rotated per session
- Price tags: large bold typography matching the reference module's card style
- Station B tiles: drag-and-drop digit tiles, clean whitespace, large tap targets

### 11.2 Question Bank Coverage

- All 10 question types × 10 questions = 100 unique question **templates** in `questionBank.js`
- Question templates generate fresh numeric values, distractors, names, and contexts **every session** (true randomisation, not just reshuffling of fixed instances — see Section 7.3)
- No two sessions present the same question order, the same numeric values, or the same option order
- MCQ distractors always plausible (decimal-point shift errors, dollar/cent column-swap errors, off-by-one-cent errors)

### 11.3 Word Problem Format

**Addition (total cost) sense:**
> "[Name] buys a [object] for $[amount] and a [object] for $[amount]. How much did [he/she] spend in all?"

**Subtraction (change) sense:**
> "[Name] pays $[amount] for an item that costs $[amount]. How much change does [he/she] get?"

**Comparison sense:**
> "[Name] has $[amount]. [Friend's name] has $[amount]. Who has more, and by how much?"

### 11.4 Audio Script Parity (1:1 Strict Parity Rule)

Every on-screen text string that is narrated must match the narration data exactly — same words, same punctuation. This prevents confusion for young learners who are simultaneously listening and reading. Any UI text change requires updating both the audio generation phrase list and the corresponding narration data file.

═══════════════════════════════════════════════════════════════════════════════

## 12. Success Criteria (v1.0)

| Criterion | Target |
|---|---|
| All 100 question templates generate correctly with randomised values | ✅ Required |
| All 3 simulation stations functional | ✅ Required |
| All 5 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional | ✅ Required |
| Mobile/tablet responsive layout | ✅ Required |
| Singapore MOE Primary 3 Money (decimal notation) syllabus 100% covered | ✅ Required |
| Cross-checked for global Grade 3 applicability (no single-country lock-in) | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI strictly matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly at intelliasg.com Grade 3 lesson URL | ✅ Required |

═══════════════════════════════════════════════════════════════════════════════

## 13. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Multiplication/division of money by a decimal (excluded per MOE syllabus scope at this level)
- Foreign currency conversion or multi-currency combination problems
- Assessment against the full Grade 3 curriculum (broader test engine)

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | June 2026
**Product:** Intellia SG — Grade 3 Math, Money Unit
**Lesson Title:** Decimal Notation for Money
**Curriculum:** Singapore MOE Primary 3 Mathematics (Money — Decimal Notation), cross-referenced against global Grade 3 math syllabi
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, Xb7hH8MSUJpSbSDYk0k2, eleven_multilingual_v2)
**Parent Course Page:** https://intelliasg.com/courses/grade-3-math
**Lesson URL:** https://intelliasg.com/courses/grade-3-math/lessons/decimal-notation-for-money/
