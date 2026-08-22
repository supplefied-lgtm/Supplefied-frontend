'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectWishlistItems, clearWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { ShoppingBag, Zap } from 'lucide-react';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistIds = useSelector(selectWishlistItems);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => {
      dispatch(addToCart({ product: p, quantity: 1 }));
    });
    dispatch(addToast({ message: `⚡ Moved ${wishlistProducts.length} items to your Cart!` }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[6dvh]">
      <div className="fluid-container">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-[3dvh] border-b border-slate-200 mb-[4dvh]">
          <div>
            <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#ea580c]">
              Saved Items
            </span>
            <h1 className="text-[clamp(1.8rem,3vw,3.6rem)] font-black text-slate-950 font-display">
              MY WISHLIST ({wishlistProducts.length})
            </h1>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-[0.8vw]">
              <button
                onClick={() => {
                  dispatch(clearWishlist());
                  dispatch(addToast({ message: 'Cleared wishlist', type: 'info' }));
                }}
                className="px-[1.2vw] py-[0.8dvh] rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
              >
                Clear All
              </button>

              <button
                onClick={handleMoveAllToCart}
                className="px-[1.5vw] py-[1dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-xs flex items-center gap-2 glow-lime transition-all cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5 fill-current" />
                <span>Move All to Cart</span>
              </button>
            </div>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="p-[4vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 text-center max-w-[30rem] mx-auto space-y-[2dvh] shadow-sm">
            <div className="w-[clamp(3.5rem,4.5vw,5.5rem)] h-[clamp(3.5rem,4.5vw,5.5rem)] rounded-full bg-slate-100 flex items-center justify-center text-3xl mx-auto">
              ❤️
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Your Wishlist is Empty</h2>
              <p className="text-xs text-slate-500 font-medium">
                Save formulas to purchase later or create your ideal supplement combination.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-[1.5vw] py-[1dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-xs glow-lime shadow-sm"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Browse Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2vw]">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
