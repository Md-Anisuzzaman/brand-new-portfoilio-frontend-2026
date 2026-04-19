export interface Skill {
  name: string
  icon: string        // image path or url
}

export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}