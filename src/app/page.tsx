import CaseCard from '@/components/CaseCard'

const cases = [
  {
    href: '/cases/case-1',
    title: 'Киоски Dodo Pizza & TV',
    category: 'Продуктовый дизайн',
    year: '2024',
    description: 'Редизайн самообслуживания для 600+ киосков в России, Турции и Великобритании — заказывать пиццу стало удовольствием.',
    accent: '#FF5C00',
    tags: ['UX Research', 'Interface', 'Motion'],
    emoji: '🍕',
  },
  {
    href: '/cases/case-2',
    title: 'Reboot — Платформа',
    category: 'Веб-дизайн',
    year: '2024',
    description: 'Айдентика и веб для платформы, которая возрождает живое творческое сообщество среди профессионалов по всему миру.',
    accent: '#1EE87E',
    tags: ['Брендинг', 'Web', 'Система'],
    emoji: '✦',
  },
  {
    href: '/cases/case-3',
    title: 'Misso AI Agent',
    category: 'AI-продукт',
    year: '2023',
    description: 'Интерфейс AI-агента для командной продуктивности — спокойный, сфокусированный и неожиданно человечный.',
    accent: '#3B82F6',
    tags: ['AI/ML', 'SaaS', 'Mobile'],
    emoji: '🌿',
  },
]

const hardSkills = [
  'UX Research', 'UI Design', 'Прототипирование', 'Design Systems',
  'Motion Design', 'Юзабилити-тестирование', 'Information Architecture',
  'Брендинг', 'Адаптивный дизайн', 'Accessibility', 'Локализация UI',
]

const softSkills = [
  'Системное мышление', 'Критическое мышление', 'Работа в команде',
  'Коммуникация', 'Фасилитация', 'Управление временем',
  'Презентация идей', 'Эмпатия к пользователю', 'Адаптивность', 'Работа с фидбэком',
]

