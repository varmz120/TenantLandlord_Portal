import {  fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from '../App';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate
}));

const mockTenant = {
  user: {
    _id: 'mockTenantUser',
    typ: 0,
    email: 'testuser@example.com',
    password: 'mockPassword',
    buildingId: 'mockBuildingId',
    leaseId: 'mockLeaseId',
  },
  temp_details: {
    id: 'mockId',
    password: 'mockPassword', // Mock these values according to your needs
  }, // Mock this according to your needs.
  login: jest.fn(), // Mock function for login
  logout: jest.fn(), // Mock function for logout
  tempLogin: jest.fn(), // Mock function for tempLogin
};

const mockAdmin = {
  user: {
    _id: 'mockAdminUser',
    typ: 3,
    email: 'testuser@example.com',
    password: 'mockPassword',
    buildingId: 'mockBuildingId',
  },
  temp_details: {
    id: 'mockId',
    password: 'mockPassword', // Mock these values according to your needs
  }, // Mock this according to your needs.
  login: jest.fn(), // Mock function for login
  logout: jest.fn(), // Mock function for logout
  tempLogin: jest.fn(), // Mock function for tempLogin
};

describe('Routing Tests\n    Route: \'/\'', () => {

  afterEach(() => {
    mockUseNavigate.mockReset();
  })

  test('renders init page (before reload)', async() => {
    render(
      <MemoryRouter initialEntries={['/']}>
             <App/>
        </MemoryRouter>);

    const loadingTitle = screen.getByText(/Loading.../);
    expect(loadingTitle).toBeInTheDocument();
  });

  test('renders login page (after reload)', async() => {
    render(
      <MemoryRouter initialEntries={['/']}>
             <App/>
        </MemoryRouter>);

    // To resolve the loading
    await act(async() => {
      Promise.resolve();
    });
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);

    const titleElement = screen.getByText(/Anacle/);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const subtitleElement = screen.getByText(/Forgot your login details?/);
    const linkElement = screen.getByRole('button', { name: 'Click here' });
  
    expect(titleElement).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
})

describe('  Route: \'/login\'', () => {
  test('renders login page (direct)', async() => {
    render(
      <MemoryRouter initialEntries={['/login']}>
           <App/>
      </MemoryRouter>);

    // To resolve the loading
    await act(async() => {
      Promise.resolve();
    });

    const titleElement = screen.getByText(/Anacle/);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const subtitleElement = screen.getByText(/Forgot your login details?/);
    const linkElement = screen.getByRole('button', { name: 'Click here' });

    expect(titleElement).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

  });

})

describe('  Route: \'/2fa\'', () => {
  test('renders 2fa page (navigate from /login)', async() => {
    render(
      <MemoryRouter initialEntries={['/login']}>
          <App/>
      </MemoryRouter>);

    // To resolve the loading
    await act(async() => {
      Promise.resolve();
    });
    
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole("button", {name: "Login"});

    waitFor(()=> fireEvent.change(usernameInput, {target: testAdminUser._id}));
    waitFor(()=> fireEvent.change(passwordInput, {target: testAdminUser.password}));

    waitFor(()=> expect(usernameInput).toHaveValue(testAdminUser._id));
    waitFor(()=> expect(passwordInput).toHaveValue(testAdminUser.password));

    waitFor(()=> fireEvent.click(loginButton));
    
    waitFor(()=> expect(mockUseNavigate).toHaveBeenCalledTimes(1));
    waitFor(()=> expect(mockUseNavigate).toHaveBeenCalledWith('/login2FA'));
  });

  test('renders 2fa page (direct w user details)', async() => {
    render(

      <AuthContext.Provider value={mockTenant}>
        <MemoryRouter initialEntries={['/login2fa']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>);

    // To resolve the loading
    await act(async() => {
      Promise.resolve();
    });
    
    const titleElement = screen.getByText(/Anacle/);
    const twofaLabel = screen.getByText(/Two-Factor/);
    const authLabel = screen.getByText(/Authentication/);
    const authInput = screen.getByPlaceholderText("Enter authentication code");
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(titleElement).toBeInTheDocument();
    expect(twofaLabel).toBeInTheDocument();
    expect(authLabel).toBeInTheDocument();
    expect(authInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
  });
  
})

describe('  Route: \'Errors', () => {
  test('renders 404 error after navigate to /gibberish', async() => {
    render(
        <MemoryRouter initialEntries={['/gibberish']}>
          <App />
        </MemoryRouter>);

    // To resolve the loading
    await act(async() => {
      Promise.resolve();
    });

    const errorTitle = screen.getByText(/404/);
    const errorMsg = screen.getByText(/Page Not Found/);
    const redirectLink = screen.getByRole("link", {name: "Dashboard or Login page"});
    
    expect(errorTitle).toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
    expect(redirectLink).toBeInTheDocument();
  })

  test('renders 403 error after navigate to /tenantDashboard (as admin)', async() => {
    render(
      <AuthContext.Provider value={mockAdmin}>
        <MemoryRouter initialEntries={['/tenantDashboard']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>);
      // To resolve the loading
      await act(async() => {
        Promise.resolve();
      });

      const errorTitle = screen.getByText(/403 - Forbidden/);
      const errorMsg = screen.getByText(/You do not have permission to access this resource. If you think this is an error, please contact the system admin./);
      const redirectLink = screen.getByRole("link", {name: "Dashboard or Login page"});
      
      expect(errorTitle).toBeInTheDocument();
      expect(errorMsg).toBeInTheDocument();
      expect(redirectLink).toBeInTheDocument();
  })

})