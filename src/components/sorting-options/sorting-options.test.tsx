import { render, screen } from '@testing-library/react';
import SortingOptions from './sorting-options';
import { SortingOptionVariants } from '../../const';

describe('Component: SortingOptions', () => {
  it('should render correctly', () => {
    render(
      <SortingOptions
        activeOption={SortingOptionVariants.Popular}
        onChange={() => undefined}
      />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();

    // "Popular" встречается дважды: текущая опция + пункт списка
    expect(screen.getAllByText(SortingOptionVariants.Popular).length).toBeGreaterThanOrEqual(2);

    expect(screen.getByText(SortingOptionVariants.PriceLowToHigh)).toBeInTheDocument();
    expect(screen.getByText(SortingOptionVariants.PriceHighToLow)).toBeInTheDocument();
    expect(screen.getByText(SortingOptionVariants.TopRatedFirst)).toBeInTheDocument();
  });
});
