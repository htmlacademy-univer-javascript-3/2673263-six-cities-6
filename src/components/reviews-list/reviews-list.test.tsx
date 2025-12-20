import { render, screen } from '@testing-library/react';
import type { Review } from '../../types/review';
import ReviewsList from './reviews-list';
import { vi } from 'vitest';

vi.mock('../review-item/review-item', () => ({
  default: () => <li data-testid="review-item">review</li>,
}));

const makeReview = (id: string, date: string): Review => ({
  id,
  comment: 'c',
  date,
  rating: 5,
  user: { name: 'u', avatarUrl: 'a', isPro: false },
});

describe('Component: ReviewsList', () => {
  it('should render title and limit items to 10', () => {
    const reviews: Review[] = Array.from({ length: 12 }, (_, i) =>
      makeReview(String(i + 1), `2019-04-${String(i + 1).padStart(2, '0')}T10:00:00.000Z`)
    );

    render(<ReviewsList reviews={reviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getAllByTestId('review-item')).toHaveLength(10);
  });
});
