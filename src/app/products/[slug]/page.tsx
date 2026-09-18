import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlugServer, getRelatedProductsServer } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/components/product/ImageGallery';
import AddToCartButton from '@/components/product/AddToCartButton';
import ReviewList from '@/components/product/ReviewList';
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        <ImageGallery images={product.images} title={product.title} />

        <div className="mt-8 lg:mt-0">
          <span className="text-sm font-medium text-blue-600">{product.category}</span>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg text-yellow-500">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-sm text-gray-500">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          </div>

          <div className="mt-4">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{product.description}</p>
          </div>

          {product.tags.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ReviewList reviews={product.reviews} />

      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
