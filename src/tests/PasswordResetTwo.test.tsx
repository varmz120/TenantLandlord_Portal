import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PasswordResetTwo from '../pages/PasswordResetTwo';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PasswordResetTwo', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    render(<PasswordResetTwo />);
  });

  test('renders without crashing', () => {
    const passwordResetElement = screen.getByText(/Tenant Portal/i);
    expect(passwordResetElement).toBeInTheDocument();
  });

  test('password fields update on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Set new password/i), {
      target: { value: 'newpassword' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password/i), {
      target: { value: 'newpassword' },
    });

    expect((screen.getByPlaceholderText(/Set new password/i) as HTMLInputElement).value).toBe(
      'newpassword'
    );
    expect((screen.getByPlaceholderText(/Confirm new password/i) as HTMLInputElement).value).toBe(
      'newpassword'
    );
  });

  test('navigates to /resetsuccessful when Confirm New Password button is clicked', () => {
    fireEvent.click(screen.getByText(/Confirm New Password/i));
    expect(mockNavigate).toHaveBeenCalledWith('/resetsuccessful');
  });

  test('navigates to / when Back to Login button is clicked', () => {
    fireEvent.click(screen.getByText(/Back to Login/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
