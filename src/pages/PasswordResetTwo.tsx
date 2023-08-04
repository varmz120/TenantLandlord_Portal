import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';

const PasswordResetOne = () => {
  //creating variable for navigation
  const navigate = useNavigate();

  // Creating state variables for password 1 and password 2
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [userID, setUserID] = useState('');
  const [token, setToken] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordsValid] = useState(true);

  // Event handler for change in password 1 field
  const handlePassword1FieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(event.target.value);
  };

  // Event handler for change in password 1 field
  const handlePassword2FieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value);
  };

  // Event handler for clicking password reset button
  const handlePasswordReset = async () => {
    if (password1 !== password2) {
      setPasswordsMatch(false);
      if (password1.length > 0) {
        setPasswordsValid(true);
      } else {
        setPasswordsValid(false);
        return;
      }
      return; // Exit the function without submitting the form
    } else {
      setPasswordsMatch(true);
    }
    if (password1.length > 0) {
      setPasswordsValid(true);
    } else {
      setPasswordsValid(false);
      return;
    }
    try {
      console.log('here', { user_id: userID, token: token, password: password1 });
      // If the user exists, create a password reset request using their _id
      await client
        .service('reset-password')
        .reset({ user_id: userID, token: token, password: password1 })
        .then(() => {
          navigate('/resetrequestsuccess');
        });
    } catch (error) {
      console.error('Failed to send password reset email', error);
      navigate('/resetrequestfailure');
    }
    navigate('/resetsuccessful'); // if successful, redirects to Password Reset Successful page
  };

  // Event handler for clicking on back button
  const handlePageBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get('user_id');
    const token_param = params.get('token');

    // Set the user_id in the state variable
    if (user_id !== null) {
      setUserID(user_id);
    } else {
      navigate('/resetunsuccessful');
    }

    if (token_param !== null) {
      setToken(token_param);
    }
  });

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
          <p className="text-5xl my-3 text-headerText">Anacle</p>
          <p className="text-3xl text-start mt-10 mr-1 mb-1 text-headerText">Password Reset</p>
          <p className="text-xs text-start mt-1">You are resetting password for</p>
          {/* Need to change the backend to show User ID */}
          <p className="text-xs text-start mb-3 block">{userID}</p>

          <input
            className={
              'my-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500'
            }
            value={password1}
            onChange={handlePassword1FieldChange}
            placeholder="Set new password"
            type="password"
          />

          <input
            className={
              'mt-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500'
            }
            value={password2}
            onChange={handlePassword2FieldChange}
            placeholder="Confirm new password"
            type="password"
          />
          {!passwordsMatch && <div className="flex text-red-500">Passwords do not match!</div>}
          {!passwordValid && <div className="flex text-red-500">Invalid password!</div>}

          <button
            type="submit"
            className="bg-[#335B77] rounded-lg mt-20 h-12 text-2xl font-bold text-white p-1"
          >
            Confirm New Password
          </button>

          <div className="mt-2 text-right bottom-10 right-6 text-sm flex justify-end">
            <button className="font-bold mr-1 text-button" onClick={handlePageBack}>
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetOne;
