export default function Footer() {
  return (
    <footer className="mt-16 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2025 Алекс Морроу. Сделано с душой.
        </p>
        <div className="flex items-center gap-5">
          {['Dribbble', 'LinkedIn', 'Telegram', 'Read.cv'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'var(--text)' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
