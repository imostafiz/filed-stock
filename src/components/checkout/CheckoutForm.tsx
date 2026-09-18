'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormValues } from '@/lib/validations/checkout-schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/lib/store/cart-store';
import { createOrder } from '@/lib/api/checkout';
import { formatPrice } from '@/lib/utils';

const CheckoutForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createOrder({ ...data, items });
      dispatch(clearCart());
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2332] text-sm font-bold text-white">
              1
            </div>
            <h2 className="text-lg font-bold text-[#1A2332]">Contact Information</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">First Name</label>
              <input
                {...register('firstName')}
                placeholder="John"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">Last Name</label>
              <input
                {...register('lastName')}
                placeholder="Doe"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
              />
              {errors.lastName && (
                <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">Phone</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2332] text-sm font-bold text-white">
              2
            </div>
            <h2 className="text-lg font-bold text-[#1A2332]">Shipping Address</h2>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">
              Street Address
            </label>
            <input
              {...register('address')}
              placeholder="123 Main Street"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.address.message}</p>
            )}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">City</label>
              <input
                {...register('city')}
                placeholder="New York"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
              />
              {errors.city && (
                <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A2332]">Zip Code</label>
              <input
                {...register('zipCode')}
                placeholder="10001"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1A2332] transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-[#1A2332] focus:outline-none focus:ring-1 focus:ring-[#1A2332]/20"
              />
              {errors.zipCode && (
                <p className="mt-1.5 text-xs text-[#8B2E3C]">{errors.zipCode.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2332] text-sm font-bold text-white">
              3
            </div>
            <h2 className="text-lg font-bold text-[#1A2332]">Payment Method</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                value: 'credit-card',
                label: 'Credit Card',
                icon: '💳',
                desc: 'Visa, Mastercard, AMEX',
              },
              {
                value: 'debit-card',
                label: 'Debit Card',
                icon: '🏦',
                desc: 'Direct bank transfer',
              },
              { value: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
            ].map((method) => (
              <label
                key={method.value}
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 p-4 transition-all hover:border-[#1A2332]/30 hover:shadow-sm has-[:checked]:border-[#1A2332] has-[:checked]:bg-[#1A2332]/[0.03] has-[:checked]:shadow-md"
              >
                <input
                  type="radio"
                  {...register('paymentMethod')}
                  value={method.value}
                  className="h-4 w-4 border-gray-300 text-[#1A2332] accent-[#1A2332]"
                />
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A2332]">{method.label}</p>
                  <p className="text-xs text-gray-400">{method.desc}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="mt-2 text-xs text-[#8B2E3C]">{errors.paymentMethod.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#C15F3C] px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#a85235] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Placing Order...
            </span>
          ) : (
            `Place Order — ${formatPrice(total)}`
          )}
        </button>
      </form>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-[#1A2332]">Order Summary</h2>

          <div className="max-h-64 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#5C6B4F]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A2332] text-[10px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <p className="line-clamp-1 text-sm font-medium text-[#1A2332]">
                    {item.product.title}
                  </p>
                  <p className="text-sm font-bold text-[#1A2332]">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-[#1A2332]">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-[#1A2332]">
                {shipping === 0 ? (
                  <span className="text-[#5C6B4F]">Free</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3">
              <span className="text-base font-bold text-[#1A2332]">Total</span>
              <span className="text-base font-bold text-[#1A2332]">{formatPrice(total)}</span>
            </div>
          </div>

          {subtotal < 50 && (
            <div className="mt-4 rounded-xl bg-[#5C6B4F]/10 p-3 text-center">
              <p className="text-xs font-medium text-[#5C6B4F]">
                Add {formatPrice(50 - subtotal)} more for free shipping!
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            { icon: '🔒', text: 'SSL Encrypted Checkout' },
            { icon: '✓', text: '30-Day Money Back Guarantee' },
            { icon: '📦', text: 'Free Shipping on Orders $50+' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5 px-1">
              <span className="text-sm">{item.icon}</span>
              <span className="text-xs text-gray-500">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
