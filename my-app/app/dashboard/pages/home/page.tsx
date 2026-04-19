'use client'

import React, { useState, useRef, ChangeEvent } from 'react'
import { Save, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LabeledInput, LabeledTextarea } from '@/components/ui/LabeledInputs'
// Import the new components


export default function HomeCMS() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    hero: {
      name: 'Ethian Dev',
      title: 'Full Stack Developer',
      bio: 'I build fast, scalable, and beautiful web applications...',
      image: 'https://i.ibb.co/jZwLHrfT/IMG-20260318-213819.png',
    },
    stats: [
      { id: 1, value: '3+', label: 'Years Experience' },
      { id: 2, value: '20+', label: 'Projects Built' },
    ]
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setFormData({ ...formData, hero: { ...formData.hero, image: previewUrl } })
    }
  }

  const handlePublish = async () => {
    setIsSaving(true)
    console.log("Payload ready for Database:", formData)
    await new Promise(res => setTimeout(res, 1000))
    setIsSaving(false)
    alert("Changes Published!")
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Home Manager</h1>
          <p className="text-zinc-500 mt-1">Configure your portfolio landing page content.</p>
        </div>
        <Button onClick={handlePublish} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 px-8 h-11 rounded-xl shadow-lg"><Save/>
          {isSaving ? 'Saving...' : 'Publish Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-600 rounded-full" /> Hero Content
            </h3>
            <LabeledInput 
              label="Public Name"
              value={formData.hero.name}
              onChange={(e) => setFormData({...formData, hero: {...formData.hero, name: e.target.value}})}
            />
            <LabeledInput 
              label="Professional Title"
              value={formData.hero.title}
              onChange={(e) => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})}
            />
            <LabeledTextarea 
              label="Detailed Bio"
              value={formData.hero.bio}
              onChange={(e) => setFormData({...formData, hero: {...formData.hero, bio: e.target.value}})}
            />
          </section>

          {/* Stats Section */}
          <section className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2"><Save/>save changes
                <span className="w-1 h-6 bg-emerald-500 rounded-full" /> Statistics
              </h3>
              <Button variant="ghost" className="text-indigo-600" onClick={() => setFormData({...formData, stats: [...formData.stats, {id: Date.now(), value: '', label: ''}]})}>
                <Plus className="w-4 h-4 mr-1" /> Add Stat
              </Button>
            </div>
            {formData.stats.map((stat) => (
              <div key={stat.id} className="flex gap-4 items-end bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-32">
                  <LabeledInput label="Value" value={stat.value} onChange={(e) => setFormData({...formData, stats: formData.stats.map(s => s.id === stat.id ? {...s, value: e.target.value} : s)})}/>
                </div>
                <div className="flex-1">
                  <LabeledInput label="Label" value={stat.label} onChange={(e) => setFormData({...formData, stats: formData.stats.map(s => s.id === stat.id ? {...s, label: e.target.value} : s)})}/>
                </div>
                <button onClick={() => setFormData({...formData, stats: formData.stats.filter(s => s.id !== stat.id)})} className="mb-2 p-2 text-zinc-300 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </section>
        </div>

        {/* Media Column */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold">Featured Image</h3>
          <div className="relative aspect-square rounded-3xl bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center overflow-hidden group">
            {formData.hero.image ? (
              <>
                <img src={formData.hero.image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all gap-3">
                   <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="rounded-full"><Upload/>Upload New</Button>
                </div>
              </>
            ) : (
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Select Photo</Button>
            )}
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
          </div>
        </section>
      </div>
    </div>
  )
}