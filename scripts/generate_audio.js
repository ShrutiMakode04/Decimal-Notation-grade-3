import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiKey = process.env.VITE_ELEVENLABS_API_KEY;
const voiceId = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const audioDir = path.join(__dirname, '../public/assets/audio');

if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

const getElevenLabsSettings = (style) => {
    switch (style) {
        case 'celebration': return { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true };
        case 'encouragement': return { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true };
        case 'question': return { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true };
        case 'emphasis': return { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true };
        case 'thinking': return { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true };
        default: return { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true };
    }
};

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

async function generate() {
    const mapData = {};

    for (let i = 0; i < phrases.length; i++) {
        const { text, style } = phrases[i];
        const safeName = text.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 50);
        const filename = `audio_${safeName}_${i}.mp3`;
        const filepath = path.join(audioDir, filename);

        mapData[text] = `/assets/audio/${filename}`;

        if (fs.existsSync(filepath)) {
            console.log(`Skipping (already exists): ${filename}`);
            continue;
        }

        console.log(`Generating: ${filename}`);

        const settings = getElevenLabsSettings(style);

        try {
            const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: settings
                })
            });

            if (!res.ok) {
                console.error(`Failed to generate ${filename}: ${res.statusText}`);
                const textErr = await res.text();
                console.error(textErr);
                continue;
            }

            const buffer = await res.arrayBuffer();
            fs.writeFileSync(filepath, Buffer.from(buffer));
            console.log(`Saved: ${filename}`);
        } catch (err) {
            console.error(`Error with ${filename}:`, err.message);
        }

        await new Promise(r => setTimeout(r, 500));
    }

    const mapFile = path.join(__dirname, '../src/utils/audioMap.js');
    fs.writeFileSync(mapFile, `export const audioMap = ${JSON.stringify(mapData, null, 2)};\n`);
    console.log('Done generating! Map saved to src/utils/audioMap.js');
}

generate();
