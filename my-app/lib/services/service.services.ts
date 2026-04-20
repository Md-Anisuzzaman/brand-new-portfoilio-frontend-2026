import { Service } from '@/lib/types/services'
import { DEMO_SERVICES } from '@/lib/data/services.demo'

// ─────────────────────────────────────────────────────────────
// Dashboard CRUD — services
// NOW:   in-memory demo store
// LATER: replace each function body with API call
//        Response shape stays identical — zero component changes
// ─────────────────────────────────────────────────────────────

let store: Service[] = JSON.parse(JSON.stringify(DEMO_SERVICES))

export async function dashboardGetServices(): Promise<Service[]> {
  // LATER: return fetch(`${API}/services`).then(r => r.json())
  return JSON.parse(JSON.stringify(store))
}

export async function dashboardCreateService(
  data: Omit<Service, 'id'>
): Promise<Service> {
  // LATER:
  // return fetch(`${API}/services`, {
  //   method: 'POST', body: JSON.stringify(data)
  // }).then(r => r.json())
  const created: Service = {
    ...data,
    id: `service-${Date.now()}`,
  }
  store = [...store, created]
  return created
}

export async function dashboardUpdateService(
  id: string,
  data: Partial<Omit<Service, 'id'>>
): Promise<Service | null> {
  // LATER:
  // return fetch(`${API}/services/${id}`, {
  //   method: 'PUT', body: JSON.stringify(data)
  // }).then(r => r.json())
  const index = store.findIndex(s => s.id === id)
  if (index === -1) return null
  store[index] = { ...store[index], ...data }
  return store[index]
}

export async function dashboardDeleteService(id: string): Promise<boolean> {
  // LATER:
  // return fetch(`${API}/services/${id}`, {
  //   method: 'DELETE'
  // }).then(r => r.ok)
  const before = store.length
  store = store.filter(s => s.id !== id)
  return store.length < before
}

export async function dashboardReorderServices(
  ids: string[]
): Promise<Service[]> {
  // LATER:
  // return fetch(`${API}/services/reorder`, {
  //   method: 'PUT', body: JSON.stringify({ ids })
  // }).then(r => r.json())
  store = ids
    .map(id => store.find(s => s.id === id))
    .filter(Boolean) as Service[]
  return JSON.parse(JSON.stringify(store))
}