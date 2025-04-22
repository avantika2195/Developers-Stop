export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  status: SkillStatus;
  startedAt: string; // ISO date string
  lastPracticed?: string; // ISO date string
  notes?: string;
  resources?: Resource[];
  milestones?: Milestone[];
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'soft' | 'other';

export type SkillStatus = 'learning' | 'mastered' | 'paused';

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'other';
  completedAt?: string; // ISO date string
}

export interface Milestone {
  id: string;
  title: string;
  date: string; // ISO date string
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  repoUrl?: string;
  imageUrl?: string;
  techStack: string[]; // Skill names
  startDate: string; // ISO date string
  completionDate?: string; // ISO date string
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  joinedAt: string; // ISO date string
  goalDescription?: string;
  dailyLearningGoal?: number; // Minutes per day
  yearlyGoal?: string; // Description
}