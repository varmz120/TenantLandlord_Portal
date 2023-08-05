import { render, screen } from '@testing-library/react';

import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

// References:
// https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
// https://testing-library.com/docs/example-react-router/
// https://jestjs.io/docs/timer-mocks

// SIMPLE APP TEST
// Render login page from / when unauthenticated

describe('Initial render test for App', () => {

  test('renders loading page (before useEffect triggered)', () => {
    // Render a component without triggering useEffect
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
             <App/>
        </MemoryRouter>);
    });
    
    const loadingText = screen.getByText(/Loading.../);
    expect(loadingText).toBeInTheDocument();
    });

  test('renders login page (after useEffect triggered)', async() => {
    // Render a component
    await act(async() => {
      render(
        <MemoryRouter initialEntries={['/login']}>
             <App/>
        </MemoryRouter>);
    });
  
    const titleElement = screen.getByText(/Anacle/);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const subtitleElement = screen.getByText(/Forgot your login details?/);
    const linkElement = screen.getByRole('button', { name: 'Click here' });
  
    expect(titleElement);
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  }
  
);
  
  

});