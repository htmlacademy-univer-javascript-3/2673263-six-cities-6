import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainPageEmpty from './main-page-empty';
import type { City } from '../../types/offer';

describe('Page: MainPageEmpty', () => {
  it('should render empty message with city name', () => {
    const city: City = {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 10 },
    };

    render(<MainPageEmpty city={city} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/in Paris/i)).toBeInTheDocument();
  });
});
