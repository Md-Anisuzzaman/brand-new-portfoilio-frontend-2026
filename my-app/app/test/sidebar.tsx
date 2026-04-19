import Link from 'next/link'

const links = [
  { href: '/dashboard',          label: 'Dashboard' },
  { href: '/dashboard/posts',    label: 'Posts' },
  { href: '/dashboard/media',    label: 'Media' },
  { href: '/dashboard/users',    label: 'Users' },
  { href: '/dashboard/settings', label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside style={{ width: '200px', background: '#1e1e2e', color: '#fff', padding: '16px' }}>
      <h2 style={{ marginBottom: '24px' }}>MyCMS</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{ color: '#ccc', textDecoration: 'none' }}>
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}