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

const MATERIALS = [
  'Cotton',
  'Polyester',
  'Plastic',
  'Metal',
  'Wood',
  'Glass',
  'Leather',
  'Ceramic',
  'Nylon',
  'Silk',
];
const ORIGINS = ['Imported', 'Domestic', 'Handcrafted'];
const WARRANTIES = ['1 Year', '6 Months', '2 Years', '90 Days', 'N/A'];

const REVIEW_COMMENTS = {
  5: [
    'Absolutely love this product! Exceeded my expectations in every way.',
    'Perfect quality and fast shipping. Would definitely buy again.',
    'This is exactly what I was looking for. Highly recommend!',
    'Great value for the price. The build quality is impressive.',
    'Best purchase I have made this year. Works flawlessly.',
    'Outstanding product. The attention to detail is remarkable.',
    'Super happy with this. It looks even better in person.',
    'Exceeded all my expectations. Will be buying more.',
  ],
  4: [
    'Very good product overall. Minor issues but nothing major.',
    'Solid quality for the price. Happy with my purchase.',
    'Works well for what I need. Would recommend to others.',
    'Good value. A few small improvements could make it perfect.',
    'Impressed with the quality. Shipping was a bit slow though.',
    'Nice product. Does exactly what it says it does.',
    'Very satisfied. Only minor complaint is the packaging.',
    'Good product, just wish it came in more colors.',
  ],
  3: [
    'Decent product but nothing special. Gets the job done.',
    'Average quality. Expected a bit more for the price.',
    'It works but feels a bit cheaply made. Okay for now.',
    'Mixed feelings. Some features are great, others lacking.',
    'Not bad, not great. You get what you pay for.',
    'Functional but could use some design improvements.',
    'It is okay. Had better experiences with similar products.',
    'Middle of the road. Does the basics well enough.',
  ],
  2: [
    'Disappointed with the quality. Not as described.',
    'Product arrived damaged. Customer service was unhelpful.',
    'Does not work as advertised. Would not recommend.',
    'Cheap materials and poor construction. Regret this purchase.',
    'Had high hopes but let down. Returning this item.',
    'Below average. Expected much better given the reviews.',
    'Not worth the price at all. Look elsewhere.',
    'Broke after two weeks of use. Very frustrating.',
  ],
  1: [
    'Terrible product. Complete waste of money.',
    'Arrived broken and seller refused to refund. Avoid!',
    'Nothing like the description. Scam product.',
    'Worst purchase ever. Do not buy this.',
    'Defective out of the box. Awful experience.',
    'Total garbage. Save your money and buy something else.',
    'Does not work at all. Want my money back.',
    'Absolutely horrible. I cannot believe this is sold.',
  ],
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateReview(): Review {
  const rating = faker.number.float({ min: 1, max: 5, fractionDigits: 0 });
  const roundedRating = Math.round(rating) as 1 | 2 | 3 | 4 | 5;
  const comments = REVIEW_COMMENTS[roundedRating];
  return {
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    rating: roundedRating,
    comment: faker.helpers.arrayElement(comments),
    date: faker.date.past({ years: 2 }).toISOString(),
  };
}

function generateSpecs(): Spec[] {
  return [
    { label: 'Material', value: faker.helpers.arrayElement(MATERIALS) },
    { label: 'Weight', value: `${faker.number.float({ min: 0.1, max: 5, fractionDigits: 1 })} kg` },
    {
      label: 'Dimensions',
      value: `${faker.number.int({ min: 5, max: 50 })} × ${faker.number.int({ min: 5, max: 50 })} × ${faker.number.int({ min: 2, max: 30 })} cm`,
    },
    { label: 'Warranty', value: faker.helpers.arrayElement(WARRANTIES) },
    { label: 'Origin', value: faker.helpers.arrayElement(ORIGINS) },
  ];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Spec {
  label: string;
  value: string;
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
  specs: Spec[];
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
    price: parseFloat(faker.commerce.price({ min: 1, max: 999, dec: 2 })),
    rating,
    reviewCount,
    stock: faker.number.int({ min: 0, max: 1000 }),
    images: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      (_, i) => `https://picsum.photos/seed/${slugify(title)}-${i}/600/600`,
    ),
    reviews: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => generateReview()),
    tags: faker.helpers.arrayElements([...TAGS], { min: 2, max: 5 }),
    specs: generateSpecs(),
  };
}

const PRODUCT_COUNT = 500;
const products: Product[] = Array.from({ length: PRODUCT_COUNT }, () => generateProduct());

const outputDir = join(__dirname, '..', 'data');
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'products.json'), JSON.stringify(products, null, 2));

console.log(`Generated ${products.length} products → data/products.json`);