const experience = [
  { company: 'Dodo Brands', role: 'Ведущий продуктовый дизайнер · Киоски & TV', period: '2023 — н.в.', current: true },
  { company: 'Reboot', role: 'Дизайн-лид · Бренд & Web', period: '2022 — 2023', current: false },
  { company: 'Misso', role: 'Продуктовый дизайнер · AI-продукт', period: '2021 — 2022', current: false },
  { company: 'Freelance', role: 'UX/UI-дизайнер · Стартапы', period: '2019 — 2021', current: false },
  { company: 'НИУ ВШЭ', role: 'Коммуникационный дизайн · Бакалавр', period: '2015 — 2019', current: false },
]

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="pt-36 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium mb-7 border"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--accent-green)', boxShadow: '0 0 0 3px rgba(30,232,126,0.2)', animation: 'pulse 2s infinite' }}
              />
              Открыта к работе · Берлин
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-9 items-start">
            {/* Left */}
            <div>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-5 animate-fade-up"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
              >
                Делаю продукты,<br />
                которыми{' '}
                <em className="not-italic" style={{ color: 'var(--accent)' }}>хочется</em><br />
                пользоваться.
              </h1>
              <p
                className="text-base leading-relaxed max-w-md animate-fade-up stagger-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Продуктовый дизайнер с 5+ летним опытом. Работаю на стыке UX-исследований, системного мышления и моушна — от нуля до релиза.
              </p>

              {/* Stats */}
              <div className="flex gap-7 mt-7 animate-fade-up stagger-3">
                {[
                  { value: '5+', label: 'Лет опыта' },
                  { value: '24', label: 'Проекта' },
                  { value: '3', label: 'Страны' },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-3xl font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: photo placeholder */}
            <div className="animate-fade-up stagger-2">
              {/*
                Чтобы добавить фото, замени содержимое этого div на:
                <Image src="/photo.jpg" alt="Алекс Морроу" fill className="object-cover" />
                и добавь position: relative к обёртке
              */}
              <div
                className="w-full aspect-[3/4] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', boxShadow: '0 4px 32px rgba(0,0,0,0.09)' }}
              >
                <span className="text-4xl opacity-30">👤</span>
                <span className="text-xs font-medium text-center px-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Твоё фото здесь<br />
                  <code className="text-[10px] bg-[var(--bg)] px-1.5 py-0.5 rounded mt-1 inline-block">url(&apos;photo.jpg&apos;)</code>
                </span>
                {/* Name card overlay */}
                <div
                  className="absolute bottom-3 left-3 right-3 rounded-xl px-3 py-2 border"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Алекс Морроу</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Product Designer · UX/UI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section className="px-6 pb-6" id="work">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Избранные работы
            </h2>
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>3 кейса</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {cases.map((c, i) => (
              <div key={c.href} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <CaseCard {...c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="px-6 pb-4" id="skills">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl border p-10 grid grid-cols-1 md:grid-cols-2 gap-10"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
          >
            {/* Hard */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ backgroundColor: 'rgba(255,92,0,0.12)' }}
                >
                  🔧
                </div>
                <h3 className="text-base font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                  Hard skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag-item inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border"
                    style={{
                      background: 'rgba(255,92,0,0.07)',
                      borderColor: 'rgba(255,92,0,0.18)',
                      color: 'var(--text)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#FF5C00' }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider (desktop) */}
            <div className="hidden md:block absolute inset-y-10 left-1/2 w-px" style={{ backgroundColor: 'var(--border)' }} />

            {/* Soft */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ backgroundColor: 'rgba(30,232,126,0.12)' }}
                >
                  🌿
                </div>
                <h3 className="text-base font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                  Soft skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag-item inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border"
                    style={{
                      background: 'rgba(30,232,126,0.08)',
                      borderColor: 'rgba(30,232,126,0.22)',
                      color: 'var(--text)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#1EE87E' }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="px-6 pb-4" id="contact-anchor">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--text)', boxShadow: '0 12px 48px rgba(0,0,0,0.18)' }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.1, transform: 'translate(30%, -30%)' }}
            />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Контакт
              </p>
              <h2
                className="text-4xl sm:text-5xl font-semibold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
              >
                Есть проект?<br />Напиши мне.
              </h2>
              <a
                href="mailto:alex@example.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 hover:bg-white/15"
                style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                alex@example.com
              </a>
            </div>

            <div className="relative z-10 flex flex-col gap-2.5 min-w-[220px]">
              {[
                { name: 'Telegram', handle: '@alexmorrow' },
                { name: 'LinkedIn', handle: 'in/alexmorrow' },
                { name: 'Dribbble', handle: 'dribbble.com/alexmorrow' },
                { name: 'Read.cv', handle: 'read.cv/alexmorrow' },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  className="social-row flex items-center justify-between gap-4 px-4 py-3 rounded-2xl border"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#fff' }}>{s.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.handle}</div>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE + ABOUT ── */}
      <section className="px-6 pb-20" id="about-anchor">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Опыт и обо мне
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">

            {/* Experience */}
            <div
              className="rounded-3xl border p-8 card-hover"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
            >
              <h3 className="text-xl font-semibold mb-1 tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                Опыт работы
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>5+ лет в продуктовом дизайне</p>

              <div className="flex flex-col">
                {experience.map((item, i) => (
                  <div
                    key={item.company}
                    className="grid gap-x-3.5 items-start py-3.5 border-b last:border-b-0 last:pb-0 first:pt-0"
                    style={{
                      gridTemplateColumns: '20px 1fr auto',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* Timeline */}
                    <div className="flex flex-col items-center pt-1 h-full">
                      <div
                        className="w-2.5 h-2.5 rounded-full border-2 shrink-0"
                        style={{
                          borderColor: 'var(--accent)',
                          backgroundColor: item.current ? 'var(--accent)' : 'transparent',
                        }}
                      />
                      {i < experience.length - 1 && (
                        <div className="w-px flex-1 mt-1 min-h-[20px]" style={{ backgroundColor: 'var(--border)' }} />
                      )}
                    </div>
                    {/* Info */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.company}</span>
                        {item.current && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide"
                            style={{ backgroundColor: 'rgba(255,92,0,0.1)', color: 'var(--accent)' }}
                          >
                            Сейчас
                          </span>
                        )}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.role}</div>
                    </div>
                    {/* Period */}
                    <div className="text-xs font-medium pt-0.5 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                      {item.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About + Tools + mini CTA */}
            <div className="flex flex-col gap-3.5">
              <div
                className="rounded-3xl border p-8 card-hover flex-1"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest block mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Обо мне
                </span>
                <h3
                  className="text-xl font-semibold mb-3 tracking-tight leading-snug"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                >
                  Превращаю сложное в понятное.
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  Продуктовый дизайнер, который верит: хороший дизайн не замечают. От исследования до релиза — итерирую быстро, думаю системно, делаю интерфейсы, которые ощущаются как само собой разумеющееся.
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                  Инструменты
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Protopie', 'Framer', 'After Effects', 'Lottie', 'Notion', 'Miro'].map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium border"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact-anchor"
                className="rounded-3xl p-7 flex items-center justify-between group card-hover"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Доступна к проектам
                  </p>
                  <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
                    Написать мне ↑
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  ↑
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
