'use client';

import { REVIEWS } from '@/data/blogs';
import RatingStars from '@/components/common/RatingStars';
import { ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#65a30d]">
            Validated Athletic Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display">
            CHOSEN BY COMPETITIVE ATHLETES
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real reviews from powerlifters, CrossFit Games competitors, and endurance specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl glass-panel bg-white border border-slate-200 hover:border-lime-500/50 transition-all flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <RatingStars rating={rev.rating} />
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{rev.date}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 font-display">"{rev.title}"</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                  <span className="text-[11px] text-slate-500">{rev.role}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
