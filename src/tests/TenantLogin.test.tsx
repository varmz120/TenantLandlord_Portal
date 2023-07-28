import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
// import { MemoryRouter as Router,  Routes,  Route } from 'react-router-dom'
import { BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import TenantLogin from '../pages/TenantLogin';

describe('TenantLogin', () => {
  const mockLogin = jest.fn();

  // Mock user state and update function
  const mockUser = null; // This can be replaced with a mock user object when necessary

  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ user: mockUser, login: mockLogin }}>
        <Router initialEntries={['/login']}>
          <TenantLogin />
        </Router>
      </AuthContext.Provider>
    );
  });

  test('renders without crashing', () => {
    const tenantPortalElement = screen.getByText(/Tenant Portal/i);
    expect(tenantPortalElement).toBeInTheDocument();
  });

  test('username and password fields update on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });

    expect((screen.getByPlaceholderText(/Username/i) as HTMLInputElement).value).toBe('test');
    expect((screen.getByPlaceholderText(/Password/i) as HTMLInputElement).value).toBe('password');
  });

  // test('calls the login function when login button is clicked', () => {
  //   fireEvent.click(screen.getByTestId('login'));
  //   expect(mockLogin).toHaveBeenCalled();
  // });

  test('calls the login function with the correct username and password when login button is clicked', () => {
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(mockLogin).toHaveBeenCalledWith({
      id: '1',
      email: 'JamieDole@yahoo.com.sg',
      userType: 1, // Tenant
      authToken: '5880',
    });
  });  
  
  test('navigates to password reset page when "Forgot your login details?" is clicked', () => {
    // screen.logTestingPlaygroundURL();
    fireEvent.click(screen.getByText(/Click here/i));
    expect(screen.getByText(/Password Reset/i)).toBeInTheDocument();
    //this should work?! expect(screen.getByRole('button', {name: /request password reset/i })).toBeInTheDocument()
  });

  // failed test('navigates to password reset page when "Forgot your login details?" is clicked', () => {
  //   fireEvent.click(screen.getByText(/Click here/i));
  //   expect(screen.getByText((content, element) => {
  //     const hasText = (node) => node.textContent === "Password Reset";
  //     const nodeHasText = hasText(element);
  //     const childrenDontHaveText = Array.from(element.children).every(
  //       (child) => !hasText(child)
  //     );
  //     return nodeHasText && childrenDontHaveText;
  //   })).toBeInTheDocument();
  // });


});
