import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import PasswordResetSuccessful from '../pages/PasswordResetSuccessful';

describe('PasswordResetSuccessful', () => {
  const history = createMemoryHistory()

  beforeEach(() => {
    render(
      <Router history={history}>
        <PasswordResetSuccessful />
      </Router>
    );
  });

  test('renders without crashing', () => {
    const passwordResetSuccessfulElement = screen.getByText(/Tenant Portal/i);
    expect(passwordResetSuccessfulElement).toBeInTheDocument();
  });

  test('renders Password Reset and Successful text', () => {
    const passwordResetElement = screen.getByText(/Password Reset/i);
    expect(passwordResetElement).toBeInTheDocument();

    const successfulElement = screen.getByText(/Successful/i);
    expect(successfulElement).toBeInTheDocument();
  });

  test('renders Back button', () => {
    const buttonElement = screen.getByText(/Back/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('navigates to / when Back button is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(history.location.pathname).toBe('/');
  });
});
