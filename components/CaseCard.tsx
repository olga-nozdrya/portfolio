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
    <div className="cc-vis">
      <div className='cc-vis-inner'>
        {!loaded && <div className="skeleton cc-skeleton" />}
        <img
          ref={imgRef}
          src={`/covers/${c.slug}.png`}
          alt={c.brand}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      </div>
      <div className="cc-tags">
        {c.tags.map((t) => (
          <span key={t} className="cc-tag">{t}</span>
        ))}
      </div>
    </div>
    <div className="cc-footer">
      <div className="cc-brand">{c.brand}</div>
      <div className="cc-sub">{c.sub}</div>
    </div>
  </div>
);
}
