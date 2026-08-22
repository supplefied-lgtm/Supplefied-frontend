'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Package, MapPin, ExternalLink } from 'lucide-react';

export default function AccountPage() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[6dvh]">
      <div className="fluid-container">
        
        {/* Profile Header Card */}
        <div className="rounded-[clamp(1.2vw,2vw,2.8vw)] glass-panel bg-gradient-to-r from-white via-slate-50 to-white border border-slate-200 p-[2vw] mb-[4dvh] shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-[2vw]">
            <div className="flex items-center gap-[1.2vw] text-center sm:text-left">
              <div className="w-[clamp(4.5rem,5.5vw,6.5rem)] h-[clamp(4.5rem,5.5vw,6.5rem)] rounded-full border-2 border-lime-500 p-1 glow-lime-sm shrink-0 bg-slate-100 shadow-md">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-[clamp(1.4rem,2vw,2.4rem)] font-black text-slate-950 font-display">{user.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#84cc16] text-slate-950 shadow-sm">
                    {user.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono font-medium">{user.email}</p>
                <p className="text-[11px] text-slate-400">Member since {user.joinedDate}</p>
              </div>
            </div>

            {/* VIP Reward Points Box */}
            <div className="p-[1.2vw] rounded-2xl bg-white border border-slate-200 text-center sm:text-right min-w-[200px] shadow-sm">
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                Reward Points Balance
              </span>
              <span className="text-[clamp(1.5rem,2.2vw,2.8rem)] font-black text-[#4d7c0f] font-display block">
                {user.points.toLocaleString()} PTS
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Equivalent to ${(user.points / 100).toFixed(2)} store credit</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2.5vw]">
          
          {/* Order History */}
          <div className="lg:col-span-8 space-y-[2dvh]">
            <h2 className="text-[clamp(1rem,1.3vw,1.5rem)] font-bold text-slate-900 font-display flex items-center gap-2">
              <Package className="w-4 h-4 text-[#65a30d]" />
              Order History ({user.orders.length})
            </h2>

            <div className="space-y-[1.5dvh]">
              {user.orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-[1.5vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[1.5dvh] shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-[1dvh]">
                    <div>
                      <span className="text-sm font-bold text-slate-900 font-mono">Order #{ord.id}</span>
                      <span className="text-xs text-slate-500 block mt-0.5">Placed on {ord.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-lime-100 text-lime-800 border border-lime-300 font-mono">
                        {ord.status}
                      </span>
                      <span className="text-sm font-black text-slate-950 font-display">${ord.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        <span className="text-slate-500 font-mono">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400 font-medium">Ref: {ord.trackingNumber}</span>
                    <Link
                      href={`/track-order?tracking=${ord.trackingNumber}`}
                      className="text-[#4d7c0f] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Track Shipment</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Addresses & Quick Settings */}
          <div className="lg:col-span-4 space-y-[2dvh]">
            <div className="p-[1.8vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 space-y-[1.5dvh] shadow-sm">
              <h3 className="text-[clamp(0.9rem,1vw,1.2rem)] font-bold text-slate-900 font-display flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#65a30d]" />
                Primary Shipping Address
              </h3>

              {user.savedAddresses.map((addr) => (
                <div key={addr.id} className="p-[1vw] rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{addr.title}</span>
                    <span className="text-[10px] text-[#4d7c0f] uppercase font-mono font-bold">Default</span>
                  </div>
                  <p className="text-slate-700">{addr.street}</p>
                  <p className="text-slate-500">{addr.city}, {addr.state} {addr.zip}</p>
                </div>
              ))}
            </div>

            {/* Mascot VIP Perks Card with Real Avatar */}
            <div className="p-[1.8vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-orange-300 space-y-[1dvh] shadow-sm">
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[2.2rem] h-[2.2rem] rounded-full overflow-hidden border border-orange-400 shrink-0 bg-slate-100">
                  <img src="/images/mascot/bolt_avatar.png" alt="Bolt" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xs font-bold uppercase text-[#ea580c] font-mono">Bolt's VIP Membership</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                As a member, you earn reward points with every order and receive early access to fresh laboratory batches.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
