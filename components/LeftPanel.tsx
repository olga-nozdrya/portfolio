'use client';

import AudioPlayer from './AudioPlayer';
import ThemeBtn from './ThemeBtn';

export default function LeftPanel() {
  return (
    <aside className="pf-left">
      <div>
        <div className="pf-name-block">
          {/* фото только для мобилки — сверху */}
          <span className="pf-photo-mobile">
            <img className="img-bw" src="/photo-bw.png" alt="Оля" />
            <img className="img-color" src="/photo-color.png" alt="Оля" />
          </span>
          <div className="pf-line">
            <span className="pf-hi">Привет!</span>
          </div>
          <div className="pf-line">
            <span className="pf-name-txt">Меня зовут </span>
            <span className="pf-photo-wrap">  {/* скрывается на мобилке */}
              <img className="img-bw" src="/photo-bw.png" alt="Оля" />
              <img className="img-color" src="/photo-color.png" alt="Оля" />
            </span>
            <span className="pf-name-txt"> Оля</span>
          </div>
          <div className="pf-line">
            <span className="pf-role">я продуктовый<br />дизайнер</span>
          </div>
        </div>

        <p className="pf-desc">
          Более 2-х лет проектирую интерфейсы.
          Думаю как дизайнер, понимаю как разработчик
          и проектирую решения с потребностей учётом пользователей,
          бизнеса и технических ограничений
        </p>

        {/*<AudioPlayer />*/}
      </div>

<div className="pf-contacts">
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
    </aside>
  );
}
