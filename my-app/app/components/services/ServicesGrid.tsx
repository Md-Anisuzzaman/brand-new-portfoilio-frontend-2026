'use client'
import { Service } from '@/lib/types/services'
import {ServiceCard} from "@/app/components/services/ServiceCard";
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const INITIAL_COUNT = 3

export function ServicesGrid({ services }: { services: Service[] }) {
  const [showAll, setShowAll] = useState(false)

  const visible  = showAll ? services : services.slice(0, INITIAL_COUNT)
  const hasMore  = services.length > INITIAL_COUNT

  return (
    <div className="flex flex-col gap-8">

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((service, i) => (
          <div
            key={service.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* ── See More / See Less button ── */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(s => !s)}
            className="flex items-center gap-2
                       px-8 py-3 rounded-full text-sm font-medium
                       border-2 border-zinc-200 dark:border-zinc-700
                       text-zinc-600 dark:text-zinc-400
                       hover:border-indigo-400 dark:hover:border-indigo-500
                       hover:text-indigo-600 dark:hover:text-indigo-400
                       transition-all duration-150"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                See More Services
                <span className="px-2 py-0.5 rounded-full text-xs
                                 bg-indigo-50 dark:bg-indigo-950
                                 text-indigo-600 dark:text-indigo-400
                                 border border-indigo-200 dark:border-indigo-800">
                  +{services.length - INITIAL_COUNT}
                </span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  )
}