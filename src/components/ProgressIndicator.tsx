import React from "react";
import { User, Layers, FileText, ArrowUpRight } from "lucide-react";

interface ProgressIndicatorProps {
  stepIndex: number; // 0, 1, 2, 3
}

export default function ProgressIndicator({ stepIndex }: ProgressIndicatorProps) {
  const steps = [
    { label: "Create Profile", icon: User },
    { label: "Select Lab", icon: Layers },
    { label: "Apply to Lab", icon: FileText },
    { label: "View Decision", icon: ArrowUpRight }
  ];

  return (
    <div className="bg-white border border-gray-150 rounded-xl p-4 shadow-sm w-full">
      <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto py-2">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-100 -translate-y-1/2 z-0 rounded-full" />
        {/* Filled progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 -translate-y-1/2 transition-all duration-500 rounded-full z-0"
          style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < stepIndex;
          const isActive = idx === stepIndex;

          return (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                    : isActive
                    ? 'bg-amber-600 border-amber-500 text-white scale-110 shadow-md ring-4 ring-amber-100'
                    : 'bg-white border-zinc-200 text-zinc-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span 
                className={`text-[10px] font-mono mt-1.5 tracking-tight ${
                  isActive ? 'text-amber-800 font-bold' : isCompleted ? 'text-emerald-700 font-medium' : 'text-zinc-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
