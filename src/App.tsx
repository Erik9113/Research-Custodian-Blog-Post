/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ConceptVideoSection from './components/ConceptVideoSection';
import DashboardMockup from './components/DashboardMockup';
import DesignProcessTimeline from './components/DesignProcessTimeline';
import { TeamMember } from './types';
import { GraduationCap, Heart, HelpCircle, Code2 } from 'lucide-react';

export default function App() {
  // Helper smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Factual detailed team profiles mapped directly from class poster details
  const teamMembers: TeamMember[] = [
    {
      id: 'bethel',
      name: 'Bethel Bellete',
      role: '',
      avatarText: 'BB',
      contributions: [
        'Formulated research guidelines & focus groups with 5 students',
        'Conducted qualitative interviews with 2 leading researchers',
        'Discovered that niche studies require exposure via prerequisites'
      ]
    },
    {
      id: 'praveer',
      name: 'Praveer Jain',
      role: '',
      avatarText: 'PJ',
      contributions: [
        'Mapped database schemas for student and lab matching modules',
        'Engineered standard API routing for project deliverable validation',
        'Implemented the initial draft code repository boilerplates'
      ]
    },
    {
      id: 'eric',
      name: 'Eric Li',
      role: '',
      avatarText: 'EL',
      contributions: [
        'Created interactive digital wireframes in paper & Figma',
        'Assembled modern black styled layout prototypes',
        'Polished components using Tailwind CSS utility states'
      ]
    },
    {
      id: 'dhruv',
      name: 'Dhruv Srinivasan',
      role: '',
      avatarText: 'DS',
      contributions: [
        'Drafted storyboard matrices outlining student user task loops',
        'Structured value propositions for student and researcher roles',
        'Coordinated product presentation flow charts'
      ]
    },
    {
      id: 'nathan',
      name: 'Nathan Yu',
      role: '',
      avatarText: 'NY',
      contributions: [
        'Headed critiques on paper prototypes and digital mockups',
        'Incorporated semantic labels to icons, improving site speed ratios',
        'Integrated a continuous horizontal completion tracking progress bar'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-zinc-700 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 relative overflow-x-hidden">
      
      {/* Standard modern sticky-glass navigation header */}
      <HeaderNavbar 
        onScrollToSection={handleScrollToSection} 
        onOpenVideoModal={() => handleScrollToSection('concept-video')} 
      />

      {/* Primary Scroll Content Blocks */}
      <main className="flex-1">
        
        {/* Intro Hero Gate */}
        <HeroSection 
          teamMembers={teamMembers} 
          onScrollToSection={handleScrollToSection}
          onOpenVideoModal={() => handleScrollToSection('concept-video')}
        />

        {/* Phase 01: Identification & Hardships */}
        <ProblemSection />

        {/* Phase 02: Proposed Solution Architecture */}
        <SolutionSection />

        {/* Real YouTube Embedded Concept Video walkthrough */}
        <ConceptVideoSection />

        {/* Phase 02: Prototyping and Testing Milestones */}
        <DesignProcessTimeline />

        {/* Phase 03: Live Functional Demonstrations (Sandboxed Dashboards) */}
        <DashboardMockup />

      </main>

      {/* Aesthetic Footer block */}
      <footer className="border-t border-amber-200/40 bg-zinc-50 py-12 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-xs text-amber-800">
              RC
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 tracking-wide uppercase">Research Custodian</p>
              <p className="text-[10px] text-zinc-500 font-mono">Connecting Students to Niche Technology Opportunities</p>
            </div>
          </div>


        </div>
      </footer>
    </div>
  );
}
