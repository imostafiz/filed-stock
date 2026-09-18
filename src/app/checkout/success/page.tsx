import Link from 'next/link';

type SuccessPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const params = await searchParams;
  const orderId = typeof params.orderId === 'string' ? params.orderId : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-6 text-6xl text-green-500">✓</div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Placed!</h1>
      <p className="mb-4 text-gray-500">Thank you for your purchase.</p>
      {orderId && (
        <p className="mb-8 text-sm text-gray-600">
          Order ID: <span className="font-mono font-semibold">{orderId}</span>
        </p>
      )}
      <Link
        href="/products"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default SuccessPage;
