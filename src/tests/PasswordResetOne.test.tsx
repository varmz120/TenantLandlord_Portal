import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PasswordResetOne from '../pages/PasswordResetOne';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PasswordResetOne', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
    
    // eslint-disable-next-line
    render(<PasswordResetOne />);
  });

  test('renders without crashing', () => {
    const passwordResetElement = screen.getByText(/Tenant Portal/i);
    expect(passwordResetElement).toBeInTheDocument();
  });

  test('email field updates on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Email address/i), {
      target: { value: 'test@example.com' },
    });

    expect((screen.getByPlaceholderText(/Email address/i) as HTMLInputElement).value).toBe(
      'test@example.com'
    );
  });

  test('navigates to /reset2FA when Request Password Reset button is clicked', () => {
    fireEvent.click(screen.getByText(/Request Password Reset/i));
    expect(mockNavigate).toHaveBeenCalledWith('/reset2FA');
  });

  test('navigates to / when Back button is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
