import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from './App';
import { act } from 'react-dom/test-utils';

// References: 
// https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
// https://testing-library.com/docs/example-react-router/
// https://jestjs.io/docs/timer-mocks

// LOGIN RENDERS
// Test #1 : Render landing page (user not logged in)
test('renders landing page with navbar and two buttons', () => {
  render(<App />);

  const navbarElement = screen.getByRole("navigation");
  const paragraphElement = screen.getByText(/Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features./);
  const loginButton1 = screen.getByRole("button", {name: "Login as Tenant"});
  const loginButton2 = screen.getByRole("button", {name: "Login as Landlord"});

  expect(navbarElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
  expect(loginButton1).toBeInTheDocument();
  expect(loginButton2).toBeInTheDocument();
});
// Test #2 : Render landing page redirecting to dashboard (tenant user logged in)
test('renders landing page and redirects to tenant dashboard after timeout for 0.5s', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  render(<App />);

  const paragraphElement = screen.getByText(/Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features./);
  expect(paragraphElement).toBeInTheDocument();

  const loginButton = screen.getByRole("button", {name: "Login as Tenant"});
  await userEvent.click(loginButton);

  const successMsg = screen.getByText(/Successfully logged in! Welcome User 1!/);
  expect(successMsg).toBeInTheDocument();
  
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  act(()=> {
    jest.advanceTimersByTime(500);
  });
  //await Promise.resolve();

  const tableElement = screen.getByRole("table");
  const buttonElement = screen.getByRole("button", {name: "New Request"}); 
  const logoutButton = screen.getByText(/Log Out/);
  expect(tableElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();

  await userEvent.click(logoutButton);
  expect(paragraphElement);

  jest.useRealTimers();
});
// Test #3: Render landing page redirecting to 403 error (landlord user logged in)
test('renders landing page and redirects to 403 error after timeout for 0.5s', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  render(<App />);

  const paragraphElement = screen.getByText(/Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features./);
  expect(paragraphElement).toBeInTheDocument();

  const loginButton = screen.getByRole("button", {name: "Login as Landlord"});
  await userEvent.click(loginButton);

  const successMsg = screen.getByText(/Successfully logged in! Welcome User 2!/);
  expect(successMsg).toBeInTheDocument();
  
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  act(()=> {
    jest.advanceTimersByTime(500);
  });
  //await Promise.resolve();

  const errorMsg = screen.getByText(/403 - Forbidden/);
  const errorDescription = screen.getByText(/You do not have permission to access this resource./)
  expect(errorMsg).toBeInTheDocument();
  expect(errorDescription).toBeInTheDocument();

  jest.useRealTimers();
});

// WORKFLOW TESTS
// Normal flow: Login -> Raise request -> View Details -> Accept Quote -> View Details -> Rate Ticket -> Close Ticket 
// Alternate flow #1: Login -> Raise request -> View Details -> Reject Quote -> View Details -> Accept Quote -> View Details -> Rate Ticket -> Close Ticket
// Alternate flow #2: Login -> Raise request -> View Details -> Reject Quote -> View Details -> Accept Quote -> Rate Ticket -> Reopen Ticket 
// -> View Details -> Accept Quote -> View Details -> Rate Ticket -> Close Ticket

// ROUTING TESTS
// #1: User not logged in, tries accessing all routes beyond /
// #1: User logged in as tenant, tries accessing all routes beyond / without submitting anything
// #1: Render 403 error pages for everything lol (landlord logged in)