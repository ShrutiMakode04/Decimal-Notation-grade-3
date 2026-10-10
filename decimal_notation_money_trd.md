# Technical Requirements Document (TRD)

## Decimal Notation for Money | Grade 3 Math
### Intellia SG | Singapore Primary Mathematics Curriculum (MOE), Global Grade 3 Cross-Reference

═══════════════════════════════════════════════════════════════════════════════

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, simulation logic, gamification implementation, audio pipeline, and quality standards for the **"Decimal Notation for Money"** interactive lesson module within Intellia SG's Grade 3 Math program.

The module is a **React 18 application (Vite + JSX)**, structured **identically** to the reference repository `https://github.com/dsamyak/equal`, and styled to match `https://equal-tau.vercel.app/` pixel-for-pixel in component hierarchy, spacing, colour tokens, and animation timing. It will be embedded at:

`https://intelliasg.com/courses/grade-3-math/lessons/decimal-notation-for-money/`

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API fallback), mirroring the pipeline already implemented in the reference module, adapted for this lesson's money/decimal scripts.

═══════════════════════════════════════════════════════════════════════════════

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches reference `equal` repo structure exactly |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind | Matches existing repo CSS approach |
| Icons | Lucide React | Available in artifact environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| SVG Diagrams | Inline SVG (React) | For place-value / decimal chart diagrams |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice (Alice) |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Math | Vanilla JS, integer-cents arithmetic | Avoids floating-point rounding errors in money math |
| Build Tool | Vite | Matches repo (`vite.config.js` present) |

**Critical implementation note:** All monetary arithmetic MUST be performed in **integer cents internally** (e.g. `465` for $4.65) and only converted to a formatted `$X.XX` string at render time. Never perform addition/subtraction on floating-point dollar values directly — this avoids classic JS floating-point errors (e.g. `0.1 + 0.2 !== 0.3`) which would otherwise silently corrupt answer-checking logic.

═══════════════════════════════════════════════════════════════════════════════

## 3. Project Structure (mirrors `equal` repo exactly)

```
decimal-notation-money/
├── public/
│   ├── assets/
│   │   ├── audio/                        # Pre-generated .mp3 files (ElevenLabs)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── audio_story_panel2_0.mp3
│   │   │   ├── audio_story_panel3_0.mp3
│   │   │   ├── audio_story_panel4_0.mp3
│   │   │   ├── audio_story_panel5_0.mp3
│   │   │   ├── audio_story_panel6_0.mp3
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ...                       # all phase phrases pre-generated
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                          # React entry point
│   ├── App.jsx                           # Root component, global state (useReducer)
│   ├── App.css                           # Global styles (mirrors equal-tau.vercel.app CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx               # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx               # 5-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx           # Phase 1: Hook animation + ElevenLabs narration
│   │   │   ├── StoryPhase.jsx            # Phase 2: Illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx         # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx             # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx          # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── CoinCounterStation.jsx    # Station A: Drag coins/notes to build a target amount
│   │   │   ├── BuildDecimalStation.jsx   # Station B: Drag digits into place-value columns
│   │   │   └── PriceTagStation.jsx       # Station C: Compare / add / subtract price tags
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx      # Polymorphic dispatcher → type-specific component
│   │   │   ├── WriteDecimalQ.jsx         # Q1: Write amount in decimal notation
│   │   │   ├── ReadDecimalQ.jsx          # Q2: Read/identify decimal amount (MCQ)
│   │   │   ├── ToCentsQ.jsx              # Q3: Convert decimal notation to cents only
│   │   │   ├── FromCentsQ.jsx            # Q4: Convert cents only to decimal notation
│   │   │   ├── CompareAmountsQ.jsx       # Q5: Compare two decimal money amounts
│   │   │   ├── AddAmountsQ.jsx           # Q6: Add two amounts in decimal notation
│   │   │   ├── ChangeQ.jsx               # Q7: Subtract to find change
│   │   │   ├── TrueFalseDecimalQ.jsx     # Q8: True/False — is this decimal notation correct?
│   │   │   ├── PlaceValueQ.jsx           # Q9: Place-value identification
│   │   │   ├── WordProblemQ.jsx          # Q10: Multi-step shopping word problem
│   │   │   └── HintOverlay.jsx           # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx             # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx            # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx            # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx         # Fire streak counter
│   │   │   └── WorldMap.jsx              # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx                # LearnFlow robot with mood states
│   │       ├── PlaceValueChart.jsx       # Reusable SVG/React: Dollars | . | Tenths | Hundredths
│   │       ├── CoinNotePool.jsx          # Draggable coin/note object source tray
│   │       ├── MoneyTray.jsx             # Single droppable tray zone with live decimal readout
│   │       ├── NumberPad.jsx             # Large tap-friendly digit input (0–9)
│   │       ├── PriceTag.jsx              # Reusable price-tag display component
│   │       └── FeedbackOverlay.jsx       # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionBank.js               # 100 question templates (all types)
│   │   └── storyContent.js               # Story phase panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                   # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js               # Gamification state hook
│   │   └── useLocalStorage.js            # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                   # AUTO-GENERATED: text → .mp3 path map
│       ├── shuffle.js                    # Fisher-Yates randomisation
│       ├── money.js                      # Integer-cents arithmetic + $X.XX formatting helpers
│       ├── questionGenerator.js          # Per-session randomised value/name/distractor generation
│       ├── scoring.js                    # XP + star calculation
│       └── badgeEngine.js                # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                 # Offline ElevenLabs audio pre-generation
│   └── clean_audio.js                    # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                     # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

═══════════════════════════════════════════════════════════════════════════════

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro',              // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,                // 0–5 (6 story panels)
  currentSimStation: 0,         // 0=CoinCounter, 1=BuildDecimal, 2=PriceTagMatchUp
  simStationsComplete: [false, false, false],
  simRound: 0,                  // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],              // 100 freshly-generated Question objects (see Section 9)
  currentQuestion: 0,           // 0–99
  currentWorld: 0,              // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,              // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],                   // Array of unlocked badge IDs
  stationAPerfect: false,       // Tracks "Sharp Counter" badge condition
  smartShopperCorrect: 0,       // Tracks Q7/Q10 correct count for "Smart Shopper" badge

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,           // ElevenLabs narration on/off
  musicEnabled: false,          // Background ambient music (off by default)
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

═══════════════════════════════════════════════════════════════════════════════

## 5. Question Data Model

### 5.1 Question Schema

```typescript
interface Question {
  id: string;                  // e.g. "Q1_003", "Q7_008"
  type: QuestionType;          // One of 10 enum values (see below)
  world: number;                // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;       // 1=easy(≤$10), 2=medium(≤$50), 3=hard(≤$100)

