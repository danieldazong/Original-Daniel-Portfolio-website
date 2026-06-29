/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkExperience, BlogPost, SkillCategory, Project, Capability, Resource } from './types';


import automation1 from './assets/images/image opt/automation31.webp';
import automation2 from './assets/images/image opt/automation3.webp';
import webApp from './assets/images/image opt/web-app3.webp';
import mobileApp from './assets/images/image opt/mobile-app3.webp';




export const SYNTHESIZED_HEADLINE = "The Systems-Minded Software Engineer Who Translates Complexity Into High-Performance Code";

export const SYNTHESIZED_SUBHEADLINE = "Uniting low-level systems depth (from electrical engineering) with high-clarity tech communication (from professional instruction) to build robust, scalable distributed applications.";

export const ABOUT_INTRO = "I'm Daniel, a software engineer based in Nigeria, building modern, scalable, AI-driven web experiences.";

export const ABOUT_BIO = [
  "I specialize in turning complex problems into clean, high-performance code — pairing deep systems knowledge with a focus on real business outcomes.",
  "Over the years I've shipped production AI solutions and full-stack products used by teams worldwide, helping them move faster and ship with confidence."
];

export const ABOUT_STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "40%", label: "Avg. Performance Gains" }
];
export const RESOURCE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'automation', label: 'Automation' },
  { key: 'notion', label: 'Notion' }
] as const;

export const RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'AI Email Auto-Responder with Ollama',
    resourceType: 'automation',
    image: automation1,
    tags: ['n8n', 'Workflow', 'Free'],
    fileUrl: 'https://drive.google.com/uc?export=download&id=1Ik56pXl4BSRJ9UzPvPD3D03Jgg4j0tmz',
    fileName: 'AI-Email-Auto-Responder-with-Ollama.json'
  },
  {
    id: 'res-2',
    title: 'AI Order Management n8n Workflow',
    resourceType: 'automation',
    image: automation2,
    tags: ['n8n', 'Workflow', 'Free'],
    fileUrl: 'https://drive.google.com/uc?export=download&id=1TzRj1bHJqqRBaGWFiRvqeyj0Tu2jCqHj',
    fileName: 'AI-Order-Management-n8n-Workflow.json'
  },
  {
    id: 'res-3',
    title: 'AI-Powered Customer Order Management Automation System',
    resourceType: 'automation',
    image: webApp,
    tags: ['n8n', 'Workflow', 'Free'],
    fileUrl: 'https://drive.google.com/uc?export=download&id=17Bk3m5W84VoRp_D_w2sLVQuemFXnNmtq',
    fileName: 'AI-Powered-Customer-Order-Management-Automation-System.json'
  },
  {
    id: 'res-4',
    title: 'Automated Employee Onboarding Account Provisioning n8n',
    resourceType: 'automation',
    image: mobileApp,
    tags: ['n8n', 'Workflow', 'Free'],
    fileUrl: 'https://drive.google.com/uc?export=download&id=1RJsLR0aZ-_HoKIfFaYVCBgHSRs6g_KdO',
    fileName: 'Automated-Employee-Onboarding-Account-Provisioning-n8n.json'
  }
];



export const PROJECT_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'real', label: 'Automations' },
  { key: 'exploration', label: 'AI Apps' }
] as const;


export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Automated Employee Onboarding & Account Provisioning AI Agent",
    category: "real",
    image: automation1,
    tags: ["n8n", "AI Agent", "Automation"],
    link: "#"
  },
  {
    id: "proj-3",
    title: "Work & Project Management Platform",
    category: "exploration",
    image: webApp,
    tags: ["React", "Next.js", "Node.js"],
    link: "#"
  },
  {
    id: "proj-2",
    title: "AI Video Content Automation for TikTok, Instagram & YouTube",
    category: "real",
    image: automation2,
    tags: ["n8n", "AI", "Content Automation"],
    link: "#"
  },
  {
    id: "proj-4",
    title: "Tutor AI Mobile App",
    category: "exploration",
    image: mobileApp,
    tags: ["React Native", "Python", "LLM API", "PostgreSQL"],
    link: "#"
  }
];



export const BIO_PARAGRAPHS = [
  "I am a results-driven Software Engineer with an unconventional foundation. I don't just write web applications; I understand what happens to the bits when they hit the metal. My background in Electrical Engineering gave me a thorough ground-up understanding of system design, signal processing, and memory architectures. When debugging or designing complex systems, this low-level intuition translates into robust, highly-optimized codebase architectures.",
  "Crucially, I believe that elite engineering is only half the battle; the other half is clear, constructive collaboration. Having spent years as a Technical Instructor and Educator, I've spent thousands of hours perfecting the art of decomposing highly abstract, complex problems into clear, execution-ready steps. In my engineering roles, this pedagogical expertise manifests as elite documentation, highly effective team mentorship, and seamless translation of nebulous business plans into rigid engineering requirements."
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Software & Languages",
    skills: ["TypeScript", "JavaScript", "Go", "Rust", "C/C++", "Python", "SQL", "HTML5/CSS3"]
  },
  {
    title: "Frameworks & Runtimes",
    skills: ["React (Vite/Next.js)", "Node.js", "Express", "Drizzle ORM", "Tailwind CSS", "FastAPI"]
  },
  {
    title: "Systems & Infrastructure",
    skills: ["Docker", "Kubernetes", "PostgreSQL", "Redis", "Embedded Systems (RTOS)", "Linux Administration", "CI/CD & GitHub Actions"]
  }
];

