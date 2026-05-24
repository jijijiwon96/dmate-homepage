import { Suspense } from 'react';
import { getWorks } from '@/lib/data/works';
import CategoryFilter from '@/components/work/CategoryFilter';
import WorkGrid from '@/components/work/WorkGrid';

interface WorkPageProps {
  searchParams: Promise<{ category?: string; brand?: string }>;
}

export const metadata = {
  title: 'Work',
  description: 'D-MATE의 캠페인 포트폴리오입니다.',
};

async function WorkContent({ category, brand }: { category: string; brand?: string }) {
  const works = await getWorks();
  return <WorkGrid works={works} activeCategory={category} activeBrand={brand} />;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const rawCategory = params.category ?? 'all';
  const activeBrand = params.brand;

  // Normalize category value
  const categoryMap: Record<string, string> = {
    imc: 'IMC',
    '런칭': '런칭',
    'issue-up': 'Issue-up',
    'sales-up': 'Sales-up',
    all: 'all',
  };
  const activeCategory = categoryMap[rawCategory.toLowerCase()] ?? rawCategory;

  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Page header */}
      <div className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Work</h1>
        <Suspense fallback={null}>
          <CategoryFilter active={activeCategory} activeBrand={activeBrand} />
        </Suspense>
      </div>

      {/* Grid */}
      <Suspense fallback={
        <div className="grid grid-cols-2 gap-3 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#f5f5f5] animate-pulse" style={{ aspectRatio: '16/9' }} />
          ))}
        </div>
      }>
        <WorkContent category={activeCategory} brand={activeBrand} />
      </Suspense>
    </div>
  );
}
