import React, { useContext, useEffect, useState, FormEvent, } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';

const Tenant2FA = () => {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user, } = useContext(AuthContext);

  // Creating state variables for username and password
  const [isSubmit, setSubmit] = useState(false);


  // Creating state variables for authentication
  const [auth, setAuth] = useState('');

  // Event handler for change in authentication code field
  const handleAuthentication = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.value);
  };

  // Event handler for clicking on the verify button
  const handleVerifyClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      if (auth !== null){
        if (user !== null) {
          if (user.typ === 0) {
            setTimeout(() => {
              navigate('/tenantDashboard');
            }, 1000);
          } else if (user.typ === 3) {
            setTimeout(() => {
              navigate('/adminDashboard');
            }, 1000);
          } else {
            setTimeout(() => {
              navigate('/tenantDashboard');
            }, 1000);
          }
        }
      }
      else {
        console.log("Invalid authentication code");
      }
  }
  }, [user, navigate, isSubmit, auth]);

  return (
    //first div sets background
    <div className="bg-content flex flex-col h-screen justify-center items-center">
      {/*second div sets the card which houses the form */}
      <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-start">
        {/*two factor authentication form below */}
        <form
          className="flex flex-col justify-start w-full p-4">
          <p className="text-5xl my-3 text-headerText">Tenant Portal</p>
          <p className="text-3xl text-start mt-10 mr-1 text-headerText">Two-Factor</p>
          <p className="text-3xl text-start mb-1 text-headerText block">Authentication</p>

          <input
            className={
              'my-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500'
            }
            value={auth}
            onChange={handleAuthentication}
            placeholder="Enter authentication code"
          />

          <p className="mb-10"></p>
          <SubmitButton type="button" label="Submit" handleClick={handleVerifyClick} />
        </form>
      </div>
    </div>
  );
};

export default Tenant2FA;