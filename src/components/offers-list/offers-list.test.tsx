import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { Offer } from '../../types/offer';
import OffersList from './offers-list';

vi.mock('../offer-card/offer-card', () => ({
  default: ({ offer }: { offer: Offer }) => (
    <div data-testid="offer-card">{offer.id}</div>
  ),
}));

const makeOffer = (id: string): Offer => ({ id } as Offer);

describe('Component: OffersList', () => {
  it('should render offer cards', () => {
    render(<OffersList offers={[makeOffer('1'), makeOffer('2')]} />);

    expect(screen.getAllByTestId('offer-card')).toHaveLength(2);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should apply custom className when passed', () => {
    const { container } = render(
      <OffersList offers={[makeOffer('1')]} className="custom" />
    );

    expect(container.querySelector('.custom')).toBeInTheDocument();
  });
});
