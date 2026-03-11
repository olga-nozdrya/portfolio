export default function ContactSection() {
  return (
    <div className="cp-contacts">
      <p className="cp-contacts-h">Свяжитесь со мной</p>
      <p className="cp-contacts-sub">
        Буду рада познакомиться и обсудить новые проекты
      </p>
      <div className="cp-contacts-links">
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
        <a className="pf-cl pf-cl-outline" href="https://docs.google.com/document/d/1oSTWz_7VED2nQaxohUJ1fyDT70CnOkDD/edit" target="_blank" rel="noreferrer">
          Резюме
        </a>
      </div>
    </div>
  );
}
