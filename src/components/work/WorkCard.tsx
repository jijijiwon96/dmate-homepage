import Image from 'next/image';
import Link from 'next/link';
import type { Work } from '@/lib/types';

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/work/${work.slug}`} className="group cursor-pointer block">
      <article>
        <div
          className="relative w-full overflow-hidden bg-[#f5f5f5]"
          style={{ aspectRatio: '16/9' }}
        >
          <Image
            src={work.thumbnail_url}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1200px) 600px, 50vw"
          />
        </div>
        <div className="mt-3 md:mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs tracking-wider uppercase text-[#6b6b6b]">
              {work.category}
            </span>
            <span className="text-[#e5e5e5]">·</span>
            <span className="text-[10px] md:text-xs text-[#6b6b6b]">{work.year}</span>
          </div>
          <h3 className="text-sm md:text-base font-medium mt-1 leading-snug">{work.title}</h3>
          <p className="text-xs text-[#6b6b6b] mt-0.5">{work.client}</p>
        </div>
      </article>
    </Link>
  );
}
