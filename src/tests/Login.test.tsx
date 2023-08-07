import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TenantLogin from '../pages/TenantLogin';
import { AuthContext } from '../contexts/AuthContext';
import { client } from '../client';

jest.mock('../client', () => ({
  client: {
    get2FA: jest.fn(),
  },
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

  it('calls event handlers when login and forgot password buttons are clicked', async () => {
    // Render the component under test
    render(
      <BrowserRouter>
        <TenantLogin />
      </BrowserRouter>
    );

    // Find the buttons
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Define a mock user
    const mockUser = { id: '1', email: '', typ: 0 };

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: mockUser.typ.toString() },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // Mock the get2FA function with a resolved Promise
    const mockGet2FA = jest.spyOn(client, 'get2FA');
    mockGet2FA.mockResolvedValue({}); // Simulate successful login without 2FA

    // Click the login button
    fireEvent.click(loginButton);

    // Wait for the async operations to complete
    await waitFor(() => expect(mockGet2FA).toHaveBeenCalled());

    // Check if the navigate function was called with the correct path
    expect(mockGet2FA).toHaveBeenCalledWith({
      strategy: 'local',
      _id: mockUser.typ.toString(),
      password: 'password',
    });
  });
});