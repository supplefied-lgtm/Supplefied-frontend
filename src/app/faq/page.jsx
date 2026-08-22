'use client';

import { useState } from 'react';
import { FAQS } from '@/data/blogs';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[7dvh]">
      <div className="fluid-container max-w-[55rem] space-y-[5dvh]">
        
        <div className="text-center max-w-[40rem] mx-auto space-y-[1.5dvh]">
          <div className="inline-flex items-center gap-[0.5vw] px-[1.2vw] py-[0.6dvh] rounded-full bg-lime-100 text-lime-800 text-[clamp(0.65rem,0.75vw,0.85rem)] font-mono font-bold border border-lime-300">
            <HelpCircle className="w-4 h-4 text-lime-600" />
            <span>HELP & SUPPORT</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,4.5rem)] font-black text-slate-950 font-display">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 font-medium">
            Got questions about our cold-filtered isolates, third-party lab testing, or custom protocols?
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-[1.5dvh]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-[1.8vw] text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-[clamp(0.85rem,1.05vw,1.2rem)] font-bold text-slate-900 font-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#65a30d] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-[1.8vw] pb-[1.8vw] text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 leading-relaxed border-t border-slate-100 pt-[1.2dvh] animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Need Help Box with Real Mascot Avatar */}
        <div className="p-[2.5vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 text-center space-y-[2dvh] shadow-xl">
          <div className="w-[clamp(3.5rem,4.5vw,5.5rem)] h-[clamp(3.5rem,4.5vw,5.5rem)] rounded-full overflow-hidden border-2 border-lime-500 mx-auto glow-lime-sm bg-slate-100 shadow-md">
            <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 font-display">Have a Specific Question?</h3>
          <p className="text-[clamp(0.75rem,0.8vw,0.85rem)] text-slate-500 max-w-[28rem] mx-auto font-medium">
            Our team and customer support specialists are available 24/7.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-[2vw] py-[1.2dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.75rem,0.8vw,0.85rem)] glow-lime transition-all shadow-md"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
