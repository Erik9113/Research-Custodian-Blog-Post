/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, ChevronRight, ChevronLeft, Volume2, Maximize, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Slide {
  timestamp: string;
  title: string;
  speaker: string;
  subtitles: string;
  visualType: 'problem' | 'portal' | 'prereq' | 'summary';
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const pitches: Slide[] = [
    {
      timestamp: "0:00 - 0:15",
      title: "The Problem of Niche Research Access",
      speaker: "Bethel Bellete",
      subtitles: "Traditional university boards promote general computer science paths, leaving niche domains like computational neurobiology or soft robotics hidden from motivated undergrads. Our team set out to dismantle this discovery hurdle.",
      visualType: "problem"
    },
    {
      timestamp: "0:15 - 0:35",
      title: "Introducing Research Custodian Solution",
      speaker: "Dhruv Srinivasan",
      subtitles: "We built Research Custodian. Students establish focus profiles detailing specific skillsets, then they can request direct homework sandbox prompts written intentionally by lead PIs.",
      visualType: "portal"
    },
    {
      timestamp: "0:35 - 0:55",
      title: "The Prerequisite Project Workflow",
      speaker: "Praveer Jain",
      subtitles: "Instead of PIs screening resumes manually, students submit small code assets verifying their interest. Once complete, they receive detailed expert reviews regarding practical readiness.",
      visualType: "prereq"
    },
    {
      timestamp: "0:55 - 1:15",
      title: "HCI Learnings and Final Vision",
      speaker: "Nathan Yu",
      subtitles: "Through user testing, we refined standard navigation bars, horizontal progress bars, and custom applicant pipelines. Our platform is launching to save labs hundreds of onboarding hours.",
      visualType: "summary"
    }
  ];

  // Auto progression of presentation slides when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlideIndex((prevIndex) => {
              if (prevIndex >= pitches.length - 1) {
                setIsPlaying(false);
                return prevIndex;
              }
              return prevIndex + 1;
            });
            return 0;
          }
          return prev + 2; // Increments over 5 seconds
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, currentSlideIndex]);

  // Reset slide details when opening modal
  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  const handleNext = () => {
    setProgress(0);
    if (currentSlideIndex < pitches.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const activeSlide = pitches[currentSlideIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Main Modal Frame */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl bg-[#0a0c12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar control links */}
            <div className="flex justify-between items-center bg-[#07080a] border-b border-white/[0.05] p-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5 font-semibold text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-brand-neon-green animate-pulse" />
                <span>PITCH_CONCEPT_VIDEO_PRESENTATION.MOV</span>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/[0.04] text-zinc-300 hover:text-white flex items-center justify-center border border-white/[0.05] cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Video Canvas area */}
            <div className="aspect-video w-full bg-zinc-950 flex flex-col justify-between p-6 relative overflow-hidden group">
              {/* Background ambient lighting */}
              <div className="absolute inset-0 glowing-grid opacity-30 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

              {/* Speaker / Timestamp indicators */}
              <div className="flex justify-between items-center relative z-10 text-xs font-mono text-zinc-400">
                <span className="px-2.5 py-1 rounded bg-[#0d1117] border border-white/[0.05]">
                  Chapter {currentSlideIndex + 1} of {pitches.length}: {activeSlide.title}
                </span>
                <span className="font-bold text-brand-neon-cyan">{activeSlide.timestamp}</span>
              </div>

              {/* Rendering Graphics dynamically representing the state */}
              <div className="flex-1 flex flex-col items-center justify-center p-2 text-center my-4 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-md"
                  >
                    {activeSlide.visualType === 'problem' && (
                      <div className="p-5 rounded-2xl bg-red-950/10 border border-red-500/20 text-center flex flex-col items-center">
                        <span className="text-4xl mb-2">⚠️</span>
                        <h4 className="text-white font-bold text-sm">Undergraduate Research Obstructed</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">No portfolio structure. Resume pipelines are cluttered with GPA statistics instead of practical lab competency indices.</p>
                      </div>
                    )}
                    {activeSlide.visualType === 'portal' && (
                      <div className="p-5 rounded-2xl bg-cyan-950/10 border border-brand-neon-cyan/20 text-center flex flex-col items-center">
                        <span className="text-4xl mb-2">🌐</span>
                        <h4 className="text-white font-bold text-sm">Centralized Connection Hub</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Connecting students and researchers via transparent sandbox checklists, offering targeted entry gates.</p>
                      </div>
                    )}
                    {activeSlide.visualType === 'prereq' && (
                      <div className="p-5 rounded-2xl bg-emerald-950/10 border border-brand-neon-green/20 text-center flex flex-col items-center">
                        <span className="text-4xl mb-2">💻</span>
                        <h4 className="text-white font-bold text-sm">Bespoke Prerequisite Projects</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Students build small coding algorithms requested by researchers, showing dedication and mechanical familiarity.</p>
                      </div>
                    )}
                    {activeSlide.visualType === 'summary' && (
                      <div className="p-5 rounded-2xl bg-purple-950/10 border border-purple-500/20 text-center flex flex-col items-center">
                        <span className="text-4xl mb-2">🌟</span>
                        <h4 className="text-white font-bold text-sm">Streamlined Onboarding Succeeds</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Our evaluation panels increased test scores to 9.2, saving researchers weeks on introductory materials.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subtitles Overlay */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/[0.05] relative z-10 backdrop-blur-sm">
                <span className="text-[10px] font-mono font-bold text-brand-neon-green tracking-wider block mb-1">
                  SPEAKER: {activeSlide.speaker}
                </span>
                <p className="text-xs text-white leading-relaxed text-left font-light min-h-[40px]">
                  {activeSlide.subtitles}
                </p>
              </div>
            </div>

            {/* Video Controls Layout (Classic Media Player look and feel) */}
            <div className="bg-[#07080a] border-t border-white/[0.05] p-4 flex flex-col gap-3 relative z-10">
              {/* Timeline progress line */}
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative">
                <div 
                  className="h-full bg-brand-neon-cyan" 
                  style={{ width: `${((currentSlideIndex * 100) + progress) / pitches.length}%` }} 
                />
              </div>

              {/* Controls Group */}
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                {/* Left side play indicators */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded bg-white/[0.04] text-white hover:bg-white/[0.1] border border-white/[0.05] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSlideIndex(0);
                      setProgress(0);
                      setIsPlaying(true);
                    }}
                    className="p-1 rounded bg-white/[0.04] text-white hover:bg-white/[0.1] border border-[#ffffff0a] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button onClick={handlePrev} disabled={currentSlideIndex === 0} className="disabled:opacity-30">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span>Slide {currentSlideIndex + 1} / {pitches.length}</span>
                    <button onClick={handleNext} className="disabled:opacity-30">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Speaker detail and general volume mock */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    <div className="w-12 h-1 bg-zinc-700 rounded-full relative">
                      <div className="absolute top-0 left-0 w-4/5 h-full bg-white rounded-full" />
                    </div>
                  </div>
                  <Maximize className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
