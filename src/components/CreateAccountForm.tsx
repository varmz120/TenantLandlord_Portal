import React, { FormEvent, useContext, useEffect, useState } from 'react';
import LineField from '../components/LineField';
import DeleteIcon from '../images/delete.svg';
import SubmitButton from './SubmitButton';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface Props {
  userType: string;
  handleDelClick: () => void;
}

const CreateAccountForm = ({ userType, handleDelClick }: Props) => {
  const { user } = useContext(AuthContext);
  type FeathersError = {
    code?: number;
    message?: string;
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [buildingID, setBuildingID] = useState('');
  const [leaseID, setLeaseID] = useState('');
  const [emailError, setEmailError] = useState('');
  const [buildingIDError, setBuildingIDError] = useState('');
  const [userIDError, setUserIDError] = useState('');
  const [leaseIDError, setLeaseIDError] = useState('');

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
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserIDError('');
    const newValue = event.target.value;
    setUserId(newValue);
  };
  const handleLeaseIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setLeaseID(newValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errored = false;
    // Validate the fields before submitting the form
    if (!emailError) {
      setEmailError(email.trim() ? '' : 'Email is required');
      errored ||= email.trim() === '';
    }
    if (userType === 'Landlord' || userType === 'Service Provider') {
      console.log('come on why is not working');
      setBuildingIDError(buildingID !== '' ? '' : 'Building ID is required');
      errored ||= buildingID === '';
      console.log(buildingIDError);
    }

    if (!errored) {
      // All fields are filled and email format is valid, you can proceed with the form submission
      console.log('Form submitted:', { email, buildingID });
      if (userType === 'Landlord') {
        try {
          await client.service('users').create({
            _id: userId,
            typ: 2,
            email: email,
            buildingId: user?.typ == 2 ? user.buildingId : buildingID,
          });
          handleDelClick();
        } catch (error) {
          console.error('Failed to create account', error);
          const feathersError = error as FeathersError;
          if (
            feathersError?.code === 11000 ||
            feathersError?.message?.includes('duplicate key error collection')
          ) {
            setUserIDError('ID already exists');
          } else {
            setUserIDError('');
          }
        }
      }

      if (userType === 'Service Provider') {
        try {
          await client.service('users').create({
            _id: userId,
            typ: 1,
            email: email,
            buildingId: buildingID,
          });
          handleDelClick();
        } catch (error) {
          console.error('Failed to create account', error);
          const feathersError = error as FeathersError;
          if (
            feathersError?.code === 11000 ||
            feathersError?.message?.includes('duplicate key error collection')
          ) {
            setUserIDError('ID already exists');
          } else {
            setUserIDError('');
          }
        }
      }

      if (userType === 'Admin') {
        try {
          await client.service('users').create({
            _id: userId,
            typ: 3,
            email: email,
            buildingId: buildingID,
          });
          handleDelClick();
        } catch (error) {
          console.error('Failed to create account', error);
          const feathersError = error as FeathersError;
          if (
            feathersError?.code === 11000 ||
            feathersError?.message?.includes('duplicate key error collection')
          ) {
            setUserIDError('ID already exists');
          } else {
            setUserIDError('');
          }
        }
      }
      if (userType === 'Tenant') {
        try {
          await client.service('users').create({
            _id: userId,
            typ: 0,
            email: email,
            leaseId: leaseID,
            buildingId: buildingID,
          });
          handleDelClick();
        } catch (error) {
          console.error('Failed to create account', error);
          const feathersError = error as FeathersError;
          if (
            feathersError?.code === 11000 ||
            feathersError?.message?.includes('duplicate key error collection')
          ) {
            setUserIDError('ID already exists');
          } else {
            setUserIDError('');
          }
        }
      }
    } else {
      console.log('Please fill in all required fields and correct the errors.');
    }
  };

  useEffect(() => {
    if (user?.typ == 2) {
      setBuildingID(user.buildingId ?? '');
    }
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl ">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto " onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">{userType}</p>
                <a href="#/" onClick={handleDelClick}>
                  <img src={DeleteIcon} alt="" className="w-4" />
                </a>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>

              <LineField
                type={'text'}
                label="UserId"
                padding_right="65.5"
                value={userId}
                name="category"
                placeholder={''}
                error={userIDError}
                disabled={false}
                layout="vertical"
                classnames=""
                onChange={handleUserChange}
              />

              <LineField
                type={'text'}
                label="Email"
                padding_right="65.5"
                value={email}
                name="category"
                placeholder={''}
                error={emailError}
                disabled={false}
                layout="vertical"
                classnames=""
                onChange={handleEmailChange}
              />
              {userType === 'Landlord' || userType === 'Service Provider' || userType === 'Tenant'  ? (
                <LineField
                  type="text"
                  label="Building ID"
                  padding_right="20"
                  value={buildingID}
                  name="category"
                  placeholder=""
                  error={buildingIDError}
                  disabled={user?.typ == 2 ? true : false}
                  layout="vertical"
                  classnames=""
                  onChange={handleBuildingChange}
                />
              ) : null}
              {userType === 'Tenant' ? (
                <LineField
                  type="text"
                  label="LeaseID"
                  padding_right="20"
                  value={leaseID}
                  name="leaseID"
                  placeholder=""
                  error={leaseIDError}
                  disabled={false}
                  layout="vertical"
                  classnames=""
                  onChange={handleLeaseIdChange}
                />
              ) : null}

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

export default CreateAccountForm;
