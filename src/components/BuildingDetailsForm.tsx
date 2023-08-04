import React, { ChangeEvent, FormEvent, useState } from 'react';
import LineField from '../components/LineField';
import AreaField from './AreaField';
import SubmitButton from './SubmitButton';

import { client } from '../client';

interface Props {
  handleDelete: () => void;
}

const BuildingDetailsForm = ({ handleDelete }: Props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the fields before submitting the form
    setNameError(name.trim() ? '' : 'Name is required');
    setAddressError(address.trim() ? '' : 'Address is required');

    if (name.trim() && address.trim()) {
      // All fields are filled and postal code is valid, you can proceed with the form submission
      // const buildingForm = new FormData();
      // buildingForm.set('_id', "turfw"); // Change this
      // buildingForm.set('name', name);
      // buildingForm.set('address', address);
      // buildingForm.set('requestTypes', []);

      const buildingData = {
        _id: "testMOOT",
        name: name,
        address: address,
        requestTypes: []
      }
      
      await client.service('building').create(buildingData);
      
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
                <button type="button" value="close" onClick={handleDelete} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>
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
                classnames="w-3/5"
                onChange={handleNameChange}
              />
              <AreaField
                label={'Address'}
                classnames="w-5/7"
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
                <SubmitButton type="submit" label="Submit" handleClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingDetailsForm;
