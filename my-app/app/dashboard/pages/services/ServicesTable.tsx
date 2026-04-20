"use client";
import { useState, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  Monitor,
  Server,
  Layers,
  Database,
  Webhook,
  Code2,
  Globe,
  Smartphone,
  Shield,
  Zap,
  Cloud,
  Lock,
  Check,
} from "lucide-react";
import { Service } from "@/lib/types/services";
import { ServiceFormModal } from "./ServiceFormModal";
import { ServiceDeleteModal } from "./ServiceDeleteModal";
import {
  dashboardCreateService,
  dashboardUpdateService,
  dashboardDeleteService,
} from "@/lib/services/service.services";
import { cn } from "@/lib/utils";

// ── Icon map ──────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  Monitor,
  Server,
  Layers,
  Database,
  Webhook,
  Code2,
  Globe,
  Smartphone,
  Shield,
  Zap,
  Cloud,
  Lock,
};

// ── Stats card ────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: number;
  sub?: string;
  color: string;
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
        <Layers className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {label}
        </p>
        {sub && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500">{sub}</p>
        )}
      </div>
    </div>
  );
}

// ── Service row card ──────────────────────────────────────────
function ServiceRow({
  service,
  onEdit,
  onDelete,
}: {
  service: Service;
  onEdit: (s: Service) => void;
  onDelete: (s: Service) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[service.icon] ?? Code2;

  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "rounded-2xl overflow-hidden",
        "transition-all duration-200",
        "hover:border-zinc-300 dark:hover:border-zinc-700",
      )}
    >
      {/* ── Row header ── */}
      <div className="flex items-center gap-4 px-5 py-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl shrink-0
                        flex items-center justify-center"
          style={{ backgroundColor: `${service.color}18` }}
        >
          <Icon className="w-5 h-5" style={{ color: service.color }} />
        </div>

        {/* Title + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
              {service.title}
            </p>
            {service.popular && (
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full
                               text-xs font-semibold
                               bg-indigo-50 dark:bg-indigo-950
                               text-indigo-600 dark:text-indigo-400
                               border border-indigo-200 dark:border-indigo-800"
              >
                <Sparkles className="w-3 h-3" />
                Popular
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
            {service.description.slice(0, 80)}...
          </p>
        </div>

        {/* Tags — desktop only */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          {service.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-xs
                         bg-zinc-100 dark:bg-zinc-800
                         text-zinc-500 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
          {service.tags.length > 3 && (
            <span className="text-xs text-zinc-400">
              +{service.tags.length - 3}
            </span>
          )}
        </div>

        {/* Features count */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-zinc-400">
            {service.features.length} features
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            title={expanded ? "Collapse" : "Expand details"}
            onClick={() => setExpanded((e) => !e)}
            className="p-2 rounded-lg text-zinc-400
                       hover:text-indigo-600 dark:hover:text-indigo-400
                       hover:bg-indigo-50 dark:hover:bg-indigo-950
                       transition-all"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <button
            title="Edit service"
            onClick={() => onEdit(service)}
            className="p-2 rounded-lg text-zinc-400
                       hover:text-amber-600 dark:hover:text-amber-400
                       hover:bg-amber-50 dark:hover:bg-amber-950
                       transition-all"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            title="Delete service"
            onClick={() => onDelete(service)}
            className="p-2 rounded-lg text-zinc-400
                       hover:text-red-600 dark:hover:text-red-400
                       hover:bg-red-50 dark:hover:bg-red-950
                       transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Expanded detail panel ── */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Description */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider
                             text-zinc-400 dark:text-zinc-500 mb-2"
              >
                Description
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider
                             text-zinc-400 dark:text-zinc-500 mb-2"
              >
                Features ({service.features.length})
              </p>
              <ul className="flex flex-col gap-1.5">
                {service.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm
                                         text-zinc-600 dark:text-zinc-400"
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 mt-0.5
                                     flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* All tags */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider
                             text-zinc-400 dark:text-zinc-500 mb-2"
              >
                All Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
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
            </div>

            {/* Meta */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider
                             text-zinc-400 dark:text-zinc-500 mb-2"
              >
                Settings
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-zinc-300
                                  dark:border-zinc-600"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="text-xs font-mono text-zinc-500">
                    {service.color}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="font-mono">Icon:</span>
                  <span>{service.icon}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full font-medium",
                      service.popular
                        ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500",
                    )}
                  >
                    {service.popular ? "★ Popular" : "Not popular"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export function ServicesTable({ initial }: { initial: Service[] }) {
  const [services, setServices] = useState<Service[]>(initial);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [deleteService, setDeleteService] = useState<Service | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ── Toast ─────────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // ── Filtered list ─────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!search.trim()) return services;
    const q = search.toLowerCase();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [services, search]);

  // ── Stats ─────────────────────────────────────────────────
  const popularCount = services.filter((s) => s.popular).length;
  const featureCount = services.reduce((acc, s) => acc + s.features.length, 0);

  // ── CRUD ──────────────────────────────────────────────────
  async function handleSave(data: Omit<Service, "id">) {
    if (editService) {
      const updated = await dashboardUpdateService(editService.id, data);
      if (updated) {
        setServices((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s)),
        );
        showToast("Service updated successfully");
      }
    } else {
      const created = await dashboardCreateService(data);
      setServices((prev) => [...prev, created]);
      showToast("Service created successfully");
    }
    setShowForm(false);
    setEditService(null);
  }

  async function handleDelete() {
    if (!deleteService) return;
    const ok = await dashboardDeleteService(deleteService.id);
    if (ok) {
      setServices((prev) => prev.filter((s) => s.id !== deleteService.id));
      showToast("Service deleted");
    }
    setDeleteService(null);
  }

  return (
    <>
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total Services"
          value={services.length}
          color="#6366f1"
        />
        <StatCard
          label="Popular"
          value={popularCount}
          sub="marked as popular"
          color="#f59e0b"
        />
        <StatCard
          label="Total Features"
          value={featureCount}
          sub="across all services"
          color="#10b981"
        />
        <StatCard
          label="Avg Features"
          value={Math.round(featureCount / Math.max(services.length, 1))}
          sub="per service"
          color="#8b5cf6"
        />
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
            placeholder="Search services, tags, descriptions..."
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

        {/* Add service */}
        <button
          onClick={() => {
            setEditService(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                     bg-indigo-600 hover:bg-indigo-700
                     text-white text-sm font-medium
                     transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* ── Count bar ── */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {services.length}
          </span>{" "}
          services
        </p>
        <p className="text-xs text-zinc-400">
          Click ↓ on any row to expand details
        </p>
      </div>

      {/* ── Service rows ── */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center
                        gap-3 py-20 text-zinc-400
                        bg-white dark:bg-zinc-900
                        border border-zinc-200 dark:border-zinc-800
                        rounded-2xl"
        >
          <Search className="w-10 h-10 opacity-20" />
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              No services found
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Try adjusting your search
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              onEdit={(s) => {
                setEditService(s);
                setShowForm(true);
              }}
              onDelete={(s) => setDeleteService(s)}
            />
          ))}
        </div>
      )}

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

      {/* ── Form modal ── */}
      {showForm && (
        <ServiceFormModal
          key={editService?.id ?? "new-service"}
          service={editService}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditService(null);
          }}
        />
      )}

      {/* ── Delete modal ── */}
      {deleteService && (
        <ServiceDeleteModal
          service={deleteService}
          onConfirm={handleDelete}
          onCancel={() => setDeleteService(null)}
        />
      )}
    </>
  );
}
