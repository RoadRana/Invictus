import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('displays the Invictus mission statement', () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /revolutionizing maritime industries with eco-friendly, intelligent unmanned marine vehicles\./i
      )
    ).toBeInTheDocument();
  });

  it('renders key contact details', () => {
    render(<Footer />);
    expect(screen.getByText(/\+201006584054/)).toBeInTheDocument();
    expect(screen.getByText(/info@invictusumvs.com/)).toBeInTheDocument();
  });
});
