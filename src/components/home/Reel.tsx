'use client';

import { useEffect, useRef } from 'react';

export default function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden" style={{ aspectRatio: '16/9' }}>
      {/* Placeholder — replace with actual reel video in Phase 2 */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
        <div className="text-center text-white">
          <p className="text-[#6b6b6b] text-xs tracking-[0.4em] uppercase mb-4">Reel</p>
          <p className="text-white text-2xl md:text-4xl font-bold tracking-tight">D-MATE 작업물</p>
        </div>
      </div>
      {/* When actual video is available, uncomment:
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/reel/poster.jpg"
      >
        <source src="/reel/reel.webm" type="video/webm" />
        <source src="/reel/reel.mp4" type="video/mp4" />
      </video>
      */}
      <p className="absolute bottom-4 right-6 text-white/40 text-xs tracking-wider">
        D-MATE 작업물 종합
      </p>
    </section>
  );
}
