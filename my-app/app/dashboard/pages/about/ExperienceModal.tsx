'use client'
import { useState } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Experience } from '@/lib/types/about'
import { inputCls, labelCls } from "@/components/ui/shared"
import { cn } from '@/lib/utils'

interface Props {
  experience?: Experience | null
  onSave:      (data: Omit<Experience, 'id'>) => Promise<void>
  onCancel:    () => void
}

export function ExperienceModal({ experience, onSave, onCancel }: Props) {
  const isEdit = !!experience
  const [loading, setLoading] = useState(false)

const [role, setRole] = useState(experience?.role ?? '')
  const [company, setCompany] = useState(experience?.company ?? '')
  const [type, setType] = useState(experience?.type ?? '')
  const [period, setPeriod] = useState(experience?.period ?? '')
  const [current, setCurrent] = useState(experience?.current ?? false)
  const [desc, setDesc] = useState(experience?.description ?? '')
  const [tags, setTags] = useState(experience?.tags.join(', ') ?? '')


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!role.trim() || !company.trim()) return
    setLoading(true)
    await onSave({
      role: role.trim(),
      company: company.trim(),
      type: type.trim(),
      period: period.trim(),
      current,
      description: desc.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl my-4 bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        <div className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              {isEdit ? 'Edit Experience' : 'Add Experience'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isEdit ? 'Update work experience' : 'Add a new work experience'}
            </p>
          </div>
          <button onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Role / Position *</label>
                <input type="text" value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="Full Stack Developer"
                  className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Company *</label>
                <input type="text" value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Tech Corp" className={inputCls} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Type</label>
                <input type="text" value={type}
                  onChange={e => setType(e.target.value)}
                  placeholder="Full-time / Contract / Freelance"
                  className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Period</label>
                <input type="text" value={period}
                  onChange={e => setPeriod(e.target.value)}
                  placeholder="2022 — Present" className={inputCls} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Description</label>
              <textarea rows={3} value={desc}
                onChange={e => {
                  setDesc(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = `${e.target.scrollHeight}px`
                }}
                placeholder="What did you do, what did you achieve..."
                className={cn(inputCls, 'resize-none overflow-hidden')} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Tech Stack Tags
                <span className="ml-1 normal-case font-normal text-zinc-400">
                  (comma separated)
                </span>
              </label>
              <input type="text" value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="React, Node.js, MongoDB" className={inputCls} />
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

            {/* Current toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl
                            bg-zinc-50 dark:bg-zinc-800
                            border border-zinc-200 dark:border-zinc-700">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Current Position
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Shows pulsing dot indicator on public page
                </p>
              </div>

              {/* <button type="button" onClick={() => setCurrent(c => !c)}
                className={cn(
                  'w-12 h-6 rounded-full relative transition-colors duration-200',
                  current ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-600'
                )}>
                <span className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm',
                  'transition-transform duration-200',
                  current ? 'translate-x-7' : 'translate-x-1'
                )} />
              </button> */}

              <button
                type="button"
                onClick={() => setCurrent(c => !c)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none",
                  current ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-600'
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
                  current ? 'translate-x-6' : 'translate-x-1'
                )} />
              </button>


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