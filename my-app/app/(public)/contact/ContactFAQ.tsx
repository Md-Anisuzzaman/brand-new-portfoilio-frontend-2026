'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'How quickly can you start on my project?',
    a: 'I can usually start within 1–3 days of agreeing on scope and terms. For urgent projects, reach out directly via WhatsApp and we can discuss.',
  },
  {
    q: 'Do you work with clients outside your country?',
    a: 'Absolutely. I work with clients worldwide. Communication happens via email, WhatsApp, or video calls — whatever works best for you.',
  },
  {
    q: 'What information do you need to give me a quote?',
    a: 'A rough description of what you need is enough to start. The more detail you provide — features, tech preferences, deadline — the more accurate my estimate will be.',
  },
  {
    q: 'Do you offer ongoing support after the project is done?',
    a: 'Yes. I offer maintenance packages and am available for bug fixes, feature additions and updates after delivery.',
  },
  {
    q: 'What is your payment process?',
    a: 'Typically 50% upfront and 50% on delivery for smaller projects. Larger projects are split into milestones. I accept bank transfer, PayPal and crypto.',
  },
  {
    q: 'Can you work with an existing codebase?',
    a: 'Yes — I regularly join existing projects, fix bugs, refactor code and add new features to codebases I didn\'t start.',
  },
]

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mt-4">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Frequently asked questions
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Quick answers to common questions. Still have one?{' '}
          <a href="mailto:john@example.com"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Just ask.
          </a>
        </p>
      </div>

      {/* FAQ items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={cn(
              'rounded-2xl border transition-colors duration-200 overflow-hidden',
              open === i
                ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
            )}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4
                         px-5 py-4 text-left"
            >
              <span className={cn(
                'text-sm font-semibold leading-snug',
                open === i
                  ? 'text-indigo-700 dark:text-indigo-300'
                  : 'text-zinc-900 dark:text-white'
              )}>
                {faq.q}
              </span>
              <ChevronDown className={cn(
                'w-4 h-4 shrink-0 transition-transform duration-200',
                open === i
                  ? 'rotate-180 text-indigo-500'
                  : 'text-zinc-400'
              )} />
            </button>

            {open === i && (
              <div className="px-5 pb-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}