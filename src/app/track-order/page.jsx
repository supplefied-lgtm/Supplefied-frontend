'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Truck } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialTracking = searchParams?.get('tracking') || 'TRK-KINETIC-9902';
  const [trackingNumber, setTrackingNumber] = useState(initialTracking);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[7dvh]">
      <div className="fluid-container max-w-[55rem]">
        
        <div className="text-center max-w-[40rem] mx-auto mb-[5dvh] space-y-[1.5dvh]">
          <div className="inline-flex items-center gap-1.5 px-[1.2vw] py-[0.6dvh] rounded-full bg-lime-100 text-lime-800 text-xs font-mono font-bold border border-lime-300">
            <Truck className="w-3.5 h-3.5 text-lime-600" />
            <span>REAL-TIME DELIVERY TRACKER</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,4.5rem)] font-black text-slate-950 font-display">
            TRACK YOUR ORDER
          </h1>
          <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 font-medium">
            Enter your Supplefied tracking ID or order reference to view real-time delivery status.
          </p>
        </div>

        {/* Tracking Input Search */}
        <div className="max-w-[34rem] mx-auto mb-[5dvh]">
          <form onSubmit={handleSearch} className="flex gap-[0.5vw]">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. TRK-KINETIC-9902"
              className="flex-1 bg-white border border-slate-300 rounded-2xl px-[1.2vw] py-[1.2dvh] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 font-mono shadow-sm font-medium"
            />
            <button
              type="submit"
              className="px-[2vw] py-[1.2dvh] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-xs sm:text-sm glow-lime transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Live Radar Tracking Result */}
        {searched && (
          <div className="rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 p-[2vw] sm:p-[2.5vw] space-y-[3dvh] shadow-xl animate-in fade-in">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-[2dvh]">
              <div>
                <span className="text-[0.65rem] uppercase font-mono text-slate-500 font-bold">Tracking Code</span>
                <h3 className="text-xl font-bold text-slate-900 font-mono">{trackingNumber.toUpperCase()}</h3>
                <span className="text-xs text-slate-500 mt-1 block">Carrier: Supplefied Express Delivery</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-100 text-lime-800 border border-lime-300 inline-block font-mono">
                  ● IN TRANSIT
                </span>
                <p className="text-xs text-slate-600 mt-1 font-medium">Estimated Delivery: <strong className="text-slate-900">Tomorrow by 2:00 PM</strong></p>
              </div>
            </div>

            {/* Visual Multi-step Timeline */}
            <div className="relative pl-[2vw] sm:pl-[2.5vw] space-y-[2.5dvh] before:absolute before:left-[0.8vw] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              {/* Event 1 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-[2vw] sm:-left-[2.5vw] w-6 h-6 rounded-full bg-[#84cc16] text-slate-950 font-bold flex items-center justify-center text-xs glow-lime-sm">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Quality Inspection & Packaging Complete</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 font-bold">10:14 AM</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Product purity verified. Batch sealed and ready for dispatch.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-[2vw] sm:-left-[2.5vw] w-6 h-6 rounded-full bg-[#84cc16] text-slate-950 font-bold flex items-center justify-center text-xs glow-lime-sm">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Dispatched from Central Warehouse</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 font-bold">01:45 PM</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Package picked up by courier partner.
                  </p>
                </div>
              </div>

              {/* Event 3 (Active) */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-[2vw] sm:-left-[2.5vw] w-6 h-6 rounded-full bg-[#ea580c] text-white font-bold flex items-center justify-center text-xs glow-orange animate-pulse">
                  ⚡
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#ea580c]">In Transit: Regional Sorting Facility</span>
                    <span className="text-[0.65rem] font-mono text-[#ea580c] font-bold">Active</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    En route to your local delivery hub.
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative flex items-start gap-4 opacity-50">
                <div className="absolute -left-[2vw] sm:-left-[2.5vw] w-6 h-6 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs">
                  4
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-slate-700">Out for Delivery</span>
                  <p className="text-xs text-slate-500">Scheduled for doorstep drop-off.</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-[#65a30d] font-bold">Loading Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
