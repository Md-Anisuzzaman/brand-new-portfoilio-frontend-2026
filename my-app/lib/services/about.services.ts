

import { AboutData, Experience, Education, Value } from '@/lib/types/about'

import { DEMO_ABOUT } from '@/lib/data/about.demo'

// ─────────────────────────────────────────────────────────────
// Singleton about store
// LATER: delete this, use real DB calls in service layer
// ─────────────────────────────────────────────────────────────

class AboutStore {
  private data: AboutData = JSON.parse(JSON.stringify(DEMO_ABOUT))

  getAll(): AboutData {
    return JSON.parse(JSON.stringify(this.data))
  }

  // ── Hero ────────────────────────────────────────────────
  updateHero(update: Partial<AboutData['hero']>): AboutData['hero'] {
    this.data.hero = { ...this.data.hero, ...update }
    return JSON.parse(JSON.stringify(this.data.hero))
  }

  // ── Experience ──────────────────────────────────────────
  createExperience(exp: Omit<Experience, 'id'>): Experience {
    const created: Experience = { ...exp, id: `exp-${Date.now()}` }
    this.data.experiences = [created, ...this.data.experiences]
    return JSON.parse(JSON.stringify(created))
  }

  updateExperience(id: string, update: Partial<Omit<Experience, 'id'>>): Experience | null {
    const index = this.data.experiences.findIndex(e => e.id === id)
    if (index === -1) return null
    this.data.experiences[index] = { ...this.data.experiences[index], ...update }
    return JSON.parse(JSON.stringify(this.data.experiences[index]))
  }

  deleteExperience(id: string): boolean {
    const before = this.data.experiences.length
    this.data.experiences = this.data.experiences.filter(e => e.id !== id)
    return this.data.experiences.length < before
  }

  // ── Education ───────────────────────────────────────────
  createEducation(edu: Omit<Education, 'id'>): Education {
    const created: Education = { ...edu, id: `edu-${Date.now()}` }
    this.data.educations = [created, ...this.data.educations]
    return JSON.parse(JSON.stringify(created))
  }

  updateEducation(id: string, update: Partial<Omit<Education, 'id'>>): Education | null {
    const index = this.data.educations.findIndex(e => e.id === id)
    if (index === -1) return null
    this.data.educations[index] = { ...this.data.educations[index], ...update }
    return JSON.parse(JSON.stringify(this.data.educations[index]))
  }

  deleteEducation(id: string): boolean {
    const before = this.data.educations.length
    this.data.educations = this.data.educations.filter(e => e.id !== id)
    return this.data.educations.length < before
  }

  // ── Values ──────────────────────────────────────────────
  createValue(val: Omit<Value, 'id'>): Value {
    const created: Value = { ...val, id: `val-${Date.now()}` }
    this.data.values = [...this.data.values, created]
    return JSON.parse(JSON.stringify(created))
  }

  updateValue(id: string, update: Partial<Omit<Value, 'id'>>): Value | null {
    const index = this.data.values.findIndex(v => v.id === id)
    if (index === -1) return null
    this.data.values[index] = { ...this.data.values[index], ...update }
    return JSON.parse(JSON.stringify(this.data.values[index]))
  }

  deleteValue(id: string): boolean {
    const before = this.data.values.length
    this.data.values = this.data.values.filter(v => v.id !== id)
    return this.data.values.length < before
  }
}

export const aboutStore = new AboutStore()
// ─────────────────────────────────────────────────────────────
// LATER: replace each body with fetch() to your API
// ─────────────────────────────────────────────────────────────

export async function dashboardGetAbout(): Promise<AboutData> {
  return aboutStore.getAll()
}

export async function dashboardUpdateHero(
  data: Partial<AboutData['hero']>
): Promise<AboutData['hero']> {
  return aboutStore.updateHero(data)
}

export async function dashboardCreateExperience(
  data: Omit<Experience, 'id'>
): Promise<Experience> {
  return aboutStore.createExperience(data)
}

export async function dashboardUpdateExperience(
  id: string,
  data: Partial<Omit<Experience, 'id'>>
): Promise<Experience | null> {
  return aboutStore.updateExperience(id, data)
}

export async function dashboardDeleteExperience(id: string): Promise<boolean> {
  return aboutStore.deleteExperience(id)
}

export async function dashboardCreateEducation(
  data: Omit<Education, 'id'>
): Promise<Education> {
  return aboutStore.createEducation(data)
}

export async function dashboardUpdateEducation(
  id: string,
  data: Partial<Omit<Education, 'id'>>
): Promise<Education | null> {
  return aboutStore.updateEducation(id, data)
}

export async function dashboardDeleteEducation(id: string): Promise<boolean> {
  return aboutStore.deleteEducation(id)
}

export async function dashboardCreateValue(
  data: Omit<Value, 'id'>
): Promise<Value> {
  return aboutStore.createValue(data)
}

export async function dashboardUpdateValue(
  id: string,
  data: Partial<Omit<Value, 'id'>>
): Promise<Value | null> {
  return aboutStore.updateValue(id, data)
}

export async function dashboardDeleteValue(id: string): Promise<boolean> {
  return aboutStore.deleteValue(id)
}