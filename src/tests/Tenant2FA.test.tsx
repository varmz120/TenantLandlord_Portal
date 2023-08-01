import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tenant2FA from '../pages/Tenant2FA';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Tenant2FA', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    // eslint-disable-next-line
    render(<Tenant2FA />);
  });

  test('renders without crashing', () => {
    const tenant2FAElement = screen.getByText(/Tenant Portal/i);
    expect(tenant2FAElement).toBeInTheDocument();
  });

  test('renders Two-Factor and Authentication text', () => {
    const twoFactorElement = screen.getByText(/Two-Factor/i);
    expect(twoFactorElement).toBeInTheDocument();

    const authenticationElement = screen.getByText(/Authentication/i);
    expect(authenticationElement).toBeInTheDocument();
  });

  test('renders authentication code input field', () => {
    const inputElement = screen.getByPlaceholderText(/Enter authentication code/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders Verify button', () => {
    // TODO: Add test for clicking on Verify button
  });

  test('authentication code field updates on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter authentication code/i), {
      target: { value: '123456' },
    });

    expect(
      (screen.getByPlaceholderText(/Enter authentication code/i) as HTMLInputElement).value
    ).toBe('123456');
  });

  test('navigates to correct dashboard when Verify button is clicked', () => {
    // TODO: Add test for correct authentication code
  });
});
