/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play, Sparkles, Youtube, ExternalLink } from 'lucide-react';

export default function ConceptVideoSection() {
  return (
    <section 
      id="concept-video" 
      className="relative py-24 px-6 border-t border-amber-200/30 bg-[#FAECE1]/45 overflow-hidden"
    >
      {/* Decorative ambient background blur filters */}
      <div className="absolute inset-0 glowing-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
            System Design & Concept Pitch
          </h2>
          <p className="text-zinc-650 mt-3 text-sm max-w-xl text-pretty font-medium leading-relaxed">
            Watch our concept video outlining the motivation, system architecture, and HCI design critiques behind Research Custodian.
          </p>
        </div>

        {/* Video Embedding Card Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 85, damping: 15 }}
          className="p-4 rounded-3xl bg-white border border-amber-200/60 shadow-md relative group overflow-hidden"
        >
          {/* Top bezel/bar of media card */}
          <div className="flex justify-between items-center bg-zinc-50 border-b border-amber-100 p-3.5 mb-4 text-[10px] font-mono text-zinc-500 rounded-2xl">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Youtube className="w-4 h-4 text-red-600 fill-red-600/10" />
              <span>CONCEPT_PITCH_DEMO_33PrCV5Huuk_YOUTUBE</span>
            </div>
            <a
              href="https://www.youtube.com/watch?v=33PrCV5Huuk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 border border-zinc-200 transition-colors shadow-3xs font-semibold"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Actual responsive Video Iframe wrapper */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200/80 shadow-inner bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/33PrCV5Huuk?rel=0&autoplay=0&hl=en"
              title="Research Custodian Concept Pitch Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
