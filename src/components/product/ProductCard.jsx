'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { addToast } from '@/store/slices/toastSlice';
import RatingStars from '@/components/common/RatingStars';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({ product, onQuickView }) {
  const dispatch = useDispatch();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));
  const [selectedFlavor] = useState(product.flavors ? product.flavors[0] : null);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, flavor: selectedFlavor, quantity: 1 }));
    dispatch(addToast({ message: `⚡ Added ${product.name} to Cart!` }));
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    dispatch(
      addToast({
        message: isInWishlist ? `Removed from Wishlist` : `Saved to Wishlist!`,
        type: isInWishlist ? 'info' : 'success'
      })
    );
  };

  return (
    <div
      className="group relative rounded-[clamp(1vw,1.5vw,2.2vw)] glass-panel bg-white border border-slate-200 hover:border-lime-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
    >
      {/* Top Media & Floating Badges */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden rounded-t-[clamp(1vw,1.5vw,2.2vw)] p-[1.5vw] flex items-center justify-center border-b border-slate-100">
        
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute w-[15vw] h-[15vw] bg-lime-300/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

        {/* Product Image */}
        <Link href={`/product/${product.id}`} className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.12)] group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges (Tightly fitted, no stretching) */}
        <div className="absolute top-[1dvh] left-[1vw] z-20 flex flex-col items-start gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[clamp(0.55rem,0.6vw,0.68rem)] font-bold uppercase tracking-wider bg-slate-900 text-[#bef264] border border-slate-800 shadow-sm whitespace-nowrap">
              {product.badge}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[clamp(0.55rem,0.6vw,0.68rem)] font-bold bg-[#ea580c] text-white whitespace-nowrap shadow-sm">
              SAVE ${(product.originalPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick Actions */}
        <div className="absolute top-[1dvh] right-[1vw] z-20 flex flex-col gap-1.5">
          <button
            onClick={handleWishlistToggle}
            aria-label="Toggle Wishlist"
            className={`p-[0.5vw] rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
              isInWishlist
                ? 'bg-[#ea580c] text-white'
                : 'bg-white/90 text-slate-600 hover:text-slate-950 hover:bg-white border border-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View"
              className="p-[0.5vw] rounded-full bg-white/90 text-slate-600 hover:text-slate-950 hover:bg-white border border-slate-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom Nutrition Pill Over Image */}
        {product.nutrition?.protein && (
          <div className="absolute bottom-[1dvh] left-[1vw] z-20 px-[0.6vw] py-[0.3dvh] rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-[clamp(0.65rem,0.7vw,0.8rem)] font-semibold text-slate-900 flex items-center gap-1 shadow-sm">
            <span className="text-[#4d7c0f] font-mono font-black">{product.nutrition.protein}</span>
            <span className="text-slate-500 text-[0.65rem]">Protein</span>
          </div>
        )}
      </div>

      {/* Card Content Info */}
      <div className="p-[1.2vw] flex-1 flex flex-col justify-between space-y-[1.5dvh]">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between mb-1">
            <RatingStars rating={product.rating} count={product.reviewCount} />
            <span className="text-[clamp(0.55rem,0.6vw,0.7rem)] uppercase font-mono font-bold text-slate-400 tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-[clamp(0.85rem,1vw,1.1rem)] font-bold text-slate-900 group-hover:text-[#4d7c0f] transition-colors line-clamp-1 font-display">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-[1dvh] border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[clamp(1rem,1.3vw,1.5rem)] font-black text-slate-950 font-display">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[0.7rem] text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[clamp(0.6rem,0.65vw,0.75rem)] text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              In Stock
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-[1vw] py-[0.8dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.75rem,0.8vw,0.85rem)] flex items-center gap-1.5 glow-lime-sm transition-all active:scale-95 shrink-0 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
