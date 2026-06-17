/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  bulletPoints: string[];
  skillsUsed: string[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
}


export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  tag: string;
  slug: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
export interface Project {
  id: string;
  title: string;
  category: 'real' | 'exploration';
  image: string;
  tags: string[];
  link?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
  honeypot: string; // Anti-spam honeypot
}
