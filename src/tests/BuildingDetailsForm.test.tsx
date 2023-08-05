import { render, fireEvent, screen } from '@testing-library/react';
import BuildingDetailsForm from '../components/BuildingDetails';

describe('<BuildingDetailsForm />', () => {
  const handleDelClickMock = jest.fn();
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(<BuildingDetailsForm handleDelClick={handleDelClickMock} />);
    container = result.container;
  });

  it('shows error when name is empty', async () => {
    const nameField = container.querySelector('#Name');
    if (!nameField) throw new Error('Cannot find element with id Name');

    const submitButton = container.querySelector('button[type="submit"]');
    if (!submitButton) throw new Error('Cannot find submit button');

    fireEvent.click(submitButton);
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  it('shows error when address is empty', async () => {
    const nameField = container.querySelector('#Name');
    if (!nameField) throw new Error('Cannot find element with id Name');
    const addressField = container.querySelector('#description');
    if (!addressField) throw new Error('Cannot find element with id description');

    const submitButton = container.querySelector('button[type="submit"]');
    if (!submitButton) throw new Error('Cannot find submit button');

    fireEvent.change(nameField, { target: { value: 'Test Name' } });
    fireEvent.click(submitButton);
    const errorMsg = await screen.findByText('Address is required');

    expect(errorMsg).toBeInTheDocument();
  });
});
