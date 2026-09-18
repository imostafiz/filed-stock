'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const PriceRangeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [min, setMin] = useState(searchParams.get('minPrice') || '');
  const [max, setMax] = useState(searchParams.get('maxPrice') || '');

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (min) {
      params.set('minPrice', min);
    } else {
      params.delete('minPrice');
    }
    if (max) {
      params.set('maxPrice', max);
    } else {
      params.delete('maxPrice');
    }
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-[#1A2332] transition-colors hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
          min="0"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          placeholder="Max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-[#1A2332] transition-colors hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
          min="0"
        />
      </div>
      <button
        onClick={handleApply}
        className="w-full rounded-lg bg-[#1A2332] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#253448]"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceRangeFilter;
