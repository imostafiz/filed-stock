'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import CartItem from './CartItem';
import { formatPrice } from '@/lib/utils';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const items = useAppSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 transition-opacity" onClick={onClose} />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#1A2332]">
            Your Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:text-[#1A2332]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 text-5xl text-gray-300">🛒</div>
              <p className="mb-4 text-sm text-gray-500">Your cart is empty</p>
              <Link
                href="/products"
                onClick={onClose}
                className="rounded-full bg-[#1A2332] px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-[#1A2332]">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full rounded-full bg-[#1A2332] py-3 text-center text-sm font-semibold text-white transition-all hover:shadow-md"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
