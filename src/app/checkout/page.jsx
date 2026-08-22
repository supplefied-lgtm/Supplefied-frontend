'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartTotal,
  clearCart
} from '@/store/slices/cartSlice';
import { addOrder } from '@/store/slices/userSlice';
import { addToast } from '@/store/slices/toastSlice';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const total = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    fullName: 'Alex Mercer',
    email: 'alex.mercer@bio-athletics.com',
    phone: '+1 (555) 389-4021',
    address: '742 Cyber Kinetic Blvd, Suite 400',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    shippingSpeed: 'express', // 'express' or 'overnight'
    paymentMethod: 'card', // 'card', 'apple', 'cod'
    cardNumber: '•••• •••• •••• 9924',
    cardExp: '12/28',
    cardCvc: '•••'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `SPF-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderId,
        date: 'Just Now',
        status: 'Processing (Lab Certified)',
        trackingNumber: `TRK-KINETIC-${Math.floor(10000000 + Math.random() * 90000000)}`,
        total: total,
        items: items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price }))
      };

      dispatch(addOrder(newOrder));
      dispatch(clearCart());
      dispatch(addToast({ message: `⚡ Order #${orderId} Placed Successfully!` }));
      
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      router.push(`/order-success?orderId=${orderId}`);
    }, 1200);
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-[2vw] text-center">
        <div className="max-w-md p-[3vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 space-y-[2dvh] shadow-sm">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">No items in checkout</h2>
          <p className="text-xs text-slate-500">Please add supplements to your cart first.</p>
          <button
            onClick={() => router.push('/shop')}
            className="px-[2vw] py-[1.2dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-xs cursor-pointer shadow-sm"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[6dvh]">
      <div className="fluid-container">
        
        <div className="text-center max-w-xl mx-auto mb-[5dvh] space-y-[1dvh]">
          <div className="inline-flex items-center gap-1.5 px-[1vw] py-[0.5dvh] rounded-full bg-lime-100 text-lime-800 text-xs font-mono font-bold border border-lime-300">
            <Lock className="w-3.5 h-3.5 text-lime-600" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
          <h1 className="text-[clamp(1.8rem,3vw,3.6rem)] font-black text-slate-950 font-display">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-start">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-[2.5dvh]">
            
            {/* Step 1: Shipping Details */}
            <div className="p-[2vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 space-y-[2dvh] shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-[1.5dvh]">
                <div className="flex items-center gap-[0.8vw]">
                  <div className="w-[clamp(1.8rem,2.2vw,2.6rem)] h-[clamp(1.8rem,2.2vw,2.6rem)] rounded-xl bg-lime-100 text-lime-800 font-bold flex items-center justify-center text-xs border border-lime-300">
                    01
                  </div>
                  <h2 className="text-[clamp(0.95rem,1.2vw,1.35rem)] font-bold text-slate-900 font-display">Shipping Information</h2>
                </div>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw] text-xs">
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Email for Tracking Updates</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-600 font-medium">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-slate-600 font-medium">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-600 font-medium">Zip Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Speed Selector */}
            <div className="p-[2vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 space-y-[2dvh] shadow-sm">
              <div className="flex items-center gap-[0.8vw] border-b border-slate-100 pb-[1.5dvh]">
                <div className="w-[clamp(1.8rem,2.2vw,2.6rem)] h-[clamp(1.8rem,2.2vw,2.6rem)] rounded-xl bg-lime-100 text-lime-800 font-bold flex items-center justify-center text-xs border border-lime-300">
                  02
                </div>
                <h2 className="text-[clamp(0.95rem,1.2vw,1.35rem)] font-bold text-slate-900 font-display">Dispatch Speed</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw]">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, shippingSpeed: 'express' })}
                  className={`p-[1.2vw] rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    formData.shippingSpeed === 'express'
                      ? 'border-lime-500 bg-lime-50 text-slate-900 glow-lime-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#65a30d]" />
                      <span className="text-xs font-bold text-slate-900">Express Delivery (2-3 Days)</span>
                    </div>
                    <p className="text-[0.7rem] text-slate-500">Insulated protective packaging</p>
                  </div>
                  <span className="text-xs font-bold text-[#4d7c0f]">FREE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, shippingSpeed: 'overnight' })}
                  className={`p-[1.2vw] rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    formData.shippingSpeed === 'overnight'
                      ? 'border-orange-500 bg-orange-50 text-slate-900 glow-orange'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#ea580c]" />
                      <span className="text-xs font-bold text-slate-900">Next-Day Priority Surge</span>
                    </div>
                    <p className="text-[0.7rem] text-slate-500">Guaranteed morning delivery</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900 font-mono">+$14.99</span>
                </button>
              </div>
            </div>

            {/* Step 3: Payment Simulation */}
            <div className="p-[2vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 space-y-[2dvh] shadow-sm">
              <div className="flex items-center gap-[0.8vw] border-b border-slate-100 pb-[1.5dvh]">
                <div className="w-[clamp(1.8rem,2.2vw,2.6rem)] h-[clamp(1.8rem,2.2vw,2.6rem)] rounded-xl bg-lime-100 text-lime-800 font-bold flex items-center justify-center text-xs border border-lime-300">
                  03
                </div>
                <h2 className="text-[clamp(0.95rem,1.2vw,1.35rem)] font-bold text-slate-900 font-display">Payment Method</h2>
              </div>

              {/* Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'apple', label: 'Apple Pay', icon: Zap },
                  { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                    className={`py-[1.2dvh] px-[0.8vw] rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.paymentMethod === m.id
                        ? 'border-lime-500 bg-lime-50 text-[#365314]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <m.icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-600 font-medium">Card Number (Sandbox Simulation)</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-mono font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-600 font-medium">Expiration</label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-mono font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-600 font-medium">Security CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-mono font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Order Summary & Confirm */}
          <div className="lg:col-span-5 rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 p-[2vw] space-y-[2dvh] shadow-xl">
            <h2 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 font-display border-b border-slate-100 pb-[1.5dvh]">
              Items ({items.length})
            </h2>

            {/* Compact items list */}
            <div className="space-y-[1dvh] max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.name} className="w-10 h-10 object-contain rounded-lg bg-slate-50 border border-slate-200" />
                    <div>
                      <span className="font-bold text-slate-900 block line-clamp-1">{it.name}</span>
                      <span className="text-[0.65rem] text-slate-500 font-medium">Qty: {it.quantity} • {it.flavor}</span>
                    </div>
                  </div>
                  <span className="font-mono text-slate-900 font-bold">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="space-y-[1dvh] text-xs border-y border-slate-100 py-[1.5dvh]">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="text-slate-900 font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Applied VIP Discount</span>
                  <span className="font-mono font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping ({formData.shippingSpeed === 'overnight' ? 'Overnight' : 'Express'})</span>
                <span className="text-slate-900 font-mono font-bold">
                  {formData.shippingSpeed === 'overnight' ? '$14.99' : 'FREE'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-[1dvh] border-t border-slate-100">
                <span>Total Authorization</span>
                <span className="text-[clamp(1.4rem,2vw,2.4rem)] font-black text-slate-950 font-display">
                  ${(formData.shippingSpeed === 'overnight' ? total + 14.99 : total).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Mascot Guarantee Badge with Real Avatar */}
            <div className="p-[1vw] rounded-2xl bg-slate-50 border border-lime-400 flex items-start gap-[0.8vw] text-xs">
              <div className="w-[clamp(2rem,2.5vw,3rem)] h-[clamp(2rem,2.5vw,3rem)] rounded-full overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
                <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] font-bold uppercase text-[#4d7c0f] block">Bolt's 100% Purity Guarantee</span>
                <span className="text-slate-600 text-[clamp(0.65rem,0.7vw,0.75rem)] font-medium">Includes 30-Day Money-Back Protection & Third-Party Lab Testing.</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-[1.5dvh] px-[1.5vw] rounded-2xl bg-[#84cc16] hover:bg-[#65a30d] disabled:bg-slate-300 text-slate-950 hover:text-white font-extrabold text-[clamp(0.85rem,0.95vw,1.05rem)] flex items-center justify-center gap-2 glow-lime transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              {isProcessing ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
