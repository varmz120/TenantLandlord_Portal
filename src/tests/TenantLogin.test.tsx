import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../contexts/AuthContext';
import TenantLogin from '../pages/TenantLogin';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('TenantLogin', () => {
  const mockLogin = jest.fn();

  const mockUser = null;

  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    render(
      <AuthContext.Provider value={{ user: mockUser, login: mockLogin }}>
        <TenantLogin />
      </AuthContext.Provider>
    );
  });

  test('renders without crashing', () => {
    const tenantPortalElement = screen.getByText(/Tenant Portal/i);
    expect(tenantPortalElement).toBeInTheDocument();
  });

  test('username and password fields update on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });

    expect((screen.getByPlaceholderText(/Username/i) as HTMLInputElement).value).toBe('test');
    expect((screen.getByPlaceholderText(/Password/i) as HTMLInputElement).value).toBe('password');
  });

  test('calls the login function with the correct username and password when login button is clicked', () => {
    fireEvent.click(
      screen.getByRole('button', {
        name: /login/i,
      })
    );

    expect(mockLogin).toHaveBeenCalledWith({
      id: '1',
      email: 'JamieDole@yahoo.com.sg',
      userType: 1, // Tenant
      authToken: '5880',
    });
  });

  test('navigates to password reset page when "Forgot your login details?" is clicked', () => {
    fireEvent.click(screen.getByText(/Click here/i));
    expect(mockNavigate).toHaveBeenCalledWith('/reset1');
  });
});
