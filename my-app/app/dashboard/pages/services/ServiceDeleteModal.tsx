'use client'
import { useState } from 'react'
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react'
import { Service } from '@/lib/types/services'

interface Props {
  service:   Service
  onConfirm: () => Promise<void>
  onCancel:  () => void
}

export function ServiceDeleteModal({ service, onConfirm, onCancel }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    setLoading(true)
    await onConfirm()
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        <div className="flex items-center justify-between p-6 pb-0">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950
                          flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
            Delete service?
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            You are about to delete{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {service.title}
            </span>
            . This will remove it from your public services page. This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-700 dark:text-zinc-300
                       hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2
                       py-2.5 rounded-xl text-sm font-medium
                       bg-red-600 hover:bg-red-700
                       disabled:opacity-60 text-white transition-colors"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</>
              : <><Trash2 className="w-4 h-4" /> Delete</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}