'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartTotal,
  selectFreeShippingProgress,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart
} from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const total = useSelector(selectCartTotal);
  const freeShipping = useSelector(selectFreeShippingProgress);
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const couponError = useSelector((state) => state.cart.couponError);

  const [couponCodeInput, setCouponCodeInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    dispatch(applyCoupon(couponCodeInput));
    setCouponCodeInput('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[5dvh]">
      <div className="fluid-container">
        
        {/* Page Title */}
        <div className="flex items-center justify-between pb-[3dvh] border-b border-slate-200 mb-[4dvh]">
          <div>
            <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#65a30d]">
              Review Your Items
            </span>
            <h1 className="text-[clamp(1.8rem,3vw,3.6rem)] font-black text-slate-950 font-display">
              SHOPPING CART ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => {
                dispatch(clearCart());
                dispatch(addToast({ message: 'Cart cleared', type: 'info' }));
              }}
              className="text-xs text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-[4vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 text-center max-w-[32rem] mx-auto space-y-[2dvh] shadow-sm">
            <div className="w-[clamp(3.5rem,4.5vw,5.5rem)] h-[clamp(3.5rem,4.5vw,5.5rem)] rounded-full bg-slate-100 flex items-center justify-center text-3xl mx-auto">
              🛒
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Your Cart is Currently Empty</h2>
              <p className="text-xs text-slate-500 font-medium">
                Explore our catalog to find pure isolates, pre-workouts, and creatine.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-[2vw] py-[1.2dvh] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-sm glow-lime transition-all shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Explore Supplements</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-[2.5dvh]">
              
              {/* Free Shipping Tracker */}
              <div className="p-[1.5vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[1dvh] shadow-sm">
                <div className="flex items-center justify-between text-[clamp(0.7rem,0.78vw,0.85rem)]">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Truck className="w-4 h-4 text-[#65a30d]" />
                    {freeShipping.isFree ? (
                      <span className="text-[#4d7c0f] font-bold">You unlocked Free Express Delivery!</span>
                    ) : (
                      <span>Add <strong className="text-slate-900 font-bold">${freeShipping.remaining.toFixed(2)}</strong> more for Free Shipping</span>
                    )}
                  </div>
                  <span className="font-bold text-[#65a30d]">{freeShipping.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-[0.8dvh] rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#ea580c] to-[#84cc16] h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShipping.percentage}%` }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-[1.5dvh]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-[1.5vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-[1.5vw] shadow-sm"
                  >
                    <div className="flex items-center gap-[1vw] w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[clamp(4.5rem,5.5vw,6.5rem)] h-[clamp(4.5rem,5.5vw,6.5rem)] object-contain rounded-2xl bg-slate-50 p-2 border border-slate-200 shrink-0"
                      />
                      <div>
                        <h3 className="text-[clamp(0.85rem,1vw,1.1rem)] font-bold text-slate-900 font-display">{item.name}</h3>
                        <p className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500 mt-0.5">{item.flavor} • {item.size}</p>
                        <span className="text-xs font-black text-slate-950 sm:hidden block mt-2 font-display">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-[1.5vw] w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="text-slate-500 hover:text-slate-950 transition-colors cursor-pointer font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 font-mono px-1">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="text-slate-500 hover:text-slate-950 transition-colors cursor-pointer font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="hidden sm:block text-right min-w-[5rem]">
                        <span className="text-[clamp(1rem,1.2vw,1.35rem)] font-black text-slate-950 font-display">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          dispatch(removeFromCart(item.id));
                          dispatch(addToast({ message: `Removed item from cart`, type: 'info' }));
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 p-[2vw] space-y-[2dvh] shadow-xl">
              <h2 className="text-[clamp(1rem,1.3vw,1.5rem)] font-bold text-slate-900 font-display border-b border-slate-100 pb-[1.5dvh]">
                Order Summary
              </h2>

              {/* Coupon input */}
              <div className="space-y-[1dvh]">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-[1vw] rounded-2xl bg-lime-50 border border-lime-300 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-lime-700" />
                      <span className="font-bold text-lime-800">{appliedCoupon.code}</span>
                      <span className="text-slate-600">({appliedCoupon.discountPercent}% Off)</span>
                    </div>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-[0.5vw]">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Promo Code (BOLT20)"
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                    />
                    <button
                      type="submit"
                      className="px-[1.2vw] py-[1dvh] rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[0.7rem] text-red-600 font-semibold mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-[1.2dvh] text-xs border-y border-slate-100 py-[1.5dvh]">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-mono font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Savings</span>
                    <span className="font-mono font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Express Shipping</span>
                  <span className="text-slate-900 font-mono font-bold">
                    {freeShipping.isFree ? 'FREE ($0.00)' : '$7.99'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-[1dvh] border-t border-slate-100">
                  <span>Total Due</span>
                  <span className="text-[clamp(1.4rem,2vw,2.5rem)] font-black text-slate-950 font-display">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-[1.5dvh] px-[1.5vw] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.85rem,0.95vw,1.05rem)] flex items-center justify-center gap-2 glow-lime transition-all duration-300 hover:scale-105 text-center shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[0.7rem] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
