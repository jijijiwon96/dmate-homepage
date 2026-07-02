'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const BRAND_BLUE = '#0B63AD';

type Slide = {
  client: string;
  campaign: string;
  description: string;
  slug: string;
  startAt: number;
  video: string;
  titleImage?: string;
};

const slides: Slide[] = [
  {
    client: '포스트',
    campaign: '오레오오즈바 런칭 캠페인',
    description: '새로운 크런치, 새로운 맛의 시작',
    video: '/reel-post-oreo-oz-bar.mp4',
    slug: 'post-oreo-os-bar',
    startAt: 2,
  },
  {
    client: '동서티백',
    campaign: '마음우린 호지차 런칭',
    description: '일상을 따뜻하게 감싸는 한 잔',
    video: '/reel-dongsuh-hojicha.mp4',
    slug: 'dongsuh-hojicha-launch-2025',
    titleImage: '/reel-title-dongsuh-hojicha.png',
    startAt: 14,
  },
  {
    client: 'KB자산운용',
    campaign: 'RISE ETF 런칭 캠페인',
    description: '더 쉽고 명확한 ETF 투자의 새 기준',
    video: '/reel-kb-rise-etf.mp4',
    slug: 'kb-rise-etf-launch-2025',
    titleImage: '/reel-title-kb-rise-etf.png',
    startAt: 0,
  },
  {
    client: '동서티백',
    campaign: '브랜딩 캠페인',
    description: '브랜드와 소비자를 잇는 진정성',
    video: '/reel-dongsuh-teabag.mp4',
    slug: 'dongsuh-teabag-branding-2024',
    titleImage: '/reel-title-dongsuh-teabag.png',
    startAt: 49,
  },
  {
    client: 'Tsingtao',
    campaign: '회식의 즐거움을 살려라',
    description: '함께하는 순간을 더 특별하게',
    video: '/reel-tsingtao.mp4',
    slug: 'tsingtao-imc-2017',
    titleImage: '/reel-title-tsingtao.png',
    startAt: 44,
  },
];

const AUTO_MS = 7000;
type Phase = 'intro' | 'transition' | 'reel';

