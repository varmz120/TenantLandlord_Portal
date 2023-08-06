import React from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import LandlordViewTicket, { TicketStatus } from '../pages/LandlordViewTicket';
import { AuthContext } from '../contexts/AuthContext';

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
  },
}));

let mockTicket = {
  _id: '123',
  title: 'Test Ticket',
  requestType: 'Test Type',
  description: 'Test Description',
  attachements: [],
  status: TicketStatus.InQueue,
  buildingId: '32133',
};

let mockValue = {
  user: {
    _id: 'mockUserId',
    typ: 2,
    email: 'testuser@example.com',
    password: 'mockPassword',
    buildingId: 'mockBuildingId',
    leaseId: 'mockLeaseId',
  },
  temp_details: {
    id: 'mockId',
    password: 'mockPassword', // Mock these values according to your needs
  }, // Mock this according to your needs.
  login: jest.fn(), // Mock function for login
  logout: jest.fn(), // Mock function for logout
  tempLogin: jest.fn(), // Mock function for tempLogin
};

const mockNavigate = jest.fn();
// Mocking react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: mockTicket,
  }),
}));

describe('<LandlordViewTicket />', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the component with ticket details', () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockValue}>
        <LandlordViewTicket />
      </AuthContext.Provider>
    );

    expect(getByText('Service Ticket #123')).toBeInTheDocument();
    expect(getByText('Test Ticket')).toBeInTheDocument();
  });

  it('handles back button click', async () => {
    render(
      <AuthContext.Provider value={mockValue}>
        <LandlordViewTicket />
      </AuthContext.Provider>
    );

    const backButton = await screen.findByText('Back to all tickets');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/LandlordDashboard');
  });

  it('only have upload quotation button in status "In queue"', async () => {
    mockTicket.status = 0;
    render(<LandlordViewTicket />);
    let quotationButton = screen.queryByText('Upload Quotation');
    expect(quotationButton).not.toBeInTheDocument();

    mockTicket.status = 1;
    render(<LandlordViewTicket />);

    quotationButton = await screen.queryByText('Upload Quotation');
    expect(quotationButton).not.toBeInTheDocument();

    mockTicket.status = 3;
    render(<LandlordViewTicket />);

    quotationButton = await screen.queryByText('Upload Quotation');
    expect(quotationButton).not.toBeInTheDocument();

    mockTicket.status = 4;
    render(<LandlordViewTicket />);

    quotationButton = await screen.queryByText('Upload Quotation');
    expect(quotationButton).not.toBeInTheDocument();

    mockTicket.status = 5;
    render(<LandlordViewTicket />);

    quotationButton = await screen.queryByText('Upload Quotation');
    expect(quotationButton).not.toBeInTheDocument();

    mockTicket.status = 6;
    render(<LandlordViewTicket />);

    quotationButton = await screen.queryByText('Upload Quotation');
    expect(quotationButton).not.toBeInTheDocument();

    mockTicket.status = 2;
    render(<LandlordViewTicket />);

    quotationButton = await screen.queryByText('Upload Quotation');
    expect(quotationButton).toBeInTheDocument();
  });

  it('handles upload quotation click', async () => {
    mockTicket.status = 2;
    render(<LandlordViewTicket />);

    const quotationButton = await screen.findByText('Upload Quotation');
    fireEvent.click(quotationButton);

    expect(mockNavigate).toHaveBeenCalledWith('/LandlordUploadQuotation', { state: mockTicket });
  });

  it('only have reopen button in status "Rejected"', async () => {
    mockTicket.status = 0;
    render(<LandlordViewTicket />);
    let reopenButton = screen.queryByText('Reopen Ticket');
    expect(reopenButton).not.toBeInTheDocument();

    mockTicket.status = 1;
    render(<LandlordViewTicket />);

    reopenButton = await screen.queryByText('Reopen Ticket');
    expect(reopenButton).not.toBeInTheDocument();

    mockTicket.status = 3;
    render(<LandlordViewTicket />);

    reopenButton = await screen.queryByText('Reopen Ticket');
    expect(reopenButton).not.toBeInTheDocument();

    mockTicket.status = 4;
    render(<LandlordViewTicket />);

    reopenButton = await screen.queryByText('Reopen Ticket');
    expect(reopenButton).not.toBeInTheDocument();

    mockTicket.status = 2;
    render(<LandlordViewTicket />);

    reopenButton = await screen.queryByText('Reopen Ticket');
    expect(reopenButton).not.toBeInTheDocument();

    mockTicket.status = 6;
    render(<LandlordViewTicket />);

    reopenButton = await screen.queryByText('Reopen Ticket');
    expect(reopenButton).not.toBeInTheDocument();

    mockTicket.status = 5;
    render(<LandlordViewTicket />);

    reopenButton = await screen.queryByText('Reopen Ticket');
    expect(reopenButton).toBeInTheDocument();
  });

  it('handles reopen button click', async () => {
    render(<LandlordViewTicket />);
    const reopenButton = await screen.findByText('Reopen Ticket');
    fireEvent.click(reopenButton);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/landlordDashboard');
    });
  });

  // test('handles unassign click', async () => {
  //   // Mocking any API calls if any
  //   jest.mock('axios'); // Assuming axios is used for API calls

  //   const apiMock = jest.fn(); // Mock the API call function
  //   apiMock.mockResolvedValueOnce({ data: {} }); // Modify as per your API's expected response

  //   // Render your component
  //   render(<LandlordViewTicket />);

  //   // Find the element that triggers `handleUnassignClick`. Assuming it's a button with "Unassign" text.
  //   const unassignButton = screen.getByText(/unassign/i);

  //   // Fire a click event on the button
  //   fireEvent.click(unassignButton);

  //   // Assuming that there is a loader or some UI change that indicates an API call or state change
  //   expect(screen.getByTestId('loading-indicator')).toBeVisible(); // Assuming you have a loader with 'loading-indicator' as its data-testid

  //   // If the API call was successful and changes some UI elements, you can check for those UI changes here.
  //   // For instance, if it shows a success message:
  //   expect(screen.getByText(/successfully unassigned/i)).toBeVisible();

  //   // If the `handleUnassignClick` also makes state changes, ensure those are reflected in the UI and check for them.

  //   // Validate that the API was called once
  //   expect(apiMock).toHaveBeenCalledTimes(1);
  // });

  // - handleUnassignClick
  // - handleCloseTicketd

  // Also consider adding tests for different ticket statuses and how the UI behaves in those cases.
});
