'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneMockup from './PhoneMockup';
import type { CaseData } from '@/lib/data';

interface Props {
  c: CaseData;
}

export default function CaseCard({ c }: { c: CaseData }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  useEffect(() => {
  if (imgRef.current?.complete) {
    setLoaded(true);
  }
  }, []);
  return (
    <div className="case-card" onClick={() => router.push(`/cases/${c.slug}`)}>
      <div className="cc-tags">
        {c.tags.map((t) => (
          <span key={t} className="cc-tag">{t}</span>
        ))}
      </div>
      <div className="cc-vis">
  <div className="cc-vis-inner">
      {!loaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
      <img
      ref={imgRef}
      src={`/covers/${c.slug}.png`}
      alt={c.brand}
      onLoad={() => setLoaded(true)}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
  />
  </div>
</div>
<div className="cc-footer">
  <div>
    <div className="cc-brand">{c.brand}</div>
    <div className="cc-sub">{c.sub}</div>
  </div>
  <button className="cc-arrow">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
</div>
    </div>
  );
}
