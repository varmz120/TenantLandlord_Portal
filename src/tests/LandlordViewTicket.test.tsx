import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import LandlordViewTicket from '../pages/LandlordViewTicket';

// Mocking the navigation
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

let mockNavigate = jest.fn();

describe('LandlordViewTicket page rendering', () => {
  const mockTicketData = {
    Category: "Maintenance",
    Description: "Dirty ceiling",
    Landlord: "Dora",
    TenantContact: "62353535"
  };
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
  render(
    <Router>
      <LandlordViewTicket />
    </Router>
  );
  });

//Case 1: Ticket status "Opened"
  test('renders correctly when ticket status is "Opened"', () => {
    // Assert that "Category" is displayed with the correct value
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

    // Assert that "Description" is displayed with the correct value
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

    // Assert that "Landlord" is displayed with the correct value
    expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

    // Assert that "Tenant Contact" is displayed with the correct value
    expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

    // Assert that "opened" status is shown
    expect(screen.getByAltText(/Opened/i)).toBeInTheDocument();

    // Assert that "Reject Ticket" button is rendered and functions
    const rejectTicketButton = screen.getByText(/Reject Ticket/i);
    fireEvent.click(rejectTicketButton);
    expect(mockNavigate).toHaveBeenCalledWith('/LandlordDashboard');

    // Assert that "Assign Personnel" button is rendered and disabled
    const assignButton = screen.getByText(/Assign Personnel !/i);
    expect(assignButton).toBeInTheDocument();
    expect(assignButton).toBeDisabled();

    // Assert that "Unassign Personnel" button is rendered and disabled (greyed out)
    const unassignButton = screen.getByText(/Unassign Personnel/i);
    expect(unassignButton).toBeInTheDocument();
    expect(unassignButton).toBeDisabled();
  });

//Case 2: Ticket status "Waiting for Quotation Approval"
  test('renders correctly when ticket status is "Waiting for Quotation Approval"', () => {

    // Assert that "Category" is displayed with the correct value
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

    // Assert that "Description" is displayed with the correct value
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

    // Assert that "Landlord" is displayed with the correct value
    expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

    // Assert that "Tenant Contact" is displayed with the correct value
    expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
    expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

    // Assert that "opened" status is shown
    expect(screen.getByAltText(/Waiting for Quotation Approval/i)).toBeInTheDocument();

    // Assert that "None at this time." action status is rendered
    expect(screen.getByText(/None at this time./i)).toBeInTheDocument();

    // Assert that "Unassign Personnel" button is rendered and disabled (greyed out)
    const unassignButton = screen.getByText(/Unassign Personnel/i);
    expect(unassignButton).toBeInTheDocument();
    expect(unassignButton).toBeDisabled();

    
  });

