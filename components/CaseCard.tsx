'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneMockup from './PhoneMockup';
import type { CaseData } from '@/lib/data';

interface Props {
  c: CaseData;
}

export default function CaseCard({ c }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`case-card${vis ? ' vis' : ''}`}
      onClick={() => router.push(`/cases/${c.slug}`)}
    >
      <div className="cc-head">
        <div className="cc-brand">
          <div className="cc-logo">
            {c.logo ? (
              <img src={c.logo} alt={c.brand} style={{ objectFit: 'contain' }} />
            ) : c.lt}
          </div>
          <div>
            <div className="cc-bname">{c.brand}</div>
            <div className="cc-bsub">{c.sub}</div>
          </div>
        </div>
        <div className="cc-arr">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    <div className="cc-vis">
      <div className="cc-vis-inner">
        <img src={`/covers/${c.slug}.png`} alt={c.brand} />
      </div>
    </div>
      <div className="cc-tags">
        {c.tags.map((t) => (
          <span key={t} className="cc-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}
