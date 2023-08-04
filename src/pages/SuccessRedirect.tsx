import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// After every form submit
function SuccessRedirect() {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();
  var redirectLink = locate.state ? locate.state.redirect : null; // MUST PROVIDE
  var formState = locate.state ? locate.state.formState : null; // Temporary -> for demo purposes w/o backend
  var isSubmit = locate.state ? locate.state.isSubmit : null; // Temporary -> for demo purposes w/o backend
  var isClosed = locate.state ? locate.state.isClosed : null; // Temporary -> for demo purposes w/o backend
  // Context
  const { user } = useContext(AuthContext);

  // Redirect to provided link after 5 seconds or 401 error
  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        navigate(redirectLink, { state: { formState, isSubmit, isClosed } });
      }, 10);
    } else {
      navigate('/401');
    }
  }, [user, navigate, formState, isSubmit, isClosed, redirectLink]);

  return (
    <React.Fragment>
      {
        <div className="h-full w-full flex items-center justify-center">
          <p>Successful! Redirecting...</p>
        </div>
      }
    </React.Fragment>
  );
}

export default SuccessRedirect;
