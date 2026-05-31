'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'

interface Props {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  objectFit?: 'cover' | 'contain';
  wrapperStyle?: React.CSSProperties;
  priority?: boolean;
}

export default function SkeletonImage({ src, alt = '', style, className, objectFit = 'cover', wrapperStyle, priority }: Props) {
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
    <Image
    ref={imgRef as any}
    src={src}
    alt={alt}
    quality={100}
    width={1280}
    height={720}
    style={{ objectFit, opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
    onLoad={() => setLoaded(true)}
   // priority={priority}
    />
    </div>
  );
}