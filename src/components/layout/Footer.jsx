'use client';

import Link from 'next/link';
import { ShieldCheck, Zap, RefreshCw, Award, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 relative overflow-hidden mt-[8dvh]">
      {/* Background subtle glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75vw] h-[1px] bg-gradient-to-r from-transparent via-lime-400 to-transparent" />
      
      {/* Trust Guarantee Badges Row */}
      <div className="border-b border-slate-200 py-[3dvh] bg-slate-50">
        <div className="fluid-container grid grid-cols-2 md:grid-cols-4 gap-[2vw]">
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-[clamp(0.6vw,0.8vw,1.2vw)] bg-lime-100/70 border border-lime-300 flex items-center justify-center text-lime-700 shrink-0">
              <ShieldCheck className="w-[clamp(1.2rem,1.5vw,1.8rem)] h-[clamp(1.2rem,1.5vw,1.8rem)]" />
            </div>
            <div>
              <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold text-slate-900 uppercase tracking-wider">100% Lab Tested</h4>
              <p className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500">ISO Certified Batch Purity</p>
            </div>
          </div>

          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-[clamp(0.6vw,0.8vw,1.2vw)] bg-orange-100/70 border border-orange-300 flex items-center justify-center text-orange-600 shrink-0">
              <Zap className="w-[clamp(1.2rem,1.5vw,1.8rem)] h-[clamp(1.2rem,1.5vw,1.8rem)]" />
            </div>
            <div>
              <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold text-slate-900 uppercase tracking-wider">Fast Dispatch</h4>
              <p className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500">Same-Day Processing</p>
            </div>
          </div>

          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-[clamp(0.6vw,0.8vw,1.2vw)] bg-sky-100/70 border border-sky-300 flex items-center justify-center text-sky-600 shrink-0">
              <RefreshCw className="w-[clamp(1.2rem,1.5vw,1.8rem)] h-[clamp(1.2rem,1.5vw,1.8rem)]" />
            </div>
            <div>
              <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold text-slate-900 uppercase tracking-wider">30-Day Guarantee</h4>
              <p className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500">100% Money-Back Policy</p>
            </div>
          </div>

          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-[clamp(0.6vw,0.8vw,1.2vw)] bg-purple-100/70 border border-purple-300 flex items-center justify-center text-purple-600 shrink-0">
              <Award className="w-[clamp(1.2rem,1.5vw,1.8rem)] h-[clamp(1.2rem,1.5vw,1.8rem)]" />
            </div>
            <div>
              <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold text-slate-900 uppercase tracking-wider">Informed-Sport</h4>
              <p className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500">Banned-Substance Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="fluid-container py-[6dvh] grid grid-cols-1 md:grid-cols-5 gap-[3vw]">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-[2dvh]">
          <Link href="/" className="flex items-center gap-[0.8vw]">
            <img
              src="/images/logo/slogo.png"
              alt="Supplefied Logo"
              className="h-[4.5dvh] max-h-[45px] w-auto object-contain"
            />
            <span className="text-[clamp(1.3rem,1.7vw,2rem)] font-black tracking-tight text-slate-900 font-display">
              SUPPLEFIED
            </span>
          </Link>

          <p className="text-[clamp(0.75rem,0.8vw,0.9rem)] text-slate-600 leading-relaxed max-w-[28rem]">
            Your trusted source for premium supplements and nutritional products. Quality, integrity, and your wellness is our commitment. Directed by brand mascot <strong>Bolt the Cyber-Panther</strong>.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
              ⚡ 100% Certified Authentic
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
              🛡️ ISO 17025 Tested
            </span>
          </div>
        </div>

        {/* Quick Links with Simple Names */}
        <div className="space-y-[1.5dvh]">
          <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold uppercase tracking-widest text-slate-900">Products</h4>
          <ul className="space-y-[1dvh] text-[clamp(0.75rem,0.8vw,0.85rem)] text-slate-600">
            <li><Link href="/shop" className="hover:text-slate-950 transition-colors">Pure Whey Isolates</Link></li>
            <li><Link href="/shop" className="hover:text-slate-950 transition-colors">Pre-Workouts</Link></li>
            <li><Link href="/shop" className="hover:text-slate-950 transition-colors">Creapure® Creatine</Link></li>
            <li><Link href="/shop" className="hover:text-slate-950 transition-colors">Sleep & Recovery</Link></li>
            <li><Link href="/shop" className="hover:text-slate-950 transition-colors">Electrolytes</Link></li>
          </ul>
        </div>

        <div className="space-y-[1.5dvh]">
          <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold uppercase tracking-widest text-slate-900">Company</h4>
          <ul className="space-y-[1dvh] text-[clamp(0.75rem,0.8vw,0.85rem)] text-slate-600">
            <li><Link href="/about" className="hover:text-slate-950 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-slate-950 transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-slate-950 transition-colors">FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-slate-950 transition-colors">Articles</Link></li>
            <li><Link href="/track-order" className="hover:text-slate-950 transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Talk To Us (Official Supplefied contact details) */}
        <div className="space-y-[1.5dvh]">
          <h4 className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold uppercase tracking-widest text-slate-900">Talk To Us</h4>
          <div className="space-y-[1.2dvh] text-[clamp(0.75rem,0.8vw,0.85rem)] text-slate-600">
            <div className="flex items-start gap-[0.5vw]">
              <Phone className="w-4 h-4 text-[#65a30d] shrink-0 mt-0.5" />
              <div>
                <span className="text-[0.7rem] text-slate-500 block">Got Questions? Call us</span>
                <a href="tel:+919891238727" className="text-slate-900 font-mono hover:text-[#65a30d] font-semibold">+91 9891238727</a>
              </div>
            </div>

            <div className="flex items-start gap-[0.5vw]">
              <Mail className="w-4 h-4 text-[#65a30d]" />
              <div>
                <a href="mailto:support@supplefied.com" className="text-slate-900 hover:text-[#65a30d] font-medium">support@supplefied.com</a>
              </div>
            </div>

            <div className="flex items-start gap-[0.5vw]">
              <MapPin className="w-4 h-4 text-[#65a30d] shrink-0 mt-0.5" />
              <p className="text-[0.7rem] text-slate-500 leading-tight">
                400-A Ajit Singh House, Yusuf Sarai Commercial Complex, Green Park, New Delhi - 110016
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-200 py-[2.5dvh] bg-slate-50">
        <div className="fluid-container flex flex-col sm:flex-row items-center justify-between gap-[1.5dvh] text-[clamp(0.7rem,0.75vw,0.8rem)] text-slate-500">
          <p>© 2026 Supplefied. All Rights Reserved. Premium Supplements Store.</p>
          <div className="flex items-center gap-[1vw]">
            <Link href="/about" className="hover:text-slate-900">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-900">Contact Us</Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-slate-900">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
