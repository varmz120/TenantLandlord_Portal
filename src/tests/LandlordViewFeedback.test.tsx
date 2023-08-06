import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandlordViewFeedback from '../pages/LandlordViewFeedback';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LandlordViewFeedback', () => {
  // const mockFeedbackData = {
  //   ID: "#0012",
  //   Title: "Security Access Issue",
  //   Rating: "5",
  //   CompletedOn: "8/5/2023",
  //   Remarks: "Remarks test"
  // };

  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
    render(
      <Router>
        <LandlordViewFeedback />
      </Router>
    );
  });

  test('renders without crashing', () => {});

  test('displays "Ticket ID" text', () => {
    // Assert that "Feedback for ID" is displayed with the correct value
    expect(screen.getByText(/Feedback for/i)).toBeInTheDocument();
    // expect(screen.getByText(mockFeedbackData.ID)).toBeInTheDocument();
  });

  // test('displays "Title" text', () => {
  //   // Assert that "Title" is displayed with the correct value
  //   // expect(screen.getByText(mockFeedbackData.Title)).toBeInTheDocument();
  // });

  test('displays "Rating"', () => {
    // Assert that "Rating" is displayed with the correct value
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    // expect(screen.getByText(mockFeedbackData.Rating)).toBeInTheDocument();
  });

  test('displays "Completed On" text', () => {
    // Assert that "Completed On" is displayed with the correct value
    expect(screen.getByText(/Completed On/i)).toBeInTheDocument();
    // expect(screen.getByText(mockFeedbackData.CompletedOn)).toBeInTheDocument();
  });

  test('displays "Remarks" text', () => {
    screen.logTestingPlaygroundURL();
    // Assert that "Remarks" is displayed with the correct value
    expect(screen.getByText(/Remarks/i)).toBeInTheDocument();
    // expect(screen.getByText(mockFeedbackData.Remarks)).toBeInTheDocument();
  });


  test('calls navigation function on Back button click', () => {
    const backButton = screen.getByText(/Back to ticket details/i);
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/LandlordDashboard');
  });
});
