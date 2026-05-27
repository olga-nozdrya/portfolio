'use client';
import { useRef, useState } from 'react';

interface Props {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  wrapperStyle?: React.CSSProperties;
}

export default function SkeletonVideo({ src, style, className, wrapperStyle }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...wrapperStyle }}>
      {!loaded && (
        <div
          className="skeleton"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        onCanPlay={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          ...style,
        }}
      />
    </div>
  );
}