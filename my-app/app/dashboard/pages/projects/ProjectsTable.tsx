// "use client";
// import { useState, useMemo } from "react";
// import {
//   Plus,
//   Search,
//   Pencil,
//   Trash2,
//   Star,
//   ExternalLink,
//   ImageIcon,
//   Filter,
//   ChevronUp,
//   ChevronDown,
// } from "lucide-react";
// import { Project, Category } from "@/lib/types/project";
// import { ProjectFormModal } from "./ProjectFormModal";
// import { DeleteConfirmModal } from "./DeleteConfirmModal";
// import { ProjectsStats } from "./ProjectsStats";
// import {
//   dashboardCreateProject,
//   dashboardUpdateProject,
//   dashboardDeleteProject,
// } from "@/lib/services/project.services";
// import { cn } from "@/lib/utils";

// const CATEGORIES: { value: Category | "all"; label: string }[] = [
//   { value: "all", label: "All" },
//   { value: "frontend", label: "Frontend" },
//   { value: "fullstack", label: "Full-Stack" },
//   { value: "backend", label: "Backend" },
//   { value: "mobile", label: "Mobile" },
// ];

// const CATEGORY_COLORS: Record<string, string> = {
//   frontend:
//     "bg-amber-50  dark:bg-amber-950  text-amber-700  dark:text-amber-400",
//   fullstack:
//     "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400",
//   backend: "bg-red-50    dark:bg-red-950    text-red-700    dark:text-red-400",
//   mobile: "bg-pink-50   dark:bg-pink-950   text-pink-700   dark:text-pink-400",
// };

// export function ProjectsTable({ initial }: { initial: Project[] }) {
//   const [projects, setProjects] = useState<Project[]>(initial);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState<Category | "all">("all");
//   const [sortField, setSortField] = useState<"title" | "category">("title");
//   const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
//   const [showForm, setShowForm] = useState(false);
//   const [editProject, setEditProject] = useState<Project | null>(null);
//   const [deleteProject, setDeleteProject] = useState<Project | null>(null);
//   const [toast, setToast] = useState<string | null>(null);

//   // ── Toast helper ──────────────────────────────────────────
//   function showToast(msg: string) {
//     setToast(msg);
//     setTimeout(() => setToast(null), 3000);
//   }

//   // ── Filtered + sorted list ────────────────────────────────
//   const filtered = useMemo(() => {
//     return projects
//       .filter((p) => {
//         const matchCat = category === "all" || p.category === category;
//         const matchSearch =
//           search.trim() === "" ||
//           p.title.toLowerCase().includes(search.toLowerCase()) ||
//           p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
//         return matchCat && matchSearch;
//       })
//       .sort((a, b) => {
//         // FIX: Ensure we are comparing strings safely
//         const valA = (a[sortField] || "").toString().toLowerCase();
//         const valB = (b[sortField] || "").toString().toLowerCase();

//         return sortDir === "asc"
//           ? valA.localeCompare(valB)
//           : valB.localeCompare(valA);
//       });
//   }, [projects, search, category, sortField, sortDir]);
//   // ── Sort toggle ───────────────────────────────────────────
//   function toggleSort(field: "title" | "category") {
//     if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
//     else {
//       setSortField(field);
//       setSortDir("asc");
//     }
//   }

//   // ── CRUD handlers ─────────────────────────────────────────
//   async function handleSave(data: Omit<Project, "id">) {
//     if (editProject) {
//       const updated = await dashboardUpdateProject(editProject.id, data);
//       if (updated) {
//         setProjects((prev) =>
//           prev.map((p) => (p.id === updated.id ? updated : p)),
//         );
//         showToast("Project updated successfully");
//       }
//     } else {
//       const created = await dashboardCreateProject(data);
//       setProjects((prev) => [created, ...prev]);
//       showToast("Project created successfully");
//     }
//     setShowForm(false);
//     setEditProject(null);
//   }

//   async function handleDelete() {
//     if (!deleteProject) return;
//     const ok = await dashboardDeleteProject(deleteProject.id);
//     if (ok) {
//       setProjects((prev) => prev.filter((p) => p.id !== deleteProject.id));
//       showToast("Project deleted");
//     }
//     setDeleteProject(null);
//   }

