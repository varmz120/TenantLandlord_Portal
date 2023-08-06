import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import PasswordResetTwo from '../pages/PasswordResetTwo';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

//user_id
describe('PasswordResetTwo', () => {
  beforeEach(async() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    // eslint-disable-next-line
    await act(async() => {
      render(
      <PasswordResetTwo/>)
    });
  });
  

  test('renders without crashing', () => {
    const passwordResetElement = screen.getByText(/Anacle/i);
    expect(passwordResetElement).toBeInTheDocument();
  });

  test('password fields update on change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Set new password/i), {
      target: { value: 'newpassword' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password/i), {
      target: { value: 'newpassword' },
    });

    expect((screen.getByPlaceholderText(/Set new password/i) as HTMLInputElement).value).toBe(
      'newpassword'
    );
    expect((screen.getByPlaceholderText(/Confirm new password/i) as HTMLInputElement).value).toBe(
      'newpassword'
    );
  });

  test('navigates to /resetunsuccessful when Confirm New Password button is clicked (user not logged in)', async() => {
    waitFor(()=>fireEvent.click(screen.getByText(/Confirm New Password/i)));
    expect(mockNavigate).toHaveBeenCalledWith('/resetunsuccessful');
  });

  test('navigates to / when Back to Login button is clicked', () => {
    waitFor(()=> fireEvent.click(screen.getByText(/Back to Login/i)));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
