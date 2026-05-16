import { MessageCircle } from 'lucide-react'
import { ContactCMS } from './ContactCMS'
import { dashboardGetContact } from '@/lib/services/contact.services'


export default async function DashboardContactPage() {
  const contact = await dashboardGetContact()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Contact Page
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage contact info, social links and FAQs
          </p>
        </div>
      </div>

      <ContactCMS initial={contact} />
    </div>
  )
}