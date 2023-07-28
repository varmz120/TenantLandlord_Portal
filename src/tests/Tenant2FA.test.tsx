import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Tenant2FA from '../pages/Tenant2FA';

describe('Tenant2FA', () => {
  const history = createMemoryHistory()

  beforeEach(() => {
    render(
      <Router history={history}>
        <Tenant2FA />
      </Router>
    );
  });

  test('renders without crashing', () => {
    const tenant2FAElement = screen.getByText(/Tenant Portal/i);
    expect(tenant2FAElement).toBeInTheDocument();
  });

  test('renders Two-Factor and Authentication text', () => {
    const twoFactorElement = screen.getByText(/Two-Factor/i);
    expect(twoFactorElement).toBeInTheDocument();

    const authenticationElement = screen.getByText(/Authentication/i);
    expect(authenticationElement).toBeInTheDocument();
  });

  test('renders authentication code input field', () => {
    const inputElement = screen.getByPlaceholderText(/Enter authentication code/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders Verify button', () => {
    const buttonElement = screen.getByText(/Verify/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('authentication code field updates on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter authentication code/i), {
      target: { value: '123456' },
    });

    expect((screen.getByPlaceholderText(/Enter authentication code/i) as HTMLInputElement).value).toBe('123456');
  });

  test('navigates to /reset2 when Verify button is clicked', () => {
    fireEvent.click(screen.getByText(/Verify/i));
    expect(history.location.pathname).toBe('/reset2');
  });
});