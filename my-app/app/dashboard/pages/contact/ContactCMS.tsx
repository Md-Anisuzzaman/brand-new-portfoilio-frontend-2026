"use client";
import { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
  Pencil,
  Trash2,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { ContactData, FAQ, ContactInfo } from "@/lib/types/contact";
import { ContactInfoModal } from "./ContactInfoModal";
import { FAQModal } from "./FAQModal";
import { DeleteModal } from "./DeleteModal";
import {
  dashboardUpdateInfo,
  dashboardCreateFAQ,
  dashboardUpdateFAQ,
  dashboardDeleteFAQ,
} from "@/lib/services/contact.services";
import { cn } from "@/lib/utils";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/app/components/icon/brandIcons";

// ── Stat card ─────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: string | number;
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
        <p className="text-xl font-bold text-zinc-900 dark:text-white truncate">
          {value}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}

// ── Main CMS ──────────────────────────────────────────────────
export function ContactCMS({ initial }: { initial: ContactData }) {
  const [info, setInfo] = useState<ContactInfo>(initial.info);
  const [faqs, setFaqs] = useState<FAQ[]>(initial.faqs);
  const [toast, setToast] = useState<string | null>(null);
  const [faqSearch, setFaqSearch] = useState("");

  // ── Modal state ───────────────────────────────────────────
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [editFAQ, setEditFAQ] = useState<FAQ | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    label: string;
  } | null>(null);

  // ── Toast ─────────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // ── Filtered FAQs ─────────────────────────────────────────
  const filteredFAQs = useMemo(() => {
    if (!faqSearch.trim()) return faqs;
    const q = faqSearch.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) || // ✅ f.question not f.q
        f.answer.toLowerCase().includes(q), // ✅ f.answer not f.a
    );
  }, [faqs, faqSearch]);

  // ── Info save ─────────────────────────────────────────────
  async function handleSaveInfo(data: Partial<ContactInfo>) {
    const updated = await dashboardUpdateInfo(data);
    setInfo(updated);
    setShowInfoModal(false);
    showToast("Contact info updated");
  }

  // ── FAQ CRUD ──────────────────────────────────────────────
  async function handleSaveFAQ(data: Omit<FAQ, "id" | "order">) {
    if (editFAQ) {
      const updated = await dashboardUpdateFAQ(editFAQ.id, data);
      if (updated) {
        setFaqs((prev) => prev.map((f) => (f.id === editFAQ.id ? updated : f)));
      }
      showToast("FAQ updated");
    } else {
      const created = await dashboardCreateFAQ(data);
      setFaqs((prev) => [...prev, created]);
      showToast("FAQ added");
    }
    setShowFAQModal(false);
    setEditFAQ(null);
  }

  async function handleDeleteFAQ() {
    if (!deleteTarget) return;
    await dashboardDeleteFAQ(deleteTarget.id);
    setFaqs((prev) => prev.filter((f) => f.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("FAQ deleted");
  }

  return (
    <>
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Email"
          value={info.email}
          color="#6366f1"
          icon={Mail}
        />
        <StatCard
          label="FAQs"
          value={faqs.length}
          color="#10b981"
          icon={HelpCircle}
        />
        <StatCard
          label="Social Links"
          value="3 platforms"
          color="#f59e0b"
          icon={MessageCircle}
        />
        <StatCard
          label="Status"
          value={info.available ? "Available" : "Unavailable"}
          color={info.available ? "#10b981" : "#ef4444"}
          icon={info.available ? CheckCircle2 : XCircle}
        />
      </div>

      {/* ── Contact Info Card ── */}
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
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Contact Details
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Email, phone, location, socials and availability
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                       text-xs font-medium
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-700 dark:text-zinc-300
                       hover:border-indigo-300 dark:hover:border-indigo-700
                       hover:text-indigo-600 dark:hover:text-indigo-400
                       transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Info
          </button>
        </div>

        {/* Contact info grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Mail, label: "Email", value: info.email },
            { icon: Phone, label: "Phone", value: info.phone },
            { icon: MapPin, label: "Location", value: info.location },
            { icon: Clock, label: "Response Time", value: info.responseTime },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl shrink-0
                              bg-zinc-100 dark:bg-zinc-800
                              flex items-center justify-center"
              >
                <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {label}
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social links row */}
        <div className="px-5 pb-4">
          <p
            className="text-xs font-semibold text-zinc-400 dark:text-zinc-500
                         uppercase tracking-wider mb-3"
          >
            Social Links
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "GitHub", url: info.socials.github, Icon: GithubIcon },
              {
                label: "LinkedIn",
                url: info.socials.linkedin,
                Icon: LinkedinIcon,
              },
              {
                label: "Twitter",
                url: info.socials.twitter,
                Icon: TwitterIcon,
              },
            ].map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm
                           bg-zinc-100 dark:bg-zinc-800
                           text-zinc-600 dark:text-zinc-400
                           hover:text-indigo-600 dark:hover:text-indigo-400
                           hover:bg-indigo-50 dark:hover:bg-indigo-950
                           transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Availability badge */}
        <div className="px-5 pb-5">
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl w-fit",
              info.available
                ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                : "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700",
            )}
          >
            <span className="relative flex w-2.5 h-2.5 shrink-0">
              {info.available && (
                <span
                  className="animate-ping absolute inline-flex h-full w-full
                                 rounded-full bg-green-400 opacity-75"
                />
              )}
              <span
                className={cn(
                  "relative inline-flex rounded-full w-2.5 h-2.5",
                  info.available ? "bg-green-500" : "bg-zinc-400",
                )}
              />
            </span>
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  info.available
                    ? "text-green-700 dark:text-green-400"
                    : "text-zinc-600 dark:text-zinc-400",
                )}
              >
                {info.available
                  ? "Available for new projects"
                  : "Not available"}
              </p>
              {info.available && (
                <p className="text-xs text-green-600/70 dark:text-green-500">
                  {info.availableText}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ Table ── */}
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
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                FAQ
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {faqs.length} question{faqs.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditFAQ(null);
              setShowFAQModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                       text-xs font-medium transition-colors
                       bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            Add FAQ
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2
                               w-4 h-4 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                         bg-zinc-50 dark:bg-zinc-800
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-900 dark:text-white placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-colors"
            />
          </div>
        </div>

        {/* Table head */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 mt-3
                        bg-zinc-50 dark:bg-zinc-800/50
                        border-y border-zinc-100 dark:border-zinc-800
                        text-xs font-bold text-zinc-500 dark:text-zinc-400
                        uppercase tracking-wider"
        >
          <div className="col-span-1">#</div>
          <div className="col-span-5">Question</div>
          <div className="col-span-5">Answer</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table rows */}
        {filteredFAQs.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-2
                          py-12 text-zinc-400"
          >
            <HelpCircle className="w-8 h-8 opacity-20" />
            <p className="text-sm">No FAQs found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-start
                           hover:bg-zinc-50 dark:hover:bg-zinc-800/40
                           transition-colors"
              >
                {/* Number */}
                <div className="col-span-1">
                  <span
                    className="w-6 h-6 rounded-full text-xs font-bold
                                   bg-indigo-50 dark:bg-indigo-950
                                   text-indigo-600 dark:text-indigo-400
                                   flex items-center justify-center"
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Question — ✅ faq.question */}
                <div className="col-span-5">
                  <p
                    className="text-sm font-semibold
                                 text-zinc-900 dark:text-white
                                 leading-snug line-clamp-2"
                  >
                    {faq.question}
                  </p>
                </div>

                {/* Answer — ✅ faq.answer */}
                <div className="col-span-5">
                  <p
                    className="text-sm text-zinc-500 dark:text-zinc-400
                                 leading-relaxed line-clamp-2"
                  >
                    {faq.answer}
                  </p>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button
                    onClick={() => {
                      setEditFAQ(faq);
                      setShowFAQModal(true);
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
                        id: faq.id,
                        label: faq.question,
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

        {/* Footer */}
        <div
          className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-800/50"
        >
          <p className="text-xs text-zinc-400">
            {filteredFAQs.length} of {faqs.length} FAQs
          </p>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60
                        px-5 py-3 rounded-xl
                        bg-zinc-900 dark:bg-white
                        text-white dark:text-zinc-900
                        text-sm font-medium shadow-xl
                        animate-fade-in whitespace-nowrap"
        >
          {toast}
        </div>
      )}

      {/* ── Modals ── */}
      {showInfoModal && (
        <ContactInfoModal
          info={info}
          onSave={handleSaveInfo}
          onCancel={() => setShowInfoModal(false)}
        />
      )}

      {showFAQModal && (
        <FAQModal
          key={editFAQ?.id ?? "new-faq"}
          faq={editFAQ}
          onSave={handleSaveFAQ}
          onCancel={() => {
            setShowFAQModal(false);
            setEditFAQ(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          title="Delete FAQ?"
          desc={`Delete "${deleteTarget.label.slice(0, 60)}"? This cannot be undone.`}
          onConfirm={handleDeleteFAQ}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