export const CAPABILITIES: Capability[] = [
  {
    id: "cap-1",
    title: "AI Agents & LLM Systems",
    description: "RAG, agentic workflows, conversational AI"
  },
  {
    id: "cap-2",
    title: "Workflow Automation",
    description: "n8n, Zapier, Make, process design"
  },
  {
    id: "cap-3",
    title: "Python & API Integration",
    description: "LangChain, REST APIs, system integration"
  },
  {
    id: "cap-4",
    title: "Cloud Security & IAM",
    description: "Microsoft Sentinel, RBAC, security monitoring"
  }
];

export const EXPERIENCE_DATA: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Founder & AI Solutions Engineer",
    organization: "SkywaveHost",
    period: "2024 — PRES",
    bulletPoints: [
      "Designed and delivered AI agents, workflow automations, and internal tools that reduced manual operational effort by 65%+.",
      "- Built 15+ end-to-end automation solutions and RAG-based AI assistants using n8n, LLMs, APIs, and databases to streamline intake, routing, and customer communication."
    ],
    skillsUsed: ["n8n", "OpenAI", "LangChain", "RAG", "Python", "APIs"]
  },
  {
    id: "exp-2",
    role: "Cybersecurity Engineer",
    organization: "CosmoPortals Technologies Solutions, LLC",
    period: "2023 — 2024",
    bulletPoints: [
      "Managed IAM processes including access provisioning, permission management, and least-privilege enforcement across cloud systems.",
      "Used Microsoft Sentinel and Defender for Cloud for security monitoring, alert triage, and incident investigation, strengthening overall cloud security posture."
    ],
    skillsUsed: ["Microsoft Sentinel", "IAM", "RBAC", "Cloud Security", "Defender"]
  },
  {
    id: "exp-3",
    role: "IT Specialist",
    organization: "Peter and Jane Limited",
    period: "2020 — 2022",
    bulletPoints: [
      "Supported enterprise systems, business applications, and IT infrastructure to maintain operational reliability and business continuity.",
      "Resolved hardware, software, and network issues while improving service availability and reducing operational downtime."
    ],
    skillsUsed: ["IT Operations", "System Administration", "Networking", "Support"]
  }
];


export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Understanding CPU Caching Rules: Write Faster Code From Web to Metal",
    excerpt: "How L1/L2 caches work and how your TypeScript or Go nested loops can be written to respect memory spatial locality, heavily cutting runtime processing latency.",
    content: "## The Hidden Performance Killer\n\nMany high-level software catalog-developers assume they don't need to care about memory layouts or cache lines. But when processing complex matrices or big lists, failing to align with your processor's structural architecture can make your code 10-20x slower. \n\n### Spatial Locality and Cache Lines\n\nWhen standard RAM sends information to the CPU cache, it doesn't send independent variables. It transfers complete continuous chunks (typically **64 bytes**, called a cache line). If your code reads consecutive elements in a single contiguous array, it loads them into fast L1 cache at once. If your code jumps around indices (as is common with poorly nested row/column iterations), it results in constant \"cache misses\".\n\nHere's why this low-level systems logic, inherited from electrical hardware engineering, is crucial for backend database parsing, cluster node configurations, and performance web apps alike.",
    date: "May 14, 2026",
    readingTime: "5 min read",
    tag: "Systems Depth",
    slug: "cpu-caching-for-web-devs"
  },
  {
    id: "blog-2",
    title: "The Pedagogy of Clean Code: How to Explain Complex Architecture Simply",
    excerpt: "The best engineers are great communicators. Grounded in professional teaching structures, here are three mental models for presenting microservices clearly to non-engineering peers.",
    content: "## Technical Communication is a Superpower\n\nHave you ever sat through a software architectural proposal where someone displayed a diagram with 50 systems and explained absolutely nothing about *why* these decisions were made?\n\nAs a former instructor, I have spent thousands of hours teaching highly complex computing concepts to complete beginners. What I have learned is that **clear code and clear communication share the exact same foundation: reducing unnecessary cognitive load**.\n\n### The Rule of Conceptual Scaffolding\n\nNever introduce a complex technical item without mapping it to a real-world concept the listener already trusts. For instance, explaining a message queue (such as RabbitMQ) works best when compared to an automated sorting post office. Here is how you can use concrete teaching blueprints to streamline product alignment sessions and get architectural approvals.",
    date: "April 28, 2026",
    readingTime: "4 min read",
    tag: "Communication",
    slug: "pedagogy-of-clean-code"
  },
  {
    id: "blog-3",
    title: "Why Node.js Event Loop Blockages Happen — An Embedded Perspective",
    excerpt: "What is actually happening inside CPU registers and kernel tasks when you block the single main execution thread, compared with hardware interrupt polling rules.",
    content: "## Single Threads from a Low-Level Standpoint\n\nIn JavaScript, everything executes in a single-threaded loop (with Libuv pooling background threads for I/O). But why does a synchronous `JSON.parse` of standard 80MB files freeze the entire container cold?\n\nTo understand this, let's look at it through the lens of hardware interrupts. When an electrical signal triggers an embedded processor, there is a fixed timeline to execute service routines. If your interrupt service routine contains a heavy loop, other systems freeze. Node's main loop operates precisely like a continuous high-level poll. Let's outline how you can measure event loop lag and prevent single-thread bottlenecks using proper asynchronous patterns.",
    date: "March 18, 2026",
    readingTime: "6 min read",
    tag: "Software Engineering",
    slug: "event-loop-embedded-perspective"
  }
];
