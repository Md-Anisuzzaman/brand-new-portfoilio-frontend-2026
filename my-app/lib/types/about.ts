export interface AboutHero {
  name:       string
  title:      string
  subtitle:   string
  bio:        string[]
  image:      string | null
  resumeUrl:  string
  location:   string
  experience: string
}

export interface Experience {
  id:           string
  role:         string
  company:      string
  type:         string
  period:       string
  current:      boolean
  description:  string
  tags:         string[]
}

export interface Education {
  id:          string
  degree:      string
  school:      string
  period:      string
  description: string
  grade?:      string
}

export interface Value {
  id:    string
  icon:  string
  title: string
  desc:  string
}

export interface AboutData {
  hero:        AboutHero
  experiences: Experience[]
  educations:  Education[]
  values:      Value[]
}