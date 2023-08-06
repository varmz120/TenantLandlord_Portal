import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import PasswordResetOne from '../pages/PasswordResetOne';
import userEvent from '@testing-library/user-event';

// Mock useNavigate
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate
}));

describe('PasswordResetOne', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockUseNavigate.mockReset();

    // eslint-disable-next-line
    render(<PasswordResetOne />);
  });

  test('renders without crashing', () => {
    const passwordResetElement = screen.getByText(/Anacle/i);
    expect(passwordResetElement).toBeInTheDocument();
  });

  test('email field updates on change', () => {
    const idInput = screen.getByPlaceholderText(/User ID/i);
    waitFor(()=> userEvent.type(idInput, 'test'));
    expect(idInput).toHaveValue('test');
  });

  test('navigates to /2fa when Submit button is clicked', async() => {
    const idInput = screen.getByPlaceholderText(/User ID/i);
    waitFor(()=> userEvent.type(idInput, 'test'));
    await act(async() => {
      waitFor(()=>fireEvent.click(screen.getByText(/Request Password Reset/i)));
    });
    await new Promise((r) => setTimeout(r, 2000));
    expect(mockUseNavigate).toHaveBeenCalledWith('/resetrequestfailure');
  });

  test('navigates to / when Back button is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/');
  });
});
