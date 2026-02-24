export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: "Acme Corp",
    role: "Senior Software Engineer",
    period: "2023 – Present",
    description: "Leading frontend architecture for the core product platform.",
    highlights: [
      "Redesigned the component library, reducing bundle size by 40%",
      "Implemented real-time collaboration features using WebSockets",
      "Mentored 3 junior engineers through the onboarding process",
    ],
  },
  {
    company: "Startup Inc",
    role: "Software Engineer",
    period: "2021 – 2023",
    description: "Full-stack development on a SaaS analytics platform.",
    highlights: [
      "Built a customer dashboard serving 10,000+ daily active users",
      "Optimized database queries reducing p99 latency by 60%",
      "Introduced CI/CD pipelines with automated testing and deployment",
    ],
  },
  {
    company: "Tech Solutions",
    role: "Junior Developer",
    period: "2019 – 2021",
    description: "Web development for client projects across multiple industries.",
    highlights: [
      "Developed responsive websites for 15+ client projects",
      "Migrated legacy jQuery applications to React",
      "Implemented accessibility improvements achieving WCAG AA compliance",
    ],
  },
];

export const education: Education[] = [
  {
    school: "University of Technology",
    degree: "B.S. Computer Science",
    period: "2015 – 2019",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    skills: ["React", "Astro", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs"],
  },
  {
    category: "Tools & Practices",
    skills: ["Git", "Docker", "CI/CD", "Testing", "Agile", "Accessibility"],
  },
];
