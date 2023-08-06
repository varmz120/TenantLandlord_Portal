import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RateTicket from '../pages/RateTicket';
import userEvent from '@testing-library/user-event';

jest.mock('../client', () => ({
  client: {
    service: (serviceName) => {
      if (serviceName === 'ticket') {
        return {
          unassignPersonnel: () => Promise.resolve(),
          closeTicket: () => Promise.resolve(),
          rejectTicket: () => Promise.resolve(),
          reopenTicket: () => Promise.resolve(),
          registerWorkFinished: () => Promise.resolve(),
        };
      }
      return () => Promise.resolve(); // You can modify this based on your requirements.
    },
    get2FA: (loginDetails) => {
      return Promise.resolve();
    },
  },
}));

const mockAcceptData = {
  rating: 4,
  remarks: 'accept_test',
};

const mockRejectData = {
  remarks: 'reject_test',
};
let mockTicket = {
  _id: '123',
  title: 'Test Ticket',
  requestType: 'Test Type',
  description: 'Test Description',
  attachements: [],
  status: 2,
  buildingId: '32133',
};
// Mock useNavigate
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: mockTicket,
  }),
}));

//user_id
describe('RateTicket', () => {
  beforeEach(async () => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    // eslint-disable-next-line
    render(
      <MemoryRouter>
        <RateTicket />
      </MemoryRouter>
    );
  });

  test('renders without crashing', () => {
    const titleElement = screen.getByText(/Service Ticket/i);
    const promptQn = screen.getByText(
      /Do you wish to close the ticket and confirm completion of service?/
    );
    expect(titleElement).toBeInTheDocument();
    expect(promptQn).toBeInTheDocument();
  });

  test('click on yes for close ticket form', () => {
    const yesButton = screen.getByRole('button', { name: 'Yes' });
    waitFor(() => fireEvent.click(yesButton));

    const ratingLabel = screen.getByText(/Rating/);
    const starButtons = screen.getAllByText('★');
    const remarksLabel = screen.getByText(/Additional Remarks/);
    const remarksInput = screen.getByPlaceholderText('Please include any additional remarks here.');
    const acknowledgementLabel = screen.getByText(/Acknowledgement of T&C/);
    const acknowledgementCheck = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    starButtons.forEach((star) => {
      expect(star).toBeInTheDocument();
    });
    expect(ratingLabel).toBeInTheDocument();
    expect(remarksLabel).toBeInTheDocument();
    expect(remarksInput).toBeInTheDocument();
    expect(acknowledgementLabel).toBeInTheDocument();
    expect(acknowledgementCheck).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('navigate /tenantDashboard after submit mock data for close ticket form', () => {
    const yesButton = screen.getByRole('button', { name: 'Yes' });
    waitFor(() => fireEvent.click(yesButton));

    const starButtons = screen.getAllByText('★');
    fireEvent.click(starButtons[mockAcceptData.rating]);

    for (let i = 0; i < mockAcceptData.rating; i++) {
      expect(starButtons[i].closest('button')).toHaveClass('text-starActive');
    }

    const acknowledgementCheck = screen.getByRole('checkbox');
    fireEvent.click(acknowledgementCheck);
    expect(acknowledgementCheck).toBeChecked();

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    waitFor(() => expect(mockNavigate).toBeCalledTimes(1));
    waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/tenantDashboard'));
  });

  test('click on no for reopen ticket form', () => {
    const noButton = screen.getByRole('button', { name: 'No' });
    waitFor(() => fireEvent.click(noButton));

    const remarksLabel = screen.getByText(/Reasons for reopening of service ticket/);
    const remarksInput = screen.getByPlaceholderText('Please include any additional remarks here.');
    const fileInput = screen.getByText(/! Click to upload/);
    const acknowledgementLabel = screen.getByText(/Acknowledgement of T&C/);
    const acknowledgementCheck = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(remarksLabel).toBeInTheDocument();
    expect(remarksInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(acknowledgementLabel).toBeInTheDocument();
    expect(acknowledgementCheck).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('navigate /tenantDashboard after submit mock data for close ticket form', () => {
    const noButton = screen.getByRole('button', { name: 'No' });
    waitFor(() => fireEvent.click(noButton));

    const acknowledgementCheck = screen.getByRole('checkbox');
    fireEvent.click(acknowledgementCheck);
    expect(acknowledgementCheck).toBeChecked();

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    waitFor(() => expect(mockNavigate).toBeCalledTimes(1));
    waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/tenantDashboard'));
  });
});
