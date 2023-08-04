import React, { FormEvent, useState } from 'react';
import LineField from '../components/LineField';
import SubmitButton from './SubmitButton';

import DeleteIcon from '../images/delete.svg';
import { userValidator } from '../esc-backend/src/services/users/users.schema';
import { client } from '../client';

interface Props {
  handleDelete: () => void
}

const TenantDetails = ({ handleDelete }: Props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // const handleCreateTenant =async () => {
  //   try {
  //     await client.service('users').create({
  //       _id: userId
  //       typ: 0
  //       email: email
  //     })
  //   }
  // }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setName(newValue);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setAddress(newValue);
  };

  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setPostalCode(newValue);
  };

  
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // const tenantForm = new FormData();
  // tenantForm.set('_id', "rando"); // Change this
  // tenantForm.set('name', name);
  // tenantForm.set('address', address.concat(' ', postalCode));
  // tenantForm.set('leases', JSON.stringify([]));

  const tenantData = {
    _id: "testMOOT",
    name: name,
    address: address.concat(' ', postalCode),
    leases: []
  }

  await client.service('tenants').create(tenantData);
};

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl ">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">Tenant Details</p>
                <button type="button" value="close" onClick={handleDelete} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>

              <LineField
                type={'text'}
                label="Name"
                padding_right="105"
                value={name}
                name="name"
                placeholder={'name'}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handleNameChange}
              />

              <LineField
                type={'text'}
                label="Address"
                padding_right="90"
                value={address}
                name="address"
                placeholder={'address'}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handleAddressChange}
              />

              <LineField
                type={'text'}
                label="Postal Code"
                padding_right="62"
                value={postalCode}
                name="postal code"
                placeholder={'postal code'}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handlePostalCodeChange}
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

export default TenantDetails;
