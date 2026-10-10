import { say, ask, cheer, emphasize, think, celebrate, instruct, pause } from './audio.js';

// ─── INTRO SCREEN ────────────────────────────────
export function introNarration() {
  return [
    cheer("Hello! Today we're going to learn Decimal Notation for Money!"),
  ];
}

// ─── WONDER PHASE ────────────────────────────────
export function wonderNarration() {
  return [
    think("Sarah has 4 one-dollar coins and 3 quarters in her piggy bank. Her friend says she has $4.75."),
  ];
}

export function wonderDiscoverNarration() {
  return [
    cheer("What does that funny dot in the middle mean? Let's discover!"),
  ];
}

// ─── STORY PHASE ─────────────────────────────────
export function getStoryNarration(slideIndex) {
  switch (slideIndex) {
    case 0:
      return [
        say("It was a hot, sunny afternoon! John and Sarah set up a bright and colorful lemonade stand in their neighborhood. John wanted to sell a cup of cold lemonade for exactly 1 dollar and 50 cents."),
      ];
    case 1:
      return [
        say("He needs a way to write the price so everyone understands. He writes it on the wooden price board as $1.50 using a special dot. That dot is incredibly important for money!"),
      ];
    case 2:
      return [
        say("That special dot is called a Decimal Point. It separates the whole dollars from the smaller cents. Dollars always go on the left of the decimal point, and cents go on the right."),
      ];
    case 3:
      return [
        say("A customer pays! Sarah opens the cash box to count what they have so far. She finds 6 one-dollar coins and 25 cents in quarters. That means they have exactly $6.25 altogether!"),
      ];
    case 4:
      return [
        say("At the end of a busy day, they add up all their money. They started with $1.50 and added $6.25. They made a total of $7.75! Time to split their earnings fairly!"),
      ];
    default:
      return [];
  }
}

// ─── SIMULATE PHASE ──────────────────────────────
export function simulateStation1Intro() {
  return [
    instruct("Drop coins and notes into the tray to make exactly the target amount!"),
    instruct("Watch the price tag at the top change as you add each coin."),
  ];
}

export function simulateStation2Intro() {
  return [
    instruct("Drag the digits into the correct columns. Dollars, tenths, and hundredths!"),
  ];
}

export function simulateStation3Intro() {
  return [
    ask("Tap the price tag with the greater amount!"),
  ];
}

export function simulateStation4Intro() {
  return [
    instruct("Let's add the costs together! Tap the correct total for the shopping cart."),
  ];
}

export function simulateStation5Intro() {
  return [
    instruct("Time to give change! Subtract the cost from the amount paid and tap the right change."),
  ];
}

export function simulateAllComplete() {
  return [];
}

// ─── PLAY PHASE ──────────────────────────────────
export function playWorldIntro(worldName) {
  return [
    celebrate(`Welcome to ${worldName}!`),
  ];
}

export function playReadQuestion(questionText) {
  return [
    say(questionText),
  ];
}

export function playCorrectNarration(streak = 0) {
  return [
    celebrate("Perfect! That is exactly right! You are a Decimal Champion in the making!"),
  ];
}

export function playWrongNarration(attempt = 1) {
  if (attempt === 1) {
    return [
      cheer("Not quite! Let us check the decimal point again."),
    ];
  } else {
    return [
      think("Watch the columns with me! Which one is the dollars?"),
    ];
  }
}

export function playWorldComplete(worldName, score, total) {
  return [
    say(`${worldName} Complete!`),
    say(`Score: ${score} out of ${total}`),
  ];
}

// ─── REFLECT PHASE ───────────────────────────────
export function reflectIntroNarration() {
  return [
    think("What a journey today! Can you write your own amount of money using a decimal point?"),
  ];
}

export function reflectCorrectNarration() {
  return [];
}

export function reflectWrongNarration() {
  return [];
}

export function reflectConfidenceNarration() {
  return [];
}

export function reflectCertificateNarration(pct) {
  return [
    celebrate("Lesson complete! You are a Decimal Notation Champion!"),
  ];
}
