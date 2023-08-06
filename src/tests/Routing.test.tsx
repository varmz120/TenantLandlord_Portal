import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  // TODO: Find out why the navigate event is not firing after form submission
  test('renders 2fa page (navigate)', async() => {
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
    //const form = screen.getByRole('form');

    // NOTE: There is an error with form submission during Jest testing but npm run start is working... 
    waitFor(()=> userEvent.type(usernameInput, testAdminUser._id));
    waitFor(()=> userEvent.type(passwordInput, testAdminUser.password));

    expect(usernameInput).toHaveValue(testAdminUser._id);
    expect(passwordInput).toHaveValue(testAdminUser.password);
    //waitFor(()=> fireEvent.submit(form));

    waitFor(()=> userEvent.click(loginButton));
    
    // PRINT SCREEN BEFORE ERROR
    console.log(screen.debug());

    // ERROR
    //expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/login2FA');
  });
})
