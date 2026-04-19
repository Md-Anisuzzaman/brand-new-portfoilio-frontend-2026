import { AboutData } from '@/lib/types/about'

// ─────────────────────────────────────────────────────────────
// DEMO DATA — replace with fetchAbout() when API is ready
// API should return the same AboutData shape
// ─────────────────────────────────────────────────────────────

export const DEMO_ABOUT: AboutData = {

  hero: {
    name:       'Ethian Dev',
    title:      'Full Stack Developer',
    subtitle:   'I turn ideas into fast, scalable web products',
    bio: [
      'I\'m a full-stack developer with 3+ years of experience building production web applications. I work across the entire stack — from crafting pixel-perfect UIs with React and Next.js to designing robust APIs with Node.js and Express.',
      'My background spans frontend, backend and database design. I\'ve worked on everything from solo freelance projects to collaborating with remote teams. I care deeply about clean code, thoughtful architecture and shipping products that actually work.',
      'When I\'m not coding, I\'m exploring new technologies, contributing to open source or writing about what I\'ve learned. I\'m always looking for interesting problems to solve.',
    ],
    // image:      null,
    image:      'https://i.ibb.co/jZwLHrfT/IMG-20260318-213819.png',
    resumeUrl:  '/resume.pdf',
    location:   'Remote — Worldwide',
    experience: '3+ Years',
  },

  experiences: [
    {
      id:          '1',
      role:        'Full Stack Developer',
      company:     'Freelance',
      type:        'Self-employed',
      period:      '2022 — Present',
      current:     true,
      description: 'Building full-stack web applications for clients across different industries. Responsible for everything from initial architecture decisions to deployment. Stack includes Next.js, Node.js, Express, MongoDB and PostgreSQL.',
      tags:        ['Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'React'],
    },
    {
      id:          '2',
      role:        'Frontend Developer',
      company:     'Tech Startup',
      type:        'Contract',
      period:      '2021 — 2022',
      current:     false,
      description: 'Developed and maintained the company\'s main product UI using React and TypeScript. Improved page load performance by 40% through code splitting and lazy loading. Collaborated closely with designers and backend engineers.',
      tags:        ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    },
    {
      id:          '3',
      role:        'Junior Web Developer',
      company:     'Digital Agency',
      type:        'Full-time',
      period:      '2020 — 2021',
      current:     false,
      description: 'Built and maintained client websites and web apps. Worked across HTML, CSS, JavaScript and PHP. Gained strong fundamentals in responsive design, cross-browser compatibility and version control.',
      tags:        ['HTML', 'CSS', 'JavaScript', 'PHP', 'Git'],
    },
  ],

  educations: [
    {
      id:          '1',
      degree:      'Bachelor of Science in Computer Science',
      school:      'State University of Technology',
      period:      '2016 — 2020',
      description: 'Studied computer science fundamentals including algorithms, data structures, databases, software engineering and computer networks. Final year project built a full-stack inventory management system.',
      grade:       'First Class Honours',
    },
    {
      id:          '2',
      degree:      'Full Stack Web Development Bootcamp',
      school:      'Udemy / freeCodeCamp',
      period:      '2020 — 2021',
      description: 'Completed intensive self-study covering the MERN stack, REST APIs, JWT authentication, deployment and cloud services. Built 10+ projects across the curriculum.',
    },
  ],

  values: [
    {
      id:    '1',
      icon:  'Code2',
      title: 'Clean Code',
      desc:  'I write code that is readable, maintainable and well-structured. Future me and future teammates should never struggle to understand what I wrote.',
    },
    {
      id:    '2',
      icon:  'Zap',
      title: 'Performance First',
      desc:  'Slow apps lose users. I optimize from the start — fast load times, efficient queries and lightweight bundles are non-negotiable.',
    },
    {
      id:    '3',
      icon:  'Users',
      title: 'User Focused',
      desc:  'Technology is only useful if people can actually use it. I think about the end user at every step — from architecture to the smallest UI detail.',
    },
    {
      id:    '4',
      icon:  'Shield',
      title: 'Security Minded',
      desc:  'Auth, input validation, environment variables, rate limiting — security isn\'t an afterthought. It\'s baked in from day one.',
    },
    {
      id:    '5',
      icon:  'RefreshCw',
      title: 'Always Learning',
      desc:  'The web moves fast. I stay current with new tools, patterns and best practices — and I\'m not afraid to unlearn things that no longer serve me.',
    },
    {
      id:    '6',
      icon:  'MessageSquare',
      title: 'Clear Communication',
      desc:  'Good software is built on good communication. I keep clients and teammates informed, ask the right questions early and document my work.',
    },
  ],
}