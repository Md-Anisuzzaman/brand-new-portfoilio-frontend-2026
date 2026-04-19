import { Code2 } from 'lucide-react'
import { SkillsTable } from './SkillsTable'    
import { dashboardGetSkills } from '@/lib/services/skill.services'

export default async function DashboardSkillsPage() {
  const skills = await dashboardGetSkills()

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center">
          <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Skills
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your skills and categories
          </p>
        </div>
      </div>

      <SkillsTable initial={skills} />

    </div>
  )
}