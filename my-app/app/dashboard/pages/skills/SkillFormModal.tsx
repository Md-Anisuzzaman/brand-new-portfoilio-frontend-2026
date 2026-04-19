'use client'
import { useState} from 'react'
import { X, Loader2, Save, ImageIcon } from 'lucide-react'
import { Skill, SkillCategory } from '@/lib/types/skill'
import { cn } from '@/lib/utils'

interface Props {
  skill?:       Skill | null          // null = create
  categoryId:   string
  categories:   SkillCategory[]
  onSave:       (categoryId: string, skill: Skill, oldName?: string) => Promise<void>
  onCancel:     () => void
}

const inputCls = cn(
  'w-full px-4 py-2.5 rounded-xl text-sm',
  'bg-zinc-50 dark:bg-zinc-800',
  'border border-zinc-200 dark:border-zinc-700',
  'text-zinc-900 dark:text-white',
  'placeholder:text-zinc-400',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
  'transition-colors'
)

const labelCls = 'text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide'

export function SkillFormModal({
  skill, categoryId, categories, onSave, onCancel,
}: Props) {
  const isEdit = !!skill
  const [loading,    setLoading]    = useState(false)
  const [name,       setName]       = useState(skill?.name ?? '')
  const [icon,       setIcon]       = useState(skill?.icon ?? '')
  const [selCatId,   setSelCatId]   = useState(categoryId)
  const [iconError,  setIconError]  = useState(false)

//   useEffect(() => {
//     if (skill) {
//       setName(skill.name)
//       setIcon(skill.icon)
//     }
//     setSelCatId(categoryId)
//   }, [skill, categoryId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !icon.trim()) return
    setLoading(true)
    await onSave(
      selCatId,
      { name: name.trim(), icon: icon.trim() },
      isEdit ? skill!.name : undefined
    )
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              {isEdit ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isEdit ? 'Update skill details' : 'Add a skill to a category'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400
                       hover:text-zinc-600 hover:bg-zinc-100
                       dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-5">

            {/* Category selector */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Category *</label>
              <select
                value={selCatId}
                onChange={e => setSelCatId(e.target.value)}
                className={inputCls}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Skill name */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Skill Name *</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, Docker"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputCls}
                required
              />
            </div>

            {/* Icon URL + preview */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Icon URL *</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="https://cdn.jsdelivr.net/..."
                  value={icon}
                  onChange={e => { setIcon(e.target.value); setIconError(false) }}
                  className={cn(inputCls, 'flex-1')}
                  required
                />
                {/* Live preview */}
                <div className="w-12 h-12 rounded-xl shrink-0
                                border border-zinc-200 dark:border-zinc-700
                                bg-zinc-100 dark:bg-zinc-800
                                flex items-center justify-center overflow-hidden">
                  {icon && !iconError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={icon}
                      alt={name}
                      className="w-8 h-8 object-contain"
                      onError={() => setIconError(true)}
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Use devicon CDN:{' '}
                <code className="text-indigo-500 text-xs">
                  cdn.jsdelivr.net/gh/devicons/devicon/icons/[name]/[name]-original.svg
                </code>
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 pt-0">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-50 dark:hover:bg-zinc-800
                         transition-colors"
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
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                : <><Save className="w-4 h-4" /> {isEdit ? 'Update' : 'Add Skill'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}