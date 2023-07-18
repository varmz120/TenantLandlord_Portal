import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Unit Test #1 : Render landing page to both
test('renders landing page', () => {
  render(<App />);

  const linkElement = screen.getByText(/Log In/);
  expect(linkElement).toBeInTheDocument();
});

// Unit Test #2 : Render tenant dashboard only to users who successfully logged in

// Unit Test #3 : Render tenant dashboard only to users who successfully logged in

// Unit Test #4 :

// Unit Test #5 :

// Unit Test #6 :
