"use client";
import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { FAQ } from "@/lib/types/contact";
import { cn } from "@/lib/utils";

const inputCls = cn(
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-zinc-50 dark:bg-zinc-800",
  "border border-zinc-200 dark:border-zinc-700",
  "text-zinc-900 dark:text-white placeholder:text-zinc-400",
  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
  "transition-colors",
);

const labelCls =
  "text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide";

interface Props {
  faq?: FAQ | null;
  onSave: (data: Omit<FAQ, "id" | "order">) => Promise<void>;
  onCancel: () => void;
}

export function FAQModal({ faq, onSave, onCancel }: Props) {
  const isEdit = !!faq;
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(faq?.question || "");
  const [answer, setAnswer] = useState(faq?.answer || "");

  // // ✅ uses correct field names: question, answer (not q, a)
  // useEffect(() => {
  //   if (faq) {
  //     setQuestion(faq.question);
  //     setAnswer(faq.answer);
  //   } else {
  //     setQuestion("");
  //     setAnswer("");
  //   }
  // }, [faq]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setLoading(true);
    await onSave({
      question: question.trim(),
      answer: answer.trim(),
    });
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl"
      >
        <div
          className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800"
        >
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              {isEdit ? "Edit FAQ" : "Add FAQ"}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isEdit
                ? "Update question and answer"
                : "Add a new frequently asked question"}
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

        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Question *</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="How quickly can you start on my project?"
                className={inputCls}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Answer *</label>
              <textarea
                rows={4}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Write a clear, helpful answer..."
                className={cn(inputCls, "resize-none overflow-hidden")}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2
                         py-2.5 rounded-xl text-sm font-medium
                         bg-indigo-600 hover:bg-indigo-700
                         disabled:opacity-60 text-white transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> {isEdit ? "Update" : "Add FAQ"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
