'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { openDrawer, selectCartCount } from '@/store/slices/cartSlice';
import { selectWishlistItems } from '@/store/slices/wishlistSlice';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  LogIn,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const wishlistItems = useSelector(selectWishlistItems);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Brands', href: '/brands' },
    { name: 'About Us', href: '/about' },
    { name: 'Articles', href: '/blog' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-[1.2dvh]'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-[1.8dvh]'
      }`}
    >
      <div className="fluid-container flex items-center justify-between">
        
        {/* Official Supplefied Logo */}
        <Link href="/" className="flex items-center gap-[0.8vw] group">
          <div className="relative h-[4.5dvh] min-h-[36px] max-h-[50px] w-auto flex items-center">
            <img
              src="/images/logo/slogo.png"
              alt="Supplefied Logo Mark"
              className="h-full w-auto object-contain drop-shadow-[0_2px_8px_rgba(132,204,22,0.3)] group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-[0.4vw]">
              <span className="text-[clamp(1.1rem,1.5vw,1.6rem)] font-black tracking-tighter text-slate-900 font-display">
                SUPPLEFIED
              </span>
            </div>
            <span className="text-[clamp(0.6rem,0.65vw,0.75rem)] font-mono font-bold tracking-widest text-[#65a30d] uppercase -mt-[0.2dvh]">
              Supplements Store
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-[2.2vw]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[clamp(0.8rem,0.9vw,0.95rem)] font-medium transition-all relative py-[0.5dvh] flex items-center gap-[0.3vw] ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#84cc16] rounded-full glow-lime-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-[0.8vw]">
          
          {/* Login / Sign Up Option */}
          <Link
            href="/account"
            className="hidden md:flex items-center gap-[0.4vw] px-[1.1vw] py-[0.8dvh] rounded-[clamp(0.5vw,0.8vw,1.2vw)] bg-slate-100 hover:bg-lime-50 border border-slate-200 hover:border-lime-400 text-[clamp(0.75rem,0.8vw,0.85rem)] font-semibold text-slate-800 hover:text-slate-950 transition-all cursor-pointer shadow-sm"
          >
            <LogIn className="w-[clamp(0.85rem,0.9vw,1.1rem)] h-[clamp(0.85rem,0.9vw,1.1rem)] text-[#65a30d]" />
            <span>Login / Sign Up</span>
          </Link>

          {/* User Account Link */}
          <Link
            href="/account"
            aria-label="My Account"
            className={`p-[clamp(0.5rem,0.6vw,0.8rem)] rounded-[clamp(0.5vw,0.8vw,1.2vw)] border transition-all ${
              pathname === '/account'
                ? 'border-lime-500 text-lime-700 bg-lime-50'
                : 'border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <User className="w-[clamp(1rem,1.1vw,1.3rem)] h-[clamp(1rem,1.1vw,1.3rem)]" />
          </Link>

          {/* Wishlist Link with Badge */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="p-[clamp(0.5rem,0.6vw,0.8rem)] rounded-[clamp(0.5vw,0.8vw,1.2vw)] border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all relative shadow-sm"
          >
            <Heart className="w-[clamp(1rem,1.1vw,1.3rem)] h-[clamp(1rem,1.1vw,1.3rem)]" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-[0.4dvh] -right-[0.4vw] min-w-[1.2rem] h-[1.2rem] rounded-full bg-[#ea580c] text-white font-bold text-[0.65rem] flex items-center justify-center px-1 shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Trigger with Counter */}
          <button
            onClick={() => dispatch(openDrawer())}
            aria-label="Shopping Cart"
            className="p-[clamp(0.5rem,0.6vw,0.8rem)] rounded-[clamp(0.5vw,0.8vw,1.2vw)] bg-[#84cc16] text-slate-950 font-bold hover:bg-[#65a30d] hover:text-white transition-all flex items-center gap-[0.4vw] glow-lime-sm active:scale-95 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-[clamp(1rem,1.1vw,1.3rem)] h-[clamp(1rem,1.1vw,1.3rem)]" />
            <span className="text-[clamp(0.75rem,0.8vw,0.9rem)] font-bold font-mono">{cartCount}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-[clamp(0.5rem,0.6vw,0.8rem)] rounded-[clamp(0.5vw,0.8vw,1.2vw)] border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-[5vw] py-[3dvh] space-y-[2dvh] animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col gap-[1.5dvh]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-[1dvh] flex items-center justify-between ${
                  pathname === link.href ? 'text-[#65a30d] font-bold' : 'text-slate-800 hover:text-slate-950'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-[1dvh] text-slate-800"
            >
              FAQ
            </Link>
          </div>

          <div className="pt-[2dvh] border-t border-slate-200">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-[1.8dvh] rounded-xl bg-[#84cc16] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
