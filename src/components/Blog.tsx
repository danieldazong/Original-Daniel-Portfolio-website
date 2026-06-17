/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-surface border-y border-border-custom relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="flex flex-col">
            <span className="text-accent-blue font-mono text-xs font-semibold uppercase tracking-wider mb-2">03 / Writing</span>
            <h2 className="font-space font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
              Evidence of High-Clarity Teaching
            </h2>
            <div className="w-16 h-1 bg-accent-blue mt-4 rounded" />
          </div>
          
          <p className="mt-4 md:mt-0 max-w-sm text-sm text-text-secondary">
            Writing is teaching in asynchronous format. I compose clear explanations of underlying computer and structural mechanics to support engineering teams.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              id={`blog-post-card-${post.id}`}
              className="bg-bg rounded-xl border border-border-custom hover:border-accent-blue/30 overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Card Meta Badge */}
              <div className="p-6 pb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold text-accent-blue uppercase tracking-wider bg-accent-blue/5 border border-accent-blue/10 px-2.5 py-1 rounded-md">
                  {post.tag}
                </span>

                <div className="flex items-center gap-1 text-[11px] text-text-secondary font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              {/* Main Info */}
              <div className="px-6 pb-6 flex-1 flex flex-col">
                <h3 className="font-space text-lg font-bold text-text-primary mt-2 mb-3 tracking-tight group-hover:text-accent-blue transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-border-custom flex items-center justify-between text-xs font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                  <div className="flex items-center gap-1 text-[11px] text-text-secondary font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 hover:underline">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

            </article>
          ))}

        </div>

      </div>

      {/* Post Viewer Overlay Modal */}
      {selectedPost && (
        <div id="blog-reader-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-surface rounded-2xl border border-border-custom shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-scale">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-border-custom flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-accent-blue" />
                <div>
                  <span className="font-mono text-[10px] font-bold text-accent-blue uppercase tracking-wider block">
                    {selectedPost.tag}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-text-secondary font-mono mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedPost.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <button
                id="close-blog-reader"
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-zinc-100 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1 bg-surface scroll-smooth select-text">
              <h1 className="font-space font-extrabold text-2xl md:text-3xl text-text-primary tracking-tight leading-tight mb-6">
                {selectedPost.title}
              </h1>

              {/* simulated rendering of Markdown posts securely */}
              <div className="prose max-w-none text-text-secondary text-base leading-relaxed space-y-6">
                
                {/* Parse the plain text with safe division */}
                {selectedPost.content.split('\n\n').map((block, itemIdx) => {
                  if (block.startsWith('## ')) {
                    return (
                      <h2 key={itemIdx} className="font-space text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">
                        {block.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (block.startsWith('### ')) {
                    return (
                      <h3 key={itemIdx} className="font-space text-lg font-bold text-text-primary mt-6 mb-3">
                        {block.replace('### ', '')}
                      </h3>
                    );
                  }
                  return (
                    <p key={itemIdx} className="text-text-secondary leading-relaxed font-sans text-base">
                      {block}
                    </p>
                  );
                })}

                {/* Simulated Post Ending note */}
                <div className="mt-12 p-6 rounded-xl bg-bg border border-border-custom">
                  <h4 className="font-space text-sm font-bold text-text-primary mb-2">Want to discuss this system model deeper?</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    This analysis forms a core part of how I design scalable web infrastructures. If you are hiring and want an engineer who keeps optimization top-of-mind, get in touch below.
                  </p>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-border-custom bg-zinc-50 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 bg-text-primary text-surface rounded-lg text-xs font-semibold hover:bg-accent-blue transition-colors"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
