import WorkCard from './WorkCard';
import type { Work } from '@/lib/types';

interface WorkGridProps {
  works: Work[];
  activeCategory: string;
}

export default function WorkGrid({ works, activeCategory }: WorkGridProps) {
  const filtered =
    activeCategory === 'all'
      ? works
      : works.filter((w) => w.category === activeCategory);

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center text-[#6b6b6b] text-sm">
        해당 카테고리의 작업물이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-8">
      {filtered.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
}
