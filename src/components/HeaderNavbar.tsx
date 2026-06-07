/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Layers, GitPullRequest, HelpCircle, Laptop, Play, ChevronRight, Menu, X } from 'lucide-react';

interface HeaderNavbarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenVideoModal: () => void;
}

export default function HeaderNavbar({ onScrollToSection, onOpenVideoModal }: HeaderNavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll progression & section visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(currentProgress);

      const sections = ['hero', 'problem', 'solution', 'concept-video', 'design-process', 'features'];
      let currentSection = 'hero';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'problem', label: 'The Problem' },
    { id: 'solution', label: 'Our Solution' },
    { id: 'concept-video', label: 'Concept Video' },
    { id: 'design-process', label: 'Design Process' },
    { id: 'features', label: 'Interactive Lab' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FCFBF9]/90 backdrop-blur-md border-b border-amber-200/40 h-16 flex flex-col justify-between transition-all">
      <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto w-full">
        
        {/* Left Side: Brand Identity block */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex items-center gap-2.5 cursor-pointer group transition-all"
        >
          {/* 
            ========================================================================
            [INSERT_LOGO_HERE - HEADER NAVIGATION]
            ------------------------------------------------------------------------
            This is the far-left image/logo slot in the navigation bar.
            Currently styled as a clean representation of a placeholder.
            Replace this entire div container with your own custom logo, SVG, or <img> tag.
            ========================================================================
          */}
          <div 
            id="INSERT_LOGO_HERE_NAV" 
            className="w-10 h-10 rounded-full border border-amber-200 bg-white shadow-3xs flex items-center justify-center shrink-0 overflow-hidden relative"
            title="Research Custodian Nav Logo"
          >
            <img 
              src="/HeaderNavLogo.webp" 
              alt="Research Custodian Badge" 
              className="max-h-9 max-w-[90%] object-contain px-0.5"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-zinc-900 font-sans text-sm font-bold tracking-wide group-hover:text-amber-700 transition-colors leading-none">
              Research
            </span>
            <span className="text-amber-700 font-sans text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 leading-none">
              Custodian
            </span>
          </div>
        </div>

        {/* Center: Standard Navigation Menu Links for Desktop */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-100/80 border border-zinc-200/50 p-1 rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onScrollToSection(item.id)}
                className={`text-xs px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-center select-none font-medium ${
                  isActive
                    ? 'bg-white text-amber-900 border border-amber-100 shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50/60 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Side: Digital Mockup Link */}
        <div className="hidden md:flex items-center gap-3 mb-1">
          {/* Digital mockup link */}
          <a
            href="https://custodian-research.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            id="header-digital-mockup-link"
            className="px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-950 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:scale-[1.01]"
          >
            <Laptop className="w-3.5 h-3.5 text-amber-900 animate-pulse-subtle" />
            Digital Mockup
          </a>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-zinc-600 hover:text-zinc-900 flex items-center justify-center w-8 h-8 rounded-lg hover:bg-zinc-100"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide down mobile navigatior menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FCFBF9] border-b border-amber-200/40 flex flex-col px-6 py-4 gap-3 overflow-hidden absolute top-16 left-0 right-0 w-full"
          >
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-2">Section Index</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-amber-50 text-amber-950 font-semibold border-l-2 border-amber-500 pl-2'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            ))}

            <div className="border-t border-zinc-200 pt-3 mt-1 flex flex-col gap-2.5">
              <a
                href="https://custodian-research.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
              >
                <Laptop className="w-3.5 h-3.5" />
                Visit Digital Mockup
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1px Fine reading scroll completion progress tracker bar along the bottom of the HeaderNavbar */}
      <div className="w-full h-[1px] bg-amber-200/20 relative">
        <motion.div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}
