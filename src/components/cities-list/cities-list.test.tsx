import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list';
import type { City } from '../../types/offer';

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const cities = [
      { name: 'Paris' },
      { name: 'Amsterdam' },
    ] as unknown as City[];

    const activeCity = cities[0];

    render(
      <CitiesList
        cities={cities}
        activeCity={activeCity}
        onCityClick={() => undefined}
      />
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();

    const activeLink = screen.getByText('Paris').closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });
});
