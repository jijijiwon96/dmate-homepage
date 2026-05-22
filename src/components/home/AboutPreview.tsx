import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-8">About</p>
          <h2
            className="font-bold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            IMC를 넘어,
            <br />
            통합 경험을 연결합니다.
          </h2>
          <p className="mt-6 text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
            우리는 브랜드 경험을 하나로 연결하는 것이 중요하다고 생각합니다.
            On &amp; Off 경계없이 브랜드를 이야기할 수 있는 모든 접점을 연결하여
            브랜드를 경험할 수 있도록 제안하고 실행합니다.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-10 text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors"
          >
            More About Us
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
