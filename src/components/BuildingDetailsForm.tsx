import React, { FormEvent, useState } from 'react';
import LineField from '../components/LineField';
import DeleteIcon from '../images/delete.svg';
import AreaField from './AreaField';
import SubmitButton from './SubmitButton';

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

interface Props {
  handleDelClick: () => void;
}

const BuildingDetailsForm = ({ handleDelClick }: Props) => {
  const [name, setName] = useState('');
  const [address] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setName(newValue);
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setPostalCode(newValue);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">Building Details</p>
                <a href="/Buildings" onClick={handleDelClick}>
                  <img src={DeleteIcon} alt="" className="w-4" />
                </a>
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
                error={''}
                disabled={false}
                layout=""
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
                layout=""
                error={''}
                placeholder="Please inclue any additional remarks here."
                onChange={() => null}
              />
              <LineField
                type={'text'}
                label="Postal Code"
                padding_right="20"
                value={postalCode}
                name="category"
                placeholder={''}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handlePostalChange}
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