//   const renderSortIcon = (field: "title" | "category") => {
//     if (sortField !== field)
//       return <ChevronUp className="w-3 h-3 opacity-20" />;
//     return sortDir === "asc" ? (
//       <ChevronUp className="w-3 h-3 text-indigo-500" />
//     ) : (
//       <ChevronDown className="w-3 h-3 text-indigo-500" />
//     );
//   };

//   return (
//     <>
//       {/* ── Stats ── */}
//       <ProjectsStats projects={projects} />

//       {/* ── Toolbar ── */}
//       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//         {/* Search */}
//         <div className="relative flex-1">
//           <Search
//             className="absolute left-3 top-1/2 -translate-y-1/2
//                              w-4 h-4 text-zinc-400 pointer-events-none"
//           />
//           <input
//             type="text"
//             placeholder="Search projects or tags..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
//                        bg-white dark:bg-zinc-900
//                        border border-zinc-200 dark:border-zinc-700
//                        text-zinc-900 dark:text-white
//                        placeholder:text-zinc-400
//                        focus:outline-none focus:ring-2 focus:ring-indigo-500
//                        transition-colors"
//           />
//         </div>

//         {/* Category filter */}
//         <div className="flex items-center gap-2 flex-wrap">
//           <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
//           {CATEGORIES.map((c) => (
//             <button
//               key={c.value}
//               onClick={() => setCategory(c.value)}
//               className={cn(
//                 "px-3 py-2 rounded-xl text-xs font-medium transition-all",
//                 category === c.value
//                   ? "bg-indigo-600 text-white"
//                   : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300",
//               )}
//             >
//               {c.label}
//             </button>
//           ))}
//         </div>

//         {/* Add button */}
//         <button
//           onClick={() => {
//             setEditProject(null);
//             setShowForm(true);
//           }}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-xl
//                      bg-indigo-600 hover:bg-indigo-700
//                      text-white text-sm font-medium
//                      transition-colors shrink-0"
//         >
//           <Plus className="w-4 h-4" />
//           Add Project
//         </button>
//       </div>

//       {/* ── Table ── */}
//       <div
//         className="mt-4 bg-white dark:bg-zinc-900
//                       border border-zinc-200 dark:border-zinc-800
//                       rounded-2xl overflow-hidden"
//       >
//         {/* Table header */}
//         <div
//           className="grid grid-cols-12 gap-4 px-5 py-3
//                         bg-zinc-50 dark:bg-zinc-800/50
//                         border-b border-zinc-200 dark:border-zinc-800
//                         text-xs font-bold text-zinc-500 dark:text-zinc-400
//                         uppercase tracking-wider"
//         >
//           <div className="col-span-1">Image</div>
//           <button
//             className="col-span-4 flex items-center gap-1 text-left"
//             onClick={() => toggleSort("title")}
//           >
//             Title {renderSortIcon("title")}
//           </button>
//           <button
//             className="col-span-2 flex items-center gap-1 text-left"
//             onClick={() => toggleSort("category")}
//           >
//             Category {renderSortIcon("category")}
//           </button>
//           <div className="col-span-3">Tags</div>
//           <div className="col-span-2 text-right">Actions</div>
//         </div>

//         {/* Table rows */}
//         {filtered.length === 0 ? (
//           <div
//             className="flex flex-col items-center justify-center
//                           gap-3 py-16 text-zinc-400"
//           >
//             <Search className="w-8 h-8 opacity-30" />
//             <p className="text-sm">No projects found</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
//             {filtered.map((project) => (
//               <div
//                 key={project.id}
//                 className="grid grid-cols-12 gap-4 px-5 py-4
//                            items-center hover:bg-zinc-50
//                            dark:hover:bg-zinc-800/50
//                            transition-colors duration-150"
//               >
//                 {/* Thumbnail */}
//                 <div className="col-span-1">
//                   <div
//                     className="w-10 h-10 rounded-xl overflow-hidden
//                                   border border-zinc-200 dark:border-zinc-700
//                                   bg-zinc-100 dark:bg-zinc-800
//                                   flex items-center justify-center shrink-0"
//                   >
//                     {project.thumbnail ? (
//                       // eslint-disable-next-line @next/next/no-img-element
//                       <img
//                         src={project.thumbnail}
//                         alt={project.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.currentTarget.style.display = "none";
//                         }}
//                       />
//                     ) : (
//                       <ImageIcon className="w-4 h-4 text-zinc-400" />
//                     )}
//                   </div>
//                 </div>

