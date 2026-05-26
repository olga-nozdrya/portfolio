'use client';

import { useRouter } from 'next/navigation';
import ThemeBtn from './ThemeBtn';
import ContactSection from './ContactSection';
import { CaseData, CaseBlock } from '@/lib/data';

export default function CasePageClient({ c }: { c: CaseData }) {
  const router = useRouter();

  return (
    <div className="cd-page">
      {/* Nav */}
      <nav className="cp-nav">
        <button className="cp-back" onClick={() => router.push('/')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M3 7L6 4M3 7L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          На главную
        </button>
        <span className="cp-logo">Оля Солонина · Портфолио</span>
        <div className="cp-nav-actions"><ThemeBtn /></div>
      </nav>

      {/* Content */}
      <div className="cd-content">
        {c.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
}

function renderBlock(block: CaseBlock, i: number) {
  switch (block.type) {

    case 'heading':
      return (
        <div key={i} className="cd-heading-row">
          <div className="cd-heading-left">
            <h1 className="cd-h1">{block.h1}</h1>
            <p className="cd-category">{block.category}</p>
          </div>
          <p className="cd-intro">{block.intro}</p>
        </div>
      );

    case 'hero':
      return (
        <div key={i} className="cd-hero">
          <img src={block.src} alt="" />
        </div>
      );

    case 'metrics':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">{block.label}</h2>
          <div className="cd-metrics">
            {block.items.map((m, j) => (
              <div key={j} className="cd-metric-card">
                <div className="cd-metric-value">{m.value}</div>
                <div className="cd-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'role':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">Моя роль</h2>
          <div className="cd-divider-list">
            {block.items.map((item, j) => (
              <div key={j} className="cd-divider-item">
                <p>{item}</p>
                <div className="cd-hr" />
              </div>
            ))}
          </div>
        </div>
      );

    case 'problem':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">Проблема</h2>
          <div className="cd-problem-content">
            {block.text && <p className="cd-body-text">{block.text}</p>}
            <div className="cd-cards">
              {block.cards?.map((card, j) => (
                <div key={j} className="cd-card">
                  <div className="cd-card-title">{card.title}</div>
                  <div className="cd-card-body">{card.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'quote':
      return (
        <p key={i} className="cd-quote">{block.text}</p>
      );

    case 'research':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">{block.label}</h2>
          <div className="cd-research-sections">
            {block.sections.map((s, j) => (
              <div key={j} className="cd-research-item">
                <h3 className="cd-h3">{s.h3}</h3>
                <p className="cd-body-text" dangerouslySetInnerHTML={{ __html: s.body ?? "" }} />
                {s.list && s.list.type == 'bullet' && (
                  <ul className="cd-list">
                    {s.list.items.map((li, k) => <li key={k}>{li}</li>)}
                  </ul>
                )}
                {s.list && s.list.type == 'stroke' && (
                  <div className="cd-divider-list">
                    {s.list.items.map((item, j) => (
                      <div key={j} className="cd-divider-item">
                        <p>{item}</p>
                        <div className="cd-hr" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

      case 'numbered-list':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">{block.label}</h2>
          <div className="cd-divider-list">
            {block.items.map((item, j) => (
              <div key={j} className="cd-divider-item">
                <p>{item}</p>
                <div className="cd-hr" />
              </div>
            ))}
          </div>
        </div>
      );

    case 'shot':
    return (
        <div key={i} className="cd-before">
          <div className="cd-shot">
            <img src={block.src} alt="" />
          </div>
        </div>
      );  

    case 'process':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">Что было сделано</h2>
          <div className="cd-process-sections">
            {block.sections.map((s, j) => (
              <div key={j} className="cd-process-item">
                <h3 className="cd-h3">{s.h3}</h3>
                <div className="cd-divider-list">
                  {s.items.map((item, k) => (
                    <div key={k} className="cd-divider-item">
                      <p>{item}</p>
                      <div className="cd-hr" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'before':
      return (
        <div key={i} className="cd-before">
          <h2 className="cd-section-label-full">{block.label}</h2>
          <div className="cd-shot">
            <img src={block.src} alt="" />
          </div>
        </div>
      );

    case 'solution-group':
  return (
    <div key={i} className="cd-solutions">
      {block.sections.map((s, j) => (
        <div key={j} className="cd-solution">
          {j === 0 && (
            <div className="cd-solution-header">
              <h2 className="cd-section-label">Решение</h2>
              <div className="cd-solution-header-right">
                <h3 className="cd-solution-h3">{s.h3}</h3>
                <p className="cd-solution-desc">{s.description}</p>
              </div>
            </div>
          )}
          {j > 0 && (
            <div className="cd-solution-header">
              <div className="cd-solution-header-left" />
              <div className="cd-solution-header-right">
                <h3 className="cd-solution-h3">{s.h3}</h3>
                <p className="cd-solution-desc">{s.description}</p>
              </div>
            </div>
          )}
          {s.shots?.map((shot, k) => (
            <div key={k} className="cd-shot">
              {shot.screens.map((screen, l) => (
                <img key={l} src={screen.src} alt="" className={`cd-shot-screen cd-shot-screen--${screen.position || 'center'}`} />
              ))}
            </div>
          ))}

          {s.videos?.map((video, k) => (
                <div key={k} className="cd-shot">
                  {video.item.map((vid, l) => (
                    <video
                      key={l}
                      src={vid.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ))}
                </div>
              ))}
        </div>
      ))}
    </div>
  );

    case 'improvements':
      return (
        <div key={i} className="cd-section-row">
          <h2 className="cd-section-label">Возможные улучшения</h2>
          <p className="cd-body-text cd-body-text--right">{block.text}</p>
        </div>
      );

    case 'contacts':
      return <ContactSection key={i} />;

    default:
      return null;
  }
}