"use client";
import { useEffect } from "react";
import {
  X,
  ExternalLink,
  Star,
  ImageIcon,
  Tag,
  Layers,
  Palette,
} from "lucide-react";
import { Project } from "@/lib/types/project";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/app/components/icon/brandIcons";

const CATEGORY_COLORS: Record<string, string> = {
  frontend:
    "bg-amber-50  dark:bg-amber-950  text-amber-700  dark:text-amber-400  border-amber-200  dark:border-amber-900",
  fullstack:
    "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900",
  backend:
    "bg-red-50    dark:bg-red-950    text-red-700    dark:text-red-400    border-red-200    dark:border-red-900",
  mobile:
    "bg-pink-50   dark:bg-pink-950   text-pink-700   dark:text-pink-400   border-pink-200   dark:border-pink-900",
};

interface Props {
  project: Project | null;
  onClose: () => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start gap-3 py-3
                    border-b border-zinc-100 dark:border-zinc-800
                    last:border-0"
    >
      <div
        className="w-8 h-8 rounded-lg shrink-0
                      bg-zinc-100 dark:bg-zinc-800
                      flex items-center justify-center mt-0.5"
      >
        <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          className="text-xs font-semibold uppercase tracking-wider
                         text-zinc-400 dark:text-zinc-500"
        >
          {label}
        </span>
        <div className="text-sm text-zinc-900 dark:text-white">{children}</div>
      </div>
    </div>
  );
}

export function ProjectDrawer({ project, onClose, onEdit, onDelete }: Props) {
  const isOpen = !!project;

  // ✅ Close on Escape key
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // ✅ Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {/* ── Drawer panel ── */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:w-lg",
          "bg-white dark:bg-zinc-900",
          "border-l border-zinc-200 dark:border-zinc-800",
          "shadow-2xl shadow-zinc-900/20",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {!project ? null : (
          <>
            {/* ── Thumbnail ── */}
            <div
              className="relative w-full h-48 shrink-0
                            bg-zinc-100 dark:bg-zinc-800 overflow-hidden"
            >
              {project.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col
                                items-center justify-center gap-2"
                  style={{ backgroundColor: `${project.color}15` }}
                >
                  <ImageIcon
                    className="w-10 h-10"
                    style={{ color: `${project.color}60` }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: `${project.color}80` }}
                  >
                    No image
                  </span>
                </div>
              )}

              {/* Color accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: project.color }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3
                           w-8 h-8 rounded-full
                           bg-white/90 dark:bg-zinc-900/90
                           flex items-center justify-center
                           text-zinc-600 dark:text-zinc-400
                           hover:text-zinc-900 dark:hover:text-white
                           transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Featured badge */}
              {project.featured && (
                <div
                  className="absolute top-3 left-3
                                flex items-center gap-1.5 px-3 py-1
                                rounded-full bg-amber-500 text-white
                                text-xs font-semibold shadow-sm"
                >
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </div>
              )}
            </div>

            {/* ── Scrollable content ── */}
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-xl font-bold
                                   text-zinc-900 dark:text-white
                                   leading-snug mb-2"
                    >
                      {project.title}
                    </h2>
                    <span
                      className={cn(
                        "inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold capitalize border",
                        CATEGORY_COLORS[project.category],
                      )}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                <p
                  className="mt-4 text-sm text-zinc-500 dark:text-zinc-400
                               leading-relaxed"
                >
                  {project.description}
                </p>
              </div>

              {/* Details */}
              <div className="px-6 py-2">
                <DetailRow icon={Tag} label="Tech Stack">
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium
                                   bg-zinc-100 dark:bg-zinc-800
                                   text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </DetailRow>

                <DetailRow icon={Layers} label="Category">
                  <span className="capitalize">{project.category}</span>
                </DetailRow>

                <DetailRow icon={Palette} label="Accent Color">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border border-zinc-200
                                    dark:border-zinc-700"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="font-mono text-xs text-zinc-500">
                      {project.color}
                    </span>
                  </div>
                </DetailRow>

                <DetailRow icon={ExternalLink} label="Live URL">
                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400
                                 hover:underline truncate block"
                    >
                      {project.liveUrl}
                    </a>
                  ) : (
                    <span className="text-zinc-400">Not set</span>
                  )}
                </DetailRow>

                <DetailRow icon={GithubIcon} label="GitHub URL">
                  {project.githubUrl && project.githubUrl !== "#" ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400
                                 hover:underline truncate block"
                    >
                      {project.githubUrl}
                    </a>
                  ) : (
                    <span className="text-zinc-400">Not set</span>
                  )}
                </DetailRow>

                <DetailRow icon={Star} label="Featured">
                  <span
                    className={
                      project.featured
                        ? "text-amber-500 font-medium"
                        : "text-zinc-400"
                    }
                  >
                    {project.featured ? "Yes — shown on public page" : "No"}
                  </span>
                </DetailRow>
              </div>
            </div>

            {/* ── Action footer ── */}
            <div
              className="shrink-0 p-4
                            border-t border-zinc-100 dark:border-zinc-800
                            bg-zinc-50 dark:bg-zinc-800/50
                            flex gap-3"
            >
              <button
                onClick={() => onDelete(project)}
                className="flex items-center justify-center gap-2
                           flex-1 py-2.5 rounded-xl text-sm font-medium
                           border border-red-200 dark:border-red-900
                           text-red-600 dark:text-red-400
                           hover:bg-red-50 dark:hover:bg-red-950
                           transition-colors"
              >
                <X className="w-4 h-4" />
                Delete
              </button>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2
                           flex-1 py-2.5 rounded-xl text-sm font-medium
                           border border-zinc-200 dark:border-zinc-700
                           text-zinc-700 dark:text-zinc-300
                           hover:bg-zinc-100 dark:hover:bg-zinc-800
                           transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
              <button
                onClick={() => onEdit(project)}
                className="flex items-center justify-center gap-2
                           flex-1 py-2.5 rounded-xl text-sm font-medium
                           bg-indigo-600 hover:bg-indigo-700
                           text-white transition-colors"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
