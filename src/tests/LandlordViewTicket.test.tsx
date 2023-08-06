import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import LandlordViewTicket from '../pages/LandlordViewTicket';
import { MockAuthProvider } from './mockAdmin';
// Mocking the navigation
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));

let mockNavigate = jest.fn();

describe('LandlordViewTicket page rendering', () => {
  const mockTicketData = {
    Category: 'Maintenance',
    Description: 'Dirty ceiling',
    Landlord: 'Dora',
    TenantContact: '62353535',
  };

  //Case 1: Ticket status "Opened"
  it('renders correctly when ticket status is "Opened"', () => {
    render(
      <MockAuthProvider>
        <LandlordViewTicket />
      </MockAuthProvider>
    );

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

    // Assert that "Reject Ticket" button is rendered
    expect(screen.getByText(/Reject Ticket/i)).toBeInTheDocument();

    test('calls navigation function on Reject Ticket click', () => {
      const rejectButton = screen.getByText(/Reject Ticket/i);
      fireEvent.click(rejectButton);

      expect(mockNavigate).toHaveBeenCalledWith('/LandlordDashboard');
    });

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
  it('renders correctly when ticket status is "Waiting for Quotation Approval"', () => {
    render(<LandlordViewTicket />);

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
  it('renders correctly when ticket status is "In Queue"', () => {
    render(<LandlordViewTicket />);

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

  // Add more test cases for different ticket statuses
});
