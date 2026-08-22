'use client';

import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES, GOALS } from '@/data/categories';
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedGoal,
  setPriceRange,
  setSortBy,
  setOnlyInStock,
  resetFilters
} from '@/store/slices/filterSlice';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { Search, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export default function ShopPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (
        filters.searchQuery &&
        !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !product.tagline.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Category
      if (filters.selectedCategory !== 'all' && product.category !== filters.selectedCategory) {
        return false;
      }
      // Goal
      if (filters.selectedGoal !== 'all' && product.goal !== filters.selectedGoal) {
        return false;
      }
      // Price
      if (product.price > filters.priceRange[1]) {
        return false;
      }
      // Stock
      if (filters.onlyInStock && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured'
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[5dvh]">
      <div className="fluid-container">
        
        {/* Page Title & Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[2dvh] pb-[3dvh] border-b border-slate-200">
          <div>
            <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#65a30d]">
              Complete Catalog
            </span>
            <h1 className="text-[clamp(1.8rem,3vw,3.6rem)] font-black text-slate-950 font-display">
              SHOP ALL SUPPLEMENTS
            </h1>
            <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 mt-1 font-medium">
              Showing {filteredProducts.length} formulas engineered for peak performance and recovery.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-[22vw] min-w-[260px]">
            <Search className="absolute left-[1vw] top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search supplements..."
              className="w-full bg-white border border-slate-300 rounded-2xl pl-[2.8vw] pr-[1vw] py-[1.2dvh] text-[clamp(0.75rem,0.8vw,0.85rem)] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Toolbar & Sort Controls */}
        <div className="py-[2.5dvh] flex flex-wrap items-center justify-between gap-[1vw]">
          <div className="flex items-center gap-[0.8vw]">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-[1.5vw] py-[1dvh] rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Active Category Badges */}
            <div className="hidden sm:flex items-center gap-[0.5vw] overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => dispatch(setSelectedCategory(cat.id))}
                  className={`px-[1vw] py-[0.7dvh] rounded-full text-[clamp(0.7rem,0.75vw,0.85rem)] font-medium border transition-all shrink-0 cursor-pointer shadow-sm ${
                    filters.selectedCategory === cat.id
                      ? 'border-lime-500 bg-lime-50 text-[#365314] font-bold glow-lime-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[0.8vw] ml-auto">
            <span className="text-slate-500 hidden sm:inline text-[clamp(0.7rem,0.75vw,0.85rem)] font-medium">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="bg-white border border-slate-300 rounded-xl px-[1vw] py-[0.8dvh] text-[clamp(0.7rem,0.75vw,0.85rem)] text-slate-900 focus:outline-none focus:border-lime-500 cursor-pointer shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated ★</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Filter Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2.5vw] items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 p-[1.5vw] space-y-[2dvh] shadow-sm ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between pb-[1.5dvh] border-b border-slate-100">
              <h3 className="text-[clamp(0.8rem,0.9vw,1rem)] font-bold text-slate-900 font-display flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#65a30d]" />
                Filter Options
              </h3>
              <button
                onClick={() => dispatch(resetFilters())}
                className="text-[clamp(0.7rem,0.75vw,0.8rem)] text-slate-500 hover:text-lime-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Target Goal Filter */}
            <div className="space-y-[1dvh]">
              <label className="text-[clamp(0.65rem,0.7vw,0.75rem)] font-bold uppercase tracking-wider text-slate-700">
                Fitness Goal
              </label>
              <div className="space-y-[0.5dvh]">
                <button
                  onClick={() => dispatch(setSelectedGoal('all'))}
                  className={`w-full text-left px-[1vw] py-[0.8dvh] rounded-xl text-[clamp(0.7rem,0.75vw,0.85rem)] flex items-center justify-between transition-colors cursor-pointer ${
                    filters.selectedGoal === 'all'
                      ? 'bg-lime-50 text-[#365314] font-bold border border-lime-300'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <span>All Goals</span>
                  {filters.selectedGoal === 'all' && <Check className="w-3.5 h-3.5 text-[#65a30d]" />}
                </button>
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => dispatch(setSelectedGoal(g.id))}
                    className={`w-full text-left px-[1vw] py-[0.8dvh] rounded-xl text-[clamp(0.7rem,0.75vw,0.85rem)] flex items-center justify-between transition-colors cursor-pointer ${
                      filters.selectedGoal === g.id
                        ? 'bg-lime-50 text-[#365314] font-bold border border-lime-300'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    <span>{g.name}</span>
                    {filters.selectedGoal === g.id && <Check className="w-3.5 h-3.5 text-[#65a30d]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div className="space-y-[1dvh] pt-[1.5dvh] border-t border-slate-100">
              <div className="flex items-center justify-between text-[clamp(0.7rem,0.75vw,0.8rem)]">
                <label className="font-bold uppercase tracking-wider text-slate-700">Max Price</label>
                <span className="font-mono font-bold text-[#4d7c0f]">${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={filters.priceRange[1]}
                onChange={(e) => dispatch(setPriceRange([0, Number(e.target.value)]))}
                className="w-full accent-[#84cc16] cursor-pointer"
              />
              <div className="flex justify-between text-[0.65rem] text-slate-400 font-mono font-bold">
                <span>$20</span>
                <span>$100</span>
              </div>
            </div>

            {/* Stock Filter */}
            <div className="pt-[1.5dvh] border-t border-slate-100">
              <label className="flex items-center gap-[0.5vw] text-[clamp(0.7rem,0.75vw,0.8rem)] text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={filters.onlyInStock}
                  onChange={(e) => dispatch(setOnlyInStock(e.target.checked))}
                  className="rounded border-slate-300 text-[#84cc16] focus:ring-0 accent-[#84cc16] w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Products Grid Content */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-[4vw] rounded-[clamp(1vw,1.5vw,2vw)] glass-panel bg-white border border-slate-200 text-center space-y-[2dvh] shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">No Matching Products Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for another supplement name.
                </p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="px-[2vw] py-[1.2dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-xs glow-lime cursor-pointer shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2vw]">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
