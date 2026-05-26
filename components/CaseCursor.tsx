'use client';
import { useEffect, useRef, useState } from 'react';

export default function CaseCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`case-cursor${visible ? ' case-cursor--visible' : ''}`}
      id="case-cursor"
    >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>

  );
}