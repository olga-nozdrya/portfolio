'use client';
import { useEffect, useState } from 'react';

const FULL_TEXT = 'Привет!\nМеня зовут Оля\nя продуктовый\nдизайнер';

export default function LeftPanel({ onDone }: { onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

useEffect(() => {
  const already = sessionStorage.getItem('typed');
  
  if (already) {
    // уже показывали — сразу показываем всё
    setDisplayed(FULL_TEXT);
    setDone(true);
    setShowDesc(true);
    onDone?.();
    return;
  }

  let i = 0;
  const interval = setInterval(() => {
    i++;
    setDisplayed(FULL_TEXT.slice(0, i));
    if (i >= FULL_TEXT.length) {
      clearInterval(interval);
      setDone(true);
      setTimeout(() => {
        setShowDesc(true);
        onDone?.();
        sessionStorage.setItem('typed', '1');
      }, 300);
    }
  }, 45);
  return () => clearInterval(interval);
}, []);

  return (
    <aside className="pf-left">
      <div>  
        <div className="pf-name-block">
          <TypedText displayed={displayed} done={done} />
        </div>
        <p className={`pf-desc pf-desc--anim${showDesc ? ' pf-desc--visible' : ''}`}>
          с опытом в продукте и бэкграундом<br />
          в разработке — соединяю системность, UX<br />
          и аккуратный визуал в продуманных интерфейсах
        </p>
      </div>
      <div className={`pf-contacts pf-contacts--anim${showDesc ? ' pf-contacts--visible' : ''}`}>
        <a className="pf-cl pf-cl-solid" href="https://t.me/o_solonina" target="_blank" rel="noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Telegram
        </a>
        <a className="pf-cl pf-cl-outline" href="https://www.linkedin.com/in/olga-solonina/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="pf-cl pf-cl-outline" href="https://drive.google.com/file/d/1Zt_NZOYc2WnPMOrhgogF5YmTm01D6XVB/view?usp=drive_link" target="_blank" rel="noreferrer">
          CV.pdf
        </a>
      </div>
    </aside>
  );
}

function TypedText({ displayed, done }: { displayed: string; done: boolean }) {
  const lines = displayed.split('\n');

  return (
    <div className="pf-typed">
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        let cls = 'pf-name-txt';
        if (i === 0) cls = 'pf-hi';
        if (i >= 2) cls = 'pf-role';

        if (i === 1) {
          return (
            <div key={i} className="pf-line pf-line--photo">
              <span className="pf-name-txt">
                {line}
                {isLast && <span className={`pf-cursor${done ? ' pf-cursor--done' : ''}`} />}
              </span>
              <span className={`pf-photo-wrap${done ? ' pf-photo-wrap--fade' : ' pf-photo-wrap--hidden'}`}>
                <img className="img-bw" src="/photo-bw.png" alt="Оля" />
                <img className="img-color" src="/photo-color.png" alt="Оля" />
              </span>
            </div>
          );
        }

        return (
          <div key={i} className="pf-line">
            <span className={cls} style={{ whiteSpace: 'pre-line' }}>{line}</span>
            {isLast && <span className={`pf-cursor${done ? ' pf-cursor--done' : ''}`} />}
          </div>
        );
      })}
    </div>
  );
}