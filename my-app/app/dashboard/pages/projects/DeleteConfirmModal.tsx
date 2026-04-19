'use client'
import { useState } from 'react'
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react'
import { Project } from '@/lib/types/project'

interface Props {
  // Make project optional so it doesn't crash the Skills page
  project?:   Project 
  // Add title as an optional standalone string for Skills/Categories
  title?:     string
  onConfirm:  () => Promise<void>
  onCancel:   () => void
}

export function DeleteConfirmModal({ project, title, onConfirm, onCancel }: Props) {
  const [loading, setLoading] = useState(false)

  // Determine the display name: priority to 'title' prop, then project.title
  const displayName = title || project?.title || 'this item'

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

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950
                          flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600
                       hover:bg-zinc-100 dark:hover:bg-zinc-800
                       transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
            Confirm Deletion
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {displayName}
            </span>
            ? This action cannot be undone.
          </p>
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
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2
                       py-2.5 rounded-xl text-sm font-medium
                       bg-red-600 hover:bg-red-700
                       disabled:opacity-60 disabled:cursor-not-allowed
                       text-white transition-colors"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</>
            ) : (
              <><Trash2 className="w-4 h-4" /> Delete</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}