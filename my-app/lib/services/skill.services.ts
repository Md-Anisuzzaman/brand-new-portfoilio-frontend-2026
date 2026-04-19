import { DEMO_SKILLS } from "../data/skills.demo"
import { Skill, SkillCategory } from "../types/skill"

// // lib/services/skill.service.ts
// export async function fetchSkills(): Promise<SkillCategory[]> {
//   if (!process.env.NEXT_PUBLIC_API_URL) {
//     return DEMO_SKILLS              // demo
//   }
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
//   return res.json()                 // real API
// }



// ─────────────────────────────────────────────────────────────
// Dashboard CRUD — skills
// NOW:   in-memory demo store
// LATER: replace each function body with real API call
//        shape stays identical — zero component changes needed
// ─────────────────────────────────────────────────────────────

let store: SkillCategory[] = JSON.parse(JSON.stringify(DEMO_SKILLS))

// ── GET all categories ─────────────────────────────────────
export async function dashboardGetSkills(): Promise<SkillCategory[]> {
  // LATER: return fetch(`${API}/skills`).then(r => r.json())
  return JSON.parse(JSON.stringify(store))
}

// ── CREATE category ────────────────────────────────────────
export async function dashboardCreateCategory(
  data: Omit<SkillCategory, 'skills'>
): Promise<SkillCategory> {
  // LATER:
  // return fetch(`${API}/skills/categories`, {
  //   method: 'POST', body: JSON.stringify(data)
  // }).then(r => r.json())
  const newCat: SkillCategory = { ...data, skills: [] }
  store = [...store, newCat]
  return newCat
}

// ── UPDATE category ────────────────────────────────────────
export async function dashboardUpdateCategory(
  id: string,
  data: Partial<Omit<SkillCategory, 'skills'>>
): Promise<SkillCategory | null> {
  // LATER:
  // return fetch(`${API}/skills/categories/${id}`, {
  //   method: 'PUT', body: JSON.stringify(data)
  // }).then(r => r.json())
  const index = store.findIndex(c => c.id === id)
  if (index === -1) return null
  store[index] = { ...store[index], ...data }
  return store[index]
}

// ── DELETE category ────────────────────────────────────────
export async function dashboardDeleteCategory(id: string): Promise<boolean> {
  // LATER:
  // return fetch(`${API}/skills/categories/${id}`, {
  //   method: 'DELETE'
  // }).then(r => r.ok)
  const before = store.length
  store = store.filter(c => c.id !== id)
  return store.length < before
}

// ── CREATE skill inside category ───────────────────────────
export async function dashboardCreateSkill(
  categoryId: string,
  data: Skill
): Promise<SkillCategory | null> {
  // LATER:
  // return fetch(`${API}/skills/categories/${categoryId}/skills`, {
  //   method: 'POST', body: JSON.stringify(data)
  // }).then(r => r.json())
  const index = store.findIndex(c => c.id === categoryId)
  if (index === -1) return null
  store[index] = {
    ...store[index],
    skills: [...store[index].skills, data],
  }
  return store[index]
}

// ── UPDATE skill inside category ───────────────────────────
export async function dashboardUpdateSkill(
  categoryId: string,
  skillName:  string,
  data:       Partial<Skill>
): Promise<SkillCategory | null> {
  // LATER:
  // return fetch(`${API}/skills/categories/${categoryId}/skills/${skillName}`, {
  //   method: 'PUT', body: JSON.stringify(data)
  // }).then(r => r.json())
  const catIndex = store.findIndex(c => c.id === categoryId)
  if (catIndex === -1) return null
  store[catIndex] = {
    ...store[catIndex],
    skills: store[catIndex].skills.map(s =>
      s.name === skillName ? { ...s, ...data } : s
    ),
  }
  return store[catIndex]
}

// ── DELETE skill inside category ───────────────────────────
export async function dashboardDeleteSkill(
  categoryId: string,
  skillName:  string
): Promise<boolean> {
  // LATER:
  // return fetch(`${API}/skills/categories/${categoryId}/skills/${skillName}`, {
  //   method: 'DELETE'
  // }).then(r => r.ok)
  const index = store.findIndex(c => c.id === categoryId)
  if (index === -1) return false
  const before = store[index].skills.length
  store[index] = {
    ...store[index],
    skills: store[index].skills.filter(s => s.name !== skillName),
  }
  return store[index].skills.length < before
}