'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  const scrollTo = (id: string) => {
    if (pathname !== '/') {
      router.push('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-3.5">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:rotate-12"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <span
              className="text-white font-bold text-sm"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              А
            </span>
          </div>
          <span className="text-sm font-semibold tracking-tight hidden sm:block" style={{ color: 'var(--text)' }}>
            Алекс Морроу
          </span>
        </Link>

        {/* Nav pills */}
        <div
          className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl border shadow-soft"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          {[
            { label: 'Работы', action: () => router.push('/') },
            { label: 'Обо мне', action: () => scrollTo('about-anchor') },
            { label: 'Контакт', action: () => scrollTo('contact-anchor') },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="px-3 py-1.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--bg)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-soft transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            aria-label="Сменить тему"
          >
            {theme === 'light' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          <button
            onClick={() => scrollTo('contact-anchor')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'var(--accent)', boxShadow: '0 4px 16px rgba(255,92,0,0.3)' }}
          >
            Нанять меня
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
