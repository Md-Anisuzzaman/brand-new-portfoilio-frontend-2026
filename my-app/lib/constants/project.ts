import { Category } from '@/lib/types/project'

export const PAGE_SIZE = 3

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all',       label: 'All Projects' },
  { value: 'frontend',  label: 'Front-End'    },
  { value: 'fullstack', label: 'Full-Stack'   },
  { value: 'backend',   label: 'Back-End'     },
  { value: 'mobile',    label: 'Mobile App'   },
  { value: 'devops',    label: 'DevOps'       },  
  { value: 'ai',        label: 'AI / ML'      },
]