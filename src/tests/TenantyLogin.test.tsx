import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import TenantLogin from '../pages/TenantLogin';

describe('TenantLogin', () => {
  const mockLogin = jest.fn();

  // Mock user state and update function
  const mockUser = null; // This can be replaced with a mock user object when necessary

  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ user: mockUser, login: mockLogin }}>
        <Router initialEntries={['/login']}>
          <TenantLogin />
        </Router>
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

  test('calls the login function when login button is clicked', () => {
    fireEvent.click(screen.getByText(/Login/i));
    expect(mockLogin).toHaveBeenCalled();
  });

  // Test for navigation can be added here

  test('navigates to password reset page when "Forgot your login details?" is clicked', () => {
    fireEvent.click(screen.getByText(/Click here/i));
    expect(screen.getByText(/Password Reset/i)).toBeInTheDocument(); // Replace with the actual text/content from the password reset page
  });
});