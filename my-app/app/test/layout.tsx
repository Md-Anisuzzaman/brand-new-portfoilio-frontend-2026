import Link from 'next/link'

const links = [
  { href: '/dashboard',                  label: '🏠 Dashboard' },

  // Manage portfolio pages
  { href: '/dashboard/pages/home',       label: '📄 Home Page' },
  { href: '/dashboard/pages/about',      label: '👤 About Page' },
  { href: '/dashboard/pages/projects',   label: '🗂️ Projects Page' },
  { href: '/dashboard/pages/contact',    label: '📬 Contact Page' },

  // Blog
  { href: '/dashboard/blog',             label: '📝 Blog Posts' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <aside style={{ width: '220px', background: '#1e1e2e', color: '#fff', padding: '16px' }}>
        <h2 style={{ marginBottom: '8px' }}>MyCMS</h2>
        <p style={{ fontSize: '11px', color: '#888', marginBottom: '24px' }}>Portfolio Manager</p>

        <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Pages</p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              color: '#ccc', textDecoration: 'none',
              padding: '8px 12px', borderRadius: '6px', display: 'block', fontSize: '14px'
            }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Quick link to view live site */}
        <div style={{ borderTop: '1px solid #333', paddingTop: '16px' }}>
          <Link href="/" target="_blank" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>
            🌐 View Live Site ↗
          </Link>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{
          height: '56px', background: '#fff', borderBottom: '1px solid #eee',
          display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'flex-end'
        }}>
          <span>Admin</span>
        </header>
        <main style={{ flex: 1, padding: '24px', background: '#f5f5f5', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

    </div>
  )
}