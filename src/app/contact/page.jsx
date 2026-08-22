'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '@/store/slices/toastSlice';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Formulation Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    dispatch(addToast({ message: "⚡ Your inquiry has been routed to Supplefied Support!" }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[7dvh]">
      <div className="fluid-container max-w-[72rem]">
        
        <div className="text-center max-w-[40rem] mx-auto mb-[6dvh] space-y-[1.5dvh]">
          <div className="inline-flex items-center gap-[0.5vw] px-[1.2vw] py-[0.6dvh] rounded-full bg-lime-100 text-lime-800 text-[clamp(0.65rem,0.75vw,0.85rem)] font-mono font-bold border border-lime-300">
            <MessageSquare className="w-4 h-4 text-lime-600" />
            <span>CUSTOMER SUPPORT & DISPATCH</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,4.5rem)] font-black text-slate-950 font-display">
            CONTACT US
          </h1>
          <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 font-medium">
            Reach out regarding custom orders, lot certificate verification, or supplement guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw]">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-[2.5dvh]">
            <div className="p-[2vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[2dvh] shadow-sm">
              <h3 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 font-display">Direct Channels</h3>

              <div className="space-y-[2dvh] text-[clamp(0.75rem,0.8vw,0.9rem)]">
                <div className="flex items-start gap-[0.8vw]">
                  <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center shrink-0 border border-lime-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[0.7rem] font-medium">Support Inquiries</span>
                    <strong className="text-slate-900 font-mono text-[clamp(0.75rem,0.8vw,0.9rem)]">support@supplefied.com</strong>
                  </div>
                </div>

                <div className="flex items-start gap-[0.8vw]">
                  <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center shrink-0 border border-orange-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[0.7rem] font-medium">Support Hotline</span>
                    <strong className="text-slate-900 font-mono text-[clamp(0.75rem,0.8vw,0.9rem)]">+91 9891238727</strong>
                  </div>
                </div>

                <div className="flex items-start gap-[0.8vw]">
                  <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 border border-sky-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[0.7rem] font-medium">Store Address</span>
                    <strong className="text-slate-900 text-[clamp(0.75rem,0.8vw,0.85rem)] leading-snug block">
                      400-A Ajit Singh House, Yusuf Sarai Commercial Complex, Green Park, New Delhi - 110016
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Mascot Support Tag with Real Avatar */}
            <div className="p-[1.5vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 flex items-center gap-[1vw] shadow-sm">
              <div className="w-[clamp(2.8rem,3.5vw,4.2rem)] h-[clamp(2.8rem,3.5vw,4.2rem)] rounded-2xl overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
                <img src="/images/mascot/bolt_avatar.png" alt="Bolt" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[clamp(0.75rem,0.85vw,0.95rem)] font-bold text-slate-900 block font-display">Fast-Response Guarantee</span>
                <p className="text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500 font-medium">All customer inquiries answered promptly within business hours.</p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-[2.5vw] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 shadow-xl">
              {submitted ? (
                <div className="text-center py-[4dvh] space-y-[2dvh] animate-in fade-in">
                  <div className="w-[clamp(3.5rem,4vw,5rem)] h-[clamp(3.5rem,4vw,5rem)] rounded-full bg-lime-100 text-lime-800 flex items-center justify-center mx-auto text-2xl font-bold border border-lime-300">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">Inquiry Sent</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                    Thank you {formData.name}. Our team will reply to <strong>{formData.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-[1.8dvh] text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw]">
                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Mercer"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1.2dvh] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@athlete.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1.2dvh] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-700 font-bold">Inquiry Topic</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-[1vw] py-[1.2dvh] text-slate-900 focus:outline-none focus:border-lime-500 font-medium cursor-pointer"
                    >
                      <option value="Formulation Inquiry">Product & Ingredient Inquiry</option>
                      <option value="Order Tracking">Order & Delivery Assistance</option>
                      <option value="Lab CoA Verification">Lab Certificate Verification</option>
                      <option value="Wholesale & Bulk">Wholesale & Bulk Orders</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-700 font-bold">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-[1vw] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 leading-relaxed font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-[1.5dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-sm glow-lime flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
