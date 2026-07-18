/** Tiếng gõ phím laptop — lách cách, ngắn, rõ từng nhịp */

type AudioCtx = AudioContext;

let sharedCtx: AudioCtx | null = null;
let unlockBound = false;
let lastClickAt = 0;
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

/** Noise ngắn — lớp “lách” của phím */
function getNoiseBuffer(ctx: AudioCtx): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) return noiseBuffer;
  const dur = 0.012;
  const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    const env = Math.exp(-i / (frames * 0.08));
    data[i] = (Math.random() * 2 - 1) * env;
  }
  noiseBuffer = buffer;
  return buffer;
}

export function ensureTypeClickAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);
  if (unlockBound) return;
  unlockBound = true;

  const unlock = () => {
    void ctx.resume().catch(() => undefined);
  };

  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
  window.addEventListener("wheel", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
}

/**
 * Tiếng gõ phím laptop: tap xuống + lách nhẹ (hai lớp).
 * Mỗi lần gọi một chút khác pitch để không đều như metronome.
 */
export function playTypeClickSound(volume = 0.07) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    const nowMs = performance.now();
    if (nowMs - lastClickAt < 10) return;
    lastClickAt = nowMs;

    const t = ctx.currentTime;
    const vol = Math.max(0.001, Math.min(0.22, volume));
    // Biến thiên nhẹ như từng phím khác nhau
    const pitchJitter = 0.88 + Math.random() * 0.28;
    const bright = Math.random();

    // 1) Transient “cạch” — xuống phím (square rất ngắn)
    const tap = ctx.createOscillator();
    tap.type = "square";
    tap.frequency.setValueAtTime(180 * pitchJitter, t);
    tap.frequency.exponentialRampToValueAtTime(55 * pitchJitter, t + 0.018);
    const tapGain = ctx.createGain();
    tapGain.gain.setValueAtTime(vol * 0.55, t);
    tapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.028);
    const tapFilter = ctx.createBiquadFilter();
    tapFilter.type = "lowpass";
    tapFilter.frequency.setValueAtTime(900 + bright * 400, t);
    tap.connect(tapFilter);
    tapFilter.connect(tapGain);
    tapGain.connect(ctx.destination);
    tap.start(t);
    tap.stop(t + 0.03);

    // 2) “Lách” cao — tiếng plastic/keycap
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2800 + bright * 2200;
    band.Q.value = 1.4;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(vol * (0.7 + bright * 0.25), t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.016);
    noise.connect(band);
    band.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.018);

    // 3) Tick mỏng — cạnh phím
    const tick = ctx.createOscillator();
    tick.type = "triangle";
    tick.frequency.setValueAtTime(4200 + Math.random() * 1800, t);
    const tickGain = ctx.createGain();
    tickGain.gain.setValueAtTime(vol * 0.28, t);
    tickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.01);
    tick.connect(tickGain);
    tickGain.connect(ctx.destination);
    tick.start(t);
    tick.stop(t + 0.012);
  } catch {
    // no-op
  }
}
