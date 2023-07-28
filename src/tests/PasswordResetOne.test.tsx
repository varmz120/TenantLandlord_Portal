import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import PasswordResetOne from '../pages/PasswordResetOne';

describe('PasswordResetOne', () => {
  const history = createMemoryHistory()

  beforeEach(() => {
    render(
      <Router history={history}>
        <PasswordResetOne />
      </Router>
    );
  });

  test('renders without crashing', () => {
    // screen.logTestingPlaygroundURL();
    const passwordResetElement = screen.getByText(/Tenant Portal/i);
    expect(passwordResetElement).toBeInTheDocument();
  });

  test('email field updates on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Email address/i), {
      target: { value: 'test@example.com' },
    });

    expect((screen.getByPlaceholderText(/Email address/i) as HTMLInputElement).value).toBe('test@example.com');
  });

  test('navigates to /reset2FA when Request Password Reset button is clicked', () => {
    fireEvent.click(screen.getByText(/Request Password Reset/i));
    expect(history.location.pathname).toBe('/reset2FA');
  });

  test('navigates to / when Back button is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(history.location.pathname).toBe('/');
  });
});
