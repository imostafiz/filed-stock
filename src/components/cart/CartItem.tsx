import type { CartItem as CartItemType } from '@/types/product';

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div>
      <span>{item.product.title}</span>
      <span>{item.quantity}</span>
    </div>
  );
};

export default CartItem;
