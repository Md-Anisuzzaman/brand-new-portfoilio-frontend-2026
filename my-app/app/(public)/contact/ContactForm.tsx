"use client";
import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomSelect } from "./CoustomSelect";

type FormState = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
};

const SUBJECTS = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Web App",
  "API Integration",
  "Database Design",
  "Python / Django",
  "General Inquiry",
  "Other",
];

const BUDGETS = [
  "Less than $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
];

// ✅ Moved OUTSIDE ContactForm — fixes the error
const inputClass = (error?: string) =>
  cn(
    "w-full px-4 py-2.5 rounded-xl text-sm",
    "bg-zinc-50 dark:bg-zinc-800/50",
    "border transition-colors duration-150",
    "text-zinc-900 dark:text-white",
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    error
      ? "border-red-400 dark:border-red-500"
      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600",
  );

// ✅ Moved OUTSIDE ContactForm — fixes the error
function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
        {required && <span className="text-indigo-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </span>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────
export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      // ── Replace with real API later ────────────────────────
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // })
      await new Promise((r) => setTimeout(r, 1500));
      setState("success");
      setForm({ name: "", email: "", subject: "", budget: "", message: "" });
    } catch {
      setState("error");
    }
  }

  // ── Success ────────────────────────────────────────────────
  if (state === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4
                      p-12 rounded-2xl text-center
                      bg-green-50 dark:bg-green-950/30
                      border border-green-200 dark:border-green-800"
      >
        <div
          className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50
                        flex items-center justify-center"
        >
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
            Message sent!
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setState("idle")}
          className="text-sm text-indigo-600 dark:text-indigo-400
                     hover:underline font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl
                 bg-white dark:bg-zinc-900
                 border border-zinc-200 dark:border-zinc-800"
    >
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
          Send a message
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Fill in the details below and I&apos;ll respond promptly.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your Name" id="name" required error={errors.name}>
          <input
            id="name"
            type="text"
            placeholder="Ethian Zaman"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Email Address" id="email" required error={errors.email}>
          <input
            id="email"
            type="email"
            placeholder="ethian@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass(errors.email)}
          />
        </Field>
      </div>

      {/* Subject + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* <Field label="Service Needed" id="subject">
          <select
            id="subject"
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            className={inputClass()}
          >
            <option value="">Select a service...</option>
            {SUBJECTS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field> */}

        {/* <Field label="Estimated Budget" id="budget">
          <select
            id="budget"
            value={form.budget}
            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
            className={inputClass()}
          >
            <option value="">Select a budget...</option>
            {BUDGETS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field> */}

        <Field label="Service Needed" id="subject">
          <CustomSelect
            id="subject"
            value={form.subject}
            onChange={(val) => setForm((f) => ({ ...f, subject: val }))}
            options={SUBJECTS}
            placeholder="Select a service..."
          />
        </Field>

        <Field label="Estimated Budget" id="budget">
          <CustomSelect
            id="budget"
            value={form.budget}
            onChange={(val) => setForm((f) => ({ ...f, budget: val }))}
            options={BUDGETS}
            placeholder="Select a budget..."
          />
        </Field>
      </div>

      {/* Message */}
      <Field label="Your Message" id="message" required error={errors.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project — what you need, your timeline, any specific requirements..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(inputClass(errors.message), "resize-none")}
        />
      </Field>

      {/* Error banner */}
      {state === "error" && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl
                        bg-red-50 dark:bg-red-950/30
                        border border-red-200 dark:border-red-800
                        text-sm text-red-600 dark:text-red-400"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex items-center justify-center gap-2
                   w-full py-3 rounded-xl
                   bg-indigo-600 hover:bg-indigo-700
                   disabled:opacity-60 disabled:cursor-not-allowed
                   text-white font-medium text-sm
                   transition-all duration-150 hover:scale-[1.01]"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-center text-zinc-400 dark:text-zinc-500">
        I typically respond within{" "}
        <strong className="text-zinc-600 dark:text-zinc-300">24 hours</strong>.
        Your info is never shared with anyone.
      </p>
    </form>
  );
}
