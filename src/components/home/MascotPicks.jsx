'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { BUNDLE_DEALS } from '@/data/products';
import { addBundleToCart } from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import { Zap, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MascotPicks() {
  const dispatch = useDispatch();
  const flagshipBundle = BUNDLE_DEALS[0];

  const handleAddBundle = () => {
    dispatch(addBundleToCart({ bundle: flagshipBundle }));
    dispatch(addToast({ message: `⚡ Added Bolt's Hypertrophy Surge Stack with Free Shaker to Cart!` }));
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className="py-[7dvh] bg-transparent relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-0 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-lime-300/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="fluid-container">
        
        {/* Main Mascot Featured Box */}
        <div className="rounded-[clamp(1.2vw,2vw,3vw)] glass-panel bg-gradient-to-br from-white via-slate-50 to-slate-100/90 border border-slate-200 p-[clamp(1.5rem,3vw,3.5rem)] relative overflow-hidden shadow-xl">
          
          <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-center relative z-10">
            
            {/* Left: Mascot Persona & Pitch */}
            <div className="lg:col-span-7 space-y-[2dvh]">
              <div className="inline-flex items-center gap-[0.6vw] px-[1vw] py-[0.6dvh] rounded-full bg-white border border-lime-500/50 text-[#4d7c0f] text-[clamp(0.65rem,0.75vw,0.85rem)] font-mono font-bold tracking-wider shadow-sm">
                <div className="w-[1.2rem] h-[1.2rem] rounded-full overflow-hidden shrink-0 border border-lime-500/50 bg-slate-100">
                  <img src="/images/mascot/bolt_avatar.png" alt="Bolt" className="w-full h-full object-cover" />
                </div>
                <span>BOLT'S SIGNATURE PROTOCOL</span>
              </div>

              <h2 className="text-[clamp(1.8rem,3.2vw,4rem)] font-black text-slate-950 font-display leading-tight">
                BOLT'S HYPERTROPHY <br />
                <span className="text-gradient-fire">SURGE STACK (3-IN-1)</span>
              </h2>

              <p className="text-[clamp(0.8rem,0.95vw,1.1rem)] text-slate-600 leading-relaxed">
                "I engineered this 3-tier matrix to bridge the gap between workout drive and cellular recovery. You get the highest biological value Whey Isolate, clinical pre-workout pump, and 99.9% German Creapure®—all in one synced bundle."
              </p>

              {/* Stack Features Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.8vw] pt-[0.5dvh]">
                {[
                  "ISO-KINETIC™ Pure Whey Isolate (2 lbs)",
                  "CYBER-DRIVE™ High-Stim Pre-Workout (450g)",
                  "QUANTUM-ATP™ Creapure® Creatine (250g)",
                  "Free Supplefied Matte-Black Shaker ($18 Value)"
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-[0.5vw] text-[clamp(0.7rem,0.75vw,0.85rem)] text-slate-700 font-medium">
                    <div className="w-[1.2rem] h-[1.2rem] rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 border border-lime-300">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action Row */}
              <div className="pt-[2dvh] border-t border-slate-200 flex flex-col sm:flex-row sm:items-center gap-[1.5vw]">
                <div className="space-y-1">
                  <div className="flex items-center gap-[0.8vw] flex-wrap">
                    <span className="text-xs text-slate-400 line-through">${flagshipBundle.originalTotal}</span>
                    <span className="text-[clamp(1.6rem,2.4vw,3rem)] font-black text-slate-950 font-display leading-none">
                      ${flagshipBundle.bundlePrice}
                    </span>
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#ea580c] text-white font-bold text-xs whitespace-nowrap shrink-0 shadow-sm leading-none">
                      SAVE 17%
                    </span>
                  </div>
                  <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] text-slate-500 font-mono block">Includes Free Express 2-Day Shipping</span>
                </div>

                <div className="flex flex-wrap gap-[0.8vw]">
                  <button
                    onClick={handleAddBundle}
                    className="px-[1.8vw] py-[1.5dvh] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.8rem,0.85vw,0.95rem)] flex items-center gap-2 glow-lime transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Add Full Stack to Cart</span>
                  </button>

                  <Link
                    href="/shop"
                    className="px-[1.5vw] py-[1.5dvh] rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-[clamp(0.75rem,0.8vw,0.85rem)] flex items-center gap-2 transition-all shadow-sm"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Right: Bundle Visual Imagery with Real Avatar Badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[22rem] aspect-square rounded-[clamp(1.2vw,1.8vw,2.5vw)] bg-white border border-slate-200 p-[1.5vw] flex items-center justify-center overflow-hidden shadow-inner">
                <div className="absolute w-[18vw] h-[18vw] bg-orange-200/40 rounded-full blur-3xl animate-pulse" />
                <img
                  src={flagshipBundle.image}
                  alt={flagshipBundle.name}
                  className="max-h-[26dvh] object-contain filter drop-shadow-xl relative z-10 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-[1.5dvh] right-[1vw] z-20 px-[0.8vw] py-[0.5dvh] rounded-xl bg-white/95 backdrop-blur-md border border-lime-400 text-[clamp(0.65rem,0.7vw,0.75rem)] font-bold text-[#4d7c0f] flex items-center gap-1.5 shadow-md">
                  <div className="w-[1rem] h-[1rem] rounded-full overflow-hidden bg-slate-100">
                    <img src="/images/mascot/bolt_avatar.png" alt="Bolt" className="w-full h-full object-cover" />
                  </div>
                  <span>Bolt Certified Synergy</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
