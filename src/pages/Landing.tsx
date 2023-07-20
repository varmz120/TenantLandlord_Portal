import React, { useContext, useEffect, MouseEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ActionButton from '../components/ActionButton';

function Landing() {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user, login } = useContext(AuthContext);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if ('value' in event.target) {
      if (event.target.value === "Login as Tenant") {
        login({
          id: '1',
          email: 'JamieDole@yahoo.com.sg',
          userType: 0, // Tenant
          authToken: '5880',
      })} else if (event.target.value === "Login as Landlord") {
        login({
          id: '2',
          email: 'LimaRae@yahoo.com.sg',
          userType: 2, // Tenant
          authToken: '5412',
      })
      }
    }
  };

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        navigate('/tenantDashboard');
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      {user ? (
        <div>
          <p>Successfully logged in! Welcome User {user.id}!</p>
        </div>
      ) : (
        <div className='h-max-content'>
          <p>
            Demo of Frontend Tenant Pages. Please click on Log-In buttons above to start demo features.
          </p>
          <div className='items-center mx-auto my-auto flex flex-col gap-y-10 pt-10'>
          <ActionButton
            value={'Login as Tenant'}
            padding_right={'0'}
            type=""
            toggle={false}
            firstViewState={false}
            onClick={handleButtonClick}/>
          <ActionButton
            value={'Login as Landlord'}
            padding_right={'0'}
            type=""
            toggle={false}
            firstViewState={false}
            onClick={handleButtonClick}/>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Landing;
