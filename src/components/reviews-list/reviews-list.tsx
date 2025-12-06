import ReviewItem from '../review-item/review-item';
import type { Review } from '../../types/review';

type ReviewsListProps = {
  reviews: Review[] | unknown;
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const safeReviews: Review[] = Array.isArray(reviews) ? reviews : [];

  const sorted = [...safeReviews]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{sorted.length}</span>
      </h2>

      <ul className="reviews__list">
        {sorted.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
