import Image from 'next/image';
import Link from 'next/link';
import { getWorks } from '@/lib/data/works';

export default async function WorkPreview() {
  const works = await getWorks();
  const preview = works.slice(0, 4);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Work</h2>
        <Link
          href="/work"
          className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors flex items-center gap-2"
        >
          View All Work
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {preview.map((work) => (
          <Link key={work.id} href="/work" className="group block">
            <div className="relative w-full overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: '16/9' }}>
              <Image
                src={work.thumbnail_url}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1200px) 600px, 50vw"
              />
            </div>
            <div className="mt-3">
              <p className="text-xs text-[#6b6b6b] tracking-wider uppercase">{work.category}</p>
              <p className="text-sm font-medium mt-1 leading-snug">{work.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
