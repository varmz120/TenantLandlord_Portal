import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

// References:
// https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
// https://testing-library.com/docs/example-react-router/
// https://jestjs.io/docs/timer-mocks

// ROUTING RENDER TESTS
// #1 : Render landing page (user not logged in)
test('not logged in: renders landing page with navbar and two buttons', () => {
  let test_path = '/landing'
  render(
    <MemoryRouter initialEntries={[test_path]}>
      <App />
    </MemoryRouter>
  );

  const navbarElement = screen.getByRole('navigation');
  const paragraphElement = screen.getByText(
    /Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features./
  );
  const loginButton1 = screen.getByRole('button', { name: 'Login as Tenant' });
  const loginButton2 = screen.getByRole('button', { name: 'Login as Landlord' });

  expect(navbarElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
  expect(loginButton1).toBeInTheDocument();
  expect(loginButton2).toBeInTheDocument();
});
// #2: Render 401 page navigating sensitive routes (user not logged in)
describe('not logged in: renders 401 page on all routes beyond /', () => {
  let test_paths = ['/viewDetails', '/viewQuote', '/feedbackSurvey'];

  test_paths.forEach((path) => {
    it('renders 401 page at '.concat(path), () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      const errorMsg = screen.getByText(/401 - Unauthorised/);
      const errorDescription = screen.getByText(/Your authorisation failed. Please try again./);
      expect(errorMsg).toBeInTheDocument();
      expect(errorDescription).toBeInTheDocument();
    });
  });
});
// #3 : Render landing page redirecting to dashboard (tenant user logged in)
test('tenant logged in: renders landing page and redirects to tenant dashboard after timeout for 0.5s', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  let test_path = '/landing'
  render(
    <MemoryRouter initialEntries={[test_path]}>
      <App />
    </MemoryRouter>
  );

  const paragraphElement = screen.getByText(
    /Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features./
  );
  expect(paragraphElement).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: 'Login as Tenant' });
  await userEvent.click(loginButton);

  const successMsg = screen.getByText(/Successfully logged in!/);
  expect(successMsg).toBeInTheDocument();

  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // await Promise.resolve();

  const tableElement = screen.getByRole('table');
  const buttonElement = screen.getByRole('button', { name: 'New Request' });
  const logoutButton = screen.getByText(/Log Out/);
  expect(tableElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();

  await userEvent.click(logoutButton);
  expect(paragraphElement);

  jest.useRealTimers();
});
// #4: Render 403 error when navigating to recognised routes w/o data (tenant user logged in)
// #5: Render landing page redirecting to 403 error (landlord user logged in) NOTE: This should be last...
test('landlord logged in: renders landing page and redirects to 403 error after timeout for 0.5s', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  let test_path = '/landing'
  render(
    <MemoryRouter initialEntries={[test_path]}>
      <App />
    </MemoryRouter>
  );

  const paragraphElement = screen.getByText(
    /Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features./
  );
  expect(paragraphElement).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: 'Login as Landlord' });
  await userEvent.click(loginButton);

  const successMsg = screen.getByText(/Successfully logged in!/);
  expect(successMsg).toBeInTheDocument();

  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // await Promise.resolve();

  const errorMsg = screen.getByText(/403 - Forbidden/);
  const errorDescription = screen.getByText(
    /You do not have permission to access this resource. If you think this is an error, please contact the system admin./
  );
  expect(errorMsg).toBeInTheDocument();
  expect(errorDescription).toBeInTheDocument();

  jest.useRealTimers();
});
// #6: Render 403 error page for all tenant pages (landlord user logged in)
describe('landlord logged in: renders 403 page on all routes beyond /', () => {
  let test_paths = ['/tenantDashboard', '/viewDetails', '/viewQuote', '/feedbackSurvey'];

  test_paths.forEach((path) => {
    it('renders 403 page at '.concat(path), () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      const errorMsg = screen.getByText(/403 - Forbidden/);
      const errorDescription = screen.getByText(
        /You do not have permission to access this resource. If you think this is an error, please contact the system admin./
      );
      expect(errorMsg).toBeInTheDocument();
      expect(errorDescription).toBeInTheDocument();
    });
  });
});
// #7: Render 404 error page navigating to unrecognised route
test('not/are logged in: renders 404 page navigating unrecognised path', async () => {
  render(
    <MemoryRouter initialEntries={['/some-unknown-path']}>
      <App />
    </MemoryRouter>
  );

  const errorMsg = screen.getByText(/404/);
  const errorDescription = screen.getByText(/Page Not Found/);
  expect(errorMsg).toBeInTheDocument();
  expect(errorDescription).toBeInTheDocument();
});

// WORKFLOW TESTS
// Normal flow: Login -> Raise request -> View Details -> Accept Quote -> View Details -> Rate Ticket -> Close Ticket
// Alternate flow #1: Login -> Raise request -> View Details -> Reject Quote -> View Details -> Accept Quote -> View Details -> Rate Ticket -> Close Ticket
// Alternate flow #2: Login -> Raise request -> View Details -> Reject Quote -> View Details -> Accept Quote -> Rate Ticket -> Reopen Ticket
// -> View Details -> Accept Quote -> View Details -> Rate Ticket -> Close Ticket

// FORM TESTS
// /newRequest form should display all error messages
// /rateTicket form should display all error messages
