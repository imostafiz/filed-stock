import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
  paymentMethod: z.enum(['credit-card', 'debit-card', 'cod'], {
    required_error: 'Please select a payment method',
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
