'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type CategoryChipsProps = {
  categories: string[];
};

const CategoryChips = ({ categories }: CategoryChipsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriesParam = searchParams.get('categories') || '';
  const selected = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

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
    <div className="group flex items-center gap-1">
      <button
        onClick={() => scroll('left')}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1A2332] transition-all ${
          canScrollLeft
            ? 'opacity-100 hover:bg-gray-50 hover:shadow-sm'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div ref={scrollRef} className="scrollbar-hide flex flex-1 gap-2 overflow-x-auto">
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

      <button
        onClick={() => scroll('right')}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1A2332] transition-all ${
          canScrollRight
            ? 'opacity-100 hover:bg-gray-50 hover:shadow-sm'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryChips;
