"use client";
import { useState } from "react";
import { X, Loader2, Save, ImageIcon } from "lucide-react";
import { Project, Category } from "@/lib/types/project";
import { cn } from "@/lib/utils";
import Image from "next/image";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile App" },
];

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#06b6d4",
  "#f59e0b",
  "#ef4444",
  "#f97316",
  "#84cc16",
];

type FormData = Omit<Project, "id" | "tags" | "thumbnail"> & {
  title: string;
  description: string;
  category: Category;
  tags: string;
  liveUrl: string;
  githubUrl: string;
  thumbnail: string;
  color: string;
  featured: boolean;
};

interface Props {
  project?: Project | null; // null = create, Project = edit
  onSave: (data: Omit<Project, "id">) => Promise<void>;
  onCancel: () => void;
}

const inputCls = cn(
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-zinc-50 dark:bg-zinc-800",
  "border border-zinc-200 dark:border-zinc-700",
  "text-zinc-900 dark:text-white",
  "placeholder:text-zinc-400",
  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
  "transition-colors",
);

const labelCls =
  "text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide";

export function ProjectFormModal({ project, onSave, onCancel }: Props) {
  const isEdit = !!project;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: project?.title ?? "",
    description: project?.description ?? "",
    category: project?.category ?? "fullstack",
    tags: project?.tags.join(", ") ?? "",
    liveUrl: project?.liveUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    thumbnail: project?.thumbnail ?? "",
    color: project?.color ?? "#6366f1",
    featured: project?.featured ?? false,
  });


  // Inside ProjectFormModal
  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload: Omit<Project, "id"> = {
      ...form,
      // Convert string back to Array for the Backend/Project type
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      // Ensure empty strings are handled as undefined if optional
      thumbnail: form.thumbnail.trim() || undefined,
    };

    await onSave(payload);
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="w-full max-w-2xl my-4
                      bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between
                        p-6 border-b border-zinc-100 dark:border-zinc-800"
        >
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {isEdit ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isEdit
                ? "Update project details"
                : "Fill in the project information"}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Project Title *</label>
              <input
                type="text"
                placeholder="My Awesome Project"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Description *</label>
              <textarea
                rows={3}
                placeholder="Brief description of what this project does..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={cn(inputCls, "resize-none")}
                required
              />
            </div>

            {/* Category + Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Category *</label>
                <select
                  value={form.category}
                  // This 'as Category' is the critical bridge
                  onChange={(e) => set("category", e.target.value as Category)}
                  className={inputCls}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Color Accent</label>
                <div className="flex gap-2 flex-wrap pt-1">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => set("color", color)}
                      className={cn(
                        "w-7 h-7 rounded-full transition-all duration-150",
                        form.color === color
                          ? "scale-125 ring-2 ring-offset-2 ring-zinc-900 dark:ring-white"
                          : "hover:scale-110",
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Tags
                <span className="ml-1 font-normal normal-case text-zinc-400">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                className={inputCls}
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Live URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={form.liveUrl}
                  onChange={(e) => set("liveUrl", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={form.githubUrl}
                  onChange={(e) => set("githubUrl", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Thumbnail */}
            {/* Thumbnail */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Thumbnail URL</label>
              <div className="flex gap-3 items-start">
                <input
                  type="text"
                  placeholder="https://... or /images/project.png"
                  value={form.thumbnail}
                  onChange={(e) => set("thumbnail", e.target.value)}
                  className={cn(inputCls, "flex-1")}
                />

                {/* 1. Hidden file input */}
                <input
                  type="file"
                  id="project-image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Creates a temporary local URL for previewing
                      const localUrl = URL.createObjectURL(file);
                      set("thumbnail", localUrl);
                    }
                  }}
                />

                {/* 2. Changed div to label + added htmlFor */}
                <label
                  htmlFor="project-image-upload"
                  className="w-12 h-12 rounded-xl overflow-hidden shrink-0
                 border border-zinc-200 dark:border-zinc-700
                 bg-zinc-100 dark:bg-zinc-800
                 flex items-center justify-center
                 cursor-pointer hover:border-indigo-500 hover:bg-zinc-200 
                 dark:hover:bg-zinc-700 transition-all"
                >
                  {form.thumbnail ? (
                    <Image
                      src={form.thumbnail}
                      alt="preview"
                      width={48} // Required for next/image
                      height={48} // Required for next/image
                      className="w-full h-full object-cover"
                      unoptimized // 2. Crucial: allows any URL/Blob without config errors
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-zinc-400" />
                  )}
                </label>
              </div>
              <p className="text-xs text-zinc-400">
                Paste a URL or click the icon to upload an image.
              </p>
            </div>

            {/* Featured toggle */}
            <div
              className="flex items-center justify-between
                            p-4 rounded-xl
                            bg-zinc-50 dark:bg-zinc-800
                            border border-zinc-200 dark:border-zinc-700"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Featured Project
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Highlighted on the public projects page
                </p>
              </div>

              <button
                type="button"
                onClick={() => set("featured", !form.featured)}
                className={cn(
                  // 1. Flex + items-center handles vertical centering perfectly
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none",
                  form.featured
                    ? "bg-indigo-600"
                    : "bg-zinc-300 dark:bg-zinc-600",
                )}
              >
                <span
                  className={cn(
                    // 2. Remove absolute/top positioning.
                    // 3. Use translate-x-1 (off) and translate-x-6 (on)
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
                    form.featured ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex gap-3 p-6
                          border-t border-zinc-100 dark:border-zinc-800"
          >
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-50 dark:hover:bg-zinc-800
                         transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2
                         py-2.5 rounded-xl text-sm font-medium
                         bg-indigo-600 hover:bg-indigo-700
                         disabled:opacity-60 disabled:cursor-not-allowed
                         text-white transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> {isEdit ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
