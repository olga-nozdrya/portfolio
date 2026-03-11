'use client';

interface Props {
  variant: 'v1' | 'v2' | 'v3';
}

const COLORS = {
  v1: ['#e0e0e0', '#cacaca'],
  v2: ['#cce0dc', '#b8d0cc'],
  v3: ['#d8d4ec', '#c4bedd'],
};

const ICONS = ['🚗', '📦'];

export default function PhoneMockup({ variant }: Props) {
  const [c1, c2] = COLORS[variant] || COLORS.v1;
  return (
    <div className="phone-pair">
      {[0, 1].map((k) => (
        <div key={k} className="phone-mock">
          <div className="phone-scr">
            <div className="phone-notch" />
            <div
              className="phone-img"
              style={{ background: `linear-gradient(135deg,${c1},${c2})` }}
            >
              {ICONS[k]}
            </div>
            <div className="phone-row" style={{ width: '80%' }} />
            <div className="phone-row" style={{ width: '55%' }} />
            <div className="phone-price">20 950 000 ₽</div>
            <div className="phone-btn-mock" />
          </div>
        </div>
      ))}
    </div>
  );
}
