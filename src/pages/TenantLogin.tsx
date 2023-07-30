import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const TenantLogin = () => {
  //creating variable for navigation
  const navigate = useNavigate();

  // Context
  const { login } = useContext(AuthContext);

  // Creating state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for change in username field
  const handleUsernameFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Event handler for change in password field
  const handlePasswordFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Event handler for clicking login button
  const handleLoginClick = () => {
    // Variable called 'userTypeFromBackend' representing user's type fetched from backend
    const userTypeFromBackend = 0;

    // use setFetchedUserData({}) to call from backend and save in state

    login({
      id: '1',
      email: 'JamieDole@yahoo.com.sg',
      userType: userTypeFromBackend, // Tenant
      authToken: '5880',
    });

    // Redirect user based on UserType
    switch (userTypeFromBackend) {
      case 0: // Tenant
        navigate('/tenantDashboard');
        break;

      case 1: // Landlord
        navigate('/landlordDashboard');
        break;

      case 2: // Admin
        navigate('/adminDashboard');
        break;
    }
  };

  // Event handler for clicking forgot password
  const handleForgotPassword = () => {
    navigate('/reset1');
  };

  return (
    //first div sets background
    <div className="bg-content flex flex-col h-screen justify-center items-center">
      {/* second div sets the card which houses the form */}
      <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-start">
        {/*login form below */}
        <form
          className="flex flex-col justify-start w-full p-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleLoginClick();
          }}
        >
          <p className="text-5xl my-3">Tenant Portal</p>
          <p className="text-3xl text-start mt-10 mb-3" data-testid="login">
            Login
          </p>
          <input
            className={
              'my-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500 '
            }
            value={username}
            onChange={handleUsernameFieldChange}
            placeholder="Username"
          />
          <input
            className={
              'my-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500 '
            }
            value={password}
            onChange={handlePasswordFieldChange}
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-[#335B77] rounded-lg mt-24 text-2xl font-bold text-white p-1"
            onClick={handleLoginClick}
          >
            Login
          </button>

          <div className="mt-2 text-right bottom-10 right-6 text-sm flex justify-end">
            <p className="mr-1">Forgot your login details? </p>
            <button className="font-bold" onClick={handleForgotPassword}>
              Click here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantLogin;