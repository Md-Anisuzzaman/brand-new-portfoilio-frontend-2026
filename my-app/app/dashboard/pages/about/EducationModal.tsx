'use client'
import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Education } from '@/lib/types/about'
import { inputCls, labelCls } from "@/components/ui/shared"
import { cn } from '@/lib/utils'

interface Props {
  education?: Education | null
  onSave:     (data: Omit<Education, 'id'>) => Promise<void>
  onCancel:   () => void
}

export function EducationModal({ education, onSave, onCancel }: Props) {
  const isEdit = !!education
  const [loading, setLoading] = useState(false)
  const [degree,  setDegree]  = useState('')
  const [school,  setSchool]  = useState('')
  const [period,  setPeriod]  = useState('')
  const [desc,    setDesc]    = useState('')
  const [grade,   setGrade]   = useState('')

  useEffect(() => {
    if (education) {
      setDegree(education.degree)
      setSchool(education.school)
      setPeriod(education.period)
      setDesc(education.description)
      setGrade(education.grade ?? '')
    } else {
      setDegree(''); setSchool(''); setPeriod(''); setDesc(''); setGrade('')
    }
  }, [education])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!degree.trim() || !school.trim()) return
    setLoading(true)
    await onSave({
      degree: degree.trim(),
      school: school.trim(),
      period: period.trim(),
      description: desc.trim(),
      grade: grade.trim() || undefined,
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
              {isEdit ? 'Edit Education' : 'Add Education'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isEdit ? 'Update education entry' : 'Add a new education entry'}
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
                <label className={labelCls}>Degree / Certificate *</label>
                <input type="text" value={degree}
                  onChange={e => setDegree(e.target.value)}
                  placeholder="BSc Computer Science"
                  className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>School / Platform *</label>
                <input type="text" value={school}
                  onChange={e => setSchool(e.target.value)}
                  placeholder="University of Tech"
                  className={inputCls} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Period</label>
                <input type="text" value={period}
                  onChange={e => setPeriod(e.target.value)}
                  placeholder="2016 — 2020" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Grade / Result</label>
                <input type="text" value={grade}
                  onChange={e => setGrade(e.target.value)}
                  placeholder="First Class Honours" className={inputCls} />
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
                placeholder="What did you study, notable projects..."
                className={cn(inputCls, 'resize-none overflow-hidden')} />
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