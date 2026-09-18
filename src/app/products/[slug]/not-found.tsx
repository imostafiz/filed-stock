import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center bg-[#F3F1EC] py-24 text-center">
      <div className="mb-4 text-6xl text-gray-300">🔍</div>
      <h2 className="mb-2 text-2xl font-bold text-[#1A2332]">Product Not Found</h2>
      <p className="mb-6 text-gray-500">
        The product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/products"
        className="rounded-full bg-[#1A2332] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#253448]"
      >
        ← Back to Products
      </Link>
    </div>
  );
};

export default NotFound;
