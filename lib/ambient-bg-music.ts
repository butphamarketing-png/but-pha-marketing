/** Nhạc nền spa — êm, ấm; chỉ dùng cho section 1 */

type AudioCtx = AudioContext;

const MUTE_KEY = "bp-bg-music-muted";
const DEFAULT_VOLUME = 0.048;

let sharedCtx: AudioCtx | null = null;
let masterGain: GainNode | null = null;
let started = false;
let muted = false;
/** Section 1 đang nghe được nhạc (không liên quan mute user) */
let sectionAudible = true;
let nodes: AudioNode[] = [];
let oscillators: OscillatorNode[] = [];
let lfos: OscillatorNode[] = [];
let chimeTimer: number | null = null;
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
    // Mặc định bật — chỉ tắt khi user đã chọn mute
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return muted;
  }
}

export function isBgMusicPlaying(): boolean {
  return started && !muted && sectionAudible && sharedCtx?.state === "running";
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

function targetGain(volume: number) {
  if (muted || !sectionAudible) return 0.0001;
  return Math.max(0.001, Math.min(0.1, volume));
}

function applyMasterGain(volume: number, fadeSec = 1.4) {
  const ctx = getAudioContext();
  if (!masterGain || !ctx) return;
  const now = ctx.currentTime;
  const cur = Math.max(0.0001, masterGain.gain.value);
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(cur, now);
  masterGain.gain.exponentialRampToValueAtTime(targetGain(volume), now + fadeSec);
}

function stopGraph() {
  if (chimeTimer != null) {
    window.clearInterval(chimeTimer);
    chimeTimer = null;
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

/** Pad spa ấm + chuông nhẹ (không pulse tech) */
function buildSpaGraph(ctx: AudioCtx, volume = DEFAULT_VOLUME) {
  stopGraph();

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.connect(ctx.destination);
  masterGain = master;
  nodes.push(master);

  // Warm lowpass
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(680, ctx.currentTime);
  filter.Q.value = 0.45;
  filter.connect(master);
  nodes.push(filter);

  // Breath / filter drift rất chậm
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.045;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 160;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();
  lfos.push(lfo);
  nodes.push(lfoGain);

  // Spa pad — G major 7 ấm (êm như lounge/spa)
  const partials: { freq: number; type: OscillatorType; gain: number }[] = [
    { freq: 98.0, type: "sine", gain: 0.42 }, // G2
    { freq: 146.83, type: "sine", gain: 0.36 }, // D3
    { freq: 196.0, type: "sine", gain: 0.28 }, // G3
    { freq: 246.94, type: "triangle", gain: 0.16 }, // B3
    { freq: 293.66, type: "sine", gain: 0.12 }, // D4
    { freq: 392.0, type: "sine", gain: 0.07 }, // G4
  ];

  const t = ctx.currentTime;
  for (const p of partials) {
    const osc = ctx.createOscillator();
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.freq, t);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 4, t);

    const g = ctx.createGain();
    g.gain.setValueAtTime(p.gain, t);
    osc.connect(g);
    g.connect(filter);
    osc.start();
    oscillators.push(osc);
    nodes.push(g);
  }

  // Soft chime / singing bowl mỗi ~5.5s
  const playChime = () => {
    if (!masterGain || muted || !sectionAudible || ctx.state !== "running") return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5 — nhẹ
    const freq = notes[Math.floor(Math.random() * notes.length)];
    const chime = ctx.createOscillator();
    chime.type = "sine";
    chime.frequency.setValueAtTime(freq, now);
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.0001, now);
    cg.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
    cg.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    const cf = ctx.createBiquadFilter();
    cf.type = "lowpass";
    cf.frequency.value = 2400;
    chime.connect(cf);
    cf.connect(cg);
    cg.connect(master);
    chime.start(now);
    chime.stop(now + 3);
  };

  chimeTimer = window.setInterval(playChime, 5500);
  window.setTimeout(playChime, 1800);

  applyMasterGain(volume, 2.8);
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

/** Bắt đầu nhạc spa (idempotent). */
export async function startBgMusic(volume = DEFAULT_VOLUME): Promise<boolean> {
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
    buildSpaGraph(ctx, volume);
  } else {
    applyMasterGain(volume, 1.2);
  }

  return true;
}

/** Bật/tắt nghe theo section — section khác fade out, section 1 fade in */
export function setBgMusicSectionActive(active: boolean, volume = DEFAULT_VOLUME) {
  sectionAudible = active;
  readMutedPreference();
  if (!started) {
    if (active && !muted) void startBgMusic(volume);
    return;
  }
  applyMasterGain(volume, active ? 1.6 : 0.9);
}

export function setBgMusicMuted(nextMuted: boolean, volume = DEFAULT_VOLUME) {
  writeMutedPreference(nextMuted);
  const ctx = getAudioContext();
  if (!masterGain || !ctx) {
    if (!nextMuted && sectionAudible) void startBgMusic(volume);
    return;
  }
  void ctx.resume().catch(() => undefined);
  applyMasterGain(volume, 0.8);
}

export function toggleBgMusicMute(volume = DEFAULT_VOLUME): boolean {
  const next = !isBgMusicMuted();
  if (!started && !next) {
    writeMutedPreference(false);
    if (sectionAudible) void startBgMusic(volume);
    return false;
  }
  setBgMusicMuted(next, volume);
  return next;
}

export function stopBgMusic() {
  const ctx = getAudioContext();
  if (masterGain && ctx) {
    applyMasterGain(0, 0.35);
    window.setTimeout(() => stopGraph(), 400);
  } else {
    stopGraph();
  }
}

/**
 * Unlock audio sớm; chỉ phát thật khi section 1 active + không mute.
 * Mặc định: auto bật (không mute).
 */
export function armBgMusicAutoStart(volume = DEFAULT_VOLUME) {
  if (typeof window === "undefined" || gestureBound) return;
  gestureBound = true;
  readMutedPreference();

  const tryStart = () => {
    if (isBgMusicMuted() || !sectionAudible) return;
    void startBgMusic(volume);
  };

  const events: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown", "wheel"];
  for (const ev of events) {
    window.addEventListener(ev, tryStart, { passive: true, capture: true });
  }

  if (sectionAudible && !muted) void startBgMusic(volume);
}