  // Core money values — ALWAYS stored as integer cents internally
  amountCents: number;          // Primary amount, in cents (e.g. 465 = $4.65)
  secondAmountCents?: number;   // For add/subtract/compare question types
  resultCents?: number;         // Pre-computed correct result, in cents

  // Rendering
  questionText: string;         // Full narrated question text (ElevenLabs reads this)
  visual: VisualType;            // 'placeValueChart' | 'priceTag' | 'coinTray' | 'trueFalse'

  // MCQ
  options?: (string)[];         // 4 MCQ options, always formatted as "$X.XX" or cent strings

  // Hints
  hint1: string;                 // Shown after 1 wrong attempt
  hint2: string;                 // Shown after 2 wrong attempts (animation trigger)
  explanation: string;           // Full text explanation after 3 fails (read aloud)

  // Word problems only
  characterName?: string;
  secondCharacterName?: string;
  objectName?: string;
  secondObjectName?: string;
  contextName?: string;          // 'school store', 'lemonade stand', etc.

  // True/False only
  isTrue?: boolean;

  // Answer (always a formatted string, e.g. "$4.65", never a raw float)
  correctAnswer: string;
}

type QuestionType =
  | 'write_decimal'        // Q1: Write amount in decimal notation
  | 'read_decimal'         // Q2: Read/identify decimal amount
  | 'to_cents'              // Q3: Convert decimal notation to cents only
  | 'from_cents'            // Q4: Convert cents only to decimal notation
  | 'compare_amounts'      // Q5: Compare two decimal money amounts
  | 'add_amounts'          // Q6: Add two amounts in decimal notation
  | 'find_change'           // Q7: Subtract to find change
  | 'true_false_decimal'   // Q8: Is this decimal notation correct?
  | 'place_value'           // Q9: Place-value identification
  | 'word_problem';         // Q10: Multi-step shopping word problem

type VisualType =
  | 'placeValueChart'  // SVG/React: Dollars | . | Tenths | Hundredths columns (PlaceValueChart)
  | 'priceTag'          // Static or comparative price tag display
  | 'coinTray'          // Visual coin/note arrangement
  | 'trueFalse';        // Statement + True/False buttons
