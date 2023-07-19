import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import ActionButton from '../components/ActionButton';
import SubmitButton from './SubmitButton';
import DeleteIcon from '../images/delete.svg';

interface Props {
  handleDelClick: () => void;
}
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

const TenantDetails = ({ handleDelClick }: Props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);

  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setFirstView(false);
    if ('name' in event.target) {
      let closed = false;
      if (event.target.name === 'accept') {
        closed = true;
      }
      setClosed(closed);
    }
  };
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
                <a href="#" onClick={handleDelClick}>
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