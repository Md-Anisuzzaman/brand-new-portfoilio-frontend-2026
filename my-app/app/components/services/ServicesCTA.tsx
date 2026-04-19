import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export function ServicesCTA() {
  return (
    <div className="mt-16 rounded-2xl overflow-hidden
                    bg-zinc-900 dark:bg-zinc-800">
      <div className="flex flex-col md:flex-row items-center
                      justify-between gap-8 p-10 md:p-14">

        {/* Left */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Not sure what you need?
          </h2>
          <p className="text-zinc-400 max-w-md leading-relaxed">
            Tell me about your project idea — even rough notes are fine.
            I&apos;ll help you figure out the best approach and give you
            an honest assessment.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
            {[
              'Free consultation',
              'Fast response',
              'No commitment',
            ].map(text => (
              <span key={text}
                className="flex items-center gap-1.5 text-sm text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Right — buttons */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       bg-indigo-600 hover:bg-indigo-500
                       text-white font-medium text-sm
                       transition-all duration-150 hover:scale-105"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       bg-zinc-800 dark:bg-zinc-700
                       hover:bg-zinc-700 dark:hover:bg-zinc-600
                       text-zinc-200 font-medium text-sm
                       border border-zinc-700 dark:border-zinc-600
                       transition-all duration-150"
          >
            <MessageCircle className="w-4 h-4" />
            Just Chat
          </Link>
        </div>

      </div>
    </div>
  )
}