import React, { FormEvent, useState } from 'react';
import LineField from '../components/LineField';
import DeleteIcon from '../images/delete.svg';
import SubmitButton from './SubmitButton';

interface Props {
  userType: string;
  handleDelClick: () => void;
}
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

const CreateAccountForm = ({ userType, handleDelClick }: Props) => {
  const [email, setEmail] = useState('');
  const [buildingID, setBuildingID] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setEmail(newValue);
  };

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setBuildingID(newValue);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl ">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">{userType}</p>
                <a href="#" onClick={handleDelClick}>
                  <img src={DeleteIcon} alt="" className="w-4" />
                </a>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>

              <LineField
                type={'text'}
                label="Email"
                padding_right="65.5"
                value={email}
                name="category"
                placeholder={'some email'}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handleEmailChange}
              />
              {(userType === 'Landlord' || userType === 'Service Provider') && (
                <LineField
                  type="text"
                  label="Building ID"
                  padding_right="20"
                  value={buildingID}
                  name="category"
                  placeholder=""
                  error=""
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleBuildingChange}
                />
              )}

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

export default CreateAccountForm;
