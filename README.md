# FieldStock — E-Commerce Product Listing & Checkout

A full-stack e-commerce product listing application built with Next.js App Router and TypeScript. Features 500+ product listing with search, category filtering (pill quick-select + sidebar multi-select), price range, sorting, pagination, detailed product pages with reviews and related products, a Redux-powered cart with localStorage persistence, and a validated checkout flow — all served from a local JSON dataset through Next.js API routes.

## Features

- **Product Listing** — 500+ products displayed in a responsive 4-column grid with pagination (12 per page)
- **Search** — Real-time product search by title and description
- **Category Filtering** — Dual-mode: horizontal scrollable pills (single-click quick-select) + sidebar checkboxes (multi-select), both synced via URL params
- **Price Range Filter** — Min/max price inputs with apply button
- **Sorting** — By relevance, price (low/high), or rating
- **Product Detail Page** — Image gallery with zoom-on-hover, quantity selector, stock indicator bar, trust badges, tabbed content (Description / Specifications / Reviews), and related products
- **Cart** — Add/remove items, adjust quantity, subtotal calculation; persisted in localStorage via Redux store subscription
- **Checkout** — Form with React Hook Form + Zod validation, payment method selection, order summary with product images, free shipping nudge
- **Order Confirmation** — Success page with order ID and completion indicator
- **Responsive Design** — Mobile-first with collapsible filter drawer on small screens
- **URL-Driven State** — All filters (search, category, price, sort, page) are stored in URL search params, making every view shareable and refreshable

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit + React-Redux |
| Form Handling | React Hook Form |
| Validation | Zod |
| Data Generation | Faker.js |
| Linting | ESLint + Prettier |

## Folder Structure

```
├── data/
│   └── products.json              # 500+ generated product dataset
├── scripts/
│   └── generate-products.ts       # Faker script to regenerate product data
├── src/
│   ├── app/                       # Next.js App Router pages & API routes
│   │   ├── api/
│   │   │   ├── products/          # GET /api/products, GET /api/products/[id]
│   │   │   └── checkout/          # POST /api/checkout
│   │   ├── products/              # Product listing (/products) & detail (/products/[slug])
│   │   ├── cart/                  # Cart page
│   │   └── checkout/              # Checkout form & success page
│   ├── components/
│   │   ├── product/               # ProductCard, ProductGrid, ImageGallery, AddToCartButton, ReviewList, RelatedProducts, ProductTabs
│   │   ├── filters/               # SearchBox, CategoryChips, CategoryCheckboxes, FilterSidebar, SortSelect, PriceRangeFilter, MobileFilterDrawer
│   │   ├── cart/                  # CartButton, CartDrawer, CartItem, CartSummary
│   │   ├── checkout/              # CheckoutForm
│   │   └── ui/                    # Pagination, EmptyState, ErrorState, LoadingSkeleton
│   ├── lib/
│   │   ├── api/                   # Service layer — server-side data fetching & client-side fetch wrappers
│   │   ├── store/                 # Cart Redux slice (cart-store.ts)
│   │   ├── validations/           # Zod schemas (checkout-schema.ts)
│   │   └── utils.ts               # formatPrice, cn utility helpers
│   ├── store/
│   │   ├── store.ts               # Redux store config with localStorage persistence
│   │   └── hooks.ts               # Typed useAppDispatch & useAppSelector hooks
│   └── types/
│       └── product.ts             # TypeScript interfaces (Product, CartItem, Review, Spec, etc.)
├── next.config.ts                 # Next.js config (picsum.photos remote image pattern)
├── tsconfig.json                  # TypeScript config with @/* path alias
└── package.json
```

## Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/field-stock.git
cd field-stock

# 2. Install dependencies
npm install

# 3. (Optional) Regenerate product dataset
npm run generate:products

# 4. Start development server
npm run dev
```

Open [http://localhost:3000/products](http://localhost:3000/products) to view the application.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run generate:products` | Regenerate `data/products.json` with Faker.js |

## API & Data Fetching Approach

### Data Source

