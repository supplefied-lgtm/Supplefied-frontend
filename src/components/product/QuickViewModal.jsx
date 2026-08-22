'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import RatingStars from '@/components/common/RatingStars';
import { X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function QuickViewModal({ product, onClose }) {
  const dispatch = useDispatch();
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors ? product.flavors[0] : 'Standard');
  const [selectedSize] = useState(product?.sizes ? product.sizes[0] : 'Standard');
  const [qty] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, flavor: selectedFlavor, size: selectedSize, quantity: qty }));
    dispatch(addToast({ message: `⚡ Added ${qty}x ${product.name} to Cart!` }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[2vw] bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-[clamp(450px,55vw,800px)] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 shadow-2xl p-[2vw] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-[2vw]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[1.5dvh] right-[1vw] p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview */}
        <div className="relative rounded-2xl bg-slate-50 p-[1.5vw] flex items-center justify-center border border-slate-200 overflow-hidden">
          <div className="absolute w-[18vw] h-[18vw] bg-lime-300/20 rounded-full blur-3xl" />
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-[30dvh] object-contain filter drop-shadow-xl relative z-10"
          />
        </div>

        {/* Details & Selection */}
        <div className="flex flex-col justify-between space-y-[1.5dvh]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-[0.6vw] py-[0.2dvh] rounded-full text-[clamp(0.55rem,0.6vw,0.7rem)] font-bold uppercase bg-lime-100 text-lime-800 border border-lime-300">
                {product.category}
              </span>
              <RatingStars rating={product.rating} count={product.reviewCount} />
            </div>

            <h2 className="text-[clamp(1.1rem,1.4vw,1.6rem)] font-bold text-slate-900 font-display leading-tight">{product.name}</h2>
            <p className="text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500 mt-1">{product.tagline}</p>

            <div className="flex items-baseline gap-3 my-[1.5dvh]">
              <span className="text-[clamp(1.2rem,1.8vw,2.2rem)] font-black text-slate-950 font-display">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Flavor selection */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="space-y-1 mb-3">
                <label className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-semibold text-slate-700">Select Flavor:</label>
                <div className="flex flex-wrap gap-1.5">
                  {product.flavors.map((flv) => (
                    <button
                      key={flv}
                      onClick={() => setSelectedFlavor(flv)}
                      className={`px-[0.8vw] py-[0.5dvh] rounded-xl text-[clamp(0.65rem,0.7vw,0.8rem)] font-medium border transition-all cursor-pointer ${
                        selectedFlavor === flv
                          ? 'border-lime-500 bg-lime-50 text-slate-950 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bolt Pro-Tip with Real Mascot Avatar */}
            {product.boltProTip && (
              <div className="p-[0.8vw] rounded-xl bg-slate-50 border border-lime-400/60 flex items-start gap-[0.6vw] text-xs">
                <div className="w-[clamp(1.6rem,2vw,2.2rem)] h-[clamp(1.6rem,2vw,2.2rem)] rounded-full overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
                  <img src="/images/mascot/bolt_avatar.png" alt="Bolt" className="w-full h-full object-cover" />
                </div>
                <div>
                  <strong className="text-[#4d7c0f] block text-[clamp(0.6rem,0.65vw,0.75rem)] uppercase font-bold">Bolt's Pro-Tip:</strong>
                  <span className="text-slate-600 text-[clamp(0.65rem,0.7vw,0.8rem)] leading-tight">{product.boltProTip}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-[1.5dvh] border-t border-slate-200 flex items-center gap-[0.8vw]">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-[1.2dvh] px-[1.2vw] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.75rem,0.8vw,0.9rem)] flex items-center justify-center gap-2 glow-lime transition-all cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <Link
              href={`/product/${product.id}`}
              onClick={onClose}
              className="px-[1.2vw] py-[1.2dvh] rounded-xl bg-slate-100 hover:bg-slate-200 text-[clamp(0.7rem,0.75vw,0.85rem)] font-semibold text-slate-800 border border-slate-200 text-center"
            >
              Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
