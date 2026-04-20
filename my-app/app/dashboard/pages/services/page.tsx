import { Wrench } from 'lucide-react'
import { ServicesTable } from './ServicesTable'
import { dashboardGetServices } from '@/lib/services/service.services'

export default async function DashboardServicesPage() {
  const services = await dashboardGetServices()

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center">
          <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Services
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your public services page content
          </p>
        </div>
      </div>

      <ServicesTable initial={services} />

    </div>
  )
}