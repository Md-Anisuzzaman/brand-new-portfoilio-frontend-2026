'use client'
import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Value } from '@/lib/types/about'
import { inputCls, labelCls } from "@/components/ui/shared"
import { cn } from '@/lib/utils'

const AVAILABLE_ICONS = [
  'Code2', 'Zap', 'Users', 'Shield', 'RefreshCw',
  'MessageSquare', 'Star', 'Globe', 'Lock',
  'Heart', 'Target', 'Cpu', 'Rocket', 'Award',
]

interface Props {
  value?:   Value | null
  onSave:   (data: Omit<Value, 'id'>) => Promise<void>
  onCancel: () => void
}

export function ValueModal({ value, onSave, onCancel }: Props) {
  const isEdit = !!value
  const [loading, setLoading] = useState(false)
  const [title,   setTitle]   = useState('')
  const [desc,    setDesc]    = useState('')
  const [icon,    setIcon]    = useState('Code2')

  useEffect(() => {
    if (value) {
      setTitle(value.title)
      setDesc(value.desc)
      setIcon(value.icon)
    } else {
      setTitle(''); setDesc(''); setIcon('Code2')
    }
  }, [value])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !desc.trim()) return
    setLoading(true)
    await onSave({ title: title.trim(), desc: desc.trim(), icon })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        <div className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              {isEdit ? 'Edit Value' : 'Add Value'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Working principle shown on about page
            </p>
          </div>
          <button onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Title *</label>
              <input type="text" value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Clean Code" className={inputCls} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Description *</label>
              <textarea rows={3} value={desc}
                onChange={e => {
                  setDesc(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = `${e.target.scrollHeight}px`
                }}
                placeholder="Short explanation of this value..."
                className={cn(inputCls, 'resize-none overflow-hidden')} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelCls}>Icon</label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_ICONS.map(ic => (
                  <button key={ic} type="button" onClick={() => setIcon(ic)}
                    className={cn(
                      'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
                      icon === ic
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    )}>
                    {ic}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-400">
                Selected: <span className="font-mono text-indigo-500">{icon}</span>
              </p>
            </div>

          </div>

          <div className="flex gap-3 p-6 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2
                         py-2.5 rounded-xl text-sm font-medium
                         bg-indigo-600 hover:bg-indigo-700
                         disabled:opacity-60 text-white transition-colors">
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                : <><Save className="w-4 h-4" /> {isEdit ? 'Update' : 'Add'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}