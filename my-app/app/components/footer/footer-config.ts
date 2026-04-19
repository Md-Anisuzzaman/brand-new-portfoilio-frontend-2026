import {
  Home, User, Briefcase,
   Mail, Wrench, Code2,
} from 'lucide-react'
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/app/components/icon/brandIcons'

export const footerConfig = {
  brand: {
    name:    'Ethian Dev',
    tagline: 'Full Stack Developer',
    bio:     'Building fast, scalable and beautiful web applications. Available for freelance projects worldwide.',
    email:   'ethian@example.com',
    phone:   '+1 234 567 890',
    location: 'Available Worldwide',
  },

  pages: [
    { label: 'Home',     href: '/',         icon: Home      },
    { label: 'About',    href: '/about',     icon: User      },
    { label: 'Services', href: '/services',  icon: Wrench    },
    { label: 'Projects', href: '/projects',  icon: Briefcase },
    { label: 'Skills',   href: '/skills',    icon: Code2     },
    { label: 'Contact',  href: '/contact',   icon: Mail      },
  ],

  services: [
    { label: 'Frontend Development', href: '/services' },
    { label: 'Backend Development',  href: '/services' },
    { label: 'Full-Stack Web App',   href: '/services' },
    { label: 'API Integration',      href: '/services' },
    { label: 'Database Design',      href: '/services' },
    { label: 'Python & Django',      href: '/services' },
  ],

  socials: [
    { label: 'GitHub',   href: 'https://github.com',   Icon: GithubIcon   },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
    { label: 'Twitter',  href: 'https://twitter.com',  Icon: TwitterIcon  },
  ],

  stack: ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind'],
}