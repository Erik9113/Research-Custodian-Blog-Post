import React from "react";
import { ArrowLeft, ChevronRight, FileText, Check } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";

interface SelectLabViewProps {
  labs: any[];
  selectedLabId: string | null;
  onSelectLab: (labId: string) => void;
  onContinue: () => void;
  onBackToDashboard: () => void;
}

export default function SelectLabView({
  labs,
  selectedLabId,
  onSelectLab,
  onContinue,
  onBackToDashboard
}: SelectLabViewProps) {
  const selectedLab = labs.find(l => l.id === selectedLabId) || labs[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Return Navigation Shortcut */}
      <button 
        onClick={onBackToDashboard}
        className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer bg-transparent border-none p-0"
        id="select-lab-back-to-dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Lab Directory List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest">Centers Directory</h4>
              <p className="text-sm font-semibold text-zinc-900 mt-0.5">Select a Research Center</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">{labs.length}</span>
          </div>

          <div className="space-y-3">
            {labs.map((l) => (
              <button
                key={l.id}
                onClick={() => onSelectLab(l.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 group cursor-pointer ${
                  selectedLabId === l.id
                    ? 'bg-white border-amber-300 shadow-sm ring-1 ring-amber-100'
                    : 'bg-gray-50/50 border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <span className="text-xl shrink-0 self-center">
                  {l.id === 'neuro' ? '🧠' : l.id === 'robo' ? '🤖' : '⚛️'}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      l.difficulty === 'Expert' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {l.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{l.matchingPercent}% match</span>
                  </div>
                  <h3 className="text-zinc-900 font-bold text-xs mt-1.5 truncate group-hover:text-amber-800 transition-colors">
                    {l.name}
                  </h3>
                  <p className="text-[10px] text-gray-550 truncate mt-0.5 font-medium">{l.field}</p>
                </div>

                <ChevronRight className={`w-4 h-4 text-gray-450 shrink-0 self-center transition-transform ${
                  selectedLabId === l.id ? 'translate-x-1 text-amber-605' : 'group-hover:translate-x-0.5'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Lab Detail and Active Prompts */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">{selectedLab.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">PI: {selectedLab.pi} • {selectedLab.field}</p>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">{selectedLab.description}</p>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest block mb-3">Available Lab Prompts</span>
                <div className="space-y-3">
                  {selectedLab.prompts.map((p: any) => (
                    <div key={p.id} className="p-4 rounded-xl bg-amber-50/25 border border-amber-100">
                      <h4 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-amber-805" />
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-zinc-650 mt-1.5 leading-relaxed">{p.desc}</p>
                      
                      <div className="mt-3">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block font-semibold">Required deliverables</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {p.deliverables.map((del: string, dIdx: number) => (
                            <span key={dIdx} className="text-[9px] font-mono text-zinc-600 bg-zinc-55 border border-zinc-200 px-2 py-0.5 rounded leading-none">{del}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 mt-6 animate-pulse">
              <button
                onClick={onContinue}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm transition hover:scale-[1.02] flex items-center gap-1 cursor-pointer"
              >
                <span>Select this Lab & Apply</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProgressIndicator stepIndex={1} />
    </div>
  );
}
