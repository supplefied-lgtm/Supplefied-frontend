'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openQuiz } from '@/store/slices/mascotSlice';
import { BUNDLE_DEALS } from '@/data/products';
import { addBundleToCart } from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import { Zap, Brain } from 'lucide-react';

export default function MascotHubPage() {
  const dispatch = useDispatch();
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);

  const adviceQuotes = [
    "⚡ 'Intensity without biological fuel is just metabolic exhaustion. Optimize your intracellular ATP first.'",
    "⚡ '99% of pre-workouts flood you with cheap beta-alanine tingles while skipping cholinergic focus. Demand Alpha-GPC.'",
    "⚡ 'Your growth hormone doesn't spike on caffeine; it spikes in stage-4 slow-wave sleep. Guard your recovery window like your PRs.'",
    "⚡ 'Native cold filtration keeps immunoglobulins alive. Stop drinking heat-damaged whey.'"
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[6dvh] relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-[5dvh] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-lime-300/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="fluid-container relative z-10">
        
        {/* Mascot Hero Header */}
        <div className="text-center max-w-[48rem] mx-auto space-y-[2dvh] mb-[6dvh]">
          <div className="inline-flex items-center gap-[0.6vw] px-[1.2vw] py-[0.8dvh] rounded-full glass-panel bg-white border-lime-400 text-[#4d7c0f] text-[clamp(0.7rem,0.75vw,0.85rem)] font-mono font-bold glow-lime-sm shadow-sm">
            <span>⚡ BOLT — CHIEF SUPPLEMENT OFFICER</span>
          </div>

          <h1 className="text-[clamp(2.4rem,4.5vw,4.8rem)] font-black text-slate-950 font-display tracking-tight">
            MEET BOLT: <br />
            <span className="text-gradient-fire">THE CYBER-PANTHER</span>
          </h1>

          <p className="text-[clamp(0.85rem,1vw,1.15rem)] text-slate-600 leading-relaxed font-medium">
            Engineered with predatory agility and scientific precision. Bolt oversees every formula synthesized in Supplefied Labs to ensure maximum bioavailability, explosive output, and zero fillers.
          </p>

          <div className="flex justify-center gap-[1vw] pt-[1dvh]">
            <button
              onClick={() => dispatch(openQuiz())}
              className="px-[2.5vw] py-[1.8dvh] rounded-[clamp(0.8vw,1.2vw,1.6vw)] bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.85rem,1vw,1.1rem)] flex items-center gap-2 glow-lime transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Launch Stack Builder</span>
            </button>
          </div>
        </div>

        {/* Mascot Visual Presentation & Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-center mb-[8dvh]">
          
          {/* Full High-Resolution Visual Character Render */}
          <div className="lg:col-span-6 rounded-[clamp(1.2vw,2vw,2.8vw)] glass-panel bg-white border border-slate-200 p-[1.5vw] overflow-hidden shadow-xl relative group">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-200">
              <img
                src="/images/mascot/bolt_full.jpg"
                alt="Bolt the Cyber-Panther Full Mascot Render"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-[2dvh] left-[1.5vw] px-[1vw] py-[0.8dvh] rounded-xl bg-white/90 backdrop-blur-md border border-lime-400 text-[clamp(0.7rem,0.8vw,0.9rem)] font-bold text-[#4d7c0f] flex items-center gap-2 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] animate-pulse" />
                <span>Bolt — Chief Supplement Officer</span>
              </div>
            </div>
          </div>

          {/* Bolt Advice & Philosophy Console */}
          <div className="lg:col-span-6 space-y-[2.5dvh]">
            
            <div className="rounded-[clamp(1.2vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 p-[2vw] space-y-[1.8dvh] shadow-sm">
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[clamp(2.5rem,3.2vw,4rem)] h-[clamp(2.5rem,3.2vw,4rem)] rounded-2xl overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100 shadow-sm">
                  <img src="/images/mascot/bolt_avatar.png" alt="Bolt Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-[clamp(1.1rem,1.4vw,1.7rem)] font-bold text-slate-900 font-display">The Bio-Panther Philosophy</h3>
                  <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500 font-mono font-medium">Origins of High-Performance Nutrition</span>
                </div>
              </div>

              <p className="text-[clamp(0.8rem,0.9vw,1rem)] text-slate-600 leading-relaxed font-medium">
                In nature, panthers rely on unmatched fast-twitch muscle recruitment, instantaneous reflexes, and rapid metabolic replenishment. Bolt represents the fusion of raw predatory power with clean sports nutrition.
              </p>

              <div className="grid grid-cols-2 gap-[1vw] pt-[1dvh]">
                <div className="p-[1vw] rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold text-[#4d7c0f] uppercase font-mono">Directive 01</span>
                  <p className="text-[clamp(0.7rem,0.75vw,0.85rem)] text-slate-700 font-medium">Zero artificial dyes, zero amino spiking.</p>
                </div>

                <div className="p-[1vw] rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold text-[#ea580c] uppercase font-mono">Directive 02</span>
                  <p className="text-[clamp(0.7rem,0.75vw,0.85rem)] text-slate-700 font-medium">Full clinical doses matching published literature.</p>
                </div>
              </div>
            </div>

            {/* Live Advice Box */}
            <div className="rounded-[clamp(1.2vw,1.8vw,2.5vw)] glass-panel bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-lime-300 p-[2vw] space-y-[1.5dvh] shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold uppercase font-mono tracking-widest text-[#4d7c0f] flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#65a30d]" /> Live Performance Directive
                </span>
                <button
                  onClick={() => setCurrentAdviceIndex((prev) => (prev + 1) % adviceQuotes.length)}
                  className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500 hover:text-slate-900 underline transition-colors cursor-pointer font-medium"
                >
                  Next Directive →
                </button>
              </div>

              <div className="p-[1.2vw] rounded-2xl bg-white border border-slate-200 shadow-sm">
                <p className="text-[clamp(0.85rem,1vw,1.15rem)] text-slate-800 font-medium leading-relaxed italic">
                  {adviceQuotes[currentAdviceIndex]}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Curated Elite Bundles Section */}
        <div className="space-y-[3dvh] mb-[8dvh]">
          <div>
            <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#ea580c]">
              Pre-Calibrated Bundles
            </span>
            <h2 className="text-[clamp(1.6rem,2.5vw,3rem)] font-black text-slate-950 font-display">
              BOLT'S SIGNATURE PROTOCOL STACKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.5vw]">
            {BUNDLE_DEALS.map((bundle) => (
              <div
                key={bundle.id}
                className="rounded-[clamp(1.2vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 hover:border-lime-500 p-[2vw] flex flex-col justify-between space-y-[2dvh] transition-all shadow-md hover:shadow-xl"
              >
                <div className="space-y-[1.5dvh]">
                  <div className="flex items-center justify-between">
                    <span className="px-[0.8vw] py-[0.4dvh] rounded-full text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold bg-orange-100 text-orange-800 border border-orange-300">
                      {bundle.badge}
                    </span>
                    <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-mono text-slate-500 font-bold">Save {bundle.discountPercent}%</span>
                  </div>

                  <h3 className="text-[clamp(1.2rem,1.5vw,1.8rem)] font-bold text-slate-900 font-display">{bundle.name}</h3>
                  <p className="text-[clamp(0.75rem,0.8vw,0.9rem)] text-slate-600 leading-relaxed">{bundle.tagline}</p>

                  <div className="flex items-center gap-[1.2vw] pt-[1dvh]">
                    <img src={bundle.image} alt={bundle.name} className="w-[clamp(4.5rem,6vw,7rem)] h-[clamp(4.5rem,6vw,7rem)] object-contain rounded-2xl bg-slate-50 p-2 border border-slate-200" />
                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 line-through">${bundle.originalTotal}</span>
                      <div className="text-[clamp(1.4rem,2vw,2.4rem)] font-black text-slate-950 font-display">${bundle.bundlePrice}</div>
                      <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] text-slate-500 font-medium">Includes Free Express Shipping</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    dispatch(addBundleToCart({ bundle }));
                    dispatch(addToast({ message: `⚡ Added ${bundle.name} to Cart!` }));
                  }}
                  className="w-full py-[1.5dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.8rem,0.85vw,0.95rem)] flex items-center justify-center gap-2 glow-lime transition-all cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Add Stack to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
