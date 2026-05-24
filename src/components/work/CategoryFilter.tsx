'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'IMC', label: 'IMC' },
  { value: '런칭', label: '런칭' },
  { value: 'Issue-up', label: 'Issue-up' },
  { value: 'Sales-up', label: 'Sales-up' },
];

const brands: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  { value: '동서식품', label: '동서식품' },
  { value: '포스트', label: '포스트' },
  { value: '현대자동차', label: '현대자동차' },
  { value: '보령제약', label: '보령제약' },
  { value: 'SKT', label: 'SKT' },
  { value: '기타', label: '기타' },
];

export default function CategoryFilter({ active, activeBrand }: { active: string; activeBrand?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value.toLowerCase());
    }
    router.push(`/work?${params.toString()}`, { scroll: false });
  };

  const handleBrand = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('brand');
    } else {
      params.set('brand', value);
    }
    router.push(`/work?${params.toString()}`, { scroll: false });
  };

  const currentBrand = activeBrand ?? 'all';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => {
          const isActive =
            active === cat.value ||
            (cat.value === 'all' && active === 'all');
          return (
            <button
              key={cat.value}
              onClick={() => handleCategory(cat.value)}
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
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {brands.map((brand) => {
          const isActive = currentBrand === brand.value;
          return (
            <button
              key={brand.value}
              onClick={() => handleBrand(brand.value)}
              className={[
                'shrink-0 px-4 py-1.5 text-xs tracking-wider border transition-all duration-200',
                isActive
                  ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                  : 'bg-white text-[#0a0a0a] border-[#e5e5e5] hover:border-[#0a0a0a]',
              ].join(' ')}
            >
              {brand.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
