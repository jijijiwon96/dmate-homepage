import Image from 'next/image';
import Link from 'next/link';
import { getWorks } from '@/lib/data/works';
import FadeUp from '@/components/ui/FadeUp';

export default async function WorkPreview() {
  const works = await getWorks();

  // 홈 노출 캠페인 고정 순서
  const FEATURED_SLUGS = [
    'sony-performance-2022',        // 소니 퍼포먼스 캠페인
    'fastcampus-launch-2020',       // 패스트캠퍼스 가벼운학습지 런칭
    'dongsuh-boricha-launch-2022',  // 동서 한잔용 보리차 런칭
    'hyundai-avante-anniversary-2019', // 현대차 아반떼 30주년
  ];
  const preview = FEATURED_SLUGS
    .map(slug => works.find(w => w.slug === slug))
    .filter((w): w is NonNullable<typeof w> => !!w);

  return (
    <section id="work" style={{ scrollMarginTop: '72px' }}>
      {/* Section header — 빅 타이포 WORK */}
      <div className="px-6 md:px-10 pt-10 pb-4 flex items-end justify-between">
        <FadeUp delay={0}>
          <h2
            className="text-white font-black uppercase leading-none tracking-[-0.02em]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            }}
          >
            Work
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <Link
            href="/work"
            className="flex items-center gap-2 text-[#0B63AD] text-xs tracking-[0.2em] uppercase hover:text-[#0B63AD]/70 transition-colors pb-2"
          >
            View all work
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
              <path d="M0 4h16M11 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </FadeUp>
      </div>

      {/* 2-column grid — RGA style */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {preview.map((work, index) => (
          <FadeUp key={work.id} delay={0.06 * index}>
            <Link
              href={`/work/${work.slug}`}
              className="group block border-b border-white/[0.07] md:odd:border-r md:odd:border-white/[0.07]"
            >
              {/* Thumbnail */}
              <div
                className="relative w-full overflow-hidden bg-[#0a0a0a]"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={work.thumbnail_url}
                  alt={work.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Text row — RGA style */}
              <div className="px-5 md:px-7 py-5 flex items-start justify-between gap-4 border-t border-white/[0.07]">
                <div className="min-w-0">
                  <p className="text-white/55 text-[11px] tracking-[0.35em] uppercase mb-1.5">
                    {work.client}
                  </p>
                  <h3
                    className="text-white group-hover:text-[#0B63AD] transition-colors duration-300 font-bold uppercase leading-snug tracking-tight"
                    style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.45rem)' }}
                  >
                    {work.title}
                  </h3>
                  {work.description && (
                    <p className="text-white/50 text-sm leading-relaxed mt-2 line-clamp-2 max-w-sm">
                      {work.description}
                    </p>
                  )}
                </div>

                {/* Plus icon */}
                <div className="flex-shrink-0 mt-0.5 text-white/25 group-hover:text-[#0B63AD] group-hover:rotate-45 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
