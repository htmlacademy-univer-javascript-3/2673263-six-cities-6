import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading offers...')).toBeInTheDocument();
    expect(document.querySelector('.spinner')).toBeInTheDocument();
    expect(document.querySelector('.spinner__circle')).toBeInTheDocument();
  });
});
