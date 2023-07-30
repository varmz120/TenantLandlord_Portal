import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordResetOne = () => {
  //creating variable for navigation
  const navigate = useNavigate();

  // Creating state variables for email
  const [email, setEmail] = useState('');

  // Event handler for change in email field
  const handleEmailFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // Event handler for clicking password reset button
  const handlePasswordReset = () => {
    navigate('/reset2FA');
  };

  // Event handler for clicking on back button
  const handlePageBack = () => {
    navigate('/');
  };

  return (
    //first div sets background
    <div className="bg-content flex flex-col h-screen justify-center items-center">
      {/*second div sets the card which houses the form */}
      <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-start">
        {/*password reset form below */}
        <form
          className="flex flex-col justify-start w-full p-4"
          onSubmit={(event) => {
            event.preventDefault();
            handlePasswordReset();
          }}
        >
          <p className="text-5xl my-3 text-headerText">Tenant Portal</p>
          <p className="text-3xl text-start mt-10 mr-1 mb-3 text-headerText">Password Reset</p>
          <p className="text-xs text-start mt-1 mb-3">
            Please enter your email address registered with your account. You will receive an email with instruction on
            how to reset your password.
          </p>

          <input
            className={
              'my-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500'
            }
            value={email}
            onChange={handleEmailFieldChange}
            placeholder="Email address"
          />

          <button type="submit" className="bg-[#335B77] rounded-lg mt-24 h-12 text-2xl font-bold text-white p-1">
            Request Password Reset
          </button>

          <div className="mt-2 text-right bottom-10 right-6 text-sm flex justify-end">
            <button className="font-bold mr-1 text-button" onClick={handlePageBack}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetOne;
