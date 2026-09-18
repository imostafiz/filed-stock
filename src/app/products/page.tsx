import { Suspense } from 'react';
import { getProductsServer, getCategories } from '@/lib/api/products';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/filters/FilterSidebar';
import CategoryChips from '@/components/filters/CategoryChips';
import SortSelect from '@/components/filters/SortSelect';
import MobileFilterDrawer from '@/components/filters/MobileFilterDrawer';
import SearchBox from '@/components/filters/SearchBox';
import CartButton from '@/components/cart/CartButton';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/ui/EmptyState';

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ProductsContent = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const categories = typeof params.categories === 'string' ? params.categories : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : undefined;
  const page = typeof params.page === 'string' ? params.page : undefined;
  const minPrice = typeof params.minPrice === 'string' ? params.minPrice : undefined;
  const maxPrice = typeof params.maxPrice === 'string' ? params.maxPrice : undefined;

  const { products, total, totalPages } = getProductsServer({
    search,
    category,
    categories,
    sort,
    page,
    minPrice,
    maxPrice,
  });

  const allCategories = getCategories();

  return (
    <div className="min-h-screen bg-[#F3F1EC]">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1">
            <SearchBox />
          </div>
          <CartButton />
        </div>

        <div className="mb-2">
          <CategoryChips categories={allCategories} />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A2332]">Shop Our Collection</h1>
          <p className="mt-1 text-gray-500">Discover quality products at great prices</p>
        </div>

        <div className="flex gap-8">
          <FilterSidebar categories={allCategories} />

          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {total} result{total !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-3">
                <MobileFilterDrawer categories={allCategories} />
                <SortSelect />
              </div>
            </div>

            {products.length > 0 ? <ProductGrid products={products} /> : <EmptyState />}

            <div className="mt-8">
              <Pagination totalPages={totalPages} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center bg-[#F3F1EC] text-gray-500">Loading...</div>}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
};

export default ProductsPage;
