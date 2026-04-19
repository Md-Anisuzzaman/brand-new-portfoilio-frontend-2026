import { Briefcase } from 'lucide-react'
import { ProjectsTable } from './ProjectsTable' 
import { dashboardGetProjects } from '@/lib/services/project.services'

export default async function DashboardProjectsPage() {
  const projects = await dashboardGetProjects()

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Projects
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your portfolio projects
          </p>
        </div>
      </div>

      {/* Table — client component handles all state */}
      <ProjectsTable initial={projects} />

    </div>
  )
}