```

### 5.2 Sample Question Objects

```javascript
// Q1 — Write Amount in Decimal Notation
{
  id: "Q1_001",
  type: "write_decimal",
  world: 0,
  difficulty: 1,
  amountCents: 530,                 // 5 dollars 30 cents
  questionText: "John has 5 dollars and 30 cents. Write this amount in decimal notation.",
  visual: "placeValueChart",
  hint1: "Dollars go to the left of the decimal point. Cents go to the right.",
  hint2: "5 dollars is '5'. 30 cents is '.30'. Put them together!",
  explanation: "5 dollars and 30 cents is written as $5.30.",
  options: ["$5.03", "$5.30", "$53.00", "$0.53"],
  correctAnswer: "$5.30",
}

// Q6 — Add Two Amounts in Decimal Notation
{
  id: "Q6_004",
  type: "add_amounts",
  world: 3,
  difficulty: 2,
  amountCents: 250,                  // $2.50
  secondAmountCents: 375,            // $3.75
  resultCents: 625,                  // $6.25
  questionText: "Mike buys a sandwich for $2.50 and a juice box for $3.75. How much did he spend in all?",
  visual: "priceTag",
  characterName: "Mike",
  objectName: "sandwich",
  secondObjectName: "juice box",
  contextName: "school store",
  hint1: "Line up the decimal points and add the dollars, then the cents.",
  hint2: "2.50 plus 3.75. The cents add up to over a dollar — remember to regroup!",
  explanation: "$2.50 + $3.75 = $6.25. Mike spent $6.25 in all.",
  options: ["$5.25", "$6.25", "$6.15", "$5.75"],
  correctAnswer: "$6.25",
}

// Q7 — Find Change (Subtraction Sense)
{
  id: "Q7_002",
  type: "find_change",
  world: 2,
  difficulty: 2,
  amountCents: 1000,                 // Paid: $10.00
  secondAmountCents: 645,            // Cost: $6.45
  resultCents: 355,                  // Change: $3.55
  questionText: "Sarah pays $10.00 for a toy that costs $6.45. How much change does she get?",
  visual: "priceTag",
  characterName: "Sarah",
  objectName: "toy",
  contextName: "toy shop",
  hint1: "Subtract the cost from the amount paid. Line up the decimal points!",
  hint2: "$10.00 minus $6.45. You may need to regroup from the dollars column.",
  explanation: "$10.00 − $6.45 = $3.55. Sarah gets $3.55 in change.",
  options: ["$3.55", "$4.55", "$3.45", "$4.45"],
  correctAnswer: "$3.55",
}

// Q9 — Place Value Identification
{
  id: "Q9_005",
  type: "place_value",
  world: 5,
  difficulty: 3,
  amountCents: 642,                  // $6.42
  questionText: "In $6.42, what digit is in the tenths place?",
  visual: "placeValueChart",
  hint1: "The tenths place is the first digit right after the decimal point.",
  hint2: "Look at $6.42 — the digit right after the dot is the tenths digit.",
  explanation: "In $6.42, the digit 4 is in the tenths place (it represents 40 cents).",
  options: ["6", "4", "2", "0"],
  correctAnswer: "4",
}
```

═══════════════════════════════════════════════════════════════════════════════

## 6. Place Value Chart SVG Component

```javascript
// PlaceValueChart.jsx — reusable SVG/React component for Dollars | . | Tenths | Hundredths

