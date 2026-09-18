'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type CategoryChipsProps = {
  categories: string[];
};

const CategoryChips = ({ categories }: CategoryChipsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriesParam = searchParams.get('categories') || '';
  const selected = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let updated: string[];
    if (cat === '') {
      updated = [];
    } else if (selected.includes(cat)) {
      updated = selected.filter((c) => c !== cat);
    } else {
      updated = [...selected, cat];
    }
    if (updated.length > 0) {
      params.set('categories', updated.join(','));
    } else {
      params.delete('categories');
    }
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => handleCategoryClick('')}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selected.length === 0
            ? 'bg-[#1A2332] text-white'
            : 'border border-gray-200 bg-white text-[#1A2332] hover:bg-gray-50'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected.includes(cat)
              ? 'bg-[#1A2332] text-white'
              : 'border border-gray-200 bg-white text-[#1A2332] hover:bg-gray-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
