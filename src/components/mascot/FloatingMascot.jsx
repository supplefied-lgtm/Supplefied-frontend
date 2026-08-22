'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMascot, nextTip } from '@/store/slices/mascotSlice';
import { Sparkles, Zap, ChevronRight, X, ShoppingBag, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function FloatingMascot() {
  const dispatch = useDispatch();
  const { isMascotOpen, activeTipIndex } = useSelector((state) => state.mascot);
  const [hasInteracted, setHasInteracted] = useState(false);

  const tips = [
    "⚡ Drink 500ml water with electrolytes upon waking to accelerate hydration and cellular recovery.",
    "⚡ Creapure® creatine paired with post-workout carbs triggers 25% faster muscle cell phosphocreatine loading.",
    "⚡ Pair 350mg caffeine with 300mg Alpha-GPC for razor-sharp focus and sustained neuromuscular drive.",
    "⚡ Take Chelated Magnesium Bisglycinate 45 mins before sleep to support deep restorative slow-wave rest."
  ];

  return (
    <>
      {/* Floating Mascot Trigger (Positioned at Bottom Right) */}
      <div className="fixed bottom-[3dvh] right-[2.5vw] z-40 flex flex-col items-end gap-[1dvh]">
        {/* Active Speech Balloon (Opening toward left from bottom right, only when dialog is closed) */}
        {!isMascotOpen && !hasInteracted && (
          <div 
            onClick={() => {
              dispatch(toggleMascot());
              setHasInteracted(true);
            }}
            className="cursor-pointer group flex items-center gap-[0.6vw] px-[1vw] py-[1dvh] rounded-[clamp(0.8vw,1.2vw,1.6vw)] bg-white border border-lime-400 glow-lime-sm animate-bounce shadow-xl transition-all mb-2"
          >
            <div className="w-[clamp(1.8rem,2.2vw,2.6rem)] h-[clamp(1.8rem,2.2vw,2.6rem)] rounded-full overflow-hidden border border-lime-400/80 shrink-0 bg-slate-100">
              <img src="/images/mascot/bolt_avatar.png" alt="Bolt the Panther" className="w-full h-full object-cover" />
            </div>
            <div className="text-[clamp(0.7rem,0.75vw,0.85rem)] text-right">
              <span className="font-bold text-[#4d7c0f] block">Bolt (Chief Supplement Officer):</span>
              <span className="text-slate-800 font-medium">Need supplement advice? Ask me!</span>
            </div>
            <Zap className="w-[1rem] h-[1rem] text-[#65a30d] group-hover:scale-125 transition-transform" />
          </div>
        )}

        {/* Mascot Avatar Button */}
        <button
          onClick={() => {
            dispatch(toggleMascot());
            setHasInteracted(true);
          }}
          aria-label="Talk to Bolt the Panther"
          className="relative group p-[0.3vw] rounded-full bg-gradient-to-tr from-white via-slate-100 to-slate-200 border-2 border-lime-500 glow-lime hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
        >
          {/* Glowing pulse ring */}
          <span className="absolute -inset-[0.2vw] rounded-full bg-lime-400/30 animate-ping opacity-75 pointer-events-none" />
          
          <div className="relative w-[clamp(3.2rem,4vw,4.5rem)] h-[clamp(3.2rem,4vw,4.5rem)] rounded-full overflow-hidden flex items-center justify-center bg-slate-100 border border-slate-200">
            <img
              src="/images/mascot/bolt_avatar.png"
              alt="Bolt Mascot"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <span className="absolute -top-[0.4dvh] -left-[0.3vw] flex h-[1.2rem] w-[1.2rem]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[1.2rem] w-[1.2rem] bg-[#ea580c] text-[0.6rem] font-bold text-white items-center justify-center shadow-sm">⚡</span>
          </span>
        </button>
      </div>

      {/* Mascot Dialog Drawer */}
      {isMascotOpen && (
        <div className="fixed bottom-[18dvh] right-[2.5vw] z-50 w-[clamp(290px,27vw,400px)] max-w-[calc(100vw-3rem)] rounded-[clamp(1vw,1.5vw,2vw)] bg-white border border-lime-400 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-[1.2vw] bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-[0.8vw]">
              <div className="w-[clamp(2.4rem,3vw,3.2rem)] h-[clamp(2.4rem,3vw,3.2rem)] rounded-2xl overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
                <img src="/images/mascot/bolt_avatar.png" alt="Bolt Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-[0.4vw]">
                  <h3 className="text-[clamp(0.85rem,1vw,1.1rem)] font-bold text-slate-900 font-display">BOLT</h3>
                  <span className="text-[clamp(0.55rem,0.6vw,0.7rem)] uppercase font-bold tracking-wider px-[0.4vw] py-[0.1dvh] rounded-full bg-lime-100 text-lime-800 border border-lime-300">
                    Chief Officer
                  </span>
                </div>
                <p className="text-[clamp(0.65rem,0.7vw,0.75rem)] text-slate-500 font-medium">Bio-Performance Director</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleMascot())}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Daily Tip Content */}
          <div className="p-[1.2vw] space-y-[1.5dvh] bg-white">
            <div className="p-[1vw] rounded-2xl bg-slate-50 border border-slate-200 space-y-[0.8dvh]">
              <div className="flex items-center justify-between">
                <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] font-bold uppercase tracking-wider text-[#4d7c0f] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#65a30d]" /> Daily Protocol Insight
                </span>
                <button
                  onClick={() => dispatch(nextTip())}
                  className="text-[clamp(0.6rem,0.65vw,0.7rem)] text-slate-500 hover:text-lime-700 font-semibold transition-colors underline cursor-pointer"
                >
                  Next Insight →
                </button>
              </div>
              <p className="text-[clamp(0.7rem,0.78vw,0.85rem)] text-slate-700 leading-relaxed font-medium">
                {tips[activeTipIndex % tips.length]}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-[1dvh]">
              <Link
                href="/shop"
                onClick={() => dispatch(toggleMascot())}
                className="w-full py-[1.2dvh] px-[1vw] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.75rem,0.8vw,0.85rem)] flex items-center justify-between group shadow-md transition-all"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Explore All Supplements
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                onClick={() => dispatch(toggleMascot())}
                className="w-full py-[1dvh] px-[1vw] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[clamp(0.7rem,0.75vw,0.8rem)] flex items-center justify-between border border-slate-200 transition-all text-center"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#65a30d]" />
                  Contact Supplefied Support
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