const PlaceValueChart = ({
  amountCents,            // integer cents, e.g. 465
  missingColumn,           // 'dollars' | 'tenths' | 'hundredths' | null
  animated = false,
  size = 'medium',          // 'small' | 'medium' | 'large'
}) => {
  const dollars = Math.floor(amountCents / 100);
  const cents = amountCents % 100;
  const tenths = Math.floor(cents / 10);
  const hundredths = cents % 10;

  const columnWidth = size === 'large' ? 90 : size === 'medium' ? 70 : 54;
  const columnHeight = size === 'large' ? 110 : size === 'medium' ? 90 : 70;
  const fontSize = size === 'large' ? 36 : size === 'medium' ? 28 : 20;

  const columns = [
    { label: 'Dollars', value: dollars, key: 'dollars' },
    { label: '', value: '.', key: 'decimalPoint', isDot: true },
    { label: 'Tenths', value: tenths, key: 'tenths' },
    { label: 'Hundredths', value: hundredths, key: 'hundredths' },
  ];

  const svgWidth = columns.reduce((sum, c) => sum + (c.isDot ? columnWidth * 0.4 : columnWidth), 20);
  const svgHeight = columnHeight + 50;

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
         xmlns="http://www.w3.org/2000/svg"
         style={{ maxWidth: '100%', height: 'auto' }}>
      {(() => {
        let xCursor = 10;
        return columns.map((col, i) => {
          const width = col.isDot ? columnWidth * 0.4 : columnWidth;
          const x = xCursor;
          xCursor += width;
          const isMissing = missingColumn === col.key;

          if (col.isDot) {
            return (
              <text key={col.key} x={x + width / 2} y={columnHeight / 2 + 20}
                    textAnchor="middle" fontSize={fontSize * 1.4}
                    fontWeight="bold" fill="#4A90D9">
                .
              </text>
            );
          }

          return (
            <g key={col.key}>
              <rect x={x} y="10" width={width - 8} height={columnHeight}
                    rx="12"
                    fill={isMissing ? '#FFFFFF' : `hsl(${(i * 70) % 360}, 65%, 92%)`}
                    stroke={isMissing ? '#FF6B6B' : `hsl(${(i * 70) % 360}, 65%, 60%)`}
                    strokeWidth={isMissing ? '3' : '2'}
                    strokeDasharray={isMissing ? '6,3' : '0'} />
              <text x={x + (width - 8) / 2} y={columnHeight / 2 + 26}
                    textAnchor="middle" fontSize={fontSize} fontWeight="700"
                    fill="#333">
                {isMissing ? '?' : col.value}
              </text>
              <text x={x + (width - 8) / 2} y={columnHeight + 38}
                    textAnchor="middle" fontSize="12" fill="#666">
                {col.label}
              </text>
            </g>
          );
        });
      })()}
      <text x={svgWidth / 2} y={svgHeight - 4}
            textAnchor="middle" fontSize="14" fill="#333" fontWeight="bold">
        {`$${dollars}.${String(cents).padStart(2, '0')}`}
      </text>
    </svg>
  );
};
```

**Animation variants:**
- `animated=true` → CSS `digitPopIn` keyframe: each column's digit appears with a staggered 100ms delay
- `shake` variant → CSS `shake` keyframe applied to `<svg>` wrapper on wrong answer
- `bounce` variant → CSS `bounceIn` keyframe applied to `<svg>` wrapper on correct answer

═══════════════════════════════════════════════════════════════════════════════

## 7. Simulation Station Component Specs

### 7.1 `CoinCounterStation.jsx` — Station A (Concrete)

**State:**
```javascript
const [targetCents, setTargetCents] = useState(getStationARound(state.simRound));
// targetCents: 465 (i.e. $4.65)

const [trayItems, setTrayItems] = useState([]); // Array of { denomination, valueCents }
const runningTotalCents = trayItems.reduce((sum, item) => sum + item.valueCents, 0);

const [objectPool, setObjectPool] = useState(
  generateCoinPool() // [{ denom: '$1', valueCents: 100 }, { denom: '25c', valueCents: 25 }, ...]
);
```

**Denomination set (globally generic, $/¢ system):**
`1c, 5c, 10c, 25c coins; $1, $5, $10 notes`

**Interaction (Drag):**
- `CoinNotePool` renders draggable elements for each coin/note
- `MoneyTray` renders a droppable zone with a live decimal readout that updates on every drop
- `onDrop`: `trayItems.push(item)`; running total recalculates in integer cents

**Interaction (Tap fallback):**
- Tap object in pool → object becomes "selected" (glows)
- Tap tray → object moves into tray

**Completion Check:**
- `runningTotalCents === targetCents` → exact match
- Submit button appears once at least one item is in the tray
- On submit correct: mascot celebrates, ElevenLabs plays celebration audio
- On submit mismatch: shake + narration "So close! Check your total again." (no auto-reveal of over/under direction at first attempt — encourages re-checking)

**Station A Rounds (4 rounds, randomised order, target re-rolled per session):**
```javascript
[
  { targetCents: 235, theme: 'simple' },   // $2.35
  { targetCents: 465, theme: 'mixed' },    // $4.65
  { targetCents: 720, theme: 'notes' },    // $7.20
  { targetCents: 999, theme: 'maxCoin' },  // $9.99
]
```

### 7.2 `BuildDecimalStation.jsx` — Station B (Pictorial)

**State:**
```javascript
const [problem, setProblem] = useState(getStationBRound(state.simRound));
// problem: { amountCents: 640, spokenPrompt: "six dollars and forty cents" }

