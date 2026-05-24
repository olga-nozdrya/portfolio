'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [active, setActive] = useState('cases');
  const [burger, setBurger] = useState(false);
  const tabScrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const layoutRef = useRef<HTMLDivElement>(null);

  // Scroll wheel on left panel → forward to active tab
  useEffect(() => {
    const layout = layoutRef.current;
    if (!layout) return;

    const onWheel = (e: WheelEvent) => {
      const isMobile = window.innerWidth < 900;
      if (isMobile) return;

      // Only intercept if target is inside left panel
      const leftPanel = layout.querySelector('.pf-left');
      if (!leftPanel?.contains(e.target as Node)) return;

      e.preventDefault();
      const tabEl = tabScrollRefs.current[active];
      if (tabEl) tabEl.scrollBy({ top: e.deltaY, behavior: 'auto' });
    };

    layout.addEventListener('wheel', onWheel, { passive: false });
    return () => layout.removeEventListener('wheel', onWheel);
  }, [active]);

  const switchTab = useCallback((id: string) => {
    setActive(id);
    setBurger(false);
    // Reset scroll to top when switching
    setTimeout(() => {
      const el = tabScrollRefs.current[id];
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }, []);

  return (
    <div className="pf-layout" ref={layoutRef}>
      {/* Mobile topbar */}
      <div className="mob-topbar">
        <div className="burger-theme-mobile">
          <ThemeBtn />
        </div>
        <div>
          <button
            className={`burger-btn${burger ? ' burger-open' : ''}`}
            onClick={() => setBurger((b) => !b)}
          >
            <span /><span /><span />
          </button>
          {burger && (
            <div className="burger-menu open">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.id}
                  className={`bm-link${active === n.id ? ' active' : ''}`}
                  onClick={() => switchTab(n.id)}
                >
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
                onClick={() => switchTab(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="pf-nav-right">
            <ThemeBtn />
          </div>
        </div>

        {/* Tab panels */}
        <div className="pf-tabs">
          {/* Cases */}
          <div
            className={`pf-tab${active === 'cases' ? ' pf-tab--active' : ''}`}
            ref={(el) => { tabScrollRefs.current['cases'] = el; }}
          >
            <div className="pf-section">
              {CASES.map((c) => (
                <CaseCard key={c.id} c={c} />
              ))}
              <div className="mob-contact">
                <ContactSection />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div
            className={`pf-tab${active === 'exp' ? ' pf-tab--active' : ''}`}
            ref={(el) => { tabScrollRefs.current['exp'] = el; }}
          >
            <div className="pf-section">
              {EXP.map((e, i) => (
                <ExpRow key={i} e={e} i={i} />
              ))}
              <div className="mob-contact">
                <ContactSection />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div
            className={`pf-tab${active === 'skills' ? ' pf-tab--active' : ''}`}
            ref={(el) => { tabScrollRefs.current['skills'] = el; }}
          >
            <div className="pf-section">
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
              <div className="mob-contact">
                <ContactSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}