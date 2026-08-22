'use client';

import { Zap, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 overflow-hidden relative z-30">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Left perk */}
        <div className="hidden md:flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
          <span>100% Native Cold-Filtered Lab Authenticity</span>
        </div>

        {/* Center Dynamic Offer */}
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe6500] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fe6500]"></span>
          </span>
          <span className="text-white font-medium">
            Use Code <strong className="text-[#bef264] font-mono tracking-wider font-bold bg-white/10 px-2 py-0.5 rounded border border-[#bef264]/40">BOLT20</strong> for 20% Off Your First Protocol
          </span>
        </div>

        {/* Right perk */}
        <div className="hidden lg:flex items-center gap-2 text-slate-300">
          <Zap className="w-3.5 h-3.5 text-[#fe6500]" />
          <span>Free Express Shipping Over $75</span>
        </div>

      </div>
    </div>
  );
}
