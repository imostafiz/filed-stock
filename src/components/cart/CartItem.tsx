'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CartItem as CartItemType } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/lib/store/cart-store';

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id));
  };

  return (
    <div className="flex gap-3">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#5C6B4F]"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          sizes="64px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between">
          <Link
            href={`/products/${item.product.slug}`}
            className="line-clamp-1 text-sm font-medium text-[#1A2332]"
          >
            {item.product.title}
          </Link>
          <span className="ml-2 shrink-0 text-sm font-bold text-[#1A2332]">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrement}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-sm font-medium text-[#1A2332] transition-colors hover:border-[#1A2332]"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium text-[#1A2332]">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-sm font-medium text-[#1A2332] transition-colors hover:border-[#1A2332]"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-sm text-gray-400 transition-colors hover:text-[#8B2E3C]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
