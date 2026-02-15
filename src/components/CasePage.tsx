import Link from 'next/link'
import { CaseData } from '@/lib/cases'

function ImgPlaceholder({ height = 420, label, accent }: { height?: number; label?: string; accent: string }) {
  return (
    <div
      className="w-full rounded-3xl flex flex-col items-center justify-center overflow-hidden relative"
      style={{ height, backgroundColor: accent + '0d', border: `1px solid ${accent}22` }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
      <span className="relative z-10 text-4xl mb-3">🖼</span>
      {label && <p className="relative z-10 text-sm font-medium" style={{ color: accent + 'bb' }}>{label}</p>}
    </div>
  )
}

export default function CasePage({ data }: { data: CaseData }) {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8 text-sm animate-fade-in">
            <Link href="/" className="transition-opacity hover:opacity-60" style={{ color: 'var(--text-muted)' }}>Работы</Link>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
            <span style={{ color: 'var(--text)' }}>{data.title}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-7 animate-fade-up">
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: data.accent }}>
              {data.category}
            </span>
            <span className="px-3 py-1.5 rounded-xl text-xs font-medium border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              {data.year} · {data.duration}
            </span>
            <span className="px-3 py-1.5 rounded-xl text-xs font-medium border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              {data.role}
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight mb-5 max-w-3xl animate-fade-up stagger-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            {data.title}
          </h1>
          <p className="text-xl leading-relaxed max-w-lg mb-12 animate-fade-up stagger-2" style={{ color: 'var(--text-muted)' }}>
            {data.heroTagline}
          </p>

          <div className="animate-fade-up stagger-3">
            <ImgPlaceholder height={480} label="Главный визуал / обложка" accent={data.accent} />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4 rounded-3xl border overflow-hidden"
            style={{ borderColor: 'var(--border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
          >
            {data.metrics.map((m, i) => (
              <div
                key={m.label}
                className="py-7 px-5 text-center"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRight: i < data.metrics.length - 1 ? `1px solid var(--border)` : 'none',
                }}
              >
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: data.accent }}>
                  {m.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Problem */}
      <section className="px-6 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <Block label="О проекте" content={data.about} accent={data.accent} />
          <Block label="Задача" content={data.problem} accent={data.accent} />
        </div>
      </section>

      {/* Wide image */}
      <section className="px-6 py-3">
        <div className="max-w-6xl mx-auto">
          <ImgPlaceholder height={360} label="Исследования / процесс" accent={data.accent} />
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          <div className="lg:col-span-2">
            <Block label="Решение" content={data.solution} accent={data.accent} large />
          </div>
          <div className="flex flex-col gap-3.5">
            {/* Tags */}
            <div
              className="rounded-3xl border p-6 flex-1"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Скоп</p>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-medium border"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Accent card */}
            <div
              className="rounded-3xl border p-6"
              style={{ backgroundColor: data.accent + '10', borderColor: data.accent + '28' }}
            >
              <div className="text-4xl mb-3">{data.emoji}</div>
              <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text)' }}>{data.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image pair */}
      <section className="px-6 py-3">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <ImgPlaceholder height={300} label="Детали дизайна 1" accent={data.accent} />
          <ImgPlaceholder height={300} label="Детали дизайна 2" accent={data.accent} />
        </div>
      </section>

      {/* Result */}
      <section className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <Block label="Результат" content={data.result} accent={data.accent} />
        </div>
      </section>

      {/* Final image */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <ImgPlaceholder height={440} label="Финальные экраны / результат" accent={data.accent} />
        </div>
      </section>

      {/* Next case */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <Link
            href={data.nextCase.href}
            className="rounded-3xl border px-10 py-9 flex items-center justify-between gap-6 group card-hover"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', display: 'flex' }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                Следующий кейс
              </p>
              <h3
                className="text-2xl font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
              >
                {data.nextCase.title}
              </h3>
            </div>
            <span
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 group-hover:scale-105"
              style={{ backgroundColor: data.accent }}
            >
              Смотреть →
            </span>
          </Link>
        </div>
      </section>
    </article>
  )
}

function Block({ label, content, accent, large = false }: { label: string; content: string; accent: string; large?: boolean }) {
  return (
    <div
      className="rounded-3xl border p-8 h-full card-hover"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
    >
      <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: accent }}>
        {label}
      </span>
      <p className={`leading-relaxed ${large ? 'text-base' : 'text-sm'}`} style={{ color: 'var(--text-muted)' }}>
        {content}
      </p>
    </div>
  )
}
