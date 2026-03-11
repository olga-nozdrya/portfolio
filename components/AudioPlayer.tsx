'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

const DUR = 26;

export default function AudioPlayer() {
  const { dark } = useTheme();
  const waveRef = useRef<HTMLCanvasElement>(null);
  const acRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufRef = useRef<AudioBuffer | null>(null);
  const startedAt = useRef(0);
  const pausedAt = useRef(0);
  const rafRef = useRef<number>(0);
  const bars = useRef<number[] | null>(null);

  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);

  const buildBuf = (ctx: AudioContext): AudioBuffer => {
    const sr = ctx.sampleRate;
    const len = sr * DUR;
    const buf = ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    let seed = 77;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return ((seed >>> 0) / 0xffffffff) * 2 - 1;
    };
    const freqs = [160, 200, 260, 340, 430, 530, 660, 820];
    const amps = [0.24, 0.19, 0.15, 0.12, 0.09, 0.07, 0.05, 0.04];
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = Math.min(1, t / 0.25) * Math.min(1, (DUR - t) / 1.2);
      const vib = 1 + 0.012 * Math.sin(2 * Math.PI * 5.4 * t);
      let s = 0;
      freqs.forEach((f, k) => { s += amps[k] * Math.sin(2 * Math.PI * f * vib * t); });
      s += 0.035 * rnd() * env;
      d[i] = s * env * (0.55 + 0.45 * Math.max(0, Math.sin(Math.PI * t / 1.3)));
    }
    return buf;
  };

  useEffect(() => {
    const N = 64;
    let s = 55;
    const r = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
    bars.current = Array.from({ length: N }, (_, i) => {
      const t = i / N;
      const e = Math.min(1, t / 0.07) * Math.min(1, (1 - t) / 0.07);
      return 0.16 + r() * 0.76 * e;
    });
  }, []);

  const draw = useCallback((p: number) => {
    const cv = waveRef.current;
    if (!cv || !bars.current) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const N = bars.current.length;
    const bw = Math.max(1, (W - (N - 1) * 2) / N);
    const played = dark ? 'rgba(240,236,230,.88)' : 'rgba(26,25,23,.83)';
    const future = dark ? 'rgba(240,236,230,.17)' : 'rgba(26,25,23,.14)';
    bars.current.forEach((h, i) => {
      const x = i * (bw + 2);
      const hh = Math.max(2, h * H * 0.88);
      const y = (H - hh) / 2;
      ctx.fillStyle = i / N < p ? played : future;
      ctx.beginPath();
      if ((ctx as CanvasRenderingContext2D & { roundRect?: Function }).roundRect) {
        (ctx as any).roundRect(x, y, bw, hh, 1.5);
      } else {
        ctx.rect(x, y, bw, hh);
      }
      ctx.fill();
    });
  }, [dark]);

  useEffect(() => {
    const cv = waveRef.current;
    if (!cv) return;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      cv.getContext('2d')?.scale(dpr, dpr);
      draw(prog);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { draw(prog); }, [dark, prog, draw]);

  const tick = useCallback(() => {
    if (!acRef.current || !playing) return;
    const el = acRef.current.currentTime - startedAt.current + pausedAt.current;
    const p = Math.min(1, el / DUR);
    setProg(p);
    if (p < 1) { rafRef.current = requestAnimationFrame(tick); }
    else { setPlaying(false); pausedAt.current = 0; setProg(0); }
  }, [playing]);

  useEffect(() => {
    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick]);

  const getCtx = () => {
    if (!acRef.current) {
      acRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainRef.current = acRef.current.createGain();
      gainRef.current.gain.value = 0.65;
      gainRef.current.connect(acRef.current.destination);
      bufRef.current = buildBuf(acRef.current);
    }
    return acRef.current;
  };

  const play = () => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    srcRef.current = ctx.createBufferSource();
    srcRef.current.buffer = bufRef.current;
    srcRef.current.connect(gainRef.current!);
    startedAt.current = ctx.currentTime;
    srcRef.current.start(0, pausedAt.current);
    setPlaying(true);
  };

  const pause = () => {
    if (!srcRef.current) return;
    pausedAt.current += acRef.current!.currentTime - startedAt.current;
    srcRef.current.stop();
    srcRef.current = null;
    setPlaying(false);
  };

  const seek = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = waveRef.current!.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    pausedAt.current = p * DUR;
    setProg(p);
    if (playing) {
      srcRef.current?.stop();
      srcRef.current = null;
      const ctx = getCtx();
      if (ctx.state === 'suspended') ctx.resume();
      srcRef.current = ctx.createBufferSource();
      srcRef.current.buffer = bufRef.current;
      srcRef.current.connect(gainRef.current!);
      startedAt.current = ctx.currentTime;
      srcRef.current.start(0, pausedAt.current);
    }
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="pf-audio">
      <div className="ap-row1">
        <div className="ap-ava">🎙</div>
        <div>
          <div className="ap-name">Голосовое представление</div>
          <div className="ap-hint">{fmt(DUR)} · нажмите, чтобы послушать</div>
        </div>
      </div>
      <div className="ap-row2">
        <button className="ap-btn" onClick={playing ? pause : play}>
          {playing ? (
            <svg width="10" height="12" fill="currentColor" viewBox="0 0 10 12">
              <rect x="0" width="3.5" height="12" rx="1.2" />
              <rect x="6.5" width="3.5" height="12" rx="1.2" />
            </svg>
          ) : (
            <svg width="10" height="12" fill="currentColor" viewBox="0 0 10 12" style={{ marginLeft: 1 }}>
              <path d="M0 0L10 6L0 12V0Z" />
            </svg>
          )}
        </button>
        <canvas
          ref={waveRef}
          className="ap-wave"
          onClick={seek}
          style={{ width: '100%', height: 30 }}
        />
        <span className="ap-time">{fmt(prog * DUR)}</span>
      </div>
    </div>
  );
}
