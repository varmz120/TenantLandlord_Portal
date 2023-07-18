import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Landing() {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        navigate('/tenantDashboard');
      }, 500);
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      {user ? (
        <div>
          <p>Successfully logged in! Welcome User {user.id}!</p>
        </div>
      ) : (
        <div>
          <p>
            Stand-in for login-page. Please click on Log-In button above to access Tenant features
          </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Landing;
