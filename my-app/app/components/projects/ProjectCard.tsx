import { ExternalLink, Clock, ImageIcon } from "lucide-react";
import { GithubIcon } from "../icon/brandIcons";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types/project";

export function ProjectCard({ project }: { project: Project }) {
  const isPlaceholder = project.isPlaceholder;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "transition-all duration-300",
        !isPlaceholder &&
          "hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/60 dark:hover:shadow-zinc-900/60",
        isPlaceholder && "opacity-60",
      )}
    >
      {/* Color top bar */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: project.color }}
      />

      {/* ── Image area ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          //jokhon api theke image asbe tokhon eita use korbo, tar age placeholder image show korbe
          //   <Image
          //         src={project.thumbnail}
          //         alt={project.title}
          //         fill
          //         className="object-cover transition-transform duration-500 group-hover:scale-105"
          // />
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: `${project.color}15` }}
          >
            <ImageIcon
              className="w-8 h-8"
              style={{ color: `${project.color}60` }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: `${project.color}80` }}
            >
              Image coming soon
            </span>
          </div>
        )}
      </div>

      {/* Hover overlay — only on real projects */}
      {!isPlaceholder && (
        <div
          className={cn(
            "absolute inset-0 top-1.5 z-10 rounded-b-2xl",
            "flex items-center justify-center gap-3",
            "bg-zinc-900/80 dark:bg-zinc-950/85 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
          )}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-white text-zinc-900 font-medium text-sm
                       hover:bg-zinc-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-zinc-800 text-white font-medium text-sm
                       hover:bg-zinc-700 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div
              className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="font-bold text-base text-zinc-900 dark:text-white leading-snug">
              {project.title}
            </h3>
          </div>

          {isPlaceholder && (
            <span
              className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full
                               bg-zinc-100 dark:bg-zinc-800
                               text-zinc-400 dark:text-zinc-500 text-xs font-medium"
            >
              <Clock className="w-3 h-3" />
              Soon
            </span>
          )}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-lg
                         bg-zinc-100 dark:bg-zinc-800
                         text-zinc-600 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Mobile links — always visible on touch devices */}
        {!isPlaceholder && (
          <div
            className="flex items-center gap-4 pt-2
                          border-t border-zinc-100 dark:border-zinc-800
                          md:hidden"
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium
                         text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium
                         text-zinc-500 dark:text-zinc-400 hover:underline"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
