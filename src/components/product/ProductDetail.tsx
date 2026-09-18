import type { Product } from '@/types/product';

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
