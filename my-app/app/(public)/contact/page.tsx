import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'
import { ContactFAQ } from './ContactFAQ'
import { MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Contact — John Dev',
  description: 'Get in touch for project inquiries, collaborations or just a chat.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

        {/* ── Header — same pattern as all other pages ── */}
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                            flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400
                             uppercase tracking-wider">
              Get in touch
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold
                         text-zinc-900 dark:text-white mb-4">
            Let&apos;s work together
          </h1>

          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Have a project in mind, a question, or just want to say hello?
            I&apos;m always open to new opportunities. Fill the form or reach me
            directly — I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>

        {/* ── FAQ ── */}
        <ContactFAQ />

      </div>
    </div>
  )
}