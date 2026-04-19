import Link from 'next/link'
import { Mail, Phone, MapPin, Zap, ArrowRight } from 'lucide-react'
import { footerConfig } from './footer-config'
import BackToTop from './BackToTop'


export function Footer() {
  const { brand, pages, services, socials, stack } = footerConfig
  const year = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
      {/* ── Top Section: CTA ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Ready to start a project?</h2>
            <p className="text-zinc-500 max-w-md">Currently available for freelance work and full-time opportunities.</p>
          </div>
          <Link 
            href="/contact" 
            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition-all font-medium"
          >
            Get in touch 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Middle Section: Links ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed">{brand.bio}</p>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-indigo-500 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navigation</h3>
            <ul className="space-y-4">
              {pages.map((page) => (
                <li key={page.label}>
                  <Link href={page.href} className="flex items-center gap-2 hover:text-white transition-colors group">
                    <page.icon className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4 text-sm">
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="hover:text-white transition-colors">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-semibold">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-500" /> {brand.email}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-500" /> {brand.phone}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-500" /> {brand.location}
              </li>
            </ul>
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {stack.map(tech => (
                <span key={tech} className="px-2 py-1 bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-500 rounded border border-zinc-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-zinc-950 border-t border-zinc-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {year} {brand.name}. All rights reserved. Built with 
            <span className="text-red-500 mx-1">❤</span> using Next.js.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}