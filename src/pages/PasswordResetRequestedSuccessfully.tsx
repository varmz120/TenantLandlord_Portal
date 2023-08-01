import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordResetRequestedSuccessfully = () => {
  //creating variable for navigation
  const navigate = useNavigate();

  useEffect(() => {
      setTimeout(() => {
        navigate('/');
      }, 3000); })

  return (
    <React.Fragment>
      {
        <div className="bg-content flex flex-col h-screen justify-center items-center">
          <div className="relative flex bg-form border-gray-700 rounded-lg shadow p-5 h-64 w-80 md:h-128 md:w-128 justify-center items-top md:items-center">
            <form className="md:space-y-10">
              <p className="text-3xl md:text-3xl text-center font-bold h-24 md:h-5">
                Password Reset Requested
              </p>
              <p className="text-l text-center font-medium h-10 md:h-5">
                If your account exist, your password request link has been sent to your email. Please check your email.
              </p>
            </form>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default PasswordResetRequestedSuccessfully;

