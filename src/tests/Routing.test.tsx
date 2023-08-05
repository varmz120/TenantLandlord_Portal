import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { UserType } from '../esc-backend/src/services/users/users.schema';

// TODO: Include routes after auth for other pages (Tenant, Landlord, Admin)

// ---------------------------- SETUP ---------------------------------
// MOCKS
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate
}));

// AUTH SETUP
const testAdminUser = {
  _id: 'admin',
  typ: UserType.Admin,
  email: 'admin@test.com',
  password: 'supersecret',
};

// const testTenantUser: UserData = {
//   _id: 'tenant',
//   password: 'supersecret',
//   email: 'tenant@test.com',
//   typ: UserType.Tenant,
// };


// ROUTING TESTS
describe('Routing Tests\nRoute: \'/\'', () => {

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

describe('Route: \'/login\'', () => {
  test('renders login page (direct)', async() => {
    render(
      <MemoryRouter initialEntries={['/login']}>
           <App/>
      </MemoryRouter>);

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

// NOTE: uhh dont think this is supposed to be allowed direct(?) but for rendering purposes, include
describe('Route: \'/Tenant2FA\'', () => {
  test('renders 2FA page (direct)', async() => {
    render(
      <MemoryRouter initialEntries={['/Tenant2FA']}>
           <App/>
      </MemoryRouter>);

    await act(async() => {
      Promise.resolve();
    });

    const titleElement = screen.getByText(/Anacle/);
    const paragraph1Element = screen.getByText(/Two-Factor/);
    const paragraph2Element = screen.getByText(/Authentication/);
    const authInput = screen.getByPlaceholderText('Enter authentication code');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(titleElement).toBeInTheDocument();
    expect(paragraph1Element).toBeInTheDocument();
    expect(paragraph2Element).toBeInTheDocument();
    expect(authInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    console.log(screen.debug());
  });
})

describe('Route: \'/TenantDashboard\'', () => {
  test('renders dashboard ', async() => {
    render(
      <MemoryRouter initialEntries={['/Tenant2FA']}>
           <App/>
      </MemoryRouter>);

    await act(async() => {
      Promise.resolve();
    });

    const titleElement = screen.getByText(/Anacle/);
    const paragraph1Element = screen.getByText(/Two-Factor/);
    const paragraph2Element = screen.getByText(/Authentication/);
    const authInput = screen.getByPlaceholderText('Enter authentication code');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(titleElement).toBeInTheDocument();
    expect(paragraph1Element).toBeInTheDocument();
    expect(paragraph2Element).toBeInTheDocument();
    expect(authInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    console.log(screen.debug());
  });

})