export default function HeroSlideshow() {
  const [phase, setPhase]   = useState<Phase>('intro');
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('transition'), 2600);
    const t2 = setTimeout(() => setPhase('reel'),       3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 'reel') return;
    const t = setTimeout(() => setActive(p => (p + 1) % slides.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, phase]);

  useEffect(() => {
    if (phase !== 'reel') return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) { v.currentTime = slides[i].startAt; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [active, phase]);

  const goTo = useCallback((idx: number) => setActive(idx), []);
  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = () => goTo((active + 1) % slides.length);

  const exitAnim = (delay: number) =>
    `introFadeOut 0.55s cubic-bezier(0.76,0,0.24,1) ${delay}ms both`;
  const enterAnim = (delay: number) =>
    `introFadeUp  0.9s  cubic-bezier(0.76,0,0.24,1) ${delay}ms both`;

  return (
    /* 모바일: 100dvh (영상 60dvh + 정보 패널 40dvh) / 데스크탑: 100dvh 풀스크린 */
    <section className="relative w-full h-[100dvh] bg-black overflow-hidden">

      {/* ── Videos — 모바일: 상단 60dvh, 데스크탑: 전체 ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.slug}
          className="absolute inset-x-0 top-0 h-[60dvh] md:inset-0 md:h-full transition-opacity duration-700"
          style={{ opacity: phase === 'reel' && i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <video
            ref={el => { videoRefs.current[i] = el; }}
            className="w-full h-full object-cover"
            muted loop playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* ── Grain overlay — 모바일: 60dvh 영역만 ── */}
      <div
        className="absolute inset-x-0 top-0 h-[60dvh] md:inset-0 md:h-full z-10 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: phase === 'reel' ? 0.38 : 0,
          backgroundImage: 'url(/grain-overlay.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '2px 2px',
          imageRendering: 'pixelated',
        }}
      />

      {/* ── 그라디언트 — 모바일: 60dvh 영역만 ── */}
      <div
        className="absolute inset-x-0 top-0 h-[60dvh] md:inset-0 md:h-full z-10 pointer-events-none transition-opacity duration-700"
        style={{ opacity: phase === 'reel' ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* ── Intro overlay (fixed — 헤더 포함 전체 화면) ── */}
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black pointer-events-none"
        style={{
          opacity:    phase === 'reel' ? 0 : 1,
          transition: phase === 'transition' ? 'opacity 0.9s ease-in-out' : 'none',
        }}
      >
        <div className="text-center px-6">
          <h1
            className="font-black uppercase text-white leading-[0.88] tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3.5rem, 11vw, 11rem)' }}
          >
            <span className="block" style={{ animation: phase === 'transition' ? exitAnim(0) : enterAnim(50) }}>
              We Activate
            </span>
            <span className="block" style={{ animation: phase === 'transition' ? exitAnim(70) : enterAnim(200) }}>
              Your Brand
            </span>
          </h1>
          <p
            className="mt-6 text-white/40 text-[10px] tracking-[0.45em] uppercase"
            style={{ animation: phase === 'transition' ? exitAnim(0) : enterAnim(550) }}
          >
            Integrated Experience Connecting Agency
          </p>
        </div>
      </div>

      {/* ── 데스크탑 전용 Center CTA ── */}
      <div
        className="absolute inset-0 z-20 hidden md:flex items-center justify-center pointer-events-none transition-opacity duration-700"
        style={{ opacity: phase === 'reel' ? 1 : 0 }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            className="absolute flex flex-col items-center text-center px-8 transition-all duration-700 pointer-events-auto"
            style={{
              opacity:       i === active ? 1 : 0,
              transform:     i === active ? 'translateY(0)' : 'translateY(18px)',
              pointerEvents: i === active ? 'auto' : 'none',
            }}
          >
            <Link
              href={`/work/${slide.slug}`}
              className="mt-10 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/70 border border-white/30 px-7 py-3.5 hover:bg-white hover:text-black transition-colors duration-200"
            >
              View Work
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* ── Arrows — 모바일: 60dvh 영역 중앙, 데스크탑: 섹션 중앙 ── */}
      <div className="transition-opacity duration-700" style={{ opacity: phase === 'reel' ? 1 : 0 }}>
        <button
          onClick={prev}
          className="absolute left-6 md:left-10 top-[30dvh] md:top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors"
          aria-label="이전"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-6 md:right-10 top-[30dvh] md:top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors"
          aria-label="다음"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── 모바일 정보 패널 (60dvh 아래 공간) ── */}
      <div
        className="md:hidden absolute inset-x-0 top-[60dvh] bottom-0 z-20 bg-black transition-opacity duration-700"
        style={{ opacity: phase === 'reel' ? 1 : 0 }}
      >
        {/* 상단 프로그레스 바 */}
        <div className="relative h-[2px] w-full bg-white/15 overflow-hidden">
          <div
            key={`barra-m-${active}`}
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: BRAND_BLUE, animation: `barra ${AUTO_MS}ms linear forwards` }}
          />
        </div>

        {/* 슬라이드별 정보 (페이드 전환) */}
        <div className="relative px-6 pt-5 pb-14">
          {slides.map((slide, i) => (
            <div
              key={slide.slug}
              className="absolute inset-x-6 top-5 transition-all duration-500"
              style={{
                opacity:   i === active ? 1 : 0,
                transform: i === active ? 'translateY(0)' : 'translateY(8px)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-1"
                style={{ color: BRAND_BLUE }}
              >
                {slide.client}
              </p>
              <p className="text-white text-[20px] font-bold leading-tight mb-1.5">
                {slide.campaign}
              </p>
              <p className="text-white/50 text-[13px] leading-snug mb-5">
                {slide.description}
              </p>
              <Link
                href={`/work/${slide.slug}`}
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 border border-white/20 px-5 py-2.5 hover:bg-white hover:text-black transition-colors duration-200"
              >
                View Work
                <svg width="16" height="8" viewBox="0 0 20 10" fill="none">
                  <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* 슬라이드 점 네비 */}
        <div className="absolute bottom-5 left-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i === active ? BRAND_BLUE : 'rgba(255,255,255,0.3)' }}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── 데스크탑 하단 5컬럼 네비 ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 hidden md:flex transition-opacity duration-700"
        style={{ opacity: phase === 'reel' ? 1 : 0 }}
      >
        {slides.map((slide, i) => (
          <button
            key={slide.slug}
            onClick={() => goTo(i)}
            className="flex-1 text-left overflow-hidden"
          >
            <div className="relative h-[2px] bg-white/15 overflow-hidden">
              {i === active && (
                <div
                  key={`barra-${active}`}
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: BRAND_BLUE, animation: `barra ${AUTO_MS}ms linear forwards` }}
                />
              )}
            </div>
            <div className="px-6 pt-3 pb-5">
              <p
                className="text-[12px] font-semibold truncate transition-colors duration-300 leading-snug tracking-wider uppercase"
                style={{ color: i === active ? BRAND_BLUE : 'rgba(255,255,255,0.2)' }}
              >
                {slide.client}
              </p>
              <p
                className="text-[15px] truncate transition-colors duration-300 leading-snug mt-0.5"
                style={{ color: i === active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.25)', fontWeight: i === active ? 600 : 400 }}
              >
                {slide.campaign}
              </p>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes introFadeUp {
          from { opacity: 0; transform: translateY(42px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes introFadeOut {
          from { opacity: 1; transform: translateY(0);     }
          to   { opacity: 0; transform: translateY(-38px); }
        }
        @keyframes barra {
          from { width: 0%;   }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
