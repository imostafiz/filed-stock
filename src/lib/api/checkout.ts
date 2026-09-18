import type { CheckoutFormData } from '@/types/product';

export const createOrder = async (
  data: CheckoutFormData,
): Promise<{ orderId: string; success: boolean }> => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};
