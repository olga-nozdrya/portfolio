'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  objectFit?: 'cover' | 'contain';
  wrapperStyle?: React.CSSProperties;
}

export default function SkeletonImage({ src, alt = '', style, className, objectFit = 'cover', wrapperStyle }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...wrapperStyle }}>
      {!loaded && (
        <div
          className="skeleton"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          ...style,
        }}
      />
    </div>
  );
}