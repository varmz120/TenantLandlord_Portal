import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHome from '../pages/AdminHome';

import buildingsIcon from '../images/buildings_icon.svg';
import buildingsIconDark from '../images/buildings_icon_dark.svg';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AdminHome component', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();
    render(
      <Router>
        <AdminHome />
      </Router>
    );
  });

  test('renders without crashing', () => {});

  test('displays "Administrator Panel" text', () => {
    expect(screen.getByText('Administrator Panel')).toBeInTheDocument();
  });

  test('calls navigation function on Buildings button click', () => {
    const buildingsDiv = screen.getByText(/buildings/i);
    fireEvent.click(buildingsDiv);

    expect(mockNavigate).toHaveBeenCalledWith('/Buildings');
  });

  test('calls navigation function on Accounts button click', () => {
    const accountsDiv = screen.getByText(/accounts/i);
    fireEvent.click(accountsDiv);

    expect(mockNavigate).toHaveBeenCalledWith('/Accounts');
  });

  test('changes Buildings icon on hover', () => {
    const buildingsDiv = screen.getByText(/buildings/i).closest('div');
    let buildingsImage = within(buildingsDiv as HTMLElement).getByRole('img') as HTMLImageElement;
    expect(buildingsImage.src).toContain(buildingsIcon);
    fireEvent.mouseEnter(buildingsDiv as HTMLElement);
    // need to re-query for the image because its src attribute has changed
    buildingsImage = within(buildingsDiv as HTMLElement).getByRole('img') as HTMLImageElement;
    expect(buildingsImage.src).toContain(buildingsIconDark);
    fireEvent.mouseLeave(buildingsDiv as HTMLElement);
    buildingsImage = within(buildingsDiv as HTMLElement).getByRole('img') as HTMLImageElement;
    expect(buildingsImage.src).toContain(buildingsIcon);
  });
});
