/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Users, GraduationCap, ArrowRight, Play, Server, Heart } from 'lucide-react';
import { TeamMember } from '../types';
import ResearchCustodianLogo from './ResearchCustodianLogo';

interface HeroSectionProps {
  teamMembers: TeamMember[];
  onScrollToSection: (sectionId: string) => void;
  onOpenVideoModal: () => void;
}

export default function HeroSection({ teamMembers, onScrollToSection, onOpenVideoModal }: HeroSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 18 }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center py-24 px-6 overflow-hidden">
      {/* Background glowing gradients & grid */}
      <div className="absolute inset-0 glowing-grid opacity-80 z-0" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />
      

      {/* Hero content wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center z-10 flex flex-col items-center"
      >
        {/* Floating Accent Capsule */}
        <motion.div
          variants={itemVariants}
          className="mb-8 px-4 py-1.5 rounded-full glowing-glass border border-amber-500/10 flex items-center gap-2 text-xs"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-mono text-zinc-600 uppercase tracking-widest text-[9px] font-bold">Human-Computer Interaction Showcase</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        </motion.div>

        {/* Exact Logo replaces the Slogan Headline */}
        <motion.div
          variants={itemVariants}
          className="mb-10 w-full flex justify-center scale-90 sm:scale-100"
        >
          <ResearchCustodianLogo size="md" />
        </motion.div>

        {/* Subtitle describing the class project */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl text-zinc-600 max-w-2xl font-light leading-relaxed mb-10 text-pretty"
        >
          Introducing <strong className="text-zinc-900 font-extrabold">Research Custodian</strong> — a polished web platform bridging undergraduates and elite specialized labs through guided portfolio mini-projects and researcher feedback loops.
        </motion.p>

        {/* Action Button cluster */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-20 z-20"
        >
          <button
            onClick={() => onScrollToSection('solution')}
            className="group px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm transition-all duration-300 shadow-sm shadow-amber-500/10 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Solution
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenVideoModal}
            className="px-7 py-3 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 font-medium text-sm transition-all duration-200 border border-zinc-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-zinc-800 text-zinc-800" />
            Watch Concept Video
          </button>
        </motion.div>

        {/* Interactive Team Roll */}
        <motion.div
          variants={itemVariants}
          className="w-full border-t border-zinc-200 pt-8"
        >
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-6 flex items-center justify-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-700" /> Team Members & Roles
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-3 bg-white border border-zinc-200/60 rounded-2xl flex flex-col items-center text-center group transition-all shadow-2xs"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 flex items-center justify-center text-xs font-mono font-bold text-amber-900 mb-2.5 transition-all group-hover:border-amber-400 group-hover:bg-amber-100">
                  {member.avatarText}
                </div>
                <h4 className="text-xs font-semibold text-zinc-800 group-hover:text-amber-800 transition-colors">{member.name}</h4>
                <p className="text-[9px] text-zinc-400 font-mono mt-0.5 line-clamp-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-6 cursor-pointer flex flex-col items-center gap-1 z-10"
        onClick={() => onScrollToSection('problem')}
      >
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Scroll To Learn</span>
        <ArrowDown className="w-4 h-4 text-brand-neon-cyan" />
      </motion.div>
    </section>
  );
}
