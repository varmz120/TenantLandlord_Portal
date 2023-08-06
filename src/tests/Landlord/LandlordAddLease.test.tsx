import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
// import { client } from '../../client';
import AddLease from '../../pages/LandlordAddLease';
import exp from 'constants';

// This page of test is for testing landlord dashboard, its navigations and its components
// const appUrl = 'http://localhost:3030';

jest.mock('axios');

// Mocking the navigation
let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Rendering of landlord add lease page', () => {
  let handleClick: jest.Mock;

  // Generate test accounts to access landlord dashboard

  beforeAll(async () => {
  });

  beforeEach(async () => {

    // Reset mockNavigate before each test to clean up previous interactions.
    handleClick = jest.fn();

    mockNavigate.mockReset();
    render(
      <Router>
        <AddLease />
      </Router>
    );
  });


  it('Should renders the page correctly', () => {
    const AddLease = screen.getAllByText('Add Lease');
    expect(AddLease[0]).toBeInTheDocument();
  });

  it('Should renders the form correctly', () => {

    // Form Header
    expect(screen.getByText('Lease Details')).toBeInTheDocument();

    // Form Labels
    expect(screen.getByText('User ID')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Tenant')).toBeInTheDocument();
    expect(screen.getByText('Unit(s)')).toBeInTheDocument();
    expect(screen.getByText('Building ID')).toBeInTheDocument();
    expect(screen.getByText('Monthly Rent')).toBeInTheDocument();
    const AddLease = screen.getAllByText('Add Lease');
    expect(AddLease[1]).toBeInTheDocument();
    expect(screen.getByText('Lease ID')).toBeInTheDocument();
    expect(screen.getByText('Commencement')).toBeInTheDocument();
    expect(screen.getByText('Expiry')).toBeInTheDocument();

    // Form button
    expect(screen.getByRole('button', {name: "Submit"})).toBeInTheDocument();
  });

  describe('Testing the form, it should reject submit if any field is empty', () => {

    // The following four fields couldnt be tested
    //fireEvent.change(screen.getByRole("search-tenant-field"), {target: {value: 'x'}});
    //fireEvent.change(screen.getByTestId("search-bldg-field"), {target: {value: 'x'}});
    //fireEvent.change(screen.getByTestId("commencement-start-field"), {target: {value: 'x'}});
    //fireEvent.change(screen.getByTestId("commencement-end-field"), {target: {value: 'x'}});

    it ('Should reject submit if User ID field is empty',  () => {
      fireEvent.change(screen.getByRole('textbox', {name: "User ID"}), {target: {value: ''}});
      fireEvent.change(screen.getByRole('textbox', {name: "Email"}), {target: {value: 'x@gmail.com'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Unit(s)"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Monthly Rent"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Lease ID"}), {target: {value: 'x'}});
      fireEvent.click(screen.getByRole('button', {name: "Submit"}));

      expect(screen.getByText('Enter a user ID!')).toBeInTheDocument();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it ('Should reject submit if User ID field is empty',  () => {
      fireEvent.change(screen.getByRole('textbox', {name: "User ID"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Email"}), {target: {value: ''}});
      fireEvent.change(screen.getByRole('textbox', {name: "Unit(s)"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Monthly Rent"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Lease ID"}), {target: {value: 'x'}});
      fireEvent.click(screen.getByRole('button', {name: "Submit"}));
      
      expect(screen.getByText('Enter Email Address!')).toBeInTheDocument();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it ('Should reject submit if User ID field is empty',  () => {
      fireEvent.change(screen.getByRole('textbox', {name: "User ID"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Email"}), {target: {value: 'x@gmail.com'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Unit(s)"}), {target: {value: ''}});
      fireEvent.change(screen.getByRole('textbox', {name: "Monthly Rent"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Lease ID"}), {target: {value: 'x'}});
      fireEvent.click(screen.getByRole('button', {name: "Submit"}));
      
      expect(screen.getByText('Enter Unit Address!')).toBeInTheDocument();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it ('Should reject submit if User ID field is empty',  () => {
      fireEvent.change(screen.getByRole('textbox', {name: "User ID"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Email"}), {target: {value: 'x@gmail.com'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Unit(s)"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Monthly Rent"}), {target: {value: ''}});
      fireEvent.change(screen.getByRole('textbox', {name: "Lease ID"}), {target: {value: 'x'}});
      fireEvent.click(screen.getByRole('button', {name: "Submit"}));
      
      expect(screen.getByText('Enter Monthly Rent!')).toBeInTheDocument();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it ('Should reject submit if User ID field is empty',  () => {
      fireEvent.change(screen.getByRole('textbox', {name: "User ID"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Email"}), {target: {value: 'x@gmail.com'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Unit(s)"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Monthly Rent"}), {target: {value: 'x'}});
      fireEvent.change(screen.getByRole('textbox', {name: "Lease ID"}), {target: {value: ''}});
      fireEvent.click(screen.getByRole('button', {name: "Submit"}));
      
      expect(screen.getByText('Enter Lease ID!')).toBeInTheDocument();
      
      // expect submit to not be called
      expect(handleClick).not.toHaveBeenCalled();
    }); 
  });

  describe('It should render the buttons if clicked', () => {

    it('Should render the create tenant button if clicked', () => {
      fireEvent.click(screen.getByText("+ Create New Tenant"));
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Postal Code")).toBeInTheDocument();
    })

    it('Should render the create building button if clicked', () => {
      fireEvent.click(screen.getByText("+ Add Building"));
      expect(screen.getByText("Building Details")).toBeInTheDocument();
      expect(screen.getByText("Account Details")).toBeInTheDocument();
      expect(screen.getByText("Id")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Request Types")).toBeInTheDocument();
    })

  });


});
