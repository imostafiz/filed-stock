import type { Review } from '@/types/product';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Customer Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-yellow-500">
                {'★'.repeat(Math.round(review.rating))}
                {'☆'.repeat(5 - Math.round(review.rating))}
              </span>
              <span className="text-sm font-medium text-gray-900">{review.author}</span>
              <span className="text-xs text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
