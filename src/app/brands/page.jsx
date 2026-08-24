'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { Search, X, Sparkles } from 'lucide-react';

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = useMemo(() => {
    return BRANDS.filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-[5dvh]">
      <div className="fluid-container">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-[2.5dvh]">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Brands</span>
        </nav>

        {/* Page Header & Search Box */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[5dvh]">
          <div>
            <h1 className="text-[clamp(2rem,3.2vw,3.5rem)] font-black tracking-tight text-slate-900 font-display">
              All <span className="text-gradient-lime">Brands</span>
            </h1>
            <p className="text-slate-500 text-[clamp(0.85rem,1vw,1.1rem)] mt-1">
              Select a brand to view official products and formulations.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands..."
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 pl-10 pr-9 py-2.5 rounded-full border border-slate-200 focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all outline-none text-sm shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Brands List Grid - Landscape Logo Cards with Zero Space on Top, Left, Right */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.8vw]">
            {filteredBrands.map((brand) => {
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

                  {/* Brand Name & Details */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display group-hover:text-[#4d7c0f] transition-colors line-clamp-1">
                      {brand.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {brand.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 font-display">No brands found</h3>
            <p className="text-slate-500 text-xs mt-1 mb-4">
              No brands matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
