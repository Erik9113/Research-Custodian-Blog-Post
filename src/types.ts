/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  contributions: string[];
}

export interface ResearchLab {
  id: string;
  name: string;
  field: string;
  matchScore: number;
  description: string;
  iconName: string;
  prerequisites: {
    title: string;
    description: string;
    steps: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  }[];
}

export interface StoryboardFrame {
  step: number;
  title: string;
  description: string;
  illustrationType: 'explore' | 'prereq' | 'meeting' | 'success';
}

export interface UsabilityComparison {
  feature: string;
  issue: string;
  beforeText: string;
  afterText: string;
  reason: string;
  icons: { before: string; after: string; label: string }[];
}

export interface LabPrompt {
  id: string;
  text: string;
  title?: string;
  desc?: string;
  deliverables?: string[];
}

export interface Lab {
  id: string;
  name: string;
  field: string;
  pi: string;
  manager?: string;
  contact?: string;
  matchingPercent: number;
  description: string;
  icon?: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  prompts: LabPrompt[];
}

export interface StudentProfile {
  name: string;
  degreeMajor: string;
  researchInterests: string;
}

export interface ProjectApplication {
  id: string;
  labName: string;
  studentName?: string;
  collaboratorNames?: string[];
  promptTopic: string;
  groupContactInfo: string;
  description: string;
  projectFileName: string;
  resumeFileName: string;
  coverLetterFileName: string;
  status: 'Pending' | 'Accepted' | 'Onboarded' | 'Denied' | 'Not Yet Reviewed';
  feedback?: string;
}

export interface AppState {
  currentStep: number;
  studentProfile: StudentProfile | null;
  selectedLabId: string | null;
  submittedApplicationId: string | null;
}

