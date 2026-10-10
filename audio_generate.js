import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  introNarration,
  wonderNarration,
  wonderDiscoverNarration,
  getStoryNarration,
  simulateStation1Intro,
  simulateStation2Intro,
  simulateStation3Intro,
  simulateStation4Intro,
  simulateStation5Intro,
  playWorldIntro,
  playReadQuestion,
  playCorrectNarration,
  playWrongNarration,
  playWorldComplete,
  reflectIntroNarration,
  reflectCertificateNarration
} from './src/utils/narration.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alice Voice ID
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const API_KEY = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error("Please add VITE_ELEVENLABS_API_KEY to your .env file.");
  process.exit(1);
}

const OUT_DIR = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const audioMap = {};

async function generateAudio(text, filename) {
  if (audioMap[text]) return;

  const filepath = path.join(OUT_DIR, `${filename}.mp3`);
  const publicPath = `/audio/${filename}.mp3`;
  audioMap[text] = publicPath;

  if (fs.existsSync(filepath)) {
    console.log(`Skipping (already exists): ${filename}.mp3`);
    return;
  }

  console.log(`Generating: ${filename}.mp3`);

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.40,
          similarity_boost: 0.75,
          style: 0.20,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved: ${filename}.mp3`);
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

async function processSegments(segments, prefix) {
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.text && seg.text.trim()) {
      await generateAudio(seg.text, `${prefix}_${i}`);
    }
  }
}

async function run() {
  console.log("Starting ElevenLabs Audio Generation using voice Alice...");

  await processSegments(introNarration(), 'intro');
  await processSegments(wonderNarration(), 'wonder');
  await processSegments(wonderDiscoverNarration(), 'wonder_discover');
  
  for (let i = 0; i < 5; i++) {
    await processSegments(getStoryNarration(i), `story_${i}`);
  }

  await processSegments(simulateStation1Intro(), 'sim_1');
  await processSegments(simulateStation2Intro(), 'sim_2');
  await processSegments(simulateStation3Intro(), 'sim_3');
  await processSegments(simulateStation4Intro(), 'sim_4');
  await processSegments(simulateStation5Intro(), 'sim_5');

  // Hardcode play strings to ensure we capture them
  const playWorlds = ['Strawberry Farm', 'Jungle Trek', 'Ocean Deep', 'Sky Islands', 'Volcano Peak'];
  for (let i = 0; i < playWorlds.length; i++) {
    await processSegments(playWorldIntro(playWorlds[i]), `play_intro_${i}`);
    await processSegments(playWorldComplete(playWorlds[i], 10, 10), `play_complete_${i}`);
  }

  await processSegments(playCorrectNarration(), 'play_correct');
  await processSegments(playWrongNarration(1), 'play_wrong_1');
  await processSegments(playWrongNarration(2), 'play_wrong_2');

  await processSegments(reflectIntroNarration(), 'reflect_intro');
  await processSegments(reflectCertificateNarration(), 'reflect_cert');

  const mapContent = `export const audioMap = ${JSON.stringify(audioMap, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'utils', 'audioMap.js'), mapContent);
  console.log("audioMap.js generated successfully!");
}

run();
