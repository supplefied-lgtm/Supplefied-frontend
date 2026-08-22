'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Truck, ArrowRight, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId') || 'SPF-884920';
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const handleDownloadInvoice = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Invoice #${orderId}.pdf downloaded successfully!`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[8dvh]">
      <div className="fluid-container max-w-[50rem] text-center">
        
        {/* Success Mascot Avatar */}
        <div className="w-[clamp(4.5rem,6vw,7rem)] h-[clamp(4.5rem,6vw,7rem)] rounded-full overflow-hidden border-2 border-lime-500 mx-auto mb-[3dvh] glow-lime animate-bounce bg-slate-100 shadow-lg">
          <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-[1.5dvh] mb-[5dvh]">
          <div className="inline-flex items-center gap-1.5 px-[1vw] py-[0.5dvh] rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>ORDER CONFIRMED & LAB CERTIFIED</span>
          </div>

          <h1 className="text-[clamp(2rem,3.8vw,4.5rem)] font-black text-slate-950 font-display">
            ORDER #{orderId} IS CONFIRMED!
          </h1>

          <p className="text-[clamp(0.8rem,0.95vw,1.1rem)] text-slate-600 max-w-[34rem] mx-auto font-medium">
            Your supplements are being packed in temperature-controlled packaging under Chief Supplement Officer Bolt's supervision.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-[2vw] sm:p-[2.5vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 text-left space-y-[2.5dvh] shadow-xl mb-[4dvh]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[1.5vw] border-b border-slate-100 pb-[1.5dvh]">
            <div>
              <span className="text-[0.65rem] uppercase font-mono text-slate-500 font-bold">Tracking Reference</span>
              <p className="text-base font-bold text-slate-900 font-mono">TRK-KINETIC-{orderId.replace('SPF-', '')}</p>
            </div>
            <Link
              href={`/track-order?tracking=TRK-KINETIC-${orderId.replace('SPF-', '')}`}
              className="px-[1.2vw] py-[1dvh] rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-sm"
            >
              <Truck className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>Track Order →</span>
            </Link>
          </div>

          {/* Timeline */}
          <div className="space-y-[1.5dvh]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Delivery Timeline</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-[0.65rem] font-mono">
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#84cc16] text-slate-950 font-bold flex items-center justify-center mx-auto text-xs">✓</div>
                <span className="text-[#4d7c0f] font-bold block">Authorized</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#84cc16] text-slate-950 font-bold flex items-center justify-center mx-auto text-xs animate-pulse">2</div>
                <span className="text-slate-900 font-bold block">Lab Packed</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">3</div>
                <span className="text-slate-400 block">In Transit</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">4</div>
                <span className="text-slate-400 block">Delivered</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-[1.5dvh] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="w-full sm:w-auto px-[1.5vw] py-[1dvh] rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating PDF...' : 'Download Invoice'}</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
              <span>30-Day Money-Back Guarantee Active</span>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-[2.5vw] py-[1.8dvh] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-sm glow-lime transition-all shadow-md"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-[#65a30d] font-bold">Loading Order Confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
