import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LandlordAddService from '../pages/LandlordAddService';
import { TicketStatus } from '../pages/LandlordViewTicket';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

let mockTicketData = {
  _id: '01',
  title: 'Test Ticket',
  requestType: 'Test Type',
  description: 'Test Description',
  attachements: [],
  status: TicketStatus.InQueue,
  buildingId: 'B-001',
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

// Mocking react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: mockTicketData,
  }),
}));

describe('LandlordAddService', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders with correct title fields', () => {
    const {getAllByText} = render(
      <AuthContext.Provider value={mockValue}>
        <LandlordAddService />
      </AuthContext.Provider>
    );

    const addServiceElements = getAllByText('Add Service');

    expect(addServiceElements.length).toBe(2);
    expect(screen.getByText('Service Details')).toBeInTheDocument();
  })

  it('renders "Name" input field', () => {
    render(<LandlordAddService/>)
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders input field with placeholder "Enter new service"', () => {
    render(<LandlordAddService/>)
    // Use getByPlaceholderText to query the input field
    const inputField = screen.getByPlaceholderText('Enter new service');

    // Assert that the input field with the specific placeholder text is found
    expect(inputField).toBeInTheDocument();
  })

  it('renders "Submit" button', () => {
    render(<LandlordAddService/>)
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

});
