'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] bg-[#f8fafc] flex items-center justify-center p-[2vw] text-center">
      <div className="max-w-md p-[3vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 space-y-[2dvh] shadow-xl">
        <div className="w-[clamp(3.5rem,4.5vw,5.5rem)] h-[clamp(3.5rem,4.5vw,5.5rem)] rounded-full overflow-hidden border-2 border-lime-500 mx-auto glow-lime-sm bg-slate-100 shadow-md">
          <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-[0.8dvh]">
          <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#ea580c]">
            Error 404
          </span>
          <h1 className="text-[clamp(1.5rem,2vw,2.4rem)] font-black text-slate-950 font-display">
            PAGE NOT FOUND
          </h1>
          <p className="text-[clamp(0.75rem,0.8vw,0.85rem)] text-slate-500 font-medium">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-[1dvh] pt-[1dvh]">
          <Link
            href="/"
            className="w-full py-[1.2dvh] px-[1.5vw] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-xs flex items-center justify-center gap-2 glow-lime transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/shop"
            className="w-full py-[1.2dvh] px-[1.5vw] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
          >
            Explore Supplements
          </Link>
        </div>
      </div>
    </div>
  );
}
