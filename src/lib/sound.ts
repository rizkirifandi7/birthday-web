"use client";

// Simple Web Audio API Synthesizer for Happy Birthday Melody & Sound Effects

let audioCtx: AudioContext | null = null;
let isPlayingMelody = false;
let currentTimeoutId: ReturnType<typeof setTimeout> | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a single musical note
export function playNote(freq: number, duration: number, type: OscillatorType = "sine", gainVal: number = 0.15) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Audio playback issue:", e);
  }
}

// Play chime/sparkle sound on candle blow or button click
export function playSparkleSound() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playNote(freq, 0.4, "triangle", 0.12);
    }, idx * 70);
  });
}

// Happy Birthday Notes & Durations
const NOTES: { freq: number; dur: number }[] = [
  { freq: 261.63, dur: 350 }, // C4
  { freq: 261.63, dur: 250 }, // C4
  { freq: 293.66, dur: 600 }, // D4
  { freq: 261.63, dur: 600 }, // C4
  { freq: 349.23, dur: 600 }, // F4
  { freq: 329.63, dur: 1000 }, // E4

  { freq: 261.63, dur: 350 }, // C4
  { freq: 261.63, dur: 250 }, // C4
  { freq: 293.66, dur: 600 }, // D4
  { freq: 261.63, dur: 600 }, // C4
  { freq: 392.00, dur: 600 }, // G4
  { freq: 349.23, dur: 1000 }, // F4

  { freq: 261.63, dur: 350 }, // C4
  { freq: 261.63, dur: 250 }, // C4
  { freq: 523.25, dur: 600 }, // C5
  { freq: 440.00, dur: 600 }, // A4
  { freq: 349.23, dur: 600 }, // F4
  { freq: 329.63, dur: 600 }, // E4
  { freq: 293.66, dur: 800 }, // D4

  { freq: 466.16, dur: 350 }, // Bb4
  { freq: 466.16, dur: 250 }, // Bb4
  { freq: 440.00, dur: 600 }, // A4
  { freq: 349.23, dur: 600 }, // F4
  { freq: 392.00, dur: 600 }, // G4
  { freq: 349.23, dur: 1200 }, // F4
];

export function toggleBirthdayMelody(onStateChange?: (playing: boolean) => void) {
  if (isPlayingMelody) {
    stopBirthdayMelody();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    isPlayingMelody = true;
    if (onStateChange) onStateChange(true);
    playMelodyLoop();
    return true;
  }
}

function playMelodyLoop() {
  let noteIdx = 0;

  function step() {
    if (!isPlayingMelody) return;
    const current = NOTES[noteIdx];
    playNote(current.freq, current.dur / 1000, "sine", 0.1);

    noteIdx = (noteIdx + 1) % NOTES.length;
    currentTimeoutId = setTimeout(step, current.dur + 80);
  }

  step();
}

export function stopBirthdayMelody() {
  isPlayingMelody = false;
  if (currentTimeoutId) {
    clearTimeout(currentTimeoutId);
    currentTimeoutId = null;
  }
}