const [placedDigits, setPlacedDigits] = useState({ dollars: null, tenths: null, hundredths: null });
const [submitted, setSubmitted] = useState(false);
```

**Digit Tile Generation:**
- A shuffled pool of digit tiles (0–9) is rendered, including the 3 correct digits plus 3–4 randomised distractor digits
- Student drags tiles into the `dollars`, `tenths`, and `hundredths` slots of the `PlaceValueChart`

**Interaction:**
- Tap a tile → tile becomes "selected"; tap a column slot → tile moves into that slot (drag supported as primary, tap+tap as fallback)
- On submit: correct columns glow green and the full notation assembles with a `bounceIn` pop animation; incorrect columns glow red with `hint1` shown

**Rounds (3 rounds per station, increasing complexity, values re-rolled per session):**
```javascript
[
  { amountCents: 300, complexity: 'wholeDollar' },     // $3.00
  { amountCents: 540, complexity: 'tensOfCents' },      // $5.40
  { amountCents: 805, complexity: 'leadingZeroCents' }, // $8.05 — tests the leading-zero edge case
]
```

### 7.3 `PriceTagStation.jsx` — Station C (Abstract)

**State:**
```javascript
const [mode, setMode] = useState('compare'); // 'compare' | 'combine'
const [tagA, setTagA] = useState(getRandomAmountCents(round, 'A'));
const [tagB, setTagB] = useState(getRandomAmountCents(round, 'B'));
const [operation, setOperation] = useState(null); // 'add' | 'subtract' (combine mode only)
const [inputValue, setInputValue] = useState('');
const [showChart, setShowChart] = useState(false);
```

**Layout (Compare mode):**
```jsx
<div class="price-tag-row">
  <PriceTag amountCents={tagA} onTap={() => handleCompareSelect('A')} />
  <span class="vs-label">vs</span>
  <PriceTag amountCents={tagB} onTap={() => handleCompareSelect('B')} />
</div>
<p class="instruction">{`Tap the ${comparisonTarget} amount!`}</p>
```

**Layout (Combine mode):**
```jsx
<div class="price-tag-row">
  <PriceTag amountCents={tagA} />
  <span class="operator">{operation === 'add' ? '+' : '−'}</span>
  <PriceTag amountCents={tagB} />
  <span class="equals">=</span>
  <BlankInput value={inputValue} prefix="$" />
</div>
<NumberPad value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} decimalAware />
<button onClick={() => setShowChart(!showChart)}>Show me the place value chart 🔢</button>
{showChart && <PlaceValueChart amountCents={parseAmountToCents(inputValue)} animated />}
```

**Variants (rotated across 3 rounds, values re-rolled per session):**
- Round 1: Compare two close decimal amounts (e.g. $3.40 vs $3.04) — tests place-value understanding rather than digit magnitude alone
- Round 2: Add two price tags to find total cost
- Round 3: Subtract to find change from a round paid amount

ElevenLabs reads each price tag and instruction aloud when displayed, e.g.:
> "Three dollars and forty cents, compared to three dollars and four cents. Which is greater?"

═══════════════════════════════════════════════════════════════════════════════

## 8. Audio Pipeline (ElevenLabs — Matching Reference Architecture)

### 8.1 Voice Configuration

| Setting | Value |
|---|---|
| Voice Name | Alice |
| Voice ID | `Xb7hH8MSUJpSbSDYk0k2` |
| Model | `eleven_multilingual_v2` |
| API Key Var | `VITE_ELEVENLABS_API_KEY` (in `.env.local`) |

### 8.2 Speech Style Settings (per style type)

| Style | stability | similarity_boost | style_exaggeration |
|---|---|---|---|
| statement | 0.75 | 0.75 | 0.0 |
| instruction | 0.80 | 0.75 | 0.0 |
| question | 0.60 | 0.80 | 0.3 |
| encouragement | 0.55 | 0.85 | 0.6 |
| emphasis | 0.85 | 0.70 | 0.1 |
| thinking | 0.65 | 0.80 | 0.2 |
| celebration | 0.45 | 0.90 | 0.8 |

### 8.3 Offline Pre-generation Script (`scripts/generate_audio.js`)

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "Sarah has four one-dollar coins and three quarters in her piggy bank.", style: 'thinking' },
  { text: "Her friend says she has four dollars and seventy-five cents, written as four point seven five.", style: 'thinking' },
  { text: "What does that funny dot in the middle mean? Let us find out!", style: 'encouragement' },

  // Phase 2 — Story Panels
  { text: "John sells a cup of lemonade for one dollar and fifty cents.", style: 'statement' },
  { text: "He writes it on the price board as one dollar and fifty cents, dollar sign one point five zero.", style: 'statement' },
  { text: "That dot is special. It is called the decimal point!", style: 'emphasis' },
  { text: "Dollars go on the left of the decimal point. Cents go on the right.", style: 'emphasis' },
  { text: "Sarah counts the cash box. Six one-dollar coins and twenty-five cents. That is six dollars and twenty-five cents altogether!", style: 'statement' },
  { text: "At the end of the day, they made seven dollars and seventy-five cents. Time to split it fairly!", style: 'statement' },

  // Phase 3 — Simulation Instructions
  { text: "Drop coins and notes into the tray to make exactly the target amount!", style: 'instruction' },
  { text: "Watch the price tag at the top change as you add each coin.", style: 'instruction' },
  { text: "Drag the digits into the correct columns. Dollars, tenths, and hundredths!", style: 'instruction' },
  { text: "Tap the price tag with the greater amount!", style: 'question' },

  // Phase 4 — Feedback
  { text: "Perfect! That is exactly right! You are a Decimal Champion in the making!", style: 'celebration' },
  { text: "Not quite! Let us check the decimal point again.", style: 'encouragement' },
  { text: "Watch the columns with me! Which one is the dollars?", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What a journey today! Can you write your own amount of money using a decimal point?", style: 'thinking' },
  { text: "Lesson complete! You are a Decimal Notation Champion!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are a Money Explorer!", style: 'celebration' },
  { text: "Badge unlocked! Decimal Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Decimal Champion! You scored over eighty percent!", style: 'celebration' },
];

// Script hits ElevenLabs API for each phrase, saves to public/assets/audio/
// Auto-generates src/utils/audioMap.js mapping text → .mp3 path
```

