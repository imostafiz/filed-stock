import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

type RelatedProductsProps = {
  products: Product[];
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-[#1A2332]">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
