import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TenantLogin from '../pages/TenantLogin';
import { AuthContext } from '../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TenantLogin', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <TenantLogin />
      </BrowserRouter>
    );
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('updates state when username and password fields are changed', () => {
    render(
      <BrowserRouter>
        <TenantLogin />
      </BrowserRouter>
    );
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'test user' } });
    fireEvent.change(passwordInput, { target: { value: 'test password' } });

    expect(usernameInput.value).toBe('test user');
    expect(passwordInput.value).toBe('test password');
  });
});