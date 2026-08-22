'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS } from '@/data/products';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { addToast } from '@/store/slices/toastSlice';
import RatingStars from '@/components/common/RatingStars';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Zap,
  Check,
  Truck,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params?.id;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors ? product.flavors[0] : 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('facts'); // 'facts', 'lab', 'ingredients'

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        flavor: selectedFlavor,
        size: selectedSize,
        quantity,
      })
    );
    dispatch(addToast({ message: `⚡ Added ${quantity}x ${product.name} to Cart!` }));
    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[5dvh]">
      <div className="fluid-container">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-[0.5vw] text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500 mb-[4dvh] font-mono font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 capitalize">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#4d7c0f] font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-start mb-[8dvh]">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-[1.5dvh]">
            <div className="relative aspect-[4/3] rounded-[clamp(1.2vw,2vw,2.8vw)] bg-white border border-slate-200 p-[2vw] flex items-center justify-center overflow-hidden shadow-sm">
              <div className="absolute w-[20vw] h-[20vw] bg-lime-300/20 rounded-full blur-3xl pointer-events-none" />
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="max-h-[38dvh] max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(15,23,42,0.14)] relative z-10 transition-all duration-300"
              />
              {product.badge && (
                <div className="absolute top-[2dvh] left-[1.5vw] z-20 px-[0.8vw] py-[0.4dvh] rounded-full text-[clamp(0.6rem,0.7vw,0.8rem)] font-bold uppercase tracking-wider bg-slate-900 text-[#bef264] border border-slate-800 shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-[0.8vw]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-[clamp(3.8rem,5vw,5.5rem)] h-[clamp(3.8rem,5vw,5.5rem)] rounded-2xl bg-white border p-2 overflow-hidden transition-all cursor-pointer shadow-sm ${
                      activeImageIndex === idx
                        ? 'border-lime-500 bg-lime-50/50 glow-lime-sm'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Configuration & Order Panel Column */}
          <div className="lg:col-span-5 space-y-[2dvh]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
                <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] font-mono text-[#4d7c0f] font-bold">Lot: {product.labCertificate?.lotNumber}</span>
              </div>

              <h1 className="text-[clamp(1.6rem,2.5vw,3rem)] font-black text-slate-950 font-display leading-tight">
                {product.name}
              </h1>

              <p className="text-[clamp(0.75rem,0.85vw,1rem)] text-slate-600 mt-1 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="p-[1.2vw] rounded-2xl bg-white border border-slate-200 flex items-baseline gap-[1vw] shadow-sm">
              <span className="text-[clamp(1.6rem,2.4vw,3rem)] font-black text-slate-950 font-display">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[clamp(0.75rem,0.8vw,0.9rem)] text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-emerald-700 font-bold ml-auto flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                In Stock ({product.stockCount} left)
              </span>
            </div>

            {/* Flavor Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="space-y-[0.8dvh]">
                <label className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold uppercase tracking-wider text-slate-700">
                  Select Flavor: <span className="text-[#4d7c0f]">{selectedFlavor}</span>
                </label>
                <div className="grid grid-cols-2 gap-[0.6vw]">
                  {product.flavors.map((flv) => (
                    <button
                      key={flv}
                      onClick={() => setSelectedFlavor(flv)}
                      className={`p-[0.8vw] rounded-2xl text-[clamp(0.65rem,0.75vw,0.85rem)] font-medium border text-left transition-all cursor-pointer ${
                        selectedFlavor === flv
                          ? 'border-lime-500 bg-lime-50 text-slate-950 font-bold glow-lime-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:border-slate-300'
                      }`}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-[0.8dvh]">
                <label className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold uppercase tracking-wider text-slate-700">
                  Serving Size: <span className="text-[#4d7c0f]">{selectedSize}</span>
                </label>
                <div className="flex gap-[0.6vw]">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-[1.2vw] py-[0.8dvh] rounded-2xl text-[clamp(0.65rem,0.75vw,0.85rem)] font-medium border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-lime-500 bg-lime-50 text-slate-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bolt Pro-Tip with Real Mascot Avatar Image */}
            {product.boltProTip && (
              <div className="p-[1.2vw] rounded-2xl bg-white border border-lime-400/70 flex items-start gap-[0.8vw] shadow-sm">
                <div className="w-[clamp(2.5rem,3.2vw,3.8rem)] h-[clamp(2.5rem,3.2vw,3.8rem)] rounded-2xl overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
                  <img src="/images/mascot/bolt_avatar.png" alt="Bolt" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-[0.4dvh]">
                  <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] font-bold uppercase tracking-wider text-[#4d7c0f] block">
                    Chief Supplement Officer Pro-Directive
                  </span>
                  <p className="text-[clamp(0.7rem,0.78vw,0.9rem)] text-slate-700 leading-relaxed font-medium">
                    {product.boltProTip}
                  </p>
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="pt-[1dvh] border-t border-slate-200 flex items-center gap-[0.8vw]">
              <div className="flex items-center gap-[0.8vw] bg-white border border-slate-300 px-[0.8vw] py-[1.2dvh] rounded-2xl shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-500 hover:text-slate-950 transition-colors cursor-pointer px-1 font-bold"
                >
                  -
                </button>
                <span className="text-xs font-bold text-slate-900 px-1 font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-500 hover:text-slate-950 transition-colors cursor-pointer px-1 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-[1.5dvh] px-[1.5vw] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.8rem,0.9vw,1rem)] flex items-center justify-center gap-2 glow-lime transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4 fill-current" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => dispatch(toggleWishlist(product.id))}
                className={`p-[1.2vw] rounded-2xl border transition-all cursor-pointer shadow-sm ${
                  isInWishlist
                    ? 'border-[#ea580c] bg-[#ea580c] text-white'
                    : 'border-slate-300 bg-white text-slate-600 hover:text-slate-950'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="grid grid-cols-2 gap-[1vw] pt-[0.5dvh] text-[clamp(0.65rem,0.7vw,0.75rem)] text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Free Express Shipping Over $75</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>ISO 17025 Third-Party Tested</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed In-Depth Science & Nutrition Section */}
        <div className="rounded-[clamp(1.2vw,2vw,2.8vw)] glass-panel bg-white border border-slate-200 p-[2vw] sm:p-[2.5vw] mb-[8dvh] space-y-[3dvh] shadow-sm">
          
          {/* Tab buttons */}
          <div className="flex items-center gap-[0.8vw] border-b border-slate-200 pb-[1.5dvh] overflow-x-auto">
            {[
              { id: 'facts', label: 'Supplement Facts & Macro Profile', icon: Zap },
              { id: 'lab', label: 'Verified Lab Certificate (CoA)', icon: FileCheck },
              { id: 'ingredients', label: 'Full Ingredient Breakdown', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-[1.2vw] py-[1dvh] rounded-xl text-[clamp(0.7rem,0.78vw,0.85rem)] font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#84cc16] text-slate-950 glow-lime-sm shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Supplement Facts Table */}
          {activeTab === 'facts' && (
            <div className="space-y-[2dvh] animate-in fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1vw]">
                {product.nutrition &&
                  Object.entries(product.nutrition).map(([key, val]) => (
                    <div key={key} className="p-[1vw] rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-[clamp(0.6rem,0.65vw,0.75rem)] uppercase font-mono text-slate-500 font-bold block mb-1">{key}</span>
                      <span className="text-[clamp(1.1rem,1.5vw,1.8rem)] font-black text-slate-950 font-display">{val}</span>
                    </div>
                  ))}
              </div>

              <div className="p-[1.2vw] rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-[clamp(0.7rem,0.75vw,0.85rem)] font-bold uppercase tracking-wider text-[#4d7c0f] mb-2">Key Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[clamp(0.7rem,0.78vw,0.85rem)] text-slate-700 font-medium">
                  {product.highlights?.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#65a30d] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Verified Lab CoA Audit */}
          {activeTab === 'lab' && product.labCertificate && (
            <div className="p-[1.5vw] rounded-2xl bg-slate-50 border border-lime-400 space-y-[1.5dvh] animate-in fade-in shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center font-bold border border-lime-300">
                    CoA
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">Eurofins Analytical Batch Inspection</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Tested under ISO/IEC 17025 Standard Operating Procedures</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  100% PASSED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1vw] pt-2 text-xs">
                <div className="p-[1vw] rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono font-bold">Lot Identifier</span>
                  <span className="font-bold text-slate-900 font-mono mt-1 block">{product.labCertificate.lotNumber}</span>
                </div>
                <div className="p-[1vw] rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono font-bold">Active Purity Assay</span>
                  <span className="font-bold text-[#4d7c0f] font-mono mt-1 block">{product.labCertificate.purityScore}</span>
                </div>
                <div className="p-[1vw] rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono font-bold">Screened Date</span>
                  <span className="font-bold text-slate-900 font-mono mt-1 block">{product.labCertificate.testDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="p-[1.5vw] rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in">
              <h4 className="text-[clamp(0.7rem,0.75vw,0.85rem)] font-bold uppercase tracking-wider text-slate-800">Formulation Ingredients</h4>
              <p className="text-[clamp(0.7rem,0.78vw,0.85rem)] text-slate-700 leading-relaxed font-mono">
                {product.ingredients}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
