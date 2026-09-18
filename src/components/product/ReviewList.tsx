'use client';

import type { Review } from '@/types/product';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No reviews yet. Be the first to review this product.</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const getRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-8 sm:flex-row">
        <div className="flex flex-col items-center justify-center sm:w-48">
          <span className="text-5xl font-bold text-[#1A2332]">{avgRating.toFixed(1)}</span>
          <div className="my-2 flex gap-0.5">
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
          <span className="text-sm text-gray-500">{reviews.length} reviews</span>
        </div>

        <div className="flex-1 space-y-2">
          {distribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-8 text-right text-sm font-medium text-gray-600">{star}★</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#1A2332]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-left text-xs text-gray-500">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2332] text-sm font-semibold text-white">
                {getInitials(review.author)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A2332]">{review.author}</p>
                <p className="text-xs text-gray-400">{getRelativeDate(review.date)}</p>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${
                      star <= Math.round(review.rating) ? 'text-[#C15F3C]' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
