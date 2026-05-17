import Hero from '@/app/components/Hero'
import OurStory from '@/app/components/OurStory'

export default function Home() {
  return (
    <main className="bg-[#F5F1EC]" style={{ margin: 0, padding: 0, gap: 0 }}>
      <Hero />
      <OurStory />
      <footer style={{
        background: '#F5F1EC',
        borderTop: '1px solid #E8E0D0',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}>
        <a href="mailto:lifeingrid01@gmail.com" style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: '#999',
          letterSpacing: 1,
          textDecoration: 'none',
        }}>
          lifeingrid01@gmail.com
        </a>
        <a href="tel:+9779869604267" style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: '#999',
          letterSpacing: 1,
          textDecoration: 'none',
        }}>
          +977 9869604267
        </a>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#aaa', letterSpacing: 1 }}>powered by</span>
          <a href="https://www.sambandha.co" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/sambandha-logo.png" alt="Sambandha" style={{ height: 40, width: 'auto', opacity: 0.7 }} />
          </a>
        </div>
      </footer>
    </main>
  )
}
