"use client";
import { useState, useMemo } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Pencil,
  Trash2,
  Plus,
  Search,
  ImageIcon,
  CheckCircle2,
  Check,
} from "lucide-react";
import { AboutData, Experience, Education, Value } from "@/lib/types/about";
import { HeroModal } from "./HeroModal";
import { ExperienceModal } from "./ExperienceModal";
import { EducationModal } from "./EducationModal";
import { ValueModal } from "./ValueModal";
import { DeleteModal } from "./DeleteModal";
import {
  dashboardUpdateHero,
  dashboardCreateExperience,
  dashboardUpdateExperience,
  dashboardDeleteExperience,
  dashboardCreateEducation,
  dashboardUpdateEducation,
  dashboardDeleteEducation,
  dashboardCreateValue,
  dashboardUpdateValue,
  dashboardDeleteValue,
} from "@/lib/services/about.services";
import { cn } from "@/lib/utils";

// ── Stat card ─────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl
                    bg-white dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────
function SectionHeader({
  icon: Icon,
  title,
  count,
  color,
  onAdd,
  addLabel,
}: {
  icon: React.ElementType;
  title: string;
  count: number;
  color: string;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4
                    border-b border-zinc-100 dark:border-zinc-800
                    bg-zinc-50 dark:bg-zinc-800/50"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {count} {count === 1 ? "entry" : "entries"}
          </p>
        </div>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                   text-xs font-medium transition-colors
                   bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        <Plus className="w-3.5 h-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

// ── Main CMS ──────────────────────────────────────────────────
export function AboutCMS({ initial }: { initial: AboutData }) {
  const [hero, setHero] = useState(initial.hero);
  const [experiences, setExperiences] = useState(initial.experiences);
  const [educations, setEducations] = useState(initial.educations);
  const [values, setValues] = useState(initial.values);
  const [toast, setToast] = useState<string | null>(null);

  // ── Modal state ───────────────────────────────────────────
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);
  const [showEduModal, setShowEduModal] = useState(false);
  const [showValModal, setShowValModal] = useState(false);
  const [editExp, setEditExp] = useState<Experience | null>(null);
  const [editEdu, setEditEdu] = useState<Education | null>(null);
  const [editVal, setEditVal] = useState<Value | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "exp" | "edu" | "val";
    id: string;
    label: string;
  } | null>(null);

  // ── Search state ──────────────────────────────────────────
  const [expSearch, setExpSearch] = useState("");
  const [eduSearch, setEduSearch] = useState("");
  const [valSearch, setValSearch] = useState("");

  // ── Toast helper ──────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // ── Filtered lists ────────────────────────────────────────
  const filteredExps = useMemo(() => {
    if (!expSearch.trim()) return experiences;
    const q = expSearch.toLowerCase();
    return experiences.filter(
      (e) =>
        e.role.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [experiences, expSearch]);

  const filteredEdus = useMemo(() => {
    if (!eduSearch.trim()) return educations;
    const q = eduSearch.toLowerCase();
    return educations.filter(
      (e) =>
        e.degree.toLowerCase().includes(q) ||
        e.school.toLowerCase().includes(q),
    );
  }, [educations, eduSearch]);

  const filteredVals = useMemo(() => {
    if (!valSearch.trim()) return values;
    const q = valSearch.toLowerCase();
    return values.filter(
      (v) =>
        v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q),
    );
  }, [values, valSearch]);

  // ── Hero ──────────────────────────────────────────────────
  async function handleSaveHero(data: Partial<typeof hero>) {
    const updated = await dashboardUpdateHero(data);
    setHero(updated);
    setShowHeroModal(false);
    showToast("Hero section updated");
  }

  // ── Experience CRUD ───────────────────────────────────────
  async function handleSaveExp(data: Omit<Experience, "id">) {
    if (editExp) {
      const updated = await dashboardUpdateExperience(editExp.id, data);
      if (updated)
        setExperiences((prev) =>
          prev.map((e) => (e.id === editExp.id ? updated : e)),
        );
      showToast("Experience updated");
    } else {
      const created = await dashboardCreateExperience(data);
      setExperiences((prev) => [created, ...prev]);
      showToast("Experience added");
    }
    setShowExpModal(false);
    setEditExp(null);
  }

  // ── Education CRUD ────────────────────────────────────────
  async function handleSaveEdu(data: Omit<Education, "id">) {
    if (editEdu) {
      const updated = await dashboardUpdateEducation(editEdu.id, data);
      if (updated)
        setEducations((prev) =>
          prev.map((e) => (e.id === editEdu.id ? updated : e)),
        );
      showToast("Education updated");
    } else {
      const created = await dashboardCreateEducation(data);
      setEducations((prev) => [created, ...prev]);
      showToast("Education added");
    }
    setShowEduModal(false);
    setEditEdu(null);
  }

  // ── Values CRUD ───────────────────────────────────────────
  async function handleSaveVal(data: Omit<Value, "id">) {
    if (editVal) {
      const updated = await dashboardUpdateValue(editVal.id, data);
      if (updated)
        setValues((prev) =>
          prev.map((v) => (v.id === editVal.id ? updated : v)),
        );
      showToast("Value updated");
    } else {
      const created = await dashboardCreateValue(data);
      setValues((prev) => [...prev, created]);
      showToast("Value added");
    }
    setShowValModal(false);
    setEditVal(null);
  }

  // ── Delete ────────────────────────────────────────────────
  async function handleDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.type === "exp") {
      await dashboardDeleteExperience(deleteTarget.id);
      setExperiences((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      showToast("Experience deleted");
    } else if (deleteTarget.type === "edu") {
      await dashboardDeleteEducation(deleteTarget.id);
      setEducations((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      showToast("Education deleted");
    } else {
      await dashboardDeleteValue(deleteTarget.id);
      setValues((prev) => prev.filter((v) => v.id !== deleteTarget.id));
      showToast("Value deleted");
    }
    setDeleteTarget(null);
  }

  return (
    <>
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Experiences"
          value={experiences.length}
          color="#6366f1"
          icon={Briefcase}
        />
        <StatCard
          label="Education"
          value={educations.length}
          color="#10b981"
          icon={GraduationCap}
        />
        <StatCard
          label="Values"
          value={values.length}
          color="#f59e0b"
          icon={Heart}
        />
        <StatCard
          label="Profile"
          value={hero.image ? "✓ Set" : "No image"}
          color="#8b5cf6"
          icon={User}
        />
      </div>

      {/* ── Hero Section Card ── */}
      <div
        className="bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl overflow-hidden"
      >
        <div
          className="flex items-center justify-between px-5 py-4
                        border-b border-zinc-100 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-800/50"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950
                            flex items-center justify-center"
            >
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Hero Section
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Name, title, bio, image
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowHeroModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                       text-xs font-medium
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-700 dark:text-zinc-300
                       hover:border-indigo-300 dark:hover:border-indigo-700
                       hover:text-indigo-600 dark:hover:text-indigo-400
                       transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Hero
          </button>
        </div>

        {/* Hero preview */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full overflow-hidden shrink-0
                            border-2 border-zinc-200 dark:border-zinc-700
                            bg-zinc-100 dark:bg-zinc-800
                            flex items-center justify-center"
            >
              {hero.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <ImageIcon className="w-5 h-5 text-zinc-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                {hero.name}
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                {hero.title}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-400 mb-1">Tagline</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-1">
              {hero.subtitle}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 mb-1">Bio paragraphs</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {hero.bio.length} paragraph{hero.bio.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>📍</span> {hero.location}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>⏱</span> {hero.experience}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              {hero.resumeUrl}
            </div>
          </div>
        </div>
      </div>

      {/* ── Experience Table ── */}
      <div
        className="bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl overflow-hidden"
      >
        <SectionHeader
          icon={Briefcase}
          title="Work Experience"
          count={experiences.length}
          color="#6366f1"
          onAdd={() => {
            setEditExp(null);
            setShowExpModal(true);
          }}
          addLabel="Add Experience"
        />

        {/* Search */}
        <div className="px-5 pt-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2
                               w-4 h-4 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by role, company or tag..."
              value={expSearch}
              onChange={(e) => setExpSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                         bg-zinc-50 dark:bg-zinc-800
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-900 dark:text-white placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-colors"
            />
          </div>
        </div>

        {/* Table header */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 mt-3
                        bg-zinc-50 dark:bg-zinc-800/50
                        border-y border-zinc-100 dark:border-zinc-800
                        text-xs font-bold text-zinc-500 dark:text-zinc-400
                        uppercase tracking-wider"
        >
          <div className="col-span-3">Role</div>
          <div className="col-span-3">Company</div>
          <div className="col-span-2">Period</div>
          <div className="col-span-3">Tags</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filteredExps.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-zinc-400">
            <Briefcase className="w-8 h-8 opacity-20" />
            <p className="text-sm">No experience found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredExps.map((exp) => (
              <div
                key={exp.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center
                           hover:bg-zinc-50 dark:hover:bg-zinc-800/40
                           transition-colors"
              >
                <div className="col-span-3 flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      exp.current
                        ? "bg-indigo-500 animate-pulse"
                        : "bg-zinc-300 dark:bg-zinc-600",
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      {exp.role}
                    </p>
                    {exp.current && (
                      <span className="text-xs text-indigo-500 font-medium">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-3">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">
                    {exp.company}
                  </p>
                  <p className="text-xs text-zinc-400">{exp.type}</p>
                </div>

                <div className="col-span-2">
                  <span
                    className="text-xs text-zinc-500 dark:text-zinc-400
                                   bg-zinc-100 dark:bg-zinc-800
                                   px-2 py-1 rounded-lg"
                  >
                    {exp.period}
                  </span>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1">
                  {exp.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs
                                 bg-zinc-100 dark:bg-zinc-800
                                 text-zinc-500 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {exp.tags.length > 2 && (
                    <span className="text-xs text-zinc-400">
                      +{exp.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button
                    onClick={() => {
                      setEditExp(exp);
                      setShowExpModal(true);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400
                               hover:text-amber-600 dark:hover:text-amber-400
                               hover:bg-amber-50 dark:hover:bg-amber-950
                               transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        type: "exp",
                        id: exp.id,
                        label: exp.role,
                      })
                    }
                    className="p-1.5 rounded-lg text-zinc-400
                               hover:text-red-600 dark:hover:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-950
                               transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-800/50"
        >
          <p className="text-xs text-zinc-400">
            {filteredExps.length} of {experiences.length} entries
          </p>
        </div>
      </div>

      {/* ── Education Table ── */}
      <div
        className="bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl overflow-hidden"
      >
        <SectionHeader
          icon={GraduationCap}
          title="Education"
          count={educations.length}
          color="#10b981"
          onAdd={() => {
            setEditEdu(null);
            setShowEduModal(true);
          }}
          addLabel="Add Education"
        />

        <div className="px-5 pt-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2
                               w-4 h-4 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by degree or school..."
              value={eduSearch}
              onChange={(e) => setEduSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                         bg-zinc-50 dark:bg-zinc-800
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-900 dark:text-white placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-colors"
            />
          </div>
        </div>

        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 mt-3
                        bg-zinc-50 dark:bg-zinc-800/50
                        border-y border-zinc-100 dark:border-zinc-800
                        text-xs font-bold text-zinc-500 dark:text-zinc-400
                        uppercase tracking-wider"
        >
          <div className="col-span-4">Degree</div>
          <div className="col-span-4">School</div>
          <div className="col-span-2">Period</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filteredEdus.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-zinc-400">
            <GraduationCap className="w-8 h-8 opacity-20" />
            <p className="text-sm">No education found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredEdus.map((edu) => (
              <div
                key={edu.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center
                           hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="col-span-4 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {edu.degree}
                  </p>
                  {edu.grade && (
                    <span
                      className="text-xs text-green-600 dark:text-green-400
                                     bg-green-50 dark:bg-green-950/40
                                     px-2 py-0.5 rounded-full font-medium"
                    >
                      {edu.grade}
                    </span>
                  )}
                </div>

                <div className="col-span-4 min-w-0">
                  <p
                    className="text-sm text-indigo-600 dark:text-indigo-400
                                 font-medium truncate"
                  >
                    {edu.school}
                  </p>
                </div>

                <div className="col-span-2">
                  <span
                    className="text-xs text-zinc-500 dark:text-zinc-400
                                   bg-zinc-100 dark:bg-zinc-800
                                   px-2 py-1 rounded-lg"
                  >
                    {edu.period}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-end gap-1">
                  <button
                    onClick={() => {
                      setEditEdu(edu);
                      setShowEduModal(true);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400
                               hover:text-amber-600 dark:hover:text-amber-400
                               hover:bg-amber-50 dark:hover:bg-amber-950 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        type: "edu",
                        id: edu.id,
                        label: edu.degree,
                      })
                    }
                    className="p-1.5 rounded-lg text-zinc-400
                               hover:text-red-600 dark:hover:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-950 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-800/50"
        >
          <p className="text-xs text-zinc-400">
            {filteredEdus.length} of {educations.length} entries
          </p>
        </div>
      </div>

      {/* ── Values Table ── */}
      <div
        className="bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl overflow-hidden"
      >
        <SectionHeader
          icon={Heart}
          title="Values / How I Work"
          count={values.length}
          color="#f59e0b"
          onAdd={() => {
            setEditVal(null);
            setShowValModal(true);
          }}
          addLabel="Add Value"
        />

        <div className="px-5 pt-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2
                               w-4 h-4 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search values..."
              value={valSearch}
              onChange={(e) => setValSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                         bg-zinc-50 dark:bg-zinc-800
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-900 dark:text-white placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-colors"
            />
          </div>
        </div>

        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 mt-3
                        bg-zinc-50 dark:bg-zinc-800/50
                        border-y border-zinc-100 dark:border-zinc-800
                        text-xs font-bold text-zinc-500 dark:text-zinc-400
                        uppercase tracking-wider"
        >
          <div className="col-span-2">Icon</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-6">Description</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filteredVals.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-zinc-400">
            <Heart className="w-8 h-8 opacity-20" />
            <p className="text-sm">No values found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredVals.map((val) => (
              <div
                key={val.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center
                           hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="col-span-2">
                  <div
                    className="w-9 h-9 rounded-xl
                                  bg-indigo-50 dark:bg-indigo-950
                                  flex items-center justify-center"
                  >
                    <span
                      className="text-xs font-mono font-bold
                                     text-indigo-600 dark:text-indigo-400"
                    >
                      {val.icon.slice(0, 2)}
                    </span>
                  </div>
                </div>

                <div className="col-span-3">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {val.title}
                  </p>
                </div>

                <div className="col-span-6">
                  <p
                    className="text-sm text-zinc-500 dark:text-zinc-400
                                 line-clamp-1"
                  >
                    {val.desc}
                  </p>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button
                    onClick={() => {
                      setEditVal(val);
                      setShowValModal(true);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400
                               hover:text-amber-600 dark:hover:text-amber-400
                               hover:bg-amber-50 dark:hover:bg-amber-950 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        type: "val",
                        id: val.id,
                        label: val.title,
                      })
                    }
                    className="p-1.5 rounded-lg text-zinc-400
                               hover:text-red-600 dark:hover:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-950 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-800/50"
        >
          <p className="text-xs text-zinc-400">
            {filteredVals.length} of {values.length} entries
          </p>
        </div>
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

      {/* ── Modals ── */}
      {showHeroModal && (
        <HeroModal
          hero={hero}
          onSave={handleSaveHero}
          onCancel={() => setShowHeroModal(false)}
        />
      )}

      {showExpModal && (
        <ExperienceModal
          key={editExp?.id ?? "new-exp"}
          experience={editExp}
          onSave={handleSaveExp}
          onCancel={() => {
            setShowExpModal(false);
            setEditExp(null);
          }}
        />
      )}

      {showEduModal && (
        <EducationModal
          key={editEdu?.id ?? "new-edu"}
          education={editEdu}
          onSave={handleSaveEdu}
          onCancel={() => {
            setShowEduModal(false);
            setEditEdu(null);
          }}
        />
      )}

      {showValModal && (
        <ValueModal
          key={editVal?.id ?? "new-val"}
          value={editVal}
          onSave={handleSaveVal}
          onCancel={() => {
            setShowValModal(false);
            setEditVal(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          title={`Delete ${deleteTarget.type === "exp" ? "experience" : deleteTarget.type === "edu" ? "education" : "value"}?`}
          desc={`You are about to delete "${deleteTarget.label}". This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
