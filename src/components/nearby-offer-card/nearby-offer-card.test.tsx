import { render, screen } from '@testing-library/react';
import NearbyOfferCard from './nearby-offer-card';
import type { Offer } from '../../types/offer';
import { vi } from 'vitest';

vi.mock('../offer-card/offer-card', () => ({
  default: () => <div data-testid="offer-card">offer</div>,
}));

const makeOffer = (id: string): Offer => ({
  id,
  title: 't',
  description: 'd',
  type: 'room',
  price: 80,
  images: ['img.jpg'],
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
  goods: [],
  host: { isPro: false, name: 'h', avatarUrl: 'a' },
  isPremium: false,
  isFavorite: false,
  rating: 4,
  bedrooms: 1,
  maxAdults: 2,
});

describe('Component: NearbyOfferCard', () => {
  it('should render correctly', () => {
    render(<NearbyOfferCard offer={makeOffer('1')} />);
    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
  });
});
