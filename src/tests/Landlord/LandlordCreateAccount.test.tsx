import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import LandlordDashboard from '../../pages/LandlordDashboard';
import axios from 'axios';
import AccountCreation from '../../pages/LandlordAccountCreation';
import exp from 'constants';

// This page of test is for testing landlord dashboard, its navigations and its components
// const appUrl = 'http://localhost:3030';

// Mocking the navigation
jest.mock('../../client', () => ({
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
      if (serviceName === 'users') {
        return {
          create: () => Promise.resolve(),
          find: () => Promise.resolve(),
        };
      }
      return () => Promise.resolve(); // You can modify this based on your requirements.
    },
    get2FA: (loginDetails) => {
      return Promise.resolve();
    },
  },
}));

let mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mocking the images
jest.mock('../../images/trash_bin_icon.svg', () => 'trashBinIcon');
jest.mock('../../images/add_service_provider_icon.svg', () => 'addServiceProviderIcon');
jest.mock('../../images/filter_icon.svg', () => 'filterIcon');
jest.mock('../../images/pencil_edit_icon.svg', () => 'pencilEditIcon');

describe('Rendering of create account dashboard', () => {
  let handleClick: jest.Mock;

  const testAdminUser = {
    _id: 'admin',
    typ: 3,
    email: 'admin@test.com',
    password: 'supersecret',
  };

  // Get auth
  const testLandlordUser = {
    _id: 'landlord',
    typ: 2,
    email: 'landlord@test.com',
    password: 'password',
  };

  // Mock ticket data
  const testTicket = {
    leaseId: 'LeaseID',
    title: 'Title',
    description: 'Description',
    requestType: 'Cleaning',
    contact: {
      name: 'Name',
      email: 'email@test.com',
      number: '38789367',
    },
    attachements: [],
    personnelAssigned: 'Personnel',
    openedOn: new Date(),
    status: 'Open',
  };

  const tableData = {
    ID: testTicket.leaseId,
    Item: testTicket.title,
    Category: testTicket.requestType,
    PersonnelAssigned: testTicket.personnelAssigned ?? 'None',
    Date: new Date(testTicket.openedOn).toLocaleDateString(),
    Status: testTicket.status,
  };

  // Generate test accounts to access landlord dashboard

  beforeAll(async () => {});

  beforeEach(async () => {
    // I do not know how to login from test.

    // Create Landlord account
    // await client.service('users').create(testLandlordUser, { user: testAdminUser });

    // Login as Landlord

    // console.log(await client.get2FA({
    //   strategy: 'local',
    //   ...testLandlordUser,
    // }));

    // Reset mockNavigate before each test to clean up previous interactions.
    handleClick = jest.fn();

    mockNavigate.mockReset();
    render(
      <Router>
        <AccountCreation />
      </Router>
    );
  });

  it('Should renders the landlord navbar correctly', () => {
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Add Service')).toBeInTheDocument();
    expect(screen.getByText('Add Lease')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument(); // Because I cannot login LOL
  });

  it('Should renders the account chooser correctly', () => {
    expect(screen.getByText('Accounts')).toBeInTheDocument(); // Main page header
    expect(screen.getByText('Tenants')).toBeInTheDocument();
    expect(screen.getByText('Service Providers')).toBeInTheDocument();
  });

  it('Should renders the table functions correctly', () => {
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    expect(screen.getByText('Select All')).toBeInTheDocument();
  });

  it('Should renders the table header for Tenant Account tables correctly', () => {
    const button_Tenants = screen.getByText('Tenants');
    expect(button_Tenants).toBeInTheDocument();
    fireEvent.click(button_Tenants);

    const ID_text = screen.getAllByText('ID'); // Cause table header and filter table header use same text
    const Email_text = screen.getAllByText('Email'); // Cause table header and filter table header use same text
    const LeaseID_text = screen.getAllByText('Lease ID'); // Cause table header and filter table header use same text
    const Actions_text = screen.getAllByText('Actions'); // Cause table header and filter table header use same text

    expect(ID_text[0]).toBeInTheDocument();
    expect(Email_text[0]).toBeInTheDocument();
    expect(LeaseID_text[0]).toBeInTheDocument();
    expect(Actions_text[0]).toBeInTheDocument();
  });

  // it('Should renders and click the table filter for Tenant Account tables correctly', () => {
  //   // This doesnt work
  //   const button_Tenants = screen.getAllByAltText('?');
  //   expect(button_Tenants[0]).toBeInTheDocument();
  //   fireEvent.click(button_Tenants[0]);

  //   const buttons = screen.getByAltText('Filter');
  //   // because the filter doesn't have alt text 'filter
  //   fireEvent.click(buttons); // Clicks the first button (filter)

  //   expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Search Email')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Search LeaseID')).toBeInTheDocument();
  // });

  it('Should renders the table header for Servic Providers Account tables correctly', () => {
    const button_SP = screen.getByText('Service Providers');
    expect(button_SP).toBeInTheDocument();
    fireEvent.click(button_SP);

    const ID_text = screen.getAllByText('ID'); // Cause table header and filter table header use same text
    const Email_text = screen.getAllByText('Email'); // Cause table header and filter table header use same text
    const BuildingID_text = screen.getAllByText('Building ID'); // Cause table header and filter table header use same text
    const Actions_text = screen.getAllByText('Actions'); // Cause table header and filter table header use same text

    expect(ID_text[0]).toBeInTheDocument();
    expect(Email_text[0]).toBeInTheDocument();
    expect(BuildingID_text[0]).toBeInTheDocument();
    expect(Actions_text[0]).toBeInTheDocument();
  });

  // it('Should renders and click the table filter for Service Provides tables correctly', () => {
  //   // This doesnt work
  //   const button_SP = screen.getByText('Service Providers');
  //   expect(button_SP).toBeInTheDocument();
  //   fireEvent.click(button_SP);

  //   const buttons = screen.getByAltText('Filter');
  //   //because there is no filter img by alt text 'Filter'
  //   fireEvent.click(buttons); // Clicks the first button (filter)

  //   expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Search Email')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText('Search BuildingID')).toBeInTheDocument();
  // });

  // it('Should renders and click the table delete row button correctly', () => {
  //   // This function in actual implementation doesnt work , to rewrite test
  //   const buttons = screen.getByAltText('Delete Button');
  //   expect(buttons).toBeInTheDocument();
  //   fireEvent.click(buttons);
  //   expect(handleClick).toHaveBeenCalledTimes(1); // Cannot click?
  // });

  // it('calls handleClearFilters on button click', async () => {
  //   const input = screen.getByPlaceholderText('Search ID');
  //   fireEvent.change(input, { target: { value: '56' } });
  //   await waitFor(() => {
  //     expect(input).toHaveValue('56');
  //   });
  //   fireEvent.click(screen.getByText('Clear Filters'));
  //   await waitFor(() => {
  //     expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
  //   });
  // });

  // TODO: Need to pass in data to test this ========================================
  // test('checks and unchecks a checkbox', async () => {

  //   const checkbox = screen.getAllByRole('checkbox')[1]; // Selecting the first row checkbox
  //   expect(checkbox).not.toBeChecked();
  //   fireEvent.click(checkbox);
  //   await waitFor(() => {
  //     expect(checkbox).toBeChecked();
  //   });
  //   fireEvent.click(checkbox);
  //   await waitFor(() => {
  //     expect(checkbox).not.toBeChecked();
  //   });
  // });

  // test('selects and deselects all checkboxes', async () => {
  //   const checkboxes = screen.getAllByRole('checkbox');
  //   const selectAllCheckbox = checkboxes[0];
  //   expect(selectAllCheckbox).not.toBeChecked();
  //   fireEvent.click(selectAllCheckbox);
  //   await waitFor(() => {
  //     checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
  //   });
  //   fireEvent.click(selectAllCheckbox);
  //   await waitFor(() => {
  //     checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  //   });
  // });

  // TODO:
  //   test('deletes a row', async () => {
  //     // Assuming that initial data contains a row with ID: 56
  //     expect(screen.getByText('56')).toBeInTheDocument();
  //     const checkbox = screen.getAllByRole('checkbox')[1];
  //     fireEvent.click(checkbox);
  //     // fireEvent.click(screen.getByAltText('?'));
  //     await waitFor(() => {
  //       expect(screen.queryByText('56')).not.toBeInTheDocument();
  //     });
  //   });

  // test('filters the table', async () => {
  //   // Assuming that initial data contains a row with Email: 'logan@example.com'
  //   expect(screen.getByText('logan@example.com')).toBeInTheDocument();
  //   userEvent.type(screen.getByPlaceholderText('Search Email'), 'logan@example.com');
  //   await waitFor(() => {
  //     expect(screen.getByText('logan@example.com')).toBeInTheDocument();
  //     // Assuming that initial data contains a row with Email: 'james@example.com'
  //     expect(screen.queryByText('james@example.com')).not.toBeInTheDocument();
  //   });
  // });

  describe('Navigations from Landlord Create Account', () => {
    it('Should navigate to create account page', () => {
      const buttons = screen.getByText('Create Account');
      fireEvent.click(buttons);
      expect(mockNavigate).toHaveBeenCalledWith('/LandlordAccountCreation');
    });

    it('Should navigate to add service page', () => {
      const buttons = screen.getByText('Add Service');
      fireEvent.click(buttons);
      expect(mockNavigate).toHaveBeenCalledWith('/LandlordAddService');
    });

    it('Should navigate to add lease page', () => {
      const buttons = screen.getByText('Add Lease');
      fireEvent.click(buttons);
      expect(mockNavigate).toHaveBeenCalledWith('/LandlordAddLease');
    });

    it('Should navigate to home page', () => {
      const buttons = screen.getByText('Home');
      fireEvent.click(buttons);
      expect(mockNavigate).toHaveBeenCalledWith('/LandlordDashboard');
    });

    it('Should navigate to notifications page', () => {
      const notificationLink = screen.getByText('Notifications');
      expect(notificationLink).toBeInTheDocument();
      expect(notificationLink.getAttribute('href')).toBe('/notification');
    });

    it('Should navigate to login page', () => {
      const buttons = screen.getByText('Log In');
      fireEvent.click(buttons);
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  // TODO : Test navigation to modify accounts
});
