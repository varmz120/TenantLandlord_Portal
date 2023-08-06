import React from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import LandlordViewTicket, { TicketStatus } from '../pages/LandlordViewTicket';
import { AuthContext } from '../contexts/AuthContext';
import { stat } from 'fs';

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

const buttonExist = async (statusNo, buttonText) => {
  for (let i = 0; i < 6; i++) {
    if (i == statusNo) {
      continue;
    }
    mockTicket.status = i;
    render(<LandlordViewTicket />);
    let button = await screen.queryByText(buttonText);
    expect(button).not.toBeInTheDocument();
  }
  mockTicket.status = statusNo;
  render(<LandlordViewTicket />);
  let button = await screen.queryByText(buttonText);
  expect(button).toBeInTheDocument();
};

const handlesButton = async (statusNo, buttonText, navigate) => {
  mockTicket.status = statusNo;
  render(<LandlordViewTicket />);
  const reopenButton = await screen.findByText(buttonText);
  fireEvent.click(reopenButton);
  // await waitFor(() => {
  expect(mockNavigate).toHaveBeenCalledWith(navigate);
  // });
};

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
    buttonExist(2, 'Upload Quotation');
  });

  it('only have finish works button in status "In Progress"', async () => {
    buttonExist(3, 'Finish Works');
  });

  it('only have Assign Personnel ! button in status "In Progress"', async () => {
    buttonExist(0, 'Assign Personnel !');
  });

  it('only have Reject Ticket button in status "In Progress"', async () => {
    buttonExist(0, 'Reject Ticket');
  });

  it('only have reopen button in status "Rejected"', async () => {
    buttonExist(5, 'Reopen Ticket');
  });

  it('only have View Feedback button in status "In Progress"', async () => {
    buttonExist(6, 'View Feedback');
  });

  it('handles upload quotation click', async () => {
    handlesButton(2, 'Upload Quotation', '/landlordDashboard');
  });

  it('handles reopen button click', async () => {
    handlesButton(5, 'Reopen Ticket', '/landlordDashboard');
  });

  it('handles finish works button click', async () => {
    handlesButton(3, 'Finish Works', '/landlordDashboard');
  });

  it('handles Reject Ticket button click', async () => {
    handlesButton(0, 'Reject Ticket', '/landlordDashboard');
  });

  it('handles View Feedback button click', async () => {
    handlesButton(6, 'View Feedback', '/landlordDashboard');
  });

  // it('handles Assign Personnel button click', async () => {
  //   handlesButton(0, 'Assign Personnel !', '/landlordDashboard');
  // });

  // - handleCloseTicketd

  // Also consider adding tests for different ticket statuses and how the UI behaves in those cases.
});
