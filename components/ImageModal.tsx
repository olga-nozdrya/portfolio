'use client';

import { useEffect } from 'react';

interface ModalItem {
  icon: string;
  label: string;
  src?: string;
}

interface Props {
  item: ModalItem;
  onClose: () => void;
}

export default function ImageModal({ item, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="img-modal-overlay" onClick={onClose}>
      <div className="img-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="img-modal-close" onClick={onClose}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        {item.src ? (
          <img src={item.src} alt={item.label} />
        ) : (
          <div className="img-modal-ph">
            <div className="ph-icon">{item.icon}</div>
            <div className="ph-label">{item.label}</div>
          </div>
        )}
      </div>
    </div>
  );
}
