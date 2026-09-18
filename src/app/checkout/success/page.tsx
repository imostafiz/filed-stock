import Link from 'next/link';

type SuccessPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const params = await searchParams;
  const orderId = typeof params.orderId === 'string' ? params.orderId : null;

  return (
    <div className="min-h-screen bg-[#F3F1EC]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#5C6B4F]">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-[#1A2332]">Order Confirmed!</h1>
          <p className="mb-8 text-gray-500">
            Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
          </p>

          {orderId && (
            <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="mb-1 text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-lg font-bold text-[#1A2332]">{orderId}</p>
            </div>
          )}

          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5C6B4F] text-xs font-bold text-white">
                ✓
              </span>
              <span className="text-sm font-medium text-[#5C6B4F]">Cart</span>
            </div>
            <div className="h-px w-12 bg-[#5C6B4F]" />
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5C6B4F] text-xs font-bold text-white">
                ✓
              </span>
              <span className="text-sm font-medium text-[#5C6B4F]">Checkout</span>
            </div>
            <div className="h-px w-12 bg-[#5C6B4F]" />
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A2332] text-xs font-bold text-white">
                3
              </span>
              <span className="text-sm font-medium text-[#1A2332]">Confirmation</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="rounded-full bg-[#1A2332] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#253448]"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-[#1A2332] transition-colors hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
