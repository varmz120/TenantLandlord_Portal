import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PasswordResetSuccessful from '../pages/PasswordResetSuccessful';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PasswordResetSuccessful', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    // eslint-disable-next-line
    render(<PasswordResetSuccessful />);
  });

  test('renders Password Reset and Successful text', () => {
    const passwordResetElement = screen.getByText(/Password Reset Success/i);
    expect(passwordResetElement).toBeInTheDocument();

    const successfulElement = screen.getByText(
      /You have successfully reset your password. Please login with your new password./i
    );
    expect(successfulElement).toBeInTheDocument();
  });
});
