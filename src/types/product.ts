export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Spec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  reviews: Review[];
  tags: string[];
  specs: Spec[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'credit-card' | 'debit-card' | 'cod';
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};
