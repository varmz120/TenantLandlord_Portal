import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import LandlordViewFeedback from '../pages/LandlordViewFeedback';

jest.mock('../client', () => ({
  client: {
    service: (serviceName) => {
      if (serviceName === 'users') {
        return {
          find: () => Promise.resolve([]),
        };
      }
      if (serviceName === 'building') {
        return {
          get: () => {return ('Test Address')},
        };
      }
      if (serviceName === 'lease') {
        return {
          get: () => Promise.resolve({ units: [{ buildingId: 'building123', number: '101' }] }),
        };
      }
    },
  },
}));

const mockValue = {
  user: {
    typ: 2,
    buildingId: 'building123',
  },
};

const mockTicket = {
  _id: '123',
  title: 'Test Ticket Title',
  feedback: {
    rating: 4,
    description: 'Test remarks',
  },
  completedOn: '2023-08-07T00:00:00.000Z',
};

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: mockTicket,
  }),
}));

describe('<LandlordViewFeedback />', () => {
  it('renders the feedback details', async () => {
    render(
      <AuthContext.Provider value={mockValue}>
        <LandlordViewFeedback />
      </AuthContext.Provider>
    );
    

    // Test the rendering of "Feedback for [correct ticket id]: [correct unit number]"
    expect(screen.getByText('${mockTicket._id}')).toBeInTheDocument();
  });

  it('renders "Rating" and number of stars', () => {
    render(<LandlordViewFeedback/>)
    // Test the rendering of "Rating" and the corresponding number of stars rated
    const stars = screen.getAllByRole('img', { name: 'star' });
    expect(stars).toHaveLength(mockTicket.feedback.rating);
  });

  it('renders "Rating" and number of stars', () => {
    render(<LandlordViewFeedback/>)
    // Test the rendering of "Completed on" [correct completed date]
    expect(screen.getByText('Completed On')).toBeInTheDocument();
    expect(screen.getByText('08/07/2023')).toBeInTheDocument(); // Adjust the date format as needed
  });

  it('renders "Rating" and number of stars', () => {
    render(<LandlordViewFeedback/>)
    // Test the rendering of "Remarks" and the [correct remarks to be displayed]
    expect(screen.getByLabelText('Remarks')).toBeInTheDocument();
    expect(screen.getByText('Test remarks')).toBeInTheDocument();
  });
});
