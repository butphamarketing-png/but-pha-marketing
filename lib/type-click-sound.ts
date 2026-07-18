/** Tiếng gõ laptop — Web Audio, không cần file mp3 */

type AudioCtx = AudioContext;

let sharedCtx: AudioCtx | null = null;
let unlockBound = false;
let lastClickAt = 0;

function getAudioContext(): AudioCtx | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx) sharedCtx = new Ctx();
    return sharedCtx;
  } catch {
    return null;
  }
}

/** Gọi sớm để unlock audio sau thao tác đầu tiên (browser policy). */
export function ensureTypeClickAudio() {
  const ctx = getAudioContext();
  if (!ctx || unlockBound) return;
  unlockBound = true;

  const unlock = () => {
    void ctx.resume().catch(() => undefined);
  };

  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
  window.addEventListener("wheel", unlock, { passive: true, once: true });
  window.addEventListener("touchstart", unlock, { passive: true, once: true });
}

/**
 * Click ngắn kiểu bàn phím laptop.
 * @param volume 0–1 (mặc định ~0.06)
 */
export function playTypeClickSound(volume = 0.06) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    // Tránh chồng quá dày khi nhiều HeroReveal chạy cùng lúc
    const nowMs = performance.now();
    if (nowMs - lastClickAt < 14) return;
    lastClickAt = nowMs;

    const t = ctx.currentTime;
    const vol = Math.max(0.001, Math.min(0.2, volume));

    // Noise burst — cảm giác “lách cách” phím cơ/laptop
    const dur = 0.028;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (frames * 0.12));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1600 + Math.random() * 1400;
    filter.Q.value = 0.9;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.032);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.035);

    // Tick cao nhẹ
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2200 + Math.random() * 900, t);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(vol * 0.45, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
    osc.connect(g2);
    g2.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.02);
  } catch {
    // no-op
  }
}
