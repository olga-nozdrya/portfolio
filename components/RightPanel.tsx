'use client';

import { useEffect, useRef, useState } from 'react';
import CaseCard from './CaseCard';
import { CASES, EXP, HARD, SOFT } from '@/lib/data';

const NAV_ITEMS = [
  { id: 'cases', label: 'Кейсы' },
  { id: 'exp', label: 'Опыт' },
  { id: 'skills', label: 'Навыки' },
];

interface Props {
  active: string;
  setActive: (id: string) => void;
}

function AnimRow({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={delay ? (vis ? 'exp-row vis' : 'exp-row') : (vis ? 'sk-row vis' : 'sk-row')}
    >
      {children}
    </div>
  );
}

export default function RightPanel({ active, setActive }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection observer for active nav
  useEffect(() => {
    const els = NAV_ITEMS.map(({ id }) => sectionRefs.current[id]).filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: scrollRef.current, threshold: 0.3 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [setActive]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    const container = scrollRef.current;
    if (!el || !container) return;
    container.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  };

  return { scrollTo, scrollRef, sectionRefs };
}

export function RightContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [active, setActive] = useState('cases');
  const [burger, setBurger] = useState(false);

  useEffect(() => {
    const els = NAV_ITEMS.map(({ id }) => sectionRefs.current[id]).filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: scrollRef.current, threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [setActive]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    const container = scrollRef.current;
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    }
    setBurger(false);
  };

  return (
    <>
      {/* Mobile topbar */}
      <div className={`mob-topbar${burger ? ' burger-open' : ''}`}>
        <button className="burger-btn" onClick={() => setBurger((b) => !b)}>
          <span /><span /><span />
        </button>
        <span style={{ flex: 1 }} />
        <div className="burger-theme-mobile">
          {/* ThemeBtn injected by parent */}
        </div>
      </div>

      {/* Desktop nav */}
      <div className="pf-nav">
        <div className="pf-nav-links">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              className={`pf-nav-link${active === n.id ? ' active' : ''}`}
              onClick={() => scrollTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="pf-scroll" ref={scrollRef}>
        {/* Cases */}
        <div
          id="cases"
          className="pf-section"
          ref={(el) => { sectionRefs.current['cases'] = el; }}
        >
          <h2 className="sec-heading">Кейсы</h2>
          {CASES.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </div>

        <div className="sec-divider" />

        {/* Exp */}
        <div
          id="exp"
          className="pf-section"
          ref={(el) => { sectionRefs.current['exp'] = el; }}
        >
          <h2 className="sec-heading">Опыт</h2>
          {EXP.map((e, i) => (
            <div
              key={i}
              className="exp-row"
              style={{
                opacity: 0,
                transform: 'translateY(12px)',
                animation: `fadeUp 0.45s ${i * 80}ms forwards`,
              }}
            >
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-co">{e.co}</div>
              </div>
              <div className="exp-per">{e.per}</div>
            </div>
          ))}
        </div>

        <div className="sec-divider" />

        {/* Skills */}
        <div
          id="skills"
          className="pf-section"
          ref={(el) => { sectionRefs.current['skills'] = el; }}
        >
          <h2 className="sec-heading">Навыки</h2>
          <div className="sk-group">
            <div className="sk-title">Hard skills</div>
            {HARD.map((s, i) => (
              <SkRow key={s} label={s} delay={i * 40} />
            ))}
          </div>
          <div className="sk-group">
            <div className="sk-title">Soft skills</div>
            {SOFT.map((s, i) => (
              <SkRow key={s} label={s} delay={i * 40} />
            ))}
          </div>
        </div>

        <div className="sec-divider" />

        {/* CTA */}
{/*         <div className="pf-section" style={{ paddingTop: 40, paddingBottom: 0 }}>
          <div className="cta-block">
            <span className="cta-wave">👋</span>
            <p className="cta-h">Давайте сделаем что-нибудь&nbsp;крутое вместе</p>
            <p className="cta-sub">
              Открыта к новым проектам и интересным задачам. Напишите — обсудим вашу задачу.
            </p>
            <div className="cta-links">
              <a className="pf-cl pf-cl-solid" href="https://t.me/o_solonina" target="_blank" rel="noreferrer">Telegram</a>
              <a className="pf-cl pf-cl-outline" href="https://www.linkedin.com/in/olga-solonina/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

function SkRow({ label, delay }: { label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`sk-row${vis ? ' vis' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {label}
    </div>
  );
}
