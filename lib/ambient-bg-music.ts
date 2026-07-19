/** Nhạc nền chill lo-fi — êm, ấm; chỉ section 1. */

type AudioCtx = AudioContext;

const MUTE_KEY = "bp-bg-music-muted";
/** Đủ nghe trên loa điện thoại / laptop */
const DEFAULT_VOLUME = 0.11;

let sharedCtx: AudioCtx | null = null;
let masterGain: GainNode | null = null;
let started = false;
/** Chỉ true khi đang ở section 1 */
let sectionAudible = false;
let nodes: AudioNode[] = [];
let oscillators: OscillatorNode[] = [];
let bufferSources: AudioBufferSourceNode[] = [];
let lfos: OscillatorNode[] = [];
let chimeTimer: number | null = null;
let gestureBound = false;
let pendingVolume = DEFAULT_VOLUME;

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

/** Xóa preference mute cũ (nếu còn từ bản trước). */
function clearLegacyMutePreference() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(MUTE_KEY);
  } catch {
    // no-op
  }
}

export function isBgMusicPlaying(): boolean {
  return started && sectionAudible && sharedCtx?.state === "running";
}

function targetGain(volume: number) {
  if (!sectionAudible) return 0.0001;
  return Math.max(0.001, Math.min(0.18, volume));
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
  for (const src of bufferSources) {
    try {
      src.stop();
      src.disconnect();
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
  bufferSources = [];
  lfos = [];
  nodes = [];
  masterGain = null;
  started = false;
}

/** Pad chill lo-fi — ấm, chậm, có hơi noise mềm + pluck pentatonic */
function buildChillGraph(ctx: AudioCtx, volume = DEFAULT_VOLUME) {
  stopGraph();

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.connect(ctx.destination);
  masterGain = master;
  nodes.push(master);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(720, ctx.currentTime);
  filter.Q.value = 0.4;
  filter.connect(master);
  nodes.push(filter);

  const breath = ctx.createOscillator();
  breath.type = "sine";
  breath.frequency.value = 0.028;
  const breathGain = ctx.createGain();
  breathGain.gain.value = 110;
  breath.connect(breathGain);
  breathGain.connect(filter.frequency);
  breath.start();
  lfos.push(breath);
  nodes.push(breathGain);

  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;
  noise.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 1100;
  noiseFilter.Q.value = 0.55;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.04;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(filter);
  noise.start();
  bufferSources.push(noise);
  nodes.push(noiseFilter, noiseGain);

  const partials: { freq: number; type: OscillatorType; gain: number; detune: number }[] = [
    { freq: 87.31, type: "sine", gain: 0.42, detune: -3 },
    { freq: 110.0, type: "sine", gain: 0.36, detune: 2 },
    { freq: 130.81, type: "triangle", gain: 0.22, detune: -5 },
    { freq: 174.61, type: "sine", gain: 0.3, detune: 4 },
    { freq: 220.0, type: "sine", gain: 0.24, detune: -2 },
    { freq: 261.63, type: "sine", gain: 0.14, detune: 6 },
    { freq: 329.63, type: "sine", gain: 0.1, detune: -4 },
    { freq: 349.23, type: "triangle", gain: 0.06, detune: 3 },
  ];

  const t = ctx.currentTime;
  for (const p of partials) {
    for (const side of [-1, 1] as const) {
      const osc = ctx.createOscillator();
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, t);
      osc.detune.setValueAtTime(p.detune + side * 7, t);
      const g = ctx.createGain();
      g.gain.setValueAtTime(p.gain * 0.55, t);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      oscillators.push(osc);
      nodes.push(g);
    }
  }

  const swell = ctx.createOscillator();
  swell.type = "sine";
  swell.frequency.value = 0.07;
  const swellDepth = ctx.createGain();
  swellDepth.gain.value = 0.05;
  swell.connect(swellDepth);
  swellDepth.connect(filter.Q);
  swell.start();
  lfos.push(swell);
  nodes.push(swellDepth);

  const playPluck = () => {
    if (!masterGain || !sectionAudible || ctx.state !== "running") return;
    const now = ctx.currentTime;
    const notes = [174.61, 196.0, 220.0, 261.63, 293.66, 329.63];
    const freq = notes[Math.floor(Math.random() * notes.length)];
    const pluck = ctx.createOscillator();
    pluck.type = "sine";
    pluck.frequency.setValueAtTime(freq, now);
    pluck.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.0001, now);
    cg.gain.exponentialRampToValueAtTime(0.045, now + 0.12);
    cg.gain.exponentialRampToValueAtTime(0.0001, now + 3.6);
    const cf = ctx.createBiquadFilter();
    cf.type = "lowpass";
    cf.frequency.value = 1600;
    pluck.connect(cf);
    cf.connect(cg);
    cg.connect(master);
    pluck.start(now);
    pluck.stop(now + 3.8);
  };

  chimeTimer = window.setInterval(playPluck, 7200);
  window.setTimeout(playPluck, 1800);

  applyMasterGain(volume, 2.4);
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

/**
 * Bắt đầu nhạc chill (idempotent).
 * Build graph cả khi AudioContext còn suspended — resume khi có gesture.
 */
export async function startBgMusic(volume = DEFAULT_VOLUME): Promise<boolean> {
  clearLegacyMutePreference();
  pendingVolume = volume;

  const ctx = getAudioContext();
  if (!ctx) return false;

  try {
    if (ctx.state === "suspended") await ctx.resume();
  } catch {
    // Browser chặn autoplay — vẫn build graph, gesture sẽ resume sau
  }

  if (!started || !masterGain) {
    buildChillGraph(ctx, volume);
  } else {
    applyMasterGain(volume, 1.0);
  }

  try {
    if (ctx.state === "suspended") await ctx.resume();
  } catch {
    // no-op
  }

  return ctx.state === "running";
}

/** Chỉ section 1: audible; section khác / loading: tắt volume */
export function setBgMusicSectionActive(active: boolean, volume = DEFAULT_VOLUME) {
  sectionAudible = active;
  pendingVolume = volume;
  if (!started) {
    if (active) void startBgMusic(volume);
    return;
  }
  applyMasterGain(volume, active ? 1.2 : 0.45);
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
 * Gắn gesture sớm (kể cả lúc loading) để unlock AudioContext.
 * Volume chỉ nghe được khi sectionAudible === true (section 1).
 */
export function armBgMusicAutoStart(volume = DEFAULT_VOLUME) {
  if (typeof window === "undefined") return;
  clearLegacyMutePreference();
  pendingVolume = volume;

  const tryStart = () => {
    void (async () => {
      await unlockBgMusic();
      await startBgMusic(pendingVolume);
      if (sectionAudible) applyMasterGain(pendingVolume, 0.8);
    })();
  };

  if (!gestureBound) {
    gestureBound = true;
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointerup",
      "touchstart",
      "touchend",
      "keydown",
      "wheel",
      "click",
    ];
    for (const ev of events) {
      window.addEventListener(ev, tryStart, { passive: true, capture: true });
    }
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && sectionAudible) tryStart();
    });
  }

  // Pre-build (silent nếu chưa vào section 1) + thử phát
  void startBgMusic(volume);
}
