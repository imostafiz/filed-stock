import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  cardExpiry: z.string().min(5, 'Expiry must be MM/YY'),
  cardCvc: z.string().min(3, 'CVC must be at least 3 digits'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
