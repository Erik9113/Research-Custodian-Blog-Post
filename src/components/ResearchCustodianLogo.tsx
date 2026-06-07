/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ResearchCustodianLogo({ className = '', size = 'md' }: LogoProps) {
  // Determine sizing values
  const dims = {
    sm: { height: 'min-h-[100px] py-2 px-4', width: 'w-72' },
    md: { height: 'min-h-[250px] py-3 px-4', width: 'w-[500px]' },
    lg: { height: 'min-h-[320px] py-4 px-6', width: 'w-[680px]' }
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      
      <div 
        id="INSERT-LOGO-HERE-MAIN" 
        className={`${dims.width} ${dims.height} max-w-full rounded-2xl border border-amber-200/70 bg-white/95 shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-amber-50/20 via-transparent to-emerald-50/10 opacity-60 pointer-events-none" />
        
        {/* Main Logo Image details */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-1">
          <img 
            src="/Dark Logo.webp" 
            alt="Research Custodian Logo" 
            className="max-h-[235px] sm:max-h-[240px] md:max-h-[245px] w-auto max-w-[98%] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />

        </div>

      </div>
    </div>
  );
}
