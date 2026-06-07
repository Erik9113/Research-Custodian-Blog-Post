/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, CheckCircle2, FileText, Send, Layers, 
  Settings, ChevronRight, Download, UploadCloud, 
  MessageSquare, BrainCircuit, Cpu, Zap, 
  Check, X, Sparkles, FolderSync, Plus, ArrowLeft,
  Laptop, ExternalLink
} from 'lucide-react';
import { StudentProfile, ProjectApplication, AppState, Lab, LabPrompt } from '../types';
import StudentDashboardView from './StudentDashboardView';
import CreateProfileView from './CreateProfileView';
import SelectLabView from './SelectLabView';
import ApplyLabView from './ApplyLabView';
import DecisionView from './DecisionView';
import LabProfileView from './LabProfileView';
import EditPromptsView from './EditPromptsView';
import ProvideFeedbackView from './ProvideFeedbackView';

interface Applicant {
  id: string;
  name: string;
  score: string;
  labName: string;
  status: 'Pending' | 'Accepted' | 'Onboarded' | 'Denied';
  projectName: string;
  resumeUrl: string;
}

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<'student' | 'researcher'>('student');
  
  // New Mockup Slide/Page indices
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0); // 0 = Dashboard, 1 = Create Profile, 2 = Select Lab, 3 = Apply to Lab, 4 = View Decision
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>({
    name: "Bob",
    degreeMajor: "Computer Science",
    researchInterests: "Machine learning, adaptive software, music analytics"
  });
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Create Profile, 1 = Select Lab, 2 = Apply to Lab, 3 = View Decision
  const [submittedApplication, setSubmittedApplication] = useState<ProjectApplication | null>(null);

  // Student State (for keeping selection context)
  const [selectedLabId, setSelectedLabId] = useState<string>('neuro');
  const [selectedPromptId, setSelectedPromptId] = useState<string>('neuro-1');

  // Researcher Customizer Navigation State
  const [researcherPage, setResearcherPage] = useState<'pipeline' | 'profile' | 'prompts' | 'feedback'>('pipeline');
  const [selectedResearcherLabId, setSelectedResearcherLabId] = useState<string>('neuro');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  // Researcher State
  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: '1', name: 'John Doe', score: '94%', labName: 'Gong Computational Neuro Lab', status: 'Pending', projectName: 'Hodgkin_Huxley_V4.zip', resumeUrl: 'resume_john.pdf' },
    { id: '2', name: 'Jane Doe', score: '88%', labName: 'Gong Computational Neuro Lab', status: 'Accepted', projectName: 'HH_neuron_model.py', resumeUrl: 'resume_jane.pdf' },
    { id: '3', name: 'Bob Johnson', score: '91%', labName: 'Quantum Computing Group', status: 'Onboarded', projectName: 'superconducting_qubit_v1.m', resumeUrl: 'resume_bob.pdf' },
    { id: '4', name: 'Bob Smith', score: '79%', labName: 'Bio-inspired Robotics Lab', status: 'Denied', projectName: 'actuator_friction_test.py', resumeUrl: 'resume_bob_smith.pdf' }
  ]);
  const [researcherPrompt, setResearcherPrompt] = useState<string>(
    'Implement a single-compartment model of an action potential using Hodgkin-Huxley equations. Define stimulus current inputs and plot voltage spikes.'
  );
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState<boolean>(false);
  const [promptMessage, setPromptMessage] = useState<string>('');

  const [labs, setLabs] = useState<Lab[]>([
    {
      id: 'neuro',
      name: 'Gong Computational Neuro Lab',
      field: 'Integrated Neuroscience',
      pi: 'Dr. Gong',
      matchingPercent: 94,
      difficulty: 'Expert',
      description: 'Our lab focuses on numerical solvers for neural dynamics, spike pattern classification, and biophysically realistic simulations.',
      icon: <BrainCircuit className="w-5 h-5 text-amber-800" />,
      prompts: [
        {
          id: 'neuro-1',
          text: 'Euler Spike Integration: Formulate an action potential using basic Hodgkin-Huxley membrane solvers. Define input current curves and map resulting spike frequency coordinates.',
          title: 'Euler Spike Integration',
          desc: 'Formulate an action potential using basic Hodgkin-Huxley membrane solvers. Define input current curves and map resulting spike frequency coordinates.',
          deliverables: ['Simulation Script (.py)', 'Report Abstract (PDF)', 'Voltage Plot Image']
        }
      ]
    },
    {
      id: 'robo',
      name: 'Bio-inspired Robotics Lab',
      field: 'Biomimicking Systems',
      pi: 'Dr. John/Jane Does',
      matchingPercent: 86,
      difficulty: 'Intermediate',
      description: 'Translating biological kinematics to mechanical structures. This term we are modeling friction indices on custom elastomer actuators.',
      icon: <Cpu className="w-5 h-5 text-amber-800" />,
      prompts: [
        {
          id: 'robo-1',
          text: 'Elastomer Friction Coefficient Solver: Simulate kinetic friction rates under standard pressure increments for biomimicking composite materials.',
          title: 'Elastomer Friction Coefficient Solver',
          desc: 'Simulate kinetic friction rates under standard pressure increments for biomimicking composite materials.',
          deliverables: ['Calculations Script (.py)', 'Actuator Specs Form']
        }
      ]
    },
    {
      id: 'quantum',
      name: 'Jain Quantum Computing Group',
      field: 'Quantum Algorithms & Materials',
      pi: 'Dr. Bob Johnson',
      matchingPercent: 78,
      difficulty: 'Expert',
      description: 'Designing superconducting qubits, error correction schemes, and quantum compiler optimizations.',
      icon: <Zap className="w-5 h-5 text-amber-800" />,
      prompts: [
        {
          id: 'quantum-1',
          text: 'Qubit Coherence Estimator: Model decoherence coefficients given specific thermal levels inside cryogenic dilution chambers.',
          title: 'Qubit Coherence Estimator',
          desc: 'Model decoherence coefficients given specific thermal levels inside cryogenic dilution chambers.',
          deliverables: ['Algorithms Simulator (.m/.py)', ' cryogenic_specs.json']
        }
      ]
    }
  ]);

  const currentLab = labs.find(l => l.id === selectedLabId) || labs[0];
  const currentPrompt = currentLab.prompts[0];

  const activeResearcherLab = labs.find(l => l.id === selectedResearcherLabId) || labs[0];

  // Map clicked Applicant model safely into the unified ProjectApplication interface format
  const getFeedbackApp = (): ProjectApplication => {
    if (selectedApplicant) {
      return {
        id: selectedApplicant.id,
        labName: selectedApplicant.labName,
        studentName: selectedApplicant.name,
        promptTopic: researcherPrompt || 'Project Challenge Task',
        groupContactInfo: `${selectedApplicant.name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
        description: `Model simulation of laboratory dynamics. Running custom tests and graphing voltage response profiles against configured stimulus parameters.`,
        projectFileName: selectedApplicant.projectName || 'Prereq_Submission_Output.py',
        resumeFileName: selectedApplicant.resumeUrl || 'Academic_Curriculum_Vitae.pdf',
        coverLetterFileName: 'Admissions_Cover_Letter.pdf',
        status: selectedApplicant.status === 'Pending' ? 'Pending' : selectedApplicant.status === 'Denied' ? 'Denied' : 'Accepted',
        feedback: (selectedApplicant as any).feedbackDraft || ''
      };
    }
    return {
      id: 'dummy',
      labName: labs[0].name,
      studentName: 'Anonymous Candidate',
      promptTopic: 'Action potential model solvers',
      groupContactInfo: 'candidate@university.edu',
      description: 'Model simulation of membrane current traces using standard adaptive neural integrations.',
      projectFileName: 'Model_Simulation_Draft.pdf',
      resumeFileName: 'Student_Academic_CV.pdf',
      coverLetterFileName: 'Academic_Cover_Letter.pdf',
      status: 'Not Yet Reviewed'
    };
  };

  const handleOpenFeedback = (app: Applicant) => {
    setSelectedApplicant(app);
    setResearcherPage('feedback');
  };

  // Change Applicant status on researcher pipeline
  const changeStatus = (id: string, newStatus: 'Pending' | 'Accepted' | 'Onboarded' | 'Denied') => {
    setApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    
    // Auto-sync decision status with our active student application in mock screen 4
    if (id === 'bob-app' || id === 'bob-you' || id === 'bob-you-app') {
      setSubmittedApplication(prev => {
        if (!prev) return null;
        let feedback = prev.feedback;
        if (newStatus === "Accepted") {
          feedback = "Your project matches our lab’s goals perfectly! We can't wait to begin collaborating.";
        } else if (newStatus === "Denied") {
          feedback = "Sorry, this isn't quite what we're looking for right now.";
        }
        return {
          ...prev,
          status: newStatus === 'Pending' ? 'Not Yet Reviewed' : newStatus,
          feedback
        };
      });
    }
  };

  // Map of premium topic presets for each lab
  const LAB_TOPIC_PRESETS: Record<string, Array<{ title: string; text: string }>> = {
    neuro: [
      {
        title: 'Euler Spike Integration',
        text: 'Euler Spike Integration: Formulate an action potential using basic Hodgkin-Huxley membrane solvers. Define input current curves and map resulting spike frequency coordinates.'
      },
      {
        title: 'Hebbian Synaptic Plasticity',
        text: 'Synaptic Plasticity Hebbian ODE: Model long-term potentiation (LTP) and depression (LTD) dynamics using coupled differential equations of calcium flux.'
      },
      {
        title: 'Dendritic Attenuation RC Solver',
        text: 'Dendritic Cable Solvers: Implement passive RC cable model equations over a branching dendritic tree. Report dendritic voltage signal attenuation profiles over distance.'
      }
    ],
    robo: [
      {
        title: 'Elastomer Friction Solver',
        text: 'Elastomer Friction Coefficient Solver: Simulate kinetic friction rates under standard pressure increments for biomimicking composite materials.'
      },
      {
        title: '3D Soft Actuator Mesh Solver',
        text: 'Soft Actuator Mesh: Formulate 3D physical deformation mesh solvers of soft fluidic actuators using finite-element integrations. Python scripts detailing force-to-deflection angles under 5 atmospheres.'
      },
      {
        title: 'Biomimetic Leg Kinematics',
        text: 'Leg Kinematics: Simulate joint angles and torque limits for a quadruped biomimetic crawler over uneven terrain profiles.'
      }
    ],
    quantum: [
      {
        title: 'Qubit Coherence Estimator',
        text: 'Qubit Coherence Estimator: Model decoherence coefficients given specific thermal levels inside cryogenic dilution chambers.'
      },
      {
        title: 'Jaynes-Cummings Superconductor',
        text: 'Qubit Cavity Coupling: Solve Jaynes-Cummings Hamiltonian resonance frequencies between a superconducting transmon qubit and a microwave resonator.'
      },
      {
        title: 'Randomized Benchmarking Estimator',
        text: 'Gate Fidelity Benchmarking: Write a compiler simulation estimating average single-qubit Clifford gate errors under randomized pulse sequence operations.'
      }
    ]
  };

  // Switch research prompts to pre-compiled topic presets
  const handleAIPromptGenerate = () => {
    const list = LAB_TOPIC_PRESETS[selectedResearcherLabId] || LAB_TOPIC_PRESETS['neuro'];
    const currentIndex = list.findIndex(p => p.text === researcherPrompt);
    const nextIndex = (currentIndex + 1) % list.length;
    const selectedPreset = list[nextIndex];
    
    setResearcherPrompt(selectedPreset.text);
    setPromptMessage(`Topic Preset Loaded: "${selectedPreset.title}"`);
  };

  return (
    <section id="features" className="relative py-28 px-6 border-t border-amber-200/30 bg-[#FAECE1] overflow-hidden">
      <div className="absolute inset-0 glowing-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title elements */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Key Functionality Interactive Lab
          </h2>
          
          <div className="mt-6 p-4 sm:p-5 bg-white/70 border border-amber-200/80 rounded-2xl max-w-2xl shadow-sm text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="grow">
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed">
                  This <strong className="text-amber-900 font-bold">Interactive Lab</strong> acts as a preview of the key functions of our comprehensive digital platform. To explore the complete production application, please visit our separate digital mockup web app at{' '}
                  <a 
                    href="https://custodian-research.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-amber-800 font-extrabold underline hover:text-amber-900 inline-flex items-center gap-0.5"
                    id="section-digital-mockup-inline-link"
                  >
                    custodian-research.vercel.app <ExternalLink className="w-3.5 h-3.5" />
                  </a>.
                </p>
              </div>
              <a
                href="https://custodian-research.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                id="section-digital-mockup-button-link"
                className="shrink-0 w-full sm:w-auto px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-all cursor-pointer border border-amber-800"
              >
                <Laptop className="w-4 h-4" />
                Visit Digital Mockup
              </a>
            </div>
          </div>

          <p className="text-zinc-650 mt-6 text-xs sm:text-sm max-w-xl text-pretty font-medium font-sans leading-relaxed">
            Experience both sides of Research Custodian below. Use the tabs to swap views instantly.
          </p>

          {/* Interactive Switch Toggle */}
          <div className="mt-8 p-1.5 rounded-full bg-white border border-amber-200/65 w-max flex items-center gap-1.5 shadow-xs">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-amber-600 text-white shadow-xs font-extrabold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Student Explorer
            </button>
            <button
              onClick={() => setActiveTab('researcher')}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'researcher'
                  ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Researcher Dashboard
            </button>
          </div>
        </div>

        {/* Dynamic Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'student' ? (
            /* STUDENT VIEW SYSTEM - MODULAR MULTI-PAGE DESK */
            <motion.div
              key="student-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 w-full"
            >
              {/* Dynamic Sub-Step Rendering */}
              <div>
                {currentPageIndex === 0 && (
                  <StudentDashboardView
                    appState={{
                      currentStep,
                      studentProfile,
                      selectedLabId,
                      submittedApplicationId: submittedApplication?.id || null
                    }}
                    onNavigateToStep={(stepIndex) => {
                      setCurrentPageIndex(stepIndex + 1);
                    }}
                  />
                )}

                {currentPageIndex === 1 && (
                  <CreateProfileView
                    initialProfile={studentProfile}
                    defaultEmailName="Bob"
                    onSave={(profile) => {
                      setStudentProfile(profile);
                      if (currentStep === 0) setCurrentStep(1);
                      setCurrentPageIndex(0);
                    }}
                    onBackToDashboard={() => setCurrentPageIndex(0)}
                  />
                )}

                {currentPageIndex === 2 && (
                  <SelectLabView
                    labs={labs}
                    selectedLabId={selectedLabId}
                    onSelectLab={(labId) => {
                      setSelectedLabId(labId);
                      if (currentStep === 1) setCurrentStep(2);
                    }}
                    onContinue={() => setCurrentPageIndex(3)}
                    onBackToDashboard={() => setCurrentPageIndex(0)}
                  />
                )}

                {currentPageIndex === 3 && (
                  <ApplyLabView
                    labName={currentLab.name}
                    selectedPromptText={currentPrompt.title}
                    isPartner={false}
                    studentName={studentProfile?.name || "Bob"}
                    studentEmail={`${(studentProfile?.name || "Bob").toLowerCase().replace(/\s+/g, ".")}@university.edu`}
                    onBack={() => setCurrentPageIndex(2)}
                    onSubmit={(data) => {
                      const newApp: ProjectApplication = {
                        id: 'APP-' + Math.floor(1000 + Math.random() * 9000),
                        labName: currentLab.name,
                        promptTopic: data.promptTopic,
                        groupContactInfo: data.groupContactInfo,
                        description: data.description,
                        projectFileName: data.projectFileName,
                        resumeFileName: data.resumeFileName,
                        coverLetterFileName: data.coverLetterFileName,
                        status: 'Not Yet Reviewed',
                        feedback: 'Your proposal is queued for Dr. Gong’s laboratory review panel.'
                      };
                      setSubmittedApplication(newApp);
                      setCurrentStep(3);
                      setCurrentPageIndex(4); // Immediately show decision

                      // Add to the real researcher panel list for multi-system fidelity!
                      const newResearcherApplicant: Applicant = {
                        id: 'bob-app',
                        name: `${studentProfile?.name || "Bob"} (You)`,
                        score: '96%',
                        labName: currentLab.name,
                        status: 'Pending',
                        projectName: data.projectFileName,
                        resumeUrl: data.resumeFileName
                      };
                      setApplicants(prev => [newResearcherApplicant, ...prev]);
                    }}
                  />
                )}

                {currentPageIndex === 4 && (
                  <DecisionView
                    application={submittedApplication || (studentProfile ? {
                      id: 'APP-9912',
                      labName: currentLab.name,
                      promptTopic: currentPrompt.title,
                      groupContactInfo: `${(studentProfile?.name || "Bob").toLowerCase().replace(/\s+/g, ".")}@university.edu`,
                      description: 'Model simulation of membrane current traces using standard adaptive differential integrations.',
                      projectFileName: 'Project_Proposal_Draft.pdf',
                      resumeFileName: 'Student_Academic_CV.pdf',
                      coverLetterFileName: 'Academic_Cover_Letter.pdf',
                      status: 'Not Yet Reviewed',
                      feedback: 'Your application is currently being evaluated by our research coordinator.'
                    } : null)}
                    onBackToDashboard={() => setCurrentPageIndex(0)}
                    onSimulateReview={(statusValue, feedbackText) => {
                      setSubmittedApplication(prev => {
                        if (!prev) {
                          return {
                            id: 'APP-9912',
                            labName: currentLab.name,
                            promptTopic: currentPrompt.title,
                            groupContactInfo: `${(studentProfile?.name || "Bob").toLowerCase().replace(/\s+/g, ".")}@university.edu`,
                            description: 'Model simulation of membrane current traces using standard adaptive integrations.',
                            projectFileName: 'Project_Proposal_Draft.pdf',
                            resumeFileName: 'Student_Academic_CV.pdf',
                            coverLetterFileName: 'Academic_Cover_Letter.pdf',
                            status: statusValue,
                            feedback: feedbackText
                          };
                        }
                        return {
                          ...prev,
                          status: statusValue,
                          feedback: feedbackText
                        };
                      });

                      // Keep researcher applicants table synced in case they look there
                      setApplicants(prev => prev.map(a => {
                        if (a.id === 'bob-app' || a.name.includes('You') || a.name.includes(studentProfile?.name || 'Bob')) {
                          return {
                            ...a,
                            status: statusValue
                          };
                        }
                        return a;
                      }));
                    }}
                  />
                )}
              </div>
            </motion.div>
          ) : (
            /* RESEARCHER PANEL VIEW */
            <AnimatePresence mode="wait">
              {researcherPage === 'pipeline' && (
                <motion.div
                  key="researcher-pipeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full"
                >
                  
                  {/* Columns index (Applicants review) (Col 1-8) */}
                  <div className="lg:col-span-8 flex flex-col gap-5">
                    <div className="p-5 rounded-2xl bg-white border border-amber-200/50 shadow-2xs">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono">Applicant Evaluation Pipeline</h3>
                          <p className="text-zinc-500 text-[11px] mt-0.5 font-medium">Manage pipeline of student profiles and prerequisite code results.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setResearcherPage('profile')}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer border-none font-semibold shadow-xs"
                            id="btn-nav-lab-profile"
                          >
                            ⚙ Manage Lab Details
                          </button>
                        </div>
                      </div>

                      {/* Columns Grid matching the status boards */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        
                        {/* COL 1: Not Yet Reviewed (Pending) */}
                        <div className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-2xl flex flex-col gap-3 min-h-[220px]">
                          <div className="text-[10px] font-mono font-bold text-zinc-500 border-b border-amber-200/45 pb-1.5 flex justify-between">
                            <span>Awaiting Test</span>
                            <span className="text-amber-850 font-bold">({applicants.filter(a => a.status === 'Pending').length})</span>
                          </div>
                          <div className="space-y-2 max-h-[220px] overflow-y-auto">
                            {applicants.filter(a => a.status === 'Pending').map((a) => (
                              <div key={a.id} className="p-2.5 rounded-xl bg-white border border-amber-200/40 shadow-3xs flex flex-col gap-1.5">
                                <div>
                                  <h5 className="text-[11px] font-bold text-zinc-900 leading-tight">{a.name}</h5>
                                  <p className="text-[9px] text-zinc-500 truncate mt-0.5 font-medium">{a.labName}</p>
                                </div>
                                <div className="p-1 px-1.5 rounded bg-amber-50 border border-amber-200/50 text-[9px] font-mono text-amber-805 truncate flex items-center justify-between font-bold">
                                  <span>Code Score: {a.score}</span>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                  <button 
                                    onClick={() => handleOpenFeedback(a)}
                                    className="p-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-mono font-bold cursor-pointer border-none text-center"
                                  >
                                    Eval & Feedback
                                  </button>
                                  <div className="flex gap-1.5">
                                    <button 
                                      onClick={() => changeStatus(a.id, 'Accepted')}
                                      className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-mono flex-1 font-bold cursor-pointer border-none"
                                    >
                                      Accept
                                    </button>
                                    <button 
                                      onClick={() => changeStatus(a.id, 'Denied')}
                                      className="p-1 rounded bg-red-650 hover:bg-red-750 text-white text-[9px] font-mono flex-1 font-bold cursor-pointer border-none"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COL 2: Accepted */}
                        <div className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-2xl flex flex-col gap-3 min-h-[220px]">
                          <div className="text-[10px] font-mono font-bold text-zinc-500 border-b border-amber-200/45 pb-1.5 flex justify-between">
                            <span>Accepted</span>
                            <span className="text-emerald-700 font-bold">({applicants.filter(a => a.status === 'Accepted').length})</span>
                          </div>
                          <div className="space-y-2 max-h-[220px] overflow-y-auto">
                            {applicants.filter(a => a.status === 'Accepted').map((a) => (
                              <div key={a.id} className="p-2.5 rounded-xl bg-white border border-amber-200/40 shadow-3xs flex flex-col gap-1.5">
                                <div>
                                  <h5 className="text-[11px] font-bold text-zinc-900 leading-tight">{a.name}</h5>
                                  <p className="text-[9px] text-zinc-500 truncate mt-0.5 font-medium">{a.labName}</p>
                                </div>
                                <div className="p-1 px-1.5 rounded bg-emerald-50 border border-emerald-250 text-[9px] font-mono text-emerald-800 flex items-center justify-between font-bold">
                                  <span>Interviewed</span>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                  <button 
                                    onClick={() => handleOpenFeedback(a)}
                                    className="p-1 rounded bg-blue-105 hover:bg-blue-200 text-blue-800 text-[9px] font-mono font-bold cursor-pointer border-none text-center"
                                  >
                                    Update Feedback
                                  </button>
                                  <button 
                                    onClick={() => changeStatus(a.id, 'Onboarded')}
                                    className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-mono font-bold w-full cursor-pointer border-none"
                                  >
                                    Onboard Lab
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COL 3: Onboarded */}
                        <div className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-2xl flex flex-col gap-3 min-h-[220px]">
                          <div className="text-[10px] font-mono font-bold text-zinc-500 border-b border-amber-200/45 pb-1.5 flex justify-between">
                            <span>Onboarded</span>
                            <span className="text-blue-700 font-bold">({applicants.filter(a => a.status === 'Onboarded').length})</span>
                          </div>
                          <div className="space-y-2 max-h-[220px] overflow-y-auto">
                            {applicants.filter(a => a.status === 'Onboarded').map((a) => (
                              <div key={a.id} className="p-2.5 rounded-xl bg-white border border-amber-200/25 opacity-90 shadow-3xs flex flex-col gap-1.5">
                                <h5 className="text-[11px] font-bold text-zinc-900 leading-tight">{a.name}</h5>
                                <p className="text-[9px] text-zinc-500 truncate mt-0.5 font-medium">{a.labName}</p>
                                <span className="text-[9px] font-mono text-blue-700 block mt-1 font-bold font-medium">✓ CORE_ONBOARD_OK</span>
                                <button 
                                  onClick={() => handleOpenFeedback(a)}
                                  className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[9px] font-mono font-bold cursor-pointer border-none text-center"
                                >
                                  View Feedback
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COL 4: Denied */}
                        <div className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-2xl flex flex-col gap-3 min-h-[220px]">
                          <div className="text-[10px] font-mono font-bold text-zinc-500 border-b border-amber-200/45 pb-1.5 flex justify-between">
                            <span>Denied</span>
                            <span className="text-red-700 font-bold">({applicants.filter(a => a.status === 'Denied').length})</span>
                          </div>
                          <div className="space-y-2 max-h-[220px] overflow-y-auto">
                            {applicants.filter(a => a.status === 'Denied').map((a) => (
                              <div key={a.id} className="p-2.5 rounded-xl bg-white border border-amber-200/20 opacity-75 shadow-3xs flex flex-col gap-1.5">
                                <h5 className="text-[11px] font-bold text-zinc-650 leading-tight">{a.name}</h5>
                                <button 
                                  onClick={() => handleOpenFeedback(a)}
                                  className="text-[9px] text-red-700 hover:underline font-mono font-bold block mt-1 cursor-pointer bg-transparent border-none p-0 text-left"
                                >
                                  Edit Feedback
                                </button>
                                <button 
                                  onClick={() => changeStatus(a.id, 'Pending')}
                                  className="text-[9px] text-amber-800 underline hover:text-amber-900 block mt-1 cursor-pointer font-semibold bg-transparent border-none p-0 text-left"
                                >
                                  Move to review
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Edit Project Prompts Panel (Col 9-12) */}
                  <div className="lg:col-span-4 flex flex-col gap-5">
                    <div className="p-5 rounded-2xl bg-white border border-amber-200/50 flex-1 flex flex-col justify-between shadow-2xs">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <FolderSync className="w-5 h-5 text-emerald-600" />
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wider">Configure Lab Prereqs</h4>
                            <p className="text-[10px] text-zinc-500 font-medium">Formulate active homework challenges</p>
                          </div>
                        </div>

                        {/* Choose Lab Preset */}
                        <div className="mb-4">
                          <label className="text-[10px] font-mono text-zinc-500 font-bold block mb-1">Target Research Lab</label>
                          <select 
                            value={selectedResearcherLabId}
                            onChange={(e) => {
                              const newId = e.target.value;
                              setSelectedResearcherLabId(newId);
                              const presets = LAB_TOPIC_PRESETS[newId] || LAB_TOPIC_PRESETS['neuro'];
                              if (presets && presets.length > 0) {
                                setResearcherPrompt(presets[0].text);
                                setPromptMessage(`Topic Preset Loaded: "${presets[0].title}"`);
                              }
                            }}
                            className="w-full text-xs p-2.5 rounded-xl bg-[#FFFDF5] border border-amber-201 text-zinc-855 font-medium cursor-pointer"
                          >
                            {labs.map(labItem => (
                              <option key={labItem.id} value={labItem.id}>
                                {labItem.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Edit prompt area */}
                        <div className="mb-4">
                          <label className="text-[10px] font-mono text-zinc-500 font-bold block mb-1">Interactive Topic Prompt</label>
                          <textarea
                            value={researcherPrompt}
                            onChange={(e) => setResearcherPrompt(e.target.value)}
                            className="w-full text-xs p-3 rounded-xl bg-[#FFFDF5] border border-amber-200/80 text-zinc-800 min-h-[140px] focus:outline-none focus:border-amber-400 placeholder-zinc-400 leading-relaxed font-mono font-medium"
                          />
                        </div>

                        {/* AI generator hint */}
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/40 mb-4 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-zinc-900 font-mono block">AI PROMPT ASSISTANT</span>
                            <p className="text-[9px] text-zinc-500 mt-0.5 font-medium">Let Gemini build appropriate technical tasks based on your published paper methodology.</p>
                          </div>
                        </div>

                        {promptMessage && (
                          <p className="text-[10px] text-emerald-700 font-mono mb-2 animate-pulse font-bold">{promptMessage}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 border-t border-zinc-100 pt-4">
                        <button
                          onClick={handleAIPromptGenerate}
                          className="px-3.5 py-2 rounded-full border border-zinc-250 hover:border-amber-400 text-zinc-705 hover:text-zinc-900 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center flex-1 bg-white cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          Next Topic Preset
                        </button>

                        <button
                          onClick={() => {
                            setLabs(prev => prev.map(labItem => {
                              if (labItem.id === selectedResearcherLabId) {
                                return {
                                  ...labItem,
                                  prompts: labItem.prompts.map((p, idx) => {
                                    if (idx === 0) {
                                      return {
                                        ...p,
                                        text: researcherPrompt,
                                        desc: researcherPrompt
                                      };
                                    }
                                    return p;
                                  })
                                };
                              }
                              return labItem;
                            }));
                            alert(`Prerequisite prompts updated successfully! Student portal synced.`);
                          }}
                          className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.03] text-white font-bold text-xs transition-transform flex-1 text-center cursor-pointer border-none"
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {researcherPage === 'profile' && (
                <motion.div
                  key="researcher-profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <LabProfileView 
                    lab={activeResearcherLab}
                    onSave={(updatedLab) => {
                      setLabs(prev => prev.map(l => l.id === updatedLab.id ? updatedLab : l));
                      setResearcherPage('pipeline');
                    }}
                    onGoToEditPrompts={() => setResearcherPage('prompts')}
                    onReturnToDashboard={() => setResearcherPage('pipeline')}
                  />
                </motion.div>
              )}

              {researcherPage === 'prompts' && (
                <motion.div
                  key="researcher-prompts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <EditPromptsView 
                    lab={activeResearcherLab}
                    onSavePrompts={(updatedPrompts) => {
                      setLabs(prev => prev.map(l => {
                        if (l.id === activeResearcherLab.id) {
                          return {
                            ...l,
                            prompts: updatedPrompts
                          };
                        }
                        return l;
                      }));
                    }}
                    onBack={() => setResearcherPage('profile')}
                  />
                </motion.div>
              )}

              {researcherPage === 'feedback' && (
                <motion.div
                  key="researcher-feedback"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <ProvideFeedbackView 
                    application={getFeedbackApp()}
                    onSaveDraft={(feedback) => {
                      if (selectedApplicant) {
                        setApplicants(prev => prev.map(a => {
                          if (a.id === selectedApplicant.id) {
                            return { ...a, feedbackDraft: feedback };
                          }
                          return a;
                        }));
                        
                        // Sync back to student view decision if it's the active student application
                        if (selectedApplicant.id === 'bob-app' || selectedApplicant.id === 'bob-you' || selectedApplicant.id === 'bob-you-app') {
                          setSubmittedApplication(prev => prev ? { ...prev, feedback } : null);
                        }
                      }
                      setResearcherPage('pipeline');
                    }}
                    onConfirmDecision={(decision, feedback) => {
                      const newStatus = decision;
                      if (selectedApplicant) {
                        changeStatus(selectedApplicant.id, newStatus);
                        setApplicants(prev => prev.map(a => {
                          if (a.id === selectedApplicant.id) {
                            return { ...a, status: newStatus, feedbackDraft: feedback };
                          }
                          return a;
                        }));
                        
                        // Sync back to student view decision if it's the active student application
                        if (selectedApplicant.id === 'bob-app' || selectedApplicant.id === 'bob-you' || selectedApplicant.id === 'bob-you-app') {
                          setSubmittedApplication(prev => prev ? { ...prev, status: newStatus, feedback } : null);
                        }
                      }
                      setResearcherPage('pipeline');
                    }}
                    onBack={() => setResearcherPage('pipeline')}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
