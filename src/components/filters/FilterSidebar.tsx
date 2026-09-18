'use client';

import CategoryChips from './CategoryChips';
import PriceRangeFilter from './PriceRangeFilter';
import SortSelect from './SortSelect';

type FilterSidebarProps = {
  categories: string[];
};

const FilterSidebar = ({ categories }: FilterSidebarProps) => {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Sort By</h3>
        <SortSelect />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Category</h3>
        <CategoryChips categories={categories} />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Price Range</h3>
        <PriceRangeFilter />
      </div>
    </aside>
  );
};

export default FilterSidebar;
