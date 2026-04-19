import { Briefcase } from 'lucide-react'
import { ServicesGrid } from '../../components/services/ServicesGrid'
import { ServicesCTA } from '../../components/services/ServicesCTA'
import { DEMO_SERVICES } from '@/lib/data/services.demo'

export const metadata = {
  title: 'Services — John Dev',
  description:
    'Full-stack development services — frontend, backend, database design, API integration and more.',
}

export default function ServicesPage() {
  // Later: const services = await fetchServices()
  const services = DEMO_SERVICES

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                            flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400
                             uppercase tracking-wider">
              What I offer
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold
                         text-zinc-900 dark:text-white mb-4">
            Services
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            From a simple landing page to a complete web application with
            authentication, database and admin panel — I handle the full stack
            so you don&apos;t have to juggle multiple developers.
          </p>
        </div>

        {/* Services grid */}
        <ServicesGrid services={services} />

        {/* CTA */}
        <ServicesCTA />

      </div>
    </div>
  )
}