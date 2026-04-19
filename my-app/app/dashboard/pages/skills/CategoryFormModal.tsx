'use client'
import { useState} from 'react'
import { X, Loader2, Save } from 'lucide-react'
import { SkillCategory } from '@/lib/types/skill'
import { cn } from '@/lib/utils'

interface Props {
  category?: SkillCategory | null
  onSave:    (data: { id: string; label: string }) => Promise<void>
  onCancel:  () => void
}

const inputCls = cn(
  'w-full px-4 py-2.5 rounded-xl text-sm',
  'bg-zinc-50 dark:bg-zinc-800',
  'border border-zinc-200 dark:border-zinc-700',
  'text-zinc-900 dark:text-white placeholder:text-zinc-400',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
  'transition-colors'
)

const labelCls = 'text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide'

export function CategoryFormModal({ category, onSave, onCancel }: Props) {
  const isEdit = !!category
  const [loading, setLoading] = useState(false)
//   const [label,   setLabel]   = useState('')
//   const [id,      setId]      = useState('')
  const [label, setLabel] = useState(category?.label ?? '');
  const [id, setId] = useState(category?.id ?? '');



  // Auto-generate id from label
  function handleLabelChange(val: string) {
    setLabel(val)
    if (!isEdit) {
      setId(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!label.trim() || !id.trim()) return
    setLoading(true)
    await onSave({ id: id.trim(), label: label.trim() })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            {isEdit ? 'Edit Category' : 'New Category'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400
                       hover:text-zinc-600 hover:bg-zinc-100
                       dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-4">

            {/* Label */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Category Label *</label>
              <input
                type="text"
                placeholder="e.g. Frontend, DevOps, Mobile"
                value={label}
                onChange={e => handleLabelChange(e.target.value)}
                className={inputCls}
                required
              />
            </div>

            {/* ID */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Category ID
                <span className="ml-1 font-normal normal-case text-zinc-400">
                  (auto-generated)
                </span>
              </label>
              <input
                type="text"
                value={id}
                onChange={e => setId(e.target.value)}
                className={cn(inputCls, 'font-mono text-xs')}
                readOnly={isEdit}
                placeholder="e.g. frontend, dev-ops"
              />
              {!isEdit && (
                <p className="text-xs text-zinc-400">
                  Used internally — cannot be changed after creation.
                </p>
              )}
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
                : <><Save className="w-4 h-4" /> {isEdit ? 'Update' : 'Create'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}