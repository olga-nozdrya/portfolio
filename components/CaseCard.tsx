'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneMockup from './PhoneMockup';
import type { CaseData } from '@/lib/data';
import { createPortal } from 'react-dom';
import SkeletonImage from './SkeletonImage';

interface Props {
  c: CaseData;
}

const showCursor = () => {
  document.getElementById('case-cursor')?.classList.add('case-cursor--visible');
};
const hideCursor = () => {
  document.getElementById('case-cursor')?.classList.remove('case-cursor--visible');
};

export default function CaseCard({ c }: { c: CaseData }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  useEffect(() => {
  if (imgRef.current?.complete) {
    setLoaded(true);
  }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

    useEffect(() => {
  if (showPassword) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [showPassword]);

  const handleClick = () => {
  hideCursor();
  if (c.password) {
    setShowPassword(true);
  } else {
    router.push(`/cases/${c.slug}`);
  }
};

  const handleSubmit = () => {
    if (password === c.password) {
      router.push(`/cases/${c.slug}`);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <>
      <div className="case-card" onClick={handleClick} onMouseEnter={showCursor}
        onMouseLeave={hideCursor}>
        <div className="cc-vis">
          <div className='cc-vis-inner'>
            <SkeletonImage src={`/covers/${c.slug}.png`} alt={c.brand} objectFit="cover" priority={c.id === 1} />
          </div>
          <div className="cc-tags">
            {c.tags.map((t) => (
              <span key={t} className="cc-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="cc-footer">
          <div className="cc-brand">{c.brand}</div>
          <div className='cc-sub cc-sub-interdot'>·</div>
          <div className="cc-sub">{c.sub}</div>
        </div>
      </div>
      {showPassword && createPortal(
      <div className="pw-overlay" onClick={() => setShowPassword(false)}>
        <div className="pw-modal" onClick={(e) => e.stopPropagation()}>
          <p className="pw-title">[CASE:LOCKED]</p>
          <p className="pw-sub">Введите пароль для просмотра кейса</p>
          <input
            className={`pw-input${error ? ' pw-input--error' : ''}`}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
          {error && <p className="pw-error">Неверный пароль</p>}
          <div className="pw-actions">
            <button className="pf-cl pf-cl-outline" onClick={() => setShowPassword(false)}>
              Отмена
            </button>
            <button className="pf-cl pf-cl-solid" onClick={handleSubmit}>
              Войти
            </button>
          </div>
        </div>
      </div>, document.body
    )}
    </>
);
}