### 8.4 Frontend Audio Engine (`src/hooks/useAudio.js`)

```javascript
// Step 1: Check audioMap for pre-generated static asset
// Step 2: If not found + API key present → fetch from ElevenLabs dynamically
//          (needed for Phase 4 questions, since their text includes randomised values)
// Step 3: Cache dynamic result in elevenLabsCache (in-memory Map)
// Step 4: Play via HTML5 Audio API (new Audio(url))
// Step 5: While segment i plays → preload segment i+1 (eager preload)

const elevenLabsCache = new Map(); // In-memory; cleared on page refresh

export async function getAudioUrl(text, style = 'statement', apiKey) {
  // 1. Static map check (fastest path)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache check
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey);

  // 3. Dynamic generation (requires API key)
  if (!apiKey) return null; // Silent skip — no fallback

  const styleSettings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: styleSettings,
      }),
    }
  );
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  elevenLabsCache.set(cacheKey, url);
  return url;
}

export async function narrate(segments, apiKey, onSegmentStart) {
  for (let i = 0; i < segments.length; i++) {
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    if (!url) continue; // Silent skip if no audio available

    // Eager preload next segment
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey);
    }

    if (onSegmentStart) onSegmentStart(i);
    await playAudio(url); // Resolves on 'ended' event
  }
}

async function playAudio(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve; // Silent fail — never block UX
    audio.play().catch(resolve);
  });
}
```

### 8.5 Audio Cleanup (`scripts/clean_audio.js`)

- Imports `audioMap.js` to determine all valid referenced `.mp3` paths
- Scans `public/assets/audio/` for all `.mp3` files
- Deletes any `.mp3` not present in `audioMap` (orphaned files)
- Run after any phrase deletion or text edit in `generate_audio.js`

### 8.6 Narration Synchronisation Rules (1:1 Parity)

**CRITICAL:** Every on-screen text string that is narrated must match the narration data **exactly** (same words, same punctuation, same capitalisation). Any UI text change requires:

1. Update `generate_audio.js` phrases array
2. Re-run: `node scripts/generate_audio.js`
3. Update corresponding text in the React UI component
4. Optionally run: `node scripts/clean_audio.js`

═══════════════════════════════════════════════════════════════════════════════

## 9. Randomisation Engine

### 9.1 Fisher-Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### 9.2 Per-Session Question Generation (`utils/questionGenerator.js`)

Unlike a fixed question bank that is merely reshuffled, this module **regenerates the numeric content of every question on every session**, per the PRD's randomisation requirement (Section 7.3 of the PRD):

```javascript
const NAMES = ["John", "Mike", "Sarah", "Emma", "Liam", "Olivia", "Noah", "Ava",
               "Lucas", "Sophia", "Daniel", "Maria", "Ethan", "Grace", "Ryan",
               "Mia", "Aiden", "Zoe", "James", "Chloe"];

const OBJECTS = ["pencil", "eraser", "notebook", "storybook", "toy car", "juice box",
                 "sandwich", "sticker pack", "water bottle", "ice cream", "kite",
                 "ball", "backpack", "cap", "balloon"];

const CONTEXTS = ["school store", "weekend market", "lemonade stand", "toy shop",
                   "book fair", "bakery", "stationery shop", "neighbourhood store"];

function randomCentsInRange(difficulty) {
  const ranges = {
    1: [50, 1000],     // Easy: $0.50–$10.00
    2: [500, 5000],    // Medium: $5.00–$50.00
    3: [1000, 10000],  // Hard: $10.00–$100.00
  };
  const [min, max] = ranges[difficulty];
  // Round to nearest 5 cents for realistic price-tag values
  return Math.round((min + Math.random() * (max - min)) / 5) * 5;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateQuestion(type, world, difficulty) {
  const amountCents = randomCentsInRange(difficulty);
  const generator = QUESTION_GENERATORS[type];
  return generator({ amountCents, world, difficulty, names: NAMES, objects: OBJECTS, contexts: CONTEXTS, pick });
}

export function generateSessionQuestions() {
  const typeWorldDifficultyMap = buildTypeDistribution(); // From PRD Section 7.2 table
  const questions = typeWorldDifficultyMap.map(({ type, world, difficulty }, i) =>
    generateQuestion(type, world, difficulty)
  );
  return shuffleArray(questions);
}
```

