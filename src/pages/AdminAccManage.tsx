import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LineField from '../components/LineField';
import BackArrowIcon from '../images/back_arrow_icon.svg';
import deleteIcon from '../images/delete.svg';
import pencilIcon from '../images/pencil_edit_icon.svg';
import { client } from '../client';
import SuccessRedirect from './SuccessRedirect';

const AdminAccManage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [CannotEdit, setCannotEdit] = useState(true);
  const [email, setEmail] = useState(location.state.email);
  const [leaseId, setLeaseId] = useState(location.state.leaseID);
  const [Id, SetId] = useState(location.state.rowId);
  const [BuildingID, setBuildingID] = useState(location.state.BuildingID);
  const [, setSubmit] = useState(false);
  const [userType] = useState(location.state.userType);
  const [emailError, setEmailError] = useState('');
  const [buildingIDError, setBuildingIDError] = useState('');
  const [LeaseIdError, setLeaseIdError] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setEmail(newValue);
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailError(emailRegex.test(newValue) ? '' : 'Invalid email format');
  };

  const handleLeaseIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setLeaseId(newValue);
    setLeaseIdError(newValue.trim() ? '' : 'Building ID is required');
    
  };

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setBuildingID(newValue);
    setBuildingIDError(newValue.trim() ? '' : 'Building ID is required');
  };

  const handleEdit = (): void => {
    setCannotEdit(false);
  };

  const handleSubmit = async () => {
    // Validate the fields before submitting the form
    if (!emailError) {
      setEmailError(email.trim() ? '' : 'Email is required');
    }

    if (email.trim() && !buildingIDError && !emailError&&!LeaseIdError) { 
      // All fields are filled and email format is valid, you can proceed with the form submission
      setSubmit(true);
      setCannotEdit(true);

      if(userType === "Tenant"){
        try {
          await client.service('users').patch(Id, { email: email, leaseId: leaseId});
        } catch (error) {
          console.error('Failed to delete account', error);
        }

      }
      if(userType === "Landlord"||userType==="Service Provider"){
        try {
          await client.service('users').patch(Id, { email: email, buildingId: BuildingID});
        } catch (error) {
          console.error('Failed to delete account', error);
        }

      }
      if(userType==="Admin"){
        try {
          await client.service('users').patch(Id, { email: email });
        } catch (error) {
          console.error('Failed to delete account', error);
        }


      }

      

      console.log('Form submitted:', { email, BuildingID });
    } else {
      console.log('Please fill in all required fields and correct the errors.');
    }
  };

  const handleBack = () => {
    navigate('/Accounts');
  };

  const handleDelete = async () => {

    try {
      await client.service('users').remove(Id);
    } catch (error) {
      console.error('Failed to delete account', error);
    }


    navigate('/Accounts')

  };

  return (
    <>
      <a href="/Accounts">
        <div className="flex items-center ml-5 mt-5" onClick={handleBack}>
          <img src={BackArrowIcon} alt="back arrow"></img>
          <p className="ml-5 text-xl">Back to all accounts</p>
        </div>
      </a>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-col text-left">
          <div className="flex flex-row justify-start">
            <p className="text-headerText pb-5 text-2xl font-medium">Account Management</p>
          </div>
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <p className="text-lg text-left font-medium">{userType} Account Details </p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>

              <LineField
                type={'text'}
                label="Email"
                padding_right="65.5"
                value={email}
                name="category"
                placeholder={''}
                error={emailError}
                disabled={CannotEdit}
                layout="vertical"
                classnames=""
                onChange={handleEmailChange}
              />
              {userType !== 'Admin' && userType !== 'Tenant' && (
                <LineField
                  type="text"
                  label="Building ID"
                  padding_right="20"
                  value={BuildingID}
                  name="category"
                  placeholder=""
                  error={buildingIDError}
                  disabled={CannotEdit}
                  layout="vertical"
                  classnames=""
                  onChange={handleBuildingChange}
                />
              )}
              {userType === 'Tenant'  && (
                <LineField
                  type="text"
                  label="Lease ID"
                  padding_right="20"
                  value={leaseId}
                  name="category"
                  placeholder=""
                  error={LeaseIdError}
                  disabled={CannotEdit}
                  layout="vertical"
                  classnames=""
                  onChange={handleLeaseIdChange}
                />
              )}

              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Controls</p>
              <div className="inline-flex">
                <div
                  className={`flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer w-24 ${
                    CannotEdit ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={handleEdit}
                >
                  <img className="mr-2" alt="pencil icon" src={pencilIcon} />
                  <p>Edit</p>
                </div>
                <div
                  className={`flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer w-24 ${
                    CannotEdit ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={handleDelete}
                >
                  <img className="mr-2" alt="trashbin icon" src={deleteIcon} />
                  <p>Delete</p>
                </div>
                <div
                  className={`flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer w-24 ${
                    CannotEdit ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={handleSubmit}
                >
                  <p>Confirm</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAccManage;
