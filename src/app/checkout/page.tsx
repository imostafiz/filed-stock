'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const CheckoutPage = () => {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-4 text-6xl text-gray-300">🛒</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">Add some products before checking out.</p>
          <Link
            href="/products"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <CheckoutForm />
      )}
    </div>
  );
};

export default CheckoutPage;