### 9.3 MCQ Distractor Generation (`utils/scoring.js`)

Distractors are generated using **plausible money-specific error patterns**, not arbitrary offsets, since this is far more pedagogically meaningful for decimal notation:

```javascript
export function generateMoneyDistractors(correctCents, count = 3) {
  const distractors = new Set();

  const errorPatterns = [
    (c) => swapDollarsAndCents(c),         // e.g. $4.65 → $65.04 pattern error
    (c) => c + 9,                           // off-by-near-cent error
    (c) => c - 9,
    (c) => c + 100,                         // dollar-place error
    (c) => c - 100,
    (c) => shiftDecimalPoint(c),            // e.g. $4.65 → $46.50 (decimal shift error)
    (c) => transposeCentsDigits(c),         // e.g. $4.65 → $4.56
  ];

  shuffleArray(errorPatterns).forEach((fn) => {
    if (distractors.size >= count) return;
    const d = fn(correctCents);
    if (d > 0 && d !== correctCents) distractors.add(d);
  });

  // Fallback fill if pattern generation didn't yield enough unique distractors
  while (distractors.size < count) {
    const d = correctCents + (distractors.size + 1) * 5;
    if (d !== correctCents) distractors.add(d);
  }

  return shuffleArray([correctCents, ...distractors]).map(formatCents);
}

export function formatCents(cents) {
  const dollars = Math.floor(cents / 100);
  const c = cents % 100;
  return `$${dollars}.${String(c).padStart(2, '0')}`;
}
```

### 9.4 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_decimal_money_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

**Note:** `questionSet` (the generated question array) is intentionally **excluded** from persisted state if the session is resumed after a long gap — on restore, if the saved `currentQuestion` index is reached, a fresh `generateSessionQuestions()` call regenerates remaining questions rather than restoring stale randomised values, preserving the "every question is random" guarantee even across resumed sessions.

═══════════════════════════════════════════════════════════════════════════════

## 10. Gamification Implementation

### 10.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 10.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0;                   // Try again
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 10.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  {
    id: 'money_explorer',
    label: '🏅 Money Explorer',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'decimal_builder',
    label: '🥈 Decimal Builder',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'decimal_champion',
    label: '🥇 Decimal Champion',
    description: 'Score 80%+ in Play phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_change',
    label: '💎 Perfect Change',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'full_journey',
    label: '🌟 Full Journey',
    description: 'Complete all 5 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'sharp_counter',
    label: '🎯 Sharp Counter',
    description: 'Complete Station A without overshooting the target',
    condition: (s) => s.stationAPerfect === true,
  },
  {
    id: 'smart_shopper',
    label: '🤝 Smart Shopper',
    description: 'Answer 5 change/word-problem questions correctly',
    condition: (s) => (s.smartShopperCorrect || 0) >= 5,
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}

// Call after every state update that could unlock a badge:
const newBadges = checkBadges(newState);
if (newBadges.length > 0) {
  dispatch({ type: ACTIONS.UNLOCK_BADGE, payload: newBadges });
  newBadges.forEach(id => {
    const badge = BADGES.find(b => b.id === id);
    narrate([{ text: badge.description, style: 'celebration' }], apiKey);
  });
}
```

═══════════════════════════════════════════════════════════════════════════════

## 11. Money Arithmetic Utilities (Critical — `utils/money.js`)

```javascript
// All monetary math MUST flow through these helpers — never operate on raw floats.

export function dollarsAndCentsToCents(dollars, cents) {
  return Math.round(dollars) * 100 + Math.round(cents);
}

