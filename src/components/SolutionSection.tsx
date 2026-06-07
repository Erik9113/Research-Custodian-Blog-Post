/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2, Award, Zap, Code2, Users, Network, Shuffle, Compass } from 'lucide-react';

export default function SolutionSection() {
  const values = [
    {
      icon: <Network className="w-5 h-5 text-brand-neon-cyan" />,
      title: "Connect Niche Students",
      desc: "Establishes a direct bridge between motivated students and highly specialized labs that remain hidden in generic search sites.",
      color: "border-cyan-500/20"
    },
    {
      icon: <Code2 className="w-5 h-5 text-brand-neon-green" />,
      title: "Prerequisite Portfolios",
      desc: "Students learn essential lab frameworks by finishing a practice research project with the general topic provided by the PI, demonstrating practical skill over paper marks.",
      color: "border-emerald-500/20"
    },
    {
      icon: <Award className="w-5 h-5 text-blue-400" />,
      title: "Identify Motivation",
      desc: "Researchers secure self-motivated, self-screened student research assistants who need minimal hand-holding once admitted.",
      color: "border-blue-500/20"
    }
  ];

  const steps = [
    {
      no: "01",
      icon: <Compass className="w-4 h-4 text-brand-neon-cyan" />,
      title: "Select Niche Lab",
      desc: "Student explores labs by specific concepts (e.g., Computational Vision, Neural Speech Synthesis)."
    },
    {
      no: "02",
      icon: <Code2 className="w-4 h-4 text-brand-neon-green" />,
      title: "Build Prerequisite Project",
      desc: "Student downloads a hands-on prerequisite challenge designed entirely by that lab."
    },
    {
      no: "03",
      icon: <Zap className="w-4 h-4 text-blue-400" />,
      title: "Submit & Peer Feedback",
      desc: "Student submits their results and receives a fast review milestone with researchers or senior line experts."
    }
  ];

  return (
    <section id="solution" className="relative py-28 px-6 border-t border-amber-200/30 bg-[#FCFBF9] overflow-hidden">
      {/* Background glow lines using CSS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-gradient-to-b from-amber-200/10 via-transparent to-amber-200/5" />
        <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-gradient-to-b from-amber-200/10 via-transparent to-amber-200/5" />
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-gradient-to-b from-amber-200/10 via-transparent to-amber-200/5" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none mb-6">
              Enter Research Custodian.
            </h2>
            <p className="text-zinc-600 text-base md:text-lg font-light leading-relaxed text-pretty">
              A dynamic, hands-on web service connecting students and research labs. 
              We replace cold emailing with hands-on, credentialed portfolio steps. 
              Instead of guessing requirements, students construct actual lab-validated prerequisite materials.
            </p>
          </div>
          
          <div className="lg:col-span-5 p-6 rounded-3xl bg-amber-50/50 border border-amber-200/50 backdrop-blur relative overflow-hidden flex flex-col justify-center shadow-2xs">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-[60px] pointer-events-none" />
            <h3 className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider mb-3">For Students vs researchers</h3>
            <ul className="space-y-3.5 text-xs text-zinc-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>For Students:</strong> Makes niche technology spaces entirely navigible with clear rules and sequential tasks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>For Researchers:</strong> Systematically filters for highly self-motivated undergraduate assistants.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3-Card Value Proposition Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8, borderColor: 'rgba(180, 83, 9, 0.4)' }}
              className={`p-6 rounded-3xl bg-white border ${v.color} hover:bg-amber-50/10 hover:shadow-xs transition-all relative overflow-hidden`}
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.1] bg-amber-500/10 rounded-bl-3xl pointer-events-none" />
              
              <div className="p-3 rounded-xl bg-amber-50 w-max border border-amber-200/40 mb-5">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">{v.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Road Map Grid (Handshake Flow) */}
        <div className="p-8 rounded-3xl glow-cyan glowing-glass relative overflow-hidden border border-amber-200/55 shadow-xs">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent pointer-events-none hidden md:block" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="shrink-0 max-w-[200px] text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">The Core Flow</h3>
              <p className="text-xl font-extrabold text-zinc-900 mt-1 leading-tight">Student-to-Lab Pathway</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 flex-1 justify-around w-full">
              {steps.map((s, idx) => (
                <div key={idx} className="flex-1 p-5 rounded-2xl bg-white border border-amber-200/40 relative hover:border-amber-400 transition-colors shadow-2xs">
                  <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-[9px] font-mono text-amber-900 font-bold">
                    STEP {s.no}
                  </div>
                  <div className="flex items-center gap-2 mb-2.5 mt-1 text-amber-800 font-bold text-sm">
                    {s.icon}
                    <span>{s.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