//Case 3: Ticket status "In Queue"
test('renders correctly when ticket status is "In Queue"', () => {
  
  // Assert that "Category" is displayed with the correct value
  expect(screen.getByText(/Category/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

  // Assert that "Description" is displayed with the correct value
  expect(screen.getByText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

  // Assert that "Landlord" is displayed with the correct value
  expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

  // Assert that "Tenant Contact" is displayed with the correct value
  expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

  // Assert that "In Queue" status is shown
  expect(screen.getByAltText(/In Queue/i)).toBeInTheDocument();

  // Assert that "Upload Quotation" button is rendered
  expect(screen.getByText(/Upload Quotation/i)).toBeInTheDocument();

  // Assert that "Upload Quotation" button is rendered and functions
  const uploadQuotationButton = screen.getByText(/Upload Quotation/i);
  fireEvent.click(uploadQuotationButton);
  expect(mockNavigate).toHaveBeenCalledWith('/LandlordUploadQuotation');
  

  // Assert that "Unassign Personnel" button is rendered and enabled
  const unassignButton = screen.getByText(/Unassign Personnel/i);
  expect(unassignButton).toBeInTheDocument();
  expect(unassignButton).toBeEnabled();
});

//Case 4: Ticket status "In Progress"
test('renders correctly when ticket status is "In Progress"', () => {
  
  // Assert that "Category" is displayed with the correct value
  expect(screen.getByText(/Category/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

  // Assert that "Description" is displayed with the correct value
  expect(screen.getByText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

  // Assert that "Landlord" is displayed with the correct value
  expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

  // Assert that "Tenant Contact" is displayed with the correct value
  expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

  // Assert that "In Progress" status is shown
  expect(screen.getByAltText(/In Progress/i)).toBeInTheDocument();

  // Assert that "Finish Works" button is rendered
  expect(screen.getByText(/Finish Works/i)).toBeInTheDocument();

  // Assert that "Finish Works" button is rendered and functions
  const finishWorksButton = screen.getByText(/Finish Works/i);
  fireEvent.click(finishWorksButton);
  expect(mockNavigate).toHaveBeenCalledWith('/LandlordUploadQuotation');

  // Assert that "Unassign Personnel" button is rendered and disabled (greyed out)
  const unassignButton = screen.getByText(/Unassign Personnel/i);
  expect(unassignButton).toBeInTheDocument();
  expect(unassignButton).toBeDisabled();
});

//Case 5: Ticket status "Pending Completion Approval"
test('renders correctly when ticket status is "Pending Completion Approval"', () => {
 
  // Assert that "Category" is displayed with the correct value
  expect(screen.getByText(/Category/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

  // Assert that "Description" is displayed with the correct value
  expect(screen.getByText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

  // Assert that "Landlord" is displayed with the correct value
  expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

  // Assert that "Tenant Contact" is displayed with the correct value
  expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

  // Assert that "Pending Completion Approval" status is shown
  expect(screen.getByAltText(/Pending Completion Approval/i)).toBeInTheDocument();

  // Assert that "None at this time." action status is rendered
  expect(screen.getByText(/None at this time./i)).toBeInTheDocument();

  // Assert that "Unassign Personnel" button is rendered and disabled (greyed out)
  const unassignButton = screen.getByText(/Unassign Personnel/i);
  expect(unassignButton).toBeInTheDocument();
  expect(unassignButton).toBeDisabled();
});

//Case 6: Ticket status "Rejected"
test('renders correctly when ticket status is "Rejected"', () => {
  
  // Assert that "Category" is displayed with the correct value
  expect(screen.getByText(/Category/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

  // Assert that "Description" is displayed with the correct value
  expect(screen.getByText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

  // Assert that "Landlord" is displayed with the correct value
  expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

  // Assert that "Tenant Contact" is displayed with the correct value
  expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

  // Assert that "Rejected" status is shown
  expect(screen.getByAltText(/Rejected/i)).toBeInTheDocument();

  // Assert that "Reopen Ticket" button is rendered
  expect(screen.getByText(/Reopen Ticket/i)).toBeInTheDocument();

  // Assert that "Reopen Ticket" button is rendered and functions
  const reopenTicketButton = screen.getByText(/Reopen Ticket/i);
  fireEvent.click(reopenTicketButton);
  expect(mockNavigate).toHaveBeenCalledWith('/LandlordDashboard');

  // Assert that "Unassign Personnel" button is rendered and disabled (greyed out)
  const unassignButton = screen.getByText(/Unassign Personnel/i);
  expect(unassignButton).toBeInTheDocument();
  expect(unassignButton).toBeDisabled();
});

//Case 7: Ticket status "Closed"
test('renders correctly when ticket status is "Closed"', () => {
  
  // Assert that "Category" is displayed with the correct value
  expect(screen.getByText(/Category/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Category)).toBeInTheDocument();

  // Assert that "Description" is displayed with the correct value
  expect(screen.getByText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Description)).toBeInTheDocument();

  // Assert that "Landlord" is displayed with the correct value
  expect(screen.getByText(/Landlord/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.Landlord)).toBeInTheDocument();

  // Assert that "Tenant Contact" is displayed with the correct value
  expect(screen.getByText(/Tenant Contact/i)).toBeInTheDocument();
  expect(screen.getByText(mockTicketData.TenantContact)).toBeInTheDocument();

  // Assert that "Closed" status is shown
  expect(screen.getByAltText(/Closed/i)).toBeInTheDocument();

  // Assert that "View Feedback" button is rendered
  expect(screen.getByText(/View Feedback/i)).toBeInTheDocument();

  // Assert that "Reopen Ticket" button is rendered and functions
  const viewFeedbackButton = screen.getByText(/View Feedback/i);
  fireEvent.click(viewFeedbackButton);
  expect(mockNavigate).toHaveBeenCalledWith('/LandlordViewFeedback');

  // Assert that "None at this time." action status is rendered
  expect(screen.getByText(/None at this time./i)).toBeInTheDocument();

  // Assert that "Unassign Personnel" button is rendered and disabled (greyed out)
  const unassignButton = screen.getByText(/Unassign Personnel/i);
  expect(unassignButton).toBeInTheDocument();
  expect(unassignButton).toBeDisabled();
});



  // Add more test cases for different ticket statuses
});