export function parseAmountToCents(input) {
  // Accepts "$4.65", "4.65", or "465" (raw cents string) and normalises to integer cents
  const cleaned = String(input).replace(/[$,\s]/g, '');
  if (cleaned.includes('.')) {
    const [d, c = '0'] = cleaned.split('.');
    return parseInt(d, 10) * 100 + parseInt(c.padEnd(2, '0').slice(0, 2), 10);
  }
  return parseInt(cleaned, 10);
}

export function formatCents(cents) {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const c = abs % 100;
  return `${sign}$${dollars}.${String(c).padStart(2, '0')}`;
}

export function addCents(a, b) {
  return a + b; // Safe: both already integers
}

export function subtractCents(a, b) {
  return a - b; // Safe: both already integers
}

export function compareCents(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}
```

═══════════════════════════════════════════════════════════════════════════════

## 12. CSS Animation Keyframes (matching `equal-tau.vercel.app` style exactly)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes digitPopIn {
  /* Applied to each place-value column digit with staggered delay */
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes coinDrop {
  /* Applied when a coin/note is dropped into MoneyTray */
  0%   { transform: translateY(-40px) scale(0.8); opacity: 0; }
  60%  { transform: translateY(4px) scale(1.05); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

@keyframes priceTagPop {
  0%   { transform: scale(0.5); opacity: 0; }
  60%  { transform: scale(1.08); }
  100% { transform: scale(1); opacity: 1; }
}

/* Stagger: each place-value column / coin gets animation-delay: (index * 120ms) */
```

═══════════════════════════════════════════════════════════════════════════════

## 13. Component Prop Contracts

| Component | Props | Returns |
|---|---|---|
| `PlaceValueChart` | `{ amountCents, missingColumn?, animated?, size? }` | SVG element (inline, responsive) |
| `MoneyTray` | `{ items, targetCents, onDrop, runningTotalCents }` | Droppable div with live `$X.XX` readout |
| `CoinNotePool` | `{ denominations, onDragStart, onTap }` | Flex row of draggable/tappable coin/note elements |
| `PriceTag` | `{ amountCents, onTap?, highlighted? }` | Styled price-tag card showing formatted amount |
| `NumberPad` | `{ max, value, onChange, onSubmit, decimalAware }` | Grid of digit buttons (min 44×44px), decimal point key, backspace, submit |
| `Mascot` | `{ mood: 'idle'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | img/svg + CSS animation class mapped to mood |
| `QuestionRenderer` | `{ question: Question, onAnswer: (answer: string) => void, hints: number }` | Type-specific question component |
| `FeedbackOverlay` | `{ isCorrect: boolean, explanation?: string, xpEarned: number, onContinue: () => void }` | Animated modal overlay (bounceIn correct / shake wrong) |
| `WorldMap` | `{ worldScores: (number\|null)[], currentWorld: number, onSelectWorld: (i) => void }` | Horizontal scrollable world list with star ratings and lock icons |
| `BadgePanel` | `{ badges: string[], newBadgeId?: string }` | Badge grid with unlock toast animation for `newBadgeId` |

═══════════════════════════════════════════════════════════════════════════════

## 14. Performance Requirements

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG animation frame rate | 60 fps |
| Memory usage | < 60 MB |
| Bundle size (gzipped) | < 600 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen audio TTFB | 0ms (static .mp3 assets) |
| ElevenLabs dynamic audio TTFB | < 2 seconds (API latency, used for randomised Phase 4 question text) |
| Question generation time (100 questions) | < 100ms (client-side, no network call) |

═══════════════════════════════════════════════════════════════════════════════

## 15. Browser & Device Support

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad) | Full — primary classroom device |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

Primary test device: iPad (768px, touch) — classroom use context
Secondary: Desktop Chrome (1280px+)

═══════════════════════════════════════════════════════════════════════════════

## 16. Testing Requirements

| Test Area | Coverage Requirement |
|---|---|
| Money arithmetic utilities (`money.js`) | 100% unit test coverage — must verify no floating-point drift across 1,000+ randomised add/subtract pairs |
| Question generator (`questionGenerator.js`) | Verify every generated question has a value within its declared difficulty range; verify no duplicate question signatures within a single 100-question session |
| Distractor generation | Verify all 4 MCQ options are always unique and the correct answer is always present exactly once |
| Badge engine | Unit test each of the 8 badge conditions independently and in combination |
| Audio parity | Automated lint step comparing all on-screen narrated strings against `audioMap.js` keys (static phrases) — flags any mismatch |
| Session persistence | Verify 24-hour resume restores phase/XP/badges correctly and regenerates question values rather than restoring stale ones |
| Accessibility | Axe-core automated pass + manual keyboard-only walkthrough of all 5 phases |
| Cross-device | Manual QA pass on iPad Safari, Desktop Chrome, and Android Chrome at minimum |

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
