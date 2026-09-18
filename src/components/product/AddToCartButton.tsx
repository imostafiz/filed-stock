'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/lib/store/cart-store';
import type { Product } from '@/types/product';

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 20;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    router.push('/checkout');
  };

  const stockPercentage = Math.min((product.stock / 100) * 100, 100);
  const stockBarColor =
    product.stock === 0 ? 'bg-[#8B2E3C]' : isLowStock ? 'bg-[#C15F3C]' : 'bg-[#5C6B4F]';

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {product.stock === 0
              ? 'Out of stock'
              : isLowStock
                ? `Only ${product.stock} left in stock`
                : 'In stock'}
          </span>
          {product.stock > 0 && (
            <span className="text-xs text-gray-400">{product.stock} available</span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all ${stockBarColor}`}
            style={{ width: `${stockPercentage}%` }}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">Quantity</label>
        <div className="inline-flex items-center gap-0 rounded-full border border-gray-300">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={isOutOfStock}
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-[#1A2332] transition-colors hover:bg-gray-100 disabled:opacity-40"
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-semibold text-[#1A2332]">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={isOutOfStock || quantity >= product.stock}
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-[#1A2332] transition-colors hover:bg-gray-100 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
            isOutOfStock
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : added
                ? 'bg-[#5C6B4F] text-white'
                : 'border-2 border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
            isOutOfStock
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'bg-[#C15F3C] text-white hover:bg-[#a85235]'
          }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;
