import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BuildingsTable from '../components/tables/BuildingsTable'; // Adjust this import based on your file structure
import userEvent from '@testing-library/user-event';

// Mocking the navigation
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mocking the images
jest.mock('../images/trash_bin_icon.svg', () => 'trashBinIcon');
jest.mock('../images/add_service_provider_icon.svg', () => 'addServiceProviderIcon');
jest.mock('../images/filter_icon.svg', () => 'filterIcon');
jest.mock('../images/pencil_edit_icon.svg', () => 'pencilEditIcon');

describe('BuildingsTable', () => {
  let handleClick: jest.Mock;

  beforeEach(() => {
    handleClick = jest.fn();
    let mockData=[{ID: "121221", Name: "jol@gmail.com", Address:"Changi"}]
    render(<BuildingsTable clicked={false} handleClick={handleClick} data={mockData}/>);
  });

  test('renders correctly', () => {
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    expect(screen.getByText('Select All')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Email')).toBeInTheDocument();
  });

  test('filter button toggles row visibility', async () => {
    const buttons = screen.getAllByAltText('?'); // cuz all the buttons' alt is ? unfortunately
    fireEvent.click(buttons[0]); // Clicks the first button (filter)
    // fireEvent.click(buttons[1]); // Clicks the second button
    // fireEvent.click(buttons[2]); // Clicks the third button
    expect(screen.getByPlaceholderText('Search ID')).toBeVisible();
    expect(screen.getByPlaceholderText('Search Email')).toBeVisible();
  });

  test('clicks on the add service provider button', () => {
    const buttons = screen.getAllByAltText('?'); // cuz all the buttons' alt is ? unfortunately
    fireEvent.click(buttons[2]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls handleClearFilters on button click', async () => {
    const input = screen.getByPlaceholderText('Search ID');
    fireEvent.change(input, { target: { value: '56' } });
    await waitFor(() => {
      expect(input).toHaveValue('56');
    });
    fireEvent.click(screen.getByText('Clear Filters'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search ID')).toBeInTheDocument();
    });
  });

  test('checks and unchecks a checkbox', async () => {
    const checkbox = screen.getAllByRole('checkbox')[1]; // Selecting the first row checkbox
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test('selects and deselects all checkboxes', async () => {
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    expect(selectAllCheckbox).not.toBeChecked();
    fireEvent.click(selectAllCheckbox);
    await waitFor(() => {
      checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
    });
    fireEvent.click(selectAllCheckbox);
    await waitFor(() => {
      checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
    });
  });

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
});
