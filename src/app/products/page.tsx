import { Suspense } from 'react';
import { getProductsServer, getCategories } from '@/lib/api/products';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/filters/FilterSidebar';
import SearchBox from '@/components/filters/SearchBox';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/ui/EmptyState';

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ProductsContent = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : undefined;
  const page = typeof params.page === 'string' ? params.page : undefined;
  const minPrice = typeof params.minPrice === 'string' ? params.minPrice : undefined;
  const maxPrice = typeof params.maxPrice === 'string' ? params.maxPrice : undefined;

  const { products, total, totalPages } = getProductsServer({
    search,
    category,
    sort,
    page,
    minPrice,
    maxPrice,
  });

  const categories = getCategories();

  return (
    <div>
      <div className="mb-6">
        <SearchBox />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full shrink-0 lg:w-64">
          <FilterSidebar categories={categories} />
        </div>

        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            {total} product{total !== 1 ? 's' : ''} found
          </div>

          {products.length > 0 ? <ProductGrid products={products} /> : <EmptyState />}

          <div className="mt-8">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
