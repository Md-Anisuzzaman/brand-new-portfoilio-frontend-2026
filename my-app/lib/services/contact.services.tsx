import { ContactData, ContactInfo, FAQ } from '@/lib/types/contact'
import { DEMO_CONTACT } from '@/lib/data/contact.demo'

// ─────────────────────────────────────────────────────────────
// Same pattern as projects/skills/services
// In-memory — no separate store file
// LATER: replace each function body with fetch() to your API
// ─────────────────────────────────────────────────────────────

const store: ContactData = JSON.parse(JSON.stringify(DEMO_CONTACT))

export async function dashboardGetContact(): Promise<ContactData> {
  // LATER: return fetch(`${API}/contact`).then(r => r.json())
  return JSON.parse(JSON.stringify(store))
}

export async function dashboardUpdateInfo(
  data: Partial<ContactInfo>
): Promise<ContactInfo> {
  // LATER:
  // return fetch(`${API}/contact/info`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // }).then(r => r.json())
  store.info = { ...store.info, ...data }
  return JSON.parse(JSON.stringify(store.info))
}

export async function dashboardCreateFAQ(
  data: Omit<FAQ, 'id' | 'order'>
): Promise<FAQ> {
  // LATER:
  // return fetch(`${API}/contact/faqs`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // }).then(r => r.json())
  const created: FAQ = {
    ...data,
    id:    `faq-${Date.now()}`,
    order: store.faqs.length + 1,
  }
  store.faqs = [...store.faqs, created]
  return JSON.parse(JSON.stringify(created))
}

export async function dashboardUpdateFAQ(
  id:   string,
  data: Partial<Omit<FAQ, 'id'>>
): Promise<FAQ | null> {
  // LATER:
  // return fetch(`${API}/contact/faqs/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // }).then(r => r.json())
  const index = store.faqs.findIndex(f => f.id === id)
  if (index === -1) return null
  store.faqs[index] = { ...store.faqs[index], ...data }
  return JSON.parse(JSON.stringify(store.faqs[index]))
}

export async function dashboardDeleteFAQ(id: string): Promise<boolean> {
  // LATER:
  // return fetch(`${API}/contact/faqs/${id}`, {
  //   method: 'DELETE',
  // }).then(r => r.ok)
  const before = store.faqs.length
  store.faqs = store.faqs.filter(f => f.id !== id)
  return store.faqs.length < before
}