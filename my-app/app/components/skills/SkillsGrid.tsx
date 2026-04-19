import { SkillCategory } from '@/lib/types/skill'
import { SkillsTabs } from './SkillsTabs'

export function SkillsGrid({ categories }: { categories: SkillCategory[] }) {
  return <SkillsTabs categories={categories} />
}