'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const CheckoutPage = () => {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <div className="min-h-screen bg-[#F3F1EC]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/products" className="transition-colors hover:text-[#1A2332]">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="transition-colors hover:text-[#1A2332]">
            Cart
          </Link>
          <span>/</span>
          <span className="text-[#1A2332]">Checkout</span>
        </nav>

        {items.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl bg-white py-20 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F3F1EC]">
              <svg
                className="h-10 w-10 text-[#1A2332]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[#1A2332]">Your cart is empty</h2>
            <p className="mb-8 max-w-sm text-gray-500">
              Looks like you haven&apos;t added anything to your cart yet. Browse our products and
              find something you love.
            </p>
            <Link
              href="/products"
              className="rounded-full bg-[#1A2332] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#253448]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#1A2332]">Checkout</h1>
              <p className="mt-1 text-gray-500">Complete your order below</p>
            </div>

            <div className="mb-8 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5C6B4F] text-xs font-bold text-white">
                  1
                </span>
                <span className="text-sm font-medium text-[#1A2332]">Cart</span>
              </div>
              <div className="h-px flex-1 bg-[#5C6B4F]" />
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A2332] text-xs font-bold text-white">
                  2
                </span>
                <span className="text-sm font-medium text-[#1A2332]">Checkout</span>
              </div>
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">
                  3
                </span>
                <span className="text-sm text-gray-400">Confirmation</span>
              </div>
            </div>

            <CheckoutForm />
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
