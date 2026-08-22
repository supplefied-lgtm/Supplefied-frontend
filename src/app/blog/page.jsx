'use client';

import Link from 'next/link';
import { BLOGS } from '@/data/blogs';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-[6dvh]">
      <div className="fluid-container">
        
        <div className="text-center max-w-[42rem] mx-auto mb-[6dvh] space-y-[1.5dvh]">
          <div className="inline-flex items-center gap-[0.5vw] px-[1.2vw] py-[0.6dvh] rounded-full bg-lime-100 text-lime-800 text-[clamp(0.65rem,0.75vw,0.85rem)] font-mono font-bold border border-lime-300">
            <BookOpen className="w-4 h-4 text-lime-600" />
            <span>NUTRITION & SCIENCE GUIDES</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,4.5rem)] font-black text-slate-950 font-display">
            ARTICLES & GUIDES
          </h1>
          <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-slate-600 font-medium">
            Educational articles on supplement timing, cold-filtration benefits, and cellular recovery written by biochemists and Bolt.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw]">
          {BLOGS.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group rounded-[clamp(1vw,1.5vw,2.2vw)] glass-panel bg-white border border-slate-200 hover:border-lime-500/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-900/90 text-[#bef264] border border-slate-800 backdrop-blur-md shadow-sm">
                    {blog.category}
                  </div>
                </div>

                <div className="p-[1.5vw] space-y-[1dvh]">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>

                  <h2 className="text-[clamp(0.95rem,1.1vw,1.25rem)] font-bold text-slate-900 group-hover:text-[#4d7c0f] transition-colors line-clamp-2 font-display">
                    {blog.title}
                  </h2>

                  <p className="text-[clamp(0.7rem,0.78vw,0.85rem)] text-slate-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-[1.5vw] pb-[1.5vw] pt-2 flex items-center justify-between text-xs font-bold text-[#4d7c0f]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#65a30d]" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
