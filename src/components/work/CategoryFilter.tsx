'use client';

const categories: Array<{ value: string; label: string }> = [
  { value: 'all',      label: 'All' },
  { value: 'IMC',      label: 'IMC' },
  { value: '런칭',     label: 'Launching' },
  { value: 'Issue-up', label: 'Issue-up' },
  { value: 'Sales-up', label: 'Sales-up' },
];

const brands: Array<{ value: string; label: string }> = [
  { value: 'all',      label: 'All' },
  { value: '동서식품',  label: '동서식품' },
  { value: '포스트',   label: '포스트' },
  { value: 'KB자산운용', label: 'KB자산운용' },
  { value: 'SONY',    label: 'SONY' },
  { value: '맥주',    label: '맥주' },
  { value: '제약',    label: '제약' },
  { value: '현대자동차', label: '현대자동차' },
  { value: 'SKT',    label: 'SKT' },
  { value: '기타',    label: '기타' },
];

interface Props {
  active: string;
  activeBrand?: string;
  onCategory: (value: string) => void;
  onBrand: (value: string) => void;
}

export default function CategoryFilter({ active, activeBrand, onCategory, onBrand }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategory(cat.value)}
            className={[
              'shrink-0 px-4 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200',
              active === cat.value
                ? 'bg-[#0B63AD] text-white border-[#0B63AD]'
                : 'bg-black text-white border-white/20 hover:border-white',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {brands.map((brand) => (
          <button
            key={brand.value}
            onClick={() => onBrand(brand.value)}
            className={[
              'shrink-0 px-4 py-1.5 text-xs tracking-wider border transition-all duration-200',
              (activeBrand ?? 'all') === brand.value
                ? 'bg-[#0B63AD] text-white border-[#0B63AD]'
                : 'bg-black text-white border-white/20 hover:border-white',
            ].join(' ')}
          >
            {brand.label}
          </button>
        ))}
      </div>
    </div>
  );
}