//                 {/* Title + featured */}
//                 <div className="col-span-4 flex items-center gap-2 min-w-0">
//                   <div
//                     className="w-2 h-2 rounded-full shrink-0"
//                     style={{ backgroundColor: project.color }}
//                   />
//                   <div className="min-w-0">
//                     <p
//                       className="text-sm font-semibold
//                                   text-zinc-900 dark:text-white truncate"
//                     >
//                       {project.title}
//                     </p>
//                     {project.featured && (
//                       <span
//                         className="flex items-center gap-1 text-xs
//                                        text-amber-500"
//                       >
//                         <Star className="w-3 h-3 fill-amber-500" />
//                         Featured
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Category badge */}
//                 <div className="col-span-2">
//                   <span
//                     className={cn(
//                       "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize",
//                       CATEGORY_COLORS[project.category],
//                     )}
//                   >
//                     {project.category}
//                   </span>
//                 </div>

//                 {/* Tags */}
//                 <div className="col-span-3 flex flex-wrap gap-1">
//                   {project.tags.slice(0, 3).map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2 py-0.5 rounded-md text-xs
//                                  bg-zinc-100 dark:bg-zinc-800
//                                  text-zinc-500 dark:text-zinc-400"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                   {project.tags.length > 3 && (
//                     <span
//                       className="px-2 py-0.5 rounded-md text-xs
//                                      text-zinc-400"
//                     >
//                       +{project.tags.length - 3}
//                     </span>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="col-span-2 flex items-center justify-end gap-1.5">
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     title="View live"
//                     className="p-2 rounded-lg text-zinc-400
//                                hover:text-indigo-600 dark:hover:text-indigo-400
//                                hover:bg-indigo-50 dark:hover:bg-indigo-950
//                                transition-all"
//                   >
//                     <ExternalLink className="w-4 h-4" />
//                   </a>
//                   <button
//                     title="Edit"
//                     onClick={() => {
//                       setEditProject(project);
//                       setShowForm(true);
//                     }}
//                     className="p-2 rounded-lg text-zinc-400
//                                hover:text-amber-600 dark:hover:text-amber-400
//                                hover:bg-amber-50 dark:hover:bg-amber-950
//                                transition-all"
//                   >
//                     <Pencil className="w-4 h-4" />
//                   </button>
//                   <button
//                     title="Delete"
//                     onClick={() => setDeleteProject(project)}
//                     className="p-2 rounded-lg text-zinc-400
//                                hover:text-red-600 dark:hover:text-red-400
//                                hover:bg-red-50 dark:hover:bg-red-950
//                                transition-all"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Table footer */}
//         <div
//           className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800
//                         flex items-center justify-between
//                         bg-zinc-50 dark:bg-zinc-800/50"
//         >
//           <p className="text-xs text-zinc-500 dark:text-zinc-400">
//             Showing{" "}
//             <span className="font-semibold text-zinc-700 dark:text-zinc-300">
//               {filtered.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-zinc-700 dark:text-zinc-300">
//               {projects.length}
//             </span>{" "}
//             projects
//           </p>
//           <p className="text-xs text-zinc-400">Last updated just now</p>
//         </div>
//       </div>

//       {/* ── Toast ── */}
//       {toast && (
//         <div
//           className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
//                         px-5 py-3 rounded-xl
//                         bg-zinc-900 dark:bg-white
//                         text-white dark:text-zinc-900
//                         text-sm font-medium shadow-xl
//                         animate-fade-in"
//         >
//           {toast}
//         </div>
//       )}

