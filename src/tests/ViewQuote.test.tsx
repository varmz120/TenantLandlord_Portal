import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewQuote from '../pages/ViewQuote';
import { AuthContext } from '../contexts/AuthContext';

let mockTicket = {
    _id: 123,
    status: 1,
    leaseId: "mockLeaseId",
    userId: "mockUserId",
    buildingId: "mockBuildingId",
    title: "test_title",
    description: "test descriptions lorem ipsum",
    attachements: [],
    requestType: "test_category",
    contact: {
        email: "testuser@example.com",
        name: "TEST",
        number: "12345678"
    },
    openedOn: 20,
    quotStatus: 2,
    quotation: {
        amount: 1500,
        remarks: "test_remarks",
        uri: "test_uri",
        uploadedBy: "test_landlord",
    }
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
          <ViewQuote />
        </MemoryRouter>
      </AuthContext.Provider>
  )

    const titleElement= screen.getByText(/Quotation for #/i);
    expect(titleElement).toBeInTheDocument();
  })

  test('renders mocked data', ()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewQuote />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const ticketId = screen.getByText(/Quotation for #123/i);
    const ticketTitle = screen.getByText(/test_title/);
    const uploadLabel = screen.getByLabelText(/Uploaded by/);
    const uploadField = screen.getByRole("textbox", {name: 'Uploaded by'});
    const amountField = screen.getByText("Total Amount (SGD)");
    const descriptionLabel = screen.getByText(/Description/);
    const descriptionField = screen.getByText("test_remarks");
    const actionLabel = screen.getByText("Action Required");
    const actionExclaimation = screen.getByAltText("exclaimation");
    const acceptButton = screen.getByRole("button", {name: "Accept"});
    const rejectButton = screen.getByRole("button", {name: "Reject"});
    const documentTitle = screen.getByText(/Document View/i);
    const downloadButton = screen.getByRole("button", {name: "Download Quote"});
    
    expect(ticketId).toBeInTheDocument();
    expect(ticketTitle).toBeInTheDocument();
    expect(uploadLabel).toBeInTheDocument();
    expect(uploadField).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(amountField).toBeInTheDocument();
    expect(actionLabel).toBeInTheDocument();
    expect(actionExclaimation).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();
    expect(documentTitle).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();

  })

  test('navigates to /viewDetails when click Back button', ()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewQuote />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const backButton = screen.getByRole("button", {name: 'Back to ticket details'});
    waitFor(()=> fireEvent.click(backButton));

    expect(mockUseNavigate).toBeCalledTimes(1);
    expect(mockUseNavigate).toBeCalledWith('/viewDetails', {"state": {"_id": 123, "attachements": [], "buildingId": "mockBuildingId", "contact": {"email": "testuser@example.com", "name": "TEST", "number": "12345678"}, "description": "test descriptions lorem ipsum", "leaseId": "mockLeaseId", "openedOn": 20, "quotStatus": 2, "quotation": {"amount": 1500, "remarks": "test_remarks", "uploadedBy": "test_landlord", "uri": "test_uri"}, "requestType": "test_category", "status": 1, "title": "test_title", "userId": "mockUserId"}}   );
  })

  test('navigates to /viewDetails when click Accept button', async()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewQuote />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const acceptButton = screen.getByRole("button", {name: 'Accept'});
    expect(acceptButton).toBeInTheDocument();

    waitFor(()=> fireEvent.click(acceptButton));
    await act(async() => {
      Promise.resolve();
    });

    waitFor(()=>expect(mockUseNavigate).toBeCalledTimes(1));
    waitFor(()=>expect(mockUseNavigate).toHaveBeenCalledWith('/viewDetails'));
  })

  test('navigates to /viewDetails when click Reject button', async()=> {
    render(
      <AuthContext.Provider value={mockValue}>
        <MemoryRouter>
          <ViewQuote />
        </MemoryRouter>
      </AuthContext.Provider>
  )
    const rejectButton = screen.getByRole("button", {name: 'Reject'});
    expect(rejectButton).toBeInTheDocument();

    waitFor(()=> fireEvent.click(rejectButton));
    await act(async() => {
      Promise.resolve();
    });

    waitFor(()=>expect(mockUseNavigate).toBeCalledTimes(1));
    waitFor(()=>expect(mockUseNavigate).toHaveBeenCalledWith('/viewDetails'));
  })
})