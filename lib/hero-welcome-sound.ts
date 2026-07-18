/** Âm thanh chào section 1 — signature jingle + giọng chào ngắn */

type AudioCtx = AudioContext;

const SESSION_KEY = "bp-hero-welcome-played";

let sharedCtx: AudioCtx | null = null;
let welcomePlaying = false;

function getAudioContext(): AudioCtx | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx) sharedCtx = new Ctx();
    return sharedCtx;
  } catch {
    return null;
  }
}

export function hasPlayedHeroWelcome(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markHeroWelcomePlayed() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // no-op
  }
}

export async function unlockHeroAudio(): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    if (ctx.state === "suspended") await ctx.resume();
    return ctx.state === "running";
  } catch {
    return false;
  }
}

/** Jingle ngắn ~1.2s — whoosh + chord tím brand */
export function playHeroSignatureSound(volume = 0.14) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    const t = ctx.currentTime;
    const vol = Math.max(0.001, Math.min(0.28, volume));

    // Whoosh mềm
    const frames = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      const env = Math.sin((i / frames) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * env * 0.55;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const hp = ctx.createBiquadFilter();
    hp.type = "bandpass";
    hp.frequency.setValueAtTime(680, t);
    hp.frequency.exponentialRampToValueAtTime(2400, t + 0.32);
    hp.Q.value = 0.7;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.exponentialRampToValueAtTime(vol * 0.45, t + 0.04);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    noise.connect(hp);
    hp.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.4);

    // Chord: A3 · C#4 · E4 (ấm, chuyên nghiệp)
    const notes = [220, 277.18, 329.63];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, t);
      const g = ctx.createGain();
      const start = t + 0.08 + i * 0.05;
      g.gain.setValueAtTime(0.001, start);
      g.gain.exponentialRampToValueAtTime(vol * (0.55 - i * 0.08), start + 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, start + 0.85);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.9);
    });

    // Sparkle cao nhẹ
    const sparkle = ctx.createOscillator();
    sparkle.type = "sine";
    sparkle.frequency.setValueAtTime(1318.5, t + 0.35);
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.001, t + 0.35);
    sg.gain.exponentialRampToValueAtTime(vol * 0.22, t + 0.42);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 0.75);
    sparkle.connect(sg);
    sg.connect(ctx.destination);
    sparkle.start(t + 0.35);
    sparkle.stop(t + 0.8);
  } catch {
    // no-op
  }
}

function pickVietnameseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => /vi(-|_)?VN/i.test(v.lang) && /female|nữ|linh|my/i.test(v.name)) ||
    voices.find((v) => /vi(-|_)?VN/i.test(v.lang)) ||
    voices.find((v) => /^vi/i.test(v.lang)) ||
    null
  );
}

export function stopHeroWelcomeSpeech() {
  try {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // no-op
  }
  welcomePlaying = false;
}

/** Giọng chào: “Chào mừng bạn đến với Bứt Phá Marketing” */
export function speakHeroWelcome(text = "Chào mừng bạn đến với Bứt Phá Marketing") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const run = () => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "vi-VN";
      u.rate = 0.94;
      u.pitch = 1.02;
      u.volume = 0.9;
      const voice = pickVietnameseVoice();
      if (voice) u.voice = voice;
      u.onend = () => {
        welcomePlaying = false;
      };
      u.onerror = () => {
        welcomePlaying = false;
      };
      welcomePlaying = true;
      window.speechSynthesis.speak(u);
    } catch {
      welcomePlaying = false;
    }
  };

  // Chrome: voices load async
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    window.speechSynthesis.addEventListener("voiceschanged", run, { once: true });
    window.setTimeout(run, 180);
    return;
  }
  run();
}

export function isHeroWelcomePlaying() {
  return welcomePlaying;
}

/**
 * Trải nghiệm đầy đủ: jingle → giọng chào.
 * Gọi sau gesture người dùng (hoặc khi AudioContext đã unlock).
 */
export async function playHeroWelcomeExperience(options?: {
  skipIfPlayed?: boolean;
  brandName?: string;
}): Promise<boolean> {
  const skipIfPlayed = options?.skipIfPlayed !== false;
  if (skipIfPlayed && hasPlayedHeroWelcome()) return false;

  const ok = await unlockHeroAudio();
  playHeroSignatureSound(ok ? 0.14 : 0.12);

  const name = options?.brandName?.trim() || "Bứt Phá Marketing";
  const line = `Chào mừng bạn đến với ${name}`;

  window.setTimeout(() => {
    speakHeroWelcome(line);
  }, 520);

  markHeroWelcomePlayed();
  return true;
}
