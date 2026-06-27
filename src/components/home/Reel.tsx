'use client';

import { useEffect, useRef } from 'react';

export default function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src="/2020%EB%94%94%EB%A9%94%EC%9D%B4%ED%8A%B8%20_%ED%83%80%EC%9D%B4%ED%8B%80%EC%98%81%EC%83%81_F.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
