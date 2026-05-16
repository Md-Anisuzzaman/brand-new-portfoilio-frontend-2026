import { ContactData } from '@/lib/types/contact'

export const DEMO_CONTACT: ContactData = {
  info: {
    email:         'john@example.com',
    phone:         '+1 234 567 890',
    location:      'Available Worldwide',
    responseTime:  'Within 24 hours',
    available:     true,
    availableText: 'Currently accepting work',
    socials: {
      github:   'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter:  'https://twitter.com',
    },
  },
  faqs: [
    {
      id:       '1',
      question: 'How quickly can you start on my project?',
      answer:   'I can usually start within 1–3 days of agreeing on scope and terms. For urgent projects, reach out directly via WhatsApp.',
      order:    1,
    },
    {
      id:       '2',
      question: 'Do you work with clients outside your country?',
      answer:   'Absolutely. I work with clients worldwide via email, WhatsApp, or video calls.',
      order:    2,
    },
    {
      id:       '3',
      question: 'What information do you need to give me a quote?',
      answer:   'A rough description of what you need is enough to start. The more detail you provide the more accurate my estimate will be.',
      order:    3,
    },
    {
      id:       '4',
      question: 'Do you offer ongoing support after the project is done?',
      answer:   'Yes. I offer maintenance packages and am available for bug fixes, feature additions and updates after delivery.',
      order:    4,
    },
    {
      id:       '5',
      question: 'What is your payment process?',
      answer:   'Typically 50% upfront and 50% on delivery for smaller projects. Larger projects are split into milestones.',
      order:    5,
    },
    {
      id:       '6',
      question: 'Can you work with an existing codebase?',
      answer:   'Yes — I regularly join existing projects, fix bugs, refactor code and add new features.',
      order:    6,
    },
  ],
}