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

  it('calls event handlers when login and forgot password buttons are clicked', async () => {
    // Define the mock login function
    const loginMock = jest.fn((user) => {});

    // Define the initial context state
    const contextState = {
      user: null,
      login: loginMock,
      logout: () => {},
    };

    // Render the component under test
    render(
      <AuthContext.Provider value={contextState}>
        <BrowserRouter>
          <TenantLogin />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    // Find the buttons
    const loginButton = screen.getByRole('button', { name: /login/i });
    const forgotPasswordButton = screen.getByRole('button', { name: /click here/i });

    // Define a mock user
    const mockUser = { id: '1', email: '', typ: 0 };

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: mockUser.typ.toString() },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // Click the buttons
    fireEvent.click(loginButton);
    fireEvent.click(forgotPasswordButton);

    // Verify the results
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      // eslint-disable-next-line
      expect(loginMock).toHaveBeenCalledWith(mockUser);
    });
  });
});
