'use client'
import { useState } from 'react'
import { X, Loader2, Save, Plus, Trash2, GripVertical } from 'lucide-react'
import { Service, ServiceFeature } from '@/lib/types/services'
import { cn } from '@/lib/utils'

const ICONS = [
  'Monitor', 'Server', 'Layers', 'Database',
  'Webhook', 'Code2', 'Globe', 'Smartphone',
  'Shield', 'Zap', 'Cloud', 'Lock',
]

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#10b981',
  '#06b6d4', '#f59e0b', '#ef4444', '#f97316',
  '#84cc16', '#14b8a6', '#3b82f6', '#a855f7',
]

interface Props {
  service?:  Service | null
  onSave:    (data: Omit<Service, 'id'>) => Promise<void>
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

export function ServiceFormModal({ service, onSave, onCancel }: Props) {
  const isEdit = !!service
  const [loading,   setLoading]   = useState(false)
  // const [title,     setTitle]     = useState('')
  // const [desc,      setDesc]      = useState('')
  // const [icon,      setIcon]      = useState('Monitor')
  // const [color,     setColor]     = useState('#6366f1')
  // const [popular,   setPopular]   = useState(false)
  // const [tags,      setTags]      = useState('')
  // const [features,  setFeatures]  = useState<ServiceFeature[]>([{ text: '' }])

  
  
  const [title, setTitle] = useState(service?.title ?? '')
  const [desc, setDesc] = useState(service?.description ?? '')
  const [icon, setIcon] = useState(service?.icon ?? 'Monitor')
  const [color, setColor] = useState(service?.color ?? '#6366f1')
  const [popular, setPopular] = useState(service?.popular ?? false)
  const [tags, setTags] = useState(service?.tags.join(', ') ?? '')
  const [features, setFeatures] = useState<ServiceFeature[]>(
    service?.features && service.features.length > 0 
      ? service.features 
      : [{ text: '' }]
  )

  // Populate when editing
  // useEffect(() => {
  //   if (service) {
  //     setTitle(service.title)
  //     setDesc(service.description)
  //     setIcon(service.icon)
  //     setColor(service.color)
  //     setPopular(service.popular ?? false)
  //     setTags(service.tags.join(', '))
  //     setFeatures(
  //       service.features.length > 0
  //         ? service.features
  //         : [{ text: '' }]
  //     )
  //   }
  // }, [service])

  // ── Feature list helpers ───────────────────────────────────
  function addFeature() {
    setFeatures(prev => [...prev, { text: '' }])
  }

  function updateFeature(index: number, val: string) {
    setFeatures(prev =>
      prev.map((f, i) => i === index ? { text: val } : f)
    )
  }

  function removeFeature(index: number) {
    if (features.length === 1) return
    setFeatures(prev => prev.filter((_, i) => i !== index))
  }

  // ── Submit ─────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !desc.trim()) return
    setLoading(true)
    await onSave({
      title:       title.trim(),
      description: desc.trim(),
      icon,
      color,
      popular,
      tags:     tags.split(',').map(t => t.trim()).filter(Boolean),
      features: features.filter(f => f.text.trim() !== ''),
    })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl my-4
                      bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800 sticky top-0
                        bg-white dark:bg-zinc-900 rounded-t-2xl z-10">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              {isEdit ? 'Edit Service' : 'Add New Service'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isEdit ? 'Update service details' : 'Add a service to your public page'}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Service Title *</label>
              <input
                type="text"
                placeholder="e.g. Frontend Development"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputCls}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Description *</label>
              <textarea
                rows={3}
                placeholder="What does this service include? Who is it for?"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                className={cn(inputCls, 'resize-none')}
                required
              />
            </div>

            {/* Icon + Color row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Icon picker */}
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Icon</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map(ic => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIcon(ic)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                        icon === ic
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      )}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color picker */}
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Accent Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      title={c}
                      className={cn(
                        'w-7 h-7 rounded-full transition-all duration-150',
                        color === c
                          ? 'scale-125 ring-2 ring-offset-2 ring-zinc-900 dark:ring-white'
                          : 'hover:scale-110'
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                {/* Preview */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}18` }}>
                    <div className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }} />
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{color}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Tags
                <span className="ml-1 normal-case font-normal text-zinc-400">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                placeholder="React, Node.js, TypeScript"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className={inputCls}
              />
              {/* Tag preview */}
              {tags && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium
                                 bg-zinc-100 dark:bg-zinc-800
                                 text-zinc-600 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className={labelCls}>
                  Features
                  <span className="ml-1 normal-case font-normal text-zinc-400">
                    ({features.filter(f => f.text.trim()).length} items)
                  </span>
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-1.5 text-xs font-medium
                             text-indigo-600 dark:text-indigo-400
                             hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add feature
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-zinc-300
                                             dark:text-zinc-600 shrink-0" />
                    <input
                      type="text"
                      placeholder={`Feature ${i + 1}...`}
                      value={feature.text}
                      onChange={e => updateFeature(i, e.target.value)}
                      className={cn(inputCls, 'flex-1')}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      disabled={features.length === 1}
                      className="p-2 rounded-lg text-zinc-400
                                 hover:text-red-500 hover:bg-red-50
                                 dark:hover:bg-red-950
                                 disabled:opacity-30 disabled:cursor-not-allowed
                                 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl
                            bg-zinc-50 dark:bg-zinc-800
                            border border-zinc-200 dark:border-zinc-700">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Mark as Popular
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Shows &quot;Most Popular&quot; badge on public page
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPopular(p => !p)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none",
                  popular ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-600'
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
                  popular ? 'translate-x-6' : 'translate-x-1'
                )} />
              </button>
            </div>

          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6
                          border-t border-zinc-100 dark:border-zinc-800">
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