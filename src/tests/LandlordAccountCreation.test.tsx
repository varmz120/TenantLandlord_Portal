import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandlordAccountCreation from '../pages/LandlordAccountCreation';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LandlordAccountCreation', () => {


  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
    render(
      <Router>
        <LandlordAccountCreation />
      </Router>
    );
  });

  test('renders without crashing', () => {});

  test('displays "Add Service" text', () => {
    // Assert that "Add Service" is displayed
    expect(screen.getByText(/Add Service/i)).toBeInTheDocument();
  });

  test('displays "Service Details" text', () => {
    // Assert that "Service Details" is displayed
    expect(screen.getByText(/Service Details/i)).toBeInTheDocument();
  });

  test('displays "Name" text', () => {
    // Assert that "Name" is displayed with the correct value
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });


  test('renders Submit button', () => {
    //Assert that "Submit" button is rendered
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
});
