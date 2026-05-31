'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      // замедляем к концу
      const remaining = 100 - current;
      const step = Math.random() * Math.min(remaining * 0.15, 8) + 1;
      current = Math.min(current + step, 99);
      setProgress(current);
    }, 80);

    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setHiding(true);
        setTimeout(() => setVisible(false), 600);
      }, 400);
    };

    // минимум 1.5 секунды анимации
    const minDelay = setTimeout(() => {
      if (document.readyState === 'complete') {
        finish();
      } else {
        window.addEventListener('load', finish, { once: true });
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(minDelay);
    };
  }, []);

  if (!visible) return null;

  const blocks = 20;
  const filled = Math.floor((progress / 100) * blocks);

  return (
    <div className={`loading-screen${hiding ? ' loading-screen--hide' : ''}`}>
      <div className="loading-inner">
        <div className="loading-label">Loading...</div>
        <div className="loading-retro-bar">
          <div className="loading-retro-track">
            {Array.from({ length: blocks }).map((_, i) => (
              <div
                key={i}
                className={`loading-retro-block${i < filled ? ' loading-retro-block--filled' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="loading-percent">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}