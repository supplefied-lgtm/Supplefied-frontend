'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeDrawer,
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartTotal,
  selectFreeShippingProgress,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon
} from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.cart.isDrawerOpen);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const total = useSelector(selectCartTotal);
  const freeShipping = useSelector(selectFreeShippingProgress);
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const couponError = useSelector((state) => state.cart.couponError);

  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    dispatch(applyCoupon(couponCodeInput));
    setCouponCodeInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => dispatch(closeDrawer())}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-slate-900 font-display">Shopping Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 text-xs font-bold border border-lime-300 font-mono">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => dispatch(closeDrawer())}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Tracker */}
          <div className="px-5 py-3.5 bg-slate-100/60 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Truck className="w-4 h-4 text-[#65a30d]" />
                {freeShipping.isFree ? (
                  <span className="text-[#4d7c0f] font-bold">Free Express Delivery Unlocked!</span>
                ) : (
                  <span>Add <strong className="text-slate-900 font-bold">${freeShipping.remaining.toFixed(2)}</strong> for Free Shipping</span>
                )}
              </div>
              <span className="font-bold text-[#65a30d]">{freeShipping.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#ea580c] to-[#84cc16] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShipping.percentage}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f8fafc]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Your cart is empty</h3>
                  <p className="text-xs text-slate-500">Discover premium supplements engineered for your fitness goals.</p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => dispatch(closeDrawer())}
                  className="px-6 py-2.5 rounded-xl bg-[#84cc16] text-slate-950 font-bold text-xs glow-lime transition-transform hover:scale-105 shadow-sm"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl glass-panel bg-white border border-slate-200 flex gap-3 relative group shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-contain border border-slate-200 bg-slate-50 shrink-0 p-1"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => {
                            dispatch(removeFromCart(item.id));
                            dispatch(addToast({ message: `Removed item from cart`, type: 'info' }));
                          }}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.flavor} • {item.size}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 px-1 font-mono">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-950 font-display">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Promo Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-lime-50 border border-lime-300 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-lime-700" />
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
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Promo Code (BOLT20)"
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 font-semibold mt-1">{couponError}</p>}
              </div>

              {/* Order Summary Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-slate-900 font-bold">
                    {freeShipping.isFree ? 'FREE' : '$7.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-lg font-black text-slate-950 font-display">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => dispatch(closeDrawer())}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-sm flex items-center justify-center gap-2 glow-lime transition-all text-center shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => dispatch(closeDrawer())}
                  className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-900 block transition-colors font-medium"
                >
                  View Full Cart Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
