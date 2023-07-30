import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordResetUnsuccessful from '../pages/PasswordResetUnsuccessful';

describe('PasswordResetUnsuccessful', () => {
  beforeEach(() => {
    render(
      <Router>
        <PasswordResetUnsuccessful />
      </Router>
    );
  });

  test('renders without crashing', () => {
    const passwordResetUnsuccessfulElement = screen.getByText(/Tenant Portal/i);
    expect(passwordResetUnsuccessfulElement).toBeInTheDocument();
  });

  test('renders Password Reset and Unsuccessful text', () => {
    const passwordResetElement = screen.getByText(/Password Reset/i);
    expect(passwordResetElement).toBeInTheDocument();

    const unsuccessfulElement = screen.getByText(/Unsuccessful/i);
    expect(unsuccessfulElement).toBeInTheDocument();
  });

  test('renders Back button', () => {
    const buttonElement = screen.getByText(/Back/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
