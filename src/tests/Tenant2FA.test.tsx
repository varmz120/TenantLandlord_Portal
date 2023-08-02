import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AuthContext } from '../contexts/AuthContext';
import Tenant2FA from '../pages/Tenant2FA';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Tenant2FA', () => {
  const setUser = jest.fn();
  const logout = jest.fn();

  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    // Render Tenant2FA within the AuthContext with a user type of 0 (tenant)
    render(
      <AuthContext.Provider value={{ user: { typ: 0 }, setUser, logout }}>
        <Tenant2FA />
      </AuthContext.Provider>
    );
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
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
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
    const authCodeInput = screen.getByPlaceholderText(/Enter authentication code/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    // Simulate entering an authentication code and clicking the Verify button
    fireEvent.change(authCodeInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    // Check that useNavigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/Success', { state: { redirect: '/tenantDashboard' } });
  });
});