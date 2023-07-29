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

    render(<PasswordResetSuccessful />);
  });

  test('renders without crashing', () => {
    const passwordResetSuccessfulElement = screen.getByText(/Tenant Portal/i);
    expect(passwordResetSuccessfulElement).toBeInTheDocument();
  });

  test('renders Password Reset and Successful text', () => {
    const passwordResetElement = screen.getByText(/Password Reset/i);
    expect(passwordResetElement).toBeInTheDocument();

    const successfulElement = screen.getByText(/Successful/i);
    expect(successfulElement).toBeInTheDocument();
  });

  test('renders Back button', () => {
    const buttonElement = screen.getByText(/Back/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('navigates to / when Back button is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});