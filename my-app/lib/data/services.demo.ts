import { Service } from '@/lib/types/services'

export const DEMO_SERVICES: Service[] = [
  {
    id: 'frontend',
    icon: 'Monitor',
    title: 'Frontend Development',
    description:
      'Beautiful, fast and fully responsive user interfaces built with modern React and Next.js. Every pixel matters — from mobile to desktop.',
    features: [
      { text: 'React.js & Next.js applications' },
      { text: 'Responsive design for all devices' },
      { text: 'Tailwind CSS & modern styling' },
      { text: 'Performance optimization' },
      { text: 'Animations & micro-interactions' },
      { text: 'SEO-friendly structure' },
    ],
    tags: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind'],
    color: '#6366f1',
    popular: false,
  },
  {
    id: 'backend',
    icon: 'Server',
    title: 'Backend Development',
    description:
      'Scalable, secure and well-structured server-side applications and REST APIs. Built to handle real-world traffic and business logic.',
    features: [
      { text: 'REST API design & development' },
      { text: 'Node.js & Express.js' },
      { text: 'JWT authentication & authorization' },
      { text: 'Password hashing with bcrypt' },
      { text: 'Middleware & error handling' },
      { text: 'API documentation' },
    ],
    tags: ['Node.js', 'Express.js', 'JWT', 'bcrypt', 'REST API'],
    color: '#10b981',
    popular: false,
  },
  {
    id: 'fullstack',
    icon: 'Layers',
    title: 'Full-Stack Web App',
    description:
      'Complete end-to-end web applications — from database design to pixel-perfect UI. One developer, full ownership, zero handoff friction.',
    features: [
      { text: 'Full frontend + backend development' },
      { text: 'Database design & relationships' },
      { text: 'User authentication system' },
      { text: 'Admin dashboard & CMS' },
      { text: 'Deployment & hosting setup' },
      { text: 'Ongoing support & maintenance' },
    ],
    tags: ['Next.js', 'Node.js', 'MongoDB', 'REST API', 'JWT'],
    color: '#8b5cf6',
    popular: true,
  },
  {
    id: 'database',
    icon: 'Database',
    title: 'Database Design',
    description:
      'Well-structured databases with proper relationships, indexing and query optimization. Both SQL and NoSQL covered.',
    features: [
      { text: 'MongoDB schema design' },
      { text: 'Relationship diagrams (ERD)' },
      { text: 'Data modeling & normalization' },
      { text: 'Query optimization' },
      { text: 'Database migrations' },
      { text: 'Mongoose ORM integration' },
    ],
    tags: ['MongoDB', 'MySQL', 'ERD', 'Mongoose', 'Python'],
    color: '#f59e0b',
    popular: false,
  },
  {
    id: 'api',
    icon: 'Webhook',
    title: 'API Integration',
    description:
      'Connect your app to third-party services, payment gateways, and external APIs. Clean integration that just works.',
    features: [
      { text: 'Third-party API integration' },
      { text: 'Payment gateway setup' },
      { text: 'OAuth & social login' },
      { text: 'Webhook implementation' },
      { text: 'API error handling & retry logic' },
      { text: 'Rate limiting & security' },
    ],
    tags: ['REST', 'OAuth', 'Webhooks', 'Node.js', 'Express'],
    color: '#06b6d4',
    popular: false,
  },
  {
    id: 'python',
    icon: 'Code2',
    title: 'Python & Django',
    description:
      'Backend services, automation scripts and web applications with Python and Django. Great for data-heavy or content-driven projects.',
    features: [
      { text: 'Django REST Framework APIs' },
      { text: 'Python scripting & automation' },
      { text: 'Django admin panel' },
      { text: 'Data processing pipelines' },
      { text: 'Authentication with Django auth' },
      { text: 'MySQL and PostgreSQL with Django ORM' },
    ],
    tags: ['Python', 'Django', 'PostgreSQL', 'DRF', 'REST'],
    color: '#ef4444',
    popular: false,
  },
]