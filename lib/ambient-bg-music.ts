/** Nhạc nền ambient — pad tím nhẹ, loop liên tục khi vào site */

type AudioCtx = AudioContext;

const MUTE_KEY = "bp-bg-music-muted";

let sharedCtx: AudioCtx | null = null;
let masterGain: GainNode | null = null;
let started = false;
let muted = false;
let nodes: AudioNode[] = [];
let oscillators: OscillatorNode[] = [];
let lfos: OscillatorNode[] = [];
let pulseTimer: number | null = null;
let gestureBound = false;

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

export function isBgMusicMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return muted;
  }
}

export function isBgMusicPlaying(): boolean {
  return started && !muted && sharedCtx?.state === "running";
}

function readMutedPreference() {
  muted = isBgMusicMuted();
}

function writeMutedPreference(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    // no-op
  }
}

function stopGraph() {
  if (pulseTimer != null) {
    window.clearInterval(pulseTimer);
    pulseTimer = null;
  }
  for (const osc of [...oscillators, ...lfos]) {
    try {
      osc.stop();
      osc.disconnect();
    } catch {
      // no-op
    }
  }
  for (const n of nodes) {
    try {
      n.disconnect();
    } catch {
      // no-op
    }
  }
  oscillators = [];
  lfos = [];
  nodes = [];
  masterGain = null;
  started = false;
}

function buildAmbientGraph(ctx: AudioCtx, volume = 0.055) {
  stopGraph();

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.connect(ctx.destination);
  masterGain = master;
  nodes.push(master);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(920, ctx.currentTime);
  filter.Q.value = 0.6;
  filter.connect(master);
  nodes.push(filter);

  // LFO filter sweep chậm
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.07;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 280;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();
  lfos.push(lfo);
  nodes.push(lfoGain);

  // Pad chord cinematic nhẹ
  const partials: { freq: number; type: OscillatorType; gain: number }[] = [
    { freq: 110, type: "sine", gain: 0.55 },
    { freq: 164.81, type: "sine", gain: 0.38 },
    { freq: 220, type: "triangle", gain: 0.28 },
    { freq: 277.18, type: "sine", gain: 0.18 },
    { freq: 329.63, type: "sine", gain: 0.12 },
    { freq: 440.0, type: "triangle", gain: 0.08 },
  ];

  const t = ctx.currentTime;
  for (const p of partials) {
    const osc = ctx.createOscillator();
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.freq, t);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, t);

    const g = ctx.createGain();
    g.gain.setValueAtTime(p.gain, t);
    osc.connect(g);
    g.connect(filter);
    osc.start();
    oscillators.push(osc);
    nodes.push(g);
  }

  // Pulse soft mỗi ~3.2s
  const pulseOsc = ctx.createOscillator();
  pulseOsc.type = "sine";
  pulseOsc.frequency.value = 55;
  const pulseGain = ctx.createGain();
  pulseGain.gain.setValueAtTime(0.0001, t);
  pulseOsc.connect(pulseGain);
  pulseGain.connect(filter);
  pulseOsc.start();
  oscillators.push(pulseOsc);
  nodes.push(pulseGain);

  pulseTimer = window.setInterval(() => {
    if (!masterGain || muted || ctx.state !== "running") return;
    const now = ctx.currentTime;
    pulseGain.gain.cancelScheduledValues(now);
    pulseGain.gain.setValueAtTime(0.0001, now);
    pulseGain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
    pulseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
  }, 3200);

  const target = muted ? 0.0001 : Math.max(0.001, Math.min(0.12, volume));
  master.gain.exponentialRampToValueAtTime(target, t + 2.2);
  started = true;
}

export async function unlockBgMusic(): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    if (ctx.state === "suspended") await ctx.resume();
    return ctx.state === "running";
  } catch {
    return false;
  }
}

/** Bắt đầu nhạc nền (idempotent). */
export async function startBgMusic(volume = 0.055): Promise<boolean> {
  readMutedPreference();
  const ctx = getAudioContext();
  if (!ctx) return false;

  try {
    if (ctx.state === "suspended") await ctx.resume();
  } catch {
    return false;
  }

  if (ctx.state !== "running") return false;

  if (!started || !masterGain) {
    buildAmbientGraph(ctx, volume);
  } else if (!muted && masterGain) {
    const now = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(Math.max(0.0001, masterGain.gain.value), now);
    masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, Math.min(0.12, volume)), now + 1.2);
  }

  return true;
}

export function setBgMusicMuted(nextMuted: boolean, volume = 0.055) {
  writeMutedPreference(nextMuted);
  const ctx = getAudioContext();
  if (!masterGain || !ctx) {
    if (!nextMuted) void startBgMusic(volume);
    return;
  }
  const now = ctx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(Math.max(0.0001, masterGain.gain.value), now);
  if (nextMuted) {
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  } else {
    void ctx.resume().catch(() => undefined);
    masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, Math.min(0.12, volume)), now + 0.8);
  }
}

export function toggleBgMusicMute(volume = 0.055): boolean {
  const next = !isBgMusicMuted();
  if (!started && !next) {
    writeMutedPreference(false);
    void startBgMusic(volume);
    return false;
  }
  setBgMusicMuted(next, volume);
  return next;
}

export function stopBgMusic() {
  const ctx = getAudioContext();
  if (masterGain && ctx) {
    const now = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    window.setTimeout(() => stopGraph(), 350);
  } else {
    stopGraph();
  }
}

/**
 * Gắn listener: tương tác đầu tiên → bật nhạc ngay (vượt autoplay block).
 * Gọi sớm trong loading / homepage.
 */
export function armBgMusicAutoStart(volume = 0.055) {
  if (typeof window === "undefined" || gestureBound) return;
  gestureBound = true;
  readMutedPreference();

  const tryStart = () => {
    if (isBgMusicMuted()) return;
    void startBgMusic(volume);
  };

  const events: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown", "wheel"];
  for (const ev of events) {
    window.addEventListener(ev, tryStart, { passive: true, capture: true });
  }

  void startBgMusic(volume);
}
