'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'IMC', label: 'IMC' },
  { value: '런칭', label: '런칭' },
  { value: 'Issue-up', label: 'Issue-up' },
  { value: 'Sales-up', label: 'Sales-up' },
];

export default function CategoryFilter({ active }: { active: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value.toLowerCase());
    }
    router.push(`/work?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => {
        const isActive =
          active === cat.value ||
          (cat.value === 'all' && active === 'all');
        return (
          <button
            key={cat.value}
            onClick={() => handleSelect(cat.value)}
            className={[
              'shrink-0 px-4 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200',
              isActive
                ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                : 'bg-white text-[#0a0a0a] border-[#e5e5e5] hover:border-[#0a0a0a]',
            ].join(' ')}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
