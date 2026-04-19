export default function EditAboutPage() {
  return (
    <div>
      <h1>Edit About Page</h1>
      <p>Changes here will appear on <strong>/about</strong></p>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label>Page Title</label><br />
          <input defaultValue="About Me" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div>
          <label>About Text</label><br />
          <textarea rows={6} defaultValue="I am a developer based in..." style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div>
          <label>Skills (comma separated)</label><br />
          <input defaultValue="React, Next.js, Node.js, TypeScript" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <button style={{ padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Save Changes
        </button>
      </div>
    </div>
  )
}