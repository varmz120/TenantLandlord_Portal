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
      if (event.target.value === 'Login as Tenant') {
        login({
          id: '1',
          email: 'JamieDole@yahoo.com.sg',
          typ: 0, // Tenant
        });
      } else if (event.target.value === 'Login as Service Provider') {
        login({
          id: '4',
          email: 'Dian@yahoo.com.sg',
          typ: 1, // Service Provider
        });
      } else if (event.target.value === 'Login as Landlord') {
        login({
          id: '2',
          email: 'LimaRae@yahoo.com.sg',
          typ: 2, // Tenant
        });
      } else if (event.target.value === 'Login as Admin') {
        login({
          id: '3',
          email: 'Varmzz@yahoo.com.sg',
          typ: 3, // Admin
        });
      }
    }
  };

  useEffect(() => {
    if (user !== null) {
      if (user.typ === 0) {
        setTimeout(() => {
          navigate('/tenantDashboard');
        }, 1000);
      }else if (user.typ === 2) {
        setTimeout(() => {
          navigate('/LandlordDashboard');
        }, 1000);
      } else if (user.typ === 3) {
        setTimeout(() => {
          navigate('/adminDashboard');
        }, 1000);
      } else {
        setTimeout(() => {
          navigate('/ServProvDashboard');
        }, 1000);
      }
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      {user ? (
        <div className="h-full w-full flex items-center justify-center">
          <p>Successful! Redirecting...</p>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p>
            Demo of Frontend Pages. Please click on Log-In buttons above to start demo features.
          </p>
          <div className="items-center flex flex-col gap-y-10 mt-10">
            <ActionButton
              value={'Login as Tenant'}
              padding_right={'0'}
              type=""
              toggle={false}
              firstViewState={false}
              onClick={handleButtonClick}
            />
            <ActionButton
              value={'Login as Service Provider'}
              padding_right={'0'}
              type=""
              toggle={false}
              firstViewState={false}
              onClick={handleButtonClick}
            />
            <ActionButton
              value={'Login as Landlord'}
              padding_right={'0'}
              type=""
              toggle={false}
              firstViewState={false}
              onClick={handleButtonClick}
            />
            <ActionButton
              value={'Login as Admin'}
              padding_right={'0'}
              type=""
              toggle={false}
              firstViewState={false}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Landing;
