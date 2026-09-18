import type { Product } from '@/types/product';

export const getProducts = async (params?: Record<string, string>): Promise<Product[]> => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const res = await fetch(`/api/products${queryString}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const res = await fetch(`/api/products/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const getRelatedProducts = async (product: Product): Promise<Product[]> => {
  const products = await getProducts();
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.tags.some((t) => product.tags.includes(t))),
    )
    .slice(0, 4);
};
