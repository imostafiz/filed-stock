'use client';

import { useState } from 'react';
import { useSyncExternalStore } from 'react';
import { useAppSelector } from '@/store/hooks';
import CartDrawer from '@/components/cart/CartDrawer';

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

const CartButton = () => {
  const items = useAppSelector((state) => state.cart.items);
  const [cartOpen, setCartOpen] = useState(false);
  const isClient = useIsClient();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setCartOpen(true)}
        className="relative rounded-full p-2.5 text-[#1A2332] transition-all hover:shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.286m5.98-.286h9m-9 0a3 3 0 01-5.98.286M17.25 14.25a3 3 0 005.98.286m-5.98-.286l2.25-8.625m0 0h3.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H18M6.75 14.25L4.5 3H2.25"
          />
        </svg>
        {isClient && totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#8B2E3C] text-[10px] font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default CartButton;
