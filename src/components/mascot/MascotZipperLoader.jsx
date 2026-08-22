'use client';

import { useState, useEffect, useRef } from 'react';

export default function MascotZipperLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const animFrameRef = useRef(null);

  // Strict scroll lock while active
  useEffect(() => {
    if (isDone) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const preventScroll = (e) => {
      if (!isDone) e.preventDefault();
    };

    const preventKeys = (e) => {
      if (!isDone && [32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
    };
  }, [isDone]);

  // Smooth unzipping progression (3.6 seconds)
  useEffect(() => {
    let startTimestamp = null;
    const duration = 3600;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth cubic progression
      const easedProgress =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }, 350);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (isDone) return null;

  // Normalized 1000x600 coordinate system for 100% deterministic SVG paths
  const W = 1000;
  const H = 600;
  const centerY = 300;

  // Zipper head coordinates: starts at exactly 0 and advances to 1150
  const zipperX = progress * 1150;

  // Exact rounded dome opening geometry
  const domeRadius = Math.min(zipperX, 450);
  const curveStartX = Math.max(0, zipperX - domeRadius);
  const gapRatio = domeRadius > 0 ? Math.min(1, zipperX / domeRadius) : 0;
  const yTopAtZero = centerY * (1 - gapRatio);
  const yBottomAtZero = centerY + (H - centerY) * gapRatio;

  // Top Flap Path
  const topFlapPath = `
    M 0 0
    L ${W} 0
    L ${W} ${centerY}
    L ${zipperX} ${centerY}
    C ${zipperX - domeRadius * 0.25} ${centerY * 0.7 + yTopAtZero * 0.3} ${curveStartX + domeRadius * 0.25} ${yTopAtZero} ${curveStartX} ${yTopAtZero}
    L 0 ${yTopAtZero}
    L 0 0
    Z
  `;

  // Bottom Flap Path
  const bottomFlapPath = `
    M 0 ${H}
    L ${W} ${H}
    L ${W} ${centerY}
    L ${zipperX} ${centerY}
    C ${zipperX - domeRadius * 0.25} ${centerY + (H - centerY) * 0.3} ${curveStartX + domeRadius * 0.25} ${yBottomAtZero} ${curveStartX} ${yBottomAtZero}
    L 0 ${yBottomAtZero}
    L 0 ${H}
    Z
  `;

  // Curve paths for glowing neon teeth edges
  const topCurveEdge = `
    M 0 ${yTopAtZero}
    L ${curveStartX} ${yTopAtZero}
    C ${curveStartX + domeRadius * 0.25} ${yTopAtZero} ${zipperX - domeRadius * 0.25} ${centerY * 0.7 + yTopAtZero * 0.3} ${zipperX} ${centerY}
  `;

  const bottomCurveEdge = `
    M 0 ${yBottomAtZero}
    L ${curveStartX} ${yBottomAtZero}
    C ${curveStartX + domeRadius * 0.25} ${yBottomAtZero} ${zipperX - domeRadius * 0.25} ${centerY + (H - centerY) * 0.3} ${zipperX} ${centerY}
  `;

  // Zipper teeth generator for closed portion (ahead of slider)
  const teeth = [];
  const toothSpacing = 16;
  const startX = Math.max(0, Math.floor(zipperX / toothSpacing) * toothSpacing);
  for (let x = startX; x < W; x += toothSpacing) {
    teeth.push(x);
  }

  // Running bounce calculation for slider
  const pullBob = Math.sin(progress * Math.PI * 24) * 4;
  const percentDisplay = Math.round(progress * 100);

  return (
    <div
      className={`fixed inset-0 z-[99999] pointer-events-auto select-none transition-opacity duration-700 w-full h-[100dvh] overflow-hidden ${
        progress >= 0.99 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading animation"
    >
      {/* SVG Canvas for Cloth Flaps and Zipper */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Light Athletic Fabric Gradient */}
          <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="bottomFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="40%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <linearGradient id="neonZipperEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#84cc16" stopOpacity="1" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="1" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="flapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0f172a" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* TOP CLOTH FLAP */}
        <path
          d={topFlapPath}
          fill="url(#topFlapGrad)"
          filter="url(#flapShadow)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* BOTTOM CLOTH FLAP */}
        <path
          d={bottomFlapPath}
          fill="url(#bottomFlapGrad)"
          filter="url(#flapShadow)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* GLOWING LIME PEEL EDGES (OPENED DOME LIPS) */}
        {zipperX > 15 && (
          <>
            {/* Top opening edge glow */}
            <path
              d={topCurveEdge}
              fill="none"
              stroke="url(#neonZipperEdge)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
            {/* Top zipper teeth dots */}
            <path
              d={topCurveEdge}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              opacity="0.95"
            />

            {/* Bottom opening edge glow */}
            <path
              d={bottomCurveEdge}
              fill="none"
              stroke="url(#neonZipperEdge)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
            {/* Bottom zipper teeth dots */}
            <path
              d={bottomCurveEdge}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              opacity="0.95"
            />
          </>
        )}

        {/* CLOSED ZIPPER SEAM (Ahead of Slider) */}
        {zipperX < W && (
          <g>
            <line
              x1={Math.max(0, zipperX)}
              y1={centerY}
              x2={W}
              y2={centerY}
              stroke="#64748b"
              strokeWidth="8"
            />
            <line
              x1={Math.max(0, zipperX)}
              y1={centerY}
              x2={W}
              y2={centerY}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Interlocking Zipper Teeth */}
            {teeth.map((tx, idx) => (
              <g key={tx}>
                <rect
                  x={tx}
                  y={centerY - 6}
                  width="5"
                  height="5.5"
                  rx="1"
                  fill={idx % 2 === 0 ? '#84cc16' : '#cbd5e1'}
                  opacity={idx % 2 === 0 ? 1 : 0.85}
                />
                <rect
                  x={tx + 6}
                  y={centerY + 0.5}
                  width="5"
                  height="5.5"
                  rx="1"
                  fill={idx % 2 !== 0 ? '#84cc16' : '#cbd5e1'}
                  opacity={idx % 2 !== 0 ? 1 : 0.85}
                />
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* HIGH-TECH ZIPPER SLIDER WITH BOLT MASCOT BADGE */}
      <div
        className="absolute top-1/2 z-30 pointer-events-none transition-transform will-change-transform flex items-center gap-2 sm:gap-3 -translate-y-1/2"
        style={{
          left: `${(zipperX / W) * 100}%`,
          transform: `translate(-40%, -50%) translateY(${pullBob}px)`,
        }}
      >
        {/* Physical Heavy Metal Zipper Slider Head */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="w-6 sm:w-8 h-12 sm:h-16 rounded-md bg-gradient-to-r from-slate-200 via-white to-slate-300 border-2 border-[#84cc16] shadow-[0_0_20px_rgba(132,204,22,0.6)] flex flex-col items-center justify-between p-1">
            <div className="w-3 sm:w-4 h-1 bg-[#84cc16] rounded-full shadow-[0_0_6px_#84cc16]" />
            <div className="w-1.5 h-4 sm:h-6 bg-slate-400 rounded-full" />
            <div className="w-3 sm:w-4 h-1 bg-[#84cc16] rounded-full shadow-[0_0_6px_#84cc16]" />
          </div>
          <div className="absolute -left-1.5 w-4 sm:w-5 h-6 sm:h-8 border-2 border-[#84cc16] rounded-full -z-10" />
        </div>

        {/* Mascot Chief Officer Badge Puller */}
        <div className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 border-2 border-[#84cc16] shadow-xl backdrop-blur-md">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#84cc16] bg-slate-100 shrink-0">
            <img
              src="/images/mascot/bolt_avatar.png"
              alt="Bolt Mascot"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col pr-1">
            <span className="text-[8px] sm:text-[10px] font-black text-[#4d7c0f] uppercase tracking-wider font-mono">
              BOLT PULLING
            </span>
            <span className="text-[7px] sm:text-[9px] font-black text-slate-900 uppercase tracking-tight">
              SUPPLEFIED VAULT
            </span>
          </div>

          <div className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-ping" />
        </div>
      </div>

      {/* Cyber HUD & Progress Overlay */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 sm:gap-3 pointer-events-none w-[90%] max-w-[420px]">
        <div className="flex items-center justify-between w-full bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border border-slate-200 shadow-2xl">
          <div className="flex flex-col items-start">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#4d7c0f] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-ping" />
              BIO-PERFORMANCE ENGINE
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-950 tracking-wide font-display">
              UNLEASHING SUPPLEFIED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-20 sm:w-28 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300 p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-[#84cc16] to-[#ea580c] rounded-full shadow-[0_0_8px_#84cc16] transition-all duration-75 ease-out"
                style={{ width: `${percentDisplay}%` }}
              />
            </div>

            <span className="font-mono text-xs sm:text-sm font-black text-[#4d7c0f] min-w-[2.8rem] text-right">
              {percentDisplay}%
            </span>
          </div>
        </div>
      </div>

      {/* Skip Button in Top Right */}
      <button
        onClick={() => {
          setIsDone(true);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 hover:bg-[#84cc16] text-slate-700 hover:text-black font-mono text-[10px] sm:text-xs uppercase tracking-wider border border-slate-300 hover:border-[#84cc16] transition-all duration-200 cursor-pointer pointer-events-auto backdrop-blur-sm shadow-md font-bold"
      >
        Skip ⚡
      </button>
    </div>
  );
}
