/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HelpCircle, AlertTriangle, Users, Search, GraduationCap, ArrowRight, UserPlus, Play, EyeOff, BookOpen, Inbox } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-28 px-6 border-t border-amber-200/30 bg-[#FAECE1] overflow-hidden">
      {/* Light glow effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            The Problem
          </h2>
          <div className="w-16 h-1 bg-amber-500/40 rounded-full mt-4" />
        </div>

        {/* Dynamic Multi-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Core Problem statement & OCR details (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-white border border-amber-200/60 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-lg bg-amber-50 text-amber-800 shrink-0 border border-amber-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-805 uppercase tracking-wider font-mono text-amber-900">The Niche Barrier</h3>
                <p className="text-2xl font-bold text-zinc-900 mt-1 leading-tighter">
                  Undergraduates face steep obstacles when seeking niche tech research.
                </p>
                <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
                  Highly specific fields like Computational Neuroscience, Quantum Informatics, and Bio-inspired Robotics suffer from discovery friction. Students cannot find entry points, and busy labs struggle to assess true aptitude beyond simple high-letter GPAs.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: 3 Main Issues */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Card 1: The Exposure Problem */}
            <motion.div 
              whileHover={{ y: -3, borderColor: 'rgba(180, 83, 9, 0.4)' }}
              className="p-6 rounded-2xl bg-white border border-amber-200/40 transition-all shadow-xs flex gap-5 items-start"
            >
              <div className="p-3.5 rounded-xl bg-amber-50 text-amber-800 shrink-0 border border-amber-100 flex items-center justify-center shadow-3xs">
                <EyeOff className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-zinc-950">1. The Exposure Problem</h4>
                  <span className="font-mono text-xs font-semibold text-amber-800/60 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/50">01</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Undergraduates lack visibility into niche interdisciplinary research labs. Open positions and ongoing projects remain hidden behind departmental silos, making opportunity discovery a game of pure luck.
                </p>
              </div>
            </motion.div>

            {/* Card 2: The Experience Problem */}
            <motion.div 
              whileHover={{ y: -3, borderColor: 'rgba(180, 83, 9, 0.4)' }}
              className="p-6 rounded-2xl bg-white border border-amber-200/40 transition-all shadow-xs flex gap-5 items-start"
            >
              <div className="p-3.5 rounded-xl bg-amber-50 text-amber-800 shrink-0 border border-amber-100 flex items-center justify-center shadow-3xs">
                <BookOpen className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-zinc-950">2. The Experience Problem</h4>
                  <span className="font-mono text-xs font-semibold text-amber-800/60 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/50">02</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Niche and emerging research groups demand specialized foundational skills, yet students have no clear roadmap or direct training environments to bridge the gap and become viable candidates.
                </p>
              </div>
            </motion.div>

            {/* Card 3: The Response Problem */}
            <motion.div 
              whileHover={{ y: -3, borderColor: 'rgba(180, 83, 9, 0.4)' }}
              className="p-6 rounded-2xl bg-white border border-amber-200/40 transition-all shadow-xs flex gap-5 items-start"
            >
              <div className="p-3.5 rounded-xl bg-amber-50 text-amber-800 shrink-0 border border-amber-100 flex items-center justify-center shadow-3xs">
                <Inbox className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-zinc-950">3. The Response Problem</h4>
                  <span className="font-mono text-xs font-semibold text-amber-800/60 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/50">03</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Even the most earnest, personalized cold outreach emails end up buried or ignored in professors' overloaded inboxes, yielding a devastatingly low reply and acceptance rate.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
