'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BLOGS } from '@/data/blogs';
import { Clock, ArrowLeft, ChevronRight } from 'lucide-react';

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug;

  const blog = BLOGS.find((b) => b.slug === slug) || BLOGS[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-[6dvh]">
      <div className="fluid-container max-w-[55rem]">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-[0.5vw] text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500 mb-[4dvh] font-mono font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Articles</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#4d7c0f] font-bold truncate max-w-xs">{blog.title}</span>
        </div>

        {/* Header */}
        <div className="space-y-[1.5dvh] mb-[4dvh]">
          <span className="px-[1vw] py-[0.4dvh] rounded-full text-xs font-bold uppercase bg-lime-100 text-lime-800 border border-lime-300 inline-block">
            {blog.category}
          </span>

          <h1 className="text-[clamp(2rem,3.5vw,4.2rem)] font-black text-slate-950 font-display leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-[2dvh]">
            <span className="text-slate-900 font-bold">By {blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[clamp(1vw,1.8vw,2.5vw)] overflow-hidden mb-[4dvh] border border-slate-200 aspect-[16/9] bg-slate-100 shadow-sm">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Bolt's Pro Verdict Banner with Real Avatar */}
        {blog.boltTakeaway && (
          <div className="p-[1.8vw] rounded-[clamp(1vw,1.5vw,2vw)] bg-white border border-lime-400 flex items-start gap-[1.2vw] mb-[4dvh] shadow-lg">
            <div className="w-[clamp(3rem,4vw,5rem)] h-[clamp(3rem,4vw,5rem)] rounded-2xl overflow-hidden border border-lime-500/60 shrink-0 bg-slate-100">
              <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold text-[#4d7c0f]">Bolt's Scientific Summary</span>
              <p className="text-[clamp(0.8rem,0.95vw,1.1rem)] text-slate-700 font-medium leading-relaxed">
                {blog.boltTakeaway}
              </p>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="max-w-none text-slate-700 text-[clamp(0.85rem,1vw,1.1rem)] leading-relaxed space-y-[2dvh]">
          <p>{blog.excerpt}</p>
          <div className="p-[2vw] rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-[clamp(1rem,1.3vw,1.5rem)] font-bold text-slate-900 font-display mb-2">Core Research Summary</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              When choosing sports supplements, molecular integrity dictates metabolic absorption. Supplefied avoids high-heat acid wash denaturation to ensure maximum muscle peptide delivery.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-[4dvh] border-t border-slate-200 mt-[4dvh]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#4d7c0f] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
