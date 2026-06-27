'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryFilter from './CategoryFilter';
import WorkGrid from './WorkGrid';
import type { Work } from '@/lib/types';

interface Props {
  works: Work[];
}

function parseCategory(raw: string | null): string {
  if (!raw) return 'all';
  const map: Record<string, string> = { imc: 'IMC', '런칭': '런칭', 'issue-up': 'Issue-up', 'sales-up': 'Sales-up' };
  return map[raw.toLowerCase()] ?? 'all';
}

export default function WorkPageClient({ works }: Props) {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(() => parseCategory(searchParams.get('category')));
  const [activeBrand, setActiveBrand] = useState(() => searchParams.get('brand') ?? 'all');

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    // Update URL without triggering Next.js navigation
    const params = new URLSearchParams(window.location.search);
    if (value === 'all') params.delete('category');
    else params.set('category', value.toLowerCase());
    const qs = params.toString();
    window.history.replaceState(null, '', `/work${qs ? `?${qs}` : ''}`);
  };

  const handleBrand = (value: string) => {
    setActiveBrand(value);
    const params = new URLSearchParams(window.location.search);
    if (value === 'all') params.delete('brand');
    else params.set('brand', value);
    const qs = params.toString();
    window.history.replaceState(null, '', `/work${qs ? `?${qs}` : ''}`);
  };

  return (
    <div className="bg-black pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="mb-10 md:mb-16">
        <h1
          className="text-white font-black uppercase leading-none tracking-[-0.02em] mb-8"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 7rem)',
          }}
        >
          Work
        </h1>
        <CategoryFilter
          active={activeCategory}
          activeBrand={activeBrand}
          onCategory={handleCategory}
          onBrand={handleBrand}
        />
      </div>
      <WorkGrid works={works} activeCategory={activeCategory} activeBrand={activeBrand} />
    </div>
  );
}
