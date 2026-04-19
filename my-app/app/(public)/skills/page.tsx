import { Code2 } from 'lucide-react'
import { SkillsGrid } from '@/app/components/skills/SkillsGrid'
import { DEMO_SKILLS } from '@/lib/data/skills.demo'

export const metadata = {
  title: 'Skills — John Dev',
  description: 'Technologies, languages and tools I work with.',
}

export default function SkillsPage() {
  // ── Later: replace with API call ──────────────────────────
  // const skills = await fetchSkills()
  const skills = DEMO_SKILLS

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                            flex items-center justify-center">
              <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400
                             uppercase tracking-wider">
              Tech Stack
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Skills
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Languages, frameworks, databases and tools I use to build
            full-stack applications from idea to production.
          </p>
        </div>

        {/* Skills */}
        <SkillsGrid categories={skills} />

      </div>
    </div>
  )
}