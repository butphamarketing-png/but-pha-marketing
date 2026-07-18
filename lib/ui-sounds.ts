/** Âm thanh UI homepage — click + xuất hiện thiết bị/ô */

type AudioCtx = AudioContext;

let sharedCtx: AudioCtx | null = null;
let lastClickAt = 0;
let lastAppearAt = 0;
let noiseBuffer: AudioBuffer | null = null;

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

function getNoiseBuffer(ctx: AudioCtx): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) return noiseBuffer;
  const dur = 0.05;
  const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    const env = Math.sin((i / frames) * Math.PI);
    data[i] = (Math.random() * 2 - 1) * env;
  }
  noiseBuffer = buffer;
  return buffer;
}

export function ensureUiAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);
}

/** Click UI — blip ngắn, rõ khi bấm nút / ô */
export function playUiClickSound(volume = 0.06) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    const nowMs = performance.now();
    if (nowMs - lastClickAt < 28) return;
    lastClickAt = nowMs;

    const t = ctx.currentTime;
    const vol = Math.max(0.001, Math.min(0.18, volume));
    const pitch = 620 + Math.random() * 180;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.72, t + 0.07);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);

    const tick = ctx.createOscillator();
    tick.type = "triangle";
    tick.frequency.setValueAtTime(pitch * 2.1, t);
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(vol * 0.35, t);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    tick.connect(tg);
    tg.connect(ctx.destination);
    tick.start(t);
    tick.stop(t + 0.045);
  } catch {
    // no-op
  }
}

/** Whoosh khi điện thoại / laptop trượt vào */
export function playDeviceAppearSound(volume = 0.09) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    const nowMs = performance.now();
    if (nowMs - lastAppearAt < 22) return;
    lastAppearAt = nowMs;

    const t = ctx.currentTime;
    const vol = Math.max(0.001, Math.min(0.2, volume));

    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.setValueAtTime(420, t);
    band.frequency.exponentialRampToValueAtTime(1800, t + 0.22);
    band.Q.value = 0.85;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.001, t);
    ng.gain.exponentialRampToValueAtTime(vol * 0.7, t + 0.04);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    noise.connect(band);
    band.connect(ng);
    ng.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.3);

    const thump = ctx.createOscillator();
    thump.type = "sine";
    thump.frequency.setValueAtTime(140, t);
    thump.frequency.exponentialRampToValueAtTime(70, t + 0.16);
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(vol * 0.4, t);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    thump.connect(tg);
    tg.connect(ctx.destination);
    thump.start(t);
    thump.stop(t + 0.2);
  } catch {
    // no-op
  }
}

/** Pop nhẹ khi ô / card / chip hiện */
export function playBoxAppearSound(volume = 0.055) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    const nowMs = performance.now();
    if (nowMs - lastAppearAt < 22) return;
    lastAppearAt = nowMs;

    const t = ctx.currentTime;
    const vol = Math.max(0.001, Math.min(0.16, volume));
    const base = 380 + Math.random() * 90;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(base, t);
    osc.frequency.exponentialRampToValueAtTime(base * 1.35, t + 0.06);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  } catch {
    // no-op
  }
}

/** Lên lịch chuỗi âm xuất hiện theo delay (ms) */
export function scheduleAppearSounds(
  items: { delayMs: number; kind: "device" | "box" }[],
  volumeScale = 1,
): () => void {
  const timers = items.map(({ delayMs, kind }) =>
    window.setTimeout(() => {
      if (kind === "device") playDeviceAppearSound(0.09 * volumeScale);
      else playBoxAppearSound(0.055 * volumeScale);
    }, Math.max(0, delayMs)),
  );
  return () => timers.forEach((id) => window.clearTimeout(id));
}
