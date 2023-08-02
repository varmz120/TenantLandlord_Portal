import React, { ChangeEvent, FormEvent, useState } from 'react';
import LineField from '../components/LineField';
import DeleteIcon from '../images/delete.svg';
import AreaField from './AreaField';
import SubmitButton from './SubmitButton';
import { client } from '../client';

interface Props {
  handleDelClick: () => void;
}

const BuildingDetailsForm = ({ handleDelClick }: Props) => {
  const [name, setName] = useState('');
  const [Id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setName(newValue);
    setNameError(newValue.trim() ? '' : 'Name is required');
  };

  const handleAddressChange = (event: ChangeEvent<HTMLDivElement>): void => {
    const newValue = event.target.textContent || '';
    setAddress(newValue);
    setAddressError(newValue.trim() ? '' : 'Address is required');
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setId(newValue);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the fields before submitting the for
    setNameError(name.trim() ? '' : 'Name is required');
    setAddressError(address.trim() ? '' : 'Address is required');

    if (name.trim() && address.trim()) {
      // All fields are filled and postal code is valid, you can proceed with the form submission
      console.log('Form submitted:', { name, address });
      try {
        await client.service('building').create({
          _id: Id,
          name: name,
          address: address,
          requestTypes: [''],
        });
      } catch (error) {
        console.error('Failed to create account', error);
      }

      handleDelClick();
    } else {
      console.log('Please fill in all required fields and correct the errors.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto " onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">Building Details</p>
                <a href="#" onClick={handleDelClick}>
                  <img src={DeleteIcon} alt="" className="w-4" />
                </a>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>
              <LineField
                type={'text'}
                label="Id"
                padding_right="66.5"
                value={Id}
                name=""
                placeholder={''}
                error=""
                disabled={false}
                layout="vertical"
                classnames=""
                onChange={handleIdChange}
              />
              <LineField
                type={'text'}
                label="Name"
                padding_right="66.5"
                value={name}
                name="category"
                placeholder={''}
                error={nameError}
                disabled={false}
                layout="vertical"
                classnames=""
                onChange={handleNameChange}
              />
              <AreaField
                label={'Address'}
                classnames="w-4/5"
                padding_right={'51.25'}
                value={address}
                id="description"
                disabled={false}
                layout="vertical"
                error={addressError}
                placeholder="Please include any additional remarks here."
                onChange={handleAddressChange}
              />

              <div className="flex justify-end">
                <SubmitButton type="submit" label="Submit" handleClick={() => {}} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingDetailsForm;
