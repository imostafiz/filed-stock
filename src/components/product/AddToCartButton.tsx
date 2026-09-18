'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/lib/store/cart-store';
import type { Product } from '@/types/product';

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock === 0;

  const handleClick = () => {
    if (isOutOfStock) return;
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isOutOfStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 text-sm font-semibold text-gray-500"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors ${
        added ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {added ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
