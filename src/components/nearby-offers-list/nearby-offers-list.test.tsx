import { render, screen } from '@testing-library/react';
import NearbyOffersList from './nearby-offers-list';
import type { Offer } from '../../types/offer';
import { vi } from 'vitest';

vi.mock('../nearby-offer-card/nearby-offer-card', () => ({
  default: () => <div data-testid="nearby-card">nearby</div>,
}));

const makeOffer = (id: string): Offer => ({
  id,
  title: 't',
  description: 'd',
  type: 'hotel',
  price: 120,
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

describe('Component: NearbyOffersList', () => {
  it('should render nearby offers list', () => {
    const offers = [makeOffer('1'), makeOffer('2'), makeOffer('3')];

    render(<NearbyOffersList offers={offers} />);

    expect(screen.getAllByTestId('nearby-card')).toHaveLength(3);
  });
});
