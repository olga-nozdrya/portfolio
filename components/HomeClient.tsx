'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import LeftPanel from './LeftPanel';
import ThemeBtn from './ThemeBtn';
import CaseCard from './CaseCard';
import { CASES, CONCEPTS, EXP, HARD, TOOLS } from '@/lib/data';
import ContactSection from './ContactSection';
import CaseCursor from './CaseCursor';

const NAV_ITEMS = [
  { id: 'cases', label: 'Кейсы' },
  { id: 'experience', label: 'Опыт' },
  { id: 'skills', label: 'Обо мне' },
];

function SkRow({ label, delay, description }: { label: string; delay: number; description?: string }) {
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
      <div className='sk-row-label'>{label}</div>
      { description && <div className='sk-row-desc'>{description}</div> }
    </div>
  );
}

function ToolRow({ label, delay }: { label: string; delay: number }) {
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
      className={`tool-row${vis ? ' vis' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='tool-row-label'>{label}</div>
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
  const [typingDone, setTypingDone] = useState(false);
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

  useEffect(() => {
  const isMobile = window.innerWidth < 900;
  if (!isMobile) return;
  
  if (!typingDone) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
  } else {
    document.body.style.overflow = '';
    document.body.style.height = '';
  }

  return () => {
    document.body.style.overflow = '';
    document.body.style.height = '';
  };
}, [typingDone]);

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
      <div className="mob-topbar mob-topbar--simple">
      <ThemeBtn />
    </div>
      <CaseCursor />
      {/* Left panel */}
      <LeftPanel onDone={() => setTypingDone(true)} />

      {/* Right panel */}
      <div className="pf-right pf-right--desktop">
        {/* Desktop nav */}
        <div className="pf-nav">
          <div className="pf-nav-links">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                className={`pf-nav-link${active === n.id ? ' active' : ''}`}
                onClick={() => switchTab(n.id)}
              >
                {active === n.id && `[` + n.label + `]`}
                {active !== n.id && n.label}
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
              <div className="cd-concepts">
                <div className="sk-title">[Концепты]</div>
                <div className="cd-concepts-grid">
                  {CONCEPTS.map((c, i) => (
                    <div key={i} className={`cd-concept-item cd-concept-item--${c.cols || 1}`}>
                      <img src={c.src} alt="" />
                    </div>       
                  ))}
                </div>
              </div>
              <div className="mob-contact">
                <ContactSection />
              </div>
            </div>
          </div>

          <div
            className={`pf-tab${active === 'experience' ? ' pf-tab--active' : ''}`}
            ref={(el) => { tabScrollRefs.current['experience'] = el; }}
          >
            <div className="pf-section">
              <div className="sk-group">
                {EXP.map((e, i) => (
                <ExpRow key={i} e={e} i={i} />
              ))}
              </div>
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
                <div className="sk-title">[Мои суперсилы]</div>
                {HARD.map((s, i) => (
                  <SkRow key={i} label={s.h} description={s.desc} delay={i * 40} />
                ))}
              </div>
              <div className="sk-group">
                <div className="sk-title">[Инструменты]</div>
                <div className="sk-group sk-group-tools">
                  {TOOLS.map((s, i) => (
                  <ToolRow key={i} label={s} delay={i * 40} />
                ))}
                </div>
              </div>
              <div className="mob-contact">
                <ContactSection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`pf-mobile-content${typingDone ? ' pf-mobile-content--visible' : ''}`}>
      <div className="pf-section pf-section-cases">
        <h2 className="sec-heading sec-heading-cases">Кейсы</h2>
        <div className="sec-cases">
          {CASES.map((c) => <CaseCard key={c.id} c={c} />)}
        </div>
      </div>
      <div className="pf-section">
        <div className="cd-concepts">
          <h2 className="sec-heading sec-heading-cases">Концепты</h2>
          <div className="cd-concepts-grid">
            {CONCEPTS.map((c, i) => (
              <div key={i} className={`cd-concept-item cd-concept-item--${c.cols || 1}`}>
                <img src={c.src} alt="" />
              </div>       
            ))}
          </div>
        </div>
      </div>
      <div className="pf-section">
        <h2 className="sec-heading">Опыт</h2>
        <div className="sec-exp">
          {EXP.map((e, i) => <ExpRow key={i} e={e} i={i} />)}
        </div>
      </div>
      <div className="pf-section">
              <h2 className="sec-heading">Обо мне</h2>
              <div className="sk-group">
                {HARD.map((s, i) => (
                  <SkRow key={i} label={s.h} description={s.desc} delay={i * 40} />
                ))}
              </div>
              <div className="sk-group">
                <div className="sk-title">[Инструменты]</div>
                <div className="sk-group sk-group-tools">
                  {TOOLS.map((s, i) => (
                  <ToolRow key={i} label={s} delay={i * 40} />
                ))}
                </div>
              </div>
            </div>
      <ContactSection />
    </div>
    </div>
  );
}