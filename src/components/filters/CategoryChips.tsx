'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type CategoryChipsProps = {
  categories: string[];
};

const CategoryChips = ({ categories }: CategoryChipsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryClick('')}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          activeCategory === ''
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
