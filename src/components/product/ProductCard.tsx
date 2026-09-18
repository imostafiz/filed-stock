'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/lib/store/cart-store';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          {isOutOfStock && (
            <span className="absolute top-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
              Out of Stock
            </span>
          )}
        </div>

        <div className="p-4">
          <span className="text-xs font-medium text-blue-600">{product.category}</span>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900">{product.title}</h3>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-sm text-yellow-500">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {!isOutOfStock && (
              <span className="text-xs text-green-600">In Stock ({product.stock})</span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            isOutOfStock
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : added
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