//       {/* ── Modals ── */}
//       {/* ── Modals ── */}
//       {showForm && (
//         <ProjectFormModal
//           // ADD THE KEY HERE: This resets the form state automatically
//           key={editProject?.id || "new-project"}
//           project={editProject}
//           onSave={handleSave}
//           onCancel={() => {
//             setShowForm(false);
//             setEditProject(null);
//           }}
//         />
//       )}

//       {deleteProject && (
//         <DeleteConfirmModal
//           project={deleteProject}
//           onConfirm={handleDelete}
//           onCancel={() => setDeleteProject(null)}
//         />
//       )}
//     </>
//   );
// }

"use client";
import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  ExternalLink,
  ImageIcon,
  Filter,
  ChevronUp,
  ChevronDown,
  Check,
} from "lucide-react";
import { Project, Category } from "@/lib/types/project";
import { ProjectFormModal } from "./ProjectFormModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { ProjectsStats } from "./ProjectsStats";
import { ProjectDrawer } from "./ProjectDrawer";
import {
  dashboardCreateProject,
  dashboardUpdateProject,
  dashboardDeleteProject,
} from "@/lib/services/project.services";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
];

const CATEGORY_COLORS: Record<string, string> = {
  frontend:
    "bg-amber-50  dark:bg-amber-950  text-amber-700  dark:text-amber-400",
  fullstack:
    "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400",
  backend: "bg-red-50    dark:bg-red-950    text-red-700    dark:text-red-400",
  mobile: "bg-pink-50   dark:bg-pink-950   text-pink-700   dark:text-pink-400",
};

