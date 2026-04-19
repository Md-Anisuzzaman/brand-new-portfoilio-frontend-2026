import { Suspense } from "react";
import { Briefcase } from "lucide-react";
import { fetchProjects } from "@/lib/services/project.services";
import { PAGE_SIZE } from "@/lib/constants/project";
import { ProjectsGrid } from "@/app/components/projects/ProjectsGrid";
import { ProjectsSkeleton } from "@/app/components/projects/ProjectsSkeleton";

export const metadata = {
  title: "Projects — John Dev",
  description: "Showcase of frontend, fullstack, backend and mobile projects.",
};

export default async function ProjectsPage() {
  const initialData = await fetchProjects({
    category: "all",
    page: 1,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                            flex items-center justify-center"
            >
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400
                             uppercase tracking-wider"
            >
              My Work
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Projects
          </h1>
          <div className="mb-8">
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              A collection of things I&apos;ve built — from quick experiments to
              full production apps. Filter by category to explore.
            </p>
          </div>
        </div>

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsGrid initialData={initialData} />
        </Suspense>
      </div>
    </div>
  );
}
