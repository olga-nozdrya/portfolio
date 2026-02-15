import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-lg w-full text-center">
        <div
          className="text-[150px] font-bold leading-none mb-4 select-none"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', opacity: 0.1 }}
        >
          404
        </div>
        <div
          className="-mt-14 relative rounded-3xl border p-10 shadow-soft-lg"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="text-5xl mb-4">🔍</div>
          <h1
            className="text-3xl font-semibold mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            Здесь ничего нет.
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
            Эта страница ушла в отпуск и не оставила адрес для писем. Давай вернёмся на правильный путь.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--accent)', boxShadow: '0 4px 16px rgba(255,92,0,0.3)' }}
            >
              ← К работам
            </Link>
            <a
              href="mailto:alex@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold border transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--bg)' }}
            >
              Написать мне
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
