import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import ServProvDashboard from '../pages/ServProvDashboard';

// Mocking the navigation
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mocking the images
jest.mock('../images/filter_icon.svg', () => 'filterIcon');

describe('Rendering of service provider dashboard', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
    render(
      <Router>
        <ServProvDashboard />
      </Router>
    );
  });

  it('Should render the service provider dashboard correctly', () => {
    // Check if necessary elements are present
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    expect(screen.getByText('Select All')).toBeInTheDocument();
  });

  it('Should render the table headers correctly', () => {
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells[1]).toHaveTextContent('ID');
    expect(headerCells[2]).toHaveTextContent('Task/Description');
    expect(headerCells[3]).toHaveTextContent('Category');
    expect(headerCells[4]).toHaveTextContent('Personnel Assigned');
    expect(headerCells[5]).toHaveTextContent('Date');
    expect(headerCells[6]).toHaveTextContent('Status');
  });

  it('Should render the table filters correctly when filter icon is clicked', () => {
    const filterButton = screen.getByAltText('Filter');
    fireEvent.click(filterButton);

    expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Item')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Personnel Assigned')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Status')).toBeInTheDocument();
  });

  it('Should call handleClearFilters when "Clear Filters" button is clicked', async () => {
    // Mock a search input value
    const input = screen.getByPlaceholderText('Search ID');
    fireEvent.change(input, { target: { value: '56' } });

    // Check if the input value has changed
    await waitFor(() => {
      expect(input).toHaveValue('56');
    });

    // Click "Clear Filters" button
    fireEvent.click(screen.getByText('Clear Filters'));

    // Check if the input value is cleared
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });
  });

  // it('Should navigate to "Home" when "Home" link is clicked', () => {
  //   const homeLink = screen.getByText(/Home/i);
  //   fireEvent.click(homeLink);
  //   expect(mockNavigate).toHaveBeenCalledWith('/ServProvDashboard');
  // });

  // it('Should navigate to "Notifications" when "Notifications" link is clicked', () => {
  //   const notificationsLink = screen.getByText(/Notifications/i);
  //   fireEvent.click(notificationsLink);
  //   expect(mockNavigate).toHaveBeenCalledWith('/Notification');
  // });

});