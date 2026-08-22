'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { ArrowRight, Flame } from 'lucide-react';

export default function BestSellersSlider() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <section className="py-[7dvh] bg-slate-50/70 border-y border-slate-200/80 relative">
      <div className="fluid-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-[5dvh]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-[#ea580c]" />
              <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#ea580c]">
                Customer Favorites
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,2.8vw,3.6rem)] font-black text-slate-950 font-display">
              BEST-SELLING SUPPLEMENTS
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[clamp(0.75rem,0.8vw,0.85rem)] font-semibold text-slate-600 hover:text-[#65a30d] flex items-center gap-1.5 transition-colors"
          >
            <span>See all products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2vw]">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
