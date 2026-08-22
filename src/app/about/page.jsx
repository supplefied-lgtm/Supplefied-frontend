'use client';

import Link from 'next/link';
import { Microscope } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-[7dvh]">
      <div className="fluid-container max-w-[65rem] space-y-[6dvh]">
        
        {/* Header */}
        <div className="text-center max-w-[45rem] mx-auto space-y-[2dvh]">
          <div className="inline-flex items-center gap-[0.5vw] px-[1.2vw] py-[0.6dvh] rounded-full bg-lime-100 text-lime-800 text-[clamp(0.65rem,0.75vw,0.85rem)] font-mono font-bold border border-lime-300">
            <Microscope className="w-4 h-4 text-lime-600" />
            <span>ABOUT SUPPLEFIED</span>
          </div>

          <h1 className="text-[clamp(2.2rem,4vw,4.5rem)] font-black text-slate-950 font-display leading-tight">
            ENGINEERED TO OUTPERFORM. <br />
            <span className="text-gradient-lime">NEVER COMPROMISED.</span>
          </h1>

          <p className="text-[clamp(0.85rem,1.05vw,1.2rem)] text-slate-600 leading-relaxed font-medium">
            Supplefied was founded on a simple principle: modern athletes deserve pharmaceutical-grade precision, zero amino-spiking, and complete lab transparency.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw]">
          <div className="p-[2vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[1.5dvh] shadow-sm">
            <div className="w-[clamp(2.5rem,3.2vw,3.8rem)] h-[clamp(2.5rem,3.2vw,3.8rem)] rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center font-black text-[clamp(1rem,1.2vw,1.4rem)] border border-lime-300">
              01
            </div>
            <h3 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 font-display">Native Cold-Filtration</h3>
            <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 leading-relaxed">
              We never use harsh acid washes or extreme pasteurization. Our whey isolates maintain live native immunoglobulins and bio-active peptide chains.
            </p>
          </div>

          <div className="p-[2vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[1.5dvh] shadow-sm">
            <div className="w-[clamp(2.5rem,3.2vw,3.8rem)] h-[clamp(2.5rem,3.2vw,3.8rem)] rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-black text-[clamp(1rem,1.2vw,1.4rem)] border border-orange-300">
              02
            </div>
            <h3 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 font-display">Clinical Efficacy Dosing</h3>
            <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 leading-relaxed">
              No proprietary blends. Every active compound—from 8g L-Citrulline to 300mg Alpha-GPC—is dosed to match peer-reviewed scientific studies.
            </p>
          </div>

          <div className="p-[2vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[1.5dvh] shadow-sm">
            <div className="w-[clamp(2.5rem,3.2vw,3.8rem)] h-[clamp(2.5rem,3.2vw,3.8rem)] rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-black text-[clamp(1rem,1.2vw,1.4rem)] border border-sky-300">
              03
            </div>
            <h3 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 font-display">ISO 17025 Third-Party CoA</h3>
            <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 leading-relaxed">
              Every single batch is tested by Eurofins and Informed-Sport. You can verify your tub's certificate directly on our radar lookup engine.
            </p>
          </div>
        </div>

        {/* Mascot & Brand Synergy Section with Real Mascot Avatar */}
        <div className="p-[2.5vw] rounded-[clamp(1.2vw,2vw,3vw)] glass-panel bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-[2vw] shadow-xl">
          <div className="flex items-center gap-[1.5vw]">
            <div className="w-[clamp(4.5rem,6vw,7.5rem)] h-[clamp(4.5rem,6vw,7.5rem)] rounded-3xl overflow-hidden border-2 border-lime-500 glow-lime-sm shrink-0 bg-slate-100 shadow-md">
              <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-[0.8dvh]">
              <span className="text-[clamp(0.65rem,0.75vw,0.85rem)] font-bold uppercase font-mono text-[#4d7c0f]">Bolt — Chief Supplement Officer</span>
              <h3 className="text-[clamp(1.2rem,1.8vw,2.2rem)] font-bold text-slate-900 font-display">Direction & Quality Assurance</h3>
              <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 leading-relaxed max-w-[32rem]">
                Bolt embodies our relentless pursuit of predatory athleticism, speed, and endurance to create the world's most cutting-edge performance supplements.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-[2vw] py-[1.5dvh] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.8rem,0.9vw,1rem)] glow-lime transition-all shrink-0 shadow-md"
          >
            Explore the Formulas
          </Link>
        </div>

      </div>
    </div>
  );
}
