'use client';

import { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getBrandBySlug } from '@/data/brands';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Search, X, Sparkles } from 'lucide-react';

export default function BrandStorefrontPage() {
  const params = useParams();
  const slug = params?.slug;

  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  // Products belonging to this brand
  const brandProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.brandId === brand.id || p.brandName?.toLowerCase() === brand.name.toLowerCase());
  }, [brand]);

  // Search, Filter, Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Categories available for this brand
  const categories = useMemo(() => {
    const cats = brandProducts.map((p) => p.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [brandProducts]);

  // Filtered & Sorted Products
  const displayedProducts = useMemo(() => {
    let result = brandProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCat;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [brandProducts, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 pb-[8dvh]">
      
      {/* Banner hidden per request for now */}
      {/* <div className="w-full h-36 sm:h-48 md:h-56 lg:h-64 relative p-0 m-0 overflow-hidden bg-slate-900 border-b border-slate-200">
        <img
          src={brand.bannerImage}
          alt={`${brand.name} Landscape Banner`}
          className="w-full h-full object-cover object-center block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div> */}

      {/* BRAND DETAILS & PRODUCTS */}
      <section className="py-[4dvh]">
        <div className="fluid-container">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-slate-900 transition-colors">Brands</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{brand.name}</span>
          </nav>

          {/* Brand Header: Logo, Name, Badge, Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[3.5dvh] pb-[2.5dvh] border-b border-slate-200/80">
            <div className="flex items-center gap-4">
              {/* Brand Logo Thumbnail */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-sm shrink-0">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[clamp(1.5rem,2.4vw,2.5rem)] font-black tracking-tight text-slate-900 font-display">
                    {brand.name}
                  </h1>
                  {brand.isBoltsFavourite && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-[#bef264] shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-[#bef264]" />
                      Bolt&apos;s Favourite
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm mt-0.5 max-w-2xl">
                  {brand.tagline}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 self-start sm:self-auto">
              {brandProducts.length} {brandProducts.length === 1 ? 'Product' : 'Products'}
            </div>
          </div>

          {/* Controls Bar: Search + Category Filters (Grouped) & Sort (Right) */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm mb-[4dvh]">
            
            {/* Search + Category Filters directly to the right */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              {/* Search */}
              <div className="relative w-full sm:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${brand.name}...`}
                  className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 pl-10 pr-8 py-2 rounded-full border border-slate-200 focus:border-[#84cc16] focus:bg-white transition-all outline-none text-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills directly to the right of searchbar */}
              {categories.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-[#bef264]'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
              <span className="text-xs text-slate-500 font-mono">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-full px-3 py-1.5 outline-none focus:border-lime-500 cursor-pointer shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products List Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.8vw]">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 font-display">No products found</h3>
              <p className="text-slate-500 text-xs mt-1 mb-4">
                No {brand.name} products match your current filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSortBy('featured');
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
