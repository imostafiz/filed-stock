import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

type RelatedProductsProps = {
  products: Product[];
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div>
      <h2>Related Products</h2>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
