import { readFileSync } from 'fs';
import { join } from 'path';
import type { Product, ProductsResponse } from '@/types/product';

const PRODUCTS_PATH = join(process.cwd(), 'data', 'products.json');

const loadProducts = (): Product[] => {
  const data = readFileSync(PRODUCTS_PATH, 'utf-8');
  return JSON.parse(data);
};

export const getProductsServer = (params: {
  search?: string;
  category?: string;
  categories?: string;
  sort?: string;
  page?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
}): ProductsResponse => {
  const products = loadProducts();
  const {
    search,
    category,
    categories,
    sort,
    page = '1',
    limit = '12',
    minPrice,
    maxPrice,
  } = params;

  let filtered = [...products];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }

  const cats = [
    ...(category ? [category] : []),
    ...(categories ? categories.split(',').filter(Boolean) : []),
  ];
  if (cats.length > 0) {
    filtered = filtered.filter((p) => cats.includes(p.category));
  }

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
  }

  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  return {
    products: filtered.slice(start, end),
    total: filtered.length,
    page: pageNum,
    totalPages: Math.ceil(filtered.length / limitNum),
  };
};

export const getCategories = (): string[] => {
  const products = loadProducts();
  return [...new Set(products.map((p) => p.category))].sort();
};

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

export const getProductBySlugServer = (slug: string): Product | null => {
  const products = loadProducts();
  return products.find((p) => p.slug === slug) || null;
};

export const getRelatedProductsServer = (product: Product, limit = 4): Product[] => {
  const products = loadProducts();
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.tags.some((t) => product.tags.includes(t))),
    )
    .slice(0, limit);
};
