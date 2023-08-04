import React, {  FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LineField from '../components/LineField';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { client } from '../client';

const AccountCreation = () => {
  const navigate = useNavigate();

  const [userId] = useState('');

  const [email, setEmail] = useState('');
  const [buildingID, setBuildingID] = useState('');
  const [emailError, setEmailError] = useState('');
  const [buildingIDError, setBuildingIDError] = useState('');
  
  const handleAccountCreate = async () => {
    try {
      await client.service('users').create({
        _id: userId,
        typ: 1,
        email: email,
        buildingId: buildingID,
      });
    } catch (error) {
      console.error('Failed to create account', error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setEmail(newValue);

    // Validate the email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailError(emailRegex.test(newValue) ? '' : 'Invalid email format');
  };

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setBuildingID(newValue);
    setBuildingIDError(newValue.trim() ? '' : 'Building ID is required');
  };


  const handleBack = () => {
    navigate('/LandlordDashboard');
  };

  
  return (
    <>
      <div className="flex flex-col h-screen bg-[#ECEDED]">
        <LandlordNavbar />
        <BackButton type="button" label={'home'} handleClick={handleBack} />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col text-left">
            <div className="flex flex-row justify-start">
              <p className="text-headerText text-[#2E424D] pb-5 text-2xl font-medium">
                Account Creation
              </p>
            </div>
            <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
              <form className="space-y-4 mx-auto w-fit bg-white"  onSubmit={(event) => {
            event.preventDefault();
            handleAccountCreate();
          }}>
                <p className="text-lg text-left font-medium">Service Provider Details</p>
                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                <LineField
                  type={'text'}
                  label="Email"
                  padding_right="85"
                  value={email}
                  name="formEmail"
                  placeholder={'enter email'}
                  error={emailError}
                  disabled={false}
                  layout=""
                  classnames="w-3/5"
                  onChange={handleEmailChange}
                />
                <LineField
                  type={'text'}
                  label="Building ID"
                  padding_right="45"
                  value={buildingID}
                  name="formBldgID"
                  placeholder={'enter building id'}
                  error={buildingIDError}
                  disabled={false}
                  layout=""
                  classnames="w-3/5"
                  onChange={handleBuildingChange}
                />
                <div className="flex justify-end">
                  <SubmitButton type="submit" label={'Submit'} handleClick={() => {}} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCreation;
