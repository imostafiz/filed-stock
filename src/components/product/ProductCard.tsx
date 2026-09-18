import type { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCard;
