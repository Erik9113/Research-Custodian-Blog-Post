/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles, HelpCircle, Users, Image as ImageIcon, GraduationCap } from 'lucide-react';

const figure1Url = 'https://i.imgur.com/lqnYn7u.png';
const figure2Url = 'https://i.imgur.com/j5jXw8R.png';

interface Card {
  id: string;
  text: string;
  x: number; // grid positioning percent
  y: number; // grid positioning percent
  color: string;
}

interface Annotation {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string; // red, blue
  fontSize?: string;
  styleClass?: string;
}

interface SVGConnector {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  label?: string;
  labelX?: number;
  labelY?: number;
  color: string;
  dashed?: boolean;
}

function WhiteboardExplorer() {
  const [viewMode, setViewMode] = useState<'initial' | 'annotated'>('initial');

  // Standard whiteboard cards (the starting points)
  const initialCards: Card[] = [
    { id: 'curious', text: 'I am Curious about different fields', x: 8, y: 38, color: 'border-blue-500 bg-blue-50/50' },
    { id: 'want', text: 'I want to do Something\n(in a niche field)', x: 23, y: 38, color: 'border-blue-500 bg-blue-50/50' },
    { id: 'find', text: 'I find Someone involved in that niche field', x: 42, y: 38, color: 'border-blue-500 bg-blue-50/50' },
    { id: 'apply', text: 'I apply to a position (research or job) in a niche field', x: 61, y: 36, color: 'border-blue-500 bg-blue-50/50' },
    { id: 'role', text: 'I get the role I desire in a niche field', x: 73, y: 38, color: 'border-blue-500 bg-blue-50/50 text-slate-800 font-semibold' },
    { id: 'interested', text: "I'm interested in multiple niche fields but I'm not sure what to go into", x: 86, y: 35, color: 'border-blue-500 bg-blue-50/50' },
    { id: 'scheduling', text: 'Scheduling Time?', x: 48, y: 70, color: 'border-blue-400 bg-blue-50/30 text-xs text-blue-800' },
    { id: 'contact', text: 'Contact Info?', x: 57, y: 64, color: 'border-blue-400 bg-blue-50/30 text-xs text-blue-800' },
  ];

  // Overlay annotations added by participants (red and blue markers)
  const annotations: Annotation[] = [
    // Under curious:
    { id: 'ann-lack', text: '1 (lack of abstract info)', x: 10, y: 55, color: 'text-red-600 font-semibold', styleClass: 'italic' },
    // Between curious and want:
    { id: 'ann-expose', text: 'Exposure is\nlimited initially', x: 16, y: 20, color: 'text-red-500 font-bold text-xs' },
    // Near want:
    { id: 'ann-know', text: 'Knowing the problems can help you know what you can contribute to', x: 23, y: 66, color: 'text-red-600', fontSize: 'text-[11px]' },
    // On Card find:
    { id: 'ann-find-note', text: 'Contacting alumni', x: 37, y: 72, color: 'text-red-600 font-bold' },
    // Near find and contact:
    { id: 'ann-find-deps', text: 'Depends on personal research path', x: 40, y: 18, color: 'text-red-600 font-semibold', fontSize: 'text-[11px]' },
    // Apply notes:
    { id: 'ann-apply-expert', text: 'Prerequisites take awhile, not enough time to explore', x: 50, y: 50, color: 'text-red-600', fontSize: 'text-[11px]' },
    // Near interested:
    { id: 'ann-school', text: 'School Curriculum OR Existing Institutions?\n(Knowing what classes are useful - even if not required) ➔ MATH', x: 65, y: 76, color: 'text-red-600', fontSize: 'text-[11px]' },
    // AI aspects:
    { id: 'ann-ai', text: "AI's impact? Do you need a PhD to contribute?\n➔ Domain Expertise vs. a Degree", x: 72, y: 15, color: 'text-red-600 font-bold', fontSize: 'text-[11px]' },
    // General problems:
    { id: 'ann-problems', text: "★ Problems + Requirements highly dependent on niche\ni.e., Quant Finance: Professional Experience > Research\nComp Bio: '<' ", x: 80, y: 63, color: 'text-slate-800 font-semibold bg-amber-100/80 p-2.5 rounded border border-amber-200 shadow-sm leading-relaxed', fontSize: 'text-[10px]' },
    { id: 'ann-ai-help', text: '- how does AI help?\n- fault tolerance\n- do you have to pitch yourself', x: 88, y: 15, color: 'text-blue-700 font-semibold' }
  ];

  // Drawn lines / connections
  const initialConnectors: SVGConnector[] = [
    { fromX: 18, fromY: 48, toX: 23, toY: 48, color: 'stroke-blue-400' },
    { fromX: 38, fromY: 48, toX: 42, toY: 48, color: 'stroke-blue-400' },
    { fromX: 57, fromY: 48, toX: 61, toY: 48, color: 'stroke-blue-400' },
    { fromX: 81, fromY: 48, toX: 86, toY: 48, color: 'stroke-blue-400' },
  ];

  const annotatedConnectors: SVGConnector[] = [
    // Red connector paths showing drawing connections
    { fromX: 14, fromY: 48, toX: 23, toY: 48, label: 'Newsletter? Campus Events', labelX: 18, labelY: 42, color: 'stroke-red-500' },
    { fromX: 33, fromY: 48, toX: 42, toY: 48, label: 'Mentorship', labelX: 37, labelY: 34, color: 'stroke-red-500 animate-pulse' },
    { fromX: 52, fromY: 48, toX: 61, toY: 46, label: '(App Process + Interview)', labelX: 56, labelY: 38, color: 'stroke-red-500' },
    { fromX: 71, fromY: 48, toX: 73, toY: 48, label: '(or accepted)', labelX: 71, labelY: 42, color: 'stroke-red-500' },
    // From wants to find
    { fromX: 25, fromY: 57, toX: 42, toY: 48, label: 'Low # of niche CS classes ➔ challenges of finding peers with similar interests', labelX: 29, labelY: 54, color: 'stroke-red-500' },
    // To scheduling and contact
    { fromX: 48, fromY: 48, toX: 48, toY: 70, label: 'response rate?', labelX: 44, labelY: 60, color: 'stroke-red-400', dashed: true },
    { fromX: 55, fromY: 48, toX: 57, toY: 64, color: 'stroke-red-400', dashed: true },
  ];

  return (
    <div className="w-full bg-white border border-amber-200/50 p-6 md:p-8 rounded-3xl shadow-sm mt-4 text-left w-full" id="process-whiteboard-root">
      
      {/* Introduction text */}
      <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h4 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Empirical Focus Group Outcomes
          </h4>
          <p className="text-xs text-zinc-500 mt-1 max-w-2xl">
            We conducted a rigorous Card Sorting evaluation with target undergraduates and interdisciplinary researchers. Click below to toggle between the starting canvas and the participant annotations.
          </p>
        </div>
        
        {/* Toggle Switches styled cleanly */}
        <div className="flex bg-amber-50/50 p-1 rounded-xl border border-amber-200/60 self-end lg:self-auto shadow-inner">
          <button
            onClick={() => setViewMode('initial')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              viewMode === 'initial'
                ? 'bg-white text-slate-900 shadow-sm border border-amber-200/30'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Figure 1: Starting Point
          </button>
          <button
            onClick={() => setViewMode('annotated')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'annotated'
                ? 'bg-white text-rose-800 shadow-sm border border-rose-200/30'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            Figure 2: Final Card Sort
          </button>
        </div>
      </div>

      {/* Side-by-Side (or stacked) layout container for comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Column: Digitized Interactive Whiteboard model (takes 7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden">
          <div className="relative border-x-[12px] border-t-[12px] border-b-[20px] border-slate-300 bg-stone-50 rounded-2xl shadow-inner min-h-[520px] overflow-x-auto overflow-y-hidden select-none flex-1 max-w-full">
            
            {/* Fine grid paper guidelines background */}
            <div 
              className="absolute inset-0 opacity-[0.06] pointer-events-none" 
              style={{ 
                backgroundImage: 'radial-gradient(#27272a 1px, transparent 0)', 
                backgroundSize: '24px 24px' 
              }} 
            />

            {/* Board Title in Marker Font */}
            <div className="absolute top-4 left-6 pointer-events-none font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span>Dry-Erase Activity Board</span>
              <span>&middot;</span>
              <span className="text-rose-500">{viewMode === 'annotated' ? '★ Annotated Cohort Result' : 'Pre-Session Layout'}</span>
            </div>

            {/* Whiteboard content area using fixed percentage layout scaled cleanly */}
            <div className="relative w-full min-w-[950px] h-[480px]">
              
              {/* Render SVG Connectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {initialConnectors.map((c, i) => (
                  <g key={`init-conn-${i}`}>
                    <line
                      x1={`${c.fromX}%`}
                      y1={`${c.fromY}%`}
                      x2={`${c.toX}%`}
                      y2={`${c.toY}%`}
                      className={`${c.color}`}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>
                ))}

                {/* Render Annotated Connectors with Animation */}
                <AnimatePresence>
                  {viewMode === 'annotated' && (
                    annotatedConnectors.map((c, i) => (
                      <motion.g
                        key={`ann-conn-${i}`}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      >
                        <line
                          x1={`${c.fromX}%`}
                          y1={`${c.fromY}%`}
                          x2={`${c.toX}%`}
                          y2={`${c.toY}%`}
                          className={`${c.color}`}
                          strokeWidth="3"
                          strokeDasharray={c.dashed ? "4,4" : undefined}
                          strokeLinecap="round"
                        />
                        {c.label && (
                          <foreignObject
                            x={`${c.labelX}%`}
                            y={`${c.labelY}%`}
                            width="180"
                            height="40"
                            className="-translate-x-1/2 -translate-y-1/2 text-center"
                          >
                            <div className="text-[10px] font-bold text-rose-600 bg-white/90 px-1.5 py-0.5 rounded shadow-sm border border-rose-100 italic leading-tight select-none">
                              {c.label}
                            </div>
                          </foreignObject>
                        )}
                      </motion.g>
                    ))
                  )}
                </AnimatePresence>
              </svg>

              {/* Render Starting Cards */}
              {initialCards.map((card) => {
                const isFloating = card.id === 'scheduling' || card.id === 'contact';
                return (
                  <motion.div
                    key={card.id}
                    layout
                    style={{ left: `${card.x}%`, top: `${card.y}%` }}
                    className={`absolute w-36 p-3 rounded-xl border-2 shadow-sm font-sans flex flex-col items-center justify-center text-center select-none ${card.color} ${
                      isFloating ? 'transform scale-95 border-dashed bg-white/70' : 'border-solid bg-white'
                    }`}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  >
                    {!isFloating && (
                      <span className="text-[9px] font-mono font-bold text-blue-505 uppercase tracking-widest mb-1 select-none">
                        Card
                      </span>
                    )}
                    <span className="text-[11px] font-bold leading-tight text-slate-850 whitespace-pre-line select-none">
                      {card.text}
                    </span>
                  </motion.div>
                );
              })}

              {/* Render Annotated Overlay layers (fade in if active) */}
              <AnimatePresence>
                {viewMode === 'annotated' && (
                  annotations.map((ann, idx) => (
                    <motion.div
                      key={ann.id}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: idx * 0.08 }}
                      style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                      className={`absolute max-w-xs pointer-events-none select-none z-20 ${ann.fontSize || 'text-xs'} ${ann.color} ${ann.styleClass || ''}`}
                    >
                      {ann.text.startsWith('★') ? (
                        <div className="p-1">
                          {ann.text}
                        </div>
                      ) : (
                        <span className="inline-block whitespace-pre-line leading-relaxed drop-shadow-sm select-none">
                          {ann.text}
                        </span>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

            </div>

            {/* Whiteboard Accent Trays - Dry Erase details */}
            <div className="absolute right-8 bottom-1.5 flex items-center gap-4 text-xs font-mono text-slate-500 select-none bg-stone-100 p-1 rounded-md border border-stone-200">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1.5 rounded-full bg-rose-500 block border border-rose-700" />
                <span className="text-[9px] font-bold">Red Marker</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1.5 rounded-full bg-blue-500 block border border-blue-700" />
                <span className="text-[9px] font-bold">Blue Marker</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-3 bg-slate-800 block rounded shadow-sm border border-slate-900" />
                <span className="text-[9px] font-bold">Eraser</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actual Authentic Workshop Photo File (takes 5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="border border-amber-200/50 bg-amber-50/10 p-5 rounded-3xl h-full flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-zinc-400" />
                  {viewMode === 'initial' ? 'Authentic Figure 1 File' : 'Authentic Figure 2 File'}
                </span>
                <span className={`text-[9px] border font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  viewMode === 'initial' ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-rose-100 border-rose-200 text-rose-700'
                }`}>
                  Workshop Photo
                </span>
              </div>

              {/* Photo Frame Container */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md relative aspect-video flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {viewMode === 'initial' ? (
                    <motion.img
                      key="file-fig1"
                      src={figure1Url}
                      alt="Actual whiteboard starting configuration"
                      className="w-full h-full object-cover rounded-2xl hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  ) : (
                    <motion.img
                      key="file-fig2"
                      src={figure2Url}
                      alt="Actual whiteboard post-sort configuration"
                      className="w-full h-full object-cover rounded-2xl hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Context Summary for the raw photo */}
              <div className="mt-4 p-3.5 bg-white border border-amber-200/50 rounded-xl text-xs text-zinc-600 leading-relaxed shadow-xs text-left">
                {viewMode === 'initial' ? (
                  <p>
                    <strong className="text-slate-800">Pre-Session Capture:</strong> This photograph displays the pristine physical cards arranged at the start of the study, displaying the sequence from "Curious" to "Role" before any student engagement.
                  </p>
                ) : (
                  <p>
                    <strong className="text-slate-800">Post-Session Annotations:</strong> This photograph captures the raw annotations generated during the active student workshop. Note the hand-drawn links, highlighting severe academic curriculum gaps.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-amber-205/60 text-[10px] text-slate-400 font-mono text-center">
              Compare digitized mockups with raw focus empirical records.
            </div>
          </div>
        </div>

      </div>

      {/* Caption description for figures */}
      <div className="mt-6 p-4.5 bg-amber-50/20 border border-amber-200/50 rounded-2xl flex items-start gap-3 text-left">
        <div className="text-xs text-slate-600 leading-relaxed font-sans">
          <p className="font-bold text-slate-900">
            {viewMode === 'initial' 
              ? 'Figure 1: The starting point of the “Card Sort” diagram we asked participants to build on.' 
              : 'Figure 2: The final “Card Sort” diagram after the focus group participants added their annotations and notes (based on our questions and their interaction during the diagramming process).'}
          </p>
          <p className="mt-2 text-zinc-500 font-light leading-relaxed">
            Our study proved that undergraduates have high motivation for research but suffer from a major information mismatch. High-touch interdisciplinary validation steps—such as **prerequisite portfolios** and centralized, system-guided messaging built directly into the platform core—were formulated directly in response to these session annotations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DesignProcessTimeline() {
  const [activeFrame, setActiveFrame] = useState<number>(1);

  const steps = [
    { step: 1, label: "Research", caption: "User Research" },
    { step: 2, label: "Visuals", caption: "Storyboard" },
    { step: 3, label: "Sketch", caption: "Paper Prototype" },
    { step: 4, label: "Interactive", caption: "Usability Testing & Evaluation" },
  ];

  return (
    <section id="design-process" className="relative py-28 px-6 border-t border-zinc-200 bg-[#FDFDFB] overflow-hidden">
      <div className="absolute inset-0 glowing-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section title & badge */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none animate-fade-in">
            Design Process & Iteration
          </h2>
          <div className="w-16 h-1 bg-amber-500/50 rounded-full mt-4" />
        </div>

        {/* LARGE CORE SLIDE NAVIGATION MODULE */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 bg-white border border-amber-200/60 rounded-2xl shadow-md w-full max-w-4xl">
            {steps.map((item) => (
              <button
                key={item.step}
                onClick={() => setActiveFrame(item.step)}
                className={`relative px-4 py-3.5 rounded-xl transition-all flex flex-col items-center text-center md:items-start md:text-left min-w-0 cursor-pointer overflow-hidden ${
                  activeFrame === item.step
                    ? 'border border-amber-300 bg-amber-50/20'
                    : 'bg-transparent hover:bg-zinc-50 border border-transparent'
                }`}
              >
                {activeFrame === item.step && (
                  <motion.div
                    layoutId="activeSlideIndicator"
                    className="absolute inset-0 bg-amber-500/5 border-l-4 border-l-amber-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`text-sm font-bold relative z-10 truncate w-full ${
                  activeFrame === item.step ? 'text-zinc-900 font-black' : 'text-zinc-650 font-medium'
                }`}>
                  {item.caption}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTAINER FOR ACTIVE SLIDE CONTENT */}
        <div className="bg-white rounded-3xl border border-amber-200/40 shadow-lg p-6 md:p-10 relative min-h-[400px] flex flex-col justify-between">
          <div className="absolute top-4 right-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden sm:block">
            Step 0{activeFrame} of 04 • Design Framework
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFrame}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-center items-center text-center py-4 w-full"
            >
              {activeFrame === 1 && (
                <div className="w-full flex flex-col items-center gap-6">
                  {/* Empirical Focus Group & Interview Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl text-left mb-2">
                    <motion.div 
                      whileHover={{ y: -4, borderColor: 'rgba(180, 83, 9, 0.4)' }}
                      className="p-5 rounded-2xl bg-stone-50/50 border border-amber-200/45 transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-2 mb-2 text-amber-800 font-semibold">
                        <Users className="w-4 h-4" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Focus Group</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900">5 Students</div>
                      <p className="text-zinc-650 text-xs mt-1.5 leading-relaxed">
                        Revealed limited exposure, lack of experience, and an absence of standard guidelines in niche labs.
                      </p>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -4, borderColor: 'rgba(180, 83, 9, 0.4)' }}
                      className="p-5 rounded-2xl bg-stone-50/50 border border-amber-200/45 transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-2 mb-2 text-amber-800 font-semibold">
                        <GraduationCap className="w-4 h-4" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Interviews</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900">2 Researchers</div>
                      <p className="text-zinc-650 text-xs mt-1.5 leading-relaxed">
                        Confirmed that applicants lack core prereq exposure, spending massive onboard time on basic concepts.
                      </p>
                    </motion.div>
                  </div>
                  <WhiteboardExplorer />
                </div>
              )}

              {activeFrame === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full max-w-5xl text-left">
                  <div className="md:col-span-4 space-y-4">
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">Storyboard</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-light">
                      We created a storyboard where a student discovers a lab, completes a prerequisite project, receives expert feedback, and then applies to join the lab. This concept became the foundation of our design.
                    </p>
                  </div>
                  <div className="md:col-span-8 w-full">
                    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md flex items-center justify-center bg-zinc-50/50">
                      <img
                        src="https://i.imgur.com/ASolnGQ.png"
                        alt="Design Storyboard Sequence"
                        className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500 rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeFrame === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full max-w-6xl text-left">
                  <div className="lg:col-span-5 space-y-5">
                    <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                      Paper Prototype
                    </h3>
                    
                    <p className="text-zinc-650 text-xs md:text-sm leading-relaxed font-light">
                      We began our design process with low-fidelity paper prototyping so we could rapidly iterate on ideas. Validating early concept layouts and interactive flows on physical paper allowed us to re-wire several key screens and try diverse alternatives before committing to layout code.
                    </p>

                    <div className="p-4 bg-amber-50/30 border border-amber-200/40 rounded-xl">
                      <h4 className="text-xs font-bold font-mono text-amber-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        Key Low-Fidelity Discovery:
                      </h4>
                      <p className="text-xs text-zinc-700 font-semibold leading-relaxed mb-2">
                        Identified navigational ambiguities early:
                      </p>
                      <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                        Testing paper mockups showed users needed explicit visual breadcrumbs and a unified progress timeline to feel confident during application submissions.
                      </p>
                    </div>

                    <p className="text-xs text-zinc-400 font-light italic border-t border-zinc-100 pt-3">
                      Slide 3: Interactive comparisons of low-fidelity layout concepts during early design workshops.
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-6 w-full">
                    {/* Comparison grid 1 */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Set 1 • Student Application Journey
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Before Column */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-zinc-100 border border-zinc-200 rounded-lg px-2.5 py-1">
                            <span className="text-[10px] font-mono uppercase text-zinc-650 font-bold">Initial Application Screen</span>
                            <span className="text-[9px] bg-zinc-205 text-zinc-705 font-mono px-1.5 py-0.5 rounded font-medium">Before</span>
                          </div>
                          <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-stone-50/50 shadow-xs p-2 flex items-center justify-center max-h-[280px]">
                            <img
                              src="https://i.imgur.com/BpsCNew.png"
                              alt="Initial Paper Prototype"
                              className="w-full h-auto max-h-[240px] object-contain rounded-xl hover:scale-[1.01] transition-transform duration-550"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* After Column */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-amber-50 border border-amber-200/60 rounded-lg px-2.5 py-1">
                            <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">Refined Guidance Screen</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.5 rounded font-semibold">After</span>
                          </div>
                          <div className="border border-amber-200/40 rounded-2xl overflow-hidden bg-[#FFFDF9] shadow-xs p-2 flex items-center justify-center max-h-[280px]">
                            <img
                              src="https://i.imgur.com/DTeZOKy.png"
                              alt="Usability Iteration Prototype"
                              className="w-full h-auto max-h-[240px] object-contain rounded-xl hover:scale-[1.01] transition-transform duration-550"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comparison grid 2 */}
                    <div className="space-y-2 border-t border-zinc-100 pt-4">
                      <div className="text-[11px] font-bold font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Set 2 • Faculty & Researcher Review
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Before Column */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-zinc-100 border border-zinc-200 rounded-lg px-2.5 py-1">
                            <span className="text-[10px] font-mono uppercase text-zinc-650 font-bold">Unstructured Decisions</span>
                            <span className="text-[9px] bg-zinc-200 text-zinc-700 font-mono px-1.5 py-0.5 rounded font-medium">Before</span>
                          </div>
                          <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-stone-50/50 shadow-xs p-2 flex items-center justify-center max-h-[280px]">
                            <img
                              src="https://i.imgur.com/w3v9aR7.png"
                              alt="Prior Researcher Panel"
                              className="w-full h-auto max-h-[240px] object-contain rounded-xl hover:scale-[1.01] transition-transform duration-550"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* After Column */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-amber-50 border border-amber-200/60 rounded-lg px-2.5 py-1">
                            <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">Iterative Rubrics & Feedback</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.5 rounded font-semibold">After</span>
                          </div>
                          <div className="border border-amber-200/40 rounded-2xl overflow-hidden bg-[#FFFDF9] shadow-xs p-2 flex items-center justify-center max-h-[280px]">
                            <img
                              src="https://i.imgur.com/JMaoHgD.png"
                              alt="Redesigned Researcher Panel"
                              className="w-full h-auto max-h-[240px] object-contain rounded-xl hover:scale-[1.01] transition-transform duration-550"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeFrame === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full max-w-6xl text-left">
                  <div className="lg:col-span-5 space-y-5">
                    <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                      Usability Testing & Evaluation
                    </h3>
                    
                    <p className="text-zinc-650 text-xs md:text-sm leading-relaxed font-light">
                      We conducted usability tests with two student users and two researcher users. Testing revealed that navigation and system clarity were the biggest areas for improvement. Students were confused by unlabeled icons, unclear buttons, and parts of the application process, so we added semantic icon labels, larger buttons, and a progress bar to better communicate application status. Researchers wanted clearer information when reviewing applicants and more context about where certain actions would lead, leading us to improve applicant review pages and provide additional details about submitted projects.
                    </p>
 
                    <div className="space-y-2 border-t border-zinc-150 pt-4">
                      <h4 className="text-xs font-bold font-mono text-zinc-800 uppercase tracking-wider">
                        Key Revisions Included:
                      </h4>
                      <ul className="space-y-2 text-xs text-zinc-650 font-light pl-1">
                        {[
                          "Added labels to icons and navigation elements.",
                          "Increased button visibility and improved scrolling cues.",
                          "Improved researcher application review pages.",
                          "Separated rejection decisions from detailed feedback to improve user experience."
                        ].map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2 items-start mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
 
                    <p className="text-xs text-zinc-500 font-light italic border-t border-zinc-100 pt-3">
                      These changes improved navigation, visibility of system status, accessibility, and overall user confidence when interacting with the platform.
                    </p>
                  </div>
 
                  <div className="lg:col-span-7 space-y-6 w-full">
                    {/* Digitized Screen Highlights */}
                    <div className="space-y-6">
                      
                      {/* Before / After Digital Design Components */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1">
                          <span className="text-[10px] font-mono uppercase text-zinc-650 font-bold">High-Fidelity Component Revisions</span>
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 font-mono px-1.5 py-0.5 rounded font-semibold">Detailed Comparison</span>
                        </div>
                        <div className="border border-zinc-200/80 rounded-2xl overflow-hidden bg-white shadow-xs p-2 flex items-center justify-center max-h-[350px]">
                          <img
                            src="https://i.imgur.com/I2ID9sc.png"
                            alt="Digitized Before & After Revisions"
                            className="w-full h-auto max-h-[310px] object-contain rounded-xl hover:scale-[1.01] transition-transform duration-550"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
 
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom paginator and previous/next handles within slide context */}
          <div className="flex items-center justify-between border-t border-zinc-100 pt-6 mt-8 w-full">
            <span className="text-xs font-mono text-zinc-405 font-medium">
              Active Module: <strong className="text-amber-805">Slide 0{activeFrame}</strong> / 04
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFrame(prev => prev > 1 ? prev - 1 : 4)}
                className="px-3.5 py-1.5 rounded-lg border border-zinc-250 bg-white hover:bg-zinc-50 text-xs font-mono text-zinc-705 font-medium transition-colors cursor-pointer"
              >
                Previous Step
              </button>
              <button
                onClick={() => setActiveFrame(prev => prev < 4 ? prev + 1 : 1)}
                className="px-3.5 py-1.5 rounded-lg border border-amber-250 bg-[#FFFDF5] hover:bg-amber-50 text-xs font-mono text-amber-900 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-3xs"
              >
                Next Process Slide
                <ChevronRight className="w-3.5 h-3.5 text-amber-700" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
