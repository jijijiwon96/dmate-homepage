import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';

export default function AboutPreview() {
  return (
    <section className="bg-black py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <FadeUp delay={0}>
          <p className="text-white/45 text-[10px] tracking-[0.5em] uppercase mb-10">About</p>
          <h2
            className="text-white font-black leading-[1.2] tracking-[-0.01em] max-w-3xl"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            }}
          >
            IMC를 넘어,
            <br />
            통합 경험을
            <br />
            연결합니다.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-8 text-white/65 text-base md:text-lg leading-relaxed max-w-lg">
            브랜드의 문제를 발견하고, On &amp; Off 경계 없이 모든 접점을 연결하여
            브랜드 경험을 실행합니다.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-10 text-white/65 text-[13px] tracking-[0.3em] uppercase hover:text-white transition-colors"
          >
            More About Us
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
              <path d="M0 4h16M11 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
