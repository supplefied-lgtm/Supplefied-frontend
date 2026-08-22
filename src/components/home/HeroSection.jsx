'use client';

import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative fluid-hero overflow-hidden cyber-grid border-b border-slate-200/80 flex items-center bg-[#f8fafc]">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-lime-300/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] bg-orange-300/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="fluid-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2vw] items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-[2.5dvh] text-left">
            
            {/* Mascot Chief Officer Tag with Confident Cartoon Avatar */}
            <div className="inline-flex items-center gap-[0.8vw] px-[1vw] py-[0.8dvh] rounded-full glass-panel bg-white/90 border-lime-500/40 glow-lime-sm shadow-sm">
              <div className="w-[clamp(1.8rem,2.2vw,2.6rem)] h-[clamp(1.8rem,2.2vw,2.6rem)] rounded-full overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
                <img src="/images/mascot/bolt_avatar.png" alt="Bolt the Panther" className="w-full h-full object-cover" />
              </div>
              <span className="text-[clamp(0.7rem,0.8vw,0.9rem)] font-bold text-slate-800 tracking-wide">
                Directed by <strong className="text-[#4d7c0f]">Bolt</strong> — Chief Supplement Officer
              </span>
            </div>

            {/* Main Headline with fluid typography */}
            <h1 className="text-[clamp(2.2rem,4.1vw,5rem)] font-black tracking-tighter text-slate-950 font-display leading-[1.05]">
              BIO-ENGINEERED <br />
              <span className="text-gradient-lime">ATHLETIC FUEL</span> FOR THE ELITE.
            </h1>

            {/* Sub-copy */}
            <p className="text-[clamp(0.85rem,1.1vw,1.25rem)] text-slate-600 max-w-[36rem] font-normal leading-relaxed">
              Zero compromises. Pure NAD+ cellular longevity boosters, 100% native cold-filtered whey isolates, Creapure® creatine, and clinical pre-workout formulas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-[1vw] pt-[1dvh]">
              <Link
                href="/shop"
                className="px-[2.2vw] py-[1.8dvh] rounded-[clamp(0.8vw,1.2vw,1.6vw)] bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.85rem,1vw,1.1rem)] flex items-center gap-[0.6vw] glow-lime transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
              >
                <Zap className="w-[1.2rem] h-[1.2rem] fill-current" />
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="px-[1.8vw] py-[1.8dvh] rounded-[clamp(0.8vw,1.2vw,1.6vw)] glass-panel bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-lime-500 font-bold text-[clamp(0.85rem,1vw,1.1rem)] flex items-center gap-[0.6vw] transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <span>About Us & Quality</span>
              </Link>
            </div>

            {/* Proof Metrics */}
            <div className="grid grid-cols-3 gap-[2vw] pt-[2.5dvh] border-t border-slate-200 max-w-[32rem]">
              <div>
                <span className="text-[clamp(1.4rem,2.2vw,2.8rem)] font-black text-slate-950 font-display block">99.9%</span>
                <span className="text-[clamp(0.6rem,0.7vw,0.8rem)] text-slate-500 font-mono uppercase tracking-wider font-semibold">HPLC Purity</span>
              </div>
              <div>
                <span className="text-[clamp(1.4rem,2.2vw,2.8rem)] font-black text-[#65a30d] font-display block">0g</span>
                <span className="text-[clamp(0.6rem,0.7vw,0.8rem)] text-slate-500 font-mono uppercase tracking-wider font-semibold">Added Sugars</span>
              </div>
              <div>
                <span className="text-[clamp(1.4rem,2.2vw,2.8rem)] font-black text-[#ea580c] font-display block">100%</span>
                <span className="text-[clamp(0.6rem,0.7vw,0.8rem)] text-slate-500 font-mono uppercase tracking-wider font-semibold">Lab Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Placed to the Right with Centered Pedestal */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-end relative">
            
            {/* Mascot Container Aligned to the Right */}
            <div className="relative w-full max-w-[38rem] flex flex-col items-center lg:items-end justify-center group">
              
              {/* Dynamic Ambient Glow Behind Mascot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] bg-gradient-to-tr from-lime-300/30 to-orange-300/25 rounded-full blur-[110px] animate-pulse-glow pointer-events-none" />

              {/* Large Mascot Render */}
              <div className="relative right-[-4vw] z-10 w-full flex flex-col items-center justify-center">
                <img
                  src="/images/hero/bolt_cartoon_full.png"
                  alt="Bolt the Panther Mascot Holding NAD+ 1000mg"
                  className="max-h-[78dvh] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(15,23,42,0.18)] hover:scale-105 transition-transform duration-500"
                />

                {/* Centered Base Glow Platform Beneath Feet */}
                <div className="w-[60%] h-[12px] bg-gradient-to-r from-transparent via-lime-400/50 to-transparent blur-md rounded-full -mt-[1.5dvh] z-0" />
                <div className="w-[40%] h-[4px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent blur-sm rounded-full -mt-[8px] z-0" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
