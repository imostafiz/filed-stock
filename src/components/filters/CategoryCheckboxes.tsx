'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORY_ICONS: Record<string, string> = {
  Electronics: '⚡',
  Clothing: '👕',
  'Home & Kitchen': '🏠',
  Books: '📚',
  'Sports & Outdoors': '⚽',
  'Toys & Games': '🎮',
  Automotive: '🚗',
  'Health & Beauty': '💄',
  'Garden & Outdoor': '🌿',
  'Office Supplies': '📎',
};

type CategoryCheckboxesProps = {
  categories: string[];
};

const CategoryCheckboxes = ({ categories }: CategoryCheckboxesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriesParam = searchParams.get('categories') || '';
  const selected = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];

  const toggleCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let updated: string[];
    if (selected.includes(cat)) {
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
    <div>
      <h3 className="mb-3 text-xs font-bold tracking-widest text-[#1A2332] uppercase">Filters</h3>
      <p className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</p>
      <div className="space-y-1">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="h-4 w-4 rounded border-gray-300 text-[#1A2332] accent-[#1A2332]"
            />
            <span className="text-base leading-none">{CATEGORY_ICONS[cat] || '📦'}</span>
            <span className="text-[#1A2332]">{cat}</span>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('categories');
            params.delete('page');
            router.push(`/products?${params.toString()}`);
          }}
          className="mt-3 text-xs font-medium text-[#C15F3C] hover:text-[#a85235]"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default CategoryCheckboxes;
