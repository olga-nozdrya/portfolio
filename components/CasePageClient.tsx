'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeBtn from './ThemeBtn';
import PhoneMockup from './PhoneMockup';
import ScreenPh from './ScreenPh';
import ImageModal from './ImageModal';
import { CASES, CASE_SCREENS } from '@/lib/data';
import type { CaseData } from '@/lib/data';
import ContactBlock from './ContactSection';

interface ModalItem { icon: string; label: string; }

interface Props {
  c: CaseData;
}

export default function CasePageClient({ c }: Props) {
  const router = useRouter();
  const [zoom, setZoom] = useState<ModalItem | null>(null);

  const nextCase = c.next ? CASES.find((x) => x.id === c.next) : null;
  const prevCase = c.prev ? CASES.find((x) => x.id === c.prev) : null;
  const caseScreens = CASE_SCREENS[c.id] || [];

  return (
    <>
      {zoom && <ImageModal item={zoom} onClose={() => setZoom(null)} />}

      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        {/* Nav */}
        <nav className="cp-nav">
          <button className="cp-back" onClick={() => router.push('/')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11 7H3M3 7L6 4M3 7L6 10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            На главную
          </button>
          <span className="cp-logo">Оля Солонина · Портфолио</span>
          <div className="cp-nav-actions">
            <ThemeBtn />
          </div>
        </nav>

        {/* Body */}
        <div className="cp-body">
          <p className="cd-cat">{c.category}</p>
          <h1 className="cd-h1">{c.title}</h1>
          <p className="cd-sub">{c.subtitle}</p>

          {/* Meta strip */}
          <div className="cd-meta">
            <div className="cd-mc">
              <p className="cd-mv">{c.role}</p>
              <p className="cd-ml">Роль</p>
            </div>
            <div className="cd-mc">
              <p className="cd-mv">{c.period}</p>
              <p className="cd-ml">Период</p>
            </div>
            {c.team ? (
              <div className="cd-mc">
                  <p className="cd-mv">{c.team}</p>
                  <p className="cd-ml">Команда</p>
                </div>) : (
                  ''
              )}
          </div>

          {/* Hero visual */}
            <div className={`cd-hero`}>
              {c.cover ? (
                <img
                  src={c.cover}
                  alt={c.title}
                />
              ) : (
                <PhoneMockup variant={c.variant} />
              )}
            </div>

          {/* Text sections */}
          {c.sections.map((s, i) => (
            <div key={i} className="cd-sec">
              <h2>{s.h2}</h2>
              {s.body?.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          ))}

          {/* Process sections */}
         {c.sections2[0] && (
  <div className="cd-sec">
    <h2>{c.sections2[0].h2}</h2>
    <div className="cd-steps">
      {(c.sections2[0].items as any[])?.map((item, j) => {
        // если это группа (объект с label и items)
        if (typeof item === 'object' && 'label' in item) {
          return (
            <div key={j} className="cd-impr">
              <div className="cd-step-group-label">{item.label}</div>
                {item.items.map((text: string, k: number) => (
                  <div key={k} className="cd-impr-item">
                    <div className="cd-impr-dot" />
                    <div className="cd-impr-text">{text}</div>
                  </div>
                ))}
            </div>
          );
        }
        // если это просто строка (старый формат)
        return (
          <div key={j} className="cd-impr-item">
            <div className="cd-impr-dot" />
            <div className="cd-impr-text">{item}</div>
          </div>
        );
      })}
    </div>
  </div>
)}
        <div className="cd-sec">
          {/* Скрины после процесса */}
          {caseScreens[0] && (
            <div className="cd-screens">
              <h2>Финальные макеты</h2> 
              <div className="cd-hl">
                <p>{'Гипотеза 1'}</p>
                <div className="cd-hl-text">{caseScreens[0].label}</div>
              </div>
              <div className={`cd-screens-grid ${caseScreens[0].cols}`}>
                {caseScreens[0].items.map((s, i) => (
                  <ScreenPh key={i} {...s} onZoom={setZoom} />
                ))}
              </div>
            </div>
          )}

          {caseScreens[1] && (
            <div className="cd-screens">
              <div className="cd-hl">
                <p>{'Гипотеза 2'}</p>
                <div className="cd-hl-text">{caseScreens[1].label}</div>
              </div>
              <div className={`cd-screens-grid ${caseScreens[1].cols}`}>
                {caseScreens[1].items.map((s, i) => (
                  <ScreenPh key={i} {...s} onZoom={setZoom} />
                ))}
              </div>
            </div>
          )}

          
          {caseScreens[2] && (
            <div className="cd-screens">
              <div className="cd-hl">
                <p>{'Гипотеза 3'}</p>
                <div className="cd-hl-text">{caseScreens[2].label}</div>
              </div>
              <div className={`cd-screens-grid ${caseScreens[2].cols}`}>
                {caseScreens[2].items.map((s, i) => (
                  <ScreenPh key={i} {...s} onZoom={setZoom} />
                ))}
              </div>
            </div>
          )}
        </div>



{/* Улучшения (вторая секция из sections2) */}
{c.sections2[1] && (
  <div className="cd-sec">
    <h2>{c.sections2[1].h2}</h2>
    <div className="cd-impr">
      {(c.sections2[1].items as string[])?.map((item, j) => (
        <div key={j} className="cd-impr-item">
          <div className="cd-impr-dot" />
          <div className="cd-impr-text">{item}</div>
        </div>
      ))}
    </div>
  </div>
)}

          {/* Results */}
           {c.results && (
            <div className="cd-sec">
              <h2>Результаты</h2>
              <div className="cd-res">
                {c.results && c.results.map((r, i) => (
                  <div key={i} className="cd-ri">
                    <div className="cd-rn">{r.n}</div>
                    <div className="cd-rd">{r.d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Contact footer */}
          <div className="cp-contacts">
            <p className="cp-contacts-h">Свяжитесь со мной</p>
            <p className="cp-contacts-sub">             
              Буду рада познакомиться и обсудить новые проекты
            </p>
            <div className="cp-contacts-links">
            <a className="pf-cl pf-cl-solid" href="https://t.me/o_solonina" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Telegram
            </a>
            <a className="pf-cl pf-cl-outline" href="https://www.linkedin.com/in/olga-solonina/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="pf-cl pf-cl-outline" href="https://docs.google.com/document/d/1oSTWz_7VED2nQaxohUJ1fyDT70CnOkDD/edit" target="_blank" rel="noreferrer">
              Резюме
            </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
