import WorkCard from './WorkCard';
import type { Work } from '@/lib/types';

interface WorkGridProps {
  works: Work[];
  activeCategory: string;
  activeBrand?: string;
}

function getBrand(client: string): string {
  if (client.includes('동서식품') || (client.includes('동서') && !client.includes('이'))) return '동서식품';
  if (client.includes('포스트')) return '포스트';
  if (client.includes('현대자동차') || client.includes('현대차')) return '현대자동차';
  if (client.includes('보령제약') || client.includes('보령컨슈머')) return '보령제약';
  if (client === 'SKT') return 'SKT';
  return '기타';
}

export default function WorkGrid({ works, activeCategory, activeBrand }: WorkGridProps) {
  const byCat =
    activeCategory === 'all'
      ? works
      : works.filter((w) => w.category === activeCategory);

  const filtered =
    !activeBrand || activeBrand === 'all'
      ? byCat
      : byCat.filter((w) => getBrand(w.client) === activeBrand);

  const sorted = [...filtered].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return parseInt(b.id) - parseInt(a.id);
  });

  if (sorted.length === 0) {
    return (
      <div className="py-24 text-center text-[#6b6b6b] text-sm">
        해당 카테고리의 작업물이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-8">
      {sorted.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
}
