import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductBySlugServer, getRelatedProductsServer } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/components/product/ImageGallery';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const { readFileSync } = await import('fs');
  const { join } = await import('path');
  const data = readFileSync(join(process.cwd(), 'data', 'products.json'), 'utf-8');
  const products = JSON.parse(data);
  return products.map((p: { slug: string }) => ({ slug: p.slug }));
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = getProductBySlugServer(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.description,
  };
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const product = getProductBySlugServer(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProductsServer(product, 4);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-[#F3F1EC]">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/products" className="transition-colors hover:text-[#1A2332]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:text-[#1A2332]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="truncate text-[#1A2332]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ImageGallery images={product.images} title={product.title} />

          <div className="flex flex-col">
            <span className="mb-2 inline-block w-fit rounded-full bg-[#1A2332] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-[#1A2332] lg:text-4xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= Math.round(avgRating) ? 'text-[#C15F3C]' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-5">
              <span className="text-4xl font-bold text-[#1A2332]">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <AddToCartButton product={product} />

            <div className="my-6 border-t border-gray-200" />

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '✓', label: 'Free Shipping', sub: 'On orders over $50' },
                { icon: '↻', label: '30-Day Returns', sub: 'Hassle-free returns' },
                { icon: '🔒', label: 'Secure Checkout', sub: 'SSL encrypted' },
                { icon: '🛡', label: '1 Year Warranty', sub: 'Full coverage' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#5C6B4F] text-xs text-white">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#1A2332]">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-white p-6 shadow-sm">
          <ProductTabs product={product} />
        </div>

        <div className="mt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
