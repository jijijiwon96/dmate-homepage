import Image from 'next/image';
import Link from 'next/link';
import type { Work } from '@/lib/types';

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/work/${work.slug}`} className="group block">
      <article>
        <div
          className="relative w-full overflow-hidden bg-[#111]"
          style={{ aspectRatio: '16/9' }}
        >
          <Image
            src={work.thumbnail_url}
            alt={work.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1200px) 600px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="mt-3 md:mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] md:text-[13px] tracking-wider uppercase text-white/55">
              {work.category}
            </span>
            <span className="text-white/35">·</span>
            <span className="text-[11px] md:text-[13px] text-white/55">{work.year}</span>
          </div>
          <h3 className="text-[15px] md:text-lg font-medium mt-1 leading-snug text-white">{work.title}</h3>
          <p className="text-[13px] text-white/55 mt-0.5">{work.client}</p>
        </div>
      </article>
    </Link>
  );
}
