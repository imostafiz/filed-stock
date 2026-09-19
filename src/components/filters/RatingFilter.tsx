'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const RATING_OPTIONS = [
  { value: '', label: 'All ratings' },
  { value: '4', label: '4★ & up' },
  { value: '3', label: '3★ & up' },
  { value: '2', label: '2★ & up' },
];

const RatingFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRating = searchParams.get('minRating') || '';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('minRating', value);
    } else {
      params.delete('minRating');
    }
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">Rating</p>
      <select
        value={currentRating}
        onChange={(event) => handleChange(event.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#1A2332] transition-colors hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
        aria-label="Filter by minimum rating"
      >
        {RATING_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RatingFilter;
