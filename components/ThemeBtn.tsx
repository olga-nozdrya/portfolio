'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeBtn() {
  const { dark, setDark } = useTheme();
  const [ripple, setRipple] = useState(false);

  const toggle = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 520);
    setDark((d) => !d);
  };

  return (
    <button
      className={`theme-btn${ripple ? ' rippling' : ''}`}
      onClick={toggle}
      aria-label="Переключить тему"
    >
      <div className="tb-ripple" />
      <div className="tb-thumb">
</div>
    </button>
  );
}
