export interface ContactInfo {
  email:        string
  phone:        string
  location:     string
  responseTime: string
  available:    boolean
  availableText: string
  socials: {
    github:   string
    linkedin: string
    twitter:  string
  }
}

export interface FAQ {
  id:       string
  question: string
  answer:   string
  order:    number
}

export interface ContactData {
  info: ContactInfo
  faqs: FAQ[]
}