import Link from 'next/link'

interface CaseCardProps {
  href: string
  title: string
  category: string
  year: string
  description: string
  accent: string
  tags: string[]
  emoji?: string
}

export default function CaseCard({
  href,
  title,
  category,
  year,
  description,
  accent,
  tags,
  emoji = '✦',
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border card-hover cursor-pointer"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden flex-1 min-h-[196px]"
        style={{ backgroundColor: accent + '12' }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Blob */}
        <div
          className="absolute -bottom-6 -left-4 w-28 h-28 rounded-full opacity-25 blur-3xl transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2"
          style={{ backgroundColor: accent }}
        />

        {/* Category badge */}
        <div
          className="absolute top-3.5 left-3.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold z-10"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
        >
          {category}
        </div>

        {/* Emoji icon */}
        <div
          className="absolute top-3 right-3 w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 transition-transform duration-400 group-hover:scale-110 group-hover:rotate-10"
          style={{ backgroundColor: accent + '22' }}
        >
          {emoji}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-lg font-semibold leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            {title}
          </h3>
          <span className="text-xs font-medium mt-0.5 shrink-0" style={{ color: 'var(--text-muted)' }}>
            {year}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-lg font-medium"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--text-muted)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ backgroundColor: accent + '18', color: accent }}
          >
            ↗
          </div>
        </div>
      </div>
    </Link>
  )
}