Product data is stored as a static JSON file (`data/products.json`) containing 500+ generated products. There is no external database — the file is read directly from disk using `fs.readFileSync` in server-side code.

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/products` | GET | List products with filtering, sorting, and pagination |
| `/api/products/[id]` | GET | Get a single product by ID |
| `/api/checkout` | POST | Submit an order (dummy endpoint) |

### Query Parameters

The `/api/products` endpoint accepts these query params:

| Param | Type | Example | Description |
|---|---|---|---|
| `search` | string | `?search=wireless` | Filter by title/description |
| `categories` | string | `?categories=Electronics,Clothing` | Comma-separated category filter |
| `sort` | string | `?sort=price-asc` | Sort: `price-asc`, `price-desc`, `rating` |
| `page` | string | `?page=2` | Pagination page number |
| `minPrice` | string | `?minPrice=10` | Minimum price filter |
| `maxPrice` | string | `?maxPrice=100` | Maximum price filter |

### Service Layer (`lib/api/products.ts`)

The service layer separates **server-side** and **client-side** data access:

- **`getProductsServer(params)`** — Reads `products.json` directly via `fs.readFileSync`. Used in Server Components (product listing page, product detail page) for SEO and fast initial load.
- **`getProductBySlugServer(slug)`** — Synchronous slug lookup for Server Components.
- **`getRelatedProductsServer(product)`** — Finds related products by matching category or shared tags.
- **`getProducts(params)`** — Client-side `fetch()` wrapper that calls `/api/products`. Used in Client Components when server-side access isn't available.

This separation exists because Server Components can access the filesystem directly (faster, no HTTP overhead), while Client Components must go through API routes.

## Server vs Client Components

### Server Components (default in App Router)

| Component | Why Server |
|---|---|
| `app/products/page.tsx` | Fetches products & categories at request time, generates static params for SEO |
| `app/products/[slug]/page.tsx` | Fetches product data, generates metadata (title, description), pre-renders 496 slugs via `generateStaticParams` |
| `components/product/ProductGrid.tsx` | Pure presentational — no interactivity, just maps products to cards |
| `components/product/RelatedProducts.tsx` | Pure presentational — receives data as props |

### Client Components (`'use client'`)

| Component | Why Client |
|---|---|
| `components/filters/*` | All filter components read/write URL params via `useRouter()` + `useSearchParams()`, require `onClick`/`onChange` handlers |
| `components/cart/*` | Dispatch Redux actions (`addToCart`, `removeFromCart`), manage drawer open/close state |
| `components/checkout/CheckoutForm.tsx` | React Hook Form state, form submission, loading state |
| `components/product/AddToCartButton.tsx` | Redux dispatch, quantity selector state, "Added!" feedback |
| `components/product/ImageGallery.tsx` | Selected thumbnail state (`useState`) |
| `components/product/ProductTabs.tsx` | Active tab state (`useState`) |
| `components/product/ReviewList.tsx` | Pure presentational but needs client for potential future interactivity |

**Rule of thumb:** If a component needs `useState`, `useEffect`, event handlers, or browser APIs — it must be a Client Component. Everything else stays as a Server Component for better performance and SEO.

## State Management

### Why Redux Toolkit

Redux Toolkit was chosen for the cart because:

1. **Cross-component state** — The cart badge (header), cart drawer, cart page, and checkout page all need to read/write the same cart state. Redux provides a single source of truth.
2. **Predictable updates** — Immer-powered reducers in `createSlice` allow mutable-style updates while maintaining immutability under the hood.
3. **DevTools** — Redux DevTools integration for debugging cart actions in development.
4. **Persistence** — Simple `store.subscribe()` pattern to sync state to localStorage on every change.

### Cart Slice (`lib/store/cart-store.ts`)

```ts
addToCart(product)        // Adds product or increments quantity if exists
removeFromCart(productId) // Removes item by product ID
updateQuantity({id, qty}) // Sets specific quantity for an item
clearCart()               // Empties the cart
```

### Persistence Mechanism

```ts
// store.ts — On store creation
const store = makeStore({
  preloadedState: { cart: loadCartState() }, // Hydrate from localStorage
});

// store.ts — On every state change
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});
```

Cart data survives page refreshes and browser restarts. No `redux-persist` dependency — just a lightweight `store.subscribe()` approach.

## Performance Optimizations

| Technique | Where | Why |
|---|---|---|
| **`useMemo`** | `CheckoutForm.tsx` — subtotal calculation | Recalculates only when `items` array changes, not on every render |
| **`useCallback`** | `CategoryChips.tsx` — `checkScroll` function | Prevents unnecessary re-creation of the scroll listener callback on every render |
| **`generateStaticParams`** | `app/products/[slug]/page.tsx` | Pre-renders 496 product pages at build time (SSG), reducing server load |
| **Server Components** | Product listing, product detail pages | Data fetching happens on the server — no client-side waterfalls, smaller JavaScript bundle |
| **`next/image`** | Product images, cart item thumbnails | Automatic image optimization, lazy loading, responsive `sizes` attribute |
| **URL-based filter state** | All filter components | No client-side state management for filters — the URL is the single source of truth, enabling SSR and shareable links |
| **Conditional rendering** | `Pagination` — `if (totalPages <= 1) return null` | Avoids rendering unnecessary DOM nodes |
| **`isClient` guard** | `CartButton`, `CartDrawer` | Prevents hydration mismatches by deferring localStorage-dependent rendering to client |

## Demo

> 🎥 Demo video coming soon.

[Live Demo](#) — *placeholder*

## Known Limitations & Future Improvements

- **No authentication** — Cart and checkout work without user accounts
- **Dummy checkout** — Order submission returns a fake order ID, no real payment processing
- **No server-side caching** — `loadProducts()` reads from disk on every request; could benefit from `unstable_cache` or a database
- **No cart persistence sync across tabs** — Cart state only updates within the same browser tab
- **No product variants** — Products have fixed prices, no size/color selection
- **No search debounce** — Search triggers on Enter/button click only
- **No infinite scroll** — Uses traditional pagination instead of infinite loading
- **No admin panel** — Product data is read-only from the JSON file
- **No optimistic UI** — Cart operations wait for Redux state updates before reflecting in the UI
