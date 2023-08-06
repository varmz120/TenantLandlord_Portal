import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RateTicket from '../pages/RateTicket';
import { AuthContext } from '../contexts/AuthContext';
import { title } from 'process';
import userEvent from '@testing-library/user-event';


// Mock useNavigate
let mockNavigate = jest.fn();
const loginMock = jest.fn(() => {});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

//user_id
describe('RateTicket', () => {
  beforeEach(async() => {
    // Reset mockNavigate before each test to clean up previous interactions.
    mockNavigate.mockReset();

    // eslint-disable-next-line
    render(
        <MemoryRouter>
                <RateTicket/>
        </MemoryRouter>);
    })
  
  test('renders without crashing', () => {
    const titleElement = screen.getByText(/Service Ticket/i);
    const promptQn = screen.getByText(/Do you wish to close the ticket and confirm completion of service?/);
    expect(titleElement).toBeInTheDocument();
    expect(promptQn).toBeInTheDocument();
  })

  test('click on yes for close ticket form', () => {
    const yesButton = screen.getByRole("button", {name: "Yes"});
    waitFor(()=> userEvent.click(yesButton));

    const ratingLabel = screen.getByText(/Rating/);
    const starButtons = screen.getAllByText("★");
    const remarksLabel = screen.getByText(/Additional Remarks/);
    const remarksInput = screen.getByPlaceholderText("Please include any additional remarks here.");
    const acknowledgementLabel = screen.getByText(/Acknowledgement of T&C/);
    const acknowledgementCheck = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", {name: "Submit"});

    starButtons.forEach(star =>{
        expect(star).toBeInTheDocument();
    });
    expect(ratingLabel).toBeInTheDocument();
    expect(remarksLabel).toBeInTheDocument();
    expect(remarksInput).toBeInTheDocument();
    expect(acknowledgementLabel).toBeInTheDocument();
    expect(acknowledgementCheck).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })

  test('submit close ticket form', () => {
    const yesButton = screen.getByRole("button", {name: "Yes"});
    waitFor(()=> userEvent.click(yesButton));

    const starButtons = screen.getAllByText("★");
    const remarksInput = screen.getByPlaceholderText("Please include any additional remarks here.");
    const acknowledgementCheck = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", {name: "Submit"});

    waitFor(()=> userEvent.click(starButtons[2]));
    waitFor(()=> userEvent.type(remarksInput, "MOCK"));
    waitFor(()=> userEvent.click(acknowledgementCheck));

    expect(starButtons[2]).toHaveValue(3);
    expect(remarksInput).toHaveValue("Mock");
    expect(acknowledgementCheck).toHaveValue("true");
    
    console.log(screen.debug());

    starButtons.forEach(star =>{
        expect(star).toBeInTheDocument();
    });
  })

  test('click on no for reopen ticket form', () => {
    const noButton = screen.getByRole("button", {name: "No"});
    waitFor(()=> userEvent.click(noButton));

    const remarksLabel = screen.getByText(/Reasons for reopening of service ticket/);
    const remarksInput = screen.getByPlaceholderText("Please include any additional remarks here.");
    const fileInput = screen.getByText(/! Click to upload/);
    const acknowledgementLabel = screen.getByText(/Acknowledgement of T&C/);
    const acknowledgementCheck = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", {name: "Submit"});

    expect(remarksLabel).toBeInTheDocument();
    expect(remarksInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(acknowledgementLabel).toBeInTheDocument();
    expect(acknowledgementCheck).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })

});