import { render, screen } from '@testing-library/react';

import App from './App';
import { MemoryRouter } from 'react-router-dom';

// References:
// https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
// https://testing-library.com/docs/example-react-router/
// https://jestjs.io/docs/timer-mocks

// SIMPLE APP TEST
// Render login page from /
test('not logged in: renders login page', () => {
  let test_path = '/';
  render(
    <MemoryRouter initialEntries={[test_path]}>
      <App />
    </MemoryRouter>
  );

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