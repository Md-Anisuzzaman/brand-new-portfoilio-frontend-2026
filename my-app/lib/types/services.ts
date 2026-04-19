export interface ServiceFeature {
  text: string
}

export interface Service {
  id: string
  icon: string           // lucide icon name
  title: string
  description: string
  features: ServiceFeature[]
  tags: string[]
  color: string
  popular?: boolean
}