export function ProjectsTable({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initial);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sortField, setSortField] = useState<"title" | "category">("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [drawerProject, setDrawerProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ── Toast ─────────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // ── Filter + sort ──────────────────────────────────────────
  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        const matchCat = category === "all" || p.category === category;
        const matchSearch =
          search.trim() === "" ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        return matchCat && matchSearch;
      })
      .sort((a, b) => {
        const valA = (a[sortField] ?? "").toString().toLowerCase();
        const valB = (b[sortField] ?? "").toString().toLowerCase();
        return sortDir === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [projects, search, category, sortField, sortDir]);

  // ── Sort toggle ───────────────────────────────────────────
  function toggleSort(field: "title" | "category") {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const renderSortIcon = (field: "title" | "category") => {
    if (sortField !== field)
      return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-indigo-500" />
    ) : (
      <ChevronDown className="w-3 h-3 text-indigo-500" />
    );
  };

  // ── CRUD ──────────────────────────────────────────────────
  async function handleSave(data: Omit<Project, "id">) {
    if (editProject) {
      const updated = await dashboardUpdateProject(editProject.id, data);
      if (updated) {
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
        showToast("Project updated successfully");
      }
    } else {
      const created = await dashboardCreateProject(data);
      setProjects((prev) => [created, ...prev]);
      showToast("Project created successfully");
    }
    setShowForm(false);
    setEditProject(null);
  }

  async function handleDelete() {
    if (!deleteProject) return;
    const ok = await dashboardDeleteProject(deleteProject.id);
    if (ok) {
      setProjects((prev) => prev.filter((p) => p.id !== deleteProject.id));
      showToast("Project deleted");
    }
    setDeleteProject(null);
  }

  // ── Open drawer ───────────────────────────────────────────
  function openDrawer(project: Project) {
    setDrawerProject(project);
  }

  // ── Open edit from drawer ─────────────────────────────────
  function handleDrawerEdit(project: Project) {
    setDrawerProject(null);
    setEditProject(project);
    setShowForm(true);
  }

  // ── Open delete from drawer ───────────────────────────────
  function handleDrawerDelete(project: Project) {
    setDrawerProject(null);
    setDeleteProject(project);
  }

  return (
    <>
      {/* ── Stats ── */}
      <ProjectsStats projects={projects} />

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2
                             w-4 h-4 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                       bg-white dark:bg-zinc-900
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-900 dark:text-white
                       placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition-colors"
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium transition-all",
                category === c.value
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Add project */}
        <button
          onClick={() => {
            setEditProject(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                     bg-indigo-600 hover:bg-indigo-700
                     text-white text-sm font-medium
                     transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* ── Table ── */}
      <div
        className="mt-4 bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      rounded-2xl overflow-hidden"
      >
        {/* Table head */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3
                        bg-zinc-50 dark:bg-zinc-800/50
                        border-b border-zinc-200 dark:border-zinc-800
                        text-xs font-bold text-zinc-500 dark:text-zinc-400
                        uppercase tracking-wider"
        >
          <div className="col-span-1">Image</div>
          <button
            className="col-span-4 flex items-center gap-1 text-left
                       hover:text-zinc-700 dark:hover:text-zinc-300
                       transition-colors"
            onClick={() => toggleSort("title")}
          >
            Title {renderSortIcon("title")}
          </button>
          <button
            className="col-span-2 flex items-center gap-1 text-left
                       hover:text-zinc-700 dark:hover:text-zinc-300
                       transition-colors"
            onClick={() => toggleSort("category")}
          >
            Category {renderSortIcon("category")}
          </button>
          <div className="col-span-3">Tags</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table body */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center
                          gap-3 py-20 text-zinc-400"
          >
            <Search className="w-10 h-10 opacity-20" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                No projects found
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filtered.map((project) => (
              <div
                key={project.id}
                onClick={() => openDrawer(project)}
                className="grid grid-cols-12 gap-4 px-5 py-4
                           items-center cursor-pointer
                           hover:bg-zinc-50 dark:hover:bg-zinc-800/40
                           transition-colors duration-150 group"
              >
                {/* Thumbnail */}
                <div className="col-span-1">
                  <div
                    className="w-10 h-10 rounded-xl overflow-hidden shrink-0
                                  border border-zinc-200 dark:border-zinc-700
                                  bg-zinc-100 dark:bg-zinc-800
                                  flex items-center justify-center"
                  >
                    {project.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-4 flex items-center gap-2 min-w-0">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold
                                  text-zinc-900 dark:text-white truncate
                                  group-hover:text-indigo-600
                                  dark:group-hover:text-indigo-400
                                  transition-colors"
                    >
                      {project.title}
                    </p>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-xs text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize",
                      CATEGORY_COLORS[project.category],
                    )}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Tags */}
                <div className="col-span-3 flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs
                                 bg-zinc-100 dark:bg-zinc-800
                                 text-zinc-500 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span
                      className="px-2 py-0.5 rounded-md text-xs
                                     text-zinc-400 dark:text-zinc-500"
                    >
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="View live"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg text-zinc-400
                               hover:text-indigo-600 dark:hover:text-indigo-400
                               hover:bg-indigo-50 dark:hover:bg-indigo-950
                               transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    title="Edit project"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditProject(project);
                      setShowForm(true);
                    }}
                    className="p-2 rounded-lg text-zinc-400
                               hover:text-amber-600 dark:hover:text-amber-400
                               hover:bg-amber-50 dark:hover:bg-amber-950
                               transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    title="Delete project"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteProject(project);
                    }}
                    className="p-2 rounded-lg text-zinc-400
                               hover:text-red-600 dark:hover:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-950
                               transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table footer */}
        <div
          className="px-5 py-3
                        border-t border-zinc-100 dark:border-zinc-800
                        flex items-center justify-between
                        bg-zinc-50 dark:bg-zinc-800/50"
        >
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Showing{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {projects.length}
            </span>{" "}
            projects
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Click any row to view details
          </p>
        </div>
      </div>

      {/* ── Toast notification ── */}

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

      {/* ── Project detail drawer ── */}
      <ProjectDrawer
        project={drawerProject}
        onClose={() => setDrawerProject(null)}
        onEdit={handleDrawerEdit}
        onDelete={handleDrawerDelete}
      />

      {/* ── Add / Edit modal ── */}
      {showForm && (
        <ProjectFormModal
          key={editProject?.id ?? "new"}
          project={editProject}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditProject(null);
          }}
        />
      )}

      {/* ── Delete confirm modal ── */}
      {deleteProject && (
        <DeleteConfirmModal
          project={deleteProject}
          onConfirm={handleDelete}
          onCancel={() => setDeleteProject(null)}
        />
      )}
    </>
  );
}
