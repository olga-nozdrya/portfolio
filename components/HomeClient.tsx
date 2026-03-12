'use client';

import { useState, useRef, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import ThemeBtn from './ThemeBtn';
import CaseCard from './CaseCard';
import { CASES, EXP, HARD, SOFT } from '@/lib/data';
import ContactSection from './ContactSection';

const NAV_ITEMS = [
  { id: 'cases', label: 'Кейсы' },
  { id: 'exp', label: 'Опыт' },
  { id: 'skills', label: 'Навыки' },
];

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

function ExpRow({ e, i }: { e: typeof EXP[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`exp-row${vis ? ' vis' : ''}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div>
        <div className="exp-role">{e.role}</div>
        <div className="exp-co">{e.co}</div>
      </div>
      <div className="exp-per">{e.per}</div>
    </div>
  );
}

export default function HomeClient() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [active, setActive] = useState('cases');
  const [burger, setBurger] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const els = NAV_ITEMS.map(({ id }) => sectionRefs.current[id]).filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: container, threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const isMobile = window.innerWidth < 900;
    if (isMobile) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const container = scrollRef.current;
      if (container) container.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    }
    setBurger(false);
  };

  return (
    <div className="pf-layout">
      {/* Mobile topbar */}
    <div className="mob-topbar">
      <div className="burger-theme-mobile">
        <ThemeBtn />
      </div>
      <div>
        <button className={`burger-btn${burger ? ' burger-open' : ''}`} onClick={() => setBurger((b) => !b)}>
          <span /><span /><span />
        </button>
        {burger && (
          <div className="burger-menu open">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                className={`bm-link${active === n.id ? ' active' : ''}`}
                onClick={() => scrollTo(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

      {/* <div className="mob-topbar">
  <div className="burger-theme-mobile">
    <ThemeBtn />
  </div>
  <div style={{ position: 'relative' }}>
    <button className={`burger-btn${burger ? ' burger-open' : ''}`} onClick={() => setBurger((b) => !b)}>
      <span /><span /><span />
    </button>
    {burger && (
      <div className="burger-menu open">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            className={`bm-link${active === n.id ? ' active' : ''}`}
            onClick={() => scrollTo(n.id)}
          >
            {n.label}
          </button>
        ))}
      </div>
    )}
  </div>
</div> */}

      {/* Left panel */}
      <LeftPanel />

      {/* Right panel */}
      <div className="pf-right">
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
          <div className="pf-nav-right">
            <ThemeBtn />
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
            {CASES.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>

          {/* Experience */}
          <div
            id="exp"
            className="pf-section"
            ref={(el) => { sectionRefs.current['exp'] = el; }}
          >
            <h2 className="sec-heading">Опыт</h2>
            {EXP.map((e, i) => (
              <ExpRow key={i} e={e} i={i} />
            ))}
          </div>

          

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

          <div className="mob-contact">
            <ContactSection />
          </div>
          {/* CTA */}
{/*           <div className="pf-section" style={{ paddingTop: 40, paddingBottom: 0 }}>
            <div className="cta-block">
              <span className="cta-wave">👋</span>
              <p className="cta-h">Давайте сделаем что-нибудь&nbsp;крутое вместе</p>
              <p className="cta-sub">
                Открыта к новым проектам и интересным задачам. Напишите — обсудим вашу задачу.
              </p>
              <div className="cta-links">
                <a className="pf-cl pf-cl-solid" href="https://t.me/o_solonina" target="_blank" rel="noreferrer">
                  Telegram
                </a>
                <a className="pf-cl pf-cl-outline" href="https://www.linkedin.com/in/olga-solonina/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
