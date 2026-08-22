'use client';

import { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, FileText } from 'lucide-react';

export default function AuthenticityBanner() {
  const [lotInput, setLotInput] = useState('');
  const [verifiedResult, setVerifiedResult] = useState(null);

  const handleVerifyLot = (e) => {
    e.preventDefault();
    if (!lotInput.trim()) return;

    // Simulate verified lot lookup
    setVerifiedResult({
      lot: lotInput.toUpperCase(),
      product: "ISO-KINETIC™ Pure Whey Isolate (Batch #88)",
      lab: "Eurofins Analytical Labs ISO 17025",
      purity: "99.8% Native Protein Content",
      bannedSubstances: "None Detected (Informed-Sport Screened)",
      date: "January 2026",
      status: "AUTHENTIC & VERIFIED"
    });
  };

  return (
    <section className="py-[7dvh] bg-white border-t border-slate-200 relative">
      <div className="fluid-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-center">
          
          {/* Left: Verification Explanation */}
          <div className="lg:col-span-6 space-y-[2dvh]">
            <div className="inline-flex items-center gap-[0.5vw] px-[1vw] py-[0.5dvh] rounded-full bg-lime-100 text-lime-800 text-[clamp(0.65rem,0.7vw,0.8rem)] font-mono font-bold border border-lime-300">
              <ShieldCheck className="w-4 h-4 text-lime-600" />
              <span>100% UNCOMPROMISED TRANSPARENCY</span>
            </div>

            <h2 className="text-[clamp(1.6rem,2.8vw,3.6rem)] font-black text-slate-950 font-display leading-tight">
              THIRD-PARTY LAB CERTIFICATION
            </h2>

            <p className="text-[clamp(0.75rem,0.85vw,1rem)] text-slate-600 leading-relaxed">
              No proprietary blends. No amino spiking. We publish full Certificate of Analysis (CoA) reports from independent ISO 17025 accredited analytical laboratories for every batch produced.
            </p>

            <div className="grid grid-cols-2 gap-[1vw] pt-[1dvh]">
              <div className="p-[1.2vw] rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[clamp(1.2rem,1.8vw,2.4rem)] font-black text-[#65a30d] font-display">0.00%</span>
                <p className="text-[clamp(0.6rem,0.7vw,0.8rem)] text-slate-500 font-semibold uppercase">Heavy Metal Contaminants</p>
              </div>

              <div className="p-[1.2vw] rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[clamp(1.2rem,1.8vw,2.4rem)] font-black text-[#0284c7] font-display">100%</span>
                <p className="text-[clamp(0.6rem,0.7vw,0.8rem)] text-slate-500 font-semibold uppercase">Label Claim Accuracy</p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Certificate Lookup Widget */}
          <div className="lg:col-span-6">
            <div className="rounded-[clamp(1.2vw,2vw,2.8vw)] glass-panel bg-slate-50/90 border border-slate-200 p-[2vw] space-y-[2dvh] shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[0.8vw]">
                  <div className="w-[clamp(2rem,2.5vw,3rem)] h-[clamp(2rem,2.5vw,3rem)] rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center font-black text-xs border border-lime-300">
                    CoA
                  </div>
                  <div>
                    <h3 className="text-[clamp(0.85rem,1vw,1.15rem)] font-bold text-slate-900 font-display">Batch Certificate Lookup</h3>
                    <p className="text-[clamp(0.65rem,0.7vw,0.75rem)] text-slate-500">Enter the lot code on your tub</p>
                  </div>
                </div>
                <span className="text-[0.65rem] font-mono uppercase bg-white px-2 py-1 rounded text-slate-600 border border-slate-200 font-semibold">
                  ISO/IEC 17025
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleVerifyLot} className="flex gap-[0.5vw]">
                <input
                  type="text"
                  value={lotInput}
                  onChange={(e) => setLotInput(e.target.value)}
                  placeholder="e.g. SP-2026-X88"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-[1vw] py-[1.2dvh] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                />
                <button
                  type="submit"
                  className="px-[1.5vw] py-[1.2dvh] rounded-xl bg-[#84cc16] text-slate-950 font-extrabold text-xs hover:bg-[#65a30d] hover:text-white transition-all flex items-center gap-1.5 shrink-0 glow-lime-sm cursor-pointer shadow-sm"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              </form>

              {/* Verified Result Card */}
              {verifiedResult ? (
                <div className="p-[1.2vw] rounded-2xl bg-white border border-lime-400 space-y-[1dvh] animate-in fade-in zoom-in-95 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4d7c0f] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
                      {verifiedResult.status}
                    </span>
                    <span className="text-[0.65rem] font-mono text-slate-500 font-bold">Lot: {verifiedResult.lot}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[0.7rem] pt-1">
                    <div className="text-slate-500">Analytical Lab: <strong className="text-slate-900 block">{verifiedResult.lab}</strong></div>
                    <div className="text-slate-500">Purity Score: <strong className="text-[#4d7c0f] block">{verifiedResult.purity}</strong></div>
                    <div className="text-slate-500">Banned Substances: <strong className="text-slate-900 block">{verifiedResult.bannedSubstances}</strong></div>
                    <div className="text-slate-500">Test Date: <strong className="text-slate-900 block">{verifiedResult.date}</strong></div>
                  </div>
                </div>
              ) : (
                <div className="p-[1.2vw] rounded-2xl bg-white border border-slate-200 flex items-center gap-3 text-xs text-slate-500">
                  <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                  <span>Try lot code <strong className="text-[#65a30d] cursor-pointer font-bold" onClick={() => setLotInput('SP-2026-X88')}>SP-2026-X88</strong> to inspect the live lab audit.</span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
