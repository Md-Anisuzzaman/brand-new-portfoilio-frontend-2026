"use client";
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FolderPlus,
  ChevronDown,
  ChevronRight,
  ImageIcon,
  Code2,
  Search,
  Check,
} from "lucide-react";
import { SkillCategory, Skill } from "@/lib/types/skill";
import { SkillFormModal } from "./SkillFormModal";
import { CategoryFormModal } from "./CategoryFormModal";
import { DeleteConfirmModal } from "../projects/DeleteConfirmModal";
import {
  dashboardCreateCategory,
  dashboardUpdateCategory,
  dashboardDeleteCategory,
  dashboardCreateSkill,
  dashboardUpdateSkill,
  dashboardDeleteSkill,
} from "@/lib/services/skill.services";

// Reuse Project type for delete modal — just needs id + title
type DeleteTarget =
  | { type: "category"; id: string; title: string }
  | { type: "skill"; categoryId: string; name: string; title: string };

export function SkillsTable({ initial }: { initial: SkillCategory[] }) {
  const [categories, setCategories] = useState<SkillCategory[]>(initial);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(initial.map((c) => c.id)), // all open by default
  );
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Modal state
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [editSkillCatId, setEditSkillCatId] = useState("");
  const [editCategory, setEditCategory] = useState<SkillCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // ── Toast ─────────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // ── Toggle expand ──────────────────────────────────────────
  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);

      // Change ternary to if/else
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  // ── Filtered categories ────────────────────────────────────
  const filtered = categories
    .map((cat) => ({
      ...cat,
      skills: search.trim()
        ? cat.skills.filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase()),
          )
        : cat.skills,
    }))
    .filter((cat) =>
      search.trim()
        ? cat.skills.length > 0 ||
          cat.label.toLowerCase().includes(search.toLowerCase())
        : true,
    );

  // ── Stats ──────────────────────────────────────────────────
  const totalSkills = categories.reduce((acc, c) => acc + c.skills.length, 0);

  // ── Category CRUD ──────────────────────────────────────────
  async function handleSaveCategory(data: { id: string; label: string }) {
    if (editCategory) {
      const updated = await dashboardUpdateCategory(editCategory.id, {
        label: data.label,
      });
      if (updated) {
        setCategories((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c)),
        );
        showToast("Category updated");
      }
    } else {
      const created = await dashboardCreateCategory(data);
      setCategories((prev) => [...prev, created]);
      setExpanded((prev) => new Set([...prev, created.id]));
      showToast("Category created");
    }
    setShowCatForm(false);
    setEditCategory(null);
  }

  // ── Skill CRUD ─────────────────────────────────────────────
  async function handleSaveSkill(
    categoryId: string,
    skill: Skill,
    oldName?: string,
  ) {
    if (editSkill && oldName) {
      const updated = await dashboardUpdateSkill(categoryId, oldName, skill);
      if (updated) {
        setCategories((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c)),
        );
        showToast("Skill updated");
      }
    } else {
      const updated = await dashboardCreateSkill(categoryId, skill);
      if (updated) {
        setCategories((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c)),
        );
        showToast("Skill added");
      }
    }
    setShowSkillForm(false);
    setEditSkill(null);
  }

  // ── Delete handler ─────────────────────────────────────────
  async function handleDelete() {
    if (!deleteTarget) return;

    if (deleteTarget.type === "category") {
      const ok = await dashboardDeleteCategory(deleteTarget.id);
      if (ok) {
        setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        showToast("Category deleted");
      }
    } else {
      const ok = await dashboardDeleteSkill(
        deleteTarget.categoryId,
        deleteTarget.name,
      );
      if (ok) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === deleteTarget.categoryId
              ? {
                  ...c,
                  skills: c.skills.filter((s) => s.name !== deleteTarget.name),
                }
              : c,
          ),
        );
        showToast("Skill deleted");
      }
    }
    setDeleteTarget(null);
  }

  return (
    <>
      {/* ── Stats bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div
          className="flex flex-col gap-3 p-4 rounded-2xl
                        bg-white dark:bg-zinc-900
                        border border-zinc-200 dark:border-zinc-800"
        >
          <div
            className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950
                          flex items-center justify-center"
          >
            <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {totalSkills}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Total Skills
            </p>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 p-4 rounded-2xl
                        bg-white dark:bg-zinc-900
                        border border-zinc-200 dark:border-zinc-800"
        >
          <div
            className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950
                          flex items-center justify-center"
          >
            <FolderPlus className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {categories.length}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Categories
            </p>
          </div>
        </div>

        <div
          className="hidden sm:flex flex-col gap-3 p-4 rounded-2xl
                        bg-white dark:bg-zinc-900
                        border border-zinc-200 dark:border-zinc-800"
        >
          <div
            className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-950
                          flex items-center justify-center"
          >
            <ImageIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {Math.round(totalSkills / Math.max(categories.length, 1))}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Avg per category
            </p>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2
                             w-4 h-4 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                       bg-white dark:bg-zinc-900
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-900 dark:text-white placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition-colors"
          />
        </div>

        {/* Add category */}
        <button
          onClick={() => {
            setEditCategory(null);
            setShowCatForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                     border border-zinc-200 dark:border-zinc-700
                     bg-white dark:bg-zinc-900
                     text-zinc-700 dark:text-zinc-300 text-sm font-medium
                     hover:border-indigo-300 dark:hover:border-indigo-700
                     transition-colors shrink-0"
        >
          <FolderPlus className="w-4 h-4" />
          Add Category
        </button>

        {/* Add skill */}
        <button
          onClick={() => {
            setEditSkill(null);
            setEditSkillCatId(categories[0]?.id ?? "");
            setShowSkillForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                     bg-indigo-600 hover:bg-indigo-700
                     text-white text-sm font-medium
                     transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* ── Categories accordion ── */}
      <div className="flex flex-col gap-3">
        {filtered.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-zinc-900
                       border border-zinc-200 dark:border-zinc-800
                       rounded-2xl overflow-hidden"
          >
            {/* Category header */}
            <div
              className="flex items-center justify-between px-5 py-4
                            border-b border-zinc-100 dark:border-zinc-800
                            bg-zinc-50 dark:bg-zinc-800/50"
            >
              <button
                onClick={() => toggleExpand(category.id)}
                className="flex items-center gap-3 flex-1 text-left group"
              >
                {expanded.has(category.id) ? (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
                <span
                  className="font-semibold text-zinc-900 dark:text-white
                                 group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                 transition-colors"
                >
                  {category.label}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium
                                 bg-zinc-200 dark:bg-zinc-700
                                 text-zinc-600 dark:text-zinc-300"
                >
                  {category.skills.length}
                </span>
              </button>

              {/* Category actions */}
              <div className="flex items-center gap-1">
                <button
                  title="Add skill to this category"
                  onClick={() => {
                    setEditSkill(null);
                    setEditSkillCatId(category.id);
                    setShowSkillForm(true);
                  }}
                  className="p-2 rounded-lg text-zinc-400
                             hover:text-indigo-600 dark:hover:text-indigo-400
                             hover:bg-indigo-50 dark:hover:bg-indigo-950
                             transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  title="Edit category"
                  onClick={() => {
                    setEditCategory(category);
                    setShowCatForm(true);
                  }}
                  className="p-2 rounded-lg text-zinc-400
                             hover:text-amber-600 dark:hover:text-amber-400
                             hover:bg-amber-50 dark:hover:bg-amber-950
                             transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  title="Delete category"
                  onClick={() =>
                    setDeleteTarget({
                      type: "category",
                      id: category.id,
                      title: category.label,
                    })
                  }
                  className="p-2 rounded-lg text-zinc-400
                             hover:text-red-600 dark:hover:text-red-400
                             hover:bg-red-50 dark:hover:bg-red-950
                             transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Skills grid */}
            {expanded.has(category.id) && (
              <div className="p-5">
                {category.skills.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center
                                  py-8 gap-2 text-zinc-400"
                  >
                    <Code2 className="w-8 h-8 opacity-20" />
                    <p className="text-sm">No skills yet</p>
                    <button
                      onClick={() => {
                        setEditSkill(null);
                        setEditSkillCatId(category.id);
                        setShowSkillForm(true);
                      }}
                      className="text-xs text-indigo-600 dark:text-indigo-400
                                 hover:underline font-medium"
                    >
                      Add the first skill
                    </button>
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3
                                  md:grid-cols-4 lg:grid-cols-6 gap-3"
                  >
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative flex flex-col items-center
                                   gap-2.5 p-3 rounded-xl
                                   border border-zinc-200 dark:border-zinc-700
                                   bg-zinc-50 dark:bg-zinc-800
                                   hover:border-indigo-200 dark:hover:border-indigo-800
                                   transition-all duration-150"
                      >
                        {/* Skill icon */}
                        <div className="w-10 h-10 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        {/* Skill name */}
                        <span
                          className="text-xs font-medium text-center
                                         text-zinc-600 dark:text-zinc-400
                                         leading-tight"
                        >
                          {skill.name}
                        </span>

                        {/* Hover actions */}
                        <div
                          className="absolute inset-0 rounded-xl
                                        bg-zinc-900/80 dark:bg-zinc-950/85
                                        flex items-center justify-center gap-2
                                        opacity-0 group-hover:opacity-100
                                        transition-opacity duration-200"
                        >
                          <button
                            title="Edit skill"
                            onClick={() => {
                              setEditSkill(skill);
                              setEditSkillCatId(category.id);
                              setShowSkillForm(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/10
                                       hover:bg-amber-500 text-white
                                       transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete skill"
                            onClick={() =>
                              setDeleteTarget({
                                type: "skill",
                                categoryId: category.id,
                                name: skill.name,
                                title: skill.name,
                              })
                            }
                            className="p-1.5 rounded-lg bg-white/10
                                       hover:bg-red-500 text-white
                                       transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center
                          gap-3 py-20 text-zinc-400"
          >
            <Code2 className="w-10 h-10 opacity-20" />
            <p className="text-sm font-medium">No categories found</p>
          </div>
        )}
      </div>

      {/* ── Toast ── */}

      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-100
               flex items-center gap-3 px-5 py-3 rounded-2xl
               bg-zinc-900 dark:bg-white
               text-white dark:text-zinc-900
               text-sm font-semibold shadow-2xl
               animate-in fade-in slide-in-from-top-4 duration-300
               whitespace-nowrap border border-white/10 dark:border-zinc-200"
        >
          {/* The Tick Icon */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500">
            <Check className="w-3.5 h-3.5 stroke-[3px]" />
          </div>

          <span>{toast}</span>
        </div>
      )}

      {/* ── Skill form modal ── */}
      {showSkillForm && (
        <SkillFormModal
          key={editSkill?.name ?? "new-skill"}
          skill={editSkill}
          categoryId={editSkillCatId}
          categories={categories}
          onSave={handleSaveSkill}
          onCancel={() => {
            setShowSkillForm(false);
            setEditSkill(null);
          }}
        />
      )}

      {/* ── Category form modal ── */}
      {showCatForm && (
        <CategoryFormModal
          key={editCategory?.id ?? "new-cat"}
          category={editCategory}
          onSave={handleSaveCategory}
          onCancel={() => {
            setShowCatForm(false);
            setEditCategory(null);
          }}
        />
      )}

      {/* ── Delete confirm ── */}

      {deleteTarget && (
        <DeleteConfirmModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
