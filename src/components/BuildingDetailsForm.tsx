import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import ActionButton from '../components/ActionButton';
import SubmitButton from './SubmitButton';
import AreaField from './AreaField';
import DeleteIcon from '../images/delete.svg';

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

interface Props {
  handleDelClick: () => void;
}

const BuildingDetailsForm = ({ handleDelClick }: Props) => {
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

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
  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setPostalCode(newValue);
  };

  let buildingId;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
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
