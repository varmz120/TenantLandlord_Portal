import React, { FormEvent, useState } from 'react';
import LineField from '../components/LineField';
import SubmitButton from './SubmitButton';
import DeleteIcon from '../images/delete.svg';

interface Props {
  handleDelClick: () => void;
}
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

const TenantDetails = ({ handleDelClick }: Props) => {
  const [, setName] = useState('');
  const [, setAddress] = useState('');
  const [, setPostalCode] = useState('');

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

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl ">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">Tenant Details</p>
                <a href="#/" onClick={handleDelClick}>
                  <img src={DeleteIcon} alt="" className="w-4" />
                </a>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>

              <LineField
                type={'text'}
                label="Name"
                padding_right="105"
                value={'name'}
                name="name"
                placeholder={''}
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
                value={'address'}
                name="address"
                placeholder={''}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handleAddressChange}
              />

              <LineField
                type={'text'}
                label="Postal Code"
                padding_right="65.5"
                value={'postal code'}
                name="postal code"
                placeholder={''}
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
