'use client';

import { useState } from 'react';
import CategoryCheckboxes from './CategoryCheckboxes';
import PriceRangeFilter from './PriceRangeFilter';

type MobileFilterDrawerProps = {
  categories: string[];
};

const MobileFilterDrawer = ({ categories }: MobileFilterDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-[#1A2332] px-4 py-2 text-sm font-medium text-[#1A2332] transition-colors hover:bg-[#1A2332] hover:text-white lg:hidden"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        Filters
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl transition-transform lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-lg font-bold text-[#1A2332]">Filters</h2>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6 p-5">
              <CategoryCheckboxes categories={categories} />
              <div className="border-t border-gray-100 pt-4">
                <p className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Price Range
                </p>
                <PriceRangeFilter />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileFilterDrawer;
