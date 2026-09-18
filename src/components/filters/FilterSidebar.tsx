'use client';

import CategoryCheckboxes from './CategoryCheckboxes';
import PriceRangeFilter from './PriceRangeFilter';

type FilterSidebarProps = {
  categories: string[];
};

const FilterSidebar = ({ categories }: FilterSidebarProps) => {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-4 space-y-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <CategoryCheckboxes categories={categories} />
        <div className="border-t border-gray-100 pt-4">
          <p className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Price Range
          </p>
          <PriceRangeFilter />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
