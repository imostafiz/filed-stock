import { faker } from '@faker-js/faker';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

faker.seed(42);

const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Health & Beauty',
  'Garden & Outdoor',
  'Office Supplies',
] as const;

const TAGS = [
  'new-arrival',
  'bestseller',
  'clearance',
  'premium',
  'budget-friendly',
  'eco-friendly',
  'trending',
  'limited-edition',
  'seasonal',
  'top-rated',
  'lightweight',
  'durable',
  'waterproof',
  'wireless',
  'portable',
  'compact',
  'organic',
  'handmade',
  'imported',
  'sale',
  'bundle',
  'exclusive',
  'classic',
  'modern',
  'vintage',
  'high-performance',
  'energy-efficient',
  'low-maintenance',
  'child-safe',
  'professional',
] as const;

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
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
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateReview(): Review {
  const rating = faker.number.float({ min: 1, max: 5, fractionDigits: 1 });
  return {
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    rating: Math.round(rating * 10) / 10,
    comment: faker.lorem.sentence({ min: 5, max: 20 }),
    date: faker.date.past({ years: 2 }).toISOString(),
  };
}

function generateProduct(): Product {
  const category = faker.helpers.arrayElement(CATEGORIES);
  const title = faker.commerce.productName();
  const reviewCount = faker.number.int({ min: 0, max: 500 });
  const rating =
    reviewCount > 0
      ? Math.round(faker.number.float({ min: 1, max: 5, fractionDigits: 1 }) * 10) / 10
      : 0;

  return {
    id: faker.string.uuid(),
    slug: slugify(title),
    title,
    description: faker.commerce.productDescription(),
    category,
    price: parseFloat(faker.commerce.price({ min: 1, max: 999, decimals: 2 })),
    rating,
    reviewCount,
    stock: faker.number.int({ min: 0, max: 1000 }),
    images: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      (_, i) => `https://picsum.photos/seed/${slugify(title)}-${i}/600/600`,
    ),
    reviews: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () =>
      generateReview(),
    ),
    tags: faker.helpers.arrayElements([...TAGS], { min: 2, max: 5 }),
  };
}

const PRODUCT_COUNT = 500;
const products: Product[] = Array.from({ length: PRODUCT_COUNT }, () => generateProduct());

const outputDir = join(__dirname, '..', 'data');
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'products.json'), JSON.stringify(products, null, 2));

console.log(`Generated ${products.length} products → data/products.json`);
