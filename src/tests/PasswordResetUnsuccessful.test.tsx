import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordResetUnsuccessful from '../pages/PasswordResetUnsuccessful';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PasswordResetUnsuccessful', () => {
  beforeEach(() => {
    // eslint-disable-next-line
    render(
      <Router>
        <PasswordResetUnsuccessful />
      </Router>
    );
  });

  test('renders Password Reset and Unsuccessful text', () => {
    const passwordResetElement = screen.getByText(/Password Reset Failed/i);
    expect(passwordResetElement).toBeInTheDocument();

    const unsuccessfulElement = screen.getByText(/An error has occurred. Please try again./i);
    expect(unsuccessfulElement).toBeInTheDocument();
  });

  test('navigates back to reset password page', () => {
    setTimeout(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/reset1');
    }, 3000);
  });
});
