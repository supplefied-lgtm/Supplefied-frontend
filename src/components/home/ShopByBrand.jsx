'use client';

import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ShopByBrand() {
  const topBrands = BRANDS.slice(0, 4);

  return (
    <section className="py-[6dvh] bg-transparent relative">
      <div className="fluid-container">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-[4dvh]">
          <div>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.8rem)] font-black tracking-tight text-slate-900 font-display">
              Shop By <span className="text-gradient-lime">Brand</span>
            </h2>
            <p className="text-slate-500 text-[clamp(0.85rem,0.95vw,1.05rem)] mt-0.5">
              Explore authentic products from top verified nutrition brands.
            </p>
          </div>

          <Link
            href="/brands"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[clamp(0.8rem,0.88vw,0.95rem)] font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm group shrink-0"
          >
            <span>View All Brands</span>
            <ArrowRight className="w-4 h-4 text-[#bef264] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-4 Brand Cards with Full-Width Landscape Logo Images (Zero space on top, left, right) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5vw]">
          {topBrands.map((brand) => {
            const isBolt = brand.isBoltsFavourite;

            return (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className={`group relative rounded-2xl bg-white border transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                  isBolt
                    ? 'border-lime-400/90 ring-2 ring-lime-400/30'
                    : 'border-slate-200 hover:border-lime-500/60'
                }`}
              >
                {/* Bolt's Favourite Badge */}
                {isBolt && (
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-slate-900 text-[#bef264] border border-lime-400/60 shadow-md whitespace-nowrap">
                      <Sparkles className="w-3 h-3 text-[#bef264]" />
                      Bolt&apos;s Favourite
                    </span>
                  </div>
                )}

                {/* Full-width Landscape Logo Image - ZERO space on top, left, and right */}
                <div className="w-full aspect-[2/1] bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-slate-100 p-0 m-0">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Brand Name */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display group-hover:text-[#4d7c0f] transition-colors line-clamp-1">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {brand.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
