import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import type { Review } from '../../types/review';

const makeReview = (overrides?: Partial<Review>): Review => ({
  id: 'r1',
  comment: 'Nice place',
  date: '2019-04-01T10:00:00.000Z',
  rating: 4,
  user: {
    name: 'John',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  },
  ...overrides,
});

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const review = makeReview();

    render(<ReviewItem review={review} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Nice place')).toBeInTheDocument();
    expect(screen.getByText('April 2019')).toBeInTheDocument();

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toHaveAttribute('src', 'img/avatar.jpg');
  });
});
