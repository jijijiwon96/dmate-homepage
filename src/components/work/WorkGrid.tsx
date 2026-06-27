'use client';

import { motion } from 'framer-motion';
import WorkCard from './WorkCard';
import type { Work } from '@/lib/types';

interface WorkGridProps {
  works: Work[];
  activeCategory: string;
  activeBrand?: string;
}

function getBrand(client: string): string {
  if (client.includes('동서식품') || (client.includes('동서') && !client.includes('이'))) return '동서식품';
  if (client === '포스트' || client.includes('포스트')) return '포스트';
  if (client.includes('KB자산운용')) return 'KB자산운용';
  if (client.includes('소니') || client.toLowerCase().includes('sony')) return 'SONY';
  if (
    client.includes('하이트진로') ||
    client.includes('필라이트') ||
    client.includes('칭따오') ||
    client.includes('Tsingtao') ||
    client.includes('칼스버그') ||
    client.toLowerCase().includes('carlsberg')
  )
    return '맥주';
  if (
    client.includes('보령') ||
    client.includes('갈더마') ||
    client.includes('지근억') ||
    client.includes('애즈유') ||
    client.includes('아임비타')
  )
    return '제약';
  if (client.includes('현대자동차') || client.includes('현대차')) return '현대자동차';
  if (client === 'SKT') return 'SKT';
  return '기타';
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function WorkGrid({ works, activeCategory, activeBrand }: WorkGridProps) {
  const byCat =
    activeCategory === 'all'
      ? works
      : works.filter((w) => w.category === activeCategory);

  const filtered =
    !activeBrand || activeBrand === 'all'
      ? byCat
      : byCat.filter((w) => {
          const mapped = getBrand(w.client);
          if (mapped === activeBrand) return true;
          if (w.client.includes(activeBrand) || activeBrand.includes(w.client)) return true;
          return false;
        });

  const sorted = [...filtered].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return parseInt(b.id) - parseInt(a.id);
  });

  if (sorted.length === 0) {
    return (
      <div className="py-24 text-center text-white/55 text-base">
        해당 카테고리의 작업물이 없습니다.
      </div>
    );
  }

  return (
    <motion.div
      // key forces animation reset on every filter change
      key={`${activeCategory}-${activeBrand ?? 'all'}`}
      className="grid grid-cols-2 gap-3 md:gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {sorted.map((work) => (
        <motion.div key={work.id} variants={item}>
          <WorkCard work={work} />
        </motion.div>
      ))}
    </motion.div>
  );
}
