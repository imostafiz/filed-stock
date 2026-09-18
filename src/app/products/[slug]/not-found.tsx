import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 text-6xl text-gray-300">🔍</div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Product Not Found</h2>
      <p className="mb-6 text-gray-500">
        The product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        ← Back to Products
      </Link>
    </div>
  );
};

export default NotFound;
