'use client'
import { useState } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { ContactInfo } from '@/lib/types/contact'
import { cn } from '@/lib/utils'

const inputCls = cn(
  'w-full px-4 py-2.5 rounded-xl text-sm',
  'bg-zinc-50 dark:bg-zinc-800',
  'border border-zinc-200 dark:border-zinc-700',
  'text-zinc-900 dark:text-white placeholder:text-zinc-400',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
  'transition-colors'
)

const labelCls =
  'text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide'

interface Props {
  info:     ContactInfo
  onSave:   (data: Partial<ContactInfo>) => Promise<void>
  onCancel: () => void
}

export function ContactInfoModal({ info, onSave, onCancel }: Props) {
  const [loading,       setLoading]       = useState(false)
  const [email,         setEmail]         = useState(info.email)
  const [phone,         setPhone]         = useState(info.phone)
  const [location,      setLocation]      = useState(info.location)
  const [responseTime,  setResponseTime]  = useState(info.responseTime)
  const [available,     setAvailable]     = useState(info.available)
  const [availableText, setAvailableText] = useState(info.availableText)
  const [github,        setGithub]        = useState(info.socials.github)
  const [linkedin,      setLinkedin]      = useState(info.socials.linkedin)
  const [twitter,       setTwitter]       = useState(info.socials.twitter)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await onSave({
      email:         email.trim(),
      phone:         phone.trim(),
      location:      location.trim(),
      responseTime:  responseTime.trim(),
      available,
      availableText: availableText.trim(),
      socials: {
        github:   github.trim(),
        linkedin: linkedin.trim(),
        twitter:  twitter.trim(),
      },
    })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl my-4 bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Edit Contact Info
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Update contact details and social links
            </p>
          </div>
          <button onClick={onCancel}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Email Address *</label>
                <input type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Phone / WhatsApp</label>
                <input type="text" value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 234 567 890"
                  className={inputCls} />
              </div>
            </div>

            {/* Location + Response time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Location</label>
                <input type="text" value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Available Worldwide"
                  className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Response Time</label>
                <input type="text" value={responseTime}
                  onChange={e => setResponseTime(e.target.value)}
                  placeholder="Within 24 hours"
                  className={inputCls} />
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <p className={labelCls}>Social Links</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-zinc-500 w-16 shrink-0">
                    GitHub
                  </span>
                  <input type="url" value={github}
                    onChange={e => setGithub(e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className={inputCls} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-zinc-500 w-16 shrink-0">
                    LinkedIn
                  </span>
                  <input type="url" value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/yourusername"
                    className={inputCls} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-zinc-500 w-16 shrink-0">
                    Twitter
                  </span>
                  <input type="url" value={twitter}
                    onChange={e => setTwitter(e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                    className={inputCls} />
                </div>
              </div>
            </div>

            {/* Availability toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl
                            bg-zinc-50 dark:bg-zinc-800
                            border border-zinc-200 dark:border-zinc-700">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Available for Projects
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Shows pulsing green badge on contact page
                </p>
              </div>
              <button type="button"
                onClick={() => setAvailable(a => !a)}
                className={cn(
                  'w-12 h-6 rounded-full relative transition-colors duration-200',
                  available ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-600'
                )}>
                <span className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm',
                  'transition-transform duration-200',
                  available ? 'translate-x-7' : 'translate-x-1'
                )} />
              </button>
            </div>

            {/* Availability text */}
            {available && (
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Availability Message</label>
                <input type="text" value={availableText}
                  onChange={e => setAvailableText(e.target.value)}
                  placeholder="Currently accepting work for Q2 2025"
                  className={inputCls} />
              </div>
            )}

          </div>

          {/* Footer */}
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
                : <><Save className="w-4 h-4" /> Save Changes</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}