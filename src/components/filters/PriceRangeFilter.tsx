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
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
        min="0"
      />
      <span className="text-gray-500">–</span>
      <input
        type="number"
        placeholder="Max"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
        min="0"
      />
      <button
        onClick={handleApply}
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go
      </button>
    </div>
  );
};

export default PriceRangeFilter;
