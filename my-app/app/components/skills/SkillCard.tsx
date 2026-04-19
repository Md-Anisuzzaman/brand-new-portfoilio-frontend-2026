'use client'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  name: string
  icon: string
}

export function SkillCard({ name, icon }: Props) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl
                    bg-white dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    hover:border-indigo-200 dark:hover:border-indigo-800
                    hover:-translate-y-1 hover:shadow-md
                    hover:shadow-zinc-100 dark:hover:shadow-zinc-900
                    transition-all duration-200 group cursor-default">

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center
                      transition-transform duration-200 group-hover:scale-110">
        {imgError ? (
          // ✅ Fallback — first 2 letters of name
          <div className="w-12 h-12 rounded-xl
                          bg-indigo-50 dark:bg-indigo-950
                          flex items-center justify-center
                          text-indigo-600 dark:text-indigo-400
                          text-sm font-bold">
            {name.slice(0, 2).toUpperCase()}
          </div>
        ) : (
          <Image
            src={icon}
            alt={name}
            width={48}
            height={48}
            className="object-contain w-full h-full"
            onError={() => setImgError(true)}   // ✅ safe inside client component
          />
        )}
      </div>

      {/* Name */}
      <span className="text-xs font-medium text-center leading-tight
                       text-zinc-600 dark:text-zinc-400
                       group-hover:text-zinc-900 dark:group-hover:text-white
                       transition-colors duration-200">
        {name}
      </span>
    </div>
  )
}