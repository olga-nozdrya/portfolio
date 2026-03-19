'use client';

import { useState } from "react";

interface ModalItem {
  icon: string;
  label: string;
  src?: string;
}

interface Props {
  icon: string;
  label: string;
  tall?: boolean;
  short?: boolean;
  src?: string;
  onZoom: (item: ModalItem) => void;
}

export default function ScreenPh({ icon, label, tall, short, src, onZoom }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="cd-screen-ph" onClick={() => onZoom({ icon, label, src })}>
      <div className="cd-screen-foot">
        <span className="cd-screen-name">{label}</span>
      </div>
      <div className={`cd-screen-img${tall ? ' tall' : short ? ' short' : ''}`}>
          {!loaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
          <img
            src={src}
            alt={label}
            onLoad={() => setLoaded(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
          />
          <div className="cd-screen-hover">Нажмите, чтобы посмотреть поближе</div>
      </div>
    </div>
  );
}
