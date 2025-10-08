import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

function createMockComponent(testId) {
  const MockComponent = () => <div data-testid={testId}>{testId}</div>;
  return { default: MockComponent };
}

vi.mock('../../src/components/Navbar', () => ({
  default: () => <nav data-testid="layout-navbar">layout-navbar</nav>,
}));

vi.mock('../../src/components/Footer', () => ({
  default: () => <footer data-testid="layout-footer">layout-footer</footer>,
}));

vi.mock('../../src/components/ScrollToTop', () => ({
  default: () => null,
}));

vi.mock('../../src/components/Home', () => createMockComponent('route-home'));
vi.mock('../../src/components/About', () => createMockComponent('route-about'));
vi.mock('../../src/components/Community', () => createMockComponent('route-community'));
vi.mock('../../src/components/Profile', () => createMockComponent('route-profile'));
vi.mock('../../src/components/Services', () => createMockComponent('route-services'));
vi.mock('../../src/components/Products', () => createMockComponent('route-products'));
vi.mock('../../src/components/Contact', () => createMockComponent('route-contact'));
vi.mock('../../src/components/Signup', () => createMockComponent('route-signup'));
vi.mock('../../src/components/Signin', () => createMockComponent('route-signin'));
vi.mock('../../src/components/Pipeline', () => createMockComponent('route-pipeline'));
vi.mock('../../src/components/CustomizePage', () => createMockComponent('route-customize'));
vi.mock('../../src/components/CreateRobotPage', () => createMockComponent('route-create-robot'));

import App from '../../src/App';

describe('App routing', () => {
  it('redirects root path to the home route', () => {
    window.history.pushState({}, 'Test home', '/');
    render(<App />);

    expect(screen.getByTestId('route-home')).toBeInTheDocument();
    expect(screen.getByTestId('layout-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('layout-footer')).toBeInTheDocument();
  });

  it('renders the contact page when navigating directly to /contact', () => {
    window.history.pushState({}, 'Test contact', '/contact');
    render(<App />);

    expect(screen.getByTestId('route-contact')).toBeInTheDocument();
  });
});
