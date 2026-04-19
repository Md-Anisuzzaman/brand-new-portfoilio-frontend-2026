import React from 'react';

// ── TYPES ──
interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface LabeledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

// ── COMPONENTS ──

export const LabeledInput = ({ label, className, ...props }: LabeledInputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
      {label}
    </label>
    <input 
      {...props} 
      className={`bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
                 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 
                 text-zinc-900 dark:text-zinc-100 transition-all ${className || ''}`}
    />
  </div>
);

export const LabeledTextarea = ({ label, className, ...props }: LabeledTextareaProps) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
      {label}
    </label>
    <textarea 
      {...props} 
      className={`bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
                 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 
                 text-zinc-900 dark:text-zinc-100 transition-all min-h-30 ${className || ''}`}
    />
  </div>
);