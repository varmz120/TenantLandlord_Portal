import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewTicket, {TicketStatus} from '../pages/ViewTicket';
import { AuthContext } from '../contexts/AuthContext';

let mockTicket = {
  _id: '123',
  title: 'Test Ticket',
  requestType: 'Test Type',
  description: 'Test Description',
  attachements: [], // fill as needed
  status: TicketStatus.Opened,
  buildingId: '32133',
};

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: () => ({
    state: mockTicket,
  })
}));

const mockValue = {
  user: {
    _id: 'mockUserId',
    typ: 0,
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

//user_id
describe('RateTicket', () => {

  beforeEach(async() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    jest.clearAllMocks();

    // eslint-disable-next-line
  })
  
  test('renders without crashing', () => {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewTicket />
        </MemoryRouter>
      </AuthContext.Provider>
  )

    const titleElement= screen.getByText(/Service Ticket #/i);
    expect(titleElement).toBeInTheDocument();
  })

  test('renders mocked data', ()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewTicket />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const ticketId = screen.getByText(/Service Ticket #123/i);
    const ticketTitle = screen.getByText(/Test Ticket/);
    const categoryLabel = screen.getByLabelText(/Category/);
    const categoryField = screen.getByRole("textbox", {name: 'Category'});
    const descriptionLabel = screen.getByText("Description");
    const descriptionField = screen.getByText("Test Description");
    const statusLabel = screen.getByText(/Status/);
    const statusImg = screen.getByAltText("Opened");
    const actionLabel = screen.getByText("Action Required");
    const actionExclaimation = screen.getByAltText("exclaimation");
    const closeButton = screen.getByRole("button", {name: "Close Ticket"});
    const personnelTitle = screen.getByText(/Personnel Assigned/);
    const personnelValue = screen.getByText(/None/);
    
    expect(ticketId).toBeInTheDocument();
    expect(ticketTitle).toBeInTheDocument();
    expect(categoryLabel).toBeInTheDocument();
    expect(categoryField).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(statusLabel).toBeInTheDocument();
    expect(statusImg).toBeInTheDocument();
    expect(actionLabel).toBeInTheDocument();
    expect(actionExclaimation).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(personnelTitle).toBeInTheDocument();
    expect(personnelValue).toBeInTheDocument();

  })

  test('navigates to /tenantDashboard when click Back button', ()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewTicket />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const backButton = screen.getByRole("button", {name: 'Back to all tickets'});
    waitFor(()=> fireEvent.click(backButton));

    expect(mockUseNavigate).toBeCalledTimes(1);
    expect(mockUseNavigate).toBeCalledWith('/tenantDashboard');
  })

  test('navigates to /tenantDashboard when click Close Ticket button', async()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewTicket />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const closeButton = screen.getByRole("button", {name: 'Close Ticket'});
    expect(closeButton).toBeInTheDocument();

    waitFor(()=> fireEvent.click(closeButton));

    waitFor(()=>expect(mockUseNavigate).toBeCalledTimes(1));
    waitFor(()=>expect(mockUseNavigate).toHaveBeenCalledWith('/tenantDashboard'));
  })

  test('navigates to /viewQuote when click View Quote button', async()=> {
    mockTicket = {
      _id: '123',
      title: 'Test Ticket',
      requestType: 'Test Type',
      description: 'Test Description',
      attachements: [], // fill as needed
      status: TicketStatus.WaitingForQuotApproval,
      buildingId: '32133',
    };
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewTicket />
        </MemoryRouter>
      </AuthContext.Provider>
  )

    const viewButton = screen.getByRole("button", {name: 'View Quote'});
    expect(viewButton).toBeInTheDocument();
    waitFor(()=> fireEvent.click(viewButton));

    expect(mockUseNavigate).toBeCalledTimes(1);
    expect(mockUseNavigate).toBeCalledWith('/viewQuote', {"state": {"_id": "123", "attachements": [], "buildingId": "32133", "description": "Test Description", "requestType": "Test Type", "status": 1, "title": "Test Ticket"}});
  })

  test('navigates to /feedbackSurvey when click Rate Ticket button', async()=> {
    
    mockTicket = {
      _id: '123',
      title: 'Test Ticket',
      requestType: 'Test Type',
      description: 'Test Description',
      attachements: [], // fill as needed
      status: TicketStatus.PendingCompletionApproval,
      buildingId: '32133',
    };

    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewTicket />
        </MemoryRouter>
      </AuthContext.Provider>
  )

    const rateButton = screen.getByRole("button", {name: 'Rate Ticket'});
    expect(rateButton).toBeInTheDocument();
    waitFor(()=> fireEvent.click(rateButton));

    expect(mockUseNavigate).toBeCalledTimes(1);
    expect(mockUseNavigate).toBeCalledWith('/feedbackSurvey', {"state": {"_id": "123", "attachements": [], "buildingId": "32133", "description": "Test Description", "requestType": "Test Type", "status": 4, "title": "Test Ticket"}});
  })



})