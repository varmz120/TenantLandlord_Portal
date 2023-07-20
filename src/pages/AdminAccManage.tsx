import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import ActionButton from '../components/ActionButton';
import deleteIcon from '../images/delete.svg';
import pencilIcon from '../images/pencil_edit_icon.svg';
import BackArrowIcon from '../images/back_arrow_icon.svg';

const AdminAccManage = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state.email);
  const [BuildingID, setBuildingID] = useState(location.state.BuildingID);
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);

  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});
  const [userType, setUserType] = useState(location.state.userType);

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
      <div className="flex items-center ml-5 mt-5">
        <img src={BackArrowIcon}></img>
        <p className="ml-5 text-xl">Back to Panel</p>
      </div>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-col text-left">
          <div className="flex flex-row justify-start">
            <p className="text-headerText pb-5 text-2xl font-medium">Account Management</p>
          </div>
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <p className="text-lg text-left font-medium">{userType}</p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>
              <LineField
                type={'text'}
                label="Email"
                padding_right="65.5"
                value={email}
                name="category"
                placeholder={''}
                error={''}
                disabled={true}
                layout=""
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
                  error=""
                  disabled={true}
                  layout=""
                  classnames=""
                  onChange={handleBuildingChange}
                />
              )}

              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Controls</p>
              <div className="inline-flex">
                <div className="flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer w-24">
                  <img className="mr-2" src={pencilIcon} />
                  <p>Edit</p>
                </div>
                <div className="flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer w-24">
                  <img className="mr-2" src={deleteIcon} />
                  <p>Delete</p>
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
