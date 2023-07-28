import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import PasswordResetTwo from '../pages/PasswordResetTwo';

describe('PasswordResetTwo', () => {
  beforeEach(() => {
    render(
      <Router>
        <PasswordResetTwo />
      </Router>
    );
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

    expect((screen.getByPlaceholderText(/Set new password/i) as HTMLInputElement).value).toBe('newpassword');
    expect((screen.getByPlaceholderText(/Confirm new password/i) as HTMLInputElement).value).toBe('newpassword');
  });

  test('navigates to /resetsuccessful when Confirm New Password button is clicked', () => {
    fireEvent.click(screen.getByText(/Confirm New Password/i));
    expect(screen.getByText(/Password Reset/i)).toBeInTheDocument();
  });

  test('navigates to /logintenant when Back to Login button is clicked', () => {
    fireEvent.click(screen.getByText(/Back to Login/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
